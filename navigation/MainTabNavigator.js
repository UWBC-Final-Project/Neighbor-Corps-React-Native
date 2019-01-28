import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import UploadPhoto from '../screens/UploadPhoto';

const HomeStack = createStackNavigator({
  Home: UploadPhoto,
  UploadPhoto: {
    screen: UploadPhoto,
    // path: "/detail"
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const MyFavoritesStack = createStackNavigator({
  UserProfileScreen: UserProfileScreen,
});

MyFavoritesStack.navigationOptions = {
  tabBarLabel: 'UserProfileScreen',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  UserProfileScreen
});
