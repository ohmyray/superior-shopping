// pages/search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      isCancel: false,
      inputValue: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    handleCancel() {
      this.setData({
        isCancel: !this.data.isCancel
      })
    },
    handleSearchFocus(e){
      this.setData({
        isCancel: false
      })
    },
    bindKeyInput(e){
      this.setData({
        inputValue: e.detail.value
      })
      console.log(this.data.inputValue);
      
    }
  
})