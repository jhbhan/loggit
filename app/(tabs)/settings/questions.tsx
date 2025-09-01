
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView, themedStyles } from '@/components/ThemedView';
import React from 'react';

export default function QuestionScreen() {
  return (
    <ThemedSafeAreaView style={themedStyles.listContainer}>
        <ThemedText>Questions</ThemedText>
    </ThemedSafeAreaView>
  );
}