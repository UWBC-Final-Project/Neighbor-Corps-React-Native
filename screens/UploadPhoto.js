import React from 'react';
import { Button, Image, View, TouchableHighlight, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ImagePicker, Permissions } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1, // You should only need this
    justifyContent: 'center',
    height: '100%', // But these wouldn't hurt.
    width: '100%',
    marginTop: 0,
    padding: 20,
  },
  titleBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  neighborCorps: {
    width: wp('84.5%'),
    color: '#63a952',
    fontFamily: 'open-sans-light',
    fontSize: hp('5%'),
    lineHeight: hp('5%'),
    top: 20,
    textAlign: 'center',
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

export default class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this._pickFromCamera = this._pickFromCamera.bind(this);
    this._pickImageGallery = this._pickImageGallery.bind(this);
  }
  state = {
    image: null,
    hasCameraPermission: null,
  };

  componentDidMount() {
    this.setState({ image: null })
    this._pickFromCamera();
  }


  _pickImageGallery = async () => {

    const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (newPermission.status === 'granted') {

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({ image: result.uri });
        const base64Img = `data:image/jpg;base64,${result.base64}`

        const apiUrl = 'https://api.cloudinary.com/v1_1/dqpd5lnnp/image/upload/';

        const data = {
          "file": base64Img,
          "upload_preset": "xv7mknnc",
          "folder": "tasks"
        }

        fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        }).then(async r => {
          const data = await r.json()
          console.log(data.secure_url)
          // this.props.returnURL(data.secure_url);
          // return data.secure_url

          this.setState({ image: data.secure_url })
          const { navigate } = this.props.navigation;

          imgURL = this.state.image

          navigate('MediaGPS', {
            getImageURL: imgURL,
          },
            this.setState({ image: null })
          )
          console.log("image captured", imgURL)

        }).catch(err => console.log(err))

      }

    }

  };

  _pickFromCamera = async () => {

    const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (newPermission.status === 'granted') {

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({ image: result.uri });
        const base64Img = `data:image/jpg;base64,${result.base64}`

        const apiUrl = 'https://api.cloudinary.com/v1_1/dqpd5lnnp/image/upload/';

        const data = {
          "file": base64Img,
          "upload_preset": "xv7mknnc",
          "folder": "tasks"
        }

        fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        }).then(async r => {
          const data = await r.json()
          // console.log(data.secure_url)

          this.setState({ image: data.secure_url })
          const { navigate } = this.props.navigation;

          imgURL = this.state.image

          navigate('MediaGPS', {
            getImageURL: imgURL,
          },
            this.setState({ image: null })
          )
          console.log("image captured", imgURL)
          // this.props.returnURL(data.secure_url);
          // return data.secure_url
        }).catch(err => console.log(err))

      }

    }

  };


  render() {
    const { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.titleBox}>
          <Text style={styles.neighborCorps}>Pick an Image</Text>
          </View>
          <TouchableHighlight style={styles.updateButton}
            title="Pick from Camera"
            onPress={this._pickFromCamera}
          >
            <Text style={styles.updateButtonText}>From Camera</Text>
          </TouchableHighlight>
        
        <TouchableHighlight style={styles.updateButton}
          title="Pick from Gallery"
          onPress={this._pickImageGallery}
        >
          <Text style={styles.updateButtonText}>From Gallery</Text>
        </TouchableHighlight>

        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }


}
