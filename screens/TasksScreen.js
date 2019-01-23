import React, { Component } from 'react';
import { Image } from 'react-native';
import Header from '../components/Header';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, List } from 'native-base';
import Task from "../components/Task";
import API from '../utils/API';


const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class Tasks extends Component {

  // Setting our component's initial state
  state = {
    page: "Tasks",
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
    console.log(this.state.tasks);
  }

  // Loads all Tasks  and sets them to this.state.Tasks
  loadTasks = () => {
    API.getTasks()
      .then(res =>
        this.setState({
          tasks: res.data,
          title: "",
          description: "",
          imageURL: "",
          postion: "",
          // tags: "",
          // postedBy: "",
          // comments: "",
          // postDate: "",
          // lastUpdated: ""
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

  passNav = (targetID, props) => {
    console.log(targetID, props);
    this.props.navigation.navigate('SingleTaskScreen', {
      taskID: targetID,
      taskProps: props,
    });
  }

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

  render() {
    return (
      <Container>
        <Header page={this.state.page} />
        <Content>
          {this.state.tasks.length ? (
            <List>
              {this.state.tasks.map(task => {
                return (
                  <Task taskProps={task} stackNav={this.passNav}/>
                );
              })}
            </List>
          ) : (
              <Text>No Results to Display</Text>
            )}
        </Content>
      </Container>
    );
  }
}