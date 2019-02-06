
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Header, Title } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import API from '../utils/API';
import { Icon } from 'react-native-elements';

// Base style
const styles = StyleSheet.create({
  header: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('90%'),
    marginBottom: 26,
  },
  headerTitle: {
    // width: 327,
    // height: 63,
    color: '#63a952',
    fontFamily: 'open-sans-light',
    fontSize: hp('7%'),
    lineHeight: 46,
    top: 20,
    textAlign: 'center',
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

export default class HeaderMultipleIconExample extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    user: ''
  }

  componentDidMount() {
    API.getCurrentUser()
      .then(res => this.setState({ user: res.data.username }))
      .then(console.log(this.state.user))
      .catch(err => console.log(err))
  }

  render() {
    return (

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{this.props.page}</Text>
      </View>
    );
  }
}
