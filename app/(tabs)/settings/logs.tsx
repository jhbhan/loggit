
import NavHeader from '@/components/NavHeader';
import { PrimaryButton, SecondaryButton } from '@/components/ThemedButton';
import { ThemedSafeAreaView, themedStyles, ThemedView } from '@/components/ThemedView';
import { useAppSelector } from '@/store/store';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';

export default function LogsScreen() {
  const logs = useAppSelector((state) => state.log.logs);
  return (
    <ThemedSafeAreaView style={themedStyles.listContainer}>
      <NavHeader title="Logs" showBackButton={true} />
      <ThemedView avoidTabNav style={[themedStyles.listContainer]}> 
        <ScrollView>
          {logs.map((log) => (
            <SecondaryButton key={log.id} onPress={() => { }} text={log.name} />
          ))}
        </ScrollView>
        <PrimaryButton text="Add a log" onPress={() => {router.push('/(tabs)/settings/addLog')}} />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}