import { ThemedText } from '@/components/ThemedText';
import { themedStyles, ThemedView } from '@/components/ThemedView';
import React from 'react';

type SettingsProps = {
  // Define your props here
};

export default function SettingsScreen(props: SettingsProps) {
  return (
    <ThemedView style={themedStyles.centeredContainer}>
        <ThemedText>
            Settings
        </ThemedText>
    </ThemedView>
  );
};
