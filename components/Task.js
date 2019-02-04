import React, { Component } from 'react';
import { Image, StyleSheet, Platform, View, TouchableHighlight } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, List } from 'native-base';
import { Font, Icon } from 'expo';
import Moment from 'react-moment';

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
    fontSize: 30,
    lineHeight: 30,
    left: 10,
  },
  description: {
    width: 333,
    // height: 46,
    color: '#222',
    fontFamily: 'open-sans-regular',
    fontSize: 16,
    lineHeight: 16,
    marginBottom: 16,
    marginTop: 14,
  },
  buttonArea: {
    backgroundColor: '#eee',
  },
  logo: {
    width: 292,
    height: 229,
    top: 100,
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
  username: {
    fontSize: 14,
    color: '#fff',
    alignSelf: 'flex-start',
    fontFamily: 'open-sans-bold',
    left: 10,
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
          // Visible at all times
          <TouchableHighlight
            onPress={!this.props.singleView ? () => this.props.stackNav(this.props.taskProps._id, this.props.taskProps) : null}>
            <View style={{ flex: 1, backgroundColor: '#eee', height: 200 }}>
              <View style={styles.imageZone}>
                <Image
                  style={styles.taskImage}
                  source={{ uri: this.props.taskProps.imageURL }}
                />
              </View>
              <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end', marginBottom: 5 }}>
                <Text style={styles.taskTitle}>
                  {this.props.taskProps.title}
                </Text>
                <Text style={styles.username}>Posted by: {this.props.taskProps.postedBy.username}</Text>
              </View>
            </View>
          </TouchableHighlight>
          : null
        }

        {this.props.singleView ?
          // Visible in the Single View
          <View>
            <CardItem>
              <Text style={styles.description}>{this.props.taskProps.description}</Text>
            </CardItem>
            <CardItem style={styles.buttonArea}>
              <Button transparent textStyle={{ color: '#87838B' }}>
                {/* <Icon name="eye" /> */}
                <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'} size={16} stlye={{ color: '#87838B' }} />
                <Text>7</Text>
                {/* replace with dynamic property once up and running in the database */}
                {/* <Text>seen by {this.props.taskProps.usersInvolved}</Text> */}
              </Button>
              <Button transparent textStyle={{ color: '#87838B' }}>
                {/* <Icon name="flag" /> */}
                <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-flag' : 'md-flag'} size={16} stlye={{ color: '#87838B' }} />
                <Text>Confirm Issue</Text>
              </Button>
              <Button transparent textStyle={{ color: '#87838B' }}>
                <Moment element={Text} format="MM/DD/YYYY">{this.props.taskProps.postDate}</Moment>
              </Button>
            </CardItem>

          </View>
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
                <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-information-circle' : 'md-information-circle'} size={20} stlye={{ color: '#87838B' }} />
                <Text>Details</Text>
              </Button>
              <Button transparent textStyle={{ color: '#87838B' }}>
                <Moment element={Text} format="MM/DD/YYYY">{this.props.taskProps.postDate}</Moment>
              </Button>
            </Left>
          </CardItem>
        }
      </Card>
    )
  }
}


