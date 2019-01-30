import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { ACTION_MANAGE_DEFAULT_APPS_SETTINGS } from 'expo/build/IntentLauncherAndroid';

// layouts
import Header from './components/Header';
import TabBarIcon from './components/TabBarIcon';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//Tasks Feed
import TasksScreen from './screens/TasksScreen';
import SingleTaskScreen from './screens/SingleTaskScreen';

//Tasks Map view
import TasksMapView from './screens/TasksMapView';

//Create new Task
import UploadPhoto from './screens/UploadPhoto';
import MediaGPS from './screens/MediaGPS';
import CreateTaskScreen from './screens/CreateTaskScreen';

//User Profile
import UserProfileScreen from './screens/UserProfileScreen';

//Welcome screen
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import WelcomeScreenT from './screens/WelcomeScreenT';

//User Auth
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

//Contact
import ContactScreen from './screens/ContactScreen';
//-- About us

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
          <Text> Hello </Text>
    
          {/* <StatusBar barStyle="default" />
          <AppNavigator /> */}

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



//Feed view (Home)
const WelcomeStack = createStackNavigator({
  Home:{
    // change the 
    screen: WelcomeScreen,
  },
  LoginScreen:{
    screen: LoginScreen,
  },
  SignUpScreen:{
    screen: SignUpScreen,
  },
  // App:{
  //   screen: App,
  // },

});

WelcomeStack.navigationOptions = {
  // tabBarVisible: false,
};



// Feed view (TasksScreen)
const FeedStack = createStackNavigator({
  TasksScreen:{
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

export default 

WelcomeStack
FeedStack

createBottomTabNavigator(
  {
  FeedStack,
  MapStack,
  NewTaskStack,
  // WatchStack,
  UserStack
},
);