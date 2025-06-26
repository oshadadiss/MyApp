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
import {setUser, setToken, setLoading, setError} from '../store/slices/authSlice';
import {Button} from '../components/Button';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {validateEmail, validatePassword} from '../utils/validation';
import {storage, StorageKeys} from '../utils/storage';
import {authService} from '../services/authService';

export const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {isLoading, error} = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!validateEmail(email)) {
      newErrors.push('Please enter a valid email address');
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.push(...passwordValidation.errors);
    }

    setValidationErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await authService.login({email, password});
      
      await storage.setItem(StorageKeys.USER_DATA, response.user);
      await storage.setItem(StorageKeys.AUTH_TOKEN, response.token);

      dispatch(setUser(response.user));
      dispatch(setToken(response.token));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Login failed'));
      setValidationErrors(['Login failed. Please try again.']);
    } finally {
      dispatch(setLoading(false));
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
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
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

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <Button
            title="Login"
            onPress={handleLogin}
            disabled={isLoading}
            loading={isLoading}
            style={styles.button}
          />
        </View>

        {isLoading && <LoadingSpinner />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    color: '#333',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  button: {
    marginTop: 10,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
