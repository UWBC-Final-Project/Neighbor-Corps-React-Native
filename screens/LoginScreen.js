import React, { Component } from 'react';
import { Container, Content, Item, Input, Label, Text } from 'native-base';
import { TouchableHighlight, StyleSheet, Image, View } from 'react-native';
import { NavigationActions } from "react-navigation";
import { Font } from 'expo';
import API from '../utils/API';
import t from 'tcomb-form-native';
var _ = require('lodash');

// clone the default stylesheet
const formStyles = _.cloneDeep(t.form.Form.stylesheet);
// overriding the text color
formStyles.textbox = {
  normal: {
    color: '#555',
    fontSize: 24,
    height: 55,
    width: 300,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    marginBottom: 5
  },
  error: {
    color: '#d7bcc0',
    fontSize: 24,
    height: 55,
    width: 300, 
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#d7bcc0',
    borderWidth: 1,
    marginBottom: 5
  },
}

const styles = StyleSheet.create({
  neighborCorps: {
    width: 327,
    height: 63,
    color: '#63a952',
    fontFamily: 'open-sans-light',
    fontSize: 46,
    lineHeight: 46,
    top: 60,
  },
  lendA: {
    width: 333,
    height: 46,
    color: '#63a952',
    fontFamily: 'open-sans-regular',
    fontSize: 18,
    lineHeight: 46,
    top: 36,
    alignItems: 'center',
  },
  signUpButton: {
    height: 45,
    width: '70%',
    backgroundColor: '#fff',
    borderColor: '#d8723e',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 10,
    // alignSelf: 'stretch',
    justifyContent: 'center'
  },
  loginButton: {
    height: 45,
    width: '70%',
    backgroundColor: '#fff',
    borderColor: '#63a952',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 10,
    // alignSelf: 'stretch',
    justifyContent: 'center'
  },
  loginButtonText: {
    fontSize: 18,
    color: '#63a952',
    alignSelf: 'center',
    fontFamily: 'open-sans-bold',
  },
  signUpButtonText: {
    fontSize: 18,
    color: '#d8723e',
    alignSelf: 'center',
    fontFamily: 'open-sans-bold',
  },
  logo: {
    width: 292,
    height: 229,
    top: 100,
  },
  userIcon: {
    alignItems: 'center',
    width: 70,
    height: 70,
    top: 60,
    marginBottom: 80
  },
  form: {
    width: 309,
    height: 75,
    borderRadius: 9,
    borderColor: '#d3d3d3',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  }
})

const Form = t.form.Form;

const Login = t.struct({
  username: t.String,
  password: t.String
});

const options = {
  fields: {
    username: {
      stylesheet: formStyles,
      autoCapitalize: 'none',
      autoCorrect: false,
    },
    password: {
      stylesheet: formStyles,
      secureTextEntry: true,
    }
  }
};

export default class LoginScreen extends Component {
  state = {
    page: "Log In",
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-light': require('../assets/fonts/OpenSans-Light.ttf'),
      'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  // supplied by tutorial for tcomb-form-native
  handleSubmit = () => {
    const value = this.refs.form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    API.logIn(value)
      .then((response) => {
        console.log("RESPONSE.STATUS", response.status)
        if (response.status === 200) {
          console.log("RESPONSE: ",response)
          // Error messages:
          // User types non-existent or wrong username: "Username does not exist"
          // User types incorrect password: "Incorrect password"
          if (response.data.error) {
            alert (response.data.error);
          } else {
            //added by jia
            const navigateAction = NavigationActions.navigate({
              routeName: "Home",
              // params: { data: userObj }
            });
            this.props.navigation.dispatch(navigateAction);
          }

        }

      })
      .catch((error) => {
        console.log("ERROR", error);
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
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <View style={{ width: 300, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
          <View style={styles.userIcon} >
            <Image source={require('../assets/images/LoginIcon2x.png')} />
            
          </View>
          
          {/* <Text style={styles.lendA}>Log In to Neighbor Corps</Text> */}
          <Form
            style={styles.form}
            ref="form"
            type={Login}
            options={options}
          />
          <View style={{ width: 300, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <TouchableHighlight style={styles.loginButton} onPress={this.handleSubmit} underlayColor='#99d9f4'>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.signUpButton} onPress={this._SignUp} underlayColor='#99d9f4'>
              <Text style={styles.signUpButtonText}>Sign Up!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}