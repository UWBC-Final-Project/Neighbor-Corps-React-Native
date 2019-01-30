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
    width: 327,
    height: 63,
    color: '#63a952',
    fontFamily: 'open-sans-light',
    fontSize: 46,
    lineHeight: 46,
    top: 60,
  },
  lendA: {
    width: 333,
    height: 46,
    color: '#63a952',
    fontFamily: 'open-sans-regular',
    fontSize: 18,
    lineHeight: 46,
    top: 36,
  },
  logo: {
    width: 292,
    height: 229,
    top: 100,
  },
})

export default class WelcomeScreen extends Component {
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

      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        {
          this.state.fontLoaded
            ? (
              <View>
                <Text style={styles.neighborCorps}>Neighbor Corps</Text>
                <Text style={styles.lendA}>Lend a hand for a better neighborhood.</Text>
              </View>
            )
            : null
        }

        <Image source={require('../assets/images/PKLogo_transparent.png')} style={styles.logo} />

      </View>
    )
  }
} 
