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
    mSkyworthURL: app.globalData.mSkyworthHost + "api/Union",
    PostURL: app.globalData.OauthHost + "/WebService.asmx/YearLeaveSelect",
    GetURL: app.globalData.OauthHost + "/WebService.asmx/YearLeaveSelect",
    PerformanceURL: app.globalData.OauthHost + "/WebService.asmx/PerformanceSelectByEmpID",
    AttendanceURL: app.globalData.OauthHost + "/WebService.asmx/AttendanceResult",
    Postdata: { UnionID: "", OpenID: "" }

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
    });
  },

  onShow: function onShow() {},
  onLoad: function onLoad(option) {
    var _that$setData;

    var that = this;

    //console.log(option);

    var UnionID = option.UnionID === "null" ? "" : option.UnionID;
    var OpenID = option.OpenID === "null" ? "" : option.OpenID;

    that.setData((_that$setData = {}, _defineProperty(_that$setData, "Postdata.UnionID", UnionID || "ovDumuEppRjgVoZIA36ZwFQ_8GBc"), _defineProperty(_that$setData, "Postdata.OpenID", OpenID || "oTkndw9-3WNKWSn8lSgTHiSQi_VA"), _that$setData));

    //console.log(that.data);

    $.ajax({
      method: 'GET',
      url: that.data.mSkyworthURL,
      data: that.data.Postdata

    }).then(function (ResponseX) {
      var _that$setData2;

      console.log(ResponseX);

      var EmpID = ResponseX.EmpID;

      that.setData((_that$setData2 = {}, _defineProperty(_that$setData2, "Postdata.EmpID", EmpID), _defineProperty(_that$setData2, "Postdata.sEmpID", EmpID), _defineProperty(_that$setData2, "Postdata.m", "0"), _defineProperty(_that$setData2, "Postdata.FromDate", " "), _defineProperty(_that$setData2, "Postdata.ToDate", " "), _that$setData2));

      app.globalData.EmpID = EmpID;
      app.globalData.sEmpID = EmpID;

      //console.info(that.data);

      that.AjaxPost(that.data);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJhcHAiLCJnZXRBcHAiLCJuZXR3b3JrIiwicmVxdWlyZSIsIiQiLCJkYXRhIiwiWWVhckxlYXZlIiwidXNlckluZm8iLCJmb2N1cyIsImlucHV0VmFsdWUiLCJtU2t5d29ydGhVUkwiLCJnbG9iYWxEYXRhIiwibVNreXdvcnRoSG9zdCIsIlBvc3RVUkwiLCJPYXV0aEhvc3QiLCJHZXRVUkwiLCJQZXJmb3JtYW5jZVVSTCIsIkF0dGVuZGFuY2VVUkwiLCJQb3N0ZGF0YSIsIlVuaW9uSUQiLCJPcGVuSUQiLCJtZXRob2RzIiwiQWpheFBvc3QiLCJvcHRpb25zIiwidGhhdCIsImNvbnNvbGUiLCJsb2ciLCJhamF4IiwibWV0aG9kIiwidXJsIiwidGhlbiIsInJlc3BvbnNlIiwic2V0RGF0YSIsIkF0dGVuZGFuY2UiLCJzRW1wSUQiLCJFbXBJRCIsIlBlcmZvcm1hbmNlIiwiRW1wTmFtZSIsIm9uU2hvdyIsIm9uTG9hZCIsIm9wdGlvbiIsIlJlc3BvbnNlWCIsIm9uQ2xpY2siLCJldmVudCIsInd4IiwibmF2aWdhdGVUbyIsIm9uTXl0YXNrcyIsIm9uVGFza1RyYWNlIiwib25NeVJlcXVlc3QiLCJvbk15UHJvY2Vzc2VkIiwib25NeUFsbEFjY2Vzc2FibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTUMsUUFBVjtBQUNFLElBQUlDLFVBQVVDLFFBQVEsdUJBQVIsQ0FBZDtBQUNBLElBQUtDLElBQUlELFFBQVEsb0JBQVIsQ0FBVDs7OztBQWtCRUUsUUFBTTtBQUFBO0FBQUE7QUFBQTs7O0FBRUpDLGVBQVUsRUFGTjtBQUdKQyxjQUFVLEVBSE47QUFJSkMsV0FBTyxLQUpIO0FBS0pDLGdCQUFZLEVBTFI7QUFNSkMsa0JBQWFWLElBQUlXLFVBQUosQ0FBZUMsYUFBZixHQUE4QixXQU52QztBQU9KQyxhQUFRYixJQUFJVyxVQUFKLENBQWVHLFNBQWYsR0FBMEIsa0NBUDlCO0FBUUpDLFlBQU9mLElBQUlXLFVBQUosQ0FBZUcsU0FBZixHQUEwQixrQ0FSN0I7QUFTSkUsb0JBQWVoQixJQUFJVyxVQUFKLENBQWVHLFNBQWYsR0FBMEIsMkNBVHJDO0FBVUpHLG1CQUFjakIsSUFBSVcsVUFBSixDQUFlRyxTQUFmLEdBQTBCLG1DQVZwQztBQVdKSSxjQUFXLEVBQUNDLFNBQVEsRUFBVCxFQUFZQyxRQUFPLEVBQW5COztBQVhQLEc7O0FBZU5DLFdBQVMsRTtBQUdUQyxZQUFXLGtCQUFTQyxPQUFULEVBQWlCOztBQUUxQixRQUFJQyxPQUFLLElBQVQ7O0FBRUFDLFlBQVFDLEdBQVIsQ0FBWUgsT0FBWjs7QUFFQW5CLE1BQUV1QixJQUFGLENBQU87QUFDTEMsY0FBUSxLQURIO0FBRUxDLFdBQUtOLFFBQVFOLGFBRlI7QUFHTFosWUFBTWtCLFFBQVFMOztBQUhULEtBQVAsRUFLR1ksSUFMSCxDQUtRLG9CQUFZOztBQUVsQkwsY0FBUUMsR0FBUixDQUFZSyxRQUFaOztBQUVBUCxXQUFLUSxPQUFMLENBQWE7QUFDWEMsb0JBQVlGLFNBQVMsQ0FBVDtBQURELE9BQWI7QUFJRCxLQWJEOztBQWdCQTNCLE1BQUV1QixJQUFGLENBQU87QUFDTEMsY0FBUSxLQURIO0FBRUxDLFdBQUtOLFFBQVFSLE1BRlI7QUFHTFYsWUFBTWtCLFFBQVFMOztBQUhULEtBQVAsRUFLR1ksSUFMSCxDQUtRLG9CQUFZOztBQUVsQjs7QUFFQU4sV0FBS1EsT0FBTCxDQUFhO0FBQ1gxQixtQkFBV3lCLFNBQVMsQ0FBVCxDQURBO0FBRVg7QUFDQWIsa0JBQVUsRUFBQ2dCLFFBQU9ILFNBQVMsQ0FBVCxFQUFZSSxLQUFwQjtBQUhDLE9BQWI7O0FBTUUvQixRQUFFdUIsSUFBRixDQUFPO0FBQ0xDLGdCQUFRLEtBREg7QUFFTEMsYUFBS04sUUFBUVAsY0FGUjtBQUdMWCxjQUFNa0IsUUFBUUw7O0FBSFQsT0FBUCxFQUtHWSxJQUxILENBS1EsdUJBQWU7O0FBRXJCTCxnQkFBUUMsR0FBUixDQUFZVSxXQUFaOztBQUVBWixhQUFLUSxPQUFMLENBQWE7QUFDWHpCLG9CQUFTO0FBQ1A0QixtQkFBTUMsWUFBWSxDQUFaLEVBQWVELEtBRGQ7QUFFUEUscUJBQVFELFlBQVksQ0FBWixFQUFlQztBQUZoQixXQURFO0FBS1hELHVCQUFhQSxZQUFZLENBQVo7QUFMRixTQUFiO0FBUUQsT0FqQkQ7O0FBbUJEWCxjQUFRQyxHQUFSLENBQVlGLEtBQUtuQixJQUFqQjtBQUVGLEtBcENEO0FBc0NELEc7O0FBRURpQyxRLG9CQUFVLENBR1QsQztBQUVEQyxRLGtCQUFPQyxNLEVBQU87QUFBQTs7QUFFWixRQUFJaEIsT0FBTyxJQUFYOztBQUVBOztBQUVBLFFBQUlMLFVBQVNxQixPQUFPckIsT0FBUCxLQUFtQixNQUFuQixHQUE0QixFQUE1QixHQUFpQ3FCLE9BQU9yQixPQUFyRDtBQUNBLFFBQUlDLFNBQVFvQixPQUFPcEIsTUFBUCxLQUFrQixNQUFsQixHQUEyQixFQUEzQixHQUFpQ29CLE9BQU9wQixNQUFwRDs7QUFFQUksU0FBS1EsT0FBTCxxREFDRyxrQkFESCxFQUN3QmIsV0FBVyw4QkFEbkMsa0NBRUcsaUJBRkgsRUFFd0JDLFVBQVcsOEJBRm5DOztBQUtBOztBQUVBaEIsTUFBRXVCLElBQUYsQ0FBTztBQUNMQyxjQUFRLEtBREg7QUFFTEMsV0FBS0wsS0FBS25CLElBQUwsQ0FBVUssWUFGVjtBQUdMTCxZQUFLbUIsS0FBS25CLElBQUwsQ0FBVWE7O0FBSFYsS0FBUCxFQUtHWSxJQUxILENBS1EscUJBQWE7QUFBQTs7QUFFbkJMLGNBQVFDLEdBQVIsQ0FBWWUsU0FBWjs7QUFFQSxVQUFJTixRQUFNTSxVQUFVTixLQUFwQjs7QUFFQVgsV0FBS1EsT0FBTCx1REFDRyxnQkFESCxFQUNzQkcsS0FEdEIsbUNBRUcsaUJBRkgsRUFFc0JBLEtBRnRCLG1DQUdHLFlBSEgsRUFHaUIsR0FIakIsbUNBSUcsbUJBSkgsRUFJd0IsR0FKeEIsbUNBS0csaUJBTEgsRUFLc0IsR0FMdEI7O0FBUUFuQyxVQUFJVyxVQUFKLENBQWV3QixLQUFmLEdBQXdCQSxLQUF4QjtBQUNBbkMsVUFBSVcsVUFBSixDQUFldUIsTUFBZixHQUF5QkMsS0FBekI7O0FBRUE7O0FBRUFYLFdBQUtGLFFBQUwsQ0FBY0UsS0FBS25CLElBQW5CO0FBRUgsS0ExQkM7QUE0QkQsRztBQUVEcUMsUyxtQkFBUUMsSyxFQUFPOztBQUViQyxPQUFHQyxVQUFILENBQWM7QUFDWmhCLFdBQUs7QUFETyxLQUFkO0FBSUQsRztBQUNEaUIsVyxxQkFBVUgsSyxFQUFPOztBQUVyQjtBQUNBO0FBQ0E7O0FBRU1DLE9BQUdDLFVBQUgsQ0FBYztBQUNaaEIsV0FBSztBQURPLEtBQWQ7QUFJRCxHO0FBQ0RrQixhLHVCQUFZSixLLEVBQU87QUFDakJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaaEIsV0FBSztBQURPLEtBQWQ7QUFHRCxHO0FBQ0RtQixhLHVCQUFZTCxLLEVBQU87QUFDakJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaaEIsV0FBSztBQURPLEtBQWQ7QUFHRCxHO0FBQ0RvQixlLHlCQUFjTixLLEVBQU87QUFDbkJDLE9BQUdDLFVBQUgsQ0FBYztBQUNaaEIsV0FBSztBQURPLEtBQWQ7QUFHRCxHO0FBQ0RxQixtQiw2QkFBa0JQLEssRUFBTztBQUN2QkMsT0FBR0MsVUFBSCxDQUFjO0FBQ1poQixXQUFLO0FBRE8sS0FBZDtBQUdEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBnZXRBcHAoKTtcbiAgdmFyIG5ldHdvcmsgPSByZXF1aXJlKCcuLi8uLi91dGlsL25ldHdvcmsuanMnKTtcbiAgdmFyICAkID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9hamF4LmpzJyk7XG5cbiAgZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgY29uZmlnOiB7XG5cbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTmoaPmoYgnLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtZmxleCc6ICdAbWludWkvd3hjLWZsZXgnLFxuICAgICAgICAnd3hjLWxhYmVsJzogJ0BtaW51aS93eGMtbGFiZWwnLFxuICAgICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJyxcbiAgICAgICAgJ3d4Yy1wYW5lbCc6ICdAbWludWkvd3hjLXBhbmVsJyxcbiAgICAgICAgJ3d4Yy1pbnB1dCc6ICdAbWludWkvd3hjLWlucHV0JyxcbiAgICAgICAgJ3d4Yy1wcmljZSc6ICdAbWludWkvd3hjLXByaWNlJyxcbiAgICAgICAgJ3d4Yy1hdmF0YXInOiAnQG1pbnVpL3d4Yy1hdmF0YXInXG4gICAgICB9XG4gICAgfSxcblxuICAgIGRhdGE6IHtcblxuICAgICAgWWVhckxlYXZlOnt9LFxuICAgICAgdXNlckluZm86IHt9LFxuICAgICAgZm9jdXM6IGZhbHNlLFxuICAgICAgaW5wdXRWYWx1ZTogJycsXG4gICAgICBtU2t5d29ydGhVUkw6YXBwLmdsb2JhbERhdGEubVNreXdvcnRoSG9zdCArXCJhcGkvVW5pb25cIixcbiAgICAgIFBvc3RVUkw6YXBwLmdsb2JhbERhdGEuT2F1dGhIb3N0ICtcIi9XZWJTZXJ2aWNlLmFzbXgvWWVhckxlYXZlU2VsZWN0XCIsXG4gICAgICBHZXRVUkw6YXBwLmdsb2JhbERhdGEuT2F1dGhIb3N0ICtcIi9XZWJTZXJ2aWNlLmFzbXgvWWVhckxlYXZlU2VsZWN0XCIsXG4gICAgICBQZXJmb3JtYW5jZVVSTDphcHAuZ2xvYmFsRGF0YS5PYXV0aEhvc3QgK1wiL1dlYlNlcnZpY2UuYXNteC9QZXJmb3JtYW5jZVNlbGVjdEJ5RW1wSURcIixcbiAgICAgIEF0dGVuZGFuY2VVUkw6YXBwLmdsb2JhbERhdGEuT2F1dGhIb3N0ICtcIi9XZWJTZXJ2aWNlLmFzbXgvQXR0ZW5kYW5jZVJlc3VsdFwiLFxuICAgICAgUG9zdGRhdGEgOiB7VW5pb25JRDpcIlwiLE9wZW5JRDpcIlwifSxcblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICB9LFxuICAgIEFqYXhQb3N0IDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cbiAgICAgIGxldCB0aGF0PXRoaXM7XG5cbiAgICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xuXG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMuQXR0ZW5kYW5jZVVSTCxcbiAgICAgICAgZGF0YTogb3B0aW9ucy5Qb3N0ZGF0YSxcblxuICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG5cbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgQXR0ZW5kYW5jZTogcmVzcG9uc2VbMF1cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5HZXRVUkwsXG4gICAgICAgIGRhdGE6IG9wdGlvbnMuUG9zdGRhdGEsXG5cbiAgICAgIH0pLnRoZW4ocmVzcG9uc2UgPT4ge1xuXG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgWWVhckxlYXZlOiByZXNwb25zZVswXSxcbiAgICAgICAgICAvL3VzZXJJbmZvOntFbXBJRDpyZXNwb25zZVswXS5FbXBJRH0sXG4gICAgICAgICAgUG9zdGRhdGEgOntzRW1wSUQ6cmVzcG9uc2VbMF0uRW1wSUR9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMuUGVyZm9ybWFuY2VVUkwsXG4gICAgICAgICAgICBkYXRhOiBvcHRpb25zLlBvc3RkYXRhLFxuXG4gICAgICAgICAgfSkudGhlbihQZXJmb3JtYW5jZSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFBlcmZvcm1hbmNlKTtcblxuICAgICAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgdXNlckluZm86e1xuICAgICAgICAgICAgICAgIEVtcElEOlBlcmZvcm1hbmNlWzBdLkVtcElELFxuICAgICAgICAgICAgICAgIEVtcE5hbWU6UGVyZm9ybWFuY2VbMF0uRW1wTmFtZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBQZXJmb3JtYW5jZTogUGVyZm9ybWFuY2VbMV1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQuZGF0YSk7XG5cbiAgICAgIH0pXG5cbiAgICB9LFxuXG4gICAgb25TaG93ICgpIHtcblxuXG4gICAgfSxcblxuICAgIG9uTG9hZChvcHRpb24pe1xuXG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICAgIC8vY29uc29sZS5sb2cob3B0aW9uKTtcblxuICAgICAgbGV0IFVuaW9uSUQ9IG9wdGlvbi5VbmlvbklEID09PSBcIm51bGxcIiA/IFwiXCIgOiBvcHRpb24uVW5pb25JRDtcbiAgICAgIGxldCBPcGVuSUQ9IG9wdGlvbi5PcGVuSUQgPT09IFwibnVsbFwiID8gXCJcIiA6ICBvcHRpb24uT3BlbklEO1xuXG4gICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICBbXCJQb3N0ZGF0YS5VbmlvbklEXCJdOiBVbmlvbklEIHx8IFwib3ZEdW11RXBwUmpnVm9aSUEzNlp3RlFfOEdCY1wiLFxuICAgICAgICBbXCJQb3N0ZGF0YS5PcGVuSURcIl06ICBPcGVuSUQgIHx8IFwib1RrbmR3OS0zV05LV1NuOGxTZ1RIaVNRaV9WQVwiXG4gICAgICB9KTtcblxuICAgICAgLy9jb25zb2xlLmxvZyh0aGF0LmRhdGEpO1xuXG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IHRoYXQuZGF0YS5tU2t5d29ydGhVUkwsXG4gICAgICAgIGRhdGE6dGhhdC5kYXRhLlBvc3RkYXRhLFxuXG4gICAgICB9KS50aGVuKFJlc3BvbnNlWCA9PiB7XG5cbiAgICAgICAgY29uc29sZS5sb2coUmVzcG9uc2VYKTtcblxuICAgICAgICBsZXQgRW1wSUQ9UmVzcG9uc2VYLkVtcElEO1xuXG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgW1wiUG9zdGRhdGEuRW1wSURcIl06IEVtcElELFxuICAgICAgICAgIFtcIlBvc3RkYXRhLnNFbXBJRFwiXTpFbXBJRCxcbiAgICAgICAgICBbXCJQb3N0ZGF0YS5tXCJdOlwiMFwiLFxuICAgICAgICAgIFtcIlBvc3RkYXRhLkZyb21EYXRlXCJdOlwiIFwiLFxuICAgICAgICAgIFtcIlBvc3RkYXRhLlRvRGF0ZVwiXTpcIiBcIlxuICAgICAgICB9KTtcblxuICAgICAgICBhcHAuZ2xvYmFsRGF0YS5FbXBJRCA9ICBFbXBJRDtcbiAgICAgICAgYXBwLmdsb2JhbERhdGEuc0VtcElEID0gIEVtcElEO1xuXG4gICAgICAgIC8vY29uc29sZS5pbmZvKHRoYXQuZGF0YSk7XG5cbiAgICAgICAgdGhhdC5BamF4UG9zdCh0aGF0LmRhdGEpO1xuXG4gICAgfSk7XG5cbiAgICB9LFxuXG4gICAgb25DbGljayhldmVudCkge1xuXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi4vVXNlckluZm8vaW5kZXgnXG4gICAgICB9KTtcblxuICAgIH0sXG4gICAgb25NeXRhc2tzKGV2ZW50KSB7XG5cbi8vICAgICAgd3gucmVkaXJlY3RUbyh7XG4vLyAgICAgICAgdXJsOiAnLi4vTXl0YXNrcy9pbmRleCdcbi8vICAgICAgfSk7XG5cbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuLi9NeVRhc2tzL2luZGV4J1xuICAgICAgfSk7XG5cbiAgICB9LFxuICAgIG9uVGFza1RyYWNlKGV2ZW50KSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnLi4vVGFza1RyYWNlL2luZGV4J1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbk15UmVxdWVzdChldmVudCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4uL015UmVxdWVzdC9pbmRleCdcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb25NeVByb2Nlc3NlZChldmVudCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4uL015UHJvY2Vzc2VkL2luZGV4J1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbk15QWxsQWNjZXNzYWJsZShldmVudCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy4uL015QWxsQWNjZXNzYWJsZS9pbmRleCdcbiAgICAgIH0pO1xuICAgIH1cblxuICB9Il19