'use strict'
import React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import CheckBox from 'react-native-check-box';

import ViewUtils from '../utils/ViewUtils';
import { ThemeFlags } from '../config/ThemeConfig';
import LanguageDao from '../expand/dao/LanguageDao';
import ArrayUtils from '../utils/ArrayUtils';

export default class CustomKeyPage extends React.Component {
  constructor(props){
    super(props);
    this.isRemoveKey = this.props.navigation.getParam('isRemoveKey') ? true : false;
    this.changeValues = [];
    this.state = {
      dataArray: [],
    }
  }
  componentWillMount(){
    this.props.navigation.setParams({
      onSave: this._onSave,
      onBack: this._onBack,
    })
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
    if(!this.isRemoveKey)
    item.checked = !item.checked;
    ArrayUtils.updateArray(this.changeValues, item);
  }
  _onSave = ()=>{
    if(this.changeValues.length===0){
      return;
    }
    if(this.isRemoveKey){
      this.changeValues.forEach((val, index)=>{
        ArrayUtils.remove(this.state.dataArray,val);
      })
    }
    this.languageDao.save(this.state.dataArray);
    this.changeValues.splice(0,this.changeValues.length);
    // this.props.navigation.pop();
  };
  _onBack = ()=>{
    if(this.changeValues.length===0){
      this.props.navigation.pop();
      return;
    }

    Alert.alert(
      '提示',
      '要保存修改吗?',
      [
        {text: '不保存', onPress: () => this.props.navigation.pop()},
        {text: '保存', onPress: () => {
          this._onSave();
          // this.languageDao.save(this.state.dataArray);
          this.props.navigation.pop();
        }},
      ],
      { cancelable: false }
    );
  };

  renderCheckBox(item){
    let leftText = item.name;
    let checked = this.isRemoveKey ? false : item.checked;
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
  const isRemoveKey = navigation.getParam('isRemoveKey');
  let title = isRemoveKey ? '标签移除' : '自定义标签';
  let rightBtnText = isRemoveKey ? '移除' : '保存';
  return {
    headerTitle: title,
    headerTintColor: '#FFF',
    headerLeft: (ViewUtils.getLeftBtn(
      navigation.getParam('onBack')
    )),
    headerRight: (
      ViewUtils.getRightBtn(
        navigation.getParam('onSave'),null,rightBtnText
      )
    ),
    // gesturesEnabled: false,
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
