import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Location, Permissions } from 'expo';

// const reactStyles = require('../react_native_styles/styles');
// const styles = reactStyles.default;

export default class CameraGPS extends Component {
    state = {
      location: null,
      errorMessage: null,
    };
   
    componentDidMount() {
      this.getLocationAsync();
    }
   
    getLocationAsync = async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
   
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
        return;
      }
   
      const location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    };
   
    render() {
      let text = 'Waiting...';
   
      if (this.state.errorMessage) {
        text = this.state.errorMessage;
      } else if (this.state.location) {
        text = JSON.stringify(this.state.location);
      }
   
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>{text}</Text>
        </View>
      );
    }
  }
   
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 40,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      textAlign: 'center',
    },
  });
