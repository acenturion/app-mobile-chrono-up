import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, title }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Button;