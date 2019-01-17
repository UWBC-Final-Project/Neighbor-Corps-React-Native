import React, { Component } from 'react';
import { Container, Header, Content, Item, Input } from 'native-base';
const util = require('util')

export default class RoundedTextboxExample extends Component {
  static navigationOptions = {
    title: 'createTask',
  }
  
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Item rounded>
            <Input placeholder='Rounded Textbox'/>
          </Item>
        </Content>
      </Container>
    );
  }
}