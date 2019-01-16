
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
      <Container style={{backgroundColor: "#87cefa"}}>
        <Header transparent>
          <Body>
            <Title>User Dashboard</Title>
          </Body>
          <Right>
            <Button transparent>
              <Text>Log Out</Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Text>
            Some kind of Content below
          </Text>
        </Content>
      </Container>
    );
  }
}