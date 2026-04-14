import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PLAYING_XI_1 = [
  'Rohit Sharma (c)',
  'Ishan Kishan (wk)',
  'Suryakumar Yadav',
  'Tilak Varma',
  'Hardik Pandya',
  'Tim David',
  'Nehal Wadhera',
  'Piyush Chawla',
  'Jasprit Bumrah',
  'Akash Madhwal',
  'Gerald Coetzee',
];

const PLAYING_XI_2 = [
  'Ruturaj Gaikwad (c)',
  'Devon Conway (wk)',
  'Ajinkya Rahane',
  'Shivam Dube',
  'Ravindra Jadeja',
  'Moeen Ali',
  'MS Dhoni',
  'Deepak Chahar',
  'Matheesha Pathirana',
  'Maheesh Theekshana',
  'Tushar Deshpande',
];

const BENCH_1 = ['Tristan Stubbs', 'Romario Shepherd'];
const BENCH_2 = ['Shaik Rasheed', 'Daryl Mitchell'];

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-start py-2.5 border-b border-gray-200 dark:border-dark-surface">
      <Icon name={icon} size={16} color="#9E9E9E" />
      <View className="ml-3 flex-1">
        <Text className="text-gray-500 dark:text-gray-400 text-xs tracking-wider font-body mb-0.5">
          {label}
        </Text>
        <Text className="text-gray-900 dark:text-white text-sm font-body">{value}</Text>
      </View>
    </View>
  );
}

export default function MatchInfoTab() {
  return (
    <View className="px-4 mt-4 mb-6">
      {/* Match Info */}
      <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest mb-2 font-heading">
        MATCH INFO
      </Text>
      <View className="bg-white dark:bg-dark-card rounded-2xl p-4 mb-4">
        <InfoRow
          icon="location-outline"
          label="VENUE"
          value="Wankhede Stadium, Mumbai"
        />
        <InfoRow
          icon="swap-horizontal-outline"
          label="TOSS"
          value="Chennai Super Kings won the toss and elected to bat first"
        />
        <InfoRow
          icon="people-outline"
          label="MATCH OFFICIALS"
          value="Nitin Menon, Chris Gaffaney"
        />
        <InfoRow
          icon="person-outline"
          label="3RD UMPIRE"
          value="Javagal Srinath"
        />
      </View>

      {/* Head to Head */}
      <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest mb-2 font-heading">
        HEAD TO HEAD
      </Text>
      <View className="bg-primary rounded-2xl p-5 items-center mb-4">
        <Text className="text-white text-5xl font-bold font-heading">219</Text>
        <Text className="text-accent-light text-xs tracking-widest font-body mt-1">
          MATCHES PLAYED ALL TIME
        </Text>
        <View className="flex-row mt-4">
          <View className="items-center mr-8">
            <Text className="text-white text-xl font-bold font-heading">
              102
            </Text>
            <Text className="text-accent-light text-xs font-body">
              CSK WINS
            </Text>
          </View>
          <View className="items-center mr-8">
            <Text className="text-white text-xl font-bold font-heading">15</Text>
            <Text className="text-accent-light text-xs font-body">DRAWS</Text>
          </View>
          <View className="items-center">
            <Text className="text-white text-xl font-bold font-heading">
              102
            </Text>
            <Text className="text-accent-light text-xs font-body">
              MI WINS
            </Text>
          </View>
        </View>
      </View>

      {/* Playing XI */}
      <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest mb-2 font-heading">
        PLAYING XI
      </Text>
      <View className="bg-white dark:bg-dark-card rounded-2xl p-4 mb-4">
        {/* Team Headers */}
        <View className="flex-row mb-3 pb-2 border-b border-gray-200 dark:border-dark-surface">
          <View className="flex-1 flex-row items-center">
            <View className="w-6 h-6 bg-blue-700 rounded-full items-center justify-center mr-2">
              <Text className="text-white text-xs font-bold">M</Text>
            </View>
            <Text className="text-gray-900 dark:text-white text-xs font-bold font-heading">
              MUMBAI INDIANS
            </Text>
          </View>
          <View className="flex-1 flex-row items-center justify-end">
            <Text className="text-gray-900 dark:text-white text-xs font-bold font-heading">
              SUPER KINGS
            </Text>
            <View className="w-6 h-6 bg-yellow-500 rounded-full items-center justify-center ml-2">
              <Text className="text-white text-xs font-bold">C</Text>
            </View>
          </View>
        </View>

        {/* Player Rows */}
        {PLAYING_XI_1.map((p1, i) => (
          <View
            key={i}
            className="flex-row py-1.5 border-b border-gray-200 dark:border-dark-surface"
          >
            <Text className="flex-1 text-gray-900 dark:text-white text-xs font-body">
              {p1}
            </Text>
            <Text className="flex-1 text-gray-900 dark:text-white text-xs font-body text-right">
              {PLAYING_XI_2[i] ?? ''}
            </Text>
          </View>
        ))}
      </View>

      {/* Bench */}
      <Text className="text-gray-900 dark:text-white text-sm font-bold tracking-widest mb-2 font-heading">
        BENCH
      </Text>
      <View className="bg-white dark:bg-dark-card rounded-2xl p-4">
        <View className="flex-row mb-2 pb-2 border-b border-gray-200 dark:border-dark-surface">
          <Text className="flex-1 text-gray-500 dark:text-gray-400 text-xs font-bold font-body">
            MI
          </Text>
          <Text className="flex-1 text-gray-500 dark:text-gray-400 text-xs font-bold font-body text-right">
            CSK
          </Text>
        </View>
        {BENCH_1.map((p1, i) => (
          <View key={i} className="flex-row py-1.5">
            <Text className="flex-1 text-gray-900 dark:text-white text-xs font-body">
              {p1}
            </Text>
            <Text className="flex-1 text-gray-900 dark:text-white text-xs font-body text-right">
              {BENCH_2[i] ?? ''}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
