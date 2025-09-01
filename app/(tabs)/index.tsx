
import { PrimaryButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView, themedStyles } from '@/components/ThemedView';
import { useLogContext } from '@/hooks/LogContext';
import React from 'react';

export default function HomeScreen() {
  const { selectForm } = useLogContext();
  return (
    <ThemedView 
      style={themedStyles.centeredContainer}
    >
        <ThemedText 
          style={{ fontSize: 20, marginBottom: 12 }}
        >
          Welcome to Loggit!
        </ThemedText>
        <PrimaryButton
          onPress={() => selectForm(2)}
          text='Get Started'
        />
    </ThemedView>
  );
}