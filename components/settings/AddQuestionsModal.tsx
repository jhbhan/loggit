import { Entity } from '@/constants/types';
import { useAppSelector } from '@/store/store';
import React from 'react';
import { Button, FlatList, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

type AddQuestionsModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedQuestions: Entity<string>[];
  toggleQuestion: (val: Entity<string>) => void;
};

export const AddQuestionsModal = (props: AddQuestionsModalProps) => {
  const { 
    modalVisible,
    setModalVisible,
    selectedQuestions,
    toggleQuestion
  } = props;
  const questionList = useAppSelector((state) => state.log.questions);

  return (
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
                    data={questionList.map(q => ({ text: q.text, id: q.id }))}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.questionButton,
                                selectedQuestions.some(q => q.id === item.id) && styles.selectedButton,
                            ]}
                            onPress={() => toggleQuestion({ id: item.id, value: item.text })}
                        >
                            <ThemedText
                                style={[
                                    styles.questionText,
                                    selectedQuestions.some(q => q.id === item.id) && styles.selectedText,
                                ]}
                            >
                                {item.text}
                            </ThemedText>
                        </TouchableOpacity>
                    )}
                />
                <Button title="Done" onPress={() => setModalVisible(false)} />
            </ThemedView>
        </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
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