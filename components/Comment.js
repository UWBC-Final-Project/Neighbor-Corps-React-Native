import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base'

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class CommentScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Card  key={this.props.props._id}>
        <CardItem>
          <Body >
            <Text>
              {this.props.props.postedBy.username} says
            </Text>
            <Text>{this.props.props.comment}</Text>
            <Text>Posted on: {this.props.props.postDate}</Text>
            {/* <DeleteBtn onClick={() => this.deleteTask(task._id)} /> */}
          </Body>
        </CardItem>
      </Card>
    )
  }
}