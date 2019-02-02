import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import { TouchableHighlight } from 'react-native';


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
      auto: 'none',
      placeholder: 'add new comment . . .',
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

  handleSubmit = () => {
    const value = this.refs.form.getValue(); // use that ref to get the form value
    console.log(value);
    if(value === null){
      alert("Please enter text and then submit");
    }
    else{
      this.props.saveComment(value);
    }
    
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