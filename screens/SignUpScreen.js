import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container, Content, Item, Input, Label, Text } from 'native-base';
import { TouchableHighlight, StyleSheet, Image, View } from 'react-native';
import Header from '../components/Header';
import { NavigationActions } from "react-navigation";
import { Font } from 'expo';
import API from '../utils/API';
import t from 'tcomb-form-native';
var _ = require('lodash');

// clone the default stylesheet
const formStyles = _.cloneDeep(t.form.Form.stylesheet);
// overriding the textbox styles:
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
      stylesheet: formStyles,
      autoCapitalize: 'none',
      autoCorrect: false,
      error: 'Insert a valid email',
      textContentType: 'emailAddress'
    },
    username: {
      stylesheet: formStyles,
      autoCapitalize: 'none',
      autoCorrect: false,
      textContentType: 'username'
    },
    password: {
      stylesheet: formStyles,
      secureTextEntry: true,
      textContentType: 'password',
    }
  }
};

export default class LoginScreen extends Component {
  state = {
    page: "Sign Up",
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

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <View style={{ width: 300, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
          <View style={styles.userIcon} >
            <Image source={require('../assets/images/SignUp.png')} />
            
          </View>
          
          {/* <Text style={styles.lendA}>Log In to Neighbor Corps</Text> */}
          <Form
            style={styles.form}
            ref="form"
            type={User}
            options={options}
          />
          <View style={{ width: 300, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <TouchableHighlight style={styles.signUpButton} onPress={this._SignUp} underlayColor='#99d9f4'>
              <Text style={styles.signUpButtonText}>Sign Up!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}