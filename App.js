import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { createStackNavigator } from 'react-navigation';

import ContactScreen from './screens/ContactScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import SingleTaskScreen from './screens/SingleTaskScreen';
import TasksScreen from './screens/TasksScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { ACTION_MANAGE_DEFAULT_APPS_SETTINGS } from 'expo/build/IntentLauncherAndroid';

// import { Button } from 'native-base';

class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>
            All Navigation Pages for Testing
          </Text>
          <Button
            onPress={() => {
              this.props.navigation.navigate('CreateTask');
            }}
            title="Create Task"
          />
          <Button
            onPress={() => {
              this.props.navigation.navigate('Contact');
            }}
            title="Contact"
          />
          <Button
            onPress={() => {
              this.props.navigation.navigate('HomeScreen');
            }}
            title="Home Screen"
          />
          <Button
            onPress={() => {
              this.props.navigation.navigate('LoginScreen');
            }}
            title="Login Screen"
          />
          <Button
            onPress={() => {
              this.props.navigation.navigate('SignUpScreen');
            }}
            title="Sign Up Screen"
          />
          <Button
            onPress={() => {
              this.props.navigation.navigate('SingleTaskScreen');
            }}
            title="Single Task Screen"
          />
          <Button
            onPress={() => {
              this.props.navigation.navigate('TasksScreen');
            }}
            title="Tasks Screen"
          />
          <Button
            onPress={() => {
              this.props.navigation.navigate('WelcomeScreen');
            }}
            title="Welcome Screen"
          />
          <Button
            onPress={() => {
              this.props.navigation.navigate('UserProfileScreen');
            }}
            title="User Profile Screen"
          />
          {/* {Platform.OS === 'ios' && <StatusBar barStyle="default" />} */}
          {/* <AppNavigator /> */}
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const Screens = createStackNavigator({
  Home: {
    screen: App,
    navigationOptions: ({ navigation }) => {
      title: 'App Test Home'
    }
  },
  CreateTask: {
    screen: CreateTaskScreen,
    navigationOptions: ({ navigation }) => {
      title: 'Create Task'
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => {
      title: 'Login Screen'
    }
  },
  Contact: {
    screen: ContactScreen,
    navigationOptions: ({ navigation }) => {
      title: 'Contact'
    }
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => {
      title: 'Home Screen'
    }
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: ({ navigation }) => {
      title: 'Sign Up Screen'
    }
  },
  SingleTaskScreen: {
    screen: SingleTaskScreen,
    navigationOptions: ({ navigation }) => {
      title: 'Sign Up Screen'
    }
  },
  TasksScreen: {
    screen: TasksScreen,
    navigationOptions: ({ navigation }) => {
      title: 'Tasks Screen'
    }
  },
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: ({ navigation }) => {
      title: 'Welcome Screen'
    }
  },
  UserProfileScreen: {
    screen: UserProfileScreen,
    navigationOptions: ({ navigation }) => {
      title: 'User Profile Screen'
    }
  },
})

export default Screens;