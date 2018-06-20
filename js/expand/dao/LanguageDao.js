'use strict'
import {
  AsyncStorage,
} from 'react-native';
import langsData from '../../../res/data/langs.json';
import keysData from '../../../res/data/keys.json';

export let FLAG_LANGUAGE = {flag_language: 'flag_dao_language', flag_key: 'flag_dao_key'};
export default class LanguageDao{
  constructor(flag){
    this.flag = flag;
  }

  fetch(){
    return new Promise((resolve, reject)=>{
      // AsyncStorage.removeItem(FLAG_LANGUAGE.flag_key);
      AsyncStorage.getItem(this.flag,(error,result)=>{
        if(error){
          reject(error);
          return;
        }
        if(!result){
          let data = this.flag === FLAG_LANGUAGE.flag_language ? langsData : keysData;
          this.save(data);
          resolve(data);
        }else{
          try {
            resolve(JSON.parse(result));
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }

  save(objectData){
    AsyncStorage.setItem(this.flag,JSON.stringify(objectData),(error,result)=>{

    });
  }
}
