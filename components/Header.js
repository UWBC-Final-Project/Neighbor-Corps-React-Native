
import React, { Component } from "react";
import { Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, Platform, StyleSheet } from "native-base";
import { WebBrowser } from 'expo';
import axios from "axios";
import { MonoText } from '../components/StyledText';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';


export default class HomeScreen extends Component {
  render() {
    return (
      
        <Header transparent>
          <Body>
            <Title>Header Component</Title>
          </Body>
          <Right>
            <Button transparent>
              <Text>Log Out</Text>
            </Button>
          </Right>
        </Header>
      
    );
  }
}