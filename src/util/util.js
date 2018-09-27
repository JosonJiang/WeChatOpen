function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600);
  time = time % 3600;
  var minute = parseInt(time / 60);
  time = time % 60;
  var second = time;

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude);
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2);
  latitude = latitude.toFixed(2);

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

// 判断是否是iOS系统平台
/**
 * 判断是否是苹果系统，是返回true
 * app 通过var app = getApp();获得
 */
function isIos(app){

  console.log(app.globalData.SystemInfo);

  let platform = app.globalData.SystemInfo.platform;
  platform = platform.toLowerCase();
  //console.log("isIos", platform);
  return platform.indexOf("ios")>=0;

}


/**
 * 解决苹果端startPullDownRefresh不能触发onPullDownRefresh的问题
 * that  js文件的this
 * app
 */
function cusStartPullDownRefreh(that,app){
  wx.startPullDownRefresh({});
  if (isIos(app)){
    that.onPullDownRefresh();
  }
}

function  SystemInfo(){

wx.getSystemInfo({

  success:function (res) {

    let reswindowWidth=res.windowWidth;
    let reswindowHeight=res.windowHeight;                             // 获取可使用窗口高度
    let windowHeight = (res.windowHeight * (750 / reswindowWidth));   //将高度乘以换算后的该设备的rpx与px的比例

    console.log(windowHeight);                                        //最后获得转化后得rpx单位的窗口高度
    console.log(reswindowWidth);
    console.log(reswindowHeight);

  }

})

}

module.exports = {

  formatTime: formatTime,
  formatLocation: formatLocation,
  StartPullDownRefreh:cusStartPullDownRefreh,
  SystemInfo:SystemInfo,
  isIos :isIos

};
