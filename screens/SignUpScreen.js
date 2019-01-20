import React, { Component } from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Item, Input } from 'native-base';
import { Button, AppRegistry, StyleSheet, View, TouchableHighlight } from 'react-native';
import Header from '../components/Header'
import API from '../utils/API';
import t from 'tcomb-form-native';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  userName: t.String,
  password: t.String,
});

const options = {
  fields: {
    terms: {
      label: 'Agree to Terms',
    },
  },
};

export default class SignUpScreen extends Component {

  // Setting our component's initial state
  state = {
    page: "Sign Up",
    // User DB Fields:
    email: "",
    userName: "",
    password: "",
  };

  // When the component mounts, load all Tasks and save them to this.state.Tasks
  componentDidMount() {
    // probably need a UAuth func in here
  }

  // Handles updating component state when the Task types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveTask method to save the Task data
  // Then reload Tasks from the database
  handleFormSubmit = event => {
    event.preventDefault();
    const newUserValues = this.refs.form.getValue();
    this.setState({
      email: newUserValues.email,
      userName: newUserValues.userName,
      password: newUserValues.password,
    })
    console.log(this.state);
    API.saveUser({
      email: this.state.email,
      userName: this.state.userName,
      password: this.state.password,
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log("saved")
  };

  render() {
    return (

      <Container>
        <Header page={this.state.page} />
        <Content>
          <Form
            ref="form"
            type={User}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.handleFormSubmit} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </Content>
      </Container>

    )
  }

}
