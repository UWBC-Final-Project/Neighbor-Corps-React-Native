import React, { Component } from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Item, Input } from 'native-base';
import { Button, AppRegistry, StyleSheet, View, TouchableHighlight } from 'react-native';
import Header from '../components/Header'
import API from '../utils/API';
import t from 'tcomb-form-native';

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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default class SignUpScreen extends Component {

  // Setting our component's initial state
  state = {
    page: "Sign Up",
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

    API.saveUser({
      
    })
      .catch(err => console.log(err));

  };

  // supplied by tutorial for tcomb-form-native
  handleSubmit = () => {
    const value = this.refs.form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
  }

  onPress = () => {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }

  render() {
    return (

      <Container>
        <Header page={this.state.page}/>
        <Content>
          <Form
            ref="form"
            type={User}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </Content>
      </Container>

    )
  }

}
