import React, { Component } from 'react';
import { Image } from 'react-native';
import Header from '../components/Header';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
export default class Tasks extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          {/* KPH Repeated via Copy/Paste here but would render with a Mapped return from the DB in the future */}
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://allthatsinteresting.com/wordpress/wp-content/uploads/2015/10/nanjing-littering-in-china.jpg'}} />
                <Body>
                  <Text>Garbage on 4th St</Text>
                  <Text note>Added: April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'https://allthatsinteresting.com/wordpress/wp-content/uploads/2015/10/nanjing-littering-in-china.jpg'}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  Description of the Task that needs attention
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="eye" />
                  <Text>seen by 7</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>

          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'http://media.philly.com/storage/inquirer/special%20project%20media/trash25/trash25_e_14.jpg'}} />
                <Body>
                  <Text>Garbage on 4th St</Text>
                  <Text note>Added: April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'http://media.philly.com/storage/inquirer/special%20project%20media/trash25/trash25_e_14.jpg'}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  Description of the Task that needs attention
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="eye" />
                  <Text>seen by 7</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>

        </Content>
      </Container>
    );
  }
}