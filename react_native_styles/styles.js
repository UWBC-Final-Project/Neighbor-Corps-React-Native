import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, TouchableHighlight } from 'react-native';


const Colors = {
  darkBlue: '#3B496F',
  aquaGreen: '#6FA4AF',
  neutralAccent: '#9FAAB9',
  lightBlue: '#f7f9fa',
  black: '#000',
};

const styles = StyleSheet.create({
  // test: {
  //   backgroundColor: '#000',
  // },
  page: {
    backgroundColor: Colors.lightBlue,
  },
  container: {
    flex: 1, // You should only need this
    justifyContent: 'center',
    height: '100%', // But these wouldn't hurt.
    width: '100%',
    marginTop: 0,
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: Colors.aquaGreen,
    borderColor: Colors.neutralAccent,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  bigButton: {
    width: '50%',
    marginLeft: '25%',
    marginTop: '10%',
    // height: '10%',
    backgroundColor: Colors.aquaGreen,
    // borderColor: Colors.neutralAccent,
    // borderWidth: 1,
    // borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  bigButtonText: {
    color: '#eee',
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'open-sans-bold'
  },
  secondaryButton: {
    height: 36,
    backgroundColor: Colors.aquaGreen,
    borderColor: Colors.neutralAccent,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default styles;