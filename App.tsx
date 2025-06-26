import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {ProductsScreen} from './src/screens/ProductsScreen';
import {CartScreen} from './src/screens/CartScreen';
import {LoginScreen} from './src/screens/LoginScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';
import {SplashScreen} from './src/screens/SplashScreen';
import {ErrorBoundary} from './src/components/ErrorBoundary';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import {SearchScreen} from './src/screens/SearchScreen';
import {RootStackParamList, TabParamList} from './src/navigation/types';
import {useAppDispatch, useAppSelector} from './src/store/hooks';
import {loadToken, selectToken, selectUser, selectIsInitialized} from './src/store/slices/authSlice';
import {loadCartFromStorage, setCartItems} from './src/store/slices/cartSlice';

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
          } else if (route.name === 'Search') {
            iconName = 'search';
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
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
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
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const user = useAppSelector(selectUser);
  const isInitialized = useAppSelector(selectIsInitialized);
  const isAuthenticated = token && user;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      await dispatch(loadToken());
      // Load saved cart items
      const savedCartItems = await loadCartFromStorage();
      dispatch(setCartItems(savedCartItems));
      // Add minimum delay for splash screen
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    initApp();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {(isLoading || !isInitialized) ? (
        <SplashScreen />
      ) : isAuthenticated ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Auth" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <NavigationRoot />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
