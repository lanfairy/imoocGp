'use strict'
export default class Utils {


    /**
     * 检查该Item是否被收藏
     * **/
   static checkFavorite(item, items){
       let id = item.id ? item.id : item.fullName;
        return items.some((key)=> id.toString() === key);
    }
}