import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, View } from 'native-base';

export default class HeaderMultipleIconExample extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <Header>

          
        <Title>{this.props.page}</Title>
          

        </Header>
    );
  }
}