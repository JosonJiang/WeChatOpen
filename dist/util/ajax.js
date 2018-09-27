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

            //console.log(Join);

            if (model.data[k].toString() !== '') {
                model.url = model.url + Join + k + "=" + model.data[k];
            }

            Index++;
        }

        model.data = '';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiXSwibmFtZXMiOlsiUHJvbWlzZSIsInJlcXVpcmUiLCJKb3NvbiIsIm1vZGVsIiwicHJvbWlzZXZhcmlhYmxlIiwicmVzb2x2ZSIsInJlamVjdCIsInd4IiwicmVxdWVzdCIsInVybCIsInNlcnZlckhvc3QiLCJkYXRhIiwicGFyYW1zIiwibWV0aG9kIiwiaGVhZGVyIiwic3VjY2VzcyIsInJlc3VsdCIsInN0YXR1cyIsInN0YXR1c0NvZGUiLCJjb25zb2xlIiwibG9nIiwiZXhjZXB0aW9uIiwibXNnIiwibWVzc2FnZSIsInBhdGgiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImVycm9yIiwic3RhIiwiZXJyTXNnIiwiYWpheCIsInNob3dMb2FkaW5nIiwiY29udGVudFR5cGUiLCJQb3N0SnNvbiIsInVuZGVmaW5lZCIsIkpvaW4iLCJJbmRleCIsImsiLCJ0b1N0cmluZyIsInJlcyIsImhpZGVMb2FkaW5nIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJtb2R1bGUiLCJleHBvcnRzIiwiUG9zdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQUlBLFVBQVVDLFFBQVEsdUJBQVIsQ0FBZDs7QUFFQTs7O0FBR0E7QUFDQSxTQUFTQyxLQUFULENBQWVDLEtBQWYsRUFBc0I7O0FBRWxCOztBQUVBO0FBQ0E7O0FBRUEsUUFBSUMsa0JBQWtCLElBQUlKLE9BQUosQ0FBWSxVQUFVSyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjs7QUFFekRDLFdBQUdDLE9BQUgsQ0FBVzs7QUFFUEMsaUJBQUtOLE1BQU1PLFVBQU4sSUFBb0IsS0FBTVAsTUFBTU0sR0FGOUI7QUFHUEUsa0JBQU1SLE1BQU1TLE1BQU4sSUFBZ0IsRUFIZjtBQUlQQyxvQkFBUVYsTUFBTVUsTUFBTixJQUFnQixNQUpqQjs7QUFNUEMsb0JBQVE7O0FBRUosMEJBQVUsa0JBRk47QUFHSixnQ0FBZ0I7QUFDakI7QUFDQTtBQUxLLGFBTkQ7O0FB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RSxrQkFBTVIsTUFBTVEsSUFITDtBQUlQRyxvQkFBUTtBQUNKLGdDQUFnQlgsTUFBTStCLFdBRGxCO0FBRUo7QUFDQSwwQkFBVTs7QUFITixhQUpEOztBQVdQbkIscUJBQVMsaUJBQUMwQixHQUFELEVBQVM7QUFDZGxDLG1CQUFHbUMsV0FBSDtBQUNBLG9CQUFJRCxJQUFJdkIsVUFBSixJQUFrQixHQUF0QixFQUEyQjs7QUFFdkJiLDRCQUFRb0MsSUFBSTlCLElBQVo7QUFFSCxpQkFKRCxNQUlPOztBQUVIO0FBQ0FKLHVCQUFHb0MsU0FBSCxDQUFhO0FBQ1RqQiwrQkFBTyxJQURFO0FBRVRrQixpQ0FBUyxhQUZBO0FBR1RDLG9DQUFZO0FBSEgscUJBQWI7QUFNSDtBQUNKO0FBM0JNLFNBQVg7QUE4QkgsS0FsQ0UsQ0FBUDtBQW1DSDs7QUFJRDtBQUNBQyxPQUFPQyxPQUFQLEdBQWlCOztBQUViQyxVQUFNOUMsS0FGTztBQUdiOEIsVUFBTUE7O0FBSE8sQ0FBakI7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFqYXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL+W8leWFpVByb21pc2VcbnZhciBQcm9taXNlID0gcmVxdWlyZSgnZXM2LXByb21pc2UuYXV0by5qcycpO1xuXG4vL2NvbnNvbGUubG9nKGdldEFwcCgpLmRhdGEpO1xuXG5cbi8v6buY6K6k6K+35rGCXG5mdW5jdGlvbiBKb3Nvbihtb2RlbCkge8KgwqDCoMKgwqBcblxuICAgIC8vbW9kZWwuc2VydmVySG9zdCA9IHRoaXMuc2VydmVySG9zdCArIG1vZGVsLnNlcnZlckhvc3Q7XG5cbiAgICAvL21vZGVsLnVybCA9IHRoaXMudXJsICsgbW9kZWwudXJsO1xuICAgIC8vbW9kZWwucGFyYW1zID0gdGhpcy5wYXJhbXMgKyBtb2RlbC5wYXJhbXM7XG5cbiAgICBsZXQgcHJvbWlzZXZhcmlhYmxlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHd4LnJlcXVlc3Qoe1xuXG4gICAgICAgICAgICB1cmw6IG1vZGVsLnNlcnZlckhvc3QgfHwgXCJcIiAgKyBtb2RlbC51cmwsXG4gICAgICAgICAgICBkYXRhOiBtb2RlbC5wYXJhbXMgfHwgXCJcIixcbiAgICAgICAgICAgIG1ldGhvZDogbW9kZWwubWV0aG9kIHx8ICdQT1NUJyxcblxuICAgICAgICAgICAgaGVhZGVyOiB7wqDCoMKgwqDCoMKgwqDCoFxuXG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCfCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAvLydjb250ZW50LXR5cGUnOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PWdiMjMxMlwiXG4gICAgICAgICAgICAgICAvL1wiY29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiwqBcbiAgICAgICAgICAgIH0sXG5cblxuXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXN1bHQpIHvCoMKgwqDCoMKgwqDCoMKgXG5cbiAgICAgICAgICAgICAgICB2YXIgc3RhdHVzID0gcmVzdWx0LnN0YXR1c0NvZGU7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cyA9PSA1MDApIHtcblxuICAgICAgICAgICAgICAgICAgICAvL+eoi+W6j+aKm+WHuuW8guW4uFxuICAgICAgICAgICAgICAgICAgICAgwqDCoMKgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4Y2VwdGlvbiA9IHJlc3VsdC5kYXRhLmV4Y2VwdGlvbjvCoMKgwqDCoMKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gcmVzdWx0LmRhdGEubWVzc2FnZTvCoMKgwqDCoMKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IHJlc3VsdC5kYXRhLnBhdGg7wqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgICDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7wqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgICAgICDCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZXhjZXB0aW9uICsgXCJcXHJcXG5cIiArIG1zZyArIFwiXFxuXFxyXCIgKyBwYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2xvYWRpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDDCoMKgwqDCoMKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICB9KTvCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgICDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7wqDCoMKgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO8KgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICB9wqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgIMKgwqBcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzICE9IDIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8v57O757uf5pyq55+l5byC5bi4XG4gICAgICAgICAgICAgICAgICAgICDCoMKgwqDCoMKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gcmVzdWx0LmRhdGEuZXJyb3I7wqDCoMKgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhdGggPSByZXN1bHQuZGF0YS5wYXRoO8KgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgICDCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7wqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICAgICAgIMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbXNnICsgXCJcXG5cXHJcIiArIHBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbG9hZGluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTAwMMKgwqDCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgIH0pO8KgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgIMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47wqDCoMKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8v6Ieq5a6a5LmJ5byC5bi4XG4gICAgICAgICAgICAgICAgIMKgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICB2YXIgc3RhID0gcmVzdWx0LmRhdGEuZXJyTXNnIHx8IHJlc3VsdC5kYXRhO1xuXG4gICAgICAgICAgICAgICAgaWYgKHN0YSA9PSBcInJlcXVlc3Q6b2tcIikge1xuXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHJlc3VsdC5kYXRhLmVyck1zZyB8fCByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHvCoMKgwqDCoMKgwqDCoFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbXNnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2xvYWRpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDDCoMKgwqDCoMKgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgICAgICAgwqDCoFxuICAgICAgICAgICAgICAgICAgICB9KTvCoMKgwqDCoMKgwqDCoFxuICAgICAgICAgICAgICAgICAgICAgwqDCoMKgXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7wqDCoMKgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO8KgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICB9wqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICAgwqDCoMKgwqDCoMKgwqDCoMKgwqBcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7wqDCoMKgwqDCoMKgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7wqDCoFxuICAgIH0pO8KgwqBcblxuICAgIHJldHVybiBwcm9taXNldmFyaWFibGU7XG5cbn1cblxuXG5mdW5jdGlvbiBhamF4KG1vZGVsKSB7XG5cbiAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitJyxcbiAgICB9KTtcblxuICAgIC8v5ou85o6ldXJsXG4gICAgbW9kZWwudXJsID0gbW9kZWwuc2VydmVySG9zdCB8fCBcIlwiICsgbW9kZWwudXJsO1xuICAgIG1vZGVsLmNvbnRlbnRUeXBlPSBtb2RlbC5Qb3N0SnNvbiB8fCBmYWxzZVxuICAgICAgPyBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxuICAgICAgOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04XCI7XG5cbiAgLy9HRVTlj4LmlbDmi7zmjqVcbiAgICBpZiAobW9kZWwubWV0aG9kID09IFwiR0VUXCIgJiYgbW9kZWwuZGF0YSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAgICAgbGV0IEpvaW4gPSBcIj9cIjtcbiAgICAgICAgbGV0IEluZGV4ID0gMDtcblxuICAgICAgICBmb3IgKGxldCBrIGluIG1vZGVsLmRhdGEpIHtcblxuICAgICAgICAgICAgSm9pbiA9IEluZGV4ID09IDAgPyBcIj9cIiA6IFwiJlwiXG5cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSm9pbik7XG5cbiAgICAgICAgICAgIGlmIChtb2RlbC5kYXRhW2tdLnRvU3RyaW5nKCkgIT09ICcnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG1vZGVsLnVybCA9IG1vZGVsLnVybCArIEpvaW4gKyBrICsgXCI9XCIgKyBtb2RlbC5kYXRhW2tdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBJbmRleCsrO1xuXG4gICAgICAgIH1cblxuICAgICAgICBtb2RlbC5kYXRhID0gJyc7XG5cbiAgICB9XG5cblxuICAgIC8v6L+U5ZueUHJvbWlzZeWvueixoVxuICAgIHJldHVybiBuZXcgUHJvbWlzZShcblxuICAgICAgICBmdW5jdGlvbiAocmVzb2x2ZSkge1xuXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1vZGVsLm1ldGhvZCxcbiAgICAgICAgICAgICAgICB1cmw6IG1vZGVsLnVybCxcbiAgICAgICAgICAgICAgICBkYXRhOiBtb2RlbC5kYXRhLFxuICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogbW9kZWwuY29udGVudFR5cGUsXG4gICAgICAgICAgICAgICAgICAgIC8vJ2NvbnRlbnQtdHlwZSc6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9Z2IyMzEyXCIsXG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04J1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IDIwMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+mUmeivr+S/oeaBr+WkhOeQhlxuICAgICAgICAgICAgICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+acjeWKoeWZqOmUmeivr++8jOivt+iBlOezu+WuouacjScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0pXG59XG5cblxuXG4vL+aatOmcsuWFrOWFseiuv+mXruaOpeWPo1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICBQb3N0OiBKb3NvbixcbiAgICBhamF4OiBhamF4XG5cbn07XG5cblxuXG4vLyAvL+W8leWFpeWFrOWFseivt+axglxuLy8gY29uc3QgcmVxdWVzdEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb21tb250L2FqYXguanMnKTtcbi8vIHZhciBzZXJ2ZXJIb3N0ID0gXCJodHRwOi8vYXBpLnNreXdvcnRoLkNvbVwiO1xuLy8gdmFyIHVybCA9IFwiL2hvbWUvdGVzdFwiO1xuLy8gdmFyIHBhcmFtcyA9IHtcbi8vICAgICBtc2c6ICflk4jlk4jlk4gnXG4vLyB9XG4vLyAkUmVxdWVzdC5zZW5kUmVxdWVzdCh7XG4vLyAgICAgc2VydmVySG9zdCA6IFwiaHR0cDovL2FwaS5za3l3b3J0aC5Db21cIjtcbi8vICAgICBtZXRob2Q6ICdnZXQnLFxuLy8gICAgIHVybDogJ3VybCcsXG4vLyAgICAgZGF0YTogdGhpcy5kYXRhLnBhcmFtXG4vLyAgfSlcbi8vICAudGhlbih2YWx1ZXMgPT4ge1xuLy9cbi8vXG4vLyAgICAgdGhpcy5zZXREYXRhKHtcbi8vICAgICAgICAgcmVzdWx0OiB2YWx1ZXMuZGF0YVxuLy8gICAgIH0pO1xuLy9cbi8vIH0pXG5cblxuXG5cbi8vICQuYWpheCh7XG4vL1xuLy8gICAgIHNlcnZlckhvc3QgOiBcImh0dHA6Ly9hcGkuc2t5d29ydGguQ29tXCI7XG4vLyAgICAgbWV0aG9kOiAnZ2V0Jyxcbi8vICAgICB1cmw6ICd1cmwnLFxuLy8gICAgIGRhdGE6IHRoaXMuZGF0YS5wYXJhbVxuLy9cbi8vIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuLy9cbi8vICAgICB0aGlzLnNldERhdGEoe1xuLy8gICAgICAgICByZXN1bHQ6IHZhbHVlcy5kYXRhXG4vLyAgICAgfSk7XG4vL1xuLy8gfSkiXX0=