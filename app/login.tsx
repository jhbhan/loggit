import { PrimaryButton } from '@/components/ThemedButton';
import { themedStyles, ThemedView } from '@/components/ThemedView';
import { loginThunk } from '@/store/authSlice';
import { useAppDispatch } from '@/store/store';
import React, { useState } from 'react';
import { Text, TextInput } from 'react-native';

function LoginScreen() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogIn = async () => {
        setLoading(true);
        const errorMessage = await dispatch(loginThunk(email, password));
        if (errorMessage) {
            setError(errorMessage);
        }
        setLoading(false);
    };
    return (
        <ThemedView
            style={themedStyles.centeredContainer}
        >
            <TextInput
                style={themedStyles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
            />
            <TextInput
                style={themedStyles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                editable={!loading}
                autoCapitalize='none'
                secureTextEntry
            />
            {error ? <ThemedView><Text style={{ color: 'red' }}>{error}</Text></ThemedView> : null}
            <PrimaryButton
                disabled={loading}
                text={loading ? 'Logging in...' : 'Log In'}
                onPress={handleLogIn}
            />
        </ThemedView>
    );
};

export default LoginScreen;