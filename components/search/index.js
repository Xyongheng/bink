import { paginationBev } from '../behaviors/pagination'
import { KeywordModel } from '../../models/keyword'
import { BookModel } from '../../models/book'
const keywordModel = new KeywordModel();
const bookModel = new BookModel();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    total: '',
    loadingCenter: false,
  },

  attached() {
    const historyWords = keywordModel.getHistory();
    this.setData({
      historyWords
    })
    const hotWords = keywordModel.getHot();
    hotWords.then(res => {
      this.setData({
        hotWords: res.hot
      })
    })

  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) return;
      if(this.isLockedl) return;
      console.log(this.hasMore())
      if (this.hasMore()) {
        this.locked();
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books);

          this.unLocked();
        },err => {
          this.unLocked();
        })
      } else {
        // 提示
      }
    },
   
    cancelSearch(event) {
      this.setData({
        searching: false,
        q: ''
      })
      this.initialize();
    },
    closeSearch(event) {
      this.initialize();
      this.triggerEvent('cancel', {}, {});
    },
    onConfirm(event) {
      this.setData({
        searching: true,
        loadingCenter: true
      })
      this.initialize();
      const word = event.detail.value || event.detail.text;
      bookModel.search(0, word).then(res => {
        this.setMoreData(res.books);
        this.setTotal(res.total);
        this.setData({
          q: word,
          loadingCenter: false
        })
        keywordModel.addToHistory(word);
      })
    }
  }
})
