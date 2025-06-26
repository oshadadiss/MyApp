import React, {useEffect} from 'react';
import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {setUser, setToken} from '../store/slices/authSlice';
import {storage, StorageKeys} from '../utils/storage';
import {RootStackParamList} from '../navigation/types';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

export const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const {user, token} = useAppSelector(state => state.auth);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Simulate splash screen delay
      const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2000));

      // Check stored auth data
      const [storedUser, storedToken] = await Promise.all([
        storage.getItem(StorageKeys.USER_DATA),
        storage.getItem(StorageKeys.AUTH_TOKEN),
        minLoadingTime,
      ]);

      if (storedToken && storedUser) {
        // Restore auth state if not already set
        if (!user || !token) {
          dispatch(setUser(storedUser));
          dispatch(setToken(storedToken));
        }
        navigation.replace('Main');
      } else {
        navigation.replace('Auth');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      navigation.replace('Auth');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 200,
    height: 200,
  },
  loader: {
    marginTop: 20,
  },
});
