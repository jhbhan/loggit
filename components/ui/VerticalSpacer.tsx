import React from 'react';
import { View } from 'react-native';

interface VerticalSpacerProps {
    height?: number;
}

export const VerticalSpacer = ({ height }: VerticalSpacerProps) => (
    <View style={height ? { height } : { flex: 1 }} />
);
