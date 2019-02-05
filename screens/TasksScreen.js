import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, List } from 'native-base';
import Task from "../components/Task";
import API from '../utils/API';

// Base style
const styles = StyleSheet.create({
  header: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '100%',
    height: 80,
    marginBottom: 80,
  },
  headerTitle: {
    width: 327,
    height: 63,
    color: '#63a952',
    fontFamily: 'open-sans-light',
    fontSize: 46,
    lineHeight: 46,
    top: 60,
  },
  accountLinks: {
    flex: 1,
    flexDirection: 'row',
    height: 90,
    width: 240,
    justifyContent: 'space-between',
    top: 220,
    // alignItems: 'center' 
  },
  loginbutton: {
    width: 54,
    height: 88,
    justifyContent: 'flex-start',
    top: 0,
  },
  signupbutton: {
    width: 68,
    height: 89,
    justifyContent: 'flex-start',
    top: 0,
  },
})

export default class Tasks extends Component {

  // Setting our component's initial state
  state = {
    page: "Tasks",
    tasks: [],
    title: "",
    description: "",
    imageURL: "",
    position: [], // save what we grasp from Google map pinned location
    isLoading: true,
  };

  // This is to solve the issue where taskscreen needed to be refreshed everytime a new task is created or when there is a change in the task's state
  // React Navigation mounted the component the first visit, and it remains mounted at that screen even after user navigate to another screen
  // https://reactnavigation.org/docs/en/navigation-prop.html#addlistener-subscribe-to-updates-to-navigation-lifecycle
  // addListener - Subscribe to updates to navigation lifecycle
  // React Navigation emits events to screen components that subscribe to them:
  // didFocus - the screen focused (if there was a transition, the transition completed)
  // In this case, run this.loadTasks() only after the Task View screen is focused.
  // Everytime user goes to Task View screen, the screen will have all task loaded.
  didFocusSubscription = this.props.navigation.addListener(
    'didFocus',
    () => {
      console.log("********* didFocus - TasksScreen *********");
      this.loadTasks();
    }
  )

  // When the component mounts, load all Tasks and save them to this.state.Tasks
  componentDidMount() {
    this.loadTasks();
    console.log(this.state.tasks);
  }

  // Remove the didFocusSubscription listener before the component is unmounted
  componentWillUnmount() {
    didFocusSubscription.remove();
  }



  constructor(props) {
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
          position: "",
          _id: "",
          // This is to ensure tasks are loaded first before setting the loading screen to false
          isLoading: false
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
        <Header page={this.state.page} style={styles.header} />
        <Content>
          {/* If the state of loading is false (ie. screen is not loading), start displaying tasks */}
          {/* Previously, if this.state.length is true, start displaying tasks. If there were no task, screen would continue loading forever. !this.state.isLoading solves this issue. */}
          { !this.state.isLoading ? (
            <List>
              {this.state.tasks.map(task => {
                return (
                  <Task key={task._id} taskProps={task} stackNav={this.passNav} />
                );
              })}
            </List>
          ) : (
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <Image style={{marginTop: 120}} source={require('../assets/images/loading.gif')} />
              </View>
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