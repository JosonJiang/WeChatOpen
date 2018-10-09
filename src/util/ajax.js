//引入Promise
var Promise = require('es6-promise.auto.js');

//console.log(getApp().data);


//默认请求
function Joson(model) {     

    //model.serverHost = this.serverHost + model.serverHost;

    //model.url = this.url + model.url;
    //model.params = this.params + model.params;

    let promisevariable = new Promise(function (resolve, reject) {

        wx.request({

            url: model.serverHost || ""  + model.url,
            data: model.params || "",
            method: model.method || 'POST',

            header: {        

                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded'     
               //'content-type': "application/x-www-form-urlencoded;charset=gb2312"
               //"content-Type": "application/json; charset=utf-8" 
            },



            success: function(result) {        

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
        title: '加载中',
    });

    //拼接url
    model.url = model.serverHost || "" + model.url;
    model.contentType= model.PostJson || false
      ? "application/json; charset=utf-8"
      : "application/x-www-form-urlencoded;charset=utf-8";

  //GET参数拼接
    if (model.method == "GET" && model.data !== undefined) {

        let Join = "?";
        let Index = 0;

        for (let k in model.data) {

            Join = Index == 0 ? "?" : "&";

            // console.log(model.data);
            // console.log(k);
            // console.log(model.data[k]);
            // console.log(Join);

            if (model.data[k]!=='null' && model.data[k]!=='' && model.data[k].toString() !== '')
            {
                model.url = model.url + Join + k + "=" + model.data[k];
            }

            Index++;

        }

        model.data = '';
        //console.log(model);
    }


    //返回Promise对象
    return new Promise(

        function (resolve) {

            wx.request({
                method: model.method,
                url: model.url,
                data: model.data,
                header: {
                    'content-type': model.contentType,
                    //'content-type': "application/x-www-form-urlencoded;charset=gb2312",
                    'Accept': 'application/json;charset=utf-8'

                },

                success: (res) => {
                    wx.hideLoading();
                    if (res.statusCode == 200) {

                        resolve(res.data);

                    } else {

                        //错误信息处理
                        wx.showModal({
                            title: '提示',
                            content: '服务器错误，请联系客服',
                            showCancel: false,
                        })

                    }
                }
            })

        })
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
