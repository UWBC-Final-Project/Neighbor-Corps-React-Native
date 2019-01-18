import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Item, Input } from 'native-base';
import API from '../utils/API';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Task = t.struct({
  title: t.String,
  description: t.String,
  image: t.String,
  position: t.String
});

export default class CreateTaskScreen extends Component {
  // Setting our component's initial state
  state = {
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



  render() {
    return (

      <Container>
        <Header />
        <Content>
          <Form type={Task} />
          {/* <Form>
            <Item rounded>
              <Input placeholder='Task Title' />
            </Item>
            <br></br>
            <Item rounded>
              <Input placeholder='Task Description' />
            </Item>
            <br></br>
            <Item rounded>
              <Input placeholder='Task Image' />
            </Item>
            <br></br>
            <Item rounded>
              <Input placeholder='Task Position' />
            </Item>
            <br></br>
          </Form> */}
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: 'Image URL' }} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>Its time to build a difference . .</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>

    )
  }
}
