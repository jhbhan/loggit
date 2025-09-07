import NavHeader from '@/components/NavHeader';
import { PrimaryButton, SecondaryButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView, themedStyles, ThemedView } from '@/components/ThemedView';
import { VerticalSpacer } from '@/components/ui/VerticalSpacer';
import { questionFormats } from '@/constants/types';
import { QuestionFormat } from '@jhbhan/rn-form';
import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput
} from 'react-native';

export default function AddQuestion() {
    const [questionText, setQuestionText] = useState('');
    const [questionType, setQuestionType] = useState<QuestionFormat>(QuestionFormat.Text);

    return (
        <ThemedSafeAreaView style={themedStyles.listContainer}>
            <NavHeader showBackButton={true} />
            <ThemedView style={themedStyles.listContainer} avoidTabNav>
                <ThemedText style={styles.label}>Question Text</ThemedText>
                <TextInput
                    style={styles.input}
                    value={questionText}
                    onChangeText={setQuestionText}
                    placeholder="Enter your question"
                />
                {
                    questionFormats.map((format) => {
                        if (format.type === questionType)
                            return <PrimaryButton 
                                key={format.type} 
                                text={format.title}
                                onPress={() => { }} 
                            />;
                        else {
                            return <SecondaryButton
                                key={format.type}
                                text={format.title}
                                onPress={() => setQuestionType(format.type)}
                            />;
                        }
                    })
                }
                <VerticalSpacer />
                <PrimaryButton text="Add Question" onPress={() => { }} />
            </ThemedView>
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
    }
});