
import NavHeader from '@/components/NavHeader';
import { PrimaryButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView, themedStyles, ThemedView } from '@/components/ThemedView';
import { useAppSelector } from '@/store/store';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView } from 'react-native';

export default function QuestionScreen() {
  const questions = useAppSelector((state) => state.log.questions);
  return (
    <ThemedSafeAreaView style={themedStyles.listContainer}>
      <NavHeader showBackButton={true} title="Questions" />
        <ThemedView avoidTabNav style={[themedStyles.listContainer]}> 
          <ScrollView>
            {questions.map((question) => (
              <ThemedView key={question.id}>
                <ThemedText type="subtitle">{question.text}</ThemedText>
              </ThemedView>
            ))}
          </ScrollView>
          <PrimaryButton text="Add a new question" onPress={() => {router.push('/(tabs)/settings/addQuestion')}} />
        </ThemedView>
    </ThemedSafeAreaView>
  );
}