// pages/search/index.js
import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCancel: true,
    inputValue: '',
    suggestList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log(1);
    
    this.setData({
      inputValue: value,
      isCancel: false
    });
    
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


    if (!value.trim()) {
      this.setData({
        recommend: [],
        isCancel: true
      });

      return;
    }

    this.findKeywordProduct()
  },

  // 搜索
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

  // 搜索建议显示隐藏
  handleShowList(e) {
    // console.log(e.target.dataset.onlyid);
    let isSuggestList = e.target.dataset.onlyid
    if (isSuggestList) {
      wx.navigateTo({
        url: '/pages/good_detail/index'
      })
    }
    this.setData({
      suggestList: []
    })

  }

})