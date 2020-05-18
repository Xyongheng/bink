// pages/book/book.js
import { ClassicModel } from '../../models/classic'
import { ClassicTestModel } from '../../models/classicTest'
import { LikeModel } from '../../models/like'
let classic = new ClassicModel();
let classicTest = new ClassicTestModel();
let like = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test: 1,
    classicData: {},
    index: 0,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classic.getLatest(res => {
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
    classicTest.getLatest().then(res => {
      console.log(`res==>` ,res)
    })
  },
  // 点击喜欢按钮
  onLike (event) {
    let behavior = event.detail.behavior;
    like.clickLike(behavior, this.data.classicData.id,this.data.classicData.type);
  },

  onPrevious(event) {
    let index = this.data.classicData.index;
    let url = event.detail.url;
    classic.getPrevious(index, url, res => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData : res,
        index: res.index,
        latest: classic.isLatest(res.index),
        first: classic.isFirst(res.index)
      })
    })
  },
  _getLikeStatus(artID, category) {
    like.getClassicLikeStatus(artID, category,
      res => {
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})