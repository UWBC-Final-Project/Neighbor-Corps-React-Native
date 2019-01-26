import React, { Component } from 'react';
import { Container, Content, Item, Input, Label, Text } from 'native-base';
import {View, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class MediaGPS extends Component {

  constructor(props) {
    super(props);
    this._getLocationAsync = this._getLocationAsync.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    errorMessage: null,
    position: [],
    markers: [],
    taskImage: "",
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
      errorMessage: 'Permission to access location was denied'
     });
     return;
   }

   const location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location, });

   this.setState({
    markers: [
      {
        coordinate: this.state.location.coords
      }
    ]
  })
  // console.log(this.state.markers)

 };

 handlePress(e) {

    lat = e.nativeEvent.coordinate["latitude"];
    long = e.nativeEvent.coordinate["longitude"];
    this.setState({
      markers: [
        {
          coordinate: {
            latitude: lat,
            longitude: long,
          }
        }
      ]
    })
    // console.log(this.state.markers)
  }

  _goToTaskForm = () => {

    this.setState({ markers: this.state.markers});

    const { navigate } = this.props.navigation;

    const pos = JSON.stringify(this.state.markers);

    const img = this.props.navigation.state.params.getImageURL

    console.log("whats up")
    console.log(this.state)

    navigate('CreateTask', {getTaskLocation: pos,
    passImageURL: img}
    )

    // console.log("im here", JSON.stringify(this.state.markers))
    // console.log(this.state.markers)
    console.log("location is here: ", pos)
    console.log("image is here:" , img)

  }

  render() {

    let text = 'Confirm the Task Location';

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
      // high the map and buttons
    }

    return (
      <Container>
      <View style={mapStyles.container}>
        <MapView
          style={{ 
            alignSelf: 'stretch', 
            height: 400, 
            width: "100%"
          }}
          region={{ 
            latitude: this.state.location.coords.latitude, 
            longitude: this.state.location.coords.longitude, 
            latitudeDelta: 0.002, 
            longitudeDelta: 0.004 
          }}
          onPress={this.handlePress}
        >
        {this.state.markers.map((marker, index) => {
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate}>
              
            </MapView.Marker>
          );
        })}

        </MapView>
      
        <Text>
          Location: {text}
        </Text>

        <Button
          title="Next" //confirm the task location, if Yes, direct to "Next"
          onPress={this._goToTaskForm}
        /> 

      </View>
      </Container>
    );
  }
}

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
