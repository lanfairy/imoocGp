
//
import React from 'react';
import {  StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import { Button } from './ButtonWithMargin';
import SampleText from './SampleText';

const MyNavScreen = ({ navigation, banner }) => (
  <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
    <SampleText>{banner}</SampleText>
    <Button
      onPress={() => navigation.navigate('Polular')}
      title="Go to Polular tab"
    />
    <Button
      onPress={() => navigation.navigate('Mine')}
      title="Go to Mine tab"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
    <StatusBar barStyle="default" />
  </SafeAreaView>
);
class CommonNavScreen extends React.Component{
  render(){
    let navigaiton = this.props.navigation;
    return (
      <SafeAreaView style={styles.flex} forceInset={{ horizontal: 'never', top: 'never' }}>
        <View style={styles.flex}>{this.props.children}</View>
        <StatusBar barStyle="default" />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  flex: {
    flex:1,
  }
})
// const CommonNavScreen = ({ navigation, children }) => (
//   <SafeAreaView forceInset={{ horizontal: 'always', top: 'always' }}>
//     {children}
//     <StatusBar barStyle="default" />
//   </SafeAreaView>
// );

module.exports = {
  MyNavScreen,
  CommonNavScreen
};
