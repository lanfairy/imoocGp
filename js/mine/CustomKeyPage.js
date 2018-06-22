'use strict'
import React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import ViewUtils from '../utils/ViewUtils';
import { ThemeFlags } from '../config/ThemeConfig';
export default class CustomKeyPage extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let content = <ScrollView>

                  </ScrollView>;
    return (
      <SafeAreaView style={styles.flex} forceInset={{ horizontal: 'never', top: 'never' }}>
        <View style={styles.flex}>
        {
          content
        }
        </View>
        <StatusBar barStyle="default" />
      </SafeAreaView>
    );
  }
}
CustomKeyPage.navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  return {
    headerTitle: `自定义标签`,
    headerTintColor: '#FFF',
    headerLeft: (ViewUtils.getLeftBtn(()=>{
      navigation.pop();
    })),
    headerRight: (
      null
    ),
    headerStyle: {
      backgroundColor: ThemeFlags.LightGreen,
    }
  };
};
const styles = StyleSheet.create({
  flex: {
    flex:1,
  }
});