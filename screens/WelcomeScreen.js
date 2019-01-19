import React, {Component} from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container, Content, Item, Input, Label } from 'native-base';
import { View, Text } from 'react-native';
import Header from '../components/Header';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class WelcomeScreen extends Component {
  state = {
    page: "Welcome",
  }
  
  render() {
    return (
      
      <View>
        <Header page={this.state.page} />
        </View>
      
    )
  }
}
