'use strict'
import React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Alter,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import CheckBox from 'react-native-check-box';

import ViewUtils from '../utils/ViewUtils';
import { ThemeFlags } from '../config/ThemeConfig';
import LanguageDao from '../expand/dao/LanguageDao';

export default class CustomKeyPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataArray: [],
    }
  }
  componentDidMount(){
    const flag = this.props.navigation.getParam('flag');
    this.languageDao = new LanguageDao(flag);
    this.loadData();
  }
  loadData(){
    this.languageDao.fetch().then((data)=>{
      this.setState({
        dataArray: data,
      })
    }).catch((error)=>{
      Alert.alert(error);
    });
  }
  onClick(item){

  }
  renderCheckBox(item){
    let leftText = item.name;
    let checked = item.checked;
    return (
      <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={()=>this.onClick(item)}
            isChecked={checked}
            leftText={leftText}
            checkedImage={<Image source={require('../../res/images/my/ic_check_box.png')} style={{tintColor: '#2196F3'}}/>}
            unCheckedImage={<Image source={require('../../res/images/my/ic_check_box_outline_blank.png')} style={{tintColor: '#2196F3'}}/>}
        />);
  }
  renderView(){
    if(!this.state.dataArray || this.state.dataArray.length===0)return;
    let views = [];
    let len = this.state.dataArray.length;
    for(let i = 0, l = len - 2; i < l; i += 2){
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this.renderCheckBox(this.state.dataArray[i])}
            {this.renderCheckBox(this.state.dataArray[i+1])}
          </View>
          <View style={styles.line}/>
        </View>
      )
    }
    views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
            </View>
        )
    return (
      <ScrollView>
        {views}
      </ScrollView>
    );
  }
  render(){

    return (
      <SafeAreaView style={styles.flex} forceInset={{ horizontal: 'never', top: 'never' }}>
        <View style={styles.flex}>
        {
          this.renderView()
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
  },
  item: {
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray',
  },
});
