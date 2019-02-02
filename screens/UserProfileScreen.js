import React, { Component } from 'react';
import { Image, View, TouchableHighlight, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, List } from 'native-base';
import { Font } from 'expo';
import API from '../utils/API';
import Task from "../components/Task";
import t from 'tcomb-form-native';
var _ = require('lodash');
import { NavigationActions } from "react-navigation";

// clone the default stylesheet
const formStyles = _.cloneDeep(t.form.Form.stylesheet);
// overriding the text color
formStyles.textbox = {
  normal: {
    color: '#555',
    fontSize: 24,
    height: 55,
    width: 330,
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
    width: 330,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#d7bcc0',
    borderWidth: 1,
    marginBottom: 5
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // You should only need this
    justifyContent: 'center',
    height: '100%', // But these wouldn't hurt.
    width: '100%',
    marginTop: 0,
    padding: 20,
  },
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
  logOutButton: {
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
  updateButton: {
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
  updateButtonText: {
    fontSize: 18,
    color: '#63a952',
    alignSelf: 'center',
    fontFamily: 'open-sans-bold',
  },
  logOutButtonText: {
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
    firstName: {
      stylesheet: formStyles,
    },
    lastName: {
      stylesheet: formStyles,
    },
    phone: {
      stylesheet: formStyles,
    },
    zipcode: {
      stylesheet: formStyles,
    },
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
    },
    aboutMe: {
      stylesheet: formStyles,
      
      textContentType: 'about me',
    },
    terms: {
      label: 'Agree to Terms',
    },
  }
};

// Function to removed null values
removeNull = (obj) => {
  // Object returned cannot be modified
  // Abnormal object? ¯\_(ツ)_/¯
  console.log(obj);
  console.log("Removing nulls...")
  // Correct the object ie. object re-assigned
  const newObj = Object.assign({}, obj);
  for (var propName in newObj) { 
    // If the properties in the object is null or undefined
    if (newObj[propName] === null || newObj[propName] === undefined) {
      // Delete the object property/properties
      delete newObj[propName];
    }
  }
  // Return the new object without null or undefined values
  return newObj;
}

// <<< KPH this is code that drive form field inputs

export default class UserProfileScreen extends Component {
  state = {
    page: "Your Profile", // Header title text
    formShowing: false,
    // MongoDB info
    // Current user's properties
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

    // Task properties
    tasks: [],
    title: "",
    description: "",
    imageURL: "",
    position: [], // save what we grasp from Google map pinned location

  }

  // When the component mounts, load all Tasks and save them to this.state.User
  componentDidMount() {
    this.loadUser();
    this.loadTasks();
  }

  constructor(props){
    super(props);
    this.loadTasks = this.loadTasks.bind(this);
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

    // Loads all Tasks by the currrent user and sets them to this.state.Tasks
    loadTasks = () => {
      API.getTasksByCurrentUser()
        .then(res =>
          this.setState({
            tasks: res.data,
            title: "",
            description: "",
            imageURL: "",
            position: "",
            _id: ""
          }),
        )
        .catch(err => console.log(err));
    };

  // Logout 
  handleSubmit = () => {
    API.logOut()
      .then((response) => {
        console.log(response)
        console.log("signed out")
        // this.props.navigation.navigate('Home')
        //added by jia
        const navigateAction = NavigationActions.navigate({
          routeName: "Public",
        });
        this.props.navigation.dispatch(navigateAction);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Update profile 
  updateProfile = () => {
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      value = removeNull(value); // removes any property of the object that has a value of null
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

  // Navigate to Single Task view
  passNav = (targetID, props) => {
    console.log(targetID, props);
    this.props.navigation.navigate('SingleTaskScreen', {
      taskID: targetID,
      taskProps: props,
    });
  }

  // _CreateTaskBtn = () => {
  //   this.props.navigation.navigate('UploadPhoto')
  // }
  // _SeeAllTasksBtn = () => {
  //   this.props.navigation.navigate('TasksScreen')
  // }
  render() {
    return (

      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Header page={this.state.page} />
        <Content>
          {/* <TouchableHighlight style={styles.button} onPress={this._CreateTaskBtn} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Create New Task</Text>
          </TouchableHighlight> */}

          {/* <TouchableHighlight style={styles.button} onPress={this._SeeAllTasksBtn} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>See all the Tasks</Text>
          </TouchableHighlight> */}

          {/* // KPH toggle the edit user form fields */}
          {this.state.formShowing ?
            <View style={{ width: 400, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
              <Form
                style={styles.form}
                ref="form"
                type={User}
                options={options}
              />
              <TouchableHighlight style={styles.updateButton} onPress={this.updateProfile} underlayColor='#99d9f4'>
                <Text style={styles.updateButtonText}>Save</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.updateButton} onPress={this.toggleForm} underlayColor='#99d9f4'>
                <Text style={styles.updateButtonText}>Close Form</Text>
              </TouchableHighlight>
            </View>
            :
            <View style={{ width: 400, flexDirection: 'column' }}>
              <Card>

                <CardItem><Text>Welcome {this.state.username}!</Text></CardItem>
                <CardItem><Text>Email: {this.state.email}</Text></CardItem>
                <CardItem><Text>First Name: {this.state.firstName}</Text></CardItem>
                <CardItem><Text>Last Name: {this.state.lastName}</Text></CardItem>
                <CardItem><Text>Phone: {this.state.phone}</Text></CardItem>
                <CardItem><Text>About Me: {this.state.aboutMe}</Text></CardItem>
                <CardItem><Text>Zipcode: {this.state.zipcode}</Text></CardItem>
              </Card>

              <TouchableHighlight style={styles.logOutButton} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                <Text style={styles.logOutButtonText}>Logout</Text>
              </TouchableHighlight>

              <TouchableHighlight style={styles.updateButton} onPress={this.toggleForm} underlayColor='#99d9f4'>
                <Text style={styles.updateButtonText}>Update Your Information</Text>
              </TouchableHighlight>

              {/* CURRENT USER'S TASK HISTORY START HERE */}
              <Container>
                <Content>
                  {this.state.tasks.length ? (
                    <List>
                      {this.state.tasks.map(task => {
                        return (
                          <Task key={task._id} taskProps={task} stackNav={this.passNav}/>
                        );
                      })}
                    </List>
                  ) : (
                      <Text>No Results to Display</Text>
                    )}
                </Content>
              </Container>
            </View>            
          }
        </Content>
      </View>
    )
  }
}
