'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = getApp();
var network = require('../../util/network.js');
var $ = require('../../util/ajax.js');

exports.default = Page({

  data: {
    '__code__': {
      readme: ''
    },

    YearLeave: {},
    userInfo: {},
    focus: false,
    inputValue: '',
    PostURL: app.globalData.OauthHost + "/WebService.asmx/YearLeaveSelect",
    GetURL: app.globalData.OauthHost + "/WebService.asmx/YearLeaveSelect",
    PerformanceURL: app.globalData.OauthHost + "/WebService.asmx/PerformanceSelectByEmpID",
    AttendanceURL: app.globalData.OauthHost + "/WebService.asmx/AttendanceResult",
    Postdata: { EmpID: "SDT12872", sEmpID: "SDT12872", m: "0", FromDate: " ", ToDate: " " }

  },

  methods: {},
  AjaxPost: function AjaxPost(options) {

    var that = this;

    console.log(options);

    $.ajax({
      method: 'GET',
      url: options.AttendanceURL,
      data: options.Postdata

    }).then(function (response) {

      console.log(response);

      that.setData({
        Attendance: response[0]
      });
    });

    $.ajax({
      method: 'GET',
      url: options.GetURL,
      data: options.Postdata

    }).then(function (response) {

      //console.log(response);

      that.setData({
        YearLeave: response[0],
        //userInfo:{EmpID:response[0].EmpID},
        Postdata: { sEmpID: response[0].EmpID }
      });

      $.ajax({
        method: 'GET',
        url: options.PerformanceURL,
        data: options.Postdata

      }).then(function (Performance) {

        console.log(Performance);

        that.setData({
          userInfo: {
            EmpID: Performance[0].EmpID,
            EmpName: Performance[0].EmpName
          },
          Performance: Performance[1]
        });
      });

      console.log(that.data);
      //app.globalData.userInfo = options.userInfo;
    });
  },
  onShow: function onShow(options) {
    var _setData;

    this.setData((_setData = {}, _defineProperty(_setData, "Postdata.EmpID", "SDT12872"), _defineProperty(_setData, "Postdata.sEmpID", "SDT12872"), _defineProperty(_setData, "Postdata.m", "0"), _defineProperty(_setData, "Postdata.FromDate", " "), _defineProperty(_setData, "Postdata.ToDate", " "), _setData));
  },
  onLoad: function onLoad(option) {

    var that = this;
    var Josonoptions = that.data;

    that.AjaxPost(Josonoptions);
  },
  onClick: function onClick(event) {

    wx.navigateTo({
      url: '../UserInfo/index'
    });
  },
  onMytasks: function onMytasks(event) {

    //      wx.redirectTo({
    //        url: '../Mytasks/index'
    //      });

    wx.navigateTo({
      url: '../MyTasks/index'
    });
  },
  onTaskTrace: function onTaskTrace(event) {
    wx.navigateTo({
      url: '../TaskTrace/index'
    });
  },
  onMyRequest: function onMyRequest(event) {
    wx.navigateTo({
      url: '../MyRequest/index'
    });
  },
  onMyProcessed: function onMyProcessed(event) {
    wx.navigateTo({
      url: '../MyProcessed/index'
    });
  },
  onMyAllAccessable: function onMyAllAccessable(event) {
    wx.navigateTo({
      url: '../MyAllAccessable/index'
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJhcHAiLCJnZXRBcHAiLCJuZXR3b3JrIiwicmVxdWlyZSIsIiQiLCJkYXRhIiwiWWVhckxlYXZlIiwidXNlckluZm8iLCJmb2N1cyIsImlucHV0VmFsdWUiLCJQb3N0VVJMIiwiZ2xvYmFsRGF0YSIsIk9hdXRoSG9zdCIsIkdldFVSTCIsIlBlcmZvcm1hbmNlVVJMIiwiQXR0ZW5kYW5jZVVSTCIsIlBvc3RkYXRhIiwiRW1wSUQiLCJzRW1wSUQiLCJtIiwiRnJvbURhdGUiLCJUb0RhdGUiLCJtZXRob2RzIiwiQWpheFBvc3QiLCJvcHRpb25zIiwidGhhdCIsImNvbnNvbGUiLCJsb2ciLCJhamF4IiwibWV0aG9kIiwidXJsIiwidGhlbiIsInJlc3BvbnNlIiwic2V0RGF0YSIsIkF0dGVuZGFuY2UiLCJQZXJmb3JtYW5jZSIsIkVtcE5hbWUiLCJvblNob3ciLCJvbkxvYWQiLCJvcHRpb24iLCJKb3Nvbm9wdGlvbnMiLCJvbkNsaWNrIiwiZXZlbnQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJvbk15dGFza3MiLCJvblRhc2tUcmFjZSIsIm9uTXlSZXF1ZXN0Iiwib25NeVByb2Nlc3NlZCIsIm9uTXlBbGxBY2Nlc3NhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUlBLE1BQU1DLFFBQVY7QUFDRSxJQUFJQyxVQUFVQyxRQUFRLHVCQUFSLENBQWQ7QUFDQSxJQUFLQyxJQUFJRCxRQUFRLG9CQUFSLENBQVQ7Ozs7QUFrQkVFLFFBQU07QUFBQTtBQUFBO0FBQUE7O0FBQ0pDLGVBQVUsRUFETjtBQUVKQyxjQUFVLEVBRk47QUFHSkMsV0FBTyxLQUhIO0FBSUpDLGdCQUFZLEVBSlI7QUFLSkMsYUFBUVYsSUFBSVcsVUFBSixDQUFlQyxTQUFmLEdBQTBCLGtDQUw5QjtBQU1KQyxZQUFPYixJQUFJVyxVQUFKLENBQWVDLFNBQWYsR0FBMEIsa0NBTjdCO0FBT0pFLG9CQUFlZCxJQUFJVyxVQUFKLENBQWVDLFNBQWYsR0FBMEIs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O0FBRE8sS0FBZDtBQUdEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBnZXRBcHAoKTtcbiAgdmFyIG5ldHdvcmsgPSByZXF1aXJlKCcuLi8uLi91dGlsL25ldHdvcmsuanMnKTtcbiAgdmFyICAkID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9hamF4LmpzJyk7XG5cbiAgZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgY29uZmlnOiB7XG5cbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTmoaPmoYgnLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnLFxuICAgICAgICAnd3hjLWxhYmVsJzogJ0BtaW51aS93eGMtbGFiZWwnLFxuICAgICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJyxcbiAgICAgICAgJ3d4Yy1wYW5lbCc6ICdAbWludWkvd3hjLXBhbmVsJyxcbiAgICAgICAgJ3d4Yy1pbnB1dCc6ICdAbWludWkvd3hjLWlucHV0JyxcbiAgICAgICAgJ3d4Yy1wcmljZSc6ICdAbWludWkvd3hjLXByaWNlJyxcbiAgICAgICAgJ3d4Yy1hdmF0YXInOiAnQG1pbnVpL3d4Yy1hdmF0YXInXG4gICAgICB9XG4gICAgfSxcblxuICAgIGRhdGE6IHtcbiAgICAgIFllYXJMZWF2ZTp7fSxcbiAgICAgIHVzZXJJbmZvOiB7fSxcbiAgICAgIGZvY3VzOiBmYWxzZSxcbiAgICAgIGlucHV0VmFsdWU6ICcnLFxuICAgICAgUG9zdFVSTDphcHAuZ2xvYmFsRGF0YS5PYXV0aEhvc3QgK1wiL1dlYlNlcnZpY2UuYXNteC9ZZWFyTGVhdmVTZWxlY3RcIixcbiAgICAgIEdldFVSTDphcHAuZ2xvYmFsRGF0YS5PYXV0aEhvc3QgK1wiL1dlYlNlcnZpY2UuYXNteC9ZZWFyTGVhdmVTZWxlY3RcIixcbiAgICAgIFBlcmZvcm1hbmNlVVJMOmFwcC5nbG9iYWxEYXRhLk9hdXRoSG9zdCArXCIvV2ViU2VydmljZS5hc214L1BlcmZvcm1hbmNlU2VsZWN0QnlFbXBJRFwiLFxuICAgICAgQXR0ZW5kYW5jZVVSTDphcHAuZ2xvYmFsRGF0YS5PYXV0aEhvc3QgK1wiL1dlYlNlcnZpY2UuYXNteC9BdHRlbmRhbmNlUmVzdWx0XCIsXG4gICAgICBQb3N0ZGF0YSA6IHtFbXBJRDpcIlNEVDEyODcyXCIsc0VtcElEOlwiU0RUMTI4NzJcIixtOlwiMFwiLEZyb21EYXRlOlwiIFwiLFRvRGF0ZTpcIiBcIiB9LFxuXG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgIH0sXG4gICAgQWpheFBvc3QgOiBmdW5jdGlvbihvcHRpb25zKXtcblxuICAgICAgbGV0IHRoYXQ9dGhpcztcblxuICAgICAgY29uc29sZS5sb2cob3B0aW9ucyk7XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5BdHRlbmRhbmNlVVJMLFxuICAgICAgICBkYXRhOiBvcHRpb25zLlBvc3RkYXRhLFxuXG4gICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcblxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICBBdHRlbmRhbmNlOiByZXNwb25zZVswXVxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cblxuXG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMuR2V0VVJMLFxuICAgICAgICBkYXRhOiBvcHRpb25zLlBvc3RkYXRhLFxuXG4gICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIFllYXJMZWF2ZTogcmVzcG9uc2VbMF0sXG4gICAgICAgICAgLy91c2VySW5mbzp7RW1wSUQ6cmVzcG9uc2VbMF0uRW1wSUR9LFxuICAgICAgICAgIFBvc3RkYXRhIDp7c0VtcElEOnJlc3BvbnNlWzBdLkVtcElEfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMuUGVyZm9ybWFuY2VVUkwsXG4gICAgICAgICAgICBkYXRhOiBvcHRpb25zLlBvc3RkYXRhLFxuXG4gICAgICAgICAgfSkudGhlbihQZXJmb3JtYW5jZSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBlcmZvcm1hbmNlKTtcblxuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgdXNlckluZm86e1xuICAgICAgICAgICAgICAgIEVtcElEOlBlcmZvcm1hbmNlWzBdLkVtcElELFxuICAgICAgICAgICAgICAgIEVtcE5hbWU6UGVyZm9ybWFuY2VbMF0uRW1wTmFtZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBQZXJmb3JtYW5jZTogUGVyZm9ybWFuY2VbMV1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQuZGF0YSk7XG4gICAgICAgICAvL2FwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gb3B0aW9ucy51c2VySW5mbztcblxuICAgICAgfSlcblxuICAgIH0sXG4gICAgb25TaG93IChvcHRpb25zKSB7XG5cblxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgW1wiUG9zdGRhdGEuRW1wSURcIl06XCJTRFQxMjg3MlwiLFxuICAgICAgICBbXCJQb3N0ZGF0YS5zRW1wSURcIl06XCJTRFQxMjg3MlwiLFxuICAgICAgICBbXCJQb3N0ZGF0YS5tXCJdOlwiMFwiLFxuICAgICAgICBbXCJQb3N0ZGF0YS5Gcm9tRGF0ZVwiXTpcIiBcIixcbiAgICAgICAgW1wiUG9zdGRhdGEuVG9EYXRlXCJdOlwiIFwiXG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBvbkxvYWQob3B0aW9uKXtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIEpvc29ub3B0aW9ucyA9IHRoYXQuZGF0YTtcblxuICAgICAgdGhhdC5BamF4UG9zdChKb3Nvbm9wdGlvbnMpO1xuICAgIH0sXG5cbiAgICBvbkNsaWNrKGV2ZW50KSB7XG5cbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuLi9Vc2VySW5mby9pbmRleCdcbiAgICAgIH0pO1xuXG4gICAgfSxcbiAgICBvbk15dGFza3MoZXZlbnQpIHtcblxuLy8gICAgICB3eC5yZWRpcmVjdFRvKHtcbi8vICAgICAgICB1cmw6ICcuLi9NeXRhc2tzL2luZGV4J1xuLy8gICAgICB9KTtcblxuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4uL015VGFza3MvaW5kZXgnXG4gICAgICB9KTtcblxuICAgIH0sXG4gICAgb25UYXNrVHJhY2UoZXZlbnQpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuLi9UYXNrVHJhY2UvaW5kZXgnXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uTXlSZXF1ZXN0KGV2ZW50KSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi4vTXlSZXF1ZXN0L2luZGV4J1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbk15UHJvY2Vzc2VkKGV2ZW50KSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi4vTXlQcm9jZXNzZWQvaW5kZXgnXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uTXlBbGxBY2Nlc3NhYmxlKGV2ZW50KSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi4vTXlBbGxBY2Nlc3NhYmxlL2luZGV4J1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0iXX0=