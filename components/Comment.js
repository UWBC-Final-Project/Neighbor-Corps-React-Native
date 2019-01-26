import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container, Content, Item, Input, Label, Text, ListItem } from 'native-base';
import { TouchableHighlight, View } from 'react-native';
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

  componentDidMount() {
    // console.log(this.props)
  }

  render() {
    return (
      <View>
        <ListItem key={this.props.props._id}>
          <Text>{this.props.props.description || this.props.props.comment}</Text>
          {/* <DeleteBtn onClick={() => this.deleteTask(task._id)} /> */}
        </ListItem>
      </View>
    )
  }
}