import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const RANKINGS = [
  { rank: 1, team: 'AUSTRALIA', flag: '\u{1F1E6}\u{1F1FA}', rating: 134 },
  { rank: 2, team: 'INDIA', flag: '\u{1F1EE}\u{1F1F3}', rating: 120 },
  { rank: 3, team: 'ENGLAND', flag: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}', rating: 108 },
];

const FORMATS = ['TEST', 'ODI', 'T20'];

export default function WorldHierarchy() {
  const [activeFormat, setActiveFormat] = useState('TEST');

  return (
    <View className="mt-6 px-4 mb-6">
      {/* Section Header */}
      <Text className="text-foreground text-sm font-bold tracking-widest mb-3 font-heading">
        WORLD HIERARCHY
      </Text>

      {/* Format Tabs */}
      <View className="flex-row mb-4">
        {FORMATS.map((format) => (
          <TouchableOpacity
            key={format}
            onPress={() => setActiveFormat(format)}
            className={`rounded-full px-5 py-2 mr-2 ${
              activeFormat === format ? 'bg-primary' : 'bg-surface'
            }`}
          >
            <Text
              className={`text-xs font-bold tracking-wider ${
                activeFormat === format ? 'text-white' : 'text-muted'
              }`}
            >
              {format}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Rankings List */}
      <View className="bg-card rounded-2xl overflow-hidden">
        {RANKINGS.map((item, index) => (
          <View
            key={item.team}
            className={`flex-row items-center p-4 ${
              index < RANKINGS.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <Text className="text-muted text-sm w-8 font-body">
              {String(item.rank).padStart(2, '0')}
            </Text>
            <Text className="text-xl mr-3">{item.flag}</Text>
            <Text className="text-foreground font-bold flex-1 font-body">
              {item.team}
            </Text>
            <Text className="text-foreground font-bold text-lg font-heading">
              {item.rating}
            </Text>
          </View>
        ))}
      </View>

      {/* Full Leaderboard Link */}
      <TouchableOpacity className="items-center mt-4">
        <Text className="text-tertiary text-xs font-bold tracking-widest">
          FULL LEADERBOARD
        </Text>
      </TouchableOpacity>
    </View>
  );
}
