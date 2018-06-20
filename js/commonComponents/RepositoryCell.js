'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';
import GlobalStyles from '../../res/style/GlobalStyles';

export default class RepositoryCell extends Component{
  constructor(props){
    super(props);
    this.state = {
      rowData: this.props.rowData,
      favoriteIcon: require('../../res/images/ic_star.png')
    }
  }
  onPressFavorite = ()=>{

  };
  render(){
    let rowData = this.state.rowData;
    let favoriteButton=
            <TouchableHighlight
                style={{padding:6}}
                onPress={this.onPressFavorite} underlayColor='transparent'>
                <Image
                    ref='favoriteIcon'
                    style={[{width: 22, height: 22,}]}
                    source={this.state.favoriteIcon}/>
            </TouchableHighlight>;
    return(
      <TouchableHighlight
        onShowUnderlay={this.props.onHighlight}
        underlayColor='transparent'
        onHideUnderlay={this.props.onUnhighlight}
      >
        <View style={[GlobalStyles.cell_container]}>
            <Text style={styles.title}>{rowData.full_name}</Text>
            <Text style={styles.description}>{rowData.description}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.author}>Author: </Text>
                  <Image source={{uri:rowData.owner.avatar_url}} style={GlobalStyles.cell_img_owner_avatar} />
                </View>
                <View>
                  <Text>{`Starts:  ${rowData.stargazers_count}`}</Text>
                </View>
                {favoriteButton}
            </View>
        </View>
      </TouchableHighlight>
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
