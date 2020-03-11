// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartList: [],
        totalNumber: 0,
        totalPrice: 0,
        totalSelect: true,
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCart(); // 获取购物车数据

    },

    handleGetAddress() {
            let _that = this;
            wx.chooseAddress({
                success(res) {
                    wx.setStorageSync('userInfo', res);
                }     
            })
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

    handleSubmitOrder(){
       let cartOrder =  this.data.cartList.filter(item=> {
            return item.select
        })

        if (cartOrder.length === 0) {
            wx.showToast({
              title: '选择您所需的商品哟~',
              icon: 'none',
              duration: 2000
            })
            return;
        }
        console.log(this.data.cartList);
        console.log(cartOrder);
        
        
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

    //添加移除商品
    handleSubAndAdd(e) {
        let {
            index,
            num
        } = e.currentTarget.dataset;
        console.log(num);

        if (this.data.cartList[index].number === 1 && Number(num) === -1) {
            let _that = this;
            wx.showModal({
                title: '提示',
                content: '点击确定移除该商品',
                success(res) {
                    if (res.confirm) {
                        _that.data.cartList[index].number = _that.data.cartList[index].number += Number(num);
                        // 从购物车数据中移除该项目
                        _that.data.cartList.splice(index, 1)
                        console.log(_that.data.cartList);
                        _that.SaveCartList();
                    } else if (res.cancel) {
                        // 咱们啥也不用做
                    }
                }
            })
            return;
        } else {
            this.data.cartList[index].number += num;
        }
        // 保存数据状态
        this.SaveCartList();
        this.handleTotalNumber();
        this.handleTotalPrice();
    },

    // 保存数据复用
    SaveCartList() {
        this.setData({
            cartList: this.data.cartList
        })
        // console.log(this.data.cartList);
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
        let userInfo = wx.getStorageSync('userInfo') || null;
        // 获取用户信息
        this.setData({
            userInfo
        })
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