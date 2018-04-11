import React from 'react';
import { StyleSheet, 
        Text, 
        View,
        ListView,
        TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';


import Camera from './app/components/Camera/Camera'
import Toolbar from './app/components/Toolbar/Toolbar';
import AddButton from './app/components/AddButton/AddButton';

const firebaseConfig = {
  apiKey: "AIzaSyD4ZR5SKSBhBsA-c6hXBQS3ufICtKp-od4",
      authDomain: "prototype-app-c698d.firebaseapp.com",
      databaseURL: "https://prototype-app-c698d.firebaseio.com",
      projectId: "prototype-app-c698d",
      storageBucket: "prototype-app-c698d.appspot.com"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0
      },
      itemDataSource: ds,
      modalVisible: false,
      filming: false,
      userChunk : {
        date: null,
        vidURL: null
      }
    };


    this.itemsRef = this.getRef().child('bradData');
    this.renderRow = this.renderRow.bind(this);
    this.getLocationHandler= this.getLocationHandler.bind(this)
    this.stopLocationHandler = this.stopLocationHandler.bind(this)
    this.getItems = this.getItems.bind(this)
  }

  watchID: ?number = null  

  componentDidMount() {
    // this.getItems(this.itemsRef);

  }
  componentWillUpdate(nextProps, nextState) {
    console.log(nextState.userChunk);
  }

  componentWillUnmount() {
    this.stopLocationHandler()
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  renderRow(item) {
    return(
      <TouchableHighlight onPress={()=> {
        this.pressRow(item)
      }}>
        <View style= {styles.li}>
          <Text style={styles.liText}>{item.coordinates}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  getLocationHandler = (ref) => {
    this.watchID = navigator.geolocation.watchPosition(pos=> {
          let lat = parseFloat(pos.coords.latitude);
          let lng = parseFloat(pos.coords.longitude);
          let coordinatesArray = [];
          

          let coordinates = {
            coordinates:{
              0: lat,
              1: lng
            }
            
          }
          this.setState({
            initialPosition: coordinatesArray  
          })
          coordinatesArray.push(coordinates)
          // ref.push(coordinates);

        },
        err=>{
          console.log(err);
          alert('Fetching the position failed');
        },
        { enableHighAccuracy: true, timeout: 1000, maximumAge: 300000, distanceFilter: 1 })
  }

  stopLocationHandler = () => {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getVidURL = (url) => {
    this.setState({
      userChunk: {
        vidURL: url
      }
    })
  }

  getItems=(ref) => {

    ref.on('value', (snap) => {
      // console.log(snap)
      let items = [];
      snap.forEach((child)=>{
        // console.log(child.val())
        items.push({
          coordinates: child.val().coordinates,
          _key: child.key
        });
      })
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera storageRef={firebaseApp.storage()}
          getLocationHandler = {this.getLocationHandler}
          stopLocationHandler = {this.stopLocationHandler}
          getVidURL = {this.getVidURL}
          dataRef = {firebaseApp.database()}
          coordinates = {this.state.initialPosition}></Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
});
