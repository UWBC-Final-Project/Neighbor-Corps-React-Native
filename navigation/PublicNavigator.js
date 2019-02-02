import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//Welcome
import WelcomeScreen from '../screens/WelcomeScreen';

// *** coming screens and contents:
//ContactScreen
//About us


//User Auth
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

//Tasks View
import TasksScreen from '../screens/TasksScreen';
import TasksMapView from '../screens/TasksMapView';

const PublicStack = createStackNavigator({
  WelcomeScreen: WelcomeScreen,
  //Auth
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  LoginScreen: {
    screen: LoginScreen,
  },
  SignUpScreen: {
    screen: SignUpScreen,
  },
  TaskFeeds:{
    screen: TasksScreen,
  },
  TaskMap:{
    screen: TasksMapView,
  },
});

export default PublicStack