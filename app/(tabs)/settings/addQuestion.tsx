import NavHeader from '@/components/NavHeader';
import { PrimaryButton, SecondaryButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedSafeAreaView, themedStyles, ThemedView } from '@/components/ThemedView';
import { NumberInput } from '@/components/ui/NumberInput';
import { VerticalSpacer } from '@/components/ui/VerticalSpacer';
import { questionFormats } from '@/constants/types';
import { getQuestionForId, saveQuestion } from '@/store/logSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { QuestionFormat } from '@jhbhan/rn-form';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TextInput
} from 'react-native';

export default function AddQuestion() {
    const { questionId } = useLocalSearchParams();
    const selectedQuestion = useAppSelector(getQuestionForId(Number(questionId)));
    const [questionText, setQuestionText] = useState(selectedQuestion?.text ?? '');
    const [questionType, setQuestionType] = useState<QuestionFormat>(selectedQuestion?.format ?? QuestionFormat.Text);
    const [minimum, setMinimum] = useState<number | null>(selectedQuestion?.ratingMin ?? null);
    const [maximum, setMaximum] = useState<number | null>(selectedQuestion?.ratingMax ?? null);
    const [multipleChoiceOptions, setMultipleChoiceOptions] = useState<string[]>(selectedQuestion?.options ?? []);
    const [multipleChoiceQuestionText, setMultipleChoiceQuestionText] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        if (questionId) {
            
        }
    }, [questionId]);

    const onAdd = () => {
        dispatch(saveQuestion({
            id: questionId ? Number(questionId) : undefined,
            text: questionText,
            format: questionType,
            options: multipleChoiceOptions
        }));

        navigation.goBack();
    }

    return (
        <ThemedSafeAreaView style={themedStyles.listContainer}>
            <NavHeader showBackButton={true} />
            <ThemedView style={themedStyles.listContainer} avoidTabNav>
                <ThemedText style={styles.label}>Question Text</ThemedText>
                <TextInput
                    style={themedStyles.input}
                    value={questionText}
                    onChangeText={setQuestionText}
                    placeholder="Enter your question"
                />
                <ThemedView style={themedStyles.grid}>
                    {questionFormats.map((format) => {
                        const isSelected = format.type === questionType;
                        const ButtonComponent = isSelected ? PrimaryButton : SecondaryButton;
                        return (
                            <ThemedView key={format.type} style={themedStyles.col2Item}>
                                <ButtonComponent
                                    text={format.title}
                                    onPress={() => setQuestionType(format.type)}
                                />
                            </ThemedView>
                        );
                    })}
                </ThemedView>
                {
                    questionType === QuestionFormat.Number &&
                    <>
                        <ThemedView>
                            <ThemedText type='subtitle'>Minimum</ThemedText>
                            <NumberInput
                                numberValue={minimum}
                                onNumberChange={(val: number | null) => setMinimum(val)}
                            />
                        </ThemedView>
                        <ThemedView>
                            <ThemedText type='subtitle'>Maximum</ThemedText>
                            <NumberInput
                                numberValue={maximum}
                                onNumberChange={(val: number | null) => setMaximum(val)}
                            />
                        </ThemedView>
                    </>
                }
                {
                    questionType === QuestionFormat.MultipleChoice &&
                    <ThemedView>
                        <ThemedText type='subtitle'>Options</ThemedText>
                        <ThemedView style={themedStyles.grid}>
                        {
                            multipleChoiceOptions.map((option, index) => (
                                <SecondaryButton
                                    key={index}
                                    style={themedStyles.col2Item}
                                    text={option}
                                    disabled={true}
                                />
                            ))
                        }
                        </ThemedView>
                        <TextInput
                            style={themedStyles.input}
                            value={multipleChoiceQuestionText}
                            onChangeText={setMultipleChoiceQuestionText}
                            placeholder="Enter your options"
                        />
                        <SecondaryButton text="Add Option" onPress={() => {
                            setMultipleChoiceOptions([...multipleChoiceOptions, multipleChoiceQuestionText]);
                            setMultipleChoiceQuestionText('');
                        }} />
                    </ThemedView>
                }
                <VerticalSpacer />
                <PrimaryButton
                    text={questionId ? "Save" : "Add"}
                    onPress={onAdd}
                />
            </ThemedView>
        </ThemedSafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fff' },
    label: { fontWeight: 'bold', marginTop: 16, marginBottom: 4 }
});