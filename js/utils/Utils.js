'use strict'
export default class Utils {


    /**
     * 检查该Item是否被收藏
     * **/
   static checkFavorite(item, items){

        return items.some((key)=> item.id.toString() === key);
    }
}