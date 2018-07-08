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
const TRENDING_URL = 'https://github.com/';
export default class RepositoryDetail extends Component {
  constructor(props){
    super(props);
    let projectModel = this.props.navigation.getParam('projectModel');
    let url = projectModel.item.html_url ? projectModel.item.html_url
            : TRENDING_URL + projectModel.item.fullName;

    this.state={
      url: url,
      canGoBack: false,
      isFavorite: projectModel.isFavorite,
      item: projectModel.item,
    }
  }
  componentWillMount(){
    this.props.navigation.setParams({
      onBack: this._onBack,
      onFavoriteProject: this._onFavoriteProject,
    });
  }
  render() {

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
  setFavoriteState = (isFavorite)=>{
    this.setState({
      isFavorite: isFavorite,
    })
    let favoriteIcon = (isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'));
    this.props.navigation.setParams({
      favoriteIcon : favoriteIcon,
    });
  };
  _onFavoriteProject = ()=>{
    this.setFavoriteState(!this.state.isFavorite);
    if(this.props.navigation.getParam("onFavorite", null))
    this.props.navigation.getParam("onFavorite")(this.state.item, !this.state.isFavorite);
  };
}




RepositoryDetail.navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  let projectModel = navigation.getParam('projectModel');
  let title = projectModel.item.full_name ? projectModel.item.full_name
  : projectModel.item.fullName;
  let favoriteIcon = (projectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'));
  favoriteIcon = navigation.getParam('favoriteIcon', favoriteIcon);
  return {
    headerTitle: title,
    headerTintColor: '#FFF',
    headerLeft: (ViewUtils.getLeftBtn(
      navigation.getParam('onBack')
    )),

    headerRight: (
      ViewUtils.getRightBtn(
        navigation.getParam('onFavoriteProject'),
        favoriteIcon,
        null,
        {marginRight: 0,}
      )
    ),

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