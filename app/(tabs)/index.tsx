import { PrimaryButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView, themedStyles } from '@/components/ThemedView';
import { selectLogId, setShowForm } from '@/store/form/formSlice';
import { useAppDispatch } from '@/store/store';
import React from 'react';

export default function HomeScreen() {
    const dispatch = useAppDispatch();
    const onPressStart = () => {
        dispatch(setShowForm(true));
        dispatch(selectLogId(2));
    };
    return (
        <ThemedView style={themedStyles.centeredContainer}>
            <ThemedText style={{ fontSize: 20, marginBottom: 12 }}>
                Welcome to Loggit!
            </ThemedText>
            <PrimaryButton onPress={onPressStart} text="Get Started" />
        </ThemedView>
    );
}
