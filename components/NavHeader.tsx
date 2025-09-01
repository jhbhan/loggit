import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface NavHeaderProps {
    showTitle?: boolean;
    title?: string;
    showBackButton?: boolean;
}

export default function NavHeader({ showTitle = true, title, showBackButton }: NavHeaderProps) {
    return (
        <ThemedView style={{alignItems: 'center', justifyContent: 'center'}}>
            {showBackButton && (
                <TouchableOpacity onPress={() => {router.back()}} style={{position: 'absolute', left: 10}}>
                    <MaterialIcons name="chevron-left" />
                </TouchableOpacity>
            )}
            {showTitle && (
                <ThemedText type='defaultSemiBold'>{title}</ThemedText>
            )}

        </ThemedView>
    );
}