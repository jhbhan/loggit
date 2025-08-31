import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleProps } from 'react-native-reanimated/lib/typescript/commonTypes';

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'primary' | 'secondary';
  buttonStyle?: StyleProps;
  textStyle?: TextStyle;
  text: string
};

export function ThemedButton({
  buttonStyle,
  textStyle,
  lightColor,
  darkColor,
  type = 'primary',
  text,
  ...rest
}: ThemedButtonProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const primaryButtonColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primaryButton');
  const secondaryButtonColor = useThemeColor({ light: lightColor, dark: darkColor }, 'secondaryButton');

  return (
    <TouchableOpacity 
      style={{
        ...buttonStyle,
        ...styles.button,
        backgroundColor: type === 'primary' ? primaryButtonColor : secondaryButtonColor
      }}
      {...rest}
    >
      <Text
        style={[
          { color: textColor },
          type === 'primary' ? styles.default : undefined,
          type === 'secondary' ? styles.defaultSemiBold : undefined,
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
