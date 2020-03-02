// pages/category/index.js
import request from "../../utils/request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,
        productList: [],
        pageList: []
    },

    onLoad() {

        // 获取全部数据
        request({
            url: '/categories'
        }).then(({
            data: res
        }) => {
            console.log(res)
            this.setData({
                productList: res.message,
                pageList: res.message[this.data.current]
            })
        })
    },

    handleTitle(e) {
        const {
            index
        } = e.currentTarget.dataset
        // 拿到当前点击的类别数据
        let pageList = this.data.productList[index]
        console.log(pageList);

        this.setData({
            current: index,
            pageList: pageList
        })

    }

})