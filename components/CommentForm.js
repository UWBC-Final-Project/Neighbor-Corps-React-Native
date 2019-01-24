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

  //   constructor(props){
  //     super(props);
  //     this.loadComments = this.loadComments.bind(this);
  //   }

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
  // //     if(response.status == 200) {
  // //       console.log(response)
  // //       this.props.navigation.navigate('SingleTaskScreen');
  // //     }
  // //     // else {
  // //     //   //print status text somewhere so user can see that login failed
  // //     // }
  // //   })
  //   .catch(error  => console.log(error));
  // };


  // passNav = (targetID, props) => {
  //     console.log(targetID, props);
  //     this.props.navigation.navigate('SingleTaskScreen', {
  //       taskID: targetID,
  //       taskProps: props,
  //     });
  //   }

  // handleCommentChange = event => {
  //     const { name, value } = event.target;
  //     this.setState({
  //       [name]: value
  //     });
  //   };

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

  //supplied by tutorial for tcomb-form-native
  handleSubmit = () => {
    const value = this.refs.form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    API.saveComment(value)
      .then((response) => {
        if (response.status == 200) {
          console.log(response)
          this.props.navigation.navigate('SingleTaskScreen');
        }
        // else {
        //   //print status text somewhere so user can see that login failed
        // }
      })
      .catch((error) => {
        console.log(error);
      });
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