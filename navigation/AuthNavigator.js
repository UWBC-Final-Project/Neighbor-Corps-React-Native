import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// import Login from '../screens/Auth/Login';
// import SignUp from '../screens/Auth/SignUp';

import WelcomeScreen from '../screens/WelcomeScreen';


//User Auth
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

// export default createStackNavigator({
//   LoginScreen: {
//     screen: LoginScreen,
//     // path: "/signup"
//   },
//   SignUpScreen: {
//     screen: SignUpScreen,
//     // path: "/signup"
//   }
// });

// HomeStack.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };
const AuthStack = createStackNavigator({
  WelcomeScreen: WelcomeScreen,
  LoginScreen: {
    screen: LoginScreen,
    // path: "/signup"
  },
  SignUpScreen: {
    screen: SignUpScreen,
    // path: "/signup"
  }
});


export default AuthStack