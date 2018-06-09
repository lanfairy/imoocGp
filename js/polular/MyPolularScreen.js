import React from 'react';
import {  Image, StyleSheet} from 'react-native';

import MyNavScreen from '../commonComponents/MyNavScreen';

const MyPolularScreen = ({ navigation }) => (
  <MyNavScreen banner="polular Tab" navigation={navigation} />
);

MyPolularScreen.navigationOptions = {
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
export default MyPolularScreen;
