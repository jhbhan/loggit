import { LoginForm } from "@/components/login/LoginForm";
import { SignUpForm } from "@/components/login/SignUpForm";
import { PrimaryButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { themedStyles, ThemedView } from "@/components/ThemedView";
import { loginThunk, signUpThunk } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

function LoginScreen() {
    const dispatch = useAppDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState<"login" | "signup">("login");

    const handleSubmit = async () => {
        setLoading(true);
        const thunkAction =
            formType === "login"
                ? loginThunk(email, password)
                : signUpThunk(name, email, password);
        const errorMessage = await dispatch(thunkAction);
        if (errorMessage) {
            setError(errorMessage);
        }
        setLoading(false);
    };
    return (
        <ThemedView style={themedStyles.centeredContainer}>
            {formType === "login" ? (
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
                />
            )}
            <TouchableOpacity
                onPress={() =>
                    setFormType((prev) =>
                        prev === "login" ? "signup" : "login"
                    )
                }
            >
                <ThemedText type="link">
                    {formType === "login"
                        ? "Don't have an account? Sign Up"
                        : "Already have an account? Log In"}
                </ThemedText>
            </TouchableOpacity>
            {error ? (
                <ThemedView>
                    <Text style={{ color: "red" }}>{error}</Text>
                </ThemedView>
            ) : null}
            <PrimaryButton
                disabled={loading}
                text={loading ? "Logging in..." : "Log In"}
                onPress={handleSubmit}
            />
        </ThemedView>
    );
}

export default LoginScreen;
