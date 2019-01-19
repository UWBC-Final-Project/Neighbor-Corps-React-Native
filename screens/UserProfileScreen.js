import React, { Component } from 'react';
import { Image, View } from 'react-native';
import Header from '../components/Header';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, List } from 'native-base';
import API from '../utils/API';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class UserProfileScreen extends Component {
  state = {
    page: "Your Profile",
    // MongoDB info
    user: [],
    _id: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    meritscore: 0,
  }

  // When the component mounts, load all Tasks and save them to this.state.User
  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    API.getUser("5c3d534003b9f1002a5cbe78")
      .then(res => {
        console.log(res.data)
        this.setState({
          _id: res.data._id,
          username: res.data.username,
          password: res.data.password,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          meritscore: res.data.meritscore,
        })
      })
  }

  render() {
    return (

      <View style={styles.container}>
        <Header page={this.state.page} />
        <Content>
          <Text>TEST</Text>
          <Card>
            <CardItem><Text>TEST</Text></CardItem>
            <CardItem><Text>{this.state.username}</Text></CardItem>
            <CardItem><Text>{this.state.phone}</Text></CardItem>
            <CardItem><Text>{this.state.email}</Text></CardItem>
          </Card>
        </Content>
      </View>

    )
  }
}
