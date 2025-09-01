import NavHeader from '@/components/NavHeader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView, themedStyles, ThemedView } from '@/components/ThemedView';
import React, { useState } from 'react';
import {
    Button,
    FlatList,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';

const QUESTIONS = [
'How do you feel today?',
'What did you accomplish?',
'Any challenges faced?',
'What are your goals for tomorrow?',
];

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

        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <ThemedView style={styles.modalOverlay}>
                <ThemedView style={styles.modalContent}>
                    <ThemedText style={styles.modalTitle}>Select Questions</ThemedText>
                    <FlatList
                        data={QUESTIONS}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.questionButton,
                                    selectedQuestions.includes(item) && styles.selectedButton,
                                ]}
                                onPress={() => toggleQuestion(item)}
                            >
                                <ThemedText
                                    style={[
                                        styles.questionText,
                                        selectedQuestions.includes(item) && styles.selectedText,
                                    ]}
                                >
                                    {item}
                                </ThemedText>
                            </TouchableOpacity>
                        )}
                    />
                    <Button title="Done" onPress={() => setModalVisible(false)} />
                </ThemedView>
            </ThemedView>
        </Modal>
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
    },
    selectedQuestions: { marginVertical: 8 },
    noQuestions: { color: '#888' },
    questionItem: { backgroundColor: '#eee', padding: 4, borderRadius: 4, marginVertical: 2 },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        maxHeight: '70%',
    },
    modalTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
    questionButton: {
        padding: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 4,
    },
    selectedButton: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    questionText: { color: '#333' },
    selectedText: { color: '#fff' },
});