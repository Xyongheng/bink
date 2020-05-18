import { HTTP } from '../util/httpTest'
class ClassicTestModel extends HTTP{
  getLatest(scallBack) {
    return  this.request({
      url: 'classic/latest',
    })
  }


  _setLatestIndex(index) {
    wx.setStorageSync('latest', index);
  }

}

export {
  ClassicTestModel
}