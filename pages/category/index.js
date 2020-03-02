// pages/category/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,
    },

    handleTitle(e){
        const {
            index
        } = e.currentTarget.dataset
        this.setData({
            current: index
        })
    }
   
})