import React, { Component } from "react";
import {
  Platform, AppRegistry, StyleSheet, Text, View, ScrollView, Animated, Image, Dimensions, TouchableOpacity, Slider, 
} from "react-native";
import MapView from "react-native-maps";
import API from '../utils/API';
import { Constants, Location, Permissions, Icon } from 'expo';
import geolib from 'geolib'
import { NavigationActions } from "react-navigation";
import { CardItem } from "native-base";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 40;

export default class PublicMap extends Component {

  constructor(props) {
    super(props);
    this.loadTasks = this.loadTasks.bind(this);
    this._go = this._go.bind(this);
  }

  state = {
    isHidden: false,
    markers: [],
    region: null,
    targetMarker: { latitude: 37.78825, longitude: -122.4324},
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    //change distance interval here
    selectedDist: 0.5,
    minDistance: 0,
    maxDistance: 20,
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0); 
    
  }

  componentDidMount() {

    // get current location
    this._getLocationAsync();

    // call our task api
    this.loadTasks();

    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
       
      }
      if (index <= 0) {
        index = 0;
      }
      
  clearTimeout(this.regionTimeout);
    this.regionTimeout = setTimeout(() => {
       if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  }

  // Loads current location
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

    lat = this.state.location.coords["latitude"];
    long = this.state.location.coords["longitude"];
    
    this.setState({
      targetMarker: 
        {
          latitude: lat,
          longitude: long,
        },
      region: {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,

      }
    })

  // console.log(this.state.region)
  };

 // Loads all Tasks  and sets them to this.state.Tasks
 loadTasks = async () => {

    await API.getTasks() 
			.then(res => {
				markers = [];

        var distView = this.state.selectedDist
        
        // filters out task without position
        res.data = res.data.filter(task => task.position.length != 0);

        // center = {
        //   latitude: this.state.targetMarker.latitude,
        //   longitude: this.state.targetMarker.longitude
        // };

				for (i = 0; i < res.data.length; i++) {
					task = res.data[i];
					coordinate = task.position[0].coordinate;
        
          // used Geolib to calcuate distances in meters
          // get reference here: https://www.npmjs.com/package/geolib     
          // pos = {latitude: coordinate.latitude,
          //        longitude: coordinate.longitude};
              
          // distInMeters = geolib.getDistance(center, pos);

          distInMeters = geolib.getDistance(
            {latitude: this.state.targetMarker.latitude, longitude: this.state.targetMarker.longitude},
            {latitude: coordinate.latitude, longitude: coordinate.longitude}
          )

          distInMiles = geolib.convertUnit('mi', distInMeters, 2)

          marker = {
						coordinate: coordinate,
						title: task.title,
					  description: task.description,
            imageURL: task.imageURL,
            _id: task._id,
            distance: distInMiles,
            postedBy: task.postedBy
					}

          
          if(distInMiles <= distView) {
            markers.push(marker);
            
          }
				}
      
        // sort by distance 
        this.setState({
            markers: markers.sort(function (a, b) {
              return a.distance - b.distance;
            })
          })
        })
      .catch(err => console.log(err));
      
	};  
  
  _handleMapRegionChange = () => {
    this.setState({ region: this.state.region});
  };
  
  _go = () => {
    this.setState({isHidden: !this.state.isHidden})
    this.loadTasks();
  }
  
 _detail = () =>  {

 }

  render() {

    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH), 
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });
    return (
      <View style={styles.container}>
        <View style={styles.goView}>
        {this.state.isHidden ?      
        <View style={styles.slidercontainer}>
          <Slider
            style={{ width: 300}}
            step={0.5}
            minimumValue={this.state.minDistance}
            maximumValue={this.state.maxDistance}
            value={this.state.selectedDist}
            onValueChange={val => this.setState({ selectedDist: val })} 
            thumbTintColor='rgb(255, 152, 0)'
            maximumTrackTintColor='#d3d3d3' 
            minimumTrackTintColor='rgb(255, 152, 0)'
            />

            {console.log(this.state)}

            {/* miles display */}
            <View style={styles.textCon}>
              <Text style={styles.colorOne}>{this.state.minDistance} mi</Text>
              <Text style={styles.colorTwo}>
                  {this.state.selectedDist + ' mi'}
              </Text>
              <Text style={styles.colorOne}>{this.state.maxDistance} mi</Text>
            </View>
            </View>
            : null}
            <TouchableOpacity onPress={this._go} >
            {this.state.isHidden ?
              <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-paper-plane' : 'md-paper-plane'} size={40} />
              :
              <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} size={40} />
            }
            </TouchableOpacity>
        </View>

        <MapView ref={map => this.map = map}
                 initialRegion={this.state.region}
                 style={styles.container}>
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {transform: [{scale: interpolations[index].scale}]};
            const opacityStyle = {opacity: interpolations[index].opacity,};
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>

        <Animated.ScrollView
          horizontal
          scrollEventThrottle={16}
          showsHorizontalScrollIndicacor={true}
          snapToInterval={2}
      
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >

        {this.state.markers.map((marker, index) => (     
         <TouchableOpacity key={index} style={(x= this.animation)? styles.card: styles.cardOne} 
         title="Go Sign In"
         onPress={() => 
            alert("Please Sign In")
         } > 
            <Image
              source={{ uri: marker.imageURL }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={3} style={styles.cardtitle}>{marker.postedBy.username} says: {marker.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 0,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
    // borderTopColor: 'rgb(255, 152, 0)'
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardOne: {
    padding: 10,
    elevation: 2,
    backgroundColor: "rgba(130,4,150, 0.9)",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
    color: '#30BC76'
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
  //Slider style
  slidercontainer: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#000',
    marginBottom: 20,
    marginTop: 50
  },
  textCon: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  colorOne: {
    color: '#30BC76'
  },
  colorTwo: {
    color: 'rgb(255, 152, 0)'
  },
  goBtn: {
    backgroundColor: 'transparent'
  },

  goView: {
  // position: 'absolute',
  // top: 10,
  // right: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
    transform: [{'translate': [0,0, 1]}]
}

});


AppRegistry.registerComponent("mapfocus", () => screens);


