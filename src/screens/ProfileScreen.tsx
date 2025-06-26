import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../store/hooks';
import {logout} from '../store/slices/authSlice';
import {Button} from '../components/Button';
import {storage, StorageKeys} from '../utils/storage';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await storage.removeItem(StorageKeys.AUTH_TOKEN);
              await storage.removeItem(StorageKeys.USER_DATA);
              dispatch(logout());
              navigation.replace('Auth');
            } catch (error) {
              console.error('Logout failed:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {/* <Text style={styles.avatarText}>
            {user.firstName.charAt(0).toUpperCase()}
          </Text> */}
          <Image
            source={{uri: user.image}}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          />
        </View>
        <Text style={styles.name}>{user.firstName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="user" size={24} color="#333" />
          <Text style={styles.menuText}>Edit Profile</Text>
          <Feather name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="shopping-bag" size={24} color="#333" />
          <Text style={styles.menuText}>Order History</Text>
          <Feather name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="map-pin" size={24} color="#333" />
          <Text style={styles.menuText}>Shipping Addresses</Text>
          <Feather name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="credit-card" size={24} color="#333" />
          <Text style={styles.menuText}>Payment Methods</Text>
          <Feather name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="bell" size={24} color="#333" />
          <Text style={styles.menuText}>Notifications</Text>
          <Feather name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="lock" size={24} color="#333" />
          <Text style={styles.menuText}>Privacy Settings</Text>
          <Feather name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, styles.logoutSection]}>
        <Button
          title="Logout"
          onPress={handleLogout}
          loading={loading}
          variant="primary"
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  logoutSection: {
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 10,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
