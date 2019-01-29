import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container, Content, Item, Input, Label, Text } from 'native-base';
import { TouchableHighlight } from 'react-native';
import Header from '../components/Header';
import API from '../utils/API';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Login = t.struct({
  username: t.String,
  password: t.String
});

const options = {
  fields: {
    username: {
      autoCapitalize: 'none',
      autoCorrect: false,
    },
    password: {
      secureTextEntry: true,
    }
  }
};

export default class LoginScreen extends Component {
  state = {
    page: "Log In"
  }

  // supplied by tutorial for tcomb-form-native
  handleSubmit = () => {
    const value = this.refs.form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    API.logIn(value)
      .then((response) => {
        if(response.status == 200) {
          console.log(response)
          // Navigate to user profile screen after logging in
          this.props.navigation.navigate('UserProfileScreen');
        }
        // else {
        //   //print status text somewhere so user can see that login failed
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  _SignUp = () => {
    this.props.navigation.navigate('SignUpScreen')
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
        <Header page={this.state.page} />
        <Content>
          <Form
            ref="form"
            type={Login}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._SignUp} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Sign Up!</Text>
          </TouchableHighlight>
        </Content>
      </Container>
    );
  }
}