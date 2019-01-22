import React, { Component } from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Item, Input } from 'native-base';
import { AppRegistry, StyleSheet, View, TouchableHighlight } from 'react-native';
import Header from '../components/Header';
import UploadPhoto from '../screens/UploadPhoto';
// import Tasks from './TasksScreen'
import API from '../utils/API';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Task = t.struct({
  title: t.String,
  description: t.String,
  // image: t.String,
  // position: t.String
});

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class CreateTaskScreen extends Component {

  // Setting our component's initial state
  state = {
    page: "Create New Task",
    cameraShowing: true,
    tasks: [],
    // NEED SPECIAL ATTENTION TO MAKE IT REFLECT MODEL
    title: "",
    description: "",
    imageURL: "",
    postion: "", // save what we grasp from Google map pinned location
    // tags:[],
    // postedBy: "",
    // comments: [],
    // postDate: "", 
    // lastUpdated: ""
  };

  // When the component mounts, load all Tasks and save them to this.state.Tasks
  componentDidMount() {
    // launch camera view and allow picture capture
    // this.loadTasks();
    this.setState({
      cameraShowing: true,
    }) 
    console.log(styles);
  }
  toggleCamera = () => {
    this.setState(prevState => ({
      cameraShowing: !prevState.cameraShowing
    }));
  }

  updateURL = (url) => {
    this.state.imageURL = url;
    this.toggleCamera();
  }
  // // Loads all Tasks  and sets them to this.state.Tasks
  // loadTasks = () => {
  //   API.getTasks()
  //     .then(res =>
  //       this.setState({
  //         tasks: res.data, title: "", description: "", imageURL: "", postion: "",
  //         tags: "", postedBy: "", comments: "", postDate: "", lastUpdated: ""
  //       })
  //     )
  //     .catch(err => console.log(err));
  // };

  // // Deletes a Task from the database with a given id, then reloads Tasks  Tasks from the db
  // deleteTask = id => {
  //   API.deleteTask(id)
  //     .then(res => this.loadTasks())
  //     .catch(err => console.log(err));
  // };

  // // Handles updating component state when the Task types into the input field
  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // // When the form is submitted, use the API.saveTask method to save the Task data
  // // Then reload Tasks from the database
  // handleFormSubmit = event => {
  //   event.preventDefault();

  //   API.saveTask({
  //     title: this.state.title,
  //     description: this.state.description,
  //     imageURL: this.state.imageURL,
  //     postion: this.state.postion, // save what we grasp from Google map pinned location
  //     // tags:[],
  //     // postedBy:this.state.postedBy,
  //     // comments: [],
  //     // postDate: this.state.postDate, 
  //     // lastUpdated:this.state.lastUpdated
  //     // NEED SPECIAL ATTENTION TO MAKE IT REFLECT MODEL
  //   })
  //     .then(res => this.loadTasks())
  //     .catch(err => console.log(err));

  // };

  // // supplied by tutorial for tcomb-form-native
  // handleSubmit = () => {
  //   const value = this.refs.form.getValue(); // use that ref to get the form value
  //   console.log('value: ', value);
  // }

  // onPress = () => {
  //   var value = this.refs.form.getValue();

  //   if(value){
  //     this.props.navigation.navigate('TasksScreen');
  //     console.log(value); 
  //   }
  //   else{
  //     disabled = this.state.validity
  //     console.log("disable button");
  //   }

  // }

  // from jia

  _createTask = event => {

    event.preventDefault();
    var value = this.refs.form.getValue();

    if (value) {
      this.props.navigation.navigate('TasksScreen')
      this.setState({
        tasks: value
      });

      API.saveTask({
        title: value.title,
        description: value.description,
        imageURL: this.state.imageURL,
        position: value.position // On the Way!!
      })
        .then(res => this.loadTasks())
        .catch(err => console.log(err));
      console.log(value);
    }
    else {
      disabled = this.state.validity
      console.log("disable button");
    }

  }




  render() {
    return (
      <Container>
        <Header page={this.state.page} />
        <Content>
          {this.state.cameraShowing ?
            <UploadPhoto returnURL={this.updateURL}/>
            :
            <View>
              <Form
                ref="form"
                type={Task}
              />
              <TouchableHighlight style={styles.button}
                onPress={this._createTask} //from jia
                underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableHighlight>
            </View>
          }


        </Content>
      </Container>
    )
  }
}
