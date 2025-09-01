
import NavHeader from '@/components/NavHeader';
import { PrimaryButton } from '@/components/ThemedButton';
import { ThemedSafeAreaView, themedStyles, ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';

export default function QuestionScreen() {
  return (
    <ThemedSafeAreaView style={themedStyles.listContainer}>
      <NavHeader showBackButton={true} title="Questions" />
        <ThemedView avoidTabNav style={[themedStyles.listContainer]}> 
          <ScrollView>
          </ScrollView>
          <PrimaryButton text="Add a new question" onPress={() => {router.push('/(tabs)/settings/addLog')}} />
        </ThemedView>
    </ThemedSafeAreaView>
  );
}