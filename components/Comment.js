import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base'
import Moment from 'react-moment';

// Base style
const styles = StyleSheet.create({
  neighborCorps: {
    width: 327,
    height: 63,
    color: '#63a952',
    fontFamily: 'open-sans-light',
    fontSize: 46,
    lineHeight: 46,
    top: 60,
  },
  imageZone: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 200,
  },
  taskImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  description: {
    width: 333,
    // height: 46,
    color: '#222',
    fontFamily: 'open-sans-regular',
    fontSize: 16,
    lineHeight: 16,
    marginBottom: 16,
    marginTop: 14,
  },
  username: {
    fontSize: 14,
    color: '#63a952',
    alignSelf: 'flex-start',
    fontFamily: 'open-sans-bold',
  },
})

export default class CommentScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Card  key={this.props.props._id}>
        <CardItem>
          <Body >
            <Text style={styles.username}>
              {this.props.props.postedBy.username} says
            </Text>
            <Text style={{color: '#333', marginBottom: 8, marginTop: 4}}>{this.props.props.comment}</Text>
            <Moment element={Text} format="MM/DD/YYYY" style={{ color: '#666', fontSize: 10 }}>{this.props.props.postDate}</Moment>
            {/* <DeleteBtn onClick={() => this.deleteTask(task._id)} /> */}
          </Body>
        </CardItem>
      </Card>
    )
  }
}