/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#3D3D3D', // textPrimary
    textSecondary: '#7B7B7B',
    background: '#FFF8F0',
    card: '#FFFFFF',
    tint: '#A8D5BA', // primary
    icon: '#7B7B7B',
    tabIconDefault: '#7B7B7B',
    tabIconSelected: '#A8D5BA',
    border: '#E6E2DD',
    success: '#B4E0C5',
    danger: '#F7B2B7',
  },
  dark: {
    text: '#FFFFFF', // fallback brighter text
    textSecondary: '#E6E2DD',
    background: '#3D3D3D',
    card: '#4A4A4A',
    tint: '#A8D5BA', // still using primary for highlight
    icon: '#E6E2DD',
    tabIconDefault: '#E6E2DD',
    tabIconSelected: '#A8D5BA',
    border: '#7B7B7B',
    success: '#B4E0C5',
    danger: '#F7B2B7',
  },
};