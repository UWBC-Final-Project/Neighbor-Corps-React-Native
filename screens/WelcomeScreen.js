import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Font } from 'expo';
import { Container, CardItem, ScrollView, Content, Item, Input, Labelzz, Header, Title, Button, Left, Right, Body, Center, Icon, Thumbnail, ImageBackground } from 'native-base';
import { Image, View, Text, Linking, TouchableHighlight, StyleSheet } from 'react-native';

import Headerjs from '../components/Header';

// const reactStyles = require('../react_native_styles/styles');
// const styles = reactStyles.default;

// Base style
const styles = StyleSheet.create({
  neighborCorps: {
    width: 300,
    height: 100,
    color: '#63a952',
    fontFamily: 'open-sans-light',
    fontSize: 36,
    lineHeight: 36,
    top: 60,
  },
  lendA: {
    width: 300,
    height: 40,
    color: '#63a952',
    fontFamily: 'open-sans-regular',
    fontSize: 16,
    lineHeight: 46,
    top: 10,
  },
  logo: {
    width: 292,
    height: 229,
    top: 60,
  },
  MapBrowseButton: {
    width: 223,
    height: 61,
    top: 142,
  },
  accountLinks: {
    flex: 1,
    flexDirection: 'row',
    height: 90,
    width: 240,
    justifyContent: 'space-between',
    top: 220,
    // alignItems: 'center' 
  },
  loginbutton: {
    width: 54,
    height: 88,
    justifyContent: 'flex-start',
    top: 0,
  },
  signupbutton: {
    width: 68,
    height: 89,
    justifyContent: 'flex-start',
    top: 0,
  },
})

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    page: "Welcome",
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-light': require('../assets/fonts/OpenSans-Light.ttf'),
      'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
          this.state.fontLoaded
            ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.neighborCorps}>Neighbor Corps</Text>
                <Text style={styles.lendA}>Lend a hand for a better neighborhood.</Text>
              </View>
            )
            : null
        }
        <View style={{width: '80%', height: 200}}>
          <Image source={require('../assets/images/PKLogo_transparent.png')} style={styles.logo} />
        </View>

        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('TasksMapView')}
          style={styles.MapBrowseButton} >
          <Image
            source={require('../assets/images/MapBrowseButton.png')}
          />
        </TouchableHighlight>
        <View style={styles.accountLinks}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            style={styles.loginbutton} >
            <Image
              source={require('../assets/images/LoginButton.png')}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
            style={styles.signupbutton} >
            <Image
              source={require('../assets/images/SignUpButton.png')}
            />
          </TouchableHighlight>
        </View>

      </View>
    )
  }
} 