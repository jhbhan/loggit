
import NavHeader from '@/components/NavHeader';
import { PrimaryButton, SecondaryButton } from '@/components/ThemedButton';
import { ThemedSafeAreaView, themedStyles, ThemedView } from '@/components/ThemedView';
import { useAppSelector } from '@/store/store';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';

export default function QuestionScreen() {
  const questions = useAppSelector((state) => state.log.questions);
  const [questionFilterText, setQuestionFilterText] = React.useState('');
  const filteredQuestions = questions.filter((question) =>
    question.text.toLowerCase().includes(questionFilterText.toLowerCase())
  );
  const onAddClicked = (questionId: number | undefined) => {
    router.push({
      pathname: '/(tabs)/settings/addQuestion',
      params: {
        questionId: questionId
      }
    })
  }
  
  return (
    <ThemedSafeAreaView style={themedStyles.listContainer}>
      <NavHeader showBackButton={true} title="Questions" />
        <ThemedView avoidTabNav style={[themedStyles.listContainer]}>
          <TextInput
            style={themedStyles.input}
            value={questionFilterText}
            onChangeText={setQuestionFilterText}
            placeholder="Search questions"
          />
          <ScrollView>
            {filteredQuestions.map((question) => (
              <Animated.View
                key={question.id}
              >
                <ThemedView>
                  <SecondaryButton
                    text={question.text}
                    onPress={() => onAddClicked(question.id)}
                  />
                </ThemedView>
              </Animated.View>
            ))}
          </ScrollView>
          <PrimaryButton text="Add a new question" onPress={() => onAddClicked(undefined)} />
        </ThemedView>
    </ThemedSafeAreaView>
  );
}