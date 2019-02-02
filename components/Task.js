import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, List } from 'native-base';

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
  lendA: {
    width: 333,
    height: 46,
    color: '#63a952',
    fontFamily: 'open-sans-regular',
    fontSize: 18,
    lineHeight: 46,
    top: 36,
  },
  logo: {
    width: 292,
    height: 229,
    top: 100,
  },
  MapBrowseButton: {
    width: 223,
    height: 61,
    top: 142,
  },
  accountLinks: {
    flex: 1,
    flexDirection: 'row',
    height: 90,
    width: 240,
    justifyContent: 'space-between',
    top: 220,
    // alignItems: 'center' 
  },
  loginbutton: {
    width: 54,
    height: 88,
    justifyContent: 'flex-start',
    top: 0,
  },
  signupbutton: {
    width: 68,
    height: 89,
    justifyContent: 'flex-start',
    top: 0,
  },
})

export default class Task extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card
        style={{ flex: 0 }}
        key={this.props.taskProps._id}>
        <CardItem >
          <Left >
            <Thumbnail source={{ uri: 'https://allthatsinteresting.com/wordpress/wp-content/uploads/2015/10/nanjing-littering-in-china.jpg' }} />
            <Body>
              <Text>{this.props.taskProps.title}</Text>
              <Text note>{this.props.taskProps.postDate}</Text>
              <Text>Posted By: {this.props.taskProps.postedBy.username}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Image source={{ uri: this.props.taskProps.imageURL }}
              style={{ height: 200, width: 300, flex: 1, marginLeft: 35 }}
            />
            <Text>
              {this.props.taskProps.description}
            </Text>
          </Body>
        </CardItem>
        {this.props.singleView ?
          // Visible at all times
          <CardItem>
            <Button transparent textStyle={{ color: '#87838B' }}>
              <Icon name="eye" />
              <Text>7</Text>
              {/* replace with dynamic property once up and running in the database */}
              {/* <Text>seen by {this.props.taskProps.usersInvolved}</Text> */}
            </Button>
            <Button transparent textStyle={{ color: '#87838B' }}>
              <Icon name="flag" />
              <Text>Confirm Issue</Text>
            </Button>
          </CardItem>
          :
          // Visible only in List of Tasks
          <CardItem>
            <Left>
              <Button transparent textStyle={{ color: '#87838B' }}>
                <Icon name="eye" />
                <Text>7</Text>
                {/* replace with dynamic property once up and running in the database */}
                {/* <Text>seen by {this.props.taskProps.usersInvolved}</Text> */}
              </Button>
              <Button transparent textStyle={{ color: '#87838B' }}
                onPress={() => this.props.stackNav(this.props.taskProps._id, this.props.taskProps)}>
                <Icon name="right" />
                <Text>Details</Text>
              </Button>
            </Left>
          </CardItem>
        }
      </Card>
    )
  }
}


