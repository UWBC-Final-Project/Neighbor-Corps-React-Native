import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // You should only need this
    justifyContent: 'center',
    height: '100%', // But these wouldn't hurt.
    width: '100%',
    marginTop: 0,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default styles;