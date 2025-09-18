import React from "react";
import { TextInput } from "react-native";
import { themedStyles } from "../ThemedView";

export type LoginFormProps = {
    email: string;
    password: string;
    loading: boolean;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
};

export const LoginForm = (props: LoginFormProps) => {
    const {
        email,
        password,
        loading,
        onEmailChange: setEmail,
        onPasswordChange: setPassword,
    } = props;

    const inputStyle = [themedStyles.input, themedStyles.threeQuarterWidth];

    return (
        <>
            <TextInput
                style={inputStyle}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
            />
            <TextInput
                style={inputStyle}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                editable={!loading}
                autoCapitalize="none"
                secureTextEntry
            />
        </>
    );
};
