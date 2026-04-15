import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import type { SquadInfo, PlayerInfo } from '../hooks/useCricketData';
import { getSquadPlayers } from '../services/api';
import CImage from './CImage';

type Props = {
  seriesId: number;
  squads: SquadInfo[];
  loading: boolean;
};

function parsePlayer(p: any): PlayerInfo {
  return {
    id: p.id ?? '',
    name: p.name ?? '',
    role: p.role ?? '',
    imageId: p.imageId ?? 0,
    isCaptain: p.captain ?? false,
    isKeeper: p.keeper ?? false,
    isHeader: p.isHeader ?? false,
  };
}

function TeamSection({ seriesId, squad }: { seriesId: number; squad: SquadInfo }) {
  const [expanded, setExpanded] = useState(false);
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const [fetched, setFetched] = useState(false);

  // Fetch players when first expanded
  useEffect(() => {
    if (expanded && !fetched) {
      setLoadingPlayers(true);
      getSquadPlayers(seriesId, squad.squadId)
        .then((res: any) => {
          setPlayers((res.player ?? []).map(parsePlayer));
          setFetched(true);
        })
        .catch(() => {})
        .finally(() => setLoadingPlayers(false));
    }
  }, [expanded, fetched, seriesId, squad.squadId]);

  // Group players by header sections
  const sections: { header: string; players: PlayerInfo[] }[] = [];
  let currentSection: { header: string; players: PlayerInfo[] } | null = null;

  for (const p of players) {
    if (p.isHeader) {
      currentSection = { header: p.name, players: [] };
      sections.push(currentSection);
    } else if (currentSection) {
      currentSection.players.push(p);
    } else {
      if (!sections.length) {
        currentSection = { header: 'PLAYERS', players: [] };
        sections.push(currentSection);
      }
      currentSection!.players.push(p);
    }
  }

  return (
    <View className="bg-white dark:bg-dark-card rounded-2xl mb-3 overflow-hidden">
      <TouchableOpacity
        className="flex-row items-center p-4"
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <CImage
          imageId={squad.imageId}
          className="w-10 h-10 rounded-xl mr-3"
        />
        <View className="flex-1">
          <Text className="text-gray-900 dark:text-white text-sm font-bold font-heading">
            {squad.teamName}
          </Text>
        </View>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#9E9E9E"
        />
      </TouchableOpacity>

      {expanded && (
        <View className="px-4 pb-4">
          {loadingPlayers && (
            <View className="py-6 items-center">
              <ActivityIndicator size="small" color="#1B5E20" />
            </View>
          )}

          {!loadingPlayers && sections.map((section) => (
            <View key={section.header} className="mb-3">
              <Text className="text-tertiary text-xs font-bold tracking-widest mb-2 font-body">
                {section.header}
              </Text>

              {section.players.map((player) => (
                <View
                  key={player.id}
                  className="flex-row items-center py-2 border-b border-gray-200 dark:border-dark-surface"
                >
                  {player.imageId ? (
                    <CImage
                      imageId={player.imageId}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                  ) : (
                    <View className="w-8 h-8 bg-gray-200 dark:bg-dark-surface rounded-full mr-3 items-center justify-center">
                      <Icon name="person-outline" size={14} color="#9E9E9E" />
                    </View>
                  )}
                  <View className="flex-1">
                    <Text className="text-gray-900 dark:text-white text-sm font-body">
                      {player.name}
                    </Text>
                    {player.role ? (
                      <Text className="text-gray-500 dark:text-gray-400 text-xs font-body">
                        {player.role}
                      </Text>
                    ) : null}
                  </View>
                  {player.isCaptain && (
                    <View className="bg-primary/15 rounded-full px-2 py-0.5">
                      <Text className="text-primary text-xs font-bold">C</Text>
                    </View>
                  )}
                  {player.isKeeper && (
                    <View className="bg-secondary/15 rounded-full px-2 py-0.5 ml-1">
                      <Text className="text-secondary text-xs font-bold">WK</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default function SquadRoster({ seriesId, squads, loading }: Props) {
  if (loading) {
    return (
      <View className="py-12 items-center">
        <ActivityIndicator size="large" color="#1B5E20" />
      </View>
    );
  }

  if (squads.length === 0) {
    return (
      <View className="items-center justify-center py-20">
        <Icon name="people-outline" size={48} color="#9E9E9E" />
        <Text className="text-gray-500 dark:text-gray-400 text-sm font-body mt-4 text-center">
          No squads available for this tournament
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4 mt-2 mb-4">
      {squads.map((squad) => (
        <TeamSection key={squad.squadId} seriesId={seriesId} squad={squad} />
      ))}
    </View>
  );
}
