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
  // t.maybe is used for all properties so that user can choose to update as few or as many fields as possible, without having to update all fields every time
  firstName: t.maybe(t.String),
  lastName: t.maybe(t.String),
  email: t.maybe(t.String),
  phone: t.maybe(t.Number),
  // username cannot be changed as it is the primary key
  // Alternatively, we can give user an option to change screen name/ nickname
  // userName: t.maybe(t.String),
  password: t.maybe(t.String), 
  aboutMe: t.maybe(t.String), 
  zipcode: t.maybe(t.Number),
  terms: t.Boolean
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
    },
    terms: {
      label: 'Agree to Terms',
    },
  }
};

// Function to removed null values
removeNull = (obj) => {
  for (var propName in obj) { 
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
}

// <<< KPH this is code that drive form field inputs

export default class UserProfileScreen extends Component {
  state = {
    page: "Your Profile", // Header title text
    formShowing: false,
    // MongoDB info
    user: [],
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    aboutMe: "",
    zipcode: "",
    terms: "",
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

  // Load user's information
  loadUser = () => {
    // The getCurrentUser function return the current user's information stored within their session
    API.getCurrentUser() 
      .then(res => {
        console.log(res.data)
        this.setState({
          _id: res.data._id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          username: res.data.username,
          password: res.data.password,
          email: res.data.email,
          phone: res.data.phone,
          aboutMe: res.data.aboutMe,
          zipcode: res.data.zipcode,
          terms: res.data.terms,
          meritscore: res.data.meritscore,
        })
      })
  }

  // Logout 
  handleSubmit = () => {
    API.logOut()
      .then((response) => {
        console.log(response)
        console.log("signed out")
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Update profile 
  updateProfile = () => {
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      removeNull(value); // removes any property of the object that has a value of null
      console.log(value); // value here is an instance of Person
      API.update(value)
        .then(() => {
          this.loadUser()
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  _CreateTaskBtn = () => {
    this.props.navigation.navigate('UploadPhoto')
  }
  _SeeAllTasksBtn = () => {
    this.props.navigation.navigate('TasksScreen')
  }
  render() {
    return (

      <View style={styles.container}>
        <Header page={this.state.page} />
        <Content>
          <Text>Personal Information:</Text>
          <Card>

            <CardItem><Text>Welcome {this.state.username}!</Text></CardItem>
            <CardItem><Text>Email: {this.state.email}</Text></CardItem>
            <CardItem><Text>Fist Name: {this.state.firstName}</Text></CardItem>
            <CardItem><Text>Last Name: {this.state.lastName}</Text></CardItem>
            <CardItem><Text>Phone: {this.state.phone}</Text></CardItem>
            <CardItem><Text>About Me: {this.state.aboutMe}</Text></CardItem>
            <CardItem><Text>Zipcode: {this.state.zipcode}</Text></CardItem>
          </Card>

          <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={this.toggleForm} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Update Your Information</Text>
          </TouchableHighlight>


          <TouchableHighlight style={styles.button} onPress={this._CreateTaskBtn} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Create New Task</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={this._SeeAllTasksBtn} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>See all the Tasks</Text>
          </TouchableHighlight>
      
          {/* // KPH toggle the edit user form fields */}
          {this.state.formShowing ?
            <View>
              <Form
                ref="form"
                type={User}
                options={options}
              />
              <TouchableHighlight style={styles.button} onPress={this.updateProfile} underlayColor='#99d9f4'>
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
