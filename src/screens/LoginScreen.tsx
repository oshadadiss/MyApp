import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  loginUser,
  selectError,
  selectIsLoading,
} from '../store/slices/authSlice';
import {Button} from '../components/Button';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {validateEmail, validatePassword} from '../utils/validation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export const LoginScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!username.trim()) {
      newErrors.push('Please enter a username');
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.push(...passwordValidation.errors);
    }

    setValidationErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleLogin = async () => {
    // if (!validateForm()) return;

    try {
      console.log('Attempting login with:', {username, password});
      const result = await dispatch(
        loginUser({
          username,
          password,
          expiresInMins: 30,
        }),
      ).unwrap();
      console.log('Login successful:', result);
      navigation.replace('Main');
    } catch (error) {
      console.error('Login error:', error);
      setValidationErrors([
        error instanceof Error ? error.message : 'Login failed',
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <Text style={styles.title}>Welcome Back</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoComplete="username"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />

          {validationErrors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              {error}
            </Text>
          ))}

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Button
            title="Login"
            onPress={handleLogin}
            disabled={isLoading}
            variant="primary"
            style={styles.button}
          />

          {isLoading && <LoadingSpinner />}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    color: '#333',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
