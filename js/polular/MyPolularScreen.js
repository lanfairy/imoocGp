import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, Alert, ListView} from 'react-native';

import {MyNavScreen,CommonNavScreen} from '../commonComponents/MyNavScreen';
import HttpUtils from '../utils/HttpUtils';
import URLConfig from '../config/URLConfig';
import {ThemeFlags} from '../config/ThemeConfig';
// const MyPolularScreen = ({ navigation }) => (
  // <MyNavScreen banner="polular Tab" navigation={navigation} />
  // <CommonNavScreen navigation={navigation} children={<View></View>} />
// );

export default class MyPolularScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      result: '',
    }
  }
  _onLoad = ()=>{
    let URL = URLConfig.getSearchURL(this.text);
    HttpUtils.get(URL)
      .then((result)=>{
        // Alert.alert('result');
        this.setState({
          result: JSON.stringify(result),
        })
      })
      .catch((error=>{
        this.setState({
          result: JSON.stringify(error),
        })
      }))
  };
  render(){
    const { navigation } = this.props;
    return (
      <CommonNavScreen navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.tips}
        onPress={this._onLoad}
        >获取数据</Text>
        <TextInput style={styles.textInput} onChangeText={text=>this.text=text}/>
        <Text style={{height: 500,backgroundColor:'lightgray'}}>{this.state.result}</Text>
      </View>
      </CommonNavScreen>
    )
  }
}
MyPolularScreen.navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  return {
    headerTitle: `最热`,
    headerTintColor: '#FFF',
    headerRight: (
      null
    ),
    headerStyle: {
      backgroundColor: ThemeFlags.Polular,
    }
  };
};
const styles = StyleSheet.create({
  container: {
    backgroundColor:'skyblue',
    flex:1,
  },
  tips: {
    fontSize: 40,
  },
  textInput: {
    height: 20,
    backgroundColor: '#FFF',
  }
});
