import React, { Component } from "react";
import { Container, Title, Content, Button, Icon, Left, Right, Body, Text, Platform, StyleSheet , View} from "native-base";
import { WebBrowser } from 'expo';
import axios from "axios";
import { MonoText } from '../components/StyledText';
// import RecipeCard from '../components/RecipeCard';
// import SearchBar from '../components/SearchBar';
import Header from '../components/Header';


export default class WelcomeScreenT extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
        <View>

            <Button
            onPress={() => {
              this.props.navigation.navigate('TasksScreen');
            }}
            // title="Welcome Screen"
          />
        </View>
    );
  }
}