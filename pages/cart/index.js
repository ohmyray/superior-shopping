// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartList: [],
        totalNumber: 0,
        totalPrice: 0,
        totalSelect: true
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
        this.setData({
            cartList,
        })

        // 计算
        this.handleTotalNumber();
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

    // 处理选择
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

        const flag = this.data.cartList.some(item => {
            return item.select === false;
        })
        
        this.handleTotalNumber();
        this.handleTotalPrice();
        this.setData({
            totalSelect: !flag

        })
    },

    // 处理全选
    handleSelectAll() {
        let flag = this.data.totalSelect;
        this.data.cartList.forEach(item => {
            item.select = !flag;
        })
        this.setData({
            cartList: this.data.cartList,
            totalSelect: !flag
        })
        this.handleTotalPrice();
        this.handleTotalNumber();
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

    // 计算总数
    handleTotalNumber() {
        let totalNumber = 0;
        this.data.cartList.forEach(item => {
            if (item.select) {
                totalNumber += item.number;
            }
        })

        this.setData({
            totalNumber
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