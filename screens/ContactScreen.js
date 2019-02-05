import React, {Component} from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class ContactScreen extends Component {
  state = {
    page: "Contact Us",
  }
  
  render() {
    return (
      
      <View>
        <Header page={this.state.page} />
        </View>
      
    )
  }
}
