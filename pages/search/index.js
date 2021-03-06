// pages/search/index.js
import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCancel: true,
    inputValue: '',
    suggestList: [],
    searchHistory: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let arr = wx.getStorageSync("searchHistory");
    this.setData({
      searchHistory: arr
    })
  },
  // 取消
  handleCancel() {
    this.setData({
      isCancel: true,
      suggestList: []
    })
  },


  handleSearchFocus(e) {
    const {
      value
    } = e.detail;

    this.setData({
      inputValue: value
    });

    if (this.data.inputValue !== '') {
      this.setData({
        isCancel: false
      })
    }

    if (!value.trim()) {
      this.setData({
        recommend: []
      });

      return;
    }
    this.findKeywordProduct()
  },

  bindKeyInput(e) {
    const {
      value
    } = e.detail;
    this.setData({
      inputValue: value
    });

    if (this.data.inputValue !== '') {
      console.log(this.data.inputValue);
      this.setData({
        isCancel: false
      })
    }

    if (!value.trim()) {
      this.setData({
        recommend: []
      });

      return;
    }

    this.findKeywordProduct()
  },

  findKeywordProduct() {
    request({
      url: '/goods/qsearch',
      data: {
        query: this.data.inputValue
      }
    }).then(({
      data: res
    }) => {
      console.log(res);
      this.setData({
        suggestList: res.message
      })
    })
  },

  // 搜索
  bindConfirm() {
    this.findKeywordProduct()
    let history = [...new Set(this.data.searchHistory), this.data.inputValue]

    this.setData({
      searchHistory: history
    })

    wx.setStorage({
      key: "searchHistory",
      data: this.data.searchHistory
    })

    wx.redirectTo({
      url: '/pages/good_list/index?keyword=' + this.data.inputValue
    })
  },

  // 搜索建议显示隐藏
  handleShowList(e) {
    // console.log(e.target.dataset.onlyid);
    let id = e.target.dataset.onlyid
    if (id) {
      wx.navigateTo({
        url: '/pages/good_detail/index?id=' + id
      })
    }

    if (this.data.inputValue === '') {
      this.setData({
        isCancel: true
      })
    }
    this.setData({
      suggestList: []
    })

  },

  hanleEmpty() {
    this.setData({
      searchHistory: []
    })
    wx.setStorage({
      key: "searchHistory",
      data: []
    })
  },

  goGoodList(e) {
    const {
      keyword
    } = e.target.dataset;
    console.log(keyword);


    wx.redirectTo({
      url: '/pages/good_list/index?keyword=' + keyword,
    })
  }

})