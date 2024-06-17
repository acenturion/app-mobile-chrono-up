import React, {useState} from 'react';
import {TouchableOpacity, Text, ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingButton = ({onPress, title, style}) => {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    try {
      setLoading(true);
      await onPress();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPressIn={handlePress}
      style={[styles.button, style, loading && styles.buttonDisabled]}
      activeOpacity={loading ? 1 : 0.7}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff"/>
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
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
  buttonPressed: {
    backgroundColor: '#0056b3',
  },
  buttonDisabled: {
    backgroundColor: '#7a7a7a',
  },
});

export default LoadingButton;