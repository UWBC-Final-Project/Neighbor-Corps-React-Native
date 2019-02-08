import React, { Component } from 'react';
import { Font } from 'expo';
import { Center } from 'native-base';
import { Image, View, Text, ScrollView, Linking, TouchableHighlight, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Base style
const styles = StyleSheet.create({
  contentContainer: {
    height: hp('100%'),
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  titleBox: {
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  neighborCorps: {
    width: wp('84.5%'),
    color: '#63a952',
    fontFamily: 'open-sans-light',
    fontSize: hp('5%'),
    lineHeight: hp('5%'),
    top: 20,
    textAlign: 'center',
  },
  lendA: {
    width: wp('84.5%'),
    color: '#63a952',
    fontFamily: 'open-sans-regular',
    fontSize: hp('2%'),
    // lineHeight: hp('2%'),
    top: 25,
    textAlign: 'center',
  },
  logoBox: {
    flex: 2,
  },
  logo: {
    width: wp('80%'),
    height: hp('30%'),
    // top: hp('5%'),
  },
  mapButtonBox: {
    flex: 1,
  },
  MapBrowseButton: {
    width: 223,
    height: 61,
    // top: 25,
  },
  userButtonsBox: {
    flex: 1,
  },
  accountLinks: {
    flex: 1,
    flexDirection: 'row',
    height: 90,
    width: 240,
    justifyContent: 'space-between',
    // top: 60,
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
      <ScrollView contentContainerStyle={styles.contentContainer}>

        <View style={styles.titleBox}>
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
        </View>
        <View style={styles.logoBox}>
          <Image source={require('../assets/images/PKLogo_transparent.png')} style={styles.logo} />
        </View>
        <View style={styles.mapButtonBox}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('TasksMapView')}
            style={styles.MapBrowseButton} >
            <Image
              source={require('../assets/images/MapBrowseButton.png')}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.userButtonsBox}>
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
      </ScrollView>
    )
  }
<<<<<<< HEAD
}

AppRegistry.registerComponent(
  'NeighborCorps',
  () => WelcomeScreen);
=======
}
>>>>>>> f629c659de42366fc131084bc3dc81f97bf1b422
