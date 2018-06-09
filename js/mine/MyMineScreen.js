import React from 'react';
import {  Image, StyleSheet} from 'react-native';
import type {
  NavigationScreenProp,
  NavigationEventSubscription,
} from 'react-navigation';
import MyNavScreen from '../commonComponents/MyNavScreen';

const MyMineScreen = ({ navigation }) => (
  <MyNavScreen banner="Mine Tab" navigation={navigation} />
);

MyMineScreen.navigationOptions = {
  tabBarLabel: '我的',
  tabBarIcon: ({ tintColor, focused }) => (
    <Image source={require('../../res/images/ic_my.png')} style={[{ tintColor: tintColor},styles.tabbarIcon]}/>
  ),
};
const styles = StyleSheet.create({
  tabbarIcon: {
    width:25,
    height:25
  },
});
export default MyMineScreen;
