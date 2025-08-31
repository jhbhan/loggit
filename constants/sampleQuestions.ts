import { FormQuestion, QuestionFormat } from '@jhbhan/rn-form';

export const beforeBedQuestions: FormQuestion[] = [
  {
    id: 1,
    text: 'Did you drink caffeine today?',
    format: QuestionFormat.TrueFalse,
    required: false,
  },
  {
    id: 1,
    text: '# of Caffeinated Drinks',
    format: QuestionFormat.Number,
    required: false,
  },
  {
    id: 2,
    text: 'Any concerning food?',
    format: QuestionFormat.Text,
    required: false,
  },
  {
    id: 3,
    text: 'Any naps?',
    format: QuestionFormat.TrueFalse, // Could also be custom if you want structured input
    required: false,
  },
  {
    id: 5,
    text: "How long?",
    format: QuestionFormat.Number,
    required: false,
    dependancy: {
      questionId: 3,
      value: true,
    },
  },
  {
    id: 6,
    text: 'Did you exercise today?',
    format: QuestionFormat.TrueFalse, // same note as above
    required: false,
  },
  {
    id: 7,
    text: "How long?",
    format: QuestionFormat.Number,
    required: false,
    dependancy: {
      questionId: 6,
      value: true,
    },
  },
  {
    id: 8,
    text: 'How Sleepy I Felt During the Day (1-5)',
    format: QuestionFormat.Rating,
    required: false,
  },
  {
    id: 9,
    text: 'Any Changes Made?',
    format: QuestionFormat.Text,
    required: false,
  },
];

export const morningQuestions: FormQuestion[] = [
  {
    id: 1,
    text: 'Time Went to Bed',
    format: QuestionFormat.Text, // or define QuestionFormat.Time if you want structured
    required: false,
  },
  {
    id: 2,
    text: 'Time Got out of Bed',
    format: QuestionFormat.Text, // same note as above
    required: false,
  },
  {
    id: 3,
    text: 'Hours Spent in Bed Last Night',
    format: QuestionFormat.Number,
    required: false,
  },
  {
    id: 4,
    text: 'How Long it Took to Fall Asleep',
    format: QuestionFormat.Number, // minutes
    required: false,
  },
  {
    id: 5,
    text: 'Level of Alertness (1-5)',
    format: QuestionFormat.Rating,
    required: false,
  },
];
