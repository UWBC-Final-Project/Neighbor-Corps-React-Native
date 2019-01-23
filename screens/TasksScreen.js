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
        <Header page={this.state.page}/>
        <Content>
            {this.state.tasks.length ? (
              <List>
                {this.state.tasks.map(task => {
                  return (
                    <Task taskProps={task}/>
                  );
                })}



              </List>
            ) : (
                <Text>No Results to Display</Text>
              )}

          {/* KPH Repeated via Copy/Paste here but would render with a Mapped return from the DB in the future */}

          {/* <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'http://media.philly.com/storage/inquirer/special%20project%20media/trash25/trash25_e_14.jpg'}} />
                <Body>
                  <Text>Garbage on 4th St</Text>
                  <Text note>Added: April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'http://media.philly.com/storage/inquirer/special%20project%20media/trash25/trash25_e_14.jpg'}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  Description of the Task that needs attention
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="eye" />
                  <Text>seen by 7</Text>
                </Button>
              </Left>
            </CardItem>
          </Card> */}

        </Content>
      </Container>
    );
  }
}