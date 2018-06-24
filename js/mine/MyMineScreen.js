'use strict'
import React from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet
  } from 'react-native';
import type {
  NavigationScreenProp,
  NavigationEventSubscription,
} from 'react-navigation';
import { CommonNavScreen } from '../commonComponents/MyNavScreen';
import { ThemeFlags } from '../config/ThemeConfig';
import GlobalStyles from '../../res/style/GlobalStyles';
import  { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
// const MyMineScreen = ({ navigation }) => (
//   <MyNavScreen banner="Mine Tab" navigation={navigation} />
// );
class MyMineScreen extends React.Component{

  render(){
    const {navigation} = this.props;
    let content =
      <View>
        <View>
          <Text onPress={()=>navigation.navigate('CustomKey',{flag: FLAG_LANGUAGE.flag_key})} style={{fontSize: 20, margin: 20, backgroundColor: 'red'}}>自定义标签</Text>
        </View>
        <View>
          <Text onPress={()=>navigation.navigate('SortKey')} style={{fontSize: 20, margin: 20, backgroundColor: 'red'}}>标签排序</Text>
        </View>
      </View>
            ;
    return (
      <CommonNavScreen navigation={navigation}>
        <View style={[GlobalStyles.listView_container,{paddingTop: 0}]}>
          {content}
        </View>
      </CommonNavScreen>
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
