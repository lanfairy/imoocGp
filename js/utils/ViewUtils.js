'use strict'
import React, { Component } from 'react';
import {
    TouchableHighlight,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class ViewUtils {
  static getSettingItem(callBack, icon, text, tintStyle, expandableIcon){
    return (
      <TouchableHighlight onPress={callBack} >
        <View style={[styles.setting_item_container]}>
          <View style={styles.icon_text_view}>
            {
              icon ?
              <Image source={icon} resizeMode='stretch' style={{opacity: 1, width: 16, height: 16, marginRight: 10}}/>
              : <View style={{opacity: 1, width: 16, height: 16, marginRight: 10}}></View>
            }
            <Text>{text}</Text>
          </View>
          <Image source={expandableIcon ? expandableIcon : require('../../res/images/ic_tiaozhuan.png')}
            style={[styles.expandable_icon, tintStyle]} />
        </View>
      </TouchableHighlight>
    );
  }

  static getLeftBtn(callBack){
    return (
      <TouchableOpacity
        onPress={callBack}
        style={{padding:8}}
      >
        <Image source={require('../../res/images/ic_arrow_back_white_36pt.png')} style={{width:26, height:26, tintColor:'white'}} />
      </TouchableOpacity>
    );
  }

  static getRightBtn(callBack,icon,text,style){
    return (
      <TouchableOpacity
        onPress={callBack}
        style={{padding:8}}
      >
        {
          icon ? <Image source={icon} resizeMode='stretch' style={[{opacity: 1, width: 16, height: 16, marginRight: 10},style]}/>
           : null
        }
        {
          !text ? <Text style={{color: '#FFF', fontSize: 18}}>{text}</Text> : null
        } 
      </TouchableOpacity>
    );
  }

  // static getRenderTitleView(callBack,icon,text){
  //   return (
  //     <TouchableHighlight
  //       onPress={callBack}
  //       style={}
  //       >

  //       </TouchableHighlight>
  //   )
  // }

}


const styles = StyleSheet.create({
  setting_item_container: {
    backgroundColor: '#fff',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  icon_text_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandable_icon: {
    opacity: 1,
    width: 22,
    height: 22,
    marginRight: 10,
    alignSelf: 'center'
  }
});
