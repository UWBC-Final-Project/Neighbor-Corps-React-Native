import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';
// import MyFavorites from '../screens/MyFavorites';
// import BookDetail from '../screens/BookDetail';
import TasksScreen from '../screens/TasksScreen';
import TasksMapView from '../screens/TasksMapView';
import UserProfileScreen from '../screens/UserProfileScreen';
import UploadPhoto from '../screens/UploadPhoto';
import MediaGPS from '../screens/MediaGPS';

// Feed view (TasksScreen)
const FeedStack = createStackNavigator({
  TasksScreen:{
    screen: TasksScreen,
  } 
});

FeedStack.navigationOptions = {
  tabBarLabel: 'Task Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};


// Map View (TasksMapView)
const MapStack = createStackNavigator({
  TasksMapView:{
    screen: TasksMapView,
  } 
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map View',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
    />
  ),
};


// New Task (UploadPhoto)
const NewTaskStack = createStackNavigator({
  UploadPhoto:{
    screen: UploadPhoto,
  },
  MediaGPS:{
    screen: MediaGPS,
    // navigationOptions: { tabBar: { visible: false }}
  }, 
  // MediaGPS:{
  //   screen: MediaGPS,
  // } 
  
});

NewTaskStack.navigationOptions = {
  tabBarLabel: 'Create Task',
  tabBarVisible: false,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
    />
  ),
};

// User Profile (UserProfileScreen)
const UserStack = createStackNavigator({
  UserProfileScreen:{
    screen: UserProfileScreen,
  } 
});

UserStack.navigationOptions = {
  tabBarLabel: 'User',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  FeedStack,
  MapStack,
  NewTaskStack,
  // WatchStack,
  UserStack
});