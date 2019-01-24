import React, {Component} from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View } from 'react-native';
import Header from '../components/Header';
import Task from '../components/Task';
import { Image } from 'react-native';
import CommentScreen from '../components/Comments'
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
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
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params.taskProps._id);
    // this.getTask(this.props.taskId)
}

  getTask(taskId) {
    API.getTask(taskId)
      .then(res => this.setState({ thisTask: res }))
      .catch(err => console.log(err));
  }

  saveComment = (comment) => {
    newComment = {
      // KPH these values are place holders until we update the Model
      description: comment.comment,
      username: this.props.navigation.state.params.taskProps._id
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
        <Header page={this.state.page}/>
        <Content>
          {/* KPH Repeated via Copy/Paste here but would render with a Mapped return from the DB in the future */}
          <Task taskProps={this.props.navigation.state.params.taskProps} />
          <CommentScreen saveComment={this.saveComment}/>
        </Content>
      </Container>
    );
  }
}