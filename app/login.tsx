import { LoginForm } from '@/components/login/LoginForm';
import { SignUpForm } from '@/components/login/SignUpForm';
import { PrimaryButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { themedStyles, ThemedView } from '@/components/ThemedView';
import { VerticalSpacer } from '@/components/ui/VerticalSpacer';
import { loginThunk, signUpThunk } from '@/store/auth/thunks';
import { useAppDispatch } from '@/store/store';
import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

function LoginScreen() {
    const dispatch = useAppDispatch();
    const [name, setName] = useState(
        process.env.NODE_ENV === 'development' ? 'Test User' : ''
    );
    const [email, setEmail] = useState(
        process.env.NODE_ENV === 'development' ? 'test@example.com' : ''
    );
    const [password, setPassword] = useState(
        process.env.NODE_ENV === 'development' ? 'password' : ''
    );
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState<'login' | 'signup'>('login');

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (formType === 'login')
                await dispatch(loginThunk({ email, password }));
            else await dispatch(signUpThunk({ name, email, password }));
        } catch (error) {
            alert('Error during authentication:');
        }
        setLoading(false);
    };
    return (
        <ThemedView style={themedStyles.centeredContainer}>
            {formType === 'login' ? (
                <LoginForm
                    email={email}
                    password={password}
                    loading={loading}
                    onEmailChange={setEmail}
                    onPasswordChange={setPassword}
                />
            ) : (
                <SignUpForm
                    name={name}
                    onNameChange={setName}
                    email={email}
                    password={password}
                    loading={loading}
                    onEmailChange={setEmail}
                    onPasswordChange={setPassword}
                    setError={setError}
                />
            )}
            <TouchableOpacity
                onPress={() =>
                    setFormType((prev) =>
                        prev === 'login' ? 'signup' : 'login'
                    )
                }
            >
                <ThemedText type="link">
                    {formType === 'login'
                        ? "Don't have an account? Sign Up"
                        : 'Already have an account? Log In'}
                </ThemedText>
            </TouchableOpacity>
            {error ? (
                <ThemedView>
                    <Text style={{ color: 'red' }}>{error}</Text>
                </ThemedView>
            ) : null}
            <VerticalSpacer height={12} />
            <PrimaryButton
                disabled={loading || error !== ''}
                text={loading ? 'Logging in...' : 'Log In'}
                onPress={handleSubmit}
            />
        </ThemedView>
    );
}

export default LoginScreen;
