import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Switch, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

type RootTabParamList = {
  Home: undefined,
  Settings: undefined,
};

type Props = BottomTabScreenProps<RootTabParamList, 'Settings'>;

const SettingsScreen: React.FC<Props> = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async (): Promise<void> => {
    try {
      const darkModeSetting = await AsyncStorage.getItem('darkMode');
      const notificationsSetting = await AsyncStorage.getItem('notifications');

      if (darkModeSetting !== null) {
        setDarkMode(JSON.parse(darkModeSetting));
      }
      if (notificationsSetting !== null) {
        setNotifications(JSON.parse(notificationsSetting));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load settings');
    }
  };

  const saveSetting = async (key: string, value: boolean): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <View style={styles.settingIcon}>
          <Feather name="moon" size={24} color="#007AFF" />
        </View>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={value => {
            setDarkMode(value);
            saveSetting('darkMode', value);
          }}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingIcon}>
          <Feather name="bell" size={24} color="#007AFF" />
        </View>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={value => {
            setNotifications(value);
            saveSetting('notifications', value);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default SettingsScreen;
