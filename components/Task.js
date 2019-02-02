import React, { Component } from 'react';
import { Image, StyleSheet, Platform, View, TouchableHighlight } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, List } from 'native-base';
import { Font, Icon } from 'expo';

// Base style
const styles = StyleSheet.create({
  neighborCorps: {
    width: 327,
    height: 63,
    color: '#63a952',
    fontFamily: 'open-sans-light',
    fontSize: 46,
    lineHeight: 46,
    top: 60,
  },
  imageZone: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 200,
  },
  taskImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  taskTitle: {
    textAlign: 'left',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    fontFamily: 'open-sans-extraBold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.46)',
    textShadowOffset: { width: 3, height: 0 },
    textShadowRadius: 6,
    fontSize: 40,
    lineHeight: 40,
    left: 10,
  },
  lendA: {
    width: 333,
    height: 46,
    color: '#63a952',
    fontFamily: 'open-sans-regular',
    fontSize: 18,
    lineHeight: 46,
    top: 36,
  },
  logo: {
    width: 292,
    height: 229,
    top: 100,
  },
  MapBrowseButton: {
    width: 223,
    height: 61,
    top: 142,
  },
  accountLinks: {
    flex: 1,
    flexDirection: 'row',
    height: 90,
    width: 240,
    justifyContent: 'space-between',
    top: 220,
    // alignItems: 'center' 
  },
  loginbutton: {
    width: 54,
    height: 88,
    justifyContent: 'flex-start',
    top: 0,
  },
  signupbutton: {
    width: 68,
    height: 89,
    justifyContent: 'flex-start',
    top: 0,
  },
})


export default class Task extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-extraBold': require('../assets/fonts/OpenSans-ExtraBold.ttf'),
      'open-sans-light': require('../assets/fonts/OpenSans-Light.ttf'),
      'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (

      <Card
        style={{ flex: 0 }}
        key={this.props.taskProps._id}>

        {this.state.fontLoaded ?
          <TouchableHighlight onPress={() => this.props.stackNav(this.props.taskProps._id, this.props.taskProps)}>
            <View style={{ flex: 1, backgroundColor: '#eee', height: 200 }}>
              <View style={styles.imageZone}>
                <Image
                  style={styles.taskImage}
                  source={{ uri: this.props.taskProps.imageURL }}
                />
              </View>
              <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end', }}>
                <Text style={styles.taskTitle}>
                  {this.props.taskProps.title}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          : null
        }

        {this.props.singleView ?
          // Visible at all times
          <CardItem>
            <Button transparent textStyle={{ color: '#87838B' }}>
              {/* <Icon name="eye" /> */}
              <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'} size={20} />
              <Text>7</Text>
              {/* replace with dynamic property once up and running in the database */}
              {/* <Text>seen by {this.props.taskProps.usersInvolved}</Text> */}
            </Button>
            <Button transparent textStyle={{ color: '#87838B' }}>
              {/* <Icon name="flag" /> */}
              <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-flag' : 'md-flag'} size={20} />
              <Text>Confirm Issue</Text>
            </Button>
          </CardItem>
          :
          // Visible only in List of Tasks
          <CardItem>
            <Left>
              <Button transparent textStyle={{ color: '#87838B' }}>
                {/* <Icon name="eye" /> */}
                <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'} size={20} />
                <Text>7</Text>
                {/* replace with dynamic property once up and running in the database */}
                {/* <Text>seen by {this.props.taskProps.usersInvolved}</Text> */}
              </Button>
              <Button transparent textStyle={{ color: '#87838B' }}
                onPress={() => this.props.stackNav(this.props.taskProps._id, this.props.taskProps)}>
                {/* <Icon name="right" /> */}
                <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-round-forward' : 'md-arrow-round-forward'} size={20} />
                <Text>Details</Text>
              </Button>
            </Left>
          </CardItem>
        }
      </Card>
    )
  }
}


