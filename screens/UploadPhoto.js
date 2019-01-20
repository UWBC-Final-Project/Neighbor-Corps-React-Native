import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';


export default class UploadPhoto extends React.Component {
  state = {
    image: null,
  };

  _pickImageGallery = async () => {
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
          return data.secure_url
        }).catch(err=>console.log(err))
    }
    
  };

  _pickFromCamera = async () => {
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
          console.log(data.secure_url)
          return data.secure_url
        }).catch(err=>console.log(err))
    }
  };


  render() {
    const { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick from Gallery"
          onPress={this._pickImageGallery}
        />
         <Button
          title="Pick from Camera"
          onPress={this._pickFromCamera}
        />       
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }



}
