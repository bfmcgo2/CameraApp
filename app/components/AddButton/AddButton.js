import React from 'react';
import { StyleSheet,
        Platform, 
        Image, 
        Text, 
        View, 
        ListView, 
        StatusBar,
        TouchableHighlight
        } from 'react-native';


import styles, {constants} from '../../style';


export default class AddButton extends React.Component {
  

  render() {
    return (
      <View style= {styles.action}>
        <TouchableHighlight 
          underlayColor = "#24ce84"
          onPress ={this.props.onPress}
          >
            <Text style={styles.actionText}>
              {this.props.title}
            </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
