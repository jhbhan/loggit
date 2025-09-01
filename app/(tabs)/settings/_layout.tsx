import { Stack } from 'expo-router';
import React from 'react';


export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="questions"
        options={{
          title: 'Questions',
        }}
      />
      <Stack.Screen
        name="logs"
        options={{
          title: 'Logs',
        }}
      />
    </Stack>
  );
}
