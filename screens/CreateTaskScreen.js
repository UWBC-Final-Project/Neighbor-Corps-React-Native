import React, { Component } from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Item, Input, Icon } from 'native-base';
import { AppRegistry, StyleSheet, View, TouchableHighlight, Alert, Modal, Button, TextInput} from 'react-native';
import Header from '../components/Header';
import API from '../utils/API';
import t from 'tcomb-form-native';
import UploadPhoto from './UploadPhoto'
import Axios from 'axios';

const Form = t.form.Form;

const Task = t.struct({
  title: t.String,
  description: t.String,
  // image: t.String,
  // position: t.String
});

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;
const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
 
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  innerContainer: {
    alignItems: 'center',
  },
});
export default class CreateTaskScreen extends Component {
 
  // Setting our component's initial state
  state = {
    page: "Create New Task",
    cameraShowing: true,
    tasks: [],
    title: "",
    description: "",
    imageURL: "",
    position: "", // save what we grasp from Google map pinned location
    postedBy: "",
    modalVisible: false,
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {text: ''};
  // }
  // openModal() {
  //   this.setState({modalVisible:true});
  // }

  // closeModal() {
  //   this.setState({modalVisible:false});
  // }
 
  toggleCamera = () => {	
    this.setState(prevState => ({	
      cameraShowing: !prevState.cameraShowing	
    }));	
  }	

   updateURL = (url) => {	
    this.state.imageURL = url;	
    this.toggleCamera();	
  }	

  // When the component mounts, load all Tasks and save them to this.state.Tasks
  componentDidMount() {
    // launch camera view and allow picture capture
    API.getCurrentUser()
      .then(res => this.setState({
        postedBy: res.data.username,
        cameraShowing: true
      }))
    .then(console.log(this.state.postedBy))
    .catch(err => console.log(err))
  }

  // // Handles updating component state when the Task types into the input field
  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
    
  //   });
  // };
  // handleSubmit = () => {
  // const value = this.refs.form.getValue(); // use that ref to get the form value  
  // }
  
  _createTask = async (event) => {
    Alert.alert(
      'Saving the Task',
      'Are you sure you want to save it?',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {this._createTask}},
      ],
      {cancelable: false},
    );
    
    if(Alert.text === 'Yes'){
      console.log("confirmed");
    // this.props.navigation.navigate('UserProfileScreen');

    event.preventDefault();
    var value = this.refs.form.getValue();
  
    if (value) {

      this.setState({
        tasks: value
      });
      
      API.saveTask({
        title: value.title,
        description: value.description,
        imageURL: this.props.navigation.state.params.passImageURL,
        position: JSON.parse(this.props.navigation.state.params.getTaskLocation),
        postedBy: this.state.postedBy

       })
      //.then(res => setState({taskID: res.taskID}))
        .catch(err => console.log(err));
      console.log("I'm called ")
      console.log(this.state);
    }
    else {
      disabled = this.state.validity
      console.log("disable button");
    }
  }
  }
  render() {
    return (
      <Container>
        <Header page={this.state.page} />
        <Content>
          <View>
          <UploadPhoto />
            <Form ref="form" type={Task} />
            <TouchableHighlight style={styles.button}
              // onPress={this._createTask} //from jia
              onPress={this._createTask}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableHighlight>

            <Text style={styles.TextStyle}>
              {this.state.postedBy
                ? this.state.postedBy
                : 'No Username Passed'}
            </Text>
            <Text style={styles.TextStyle}>
              {this.props.navigation.state.params.passImageURL
                ? this.props.navigation.state.params.passImageURL
                : 'No Value Passed'}
            </Text>


            <Text style={styles.TextStyle}>
              {this.props.navigation.state.params.getTaskLocation
                ? this.props.navigation.state.params.getTaskLocation
                : 'No Value Passed'}
            </Text>

          </View>

        </Content>

      </Container>
    )
  }
}
