import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
//Tasks Feed
import TasksScreen from '../screens/TasksScreen';
import SingleTaskScreen from '../screens/SingleTaskScreen';

//Tasks Map view
import TasksMapView from '../screens/TasksMapView';

//Create new Task
import UploadPhoto from '../screens/UploadPhoto';
import MediaGPS from '../screens/MediaGPS';
import CreateTaskScreen from '../screens/CreateTaskScreen';

//User Profile
import UserProfileScreen from '../screens/UserProfileScreen';



// Feed view (TasksScreen)
const FeedStack = createStackNavigator({
  Home:{
    screen: TasksScreen,
  },
  // view single task and make comment
  SingleTaskScreen:{
    screen: SingleTaskScreen,
  }, 
  // log in to Comment (navigate to welcome screen)
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
  },
  SingleTaskScreen:{
    screen: SingleTaskScreen,
  }, 
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
  // upload photo first
  UploadPhoto:{
    screen: UploadPhoto,
  },
  // then confirm or drop location
  MediaGPS:{
    screen: MediaGPS,
  }, 
  // fill out the form 
  CreateTaskScreen:{
    screen: CreateTaskScreen,
  } 
  
});

NewTaskStack.navigationOptions = {
  tabBarLabel: 'Create Task',
  // tabBarVisible: false,
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


export default 

// NewTaskStack

createBottomTabNavigator({
  FeedStack,
  MapStack,
  NewTaskStack,
  // WatchStack,
  UserStack
});
