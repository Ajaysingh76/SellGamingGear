import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import Form from './components/Form';
import ProductList from './components/ProductList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Form">
        <Stack.Screen
          name="Form"
          component={Form}
          options={{ headerShown: false }} // ✅ No header on form screen
        />
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ title: 'Product Listings' }} // Optional: customize header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

