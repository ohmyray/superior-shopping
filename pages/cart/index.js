// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartList: [],
        cartNumber: 0,
        totalPrice: 0
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

        // 计算价格
        this.handleTotalPrice()
    },

    // 从购物车去对应商品详情
    handleGoDetail(e) {
        const {
            id
        } = e.currentTarget.dataset;
        wx.navigateTo({
            url: '/pages/good_detail/index?id=' + id
        })
    },

    // 处理是否选择
    handleSelect(e) {
        // 当前点击的商品索引
        let {
            index
        } = e.currentTarget.dataset;
        console.log(index);
        this.data.cartList[index].select = !this.data.cartList[index].select;
        this.setData({
            cartList: this.data.cartList
        })

        this.handleTotalPrice();
    },

    // 计算总价格
    handleTotalPrice() {
        let totalPrice = 0;
        this.data.cartList.forEach(item => {
            if (item.select) {
                totalPrice += item.goods_price * item.number;
            }
        })

        this.setData({
            totalPrice
        })
        
        wx.setStorageSync('cart', this.data.cartList);
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