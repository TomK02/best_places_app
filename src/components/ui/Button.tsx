import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { GlobalTheme } from '../../themes/constants';

interface ButtonProps {
  children: string;
  onPress: () => void;
}

function Button({ children, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: GlobalTheme.colors.primary800,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: GlobalTheme.colors.primary50,
  },
});
