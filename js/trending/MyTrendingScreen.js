import React from 'react';
import {  
  Image,
  View,
  ListView, 
  StyleSheet
} from 'react-native';
import { MyNavScreen, CommonNavScreen } from '../commonComponents/MyNavScreen';
import { ThemeFlags } from '../config/ThemeConfig';
import GlobalStyles from '../../res/style/GlobalStyles';

class MyTrendingScreen extends React.Component {



  componentDidMount() {

  }
  componentWillUnmount() {

  }

  render() {
    const { navigation } = this.props;
    return (
      <CommonNavScreen navigation={navigation}>
        <View style={[GlobalStyles.listView_container,{paddingTop: 0}]}>

        </View>
      </CommonNavScreen>
    );
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
