import React, {Component} from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Container, Header, Content, Form, Item, Input, Label, Text } from 'native-base';

export default class SignUpScreen extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Text>SIGN UP SCREEN</Text>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}