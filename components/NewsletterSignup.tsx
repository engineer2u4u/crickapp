import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

export default function NewsletterSignup() {
  return (
    <View className="mx-4 mt-6 mb-6">
      <View className="bg-primary rounded-2xl p-5 overflow-hidden">
        <Text className="text-white text-lg font-bold font-heading leading-6">
          IN YOUR INBOX EVERY{'\n'}MORNING.
        </Text>
        <Text className="text-accent-light text-xs mt-2 mb-4 font-body leading-4">
          Get the latest cricket news, match updates and exclusive analysis
          delivered straight to your inbox.
        </Text>

        {/* Email Input */}
        <View className="bg-white/10 rounded-xl px-4 py-3 mb-3">
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="rgba(255,255,255,0.5)"
            className="text-white text-sm font-body"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Subscribe Button */}
        <TouchableOpacity className="bg-secondary rounded-xl py-3 items-center">
          <Text className="text-white text-sm font-bold tracking-wider font-heading">
            SUBSCRIBE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
