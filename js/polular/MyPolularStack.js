import React from 'react';
import {  Image, StyleSheet} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MyPolularScreen from './MyPolularScreen';
const MyPolularStack = createStackNavigator({
  PolularHome: {
    screen: MyPolularScreen,
  },

});
MyPolularStack.navigationOptions = {
  tabBarTestIDProps: {
    testID: 'TEST_ID_POLULAR',
    accessibilityLabel: 'TEST_ID_POLULAR_ACLBL',
  },
  tabBarLabel: '最热',
  tabBarIcon: ({ tintColor, focused }) => (
    <Image source={require('../../res/images/ic_polular.png')} style={[{ tintColor: tintColor},styles.tabbarIcon]}/>
  ),
};
const styles = StyleSheet.create({
  tabbarIcon: {
    width:25,
    height:25
  },
});
export default MyPolularStack;
