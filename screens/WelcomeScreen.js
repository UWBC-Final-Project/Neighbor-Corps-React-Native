import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container,CardItem,ScrollView,Image, Content, Item, Input, Labelzz,  Header, Title, Button, Left, Right, Body, Center, Icon, Thumbnail, ImageBackground } from 'native-base';
import { View, Text, Linking, TouchableHighlight  } from 'react-native';
import { Font } from 'expo';
import Headerjs from '../components/Header';

// const reactStyles = require('../react_native_styles/styles');
// const styles = reactStyles.default;

export default class WelcomeScreen extends Component {
  state = {
    page: "Welcome",
  }

  render() {
    return (
      <Container>
      <Header style={{backgroundColor:'#52d1ed', Color:'white', paddingBottom:10}}>
      <Left>
        <Button transparent >
        <Icon name='menu' style={{color:'white', marginBottom:'4%'}}/>
        </Button>
      </Left>
      <Body>
      <Title style={{color:'white', fontFamily:'HelveticaNeue-BoldItalic', fontWeight: 'bold', fontSize:28}}>{this.state.page}</Title>
    </Body>
      <Right style={{paddingBottom:8}}>
      <Thumbnail source={require ('../assets/images/logo.png')} />
      </Right>
    </Header>
          <CardItem style={{backgroundColor:'#52d1ed', height:'10%', width:'50%',marginLeft:'25%', marginTop:'10%' }}>
          {/* <TouchableHighlight
                onPress={() => Linking.openURL(href)}>
            <Text style={{color: '#b354e9',padding:50 ,fontSize:20, fontWeight:'bold', fontFamily:'OpenSans-ExtraBold'}}>ABOUT</Text>
            </TouchableHighlight> */}
          </CardItem>
          <CardItem style={{backgroundColor:'#52d1ed', height:'10%', width:'50%',marginLeft:'25%', marginTop:'10%' }}>
          <TouchableHighlight
                onPress={() => this.props.navigation.navigate('TasksScreen')}>
            <Text style={{color: '#b354e9',padding:20 ,fontSize:20, fontWeight:'bold', fontFamily:'OpenSans-ExtraBold'}}>See All Tasks</Text>
          </TouchableHighlight>
          </CardItem>
          <CardItem >
          <TouchableHighlight style={{backgroundColor:'#52d1ed',height:'50%', width:'26%',marginLeft:'18%', marginTop:'10%' }}
                onPress={() =>  this.props.navigation.navigate('LoginScreen')}>
            <Text style={{ padding:15, fontSize:20, color: '#b354e9',fontWeight:'bold', fontFamily:'OpenSans-ExtraBold'}}>SignIn</Text>
            </TouchableHighlight>
    
            <TouchableHighlight style={{backgroundColor:'#52d1ed', height:'50%', width:'26%',marginLeft:'15%', marginTop:'10%' }}
            onPress={() =>  this.props.navigation.navigate('SignUpScreen')}>
            <Text style={{padding:15, fontSize:20, color: '#b354e9',fontWeight:'bold', fontFamily:'OpenSans-ExtraBold'}}>SignUp</Text>
            </TouchableHighlight>
          </CardItem>
    </Container> 
    )
  }
}
