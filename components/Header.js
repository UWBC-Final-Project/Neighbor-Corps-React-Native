
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Header, Title } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import API from '../utils/API';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    
  },
  header: {
<<<<<<< HEAD
    color: 'blue',
    fontWeight: 'bold',
    height: 40,
=======
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
>>>>>>> f629c659de42366fc131084bc3dc81f97bf1b422
  },
  userIcon: {
    alignSelf: 'flex-end'

  }
});

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

      <Header style={styles.header}>
        <Title>{this.props.page}</Title>
        {this.state.user ?
          <Icon></Icon>
          :
          <Icon
            style={styles.userIcon}
            name='user-x'
            type='feather' />
        }

      </Header>
    );
  }
}