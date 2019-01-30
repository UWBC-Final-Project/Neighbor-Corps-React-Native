import React, { Component } from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Item, Input } from 'native-base';
import { Button, AppRegistry, StyleSheet, View, TouchableHighlight } from 'react-native';
import Header from '../components/Header'
import API from '../utils/API';
import t from 'tcomb-form-native';

import { NavigationActions } from "react-navigation";

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

const Form = t.form.Form;

var Email = t.refinement(t.String, function (s) {
  return /@/.test(s);
});

const User = t.struct({
  email: Email,
  username: t.String,
  password: t.String,
});

const options = {
  fields: {
    email: {
      autoCapitalize: 'none',
      autoCorrect: false,
      error: 'Insert a valid email',
      textContentType: 'emailAddress'
    },
    username: {
      autoCapitalize: 'none',
      autoCorrect: false,
      textContentType: 'username'
    },
    password: {
      secureTextEntry: true,
      textContentType: 'password',
    }
  }
};

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
    console.log("saved")
  };

  // supplied by tutorial for tcomb-form-native
  handleSubmit = () => {
    const value = this.refs.form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    API.signUp(value)
      .then((response) => {
        // console.log(response)
        if(response.status == 200) {
          // this.props.navigation.navigate('UserProfileScreen');
          
          //added by jia
          const navigateAction = NavigationActions.navigate({
            routeName: "Home",
            // params: { data: userObj }
          });
          this.props.navigation.dispatch(navigateAction);

        }
        else {
          //print status text somewhere so user can see that login failed
        }
      })
      .catch((error) => {
        //print status text somewhere so user can see that login failed
        console.log(error);
      });
  }

  // onPress = () => {
  //   // call getValue() to get the values of the form
  //   var value = this.refs.form.getValue();
  //   if (value) { // if validation fails, value will be null
  //     console.log(value); // value here is an instance of Person
  //   }
  // }

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
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </Content>
      </Container>

    )
  }

}
