import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Header, Title } from 'native-base';
// import { Header, Title, Button, ThemeProvider } from 'react-native-elements';
import API from '../utils/API';

const styles = StyleSheet.create({
  header: {
    color: 'blue',
    fontWeight: 'bold',
    height: 60,
  },
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
          <Text>{this.state.user}</Text>
          :
          <Text>Not logged in</Text>
        }

      </Header>
    );
  }
}