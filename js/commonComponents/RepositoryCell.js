'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import GlobalStyles from '../../res/style/GlobalStyles';

export default class RepositoryCell extends Component{
  constructor(props){
    super(props);
    this.state = {
      item: this.props.projectModel.item ? this.props.projectModel.item : this.props.projectModel,
      isFavorite: this.props.projectModel.isFavorite,
      favoriteIcon: this.props.projectModel.isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
    }
  }
  setFavoriteState = (isFavorite)=>{
    this.setState({
      isFavorite: isFavorite,
      favoriteIcon: isFavorite ? require('../../res/images/ic_star.png') : require('../../res/images/ic_unstar_transparent.png'),
    })
  };
  onPressFavorite = ()=>{
    this.setFavoriteState(!this.state.isFavorite);
    this.props.onFavorite(this.props.projectModel.item, this.state.isFavorite);
  };

  render(){
    let item = this.state.item; 
    let favoriteButton=
            <TouchableOpacity
                style={{padding:6}}
                onPress={this.onPressFavorite} 
                underlayColor='transparent'>
                <Image
                    ref='favoriteIcon'
                    style={[{width: 22, height: 22, },{tintColor: '#2196F3'}]}
                    source={this.state.favoriteIcon}/>
            </TouchableOpacity>;
      let TouchableElement = TouchableOpacity;
    return(
      <TouchableElement
        onPress={()=>this.props.onSelected(item)}
        onShowUnderlay={this.props.onHighlight}
        underlayColor='transparent'
        onHideUnderlay={this.props.onUnhighlight}
      >
        <View style={[GlobalStyles.cell_container]}>
            <Text style={styles.title}>{item.full_name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.author}>Author: </Text>
                  <Image source={{uri:item.owner.avatar_url}} style={GlobalStyles.cell_img_owner_avatar} />
                </View>
                <View>
                  <Text>{`Starts:  ${item.stargazers_count}`}</Text>
                </View>
                {favoriteButton}
            </View>
        </View>
      </TouchableElement>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  },
  author: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  }

});
