import React, { Component } from 'react';
import { Text, ListItem } from 'native-base';
import {  View } from 'react-native';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class CommentScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View>
        <ListItem key={this.props.props._id}>
          <Text>{this.props.props.comment}</Text>
          {/* <DeleteBtn onClick={() => this.deleteTask(task._id)} /> */}
        </ListItem>
      </View>
    )
  }
}