/**
 * @providesModule Header
 */
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Header, Title } from 'native-base';
// import { Header, Title, Button, ThemeProvider } from 'react-native-elements';
import API from '../utils/API';
import { Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    
  },
  header: {
    color: 'blue',
    fontWeight: 'bold',
    height: 40,
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