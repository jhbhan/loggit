import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { themedStyles, ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  return (
    <ThemedView style={themedStyles.centeredContainer}>
      <ThemedText>This is the analysis page</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
