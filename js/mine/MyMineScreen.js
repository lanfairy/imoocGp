import React from 'react';
import {  Image, StyleSheet} from 'react-native';
import type {
  NavigationScreenProp,
  NavigationEventSubscription,
} from 'react-navigation';
import { MyNavScreen } from '../commonComponents/MyNavScreen';
import { ThemeFlags } from '../config/ThemeConfig';

// const MyMineScreen = ({ navigation }) => (
//   <MyNavScreen banner="Mine Tab" navigation={navigation} />
// );
class MyMineScreen extends React.Component{
  render(){
    const {navigation} = this.props;
    return (
      <MyNavScreen banner="Mine Tab" navigation={navigation} />
    )
  }
}

MyMineScreen.navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  return {
    headerTitle: `我的`,
    headerTintColor: '#FFF',
    headerRight: (
      null
    ),
    headerStyle: {
      backgroundColor: ThemeFlags.LightGreen,
    }
  };
};
const styles = StyleSheet.create({
  tabbarIcon: {
    width:25,
    height:25
  },
});
export default MyMineScreen;
