import React from 'react';
import {  Text, 
          View,  
          StatusBar } from 'react-native';

import styles from '../../style';

export default class Toolbar extends React.Component {
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <View>
        <StatusBar 
          backgroundColor= "coral"
          barStyle = "light-content"/>
        <View style = {styles.navbar}>
          <Text style= {styles.navbarTitle}>
          </Text>
        </View>
        
      </View>
    );
  }
}

