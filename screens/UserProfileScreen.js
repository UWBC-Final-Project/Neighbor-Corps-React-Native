import React, { Component } from 'react';
import { Image, View, TouchableHighlight } from 'react-native';
import Header from '../components/Header';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, List } from 'native-base';
import API from '../utils/API';
import t from 'tcomb-form-native';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

// >>> KPH this is code that drive form field inputs
const Form = t.form.Form;

const User = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: t.String,
  userName: t.String,
  password: t.String,
  aboutMe: t.maybe(t.String),
  zipcode: t.Number,
  terms: t.Boolean
});

const options = {
  fields: {
    terms: {
      label: 'Agree to Terms',
    },
  },
};
// <<< KPH this is code that drive form field inputs

export default class UserProfileScreen extends Component {
  state = {
    page: "Your Profile", // Header title text
    formShowing: false,
    // MongoDB info
    user: [],
    _id: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    zipcode: "",
    meritscore: 0,
  }

  // When the component mounts, load all Tasks and save them to this.state.User
  componentDidMount() {
    this.loadUser();
  }

  toggleForm = () => {
    this.setState(prevState => ({
      formShowing: !prevState.formShowing
    }));
  }

  loadUser = () => {
    API.getUser("5c3d534003b9f1002a5cbe78") // Replace with ID given in the Auth Route
      .then(res => {
        console.log(res.data)
        this.setState({
          _id: res.data._id,
          username: res.data.username,
          password: res.data.password,
          email: res.data.email,
          phone: res.data.phone,
          zipcode: res.data.zipcode,
          meritscore: res.data.meritscore,
        })
      })
  }

  render() {
    return (

      <View style={styles.container}>
        <Header page={this.state.page} />
        <Content>
          <Text>My User Information</Text>
          <Card>
            <CardItem><Text>TEST</Text></CardItem>
            <CardItem><Text>{this.state.username}</Text></CardItem>
            <CardItem><Text>{this.state.email}</Text></CardItem>
            <CardItem><Text>{this.state.firstName}</Text></CardItem>
            <CardItem><Text>{this.state.lastName}</Text></CardItem>
            <CardItem><Text>{this.state.phone}</Text></CardItem>
            <CardItem><Text>{this.state.aboutMe}</Text></CardItem>
            <CardItem><Text>{this.state.zipcode}</Text></CardItem>
          </Card>
          <TouchableHighlight style={styles.button} onPress={this.toggleForm} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Update User Info</Text>
          </TouchableHighlight>

          {/* // KPH toggle the edit user form fields */}
          {this.state.formShowing ?
            <View>
              <Form
                ref="form"
                type={User}
                options={options}
              />
              <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableHighlight>
            </View>
            :
            null
          }
          <Card>
            <Text>My Tasks History</Text>
            <CardItem><Text>Sample task</Text></CardItem>
          </Card>
        </Content>
      </View>
    )
  }
}
