// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartList: [],
        cartNumber: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCart(); // 获取购物车数据
    },

    // 获取购物车数据
    getCart() {
        let cartList = wx.getStorageSync('cart') || [];
        let cartNumber = 0;
        cartList.map(item => {
            cartNumber += item.number
            return cartNumber
        })
        this.setData({
            cartList,
            cartNumber
        })
    },

    // 从购物车去对应商品详情
    handleGoDetail(e){
        const {id} = e.currentTarget.dataset;
        wx.navigateTo({
           url: '/pages/good_detail/index?id=' + id
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
        this.getCart(); // 获取购物车数据
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