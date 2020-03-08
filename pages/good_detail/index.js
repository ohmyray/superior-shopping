// pages/good_detail/index.js
import request from "../../utils/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailData: [],
        current: 0,
        cartList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let {
            id
        } = options;
        this.findDetail(id);
        this.getCart()
    },

    getCart() {
        let _that = this;
        wx.getStorage({
            key: 'cart',
            success(res) {
                _that.setData({
                    cartList: res.data
                })
            }
        })
    },


    // 获取当前商品信息
    findDetail(id) {
        request({
            url: '/goods/detail',
            data: {
                goods_id: id
            }
        }).then(({
            data: res
        }) => {
            const message = res.message
            this.setData({
                detailData: message
            })
        });
    },

    // tab切换
    handleTab(e) {
        console.log(e.currentTarget);
        let {
            index
        } = e.currentTarget.dataset;
        this.setData({
            current: index
        })
    },

    // 跳转到购物车
    handleGoCart() {
        wx.switchTab({
            url: '/pages/cart/index'
        })
    },

    //添加到购物车
    hanleAddToCart(e) {
        const {
            id
        } = e.currentTarget.dataset;
        console.log(this.data.cartList);

        let cartList = this.data.cartList
        // 若购物车中有相同id的商品
        let flag = cartList.some(item => {
            let flag = item.goods_id === id;
            if (flag) {
                item.number += 1;
                wx.showToast({
                    title: '数量+1',
                    icon: 'success'
                })
            }

            return flag
        })

        // 若购物车中没有相同的id商品
        if (!flag) {

            // 购物车与要添加的商品做合并
            let product = [this.data.detailData];
            // 数据改造
            product = product.map(item => {
                return {
                    goods_id: item.goods_id,
                    image: item.pics[0].pics_sma,
                    goods_name: item.goods_name,
                    goods_price: item.goods_price,
                    number: 1,
                    select: true
                };
            });
            // 新购物车列表
            cartList = [...this.data.cartList, ...product];
        }

        this.setData({
            cartList
        })
        wx.setStorage({
            key: "cart",
            data: this.data.cartList
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