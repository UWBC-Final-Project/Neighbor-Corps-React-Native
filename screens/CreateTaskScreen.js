import React, { Component } from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Item, Input } from 'native-base';
import { AppRegistry, StyleSheet, View, TouchableHighlight, Button } from 'react-native';
import Header from '../components/Header';
import API from '../utils/API';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Task = t.struct({
  title: t.String,
  description: t.String,
  image: t.String,
  position: t.String
});

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class CreateTaskScreen extends Component {

  // Setting our component's initial state
  state = {
    page: "Create New Task",
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
    this.loadTasks();
    console.log(styles);
  }

  // Loads all Tasks  and sets them to this.state.Tasks
  loadTasks = () => {
    API.getTasks()
      .then(res =>
        this.setState({
          tasks: res.data, title: "", description: "", imageURL: "", postion: "",
          tags: "", postedBy: "", comments: "", postDate: "", lastUpdated: ""
        })
      )
      .catch(err => console.log(err));
  };

  // Deletes a Task from the database with a given id, then reloads Tasks  Tasks from the db
  deleteTask = id => {
    API.deleteTask(id)
      .then(res => this.loadTasks())
      .catch(err => console.log(err));
  };

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

    API.saveTask({
      title: this.state.title,
      description: this.state.description,
      imageURL: this.state.imageURL,
      postion: this.state.postion, // save what we grasp from Google map pinned location
      // tags:[],
      // postedBy:this.state.postedBy,
      // comments: [],
      // postDate: this.state.postDate, 
      // lastUpdated:this.state.lastUpdated
      // NEED SPECIAL ATTENTION TO MAKE IT REFLECT MODEL
    })
      .then(res => this.loadTasks())
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
        <Header page={this.state.page} />
        <Content>
          <Form
            ref="form"
            type={Task}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>

        </Content>
      </Container>
    )
  }
}
