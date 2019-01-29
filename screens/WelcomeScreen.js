import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container, CardItem, ScrollView, Image, Content, Item, Input, Labelzz, Header, Title, Button, Left, Right, Body, Center, Icon, Thumbnail, ImageBackground } from 'native-base';
import { View, Text, Linking, TouchableHighlight } from 'react-native';
import Headerjs from '../components/Header';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class WelcomeScreen extends Component {
  state = {
    page: "Welcome",
  }

  render() {
    return (
      <Container style={styles.page}>
        <Header style={{ backgroundColor: '#52d1ed', Color: 'white', paddingBottom: 10 }}>
          <Left>
            <Button transparent >
              <Icon name='menu' style={{ color: 'white', marginBottom: '4%' }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: 'white', fontFamily: 'HelveticaNeue-BoldItalic', fontWeight: 'bold', fontSize: 28 }}>{this.state.page}</Title>
          </Body>
          <Right style={{ paddingBottom: 8 }}>
            <Thumbnail source={require('../assets/images/logo.png')} />
          </Right>
        </Header>
        <Button large full info
        onPress={() => Linking.openURL(href)}>
          <Text>ABOUT</Text>
        </Button>
        <Button large full info
        onPress={() => this.props.navigation.navigate('TasksScreen')}>
          <Text>Browse Tasks</Text>
        </Button>
        <Button large iconLeft light
        onPress={() => this.props.navigation.navigate('LoginScreen')}>
          <Text>Log In</Text>
          <Icon name="arrow-forward" />
        </Button>
        <Button large iconRight light
        onPress={() => this.props.navigation.navigate('SignUpScreen')}>
          <Text>Sign Up</Text>
          <Icon name="arrow-forward" />
        </Button>
      </Container>
    )
  }
}
