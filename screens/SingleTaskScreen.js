import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View } from 'react-native';
import Header from '../components/Header';
import Task from '../components/Task';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, List, Body } from 'native-base';
import API from '../utils/API';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class SingleTaskScreen extends Component {
  constructor(props) {
    super(props);
    // this._pickFromCamera = this._pickFromCamera.bind(this); // example for future reference
  }

  state = {
    page: "Task View",
    thisTask: [],
    comments: [],
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params.taskProps._id);
    this.getTask(this.props.navigation.state.params.taskProps._id);
    this.getComments();
  }

  getTask(taskId) {
    API.getTask(taskId)
      .then(res => this.setState({ thisTask: res }))
      .catch(err => console.log(err));
  }

  // special API call to get the comments that belong to this task
  // requires changes to the comments model and a new API function to work
  getComments() { 
    API.getComments()
      .then(res => this.setState({ comments: res.data }))
      .then(console.log('getComments?: ',this.state.comments))
      .catch(err => console.log(err))
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
      .then(res => this.setState({
        comments: this.state.comments.push(newComment)
      }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Container>
        <Header page={this.state.page} />
        <Content>
          {/* KPH Repeated via Copy/Paste here but would render with a Mapped return from the DB in the future */}
          <Task taskProps={this.props.navigation.state.params.taskProps} />
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
            <Text>No Results to Display</Text>
          }
          <CommentForm saveComment={this.saveComment} />
        </Content>
      </Container>
    );
  }
}