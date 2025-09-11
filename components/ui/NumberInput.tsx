import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { themedStyles } from '../ThemedView';

type NumberInputProps = TextInputProps & {
    numberValue: number | null;
    onNumberChange: (value: number | null) => void;
    min?: number;
    max?: number;
};

export const NumberInput = (props: NumberInputProps) => {
    const {
        numberValue,
        onNumberChange,
        onChangeText,
        value,
        style,
        ...rest
    } = props;

    const onInputChange = (val: string) => {
        if (!onChangeText)
            return;
        if (isFinite(Number(val))) {
            const newValue = Number(val);
            if (props.min !== undefined && newValue < props.min) {
                onChangeText(props.min.toString());
                onNumberChange(props.min);
            } else if (props.max !== undefined && newValue > props.max) {
                onChangeText(props.max.toString());
                onNumberChange(props.max);
            } else {
                onChangeText(Number(val).toString());
                onNumberChange(Number(val));
            }
        } else {
            onChangeText(value ?? '');
        }
    }

    return (
        <TextInput
            onChangeText={onInputChange}
            value={value}
            keyboardType="numeric"
            style={[themedStyles.input, style]}
            {...rest}
        />
    );
};