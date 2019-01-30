import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View } from 'react-native';
import Header from '../components/Header';
import Task from '../components/Task';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';
import { Container, Content, TouchableHighlight, Text, List, Body } from 'native-base';
import API from '../utils/API';
import { Button } from 'react-native-elements';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

import { NavigationActions } from "react-navigation";

export default class SingleTaskScreen extends Component {
  constructor(props) {
    super(props);
    // this._pickFromCamera = this._pickFromCamera.bind(this); // example for future reference
  }

  state = {
    page: "Task View",
    thisTask: [],
    comments: [],
    username: '',
  }

  componentDidMount() {
    this.getTask(this.props.navigation.state.params.taskProps._id);
    this.getTasksComments(this.props.navigation.state.params.taskProps._id);
    API.getCurrentUser()
      .then(res => this.setState({ username: res.data.username }))
      .then(console.log(this.state.user))
      .catch(err => console.log(err))
  }

  getTask(taskId) {
    API.getTask(taskId)
      .then(res => this.setState({ thisTask: res }))
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
    return (
      <Container>
        <Header page={this.state.page} />
        <Content>
          {/* KPH Repeated via Copy/Paste here but would render with a Mapped return from the DB in the future */}
          <Task taskProps={this.props.navigation.state.params.taskProps} singleView={true} />
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
            <Text>No comments yet . . .</Text>
          }
          {/* "I saw this too" button component that also triggers usersInvolved count */}
          {/* <VerifyButton addUserInteraction={this.addUserInteraction}/> */}
          <Text>{"\n\n"}</Text>
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