import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container, Content, Item, Input, Label, Text } from 'native-base';
import { TouchableHighlight } from 'react-native';
import Header from '../components/Header';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Login = t.struct({
  username: t.String,
  password: t.String,
});

export default class LoginScreen extends Component {
  state = {
    page: "Log In"
  }

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
        <Header page={this.state.page} />
        <Content>
          <Form
            ref="form"
            type={Login}
          />
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
        </Content>
      </Container>
    );
  }
}