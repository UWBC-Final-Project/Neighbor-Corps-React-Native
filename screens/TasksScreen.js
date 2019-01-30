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
    title: "",
    description: "",
    imageURL: "",
    postion: [], // save what we grasp from Google map pinned location
  };

  // When the component mounts, load all Tasks and save them to this.state.Tasks
  componentDidMount() {
    this.loadTasks();
    console.log(this.state.tasks);
  }

  constructor(props){
    super(props);
    this.loadTasks = this.loadTasks.bind(this);
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
          _id: ""
        }),
      )
      .catch(err => console.log(err));
  };
 
   passNav = (targetID, props) => {
    console.log(targetID, props);
    this.props.navigation.navigate('SingleTaskScreen', {
      taskID: targetID,
      taskProps: props,
    });
  }

  render() {
    return (
      <Container>
        <Header page={this.state.page} />
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

    );
  }

  // Deletes a Task from the database with a given id, then reloads Tasks  Tasks from the db
  // deleteTask = id => {
  //   API.deleteTask(id)
  //     .then(res => this.loadTasks())
  //     .catch(err => console.log(err));
  // };

  // Handles updating component state when the Task types into the input field
  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

}