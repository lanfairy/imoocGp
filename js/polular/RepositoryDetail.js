import React, { Component } from 'react';
import {  View, Text, } from 'react-native';

export default class RepositoryDetail extends Component {
    
  render() {
      console.log(JSON.stringify(this.props.navigation.getParam('rowData')));
    return (
      <View>
        <Text> {JSON.stringify(this.props.navigation.getParam('rowData'))} </Text>
      </View>
    );
  }
}
