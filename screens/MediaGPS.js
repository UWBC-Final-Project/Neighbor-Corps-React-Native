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
    // this._goToTaskForm = this._goToTaskForm.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }



  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    errorMessage: null,
    position: [],
    markers: []
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

  //  console.log(location)

  // const position = {latitude: this.state.location.coords.latitude, 
  //   longitude: this.state.location.coords.longitude }
  
  // this.setState({ position: position });

  this.setState({
    markers: [
      {
        coordinate: this.state.location.coords
      }
    ]
  })
  console.log(this.state.markers)

 };




 handlePress(e) {
  //  console("dropping")
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

  console.log(this.state.markers)
}




//  _goToTaskForm = () => {
//   // event.preventDefault();
//   const position = {latitude: this.state.location.coords.latitude, 
//     longitude: this.state.location.coords.longitude }
  
//   this.setState({ position: position });
//   // this.props.navigation.navigate('CreateTask');



//   console.log(position)

//   // this.props.returnPos(pos);

//   // this.props.returnPos(position.pos);
//   // this.props.navigation.navigate('CreateTaskScreen')

//  }


//  _getMarkerPosition();



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
          // onRegionChange={this._handleMapRegionChange}     
          onPress={this.handlePress}
        >
        {/* <MapView.Marker
        
          coordinate={this.state.location.coords}
          // title="Confirm Task Location"
          // description="Some description"
        /> */}

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

        {/* <Button
          title="Yes" //confirm the task location, if Yes, direct to "Next"
          onPress={this._goToTaskForm}
        />  */}
        {/* <Button
          title="No" //confirm the task location, if No, direct to "Drag Marker"
          onPress={this._getMarkerPosition}
        />  */}
        {/* style for Y or N buttons will be on right and left */}
      


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
