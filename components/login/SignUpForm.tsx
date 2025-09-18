import React, { useState } from "react";
import { TextInput } from "react-native";
import { ThemedText } from "../ThemedText";
import { themedStyles } from "../ThemedView";
import { LoginFormProps } from "./LoginForm";

export const SignUpForm = (
    props: LoginFormProps & {
        name: string;
        onNameChange: (name: string) => void;
    }
) => {
    const {
        name,
        onNameChange: setName,
        email,
        password,
        loading,
        onEmailChange: setEmail,
        onPasswordChange: setPassword,
    } = props;

    const [confirmEmail, setConfirmEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const inputStyle = [themedStyles.input, themedStyles.threeQuarterWidth];

    return (
        <>
            <TextInput
                style={inputStyle}
                value={name}
                onChangeText={setName}
                placeholder="Name"
            />
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
                value={confirmEmail}
                onChangeText={setConfirmEmail}
                placeholder="Confirm Email"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
            />
            {confirmEmail && confirmEmail !== email && (
                <ThemedText type="error">Emails do not match</ThemedText>
            )}
            <TextInput
                style={inputStyle}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                editable={!loading}
                autoCapitalize="none"
                secureTextEntry
            />
            <TextInput
                style={inputStyle}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                editable={!loading}
                autoCapitalize="none"
                secureTextEntry
            />
            {confirmPassword && confirmPassword !== password && (
                <ThemedText type="error">Passwords do not match</ThemedText>
            )}
        </>
    );
};
