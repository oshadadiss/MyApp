import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../store/hooks';
import {logoutUser, getUserDetails, selectToken} from '../store/slices/authSlice';
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
  const token = useAppSelector(selectToken);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const result = await dispatch(getUserDetails()).unwrap();
          console.log('User details fetched:', result);
        } catch (error) {
          console.error('Failed to fetch user details:', error);
          Alert.alert('Error', 'Failed to fetch user details');
        }
      } else {
        console.log('No token available');
        navigation.replace('Auth');
      }
    };

    fetchUserDetails();
  }, [dispatch, token, navigation]);

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
              await dispatch(logoutUser()).unwrap();
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
          <Image
            source={{uri: user.image}}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={`${user.firstName} ${user.lastName}`}
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={user.email} editable={false} />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Designation</Text>
          <TextInput
            style={styles.input}
            value={user.company?.title || 'Not specified'}
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Works At</Text>
          <TextInput
            style={styles.input}
            value={user.company?.name || 'Not specified'}
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            value={user.gender}
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Contact</Text>
          <TextInput
            style={styles.input}
            value={user.phone || 'Not specified'}
            editable={false}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Studies At</Text>
          <TextInput
            style={styles.input}
            value={user.university || 'Not specified'}
            editable={false}
          />
        </View>
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
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  logoutSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
