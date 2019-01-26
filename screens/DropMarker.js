import React, { Component } from 'react';
import { Container, Content, Item, Input, Label, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const reactStyles = require('../react_native_styles/styles');
const styles = reactStyles.default;

export default class DropMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: []
     }
    this.handlePress = this.handlePress.bind(this);
  }

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

    console.log(this.state.markers)
  }

  render() {
    return (
      <MapView 
        style={mapStyles.container}
        initialRegion={{
            latitude: 45.5209087,
            longitude: -122.6705107,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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
    );
  }
}

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  }
});
