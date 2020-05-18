import { HTTP } from '../util/http'
class ClassicModel extends HTTP{
  getLatest(scallBack) {
    this.request({
      url: 'classic/latest',
      success: res => {
        wx.setStorageSync(this._getKey(res.index),res)
        scallBack(res)
        this._setLatestIndex(res.index)
      }
    })
  }
  getPrevious(index, url, scallBack) {
    let key = url =='next' ? this._getKey(index+1):this._getKey(index-1);
    let classicData = wx.getStorageSync(key);
    if(classicData) {
      scallBack(classicData);
    }else {
      this.request({
        method: 'GET',
        url: `classic/${index}/${url}`,
        success: res => {
          wx.setStorageSync(key,res);
          scallBack(res)
        }
      })
    }
  }
  isFirst(index) {
    return index == 1 ? true : false;
  }
  isLatest(index) {
    let latestIndex = this._getLatestIndex();
    return latestIndex == index ? true : false
  }
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  }
  _getLatestIndex() {
    let index = wx.getStorageSync('latest');
    return index;
  }
  _getKey(index) {
    let key = `classic-${index}`;
    return key;
  }

}

export {
  ClassicModel
}