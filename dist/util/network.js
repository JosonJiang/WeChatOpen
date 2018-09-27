"use strict";

function request(url, params, success, fail) {

    this.requestLoading(url, params, "", success, fail);
}

function requestLoading(url, params, message, _success, _fail) {

    console.log(params);

    wx.showNavigationBarLoading();

    if (message != "") {

        wx.showLoading({
            title: message
        });
    }

    wx.request({

        url: url,
        data: params,
        header: {
            'content-Type': 'application/json'
            //'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        //method: 'GET',
        success: function success(res) {
            //console.log(res.data)
            wx.hideNavigationBarLoading();
            if (message != "") {
                wx.hideLoading();
            }
            if (res.statusCode == 200) {
                _success(res.data);
            } else {
                _fail();
            }
        },

        fail: function fail(res) {
            wx.hideNavigationBarLoading();
            if (message != "") {
                wx.hideLoading();
            }
            _fail();
        },
        complete: function complete(res) {}
    });
}

module.exports = {

    request: request,
    requestLoading: requestLoading

};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ldHdvcmsuanMiXSwibmFtZXMiOlsicmVxdWVzdCIsInVybCIsInBhcmFtcyIsInN1Y2Nlc3MiLCJmYWlsIiwicmVxdWVzdExvYWRpbmciLCJtZXNzYWdlIiwiY29uc29sZSIsImxvZyIsInd4Iiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImRhdGEiLCJoZWFkZXIiLCJtZXRob2QiLCJyZXMiLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJoaWRlTG9hZGluZyIsInN0YXR1c0NvZGUiLCJjb21wbGV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBU0EsT0FBVCxDQUFpQkMsR0FBakIsRUFBc0JDLE1BQXRCLEVBQThCQyxPQUE5QixFQUF1Q0MsSUFBdkMsRUFBNkM7O0FBRXpDLFNBQUtDLGNBQUwsQ0FBb0JKLEdBQXBCLEVBQXlCQyxNQUF6QixFQUFpQyxFQUFqQyxFQUFxQ0MsT0FBckMsRUFBOENDLElBQTlDO0FBQ0g7O0FBRUQsU0FBU0MsY0FBVCxDQUF3QkosR0FBeEIsRUFBNkJDLE1BQTdCLEVBQXFDSSxPQUFyQyxFQUE4Q0gsUUFBOUMsRUFBdURDLEtBQXZELEVBQTZEOztBQUV6REcsWUFBUUMsR0FBUixDQUFZTixNQUFaOztBQUVBTyxPQUFHQyx3QkFBSDs7QUFFQSxRQUFJSixXQUFXLEVBQWYsRUFBbUI7O0FBRWZHLFdBQUdFLFdBQUgsQ0FBZTtBQUNYQyxtQkFBT047QUFESSxTQUFmO0FBSUg7O0FBRURHLE9BQUdULE9BQUgsQ0FBVzs7QUFFUEMsYUFBS0EsR0FGRTtBQUdQWSxjQUFNWCxNQUhDO0FBSVBZLGdCQUFRO0FBQ0osNEJBQWdCO0FBQ2hCO0FBRkksU0FKRDtBQVFQQyxnQkFBUSxNQVJEO0FBU1A7QUFDQVosaUJBQVMsaUJBQVNhLEdBQVQsRUFBYztBQUNuQjtBQUNBUCxlQUFHUSx3QkFBSDtBQUNBLGdCQUFJWCxXQUFXLEVBQWYsRUFBbUI7QUFDZkcsbUJBQUdTLFdBQUg7QUFDSDtBQUNELGdCQUFJRixJQUFJRyxVQUFKLElBQWtCLEdBQXRCLEVBQTJCO0FBQ3ZCaEIseUJBQVFhLElBQUlILElBQVo7QUFDSCxhQUZELE1BRU87QUFDSFQ7QUFDSDtBQUNKLFNBckJNOztBQXVCUEEsY0FBTSxjQUFTWSxHQUFULEVBQWM7QUFDaEJQLGVBQUdRLHdCQUFIO0FBQ0EsZ0JBQUlYLFdBQVcsRUFBZixFQUFtQjtBQUNmRyxtQkFBR1MsV0FBSDtBQUNIO0FBQ0RkO0FBQ0gsU0E3Qk07QUE4QlBnQixrQkFBVSxrQkFBU0osR0FBVCxFQUFjLENBRXZCO0FBaENNLEtBQVg7QUFrQ0g7O0FBRURLLE9BQU9DLE9BQVAsR0FBaUI7O0FBRWJ0QixhQUFTQSxPQUZJO0FBR2JLLG9CQUFnQkE7O0FBSEgsQ0FBakIiLCJmaWxlIjoibmV0d29yay5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHJlcXVlc3QodXJsLCBwYXJhbXMsIHN1Y2Nlc3MsIGZhaWwpIHtcblxuICAgIHRoaXMucmVxdWVzdExvYWRpbmcodXJsLCBwYXJhbXMsIFwiXCIsIHN1Y2Nlc3MsIGZhaWwpXG59XG5cbmZ1bmN0aW9uIHJlcXVlc3RMb2FkaW5nKHVybCwgcGFyYW1zLCBtZXNzYWdlLCBzdWNjZXNzLCBmYWlsKSB7XG5cbiAgICBjb25zb2xlLmxvZyhwYXJhbXMpXG5cbiAgICB3eC5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuXG4gICAgaWYgKG1lc3NhZ2UgIT0gXCJcIikge1xuXG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgIHRpdGxlOiBtZXNzYWdlLFxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgd3gucmVxdWVzdCh7XG5cbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIGRhdGE6IHBhcmFtcyxcbiAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAnY29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAvLydjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgLy9tZXRob2Q6ICdHRVQnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzLmRhdGEpXG4gICAgICAgICAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKVxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcy5kYXRhKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmYWlsKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBmYWlsOiBmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgIHd4LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpXG4gICAgICAgICAgICBpZiAobWVzc2FnZSAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmFpbCgpXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZXMpIHtcblxuICAgICAgICB9LFxuICAgIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICByZXF1ZXN0TG9hZGluZzogcmVxdWVzdExvYWRpbmcsXG5cbn07Il19