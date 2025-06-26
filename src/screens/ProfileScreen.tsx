import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../store/hooks';
import {logout} from '../store/slices/authSlice';
import {Button} from '../components/Button';
import {storage, StorageKeys} from '../utils/storage';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';

export const ProfileScreen: React.FC = () => {
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
          <Text style={styles.avatarText}>
            {user.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
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

      <Button
        title="Logout"
        onPress={handleLogout}
        variant="outline"
        loading={loading}
        style={styles.logoutButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
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
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    margin: 20,
  },
});
