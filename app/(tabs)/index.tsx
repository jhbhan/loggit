
import { PrimaryButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView, themedStyles } from '@/components/ThemedView';
import { useLogContext } from '@/hooks/LogContext';
import { setShowForm } from '@/store/logSlice';
import { useAppDispatch } from '@/store/store';
import React from 'react';

export default function HomeScreen() {
  const { selectForm } = useLogContext();
  const dispatch = useAppDispatch();
  const onPressStart = () => {
    dispatch(setShowForm(true));
    selectForm(2);
  }
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
          onPress={onPressStart}
          text='Get Started'
        />
    </ThemedView>
  );
}