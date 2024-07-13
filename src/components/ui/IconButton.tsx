import React from 'react';
import { ColorValue, Pressable, StyleSheet } from 'react-native';
import FontAwesomeIcons from './FontAwesomeIcons';

interface IconButtonProps {
  icon: string;
  size: number;
  color?: ColorValue;
  onPress: () => void;
}

function IconButton({ icon, size, color, onPress }: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <FontAwesomeIcons name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
