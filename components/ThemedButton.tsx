import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleProps } from 'react-native-reanimated/lib/typescript/commonTypes';

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'primary' | 'secondary' | 'danger';
  buttonStyle?: StyleProps;
  textStyle?: TextStyle;
  text?: string
};

export function PrimaryButton({
  buttonStyle,
  textStyle,
  lightColor,
  darkColor,
  text,
  style,
  ...rest
}: ThemedButtonProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const primaryButtonColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primaryButton');

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: primaryButtonColor },
        buttonStyle,
        style,
      ]}
      {...rest}
    >
      <Text style={[styles.default, { color: textColor }, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export function SecondaryButton({
  buttonStyle,
  textStyle,
  lightColor,
  darkColor,
  text,
  style,
  ...rest
}: ThemedButtonProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const secondaryButtonColor = useThemeColor({ light: lightColor, dark: darkColor }, 'secondaryButton');

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: secondaryButtonColor,
         },
        buttonStyle,
        style,
      ]}
      {...rest}
    >
      <Text style={[styles.default, { color: textColor }, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

interface ToggleButtonProps<T> extends ThemedButtonProps {
  toggleValues: [T, T];
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

export function ToggleButton<T>({
  lightColor,
  darkColor,
  toggleValues,
  value,
  setValue,
  ...rest
}: ToggleButtonProps<T>) {

  const handlePress = () => {
    setValue(prev => prev === toggleValues[0] ? toggleValues[1] : toggleValues[0]);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: 'white' }
      ]}
      onPress={handlePress}
      {...rest}
    >
      <Text style={[styles.default, { color: 'black' }]}>
        {value as string}
      </Text>
    </TouchableOpacity>
  );
}

export function DangerButton({
  buttonStyle,
  textStyle,
  lightColor,
  darkColor,
  text,
  ...rest
}: ThemedButtonProps) {
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const dangerButtonColor = useThemeColor({ light: lightColor, dark: darkColor }, 'danger');

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: dangerButtonColor },
        buttonStyle,
      ]}
      {...rest}
    >
      <Text style={[styles.default, { color: textColor }, textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
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