import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { themedStyles } from '../ThemedView';

type NumberInputProps = TextInputProps & {
    numberValue: number | null;
    onNumberChange: (value: number | null) => void;
};

export const NumberInput = (props: NumberInputProps) => {
    const {
        numberValue,
        onChangeText,
        value,
        ...rest
    } = props;

    const onInputChange = (val: string) => {
        if (!onChangeText)
            return;
        if (isFinite(Number(val))) {
            onChangeText(Number(val).toString());
        } else {
            onChangeText(value ?? '');
        }
    }

    return (
        <TextInput
            onChangeText={onInputChange}
            value={value}
            keyboardType="numeric"
            style={themedStyles.input}
            {...rest}
        />
    );
};