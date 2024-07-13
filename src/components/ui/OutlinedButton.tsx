import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import FontAwesomeIcons from './FontAwesomeIcons';
import { GlobalTheme } from '../../themes/constants';

interface OutlinedButtonProps {
  onPress: () => void;
  icon: string;
  children: string;
}

function OutlinedButton({ onPress, icon, children }: OutlinedButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <FontAwesomeIcons
        style={styles.icon}
        name={icon}
        color={GlobalTheme.colors.primary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: GlobalTheme.colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: { marginRight: 6 },
  text: {
    color: GlobalTheme.colors.primary500,
  },
});
