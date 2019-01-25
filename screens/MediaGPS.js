import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';

export default class MediaGPS extends Component {

  constructor(props) {
    super(props);
    this._getLocationAsync = this._getLocationAsync.bind(this);
  }

  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    errorMessage: null,
    position: []
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

 };



 _goToTaskForm = event => {
  event.preventDefault();
  const position = {latitude: this.state.location.coords.latitude, 
    longitude: this.state.location.coords.longitude }
  
  this.setState({ position: position });
  
  console.log(position)


  // this.props.returnPos(position);
  // this.props.navigation.navigate('CreateTaskScreen')

 }


//  _getMarkerPosition();



  render() {

    let text = 'Confirm the Task Location';

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
      // high the map and buttons
    }

    return (
      <View style={styles.container}>
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
        >
        <MapView.Marker
        
          coordinate={this.state.location.coords}
          // title="Confirm Task Location"
          // description="Some description"
        />
        </MapView>
      
        <Text>
          Location: {text}
        </Text>

        <Button
          title="Yes" //confirm the task location, if Yes, direct to "Next"
          onPress={this._goToTaskForm}
        /> 
        {/* <Button
          title="No" //confirm the task location, if No, direct to "Drag Marker"
          onPress={this._getMarkerPosition}
        />  */}
        {/* style for Y or N buttons will be on right and left */}
      


      </View>
    );
  }
}

const styles = StyleSheet.create({
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
