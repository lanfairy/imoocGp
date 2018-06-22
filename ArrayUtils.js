export default class ArrayUtils {
  /**
   * 更新数组,若item已存在则将其从数组中删除,若不存在则将其添加到数组
   */
  static updateArray(array, item){
    if(!array)return;
    array.foreach((value,index)=>{
      if(value === item){
        array.splice(index,1);
        return;
      }
    });
    array.push(item);
  }
  /**
   * 向数组中添加元素,若元素已存在则不添加
   */
  static add(array, item){
    if(!array)return;
    array.foreach((val, index)=>{
      if(val === item)return;
    });
    array.push(item);
  }

  /**
   * 将数组中指定元素移除
   */
  static remove(array, item){
    if(!array)return;
    array.foreach((val, index)=>{
      if(val === item) array.splice(index,1);
    })
  }
  /**
  * clone 数组
    * @return Array 新的数组
   */
  static clone(from){
    if(!from)return[];
    return Array.from(from);
  }

  /**
   * 判断两个数组的是否相等
   */
  static isEqual(arr1, arr2){
    if(!(arr1&&arr2))return false;
    if(arr1.length!=arr2.length)return false;
    arr1.foreach((val, index)=>{
      if(val != arr2[index])return false;
    });
    return true;
  }
}
