//app.js
import request from "./utils/request";
App({
  onLaunch: function () {
    request.defaults.baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
  }
})