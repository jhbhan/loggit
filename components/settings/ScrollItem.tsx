import React from 'react';
import { View } from 'react-native';

interface ScrollItemProps {
  children: React.ReactNode;
}

export const ScrollItem = (props: ScrollItemProps) => {
    const {
        children
    } = props;
  return (
    <View style={{marginVertical: 2}}>
        {children}
    </View>
  );
};