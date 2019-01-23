import React, {Component} from 'react';
import { ExpoConfigView } from '@expo/samples';
import { View } from 'react-native';
import Header from '../components/Header';
import { Image } from 'react-native';
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

  getTask(taskId) {
    API.getTask(taskId)
      .then(res => this.setState({ thisTask: res }))
      .catch(err => console.log(err));
  }
  
  render() {
    return (
      <Container>
        <Header page={this.state.page}/>
        <Content>
          {/* KPH Repeated via Copy/Paste here but would render with a Mapped return from the DB in the future */}
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://allthatsinteresting.com/wordpress/wp-content/uploads/2015/10/nanjing-littering-in-china.jpg'}} />
                <Body>
                  <Text>{this.state.thisTask.title}</Text>
                  <Text note>Added: April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'https://allthatsinteresting.com/wordpress/wp-content/uploads/2015/10/nanjing-littering-in-china.jpg'}} style={{ height: 200, width: 300, flex: 1,marginLeft: 35}} />
                <Text>
                  Description of the Task that needs attention
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="eye" />
                  <Text>seen by 7</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}