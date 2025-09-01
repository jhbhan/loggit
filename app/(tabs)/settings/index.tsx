
import { DangerButton, SecondaryButton } from '@/components/ThemedButton';
import { ThemedSafeAreaView, themedStyles } from '@/components/ThemedView';
import useSafeAreaInsets from '@/hooks/useSafeAreaInsets';
import { router, useNavigation } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <ThemedSafeAreaView style={themedStyles.listContainer}>
      <View style={[themedStyles.listContainer, { paddingBottom: insets.bottom + 28 }]}> 
        <ScrollView>
          <SettingButton text="My Logs" onPress={() => router.push('/(tabs)/settings/logs')} />
          <SettingButton text="Questions" onPress={() => router.push('/(tabs)/settings/questions')} />
        </ScrollView>
        <DangerButton text="Log Out" onPress={() => {}} />
      </View>
    </ThemedSafeAreaView>
  );
}

interface SettingButtonProps {
  text: string;
  onPress: () => void;
}

const SettingButton = (props: SettingButtonProps) => {
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