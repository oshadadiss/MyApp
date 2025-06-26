import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {ProductsScreen} from './src/screens/ProductsScreen';
import {CartScreen} from './src/screens/CartScreen';
import {LoginScreen} from './src/screens/LoginScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';
import {useAppSelector} from './src/store/hooks';
import {ErrorBoundary} from './src/components/ErrorBoundary';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';

type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

type TabParamList = {
  Products: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName: string;

          if (route.name === 'Products') {
            iconName = 'shopping-bag';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else {
            iconName = 'circle';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          title: 'Shop',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'My Cart',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const NavigationRoot = () => {
  const user = useAppSelector(state => state.user.user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <NavigationRoot />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
