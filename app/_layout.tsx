import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { initialLogIn } from '@/store/auth/thunks';
import { store, useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import LoginScreen from './login';

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <Provider store={store}>
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <MainAppLayout />
            </ThemeProvider>
        </Provider>
    );
}

const MainAppLayout = () => {
    const dispatch = useAppDispatch();
    const [firstLoad, setFirstLoad] = useState(true);
    useEffect(() => {
        if (firstLoad) {
            dispatch(initialLogIn()).finally(() => setFirstLoad(false));
        }
    }, [firstLoad]);

    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    if (!isAuthenticated) {
        return <LoginScreen />;
    }

    return (
        <>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
};
