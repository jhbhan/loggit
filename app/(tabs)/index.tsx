import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView, themedStyles } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useLogContext } from '@/hooks/LogContext';

export default function HomeScreen() {
  const { setShowForm } = useLogContext();
  return (
    <ThemedView 
      style={themedStyles.centeredContainer}
    >
        <>
          <ThemedText 
            style={{ fontSize: 20, marginBottom: 12 }}
          >
            Welcome to Loggit!
          </ThemedText>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => setShowForm(true)}
          >
            <ThemedText 
              style={{ color: Colors.light.text }}
            >
              Get Started
            </ThemedText>
          </TouchableOpacity>
        </>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.light.tint,
    padding: 12,
    borderRadius: 8,
  },
});
