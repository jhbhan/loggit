
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView, themedStyles } from '@/components/ThemedView';
import React from 'react';

export default function LogsScreen() {
  return (
    <ThemedSafeAreaView style={themedStyles.listContainer}>
        <ThemedText>Logs</ThemedText>
    </ThemedSafeAreaView>
  );
}