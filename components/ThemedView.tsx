import { SafeAreaView, StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  avoidTabNav?: boolean;
};

export function ThemedView({ style, avoidTabNav, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const inset = useSafeAreaInsets();

  return <View 
    style={
      [
        { backgroundColor },
        avoidTabNav ? { paddingBottom: inset.bottom + 28 } : {},
        style
      ]
    } 
    {...otherProps}
    />;
}

export function ThemedSafeAreaView({ style, avoidTabNav, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const inset = useSafeAreaInsets();

  return <SafeAreaView 
    style={
      [
        { backgroundColor },
        avoidTabNav ? { paddingBottom: inset.bottom + 28 } : {},
        style
      ]
    } 
    {...otherProps}
    />;
}

export const themedStyles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  listContainer: {
    flex: 1,
    padding:24
  }
});