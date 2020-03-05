// pages/good_list/index.js
import request from "../../utils/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: '',
        goodList: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        isShowTip: false,
        noMore: false
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
        // 判断是否有更多数据了
        if (this.data.noMore) {
            this.setData({
                loading: false
            })
            return false
        }

        if (!this.data.loading) {

            this.setData({
                loading: true
            })

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

                let noMore = ((this.data.total-(this.data.pageNum*this.data.pageSize)) < this.data.pageSize) ? true : false;
                
                let newGoodList = res.message.goods
                    .map(v => {
                        // 给价格保留两个小数点
                        v.goods_price = Number(v.goods_price).toFixed(2);
                        return v
                    })

                let goodList = [...this.data.goodList,...newGoodList]
                if (!goodList.length) {
                    this.setData({
                        isShowTip: true,
                        loading: false
                    })
                }
                this.setData({
                    goodList: goodList,
                    loading: false,
                    noMore: noMore
                })
            })
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            keyword: '',
            goodList: [],
            pageNum: 1,
            pageSize: 10,
            total: 0,
            loading: false,
            isShowTip: false,
            noMore: false
        })
        this.findGoodList()
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
    }
})