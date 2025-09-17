import { PrimaryButton } from '@/components/ThemedButton';
import { themedStyles, ThemedView } from '@/components/ThemedView';
import { login } from '@/store/authSlice';
import { useAppDispatch } from '@/store/store';
import React, { useState } from 'react';
import { TextInput } from 'react-native';

function LoginScreen() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogIn = () => {
        dispatch(login({
            user: { id: '1', name: 'John Doe', email },
            token: 'dummy-token'
        }));
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
            />
            <PrimaryButton
                text="Login"
                onPress={handleLogIn}
            />
        </ThemedView>
    );
};

export default LoginScreen;