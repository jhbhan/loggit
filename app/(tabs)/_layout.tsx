import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { ThemedSafeAreaView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useLogContext } from '@/hooks/LogContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppDispatch } from '@/store/store';
import { incrementStreak } from '@/store/userSlice';
import { StepForm } from '@jhbhan/rn-form';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const { showForm, closeForm, currentForm, answers, setAnswer } = useLogContext();
  const questions = currentForm?.questionSet;
  const onFormComplete = () => {
    dispatch(incrementStreak());
    closeForm();
  };
  return (
    <>

        <ThemedSafeAreaView>
          <Text>Streak Here</Text>
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
      {
        showForm && questions && answers && (
          <StepForm
            questions={questions} 
            answers={answers}  
            onAnswerChange={setAnswer}
            onFormComplete={onFormComplete}
            closeForm={closeForm}
          />
        )
      }
    </>
  );
}
