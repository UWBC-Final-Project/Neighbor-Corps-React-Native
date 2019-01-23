import React, { Component } from 'react';
import { Image } from 'react-native';
import Header from '../components/Header';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, List } from 'native-base';
import API from '../utils/API';


const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;


export default class Task extends Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   console.log(this.props.navigation);
  // }

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
        <CardItem>
          <Left>
            <Button transparent textStyle={{ color: '#87838B' }}>
              <Icon name="eye" />
              <Text>seen by 7</Text>
            </Button>
            <Button transparent textStyle={{ color: '#87838B' }}
              onPress={() => props.navigation.navigate('cSingleTaskScreen')}>
              <Icon name="add" />
              <Text>Comments</Text>
            </Button>
            <Button transparent textStyle={{ color: '#87838B' }}
              onPress={() => this.navigation.navigate('SingleTaskScreen')}>
              {/*need to find icon for this*/}
              {/*<Icon name=" " />*/}
              <Text>Learn More</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
    )
  }


}


