import { Tabs } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { ThemedSafeAreaView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { setShowForm } from '@/store/formSlice';
import { makeGetQuestionsForLog } from '@/store/logSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { incrementStreak } from '@/store/userSlice';
import { FormAnswerType, StepForm } from '@jhbhan/rn-form';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const userName = useAppSelector((state) => state.user.name);
  const userStreak = useAppSelector((state) => state.user.streak);

  return (
    <>
      <ThemedSafeAreaView>
        <Text>{userName}</Text>
        <Text>{userStreak}</Text>
      </ThemedSafeAreaView>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
          }}
        />
      </Tabs>
      <StepFormWrapper />
    </>
  );
}

const StepFormWrapper = () => {
  const dispatch = useAppDispatch();
  const showForm = useAppSelector((state) => state.form.showForm);
  const selectedFormId = useAppSelector((state) => state.form.selectLogId);
  const [answers, setAnswers] = useState<Record<number, FormAnswerType>>({});
  const selector = useMemo(() => makeGetQuestionsForLog(selectedFormId), [selectedFormId]);
  const questions = useAppSelector(selector);

  const closeForm = () => {
    dispatch(setShowForm(false));
  };

  const onFormComplete = () => {
    dispatch(incrementStreak());
    closeForm();
  };

  const onChangeAnswer = (questionId: number, answer: FormAnswerType) => {
    setAnswers((prev) => ({
        ...prev,
        [questionId]: answer
    }));
  };

  if (!showForm || !questions) return null;

  return (
    <StepForm
      questions={questions}
      onAnswerChange={onChangeAnswer}
      onFormComplete={onFormComplete}
      answers={answers}
      closeForm={closeForm}
    />
  );
};