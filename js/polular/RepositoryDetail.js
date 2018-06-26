import React, { Component } from 'react';
import {  
  View, 
  Text,
  WebView,
  StyleSheet,
 } from 'react-native';
import ViewUtils from '../utils/ViewUtils';
import { ThemeFlags } from '../config/ThemeConfig';
const WEBVIEW_REF = 'webview';
export default class RepositoryDetail extends Component {
  constructor(props){
    super(props);
    let rowData = this.props.navigation.getParam('rowData');
    this.state={
      url: rowData.html_url,
      canGoBack: false,
    }
  }
  componentWillMount(){
    this.props.navigation.setParams({
      onBack: this._onBack,
    });
  }
  render() {
      // {this.props.navigation.getParam('rowData').html_url}
    return (
      <View style={styles.flex}>
        <WebView 
          ref={WEBVIEW_REF}
          style={styles.flex}
          source={{uri:this.state.url}}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
          decelerationRate='normal'
          automaticallyAdjustContentInsets={false}
          onNavigationStateChange={this.onNavigationStateChange}
        />
      </View>
    );
  }
  onNavigationStateChange = (navState) => {
    this.setState({
      canGoBack: navState.canGoBack,
      url: navState.url,
    });
  };
  _onBack = ()=>{
    if(this.state.canGoBack){
      this.refs[WEBVIEW_REF].goBack();
    }else{
      this.props.navigation.pop();
    }
  };
}




RepositoryDetail.navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  let title = navigation.getParam('rowData').full_name;
  return {
    headerTitle: title,
    headerTintColor: '#FFF',
    headerLeft: (ViewUtils.getLeftBtn(
      navigation.getParam('onBack')
    )),

    // headerRight: (
    //   ViewUtils.getRightBtn(
    //     navigation.getParam('onSave'),null,'保存'
    //   )
    // ),

    headerStyle: {
      backgroundColor: ThemeFlags.Polular,
    }
  };
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});