import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {RootState} from '../store/store';

type RootTabParamList = {
  Home: undefined,
  Settings: undefined,
};

type Props = BottomTabScreenProps<RootTabParamList, 'Home'>;

const HomeScreen: React.FC<Props> = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <View style={styles.container}>
      <Feather name="home" size={50} color="#007AFF" />
      <Text style={styles.title}>Welcome to MyApp</Text>
      <Text style={styles.subtitle}>
        {user ? `Hello, ${user.name}!` : 'Please sign in'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
});

export default HomeScreen;