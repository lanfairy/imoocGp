import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, Alert, ListView} from 'react-native';

import {MyNavScreen,CommonNavScreen} from '../commonComponents/MyNavScreen';
import HttpUtils from '../utils/HttpUtils';
import URLConfig from '../config/URLConfig';
import {ThemeFlags} from '../config/ThemeConfig';
import GlobalStyles from '../../res/style/GlobalStyles';
// const MyPolularScreen = ({ navigation }) => (
  // <MyNavScreen banner="polular Tab" navigation={navigation} />
  // <CommonNavScreen navigation={navigation} children={<View></View>} />
// );

export default class MyPolularScreen extends React.Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      result: '',
      dataSource: ds.cloneWithRows([]),
    }
  }
  componentDidMount(){
    this._onLoad();
  }
  _onLoad = ()=>{
    let URL = URLConfig.getSearchURL(this.text);

    HttpUtils.get(URL)
      .then((result)=>{
        // Alert.alert('result');
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(result.items),
        })
      })
      .catch((error=>{
        this.setState({
          result: JSON.stringify(error),
        })
      }))
  };
  //   <Text style={styles.tips}
  //   onPress={this._onLoad}
  //   >获取数据</Text>
  //   <TextInput style={styles.textInput} onChangeText={text=>this.text=text}/>
  //   <Text style={{height: 500,backgroundColor:'lightgray'}}>{this.state.result}</Text>
  // refreshControl={
  //     <RefreshControl
  //         refreshing={this.state.isLoading}
  //         onRefresh={()=>this.onRefresh()}
  //         tintColor={ThemeFlags.Polular}
  //         title="Loading..."
  //         titleColor={this.props.theme.themeColor}
  //         colors={[this.props.theme.themeColor, this.props.theme.themeColor, this.props.theme.themeColor]}
  //     />}
  _renderRow = (rowData)=>{
    return(
      <View style={styles.flex}>
        <Text>{rowData.full_name}</Text>
        <Text>{rowData.description}</Text>
        <View>
          <Text></Text>
          <Image source={{uri:rowData.owner.avatar_url} style={{width: 30,height: 30}}} />
        </View>
      </View>
    )
  };
  render(){
    const { navigation } = this.props;
    let content = <ListView
          ref='listView'
          renderRow={this._renderRow}
                renderFooter={()=> {
                    return <View style={{height: 50}}/>
                }}
                enableEmptySections={true}
                dataSource={this.state.dataSource}

      />;
    return (
      <CommonNavScreen navigation={navigation}>
      <View style={[GlobalStyles.listView_container,{paddingTop: 0}]}>
        {content}
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
