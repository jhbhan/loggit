import NavHeader from '@/components/NavHeader';
import { AddQuestionsModal } from '@/components/settings/AddQuestionsModal';
import { PrimaryButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView, themedStyles, ThemedView } from '@/components/ThemedView';
import { VerticalSpacer } from '@/components/ui/VerticalSpacer';
import React, { useState } from 'react';
import {
    Button,
    StyleSheet,
    TextInput
} from 'react-native';

export default function AddLog() {
    const [name, setName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

    const toggleQuestion = (question: string) => {
        setSelectedQuestions((prev) =>
            prev.includes(question)
                ? prev.filter((q) => q !== question)
                : [...prev, question]
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
                <ThemedText style={styles.label}>Questions</ThemedText>
                <ThemedView style={styles.selectedQuestions}>
                    {selectedQuestions.length === 0 ? (
                        <ThemedText style={styles.noQuestions}>No questions selected</ThemedText>
                    ) : (
                        selectedQuestions.map((q) => (
                            <ThemedText key={q} style={styles.questionItem}>{q}</ThemedText>
                        ))
                    )}
                </ThemedView>
                <Button title="Add Questions" onPress={() => setModalVisible(true)} />
                <VerticalSpacer />
                <PrimaryButton text="Save Log" onPress={() => { }} />
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
    label: { fontWeight: 'bold', marginTop: 16, marginBottom: 4 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 8,
        marginBottom: 8,
        backgroundColor: '#fff'
    },
    selectedQuestions: { marginVertical: 8 },
    noQuestions: { color: '#888' },
    questionItem: { backgroundColor: '#eee', padding: 4, borderRadius: 4, marginVertical: 2 }
});