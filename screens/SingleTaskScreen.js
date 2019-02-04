import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import Header from '../components/Header';
import Task from '../components/Task';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';
import { Image, View, ScrollView, TouchableHighlight, StyleSheet, Button } from 'react-native';
import { Container, Content, Text, List, Body } from 'native-base';
import API from '../utils/API';
import { NavigationActions } from "react-navigation";

// Base style
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
  },
  logo: {
    width: 292,
    height: 229,
    top: 100,
  },
  MapBrowseButton: {
    width: 223,
    height: 61,
    top: 142,
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
  completedButton: {
    height: 35,
    width: '70%',
    backgroundColor: '#fff',
    borderColor: '#63a952',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 10,
    // alignSelf: 'stretch',
    justifyContent: 'center'
  },
  completedButtonText: {
    fontSize: 14,
    color: '#63a952',
    alignSelf: 'center',
    fontFamily: 'open-sans-bold',
  },
  activeTask: {
    height: 35,
    width: '70%',
    backgroundColor: '#fff',
    borderColor: '#d8723e',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 10,
    // alignSelf: 'stretch',
    justifyContent: 'center'
  },
  activeTaskText: {
    fontSize: 14,
    color: '#d8723e',
    alignSelf: 'center',
    fontFamily: 'open-sans-bold',
  },
  noCommentsText: {
    fontSize: 14,
    color: '#bbb',
    alignSelf: 'center',
    fontFamily: 'open-sans-bold',
  },
})

export default class SingleTaskScreen extends Component {
  constructor(props) {
    super(props);
    // this._pickFromCamera = this._pickFromCamera.bind(this); // example for future reference
  }

  state = {
    page: "Task View",
    thisTask: {},
    comments: [],
    username: '',
    // Task Completion is default to false
    // ie. Uncompleted
    taskCompletion: false
  }

  componentDidMount() {
    this.getTask(this.props.navigation.state.params.taskProps._id);
    this.getTasksComments(this.props.navigation.state.params.taskProps._id);
    API.getCurrentUser()
      .then(res => this.setState({ username: res.data.username }))
      .then(console.log(this.state.user))
      .catch(err => console.log(err))
  }

  // Use ES6 function style as below
  // or else add a this.updateTaskCompletion = this.updateTaskCompletion.bind(this) in the constructor
  updateTaskCompletion = () => {
    API.updateTask(this.state.thisTask._id, true)
      .then(res =>
        this.setState({
          taskCompletion: true
        })
      )
      .catch(err => console.log(err));
  }

  getTask(taskId) {
    API.getTask(taskId)
      .then(res => {
        this.setState({
          thisTask: res.data,
          // change the taskCompletion value display to match with the taskCompletion value in the database
          // without this line, it will always default to false
          taskCompletion: res.data.taskCompletion
        });
      })
      .catch(err => console.log(err));
  }

  // special API call to get the comments that belong to this task
  // requires changes to the comments model and a new API function to work
  getTasksComments(taskID) {
    API.getTasksComments(taskID)
      .then(res => this.setState({ comments: res.data }))
      .catch(err => console.log(err))
  }

  addUserInteraction() {
    // when a unique user adds a comment or verifies the Task, this will increment the usersInvolved Task property
    // 1. check if user is already in the usersInvolved Array
    // 2. in not then PUT command to Task ID to push current user to Array
    // 3. update the state to show the new number
  }

  saveComment = (comment) => {
    newComment = {
      // KPH these values are place holders until we update the Model
      comment: comment.comment,
      belongsToTask: this.props.navigation.state.params.taskProps._id,
      username: 'requiredstring'
    }
    console.log('from single screen:', newComment);

    API.saveComment(newComment)
      .then(this.getTasksComments(this.props.navigation.state.params.taskProps._id))
      // .then(this.addUserInteraction())
      .catch(err => console.log(err))
  }

  _LoginSignUp = () => {
    // this.props.navigation.navigate('LoginScreen')
    //added by jia
    const navigateAction = NavigationActions.navigate({
      routeName: "LoginScreen",
    });
    this.props.navigation.dispatch(navigateAction);

  }

  render() {
    // console.log("this.state.taskCompletion: " + this.state.taskCompletion);
    return (
      <Container>
        <Header page={this.state.page} />
        <Content>
          {/* KPH Repeated via Copy/Paste here but would render with a Mapped return from the DB in the future */}
          <Task taskProps={this.props.navigation.state.params.taskProps} singleView={true} />

          {/* Task Completion button */}
          {this.state.taskCompletion === false ?
            <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <TouchableHighlight
                onPress={this.updateTaskCompletion}
                style={styles.activeTask}
              >
                <Text style={styles.activeTaskText}>Active Task</Text>
              </TouchableHighlight>
            </View>
            :
            <Text style={styles.completedButtonText}>Completed On DD/MM/YYY</Text>
          }

          {this.state.comments.length
            ? (
              <List>
                {this.state.comments.map(comment => {
                  return (
                    <Comment key={comment._id} props={comment} />
                  );
                })}
              </List>
            )
            :
            <Text style={styles.noCommentsText}>No comments yet . . .</Text>
          }

          {/* "I saw this too" button component that also triggers usersInvolved count */}
          {/* <VerifyButton addUserInteraction={this.addUserInteraction}/> */}
          <Text>{"\n"}</Text>
          {this.state.username ?
            <CommentForm saveComment={this.saveComment} />
            :
            <Button
              onPress={this._LoginSignUp}
              title="Log In to Comment"
            />
          }
        </Content>
      </Container>
    );
  }
}