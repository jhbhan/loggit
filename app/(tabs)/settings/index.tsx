
import { DangerButton, SecondaryButton } from '@/components/ThemedButton';
import { ThemedSafeAreaView, themedStyles, ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';

export default function SettingsScreen() {
  return (
    <ThemedSafeAreaView style={themedStyles.listContainer}>
      <ThemedView avoidTabNav style={[themedStyles.listContainer]}> 
        <ScrollView>
          <SettingButton text="My Logs" onPress={() => router.push('/(tabs)/settings/logs')} />
          <SettingButton text="Questions" onPress={() => router.push('/(tabs)/settings/questions')} />
        </ScrollView>
        <DangerButton text="Log Out" onPress={() => {}} />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

interface SettingButtonProps {
  text: string;
  onPress: () => void;
}

export const SettingButton = (props: SettingButtonProps) => {
  return (
    <SecondaryButton
      style={{
        marginVertical: 8, 
        alignItems: 'flex-start',
      }}
      text={props.text}
      onPress={props.onPress}
    />
  );
};