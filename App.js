import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { StackNavigator } from 'react-navigation';

import CreateTask from './screens/CreateTaskScreen'
import CreateTaskScreen from './screens/CreateTaskScreen';
import LoginScreen from './screens/LoginScreen';
// import { Button } from 'native-base';

class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  goToCreateTask = () => {
    this.props.navigation.navigate('CreateTask');
  }

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
            TESTING
          </Text>
          <Button
            onPress={this.goToCreateTask}
            title="Create Task"
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

export default StackNavigator({
  // Login: {
  //   screen: LoginScreen
  // },
  Home: {
    screen: App
  },
  CreateTask: {
    screen: CreateTaskScreen
  },
})