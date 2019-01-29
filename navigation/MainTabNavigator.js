import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';
// import MyFavorites from '../screens/MyFavorites';
// import BookDetail from '../screens/BookDetail';
// import TasksScreen from '../screens/TasksScreen';
import TasksMapView from '../screens/TasksMapView';
import UserProfileScreen from '../screens/UserProfileScreen';


const HomeStack = createStackNavigator({
  Home: UserProfileScreen,
  // TasksView: {
  //   screen: TasksView,
  //   // path: "/detail"
  // }
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


const UserStack = createStackNavigator({
  TasksMapView: {
    screen: TasksMapView,
    navigationOptions: ({ navigation }) => {
      title: 'Media GPS'
    }}
});

UserStack.navigationOptions = {
  tabBarLabel: 'User',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};





const TasksMapViewStack = createStackNavigator({
  TasksMapView: {
    screen: TasksMapView,
    navigationOptions: ({ navigation }) => {
      title: 'Media GPS'
    }}
});

TasksMapViewStack.navigationOptions = {
  tabBarLabel: 'MyFavorites',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  TasksMapViewStack,
  UserStack
});
