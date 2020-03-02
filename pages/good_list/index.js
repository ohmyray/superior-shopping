// pages/good_list/index.js
import request from "../../utils/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: '',
        goodsMap: [],
        goodList: [],
        pageNum: 1,
        pageSize: 10,
        total: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options); // 拿到页面中的路由传递参数
        let {
            keyword
        } = options
        this.setData({
            keyword
        })
        this.findGoodList()
    },

    findGoodList() {
        request({
            url: "/goods/search",
            data: {
                query: this.data.keyword, // 关键字
                pagenum: this.data.pageNum,
                pagesize: this.data.pageSize
            }
        }).then(({
            data: res
        }) => {
            this.setData({
                total: res.message.total
            })
            let goodList = res.message.goods
                .map(v => {
                    // 给价格保留两个小数点
                    v.goods_price = Number(v.goods_price).toFixed(2);
                    return v
                })
            console.log(goodList)
            this.setData({
                goodList: goodList,
                goodsMap: res.message
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
        let pageNum = this.data.pageNum;
        pageNum++
        this.setData({
            pageNum
        })
        
        this.findGoodList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})