import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
// import AppNavigator from './navigation/AppNavigator';
// import { createStackNavigator } from 'react-navigation';
import Header from './components/Header';
import ContactScreen from './screens/ContactScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import SingleTaskScreen from './screens/SingleTaskScreen';
import TasksScreen from './screens/TasksScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import CommentScreen from './components/Comment';
import MapScreen from './screens/MapScreen';
import { ACTION_MANAGE_DEFAULT_APPS_SETTINGS } from 'expo/build/IntentLauncherAndroid';

// from Jia
import UploadPhoto from './screens/UploadPhoto';
import MediaGPS from './screens/MediaGPS';
import DropMarker from './screens/DropMarker';
import TasksMapView from './screens/TasksMapView';


import TabBarIcon from './components/TabBarIcon';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';



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
          {/* <Text> Hello </Text> */}
    
          <StatusBar barStyle="default" />
          <AppNavigator />

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

// const Screens = createStackNavigator({
//   Home: {
//    // manipulate the start screen over here
//     // screen: App, 
//     screen: App,
//     navigationOptions: ({ navigation }) => {
//       title: 'App Test Home'
//     }
//   },
//   CreateTask: {
//     screen: CreateTaskScreen,
//     navigationOptions: ({ navigation }) => {
//       title: 'Create Task'
//     }
//   },
//   LoginScreen: {
//     screen: LoginScreen,
//     navigationOptions: ({ navigation }) => {
//       title: 'Login Screen'
//     }
//   },
//   Comments: {
//     screen: CommentScreen,
//     navigationOptions: ({ navigation }) => {
//       title: 'Comments'
//     }
//   },
//   Contact: {
//     screen: ContactScreen,
//     navigationOptions: ({ navigation }) => {
//       title: 'Contact'
//     }
//   },
//   HomeScreen: {
//     screen: HomeScreen,
//     navigationOptions: ({ navigation }) => {
//       title: 'Home Screen'
//     }
//   },
//   SignUpScreen: {
//     screen: SignUpScreen,
//     navigationOptions: ({ navigation }) => {
//       title: 'Sign Up Screen'
//     }
//   },
//   SingleTaskScreen: {
//     screen: SingleTaskScreen,
//     navigationOptions: ({ navigation }) => {
//       title: 'Single Task Screen'
//     }
//   },
//   // TasksScreen: {
//   //   screen: TasksScreen,
//   //   navigationOptions: ({ navigation }) => {
//   //     title: 'Tasks Screen'
//   //   }
//   // },
//   WelcomeScreen: {
//     screen: WelcomeScreen,
//     navigationOptions: ({ navigation }) => {
//       title: 'Welcome Screen'
//     }
//   },
//   // UserProfileScreen: {
//   //   screen: UserProfileScreen,
//   //   navigationOptions: ({ navigation }) => {
//   //     title: 'User Profile Screen'
//   //   }
//   // },
//   // MapScreen: {
//   //   screen: MapScreen,
//   //   navigationOptions: ({ navigation }) => {
//   //     title: 'Map Screen'
//   //     }
//   //   },
//   // // from Jia
//   // UploadPhoto: {
//   //   screen: UploadPhoto,
//   //   navigationOptions: ({ navigation }) => {
//   //     title: 'Uplode Media'
//   //   }
//   // },
//   // MediaGPS: {
//   //   screen: MediaGPS,
//   //   navigationOptions: ({ navigation }) => {
//   //     title: 'Media GPS'
//   //   }
//   // },
//   // DropMarker: {
//   //   screen: DropMarker,
//   //   navigationOptions: ({ navigation }) => {
//   //     title: 'Drop Marker'
//   //   }
//   // }
// })

// export default Screens;

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