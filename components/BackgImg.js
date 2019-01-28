import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, View , ImageBackground} from 'native-base';
import{Image} from 'react-native';
const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class BackgImg extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
        <Container>
        <Image source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMlOx1_3bW6I6OVAbMaVZghAaz0LAQa3H4C2T4xJPy_qHvVfOxyg"}}
        style={{width: '100%', height: '100%'}} />
        </Container>
    );
  }
}
