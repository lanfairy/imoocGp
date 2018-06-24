/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import ArrayUtils from '../utils/ArrayUtils';
import ViewUtils from '../utils/ViewUtils';
import { ThemeFlags } from '../config/ThemeConfig';

export default class SortKeyPage extends Component {
  constructor(props){
    super(props);
    this.dataArray = [];
    this.sortResultArray = [];
    this.originalCheckedArray = [];
    this.state = {
      checkedArray: [],
    };
  }
  componentWillMount(){
    this.props.navigation.setParams({
      onSave: this._onSave,
      onBack: this._onBack,
    })
  }
  componentDidMount(){
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.loadData();
  }
  _onSave = ()=>{
    if(ArrayUtils.isEqual(this.state.checkedArray,this.originalCheckedArray)){
      this.props.navigation.pop();
      return;
    }
    this.getSortResult();
    this.languageDao.save(this.sortResultArray);
  };
  getSortResult(){
    this.sortResultArray = ArrayUtils.clone(this.dataArray);
    this.originalCheckedArray.forEach((val, index)=>{
      let oriIndex = this.dataArray.indexOf(val);
      this.sortResultArray.splice(oriIndex,1,this.state.checkedArray[index]);
    });
  }
  _onBack = ()=>{
    if(ArrayUtils.isEqual(this.state.checkedArray,this.originalCheckedArray)){
      this.props.navigation.pop();
      return;
    }
    Alert.alert(
      '提示',
      '要保存修改?',
      [
        {text: '否', onPress: () => this.props.navigation.pop()},
        {text: '是', onPress: () => {
          this.getSortResult();
          this.languageDao.save(this.sortResultArray);
          this.props.navigation.pop();
        }},
      ],
      { cancelable: false }
    );
  };

  loadData(){
    this.languageDao.fetch()
      .then((result)=>{
        this.getCheckedItems(result);
      }).catch((error)=>{
        Alert.alert(error);
      });
  }
  getCheckedItems(result){
    this.dataArray = Array.from(result);
    let checkedArray = this.dataArray.filter(item=>item.checked);
    this.setState({
      checkedArray: checkedArray,
    });
    this.originalCheckedArray = ArrayUtils.clone(checkedArray);
  }

  render() {
    return (
      <View style={styles.container}>
          <SortableListView
              style={{flex: 1, marginBottom: 0}}
              data={this.state.checkedArray}
              order={Object.keys(this.state.checkedArray)}
              onRowMoved={e => {
                this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                this.forceUpdate();
              }}
              renderRow={row => <SortCell data={row} />}
          />
      </View>
    );
  }
}
class SortCell extends Component{
  render(){
    return (
      <TouchableHighlight underlayColor={'#eee'} style={styles.item} {...this.props.sortHandlers}>
        <View style={styles.itemContent}>
          <Image style={styles.sortCellImg} source={require('../../res/images/my/ic_sort.png')}/>
          <Text style={styles.sortCellText}>{this.props.data.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
SortKeyPage.navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  return {
    headerTitle: `标签排序`,
    headerTintColor: '#FFF',
    headerLeft: (ViewUtils.getLeftBtn(
      navigation.getParam('onBack')
    )),
    headerRight: (
      ViewUtils.getRightBtn(
        navigation.getParam('onSave'),null,'保存'
      )
    ),
    // gesturesEnabled: false,
    headerStyle: {
      backgroundColor: ThemeFlags.LightGreen,
    }
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    backgroundColor: "#F8F8F8",
    borderBottomWidth:1,
    borderColor: '#eee'
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortCellImg: {
    tintColor: '#2196F3',
    width: 16,
    height: 16,
  },
  sortCellText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
});
