import notifee, {
  AuthorizationStatus,
  TriggerType,
  TimestampTrigger,
  AndroidImportance,
  TriggerNotification,
} from '@notifee/react-native';
import { Alert, Linking, Platform } from 'react-native';

const CHANNEL_ID = 'match-reminders';

// We encode match metadata into the notification itself (via data field)
// so we don't need any external storage library.

export type Reminder = {
  matchId: number;
  notificationId: string;
  team1: string;
  team2: string;
  seriesName: string;
  matchDesc: string;
  startDate: string;
};

// ─── Permission Handling ─────────────────────────────────

/** Check if we have notification permission. Returns true if granted. */
export async function hasNotificationPermission(): Promise<boolean> {
  const settings = await notifee.getNotificationSettings();
  return settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
}

/** Request notification permission. Returns true if granted. */
export async function requestNotificationPermission(): Promise<boolean> {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    return true;
  }

  // Permission denied - prompt user to open settings
  Alert.alert(
    'Notifications Disabled',
    'To receive match reminders, please enable notifications in your device settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Open Settings',
        onPress: () => {
          if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:');
          } else {
            notifee.openNotificationSettings();
          }
        },
      },
    ],
  );
  return false;
}

/** Ensure permission is granted, requesting if needed. Returns true if granted. */
export async function ensureNotificationPermission(): Promise<boolean> {
  const granted = await hasNotificationPermission();
  if (granted) return true;
  return requestNotificationPermission();
}

// ─── Notification Channel ────────────────────────────────

async function ensureChannel(): Promise<string> {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Match Reminders',
    description: 'Notifications for upcoming cricket match reminders',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });
  return CHANNEL_ID;
}

// ─── Helpers ─────────────────────────────────────────────

function triggerToReminder(tn: TriggerNotification): Reminder | null {
  const n = tn.notification;
  const data = n.data;
  if (!data?.matchId) return null;
  return {
    matchId: Number(data.matchId),
    notificationId: n.id ?? '',
    team1: String(data.team1 ?? ''),
    team2: String(data.team2 ?? ''),
    seriesName: String(data.seriesName ?? ''),
    matchDesc: String(data.matchDesc ?? ''),
    startDate: String(data.startDate ?? ''),
  };
}

// ─── Public API ──────────────────────────────────────────

/** Get all active reminders (reads directly from notifee's scheduled triggers) */
export async function getReminders(): Promise<Reminder[]> {
  const triggers = await notifee.getTriggerNotifications();
  return triggers
    .map(triggerToReminder)
    .filter((r): r is Reminder => r !== null);
}

/** Check if a reminder is set for a specific match */
export async function isReminderSet(matchId: number): Promise<boolean> {
  const triggers = await notifee.getTriggerNotifications();
  return triggers.some((tn) => tn.notification.data?.matchId === String(matchId));
}

/** Set a reminder for an upcoming match (15 min before start) */
export async function setReminder(params: {
  matchId: number;
  team1: string;
  team2: string;
  seriesName: string;
  matchDesc: string;
  startDate: string;
}): Promise<boolean> {
  // 1. Check / request permission
  const permitted = await ensureNotificationPermission();
  if (!permitted) return false;

  // 2. Don't double-set
  const existing = await isReminderSet(params.matchId);
  if (existing) {
    Alert.alert('Already Set', 'You already have a reminder for this match.');
    return false;
  }

  // 3. Calculate trigger time (15 min before match)
  const matchTime = Number(params.startDate);
  const triggerTime = matchTime - 15 * 60 * 1000;

  if (triggerTime <= Date.now()) {
    Alert.alert(
      'Too Late',
      'This match is starting too soon to set a reminder.',
    );
    return false;
  }

  // 4. Ensure Android channel exists
  const channelId = await ensureChannel();

  // 5. Schedule notification (store match metadata in the data field)
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerTime,
  };

  await notifee.createTriggerNotification(
    {
      title: 'Match Starting Soon!',
      body: `${params.team1} vs ${params.team2} starts in 15 minutes - ${params.seriesName}`,
      data: {
        matchId: String(params.matchId),
        team1: params.team1,
        team2: params.team2,
        seriesName: params.seriesName,
        matchDesc: params.matchDesc,
        startDate: params.startDate,
      },
      android: {
        channelId,
        smallIcon: 'ic_notification',
        pressAction: { id: 'default' },
        importance: AndroidImportance.HIGH,
      },
      ios: {
        sound: 'default',
      },
    },
    trigger,
  );

  return true;
}

/** Cancel a reminder for a match */
export async function cancelReminder(matchId: number): Promise<void> {
  const triggers = await notifee.getTriggerNotifications();
  const match = triggers.find(
    (tn) => tn.notification.data?.matchId === String(matchId),
  );
  if (match?.notification.id) {
    await notifee.cancelNotification(match.notification.id);
  }
}

/** Cancel all reminders */
export async function cancelAllReminders(): Promise<void> {
  await notifee.cancelAllNotifications();
}
