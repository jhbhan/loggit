import { FormQuestion, QuestionFormat } from '@jhbhan/rn-form';

export const sampleQuestions: FormQuestion[] = [
  {
    id: 1,
    text: 'What is your name?',
    format: QuestionFormat.Text,
    required: true,
  },
  {
    id: 2,
    text: 'How old are you?',
    format: QuestionFormat.Number,
    required: true,
  },
  {
    id: 3,
    text: 'Do you like ice cream?',
    format: QuestionFormat.TrueFalse,
    required: false,
  },
  {
    id: 4,
    text: 'What is your favorite color?',
    format: QuestionFormat.MultipleChoice,
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    required: false,
  },
  {
    id: 5,
    text: 'Rate your experience',
    format: QuestionFormat.Rating,
    required: false,
  },
  {
    id: 6,
    text: 'Why do you like ice cream?',
    format: QuestionFormat.Text,
    dependancy: {
      questionId: 3,
      value: true,
    },
    required: false,
  },
];
