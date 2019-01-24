import React, { Component } from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container, Content, Item, Input, Label, Text } from 'native-base';
import { TouchableHighlight } from 'react-native';
import Header from './Header';
import API from '../utils/API';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Comments = t.struct({
  comment: t.String
});

const options = {
  fields: {
    comment: {
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal,
            height: 100
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 100
          }
        }
      }
    }
  }
};

export default class CommentScreen extends Component {
  //   constructor(props){
  //     super(props);
  //     this.loadComments = this.loadComments.bind(this);
  //   }

  state = {
    page: "Comments",
    comments: [],
    taskId: ""
  };

  componentDidMount() {
    this.loadComments();
    console.log(this.state.comments);
  }

  updateComments = (comments) => {
    this.state.comments = comments;
  }

  loadComments = () => {
    API.getComments()
      .then(response =>
        this.setState({
          comments: response.data,
          comments: [],
          title: "",
          _id: ""
        }),
      )
  }

  _createComment = event => {

    event.preventDefault();
    var value = this.refs.form.getValue();

    if (value) {
      this.props.navigation.navigate('SingleTasksScreen')
      this.setState({
        comments: value
      });

      API.saveComment({
        comment: value.comment,
      })
        // .then(res => this.loadTasks())
        .catch(err => console.log(err));
      console.log(value);
    }
    else {
      disabled = this.state.validity
      console.log("disable button");
    }
  }
  
  handleSubmit = () => {
    const value = this.refs.form.getValue(); // use that ref to get the form value
    console.log(value);
    this.props.saveComment(value);
  }

  render() {
    return (
      <Container>
        <Content>
          <Form
            ref="form"
            type={Comments}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Add New Comment</Text>
          </TouchableHighlight>
        </Content>
      </Container>
    );
  }
}