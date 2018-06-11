import React from 'react';
import {  Image, StyleSheet} from 'react-native';
import type {
  NavigationScreenProp,
  NavigationEventSubscription,
} from 'react-navigation';
import { MyNavScreen } from '../commonComponents/MyNavScreen';
import { ThemeFlags } from '../config/ThemeConfig';

type MyTrendingScreenProps = {
  navigation: NavigationScreenProp<*>,
};
class MyTrendingScreen extends React.Component<MyTrendingScreenProps> {
  _s0: NavigationEventSubscription;
  _s1: NavigationEventSubscription;
  _s2: NavigationEventSubscription;
  _s3: NavigationEventSubscription;


  componentDidMount() {
    this._s0 = this.props.navigation.addListener('willFocus', this._onEvent);
    this._s1 = this.props.navigation.addListener('didFocus', this._onEvent);
    this._s2 = this.props.navigation.addListener('willBlur', this._onEvent);
    this._s3 = this.props.navigation.addListener('didBlur', this._onEvent);
  }
  componentWillUnmount() {
    this._s0.remove();
    this._s1.remove();
    this._s2.remove();
    this._s3.remove();
  }
  _onEvent = a => {
    console.log('EVENT ON Trending TAB', a.type, a);
  };
  render() {
    const { navigation } = this.props;
    return <MyNavScreen banner="Trending Tab" navigation={navigation} />;
  }
}
MyTrendingScreen.navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  return {
    headerTitle: `趋势`,
    headerTintColor: '#FFF',
    headerRight: (
      null
    ),
    headerStyle: {
      backgroundColor: ThemeFlags.Pink,
    }
  };
};
const styles = StyleSheet.create({
  tabbarIcon: {
    width:25,
    height:25
  },
});
export default MyTrendingScreen;
