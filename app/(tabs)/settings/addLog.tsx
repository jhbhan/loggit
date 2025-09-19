import { NavHeader } from '@/components/NavHeader';
import { AddQuestionsModal } from '@/components/settings/AddQuestionsModal';
import { PrimaryButton, ToggleButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import {
    ThemedSafeAreaView,
    themedStyles,
    ThemedView,
} from '@/components/ThemedView';
import { NumberInput } from '@/components/ui/NumberInput';
import { VerticalSpacer } from '@/components/ui/VerticalSpacer';
import { Entity, TimePeriod } from '@/constants/types';
import { saveLog } from '@/store/log/logSlice';
import { useAppDispatch } from '@/store/store';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

export default function AddLog() {
    const [name, setName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState<
        Entity<string>[]
    >([]);
    const [notificationHour, setNotificationHour] = useState<number | null>(
        null
    );
    const [notificationMinute, setNotificationMinute] = useState<number | null>(
        null
    );
    const [ampm, setAmpm] = useState<TimePeriod>('AM');
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const onAdd = () => {
        dispatch(
            saveLog({
                name,
                questionIds: selectedQuestions.map((q) => q.id),
                notificationTime: {
                    hours: notificationHour ?? 0,
                    minutes: notificationMinute ?? 0,
                    ampm: ampm,
                },
                notificationFrequency: 'daily',
            })
        );
        navigation.goBack();
    };

    const toggleQuestion = (val: Entity<string>) => {
        setSelectedQuestions((prev) =>
            prev.includes(val) ? prev.filter((q) => q !== val) : [...prev, val]
        );
    };

    return (
        <ThemedSafeAreaView style={themedStyles.listContainer}>
            <NavHeader showBackButton={true} />
            <ThemedView style={themedStyles.listContainer} avoidTabNav>
                <ThemedText style={styles.label}>Log Name</ThemedText>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter log name"
                />
                <ThemedText style={styles.label}>Notification Time</ThemedText>
                <ThemedView style={styles.notificationTimeContainer}>
                    <ToggleButton
                        toggleValues={['AM', 'PM']}
                        value={ampm}
                        setValue={setAmpm}
                    />
                    <NumberInput
                        style={{ flex: 1 }}
                        min={0}
                        max={23}
                        numberValue={notificationHour}
                        onNumberChange={setNotificationHour}
                    />
                    <ThemedText>:</ThemedText>
                    <NumberInput
                        style={{ flex: 1 }}
                        min={0}
                        max={59}
                        numberValue={notificationMinute}
                        onNumberChange={setNotificationMinute}
                    />
                </ThemedView>
                <ThemedText style={styles.label}>Questions</ThemedText>
                <ThemedView style={styles.selectedQuestions}>
                    {selectedQuestions.length === 0 ? (
                        <ThemedText style={styles.noQuestions}>
                            No questions selected
                        </ThemedText>
                    ) : (
                        selectedQuestions.map((q) => (
                            <ThemedText key={q.id} style={styles.questionItem}>
                                {q.value}
                            </ThemedText>
                        ))
                    )}
                </ThemedView>
                <Button
                    title="Add Questions"
                    onPress={() => setModalVisible(true)}
                />
                <VerticalSpacer />
                <PrimaryButton text="Save Log" onPress={onAdd} />
            </ThemedView>
            <AddQuestionsModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                selectedQuestions={selectedQuestions}
                toggleQuestion={toggleQuestion}
            />
        </ThemedSafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fff' },
    notificationTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    label: { fontWeight: 'bold', marginTop: 16, marginBottom: 4 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 8,
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    selectedQuestions: { marginVertical: 8 },
    noQuestions: { color: '#888' },
    questionItem: {
        backgroundColor: '#eee',
        padding: 4,
        borderRadius: 4,
        marginVertical: 2,
    },
});
