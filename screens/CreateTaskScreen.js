import React, { Component } from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Item, Input, Icon } from 'native-base';
import { AppRegistry, StyleSheet, View, TouchableHighlight } from 'react-native';
import Header from '../components/Header';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import API from '../utils/API';
import t from 'tcomb-form-native';
var _ = require('lodash');

// clone the default stylesheet
const formStyles = _.cloneDeep(t.form.Form.stylesheet);
// overriding the text color
formStyles.textbox = {
  normal: {
    color: '#555',
    fontSize: 24,
    height: 50,
    width: wp('90%'),
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    marginBottom: 5
  },
  error: {
    color: '#d7bcc0',
    fontSize: 24,
    height: 50,
    width: wp('90%'),
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#d7bcc0',
    borderWidth: 1,
    marginBottom: 5
  },
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // But these wouldn't hurt.
    width: '100%',
    marginTop: 0,
    padding: 20,
  },
  neighborCorps: {
    width: 327,
    height: 63,
    color: '#63a952',
    fontFamily: 'open-sans-light',
    fontSize: 46,
    lineHeight: 46,
    top: 60,
  },
  welcome: {
    color: '#63a952',
    fontFamily: 'open-sans-regular',
    fontSize: 16,
    // lineHeight: 46,
    top: 8,
    alignItems: 'center',
  },
  logOutButton: {
    height: 45,
    width: '70%',
    backgroundColor: '#fff',
    borderColor: '#d8723e',
    borderWidth: 2,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  updateButton: {
    height: 45,
    width: '70%',
    backgroundColor: '#fff',
    borderColor: '#63a952',
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  updateButtonText: {
    fontSize: 18,
    color: '#63a952',
    alignSelf: 'center',
    fontFamily: 'open-sans-bold',
  },
  logOutButtonText: {
    fontSize: 18,
    color: '#d8723e',
    alignSelf: 'center',
    fontFamily: 'open-sans-bold',
  },
  logo: {
    width: 292,
    height: 229,
    top: 100,
  },
  userIcon: {
    alignItems: 'center',
    width: 70,
    height: 70,
    top: 60,
    marginBottom: 80
  },
  category: {
    fontSize: 14,
    color: '#63a952',
    alignSelf: 'flex-start',
    fontFamily: 'open-sans-bold',
  },
  content: {
    color: '#333',
    marginBottom: 8,
    marginTop: 4
  },
  noTaskText: {
    fontSize: 14,
    color: '#63a952',
    alignSelf: 'center',
    fontFamily: 'open-sans-bold',
    marginTop: 10,
  },
  form: {
    width: 309,
    height: 75,
    borderRadius: 9,
    borderColor: '#d3d3d3',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  }
})


// >>> KPH this is code that drive form field inputs

const Form = t.form.Form;

const Task = t.struct({
  title: t.String,
  description: t.String,
  // image: t.String,
  // position: t.String
});

const options = {
  fields: {
    title: {
      stylesheet: formStyles,
    },
    description: {
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            color: '#555',
            fontSize: 24,
            height: 100,
            width: wp('90%'),
            paddingHorizontal: 14,
            borderRadius: 12,
            backgroundColor: '#fff',
            borderColor: '#bbb',
            borderWidth: 1,
            marginBottom: 5,
          },
          error: {
            color: '#d7bcc0',
            fontSize: 24,
            height: 100,
            width: wp('90%'),
            paddingHorizontal: 14,
            borderRadius: 12,
            backgroundColor: '#fff',
            borderColor: '#d7bcc0',
            borderWidth: 1,
            marginBottom: 5
          },
        }
      },
    },
  }
};

export default class CreateTaskScreen extends Component {

  // Setting our component's initial state
  state = {
    page: "Create New Task",
    cameraShowing: true,
    tasks: [],
    title: "",
    description: "",
    imageURL: "",
    position: "", 
    // save what we grasp from Google map pinned location
    postedBy: ""
  };

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

  _createTask = async (event) => {

    this.props.navigation.navigate('TasksScreen')
    const img = this.props.navigation.state.params.passImageURL

    event.preventDefault();
    var value = this.refs.form.getValue();

    if (value) {

      this.setState({
        tasks: value
      });

      API.saveTask({
        title: value.title,
        description: value.description,
        imageURL: img,
        position: JSON.parse(this.props.navigation.state.params.getTaskLocation),
        postedBy: this.state.postedBy

      }).catch(err => console.log(err));

      console.log("I'm called ")
      console.log(this.state);

      // In tcomb-form-native, if validation fails, value will be null.
      // Navigate to target screen after validation from tcomb, or else validation fails but the screen still navigates resulting in null data being created. 
      this.props.navigation.navigate('Home');
    }
    else {
      disabled = this.state.validity
      console.log("disable button");
    }
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>

        <Header page={this.state.page} />
        <Content>
          <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            <Form
              ref="form"
              type={Task}
              style={styles.form}
              options={options}
            />
            <TouchableHighlight style={styles.updateButton}
              onPress={this._createTask} //from jia
              underlayColor='#99d9f4'>
              <Text style={styles.updateButtonText}>Save</Text>
            </TouchableHighlight>

            {/* <Text style={styles.TextStyle}>
              {this.state.postedBy
                ? this.state.postedBy
                : 'No Username Passed'}
            </Text>
          <Text style={styles.TextStyle}>
              {this.state.imageURL
                ? this.state.imageURL
                : 'No Value Passed'}
            </Text>


            <Text style={styles.TextStyle}>
              {this.state.position
                ? this.state.position
                : 'No Value Passed'}
<<<<<<< HEAD
            </Text>
          

=======
            </Text> */}
>>>>>>> f629c659de42366fc131084bc3dc81f97bf1b422
          </View>
        </Content>
      </View>
    )
  }
}
