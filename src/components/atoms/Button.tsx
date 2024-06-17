import React from 'react';
import {Pressable, Text, StyleSheet, StyleProp, ActivityIndicator} from 'react-native';

interface ButtonProps {
  onPress: (a: any) => void;
  title: string;
  style?: StyleProp<any>;
}

const Button: React.FC<ButtonProps> = ({onPress, title, style}) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
});

export default Button;