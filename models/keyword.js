import {HTTP} from '../util/httpTest';
class KeywordModel extends HTTP {
  key = 'keywords'
  maxLength = 10
  addToHistory(keyword) {
    let words = this.getHistory();
    words = words || [];
    const has = words.includes(keyword);
    if(!has){
      words.unshift(keyword);
    }
    words = words.slice(0,this.maxLength);
    wx.setStorageSync(this.key,words);

  }
  getHistory() {
    return wx.getStorageSync(this.key);
  }
  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
}

export {KeywordModel}