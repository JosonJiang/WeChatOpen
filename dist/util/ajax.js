"use strict";

//引入Promise
var Promise = require("./es6-promise.auto.js");

//console.log(getApp().data);


//默认请求
function Joson(model) {

    //model.serverHost = this.serverHost + model.serverHost;

    //model.url = this.url + model.url;
    //model.params = this.params + model.params;

    var promisevariable = new Promise(function (resolve, reject) {

        wx.request({

            url: model.serverHost || "" + model.url,
            data: model.params || "",
            method: model.method || 'POST',

            header: {

                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded'
                //'content-type': "application/x-www-form-urlencoded;charset=gb2312"
                //"content-Type": "application/json; charset=utf-8" 
            },

            success: function success(result) {

                var status = result.statusCode;

                console.log(result);

                if (status == 500) {

                    //程序抛出异常

                    var exception = result.data.exception;
                    var msg = result.data.message;
                    var path = result.data.path;

                    wx.showToast({

                        title: exception + "\r\n" + msg + "\n\r" + path,
                        icon: 'loading',
                        duration: 1000
                    });

                    resolve(null);
                    return;
                }

                if (status != 200) {

                    //系统未知异常

                    var msg = result.data.error;
                    var path = result.data.path;

                    wx.showToast({

                        title: msg + "\n\r" + path,
                        icon: 'loading',
                        duration: 1000
                    });

                    resolve(null);

                    return;
                }

                //自定义异常

                var sta = result.data.errMsg || result.data;

                if (sta == "request:ok") {

                    var msg = result.data.errMsg || result.data;
                    wx.showToast({

                        title: msg,
                        icon: 'loading',
                        duration: 1000

                    });

                    resolve(null);
                    return;
                }

                resolve(result);
            }

        });
    });

    return promisevariable;
}

function ajax(model) {

    wx.showLoading({
        title: '加载中'
    });

    //拼接url
    model.url = model.serverHost || "" + model.url;
    model.contentType = model.PostJson || false ? "application/json; charset=utf-8" : "application/x-www-form-urlencoded;charset=utf-8";

    //GET参数拼接
    if (model.method == "GET" && model.data !== undefined) {

        var Join = "?";
        var Index = 0;

        for (var k in model.data) {

            Join = Index == 0 ? "?" : "&";

            // console.log(model.data);
            // console.log(k);
            // console.log(model.data[k]);
            // console.log(Join);

            if (model.data[k] !== 'null' && model.data[k] !== '' && model.data[k].toString() !== '') {
                model.url = model.url + Join + k + "=" + model.data[k];
            }

            Index++;
        }

        model.data = '';
        //console.log(model);
    }

    //返回Promise对象
    return new Promise(function (resolve) {

        wx.request({
            method: model.method,
            url: model.url,
            data: model.data,
            header: {
                'content-type': model.contentType,
                //'content-type': "application/x-www-form-urlencoded;charset=gb2312",
                'Accept': 'application/json;charset=utf-8'

            },

            success: function success(res) {
                wx.hideLoading();
                if (res.statusCode == 200) {

                    resolve(res.data);
                } else {

                    //错误信息处理
                    wx.showModal({
                        title: '提示',
                        content: '服务器错误，请联系客服',
                        showCancel: false
                    });
                }
            }
        });
    });
}

//暴露公共访问接口
module.exports = {

    Post: Joson,
    ajax: ajax

};

// //引入公共请求
// const requestHandler = require('../commont/ajax.js');
// var serverHost = "http://api.skyworth.Com";
// var url = "/home/test";
// var params = {
//     msg: '哈哈哈'
// }
// $Request.sendRequest({
//     serverHost : "http://api.skyworth.Com";
//     method: 'get',
//     url: 'url',
//     data: this.data.param
//  })
//  .then(values => {
//
//
//     this.setData({
//         result: values.data
//     });
//
// })


// $.ajax({
//
//     serverHost : "http://api.skyworth.Com";
//     method: 'get',
//     url: 'url',
//     data: this.data.param
//
// }).then(response => {
//
//     this.setData({
//         result: values.data
//     });
//
// })
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiUHJvbWlzZSIsInJlcXVpcmUiLCJKb3NvbiIsIm1vZGVsIiwicHJvbWlzZXZhcmlhYmxlIiwicmVzb2x2ZSIsInJlamVjdCIsInd4IiwicmVxdWVzdCIsInVybCIsInNlcnZlckhvc3QiLCJkYXRhIiwicGFyYW1zIiwibWV0aG9kIiwiaGVhZGVyIiwic3VjY2VzcyIsInJlc3VsdCIsInN0YXR1cyIsInN0YXR1c0NvZGUiLCJjb25zb2xlIiwibG9nIiwiZXhjZXB0aW9uIiwibXNnIiwibWVzc2FnZSIsInBhdGgiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImVycm9yIiwic3RhIiwiZXJyTXNnIiwiYWpheCIsInNob3dMb2FkaW5nIiwiY29udGVudFR5cGUiLCJQb3N0SnNvbiIsInVuZGVmaW5lZCIsIkpvaW4iLCJJbmRleCIsImsiLCJ0b1N0cmluZyIsInJlcyIsImhpZGVMb2FkaW5nIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJtb2R1bGUiLCJleHBvcnRzIiwiUG9zdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQUlBLFVBQVVDLFFBQVEsdUJBQVIsQ0FBZDs7QUFFQTs7O0FBR0E7QUFDQSxTQUFTQyxLQUFULENBQWVDLEtBQWYsRUFBc0I7O0FBRWxCOztBQUVBO0FBQ0E7O0FBRUEsUUFBSUMsa0JBQWtCLElBQUlKLE9BQUosQ0FBWSxVQUFVSyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjs7QUFFekRDLFdBQUdDLE9BQUgsQ0FBVzs7QUFFUEMsaUJBQUtOLE1BQU1PLFVBQU4sSUFBb0IsS0FBTVAsTUFBTU0sR0FGOUI7QUFHUEUsa0JBQU1SLE1BQU1TLE1BQU4sSUFBZ0IsRUFIZjtBQUlQQyxvQkFBUVYsTUFBTVUsTUFBTixJQUFnQixNQUpqQjs7QUFNUEMsb0JBQVE7O0FBRUosMEJBQVUsa0JBRk47QUFHSixnQ0FBZ0I7QUFDakI7QUFDQTtBQUxLLGFBTkQ7O0FB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QUlYLE9BQUosQ0FFSCxVQUFVSyxPQUFWLEVBQW1COztBQUVmRSxXQUFHQyxPQUFILENBQVc7QUFDUEssb0JBQVFWLE1BQU1VLE1BRFA7QUFFUEosaUJBQUtOLE1BQU1NLEdBRko7QUFHUEUsa0JBQU1SLE1BQU1RLElBSEw7QUFJUEcsb0JBQVE7QUFDSixnQ0FBZ0JYLE1BQU0rQixXQURsQjtBQUVKO0FBQ0EsMEJBQVU7O0FBSE4sYUFKRDs7QUFXUG5CLHFCQUFTLGlCQUFDMEIsR0FBRCxFQUFTO0FBQ2RsQyxtQkFBR21DLFdBQUg7QUFDQSxvQkFBSUQsSUFBSXZCLFVBQUosSUFBa0IsR0FBdEIsRUFBMkI7O0FBRXZCYiw0QkFBUW9DLElBQUk5QixJQUFaO0FBRUgsaUJBSkQsTUFJTzs7QUFFSDtBQUNBSix1QkFBR29DLFNBQUgsQ0FBYTtBQUNUakIsK0JBQU8sSUFERTtBQUVUa0IsaUNBQVMsYUFGQTtBQUdUQyxvQ0FBWTtBQUhILHFCQUFiO0FBTUg7QUFDSjtBQTNCTSxTQUFYO0FBOEJILEtBbENFLENBQVA7QUFtQ0g7O0FBSUQ7QUFDQUMsT0FBT0MsT0FBUCxHQUFpQjs7QUFFYkMsVUFBTTlDLEtBRk87QUFHYjhCLFVBQU1BOztBQUhPLENBQWpCOztBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhamF4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy/lvJXlhaVQcm9taXNlXG52YXIgUHJvbWlzZSA9IHJlcXVpcmUoJ2VzNi1wcm9taXNlLmF1dG8uanMnKTtcblxuLy9jb25zb2xlLmxvZyhnZXRBcHAoKS5kYXRhKTtcblxuXG4vL+m7mOiupOivt+axglxuZnVuY3Rpb24gSm9zb24obW9kZWwpIHvCoMKgwqDCoMKgXG5cbiAgICAvL21vZGVsLnNlcnZlckhvc3QgPSB0aGlzLnNlcnZlckhvc3QgKyBtb2RlbC5zZXJ2ZXJIb3N0O1xuXG4gICAgLy9tb2RlbC51cmwgPSB0aGlzLnVybCArIG1vZGVsLnVybDtcbiAgICAvL21vZGVsLnBhcmFtcyA9IHRoaXMucGFyYW1zICsgbW9kZWwucGFyYW1zO1xuXG4gICAgbGV0IHByb21pc2V2YXJpYWJsZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB3eC5yZXF1ZXN0KHtcblxuICAgICAgICAgICAgdXJsOiBtb2RlbC5zZXJ2ZXJIb3N0IHx8IFwiXCIgICsgbW9kZWwudXJsLFxuICAgICAgICAgICAgZGF0YTogbW9kZWwucGFyYW1zIHx8IFwiXCIsXG4gICAgICAgICAgICBtZXRob2Q6IG1vZGVsLm1ldGhvZCB8fCAnUE9TVCcsXG5cbiAgICAgICAgICAgIGhlYWRlcjoge8KgwqDCoMKgwqDCoMKgwqBcblxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgLy8nY29udGVudC10eXBlJzogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1nYjIzMTJcIlxuICAgICAgICAgICAgICAgLy9cImNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIsKgXG4gICAgICAgICAgICB9LFxuXG5cblxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzdWx0KSB7wqDCoMKgwqDCoMKgwqDCoFxuXG4gICAgICAgICAgICAgICAgdmFyIHN0YXR1cyA9IHJlc3VsdC5zdGF0dXNDb2RlO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcblxuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gNTAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy/nqIvluo/mipvlh7rlvILluLhcbiAgICAgICAgICAgICAgICAgICAgIMKgwqDCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgIHZhciBleGNlcHRpb24gPSByZXN1bHQuZGF0YS5leGNlcHRpb247wqDCoMKgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHJlc3VsdC5kYXRhLm1lc3NhZ2U7wqDCoMKgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSByZXN1bHQuZGF0YS5wYXRoO8KgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICAgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe8KgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgICAgICAgwqDCoMKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGV4Y2VwdGlvbiArIFwiXFxyXFxuXCIgKyBtc2cgKyBcIlxcblxcclwiICsgcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwwqDCoMKgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgfSk7wqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICAgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO8KgwqDCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjvCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgfcKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICDCoMKgXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyAhPSAyMDApIHtcblxuICAgICAgICAgICAgICAgICAgICAvL+ezu+e7n+acquefpeW8guW4uFxuICAgICAgICAgICAgICAgICAgICAgwqDCoMKgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHJlc3VsdC5kYXRhLmVycm9yO8KgwqDCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXRoID0gcmVzdWx0LmRhdGEucGF0aDvCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICAgwqDCoMKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe8KgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgICAgICDCoMKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG1zZyArIFwiXFxuXFxyXCIgKyBwYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2xvYWRpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDDCoMKgwqDCoMKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICB9KTvCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgICDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO8KgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL+iHquWumuS5ieW8guW4uFxuICAgICAgICAgICAgICAgICDCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgdmFyIHN0YSA9IHJlc3VsdC5kYXRhLmVyck1zZyB8fCByZXN1bHQuZGF0YTtcblxuICAgICAgICAgICAgICAgIGlmIChzdGEgPT0gXCJyZXF1ZXN0Om9rXCIpIHtcblxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSByZXN1bHQuZGF0YS5lcnJNc2cgfHwgcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7wqDCoMKgwqDCoMKgwqBcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IG1zZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdsb2FkaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwwqDCoMKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICAgICAgIMKgwqBcbiAgICAgICAgICAgICAgICAgICAgfSk7wqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgIMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO8KgwqDCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjvCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgfcKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgIMKgwqDCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO8KgwqDCoMKgwqDCoFxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO8KgwqBcbiAgICB9KTvCoMKgXG5cbiAgICByZXR1cm4gcHJvbWlzZXZhcmlhYmxlO1xuXG59XG5cblxuZnVuY3Rpb24gYWpheChtb2RlbCkge1xuXG4gICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgfSk7XG5cbiAgICAvL+aLvOaOpXVybFxuICAgIG1vZGVsLnVybCA9IG1vZGVsLnNlcnZlckhvc3QgfHwgXCJcIiArIG1vZGVsLnVybDtcbiAgICBtb2RlbC5jb250ZW50VHlwZT0gbW9kZWwuUG9zdEpzb24gfHwgZmFsc2VcbiAgICAgID8gXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCJcbiAgICAgIDogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOFwiO1xuXG4gIC8vR0VU5Y+C5pWw5ou85o6lXG4gICAgaWYgKG1vZGVsLm1ldGhvZCA9PSBcIkdFVFwiICYmIG1vZGVsLmRhdGEgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgICAgIGxldCBKb2luID0gXCI/XCI7XG4gICAgICAgIGxldCBJbmRleCA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgayBpbiBtb2RlbC5kYXRhKSB7XG5cbiAgICAgICAgICAgIEpvaW4gPSBJbmRleCA9PSAwID8gXCI/XCIgOiBcIiZcIjtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobW9kZWwuZGF0YSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhrKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1vZGVsLmRhdGFba10pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coSm9pbik7XG5cbiAgICAgICAgICAgIGlmIChtb2RlbC5kYXRhW2tdIT09J251bGwnICYmIG1vZGVsLmRhdGFba10hPT0nJyAmJiBtb2RlbC5kYXRhW2tdLnRvU3RyaW5nKCkgIT09ICcnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vZGVsLnVybCA9IG1vZGVsLnVybCArIEpvaW4gKyBrICsgXCI9XCIgKyBtb2RlbC5kYXRhW2tdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBJbmRleCsrO1xuXG4gICAgICAgIH1cblxuICAgICAgICBtb2RlbC5kYXRhID0gJyc7XG4gICAgICAgIC8vY29uc29sZS5sb2cobW9kZWwpO1xuICAgIH1cblxuXG4gICAgLy/ov5Tlm55Qcm9taXNl5a+56LGhXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuXG4gICAgICAgIGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogbW9kZWwubWV0aG9kLFxuICAgICAgICAgICAgICAgIHVybDogbW9kZWwudXJsLFxuICAgICAgICAgICAgICAgIGRhdGE6IG1vZGVsLmRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiBtb2RlbC5jb250ZW50VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgLy8nY29udGVudC10eXBlJzogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1nYjIzMTJcIixcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnXG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gMjAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8v6ZSZ6K+v5L+h5oGv5aSE55CGXG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5pyN5Yqh5Zmo6ZSZ6K+v77yM6K+36IGU57O75a6i5pyNJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfSlcbn1cblxuXG5cbi8v5pq06Zyy5YWs5YWx6K6/6Zeu5o6l5Y+jXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIFBvc3Q6IEpvc29uLFxuICAgIGFqYXg6IGFqYXhcblxufTtcblxuXG5cbi8vIC8v5byV5YWl5YWs5YWx6K+35rGCXG4vLyBjb25zdCByZXF1ZXN0SGFuZGxlciA9IHJlcXVpcmUoJy4uL2NvbW1vbnQvYWpheC5qcycpO1xuLy8gdmFyIHNlcnZlckhvc3QgPSBcImh0dHA6Ly9hcGkuc2t5d29ydGguQ29tXCI7XG4vLyB2YXIgdXJsID0gXCIvaG9tZS90ZXN0XCI7XG4vLyB2YXIgcGFyYW1zID0ge1xuLy8gICAgIG1zZzogJ+WTiOWTiOWTiCdcbi8vIH1cbi8vICRSZXF1ZXN0LnNlbmRSZXF1ZXN0KHtcbi8vICAgICBzZXJ2ZXJIb3N0IDogXCJodHRwOi8vYXBpLnNreXdvcnRoLkNvbVwiO1xuLy8gICAgIG1ldGhvZDogJ2dldCcsXG4vLyAgICAgdXJsOiAndXJsJyxcbi8vICAgICBkYXRhOiB0aGlzLmRhdGEucGFyYW1cbi8vICB9KVxuLy8gIC50aGVuKHZhbHVlcyA9PiB7XG4vL1xuLy9cbi8vICAgICB0aGlzLnNldERhdGEoe1xuLy8gICAgICAgICByZXN1bHQ6IHZhbHVlcy5kYXRhXG4vLyAgICAgfSk7XG4vL1xuLy8gfSlcblxuXG5cblxuLy8gJC5hamF4KHtcbi8vXG4vLyAgICAgc2VydmVySG9zdCA6IFwiaHR0cDovL2FwaS5za3l3b3J0aC5Db21cIjtcbi8vICAgICBtZXRob2Q6ICdnZXQnLFxuLy8gICAgIHVybDogJ3VybCcsXG4vLyAgICAgZGF0YTogdGhpcy5kYXRhLnBhcmFtXG4vL1xuLy8gfSkudGhlbihyZXNwb25zZSA9PiB7XG4vL1xuLy8gICAgIHRoaXMuc2V0RGF0YSh7XG4vLyAgICAgICAgIHJlc3VsdDogdmFsdWVzLmRhdGFcbi8vICAgICB9KTtcbi8vXG4vLyB9KSJdfQ==