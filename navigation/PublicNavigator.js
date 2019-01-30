import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//Welcome
import WelcomeScreen from '../screens/WelcomeScreen';

//Contact
import Contact from '../screens/Contact';

//User Auth
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

//Tasks View
import TasksScreen from '../screens/TasksScreen';

import App_TestingLinks from '../screens/App_TestingLinks';

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
  TasksScreen:{
    screen: TasksScreen,
  },
  //will come later
  // Contact:{
  //   screen: Contact,
  // },
  App_TestingLinks:{
    screen: App_TestingLinks,
  },
});

export default PublicStack