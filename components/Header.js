import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Header, Title } from 'native-base';

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

  render() {
    return (
      <Header style={styles.header}>
        <Title>{this.props.page}</Title>
      </Header>
    );
  }
}