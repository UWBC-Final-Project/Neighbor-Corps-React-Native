import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Title, Content, Button, Icon, Left, Right, Body, Text, Platform, StyleSheet } from "native-base";
import { WebBrowser } from 'expo';
import axios from "axios";
import { MonoText } from '../components/StyledText';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { MapView } from 'expo';


const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class HomeScreen extends Component {
  state = {
    page: "Dashboard Page",
  }

  render() {
    return (

      <View>
        <Header page={this.state.page} />

        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    )
  }
}
