import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container, Content, Item, Input, Label, Text } from 'native-base';
import { TouchableHighlight } from 'react-native';
import Header from './Header';
import API from '../utils/API';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class CommentScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  state = {
  };

  render() {

    return (
      <View>

        <ListItem key={this.props._id}>
          <Text>Comment Here</Text>
          <DeleteBtn onClick={() => this.deleteTask(task._id)} />
        </ListItem>

      </View>

    )
  }


}