import React from 'react';
import {  Image, StyleSheet} from 'react-native';
import { MyNavScreen } from '../commonComponents/MyNavScreen';
import { ThemeFlags } from '../config/ThemeConfig';


class MyTrendingScreen extends React.Component {



  componentDidMount() {

  }
  componentWillUnmount() {

  }

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
