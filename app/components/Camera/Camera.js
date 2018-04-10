import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  CameraRoll
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';
import * as firebase from 'firebase';
import MovToMp4 from 'react-native-mov-to-mp4';
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;



export default class BadInstagramCloneApp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      recording : false,
      video: null
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState.recording, nextState.video)
  }

  componentDidMount() {
    console.log(this.props.firebaseRef)
  }

  uploadVideo(data) {
    return new Promise((resolve, reject)=> {

      let mime = 'video/mp4';
      const uploadUri = Platform.OS === 'ios' ? data.replace('file://', '') : data
      let uploadBlob = null
      let filename = Date.now().toString();
      const videoRef = this.props.firebaseRef.ref('videos').child('video/' + filename +'.mp4');
      let metadata = {
        contentType: 'video/mp4'
      }
      let blobUri = RNFetchBlob.wrap(uploadUri)
      fs.readFile(uploadUri)
        .then((data) => {
          console.log(data)
          return Blob.build(blobUri, { type: mime })
        })
        .then((blob) => {
          uploadBlob = blob
          console.log(blob)
          return videoRef.put(blob, metadata )
        })
        .then(() => {
          uploadBlob.close()
          console.log(uploadBlob)
          return videoRef.getDownloadURL()
        })
        .then((url) => {
          console.log(url)
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })


    })
  }


  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={()=>{
              if(!this.state.recording) {
                this.recordVideo()
              }else {
                this.stopRecord()
              }
            }}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

    takePicture = async function() {
      if (this.camera) {

        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options)
        .then(data=> {
          return this.uploadVideo(data)
        })
      }
    };
    recordVideo = async function() {
      let videoRef = firebase.storage().ref('videos');
      if (this.camera) {
        // console.log("click")
        this.setState({
          recording: true
        })
        data = await this.camera.recordAsync()
        .then(data => {
          // console.log(data)
          let filename = Date.now().toString();
            MovToMp4.convertMovToMp4(data.uri, filename + ".mp4",  (results) => {
              //here you can upload the video...
              this.uploadVideo(results)
              // console.log(results)
            });
        })
        .catch(error => console.log(error))
      }
        
    }
    stopRecord = async function() {

      if (this.camera) {
        console.log("click")
        this.setState({
          recording: false
        })
        this.camera.stopRecording()
      }
        
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});