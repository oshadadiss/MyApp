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
import {useAppDispatch} from '../store/hooks';
import {setUser} from '../store/slices/userSlice';
import {Button} from '../components/Button';
import {LoadingSpinner} from '../components/LoadingSpinner';
import {validateEmail, validatePassword} from '../utils/validation';
import {storage, StorageKeys} from '../utils/storage';

export const LoginScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (!validateEmail(email)) {
      newErrors.push('Please enter a valid email address');
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.push(...passwordValidation.errors);
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors([]);

    try {
      // Simulated API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userData = {
        id: '1',
        email,
        name: 'John Doe',
      };

      await storage.setItem(StorageKeys.USER_DATA, userData);
      await storage.setItem(StorageKeys.AUTH_TOKEN, 'dummy-token');

      dispatch(setUser(userData));
    } catch (error) {
      setErrors(['Login failed. Please try again.']);
    } finally {
      setLoading(false);
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

          {errors.map((error, index) => (
            <Text key={index} style={styles.errorText}>
              {error}
            </Text>
          ))}

          <Button
            title="Login"
            onPress={handleLogin}
            disabled={loading}
            loading={loading}
            style={styles.button}
          />
        </View>

        {loading && <LoadingSpinner />}
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
    marginBottom: 10,
    fontSize: 14,
  },
});
