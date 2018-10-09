'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = getApp();
var $ = require('../../util/ajax.js');

exports.default = Page({

  data: {
    '__code__': {
      readme: ''
    },


    PostURL: app.globalData.WebApiHost + "api/WxOpen/GetJsCode2",
    GetURL: app.globalData.WebApiHost + "api/WxOpen/GetJsCode2",
    Postdata: {}

  },
  methods: {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  AjaxPost: function AjaxPost(options) {

    console.log(options);

    var that = this;

    $.ajax({
      method: 'GET',
      url: options.GetURL,
      data: options.Postdata,
      PostJson: true

    }).then(function (response) {

      //console.log(response);

      if (response.success === false) {

        var responseMsg = response.errorMessage;

        //        that.setData({
        //          $toast: {
        //            show: true,
        //            icon:"close",
        //            iconColor:"#fff",
        //            msg : responseMsg
        //          }
        //        });
        //

        setTimeout(function () {

          //          this.setData({
          //            $toast: {
          //              show: false
          //            }
          //          });

          wx.navigateBack();
        }, 1500);
      } else {

        var UnionID = response.unionid;
        var OpenID = response.openid;

        app.globalData.UnionID = UnionID;
        app.globalData.OpenID = OpenID;

        wx.navigateTo({
          url: '../iaywhere/index?OpenID=' + OpenID + '&UnionID=' + UnionID + ''
        });
      }
    });
  },

  login: function login() {
    var that = this;
    wx.login({

      success: function success(res) {
        var _that$setData;

        console.info(res);

        app.globalData.Code = res.code;
        app.globalData.HasLogin = true;

        that.setData((_that$setData = {}, _defineProperty(_that$setData, "Postdata.Code", res.code), _defineProperty(_that$setData, 'HasLogin', true), _defineProperty(_that$setData, 'Code', res.code), _that$setData));

        that.AjaxPost(that.data);
      }
    });
  },

  onReady: function onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {},

  onload: function onload() {

    this.setData({
      HasLogin: app.globalData.HasLogin,
      Code: app.globalData.Code
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage() {},

  onClick: function onClick(event) {

    var that = this;

    //    wx.redirectTo({
    //      url: '../iaywhere/index'
    //    });

    //console.log(that.data);
    //that.AjaxPost(that.data);

  },
  onClick_WhenLogin: function onClick_WhenLogin(event) {
    wx.navigateTo({
      url: '../iaywhere/index'
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJhcHAiLCJnZXRBcHAiLCIkIiwicmVxdWlyZSIsImRhdGEiLCJQb3N0VVJMIiwiZ2xvYmFsRGF0YSIsIldlYkFwaUhvc3QiLCJHZXRVUkwiLCJQb3N0ZGF0YSIsIm1ldGhvZHMiLCJBamF4UG9zdCIsIm9wdGlvbnMiLCJjb25zb2xlIiwibG9nIiwidGhhdCIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJQb3N0SnNvbiIsInRoZW4iLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJyZXNwb25zZU1zZyIsImVycm9yTWVzc2FnZSIsInNldFRpbWVvdXQiLCJ3eCIsIm5hdmlnYXRlQmFjayIsIlVuaW9uSUQiLCJ1bmlvbmlkIiwiT3BlbklEIiwib3BlbmlkIiwibmF2aWdhdGVUbyIsImxvZ2luIiwicmVzIiwiaW5mbyIsIkNvZGUiLCJjb2RlIiwiSGFzTG9naW4iLCJzZXREYXRhIiwib25SZWFkeSIsIm9uU2hvdyIsIm9ubG9hZCIsIm9uSGlkZSIsIm9uVW5sb2FkIiwib25QdWxsRG93blJlZnJlc2giLCJvblJlYWNoQm90dG9tIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJvbkNsaWNrIiwiZXZlbnQiLCJvbkNsaWNrX1doZW5Mb2dpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFNQyxRQUFWO0FBQ0EsSUFBS0MsSUFBSUMsUUFBUSxvQkFBUixDQUFUOzs7O0FBV0VDLFFBQU07QUFBQTtBQUFBO0FBQUE7OztBQUVKQyxhQUFRTCxJQUFJTSxVQUFKLENBQWVDLFVBQWYsR0FBMkIsdUJBRi9CO0FBR0pDLFlBQU9SLElBQUlNLFVBQUosQ0FBZUMsVUFBZixHQUEyQix1QkFIOUI7QUFJSkUsY0FBVzs7QUFKUCxHO0FBUU5DLFdBQVMsRTtBQUNUOzs7QUFHQUMsWUFBVyxrQkFBU0MsT0FBVCxFQUFpQjs7QUFFMUJDLFlBQVFDLEdBQVIsQ0FBWUYsT0FBWjs7QUFFQSxRQUFJRyxPQUFLLElBQVQ7O0FBRUFiLE1BQUVjLElBQUYsQ0FBTztBQUNMQyxjQUFRLEtBREg7QUFFTEMsV0FBS04sUUFBUUosTUFGUjtBQUdMSixZQUFNUSxRQUFRSCxRQUhUO0FBSUxVLGdCQUFTOztBQUpKLEtBQVAsRUFNR0MsSUFOSCxDQU1RLG9CQUFZOztBQUVsQjs7QUFFQSxVQUFHQyxTQUFTQyxPQUFULEtBQW1CLEtBQXRCLEVBQTRCOztBQUUxQixZQUFJQyxjQUFZRixTQUFTRyxZQUF6Qjs7QUFFUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVFDLG1CQUFXLFlBQU07O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRVVDLGFBQUdDLFlBQUg7QUFFRCxTQVZELEVBVUcsSUFWSDtBQWFELE9BM0JELE1BMkJLOztBQUVILFlBQUlDLFVBQVNQLFNBQVNRLE9BQXRCO0FBQ0EsWUFBSUMsU0FBUVQsU0FBU1UsTUFBckI7O0FBRUEvQixZQUFJTSxVQUFKLENBQWVzQixPQUFmLEdBQXlCQSxPQUF6QjtBQUNBNUIsWUFBSU0sVUFBSixDQUFld0IsTUFBZixHQUF5QkEsTUFBekI7O0FBRUFKLFdBQUdNLFVBQUgsQ0FBYztBQUNaZCxlQUFLLDhCQUE0QlksTUFBNUIsR0FBbUMsV0FBbkMsR0FBK0NGLE9BQS9DLEdBQXVEO0FBRGhELFNBQWQ7QUFJRDtBQUNGLEtBbEREO0FBb0RELEc7O0FBRURLLFNBQU8saUJBQVk7QUFDakIsUUFBSWxCLE9BQU8sSUFBWDtBQUNBVyxPQUFHTyxLQUFILENBQVM7O0FBRVBYLGVBQVMsaUJBQVVZLEdBQVYsRUFBZTtBQUFBOztBQUV0QnJCLGdCQUFRc0IsSUFBUixDQUFhRCxHQUFiOztBQUVBbEMsWUFBSU0sVUFBSixDQUFlOEIsSUFBZixHQUFzQkYsSUFBSUcsSUFBMUI7QUFDQXJDLFlBQUlNLFVBQUosQ0FBZWdDLFFBQWYsR0FBMEIsSUFBMUI7O0FBRUF2QixhQUFLd0IsT0FBTCxxREFDRyxlQURILEVBQ29CTCxJQUFJRyxJQUR4Qiw4Q0FFWSxJQUZaLDBDQUdRSCxJQUFJRyxJQUhaOztBQU1BdEIsYUFBS0osUUFBTCxDQUFjSSxLQUFLWCxJQUFuQjtBQUNEO0FBaEJNLEtBQVQ7QUFrQkQsRzs7QUFFRG9DLFdBQVMsbUJBQVksQ0FFcEIsQzs7QUFFRDs7O0FBR0FDLFVBQVEsa0JBQVksQ0FFbkIsQzs7QUFFREMsVUFBUSxrQkFBWTs7QUFFbEIsU0FBS0gsT0FBTCxDQUFhO0FBQ1hELGdCQUFVdEMsSUFBSU0sVUFBSixDQUFlZ0MsUUFEZDtBQUVYRixZQUFNcEMsSUFBSU0sVUFBSixDQUFlOEI7QUFGVixLQUFiO0FBS0QsRztBQUNEOzs7QUFHQU8sVUFBUSxrQkFBWSxDQUVuQixDOztBQUVEOzs7QUFHQUMsWUFBVSxvQkFBWSxDQUVyQixDOztBQUVEOzs7QUFHQUMscUJBQW1CLDZCQUFZLENBRTlCLEM7O0FBRUQ7OztBQUdBQyxpQkFBZSx5QkFBWSxDQUUxQixDOztBQUVEOzs7QUFHQUMscUJBQW1CLDZCQUFZLENBRTlCLEM7O0FBRURDLFMsbUJBQVFDLEssRUFBTzs7QUFFYixRQUFJbEMsT0FBSyxJQUFUOztBQUVKO0FBQ0E7QUFDQTs7QUFFSTtBQUNBOztBQUdELEc7QUFDRG1DLG1CLDZCQUFrQkQsSyxFQUFPO0FBQ3ZCdkIsT0FBR00sVUFBSCxDQUFjO0FBQ1pkLFdBQUs7QUFETyxLQUFkO0FBSUQiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGFwcCA9IGdldEFwcCgpO1xudmFyICAkID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9hamF4LmpzJyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb25maWc6IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfliJvnu7TmlbDlrZfnp7vliqjlip7lhawnLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgZGF0YToge1xuXG4gICAgUG9zdFVSTDphcHAuZ2xvYmFsRGF0YS5XZWJBcGlIb3N0ICtcImFwaS9XeE9wZW4vR2V0SnNDb2RlMlwiLFxuICAgIEdldFVSTDphcHAuZ2xvYmFsRGF0YS5XZWJBcGlIb3N0ICtcImFwaS9XeE9wZW4vR2V0SnNDb2RlMlwiLFxuICAgIFBvc3RkYXRhIDoge30sXG5cblxuICB9LFxuICBtZXRob2RzOiB7fSxcbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yid5qyh5riy5p+T5a6M5oiQXG4gICAqL1xuICBBamF4UG9zdCA6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXG4gICAgY29uc29sZS5sb2cob3B0aW9ucyk7XG5cbiAgICBsZXQgdGhhdD10aGlzO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICB1cmw6IG9wdGlvbnMuR2V0VVJMLFxuICAgICAgZGF0YTogb3B0aW9ucy5Qb3N0ZGF0YSxcbiAgICAgIFBvc3RKc29uOnRydWUsXG5cbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcblxuICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgIGlmKHJlc3BvbnNlLnN1Y2Nlc3M9PT1mYWxzZSl7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlTXNnPXJlc3BvbnNlLmVycm9yTWVzc2FnZTtcblxuLy8gICAgICAgIHRoYXQuc2V0RGF0YSh7XG4vLyAgICAgICAgICAkdG9hc3Q6IHtcbi8vICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbi8vICAgICAgICAgICAgaWNvbjpcImNsb3NlXCIsXG4vLyAgICAgICAgICAgIGljb25Db2xvcjpcIiNmZmZcIixcbi8vICAgICAgICAgICAgbXNnIDogcmVzcG9uc2VNc2dcbi8vICAgICAgICAgIH1cbi8vICAgICAgICB9KTtcbi8vXG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbi8vICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4vLyAgICAgICAgICAgICR0b2FzdDoge1xuLy8gICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4vLyAgICAgICAgICAgIH1cbi8vICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgd3gubmF2aWdhdGVCYWNrKCk7XG5cbiAgICAgICAgfSwgMTUwMCk7XG5cblxuICAgICAgfWVsc2V7XG5cbiAgICAgICAgbGV0IFVuaW9uSUQ9IHJlc3BvbnNlLnVuaW9uaWQ7XG4gICAgICAgIGxldCBPcGVuSUQ9IHJlc3BvbnNlLm9wZW5pZDtcblxuICAgICAgICBhcHAuZ2xvYmFsRGF0YS5VbmlvbklEID0gVW5pb25JRDtcbiAgICAgICAgYXBwLmdsb2JhbERhdGEuT3BlbklEID0gIE9wZW5JRDtcblxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuLi9pYXl3aGVyZS9pbmRleD9PcGVuSUQ9JytPcGVuSUQrJyZVbmlvbklEPScrVW5pb25JRCsnJ1xuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH0pXG5cbiAgfSxcblxuICBsb2dpbjogZnVuY3Rpb24gKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICB3eC5sb2dpbih7XG5cbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcblxuICAgICAgICBjb25zb2xlLmluZm8ocmVzKTtcblxuICAgICAgICBhcHAuZ2xvYmFsRGF0YS5Db2RlID0gcmVzLmNvZGU7XG4gICAgICAgIGFwcC5nbG9iYWxEYXRhLkhhc0xvZ2luID0gdHJ1ZTtcblxuICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIFtcIlBvc3RkYXRhLkNvZGVcIl06cmVzLmNvZGUsXG4gICAgICAgICAgSGFzTG9naW46IHRydWUsXG4gICAgICAgICAgQ29kZTogcmVzLmNvZGVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhhdC5BamF4UG9zdCh0aGF0LmRhdGEpO1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIG9ubG9hZDogZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIEhhc0xvZ2luOiBhcHAuZ2xvYmFsRGF0YS5IYXNMb2dpbixcbiAgICAgIENvZGU6IGFwcC5nbG9iYWxEYXRhLkNvZGVcbiAgICB9KVxuXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAqL1xuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgb25DbGljayhldmVudCkge1xuXG4gICAgbGV0IHRoYXQ9dGhpcztcblxuLy8gICAgd3gucmVkaXJlY3RUbyh7XG4vLyAgICAgIHVybDogJy4uL2lheXdoZXJlL2luZGV4J1xuLy8gICAgfSk7XG5cbiAgICAvL2NvbnNvbGUubG9nKHRoYXQuZGF0YSk7XG4gICAgLy90aGF0LkFqYXhQb3N0KHRoYXQuZGF0YSk7XG5cblxuICB9LFxuICBvbkNsaWNrX1doZW5Mb2dpbihldmVudCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vaWF5d2hlcmUvaW5kZXgnXG4gICAgfSk7XG5cbiAgfVxufSJdfQ==