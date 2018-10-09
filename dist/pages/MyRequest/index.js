'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pageIndexs = 1;
var PageSizes = 10;
var app = getApp();
var network = require('../../util/network.js');
var $ = require('../../util/ajax.js');

var JOSON = require('../../util/json2.js');

var thisutil = require('../../util/util.js');
thisutil.StartPullDownRefreh(undefined, app);
var Item = [];

exports.default = Page({
  data: {
    check: true,
    loadmore: false,
    LstItem: [],
    PostURL: app.globalData.BPMHost + "/Login.ashx",
    GetURL: app.globalData.BPMHost + "/MyRequests.ashx",
    Postdata: {
      uid: "SDT12872",
      pwd: "Joson080256",
      UserAccount: "SDT12872",
      start: pageIndexs,
      limit: PageSizes,
      isDebug: true,
      isWeixIn: true
    },
    state: [{ text: "全部", value: "All" }, { text: "已完成", value: "Approved" }, { text: "进行中", value: "Running" }, { text: "已拒绝", value: "Rejected" }, { text: "已退回", value: "Aborted" }],
    page: {
      iCount: 0,
      PageIndex: pageIndexs,
      PageSize: PageSizes
    }
  },
  onShow: function onShow(options) {},
  onLoad: function onLoad(option) {

    var that = this;
    var Josonoptions = that.data;
    that.AjaxPost(Josonoptions);
  },

  AjaxPost: function AjaxPost(options) {

    var that = this;

    $.ajax({
      method: 'POST',
      url: options.PostURL,
      data: options.Postdata

    }).then(function (response) {

      //console.log(response);

      $.ajax({
        method: 'GET',
        url: options.GetURL,
        data: options.Postdata

      }).then(function (Performance) {
        var _that$setData;

        var iCounts = Performance.total;
        var PageStart = that.data.page.PageStart;
        var PageEnd = that.data.page.PageEnd;

        console.log(Performance);

        Performance.children.forEach(function (children, index, arrys) {
          Item.push(children);
        });

        //console.log(Item);

        that.setData((_that$setData = {}, _defineProperty(_that$setData, "page.iCount", iCounts), _defineProperty(_that$setData, 'LstItem', Performance.children), _that$setData));
      });

      console.log(that.data);
    });
  },

  onClick: function onClick(e) {

    console.log(e);

    var currentTarget = e.currentTarget.dataset.name;

    var TaskID = currentTarget.tid;
    var StepID = currentTarget.pid;

    //关闭当前页面，跳转到应用内的某个页面
    //      wx.redirectTo({
    //        url: '../TaskInfo/index?TaskID='+TaskID+'&StepID='+StepID+''
    //      });

    //保留当前页面，跳转到应用内的某个页面，使用 wx.navigateBack 可以返回到原页面
    wx.navigateTo({
      url: '../TaskInfo/index?TaskID=' + TaskID + '&StepID=' + StepID + ''
    });
  },
  onPullDownRefresh: function onPullDownRefresh() {

    var CurrentPageIndexs = 1;

    var that = this;
    var iCounts = that.data.page.iCount;
    var PageStarts = that.data.page.PageStart;
    var PageEnds = that.data.page.PageEnd;
    var PageEndloadmore = false;

    if (iCounts > PageStarts) {
      CurrentPageIndexs = pageIndexs <= 1 ? pageIndexs : pageIndexs--;

      //if( pageIndexs > 1)  pageIndexs--;

      var pageIndex = pageIndexs;
      var PageSize = that.data.page.PageSize;
      var PageStart = pageIndex <= 1 ? 1 : pageIndex * PageSize;
      var PageEnd = pageIndex <= 1 ? PageSize : (pageIndex + 1) * PageSize;

      that.setData({

        page: {
          PageSize: PageSize,
          pageIndex: pageIndex,
          PageStart: PageStart,
          PageEnd: PageEnd
        },

        Postdata: {

          uid: "SDT12872",
          pwd: "Joson080256",
          UserAccount: "SDT12872",
          start: PageStart,
          limit: PageSize
        }

      });

      console.log("下拉翻页，翻页到" + pageIndexs + "页");

      //动态设置当前页面的标题。
      wx.setNavigationBarTitle({
        title: '当前' + CurrentPageIndexs + "页的标题"
      });
    } else {

      PageEndloadmore = true;
      console.log("下拉翻页第一页了 这是第" + pageIndexs + "页");
    }

    console.log("刷新 pageIndexs:" + pageIndexs + "页");

    wx.showNavigationBarLoading(); //在当前页面显示导航条加载动画。

    //console.log(that.data);

    that.AjaxPost(that.data);

    console.log("重新加载信息完成");

    //wx.startPullDownRefresh();
    wx.stopPullDownRefresh(function (success) {}, function (fail) {}, function (complete) {}); //停止当前页面下拉刷新。

    wx.hideNavigationBarLoading(); //隐藏导航条加载动画。


    console.log("关闭 停止当前页面下拉刷新");
  },
  onReachBottom: function onReachBottom() {
    var _that$setData2;

    var that = this;
    var PageIndex = pageIndexs; //that.data.page.pageIndex+1;
    var PageSize = PageSizes; // that.data.page.PageSize;
    var PageStart = PageIndex * PageSize;
    var PageEnd = (PageIndex + 1) * PageSize;

    var PageStartX = "page.PageStart";
    var PageEndX = "page.PageEnd";

    that.setData((_that$setData2 = {}, _defineProperty(_that$setData2, "page.PageSize", PageSize), _defineProperty(_that$setData2, "page.PageIndex", PageIndex), _defineProperty(_that$setData2, PageStartX, PageStart), _defineProperty(_that$setData2, PageEndX, PageEnd), _defineProperty(_that$setData2, 'Postdata', {

      uid: "SDT12872",
      pwd: "Joson080256",
      UserAccount: "SDT12872",
      start: PageStart,
      limit: PageSize
    }), _that$setData2));

    //    console.log(PageSize);
    //    console.log(PageIndex);
    //    console.log(PageSizes);
    //    console.log(pageIndexs);


    this.AjaxPost(that.data);

    var iCounts = that.data.page.iCount;
    var PageStarts = that.data.page.PageStart;
    var PageEnds = that.data.page.PageEnd;
    var PageEndloadmore = false;
    var ShowPageIndex = 1;

    if (iCounts > PageStarts && iCounts >= PageEnds) {

      pageIndexs++;
      ShowPageIndex = pageIndexs;

      console.log("页面上拉翻页，翻页到" + pageIndexs + "页");
    } else {

      PageEndloadmore = true;
      ShowPageIndex = pageIndexs + 1;

      console.log("页面上拉翻页测试!最后一页了 这是第" + (pageIndexs + 1) + "页");
    }

    that.setData({ loadmore: PageEndloadmore });

    //动态设置当前页面的标题。
    wx.setNavigationBarTitle({
      title: '当前' + ShowPageIndex + "页的标题"
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJwYWdlSW5kZXhzIiwiUGFnZVNpemVzIiwiYXBwIiwiZ2V0QXBwIiwibmV0d29yayIsInJlcXVpcmUiLCIkIiwiSk9TT04iLCJ0aGlzdXRpbCIsIlN0YXJ0UHVsbERvd25SZWZyZWgiLCJJdGVtIiwiZGF0YSIsImNoZWNrIiwibG9hZG1vcmUiLCJMc3RJdGVtIiwiUG9zdFVSTCIsImdsb2JhbERhdGEiLCJCUE1Ib3N0IiwiR2V0VVJMIiwiUG9zdGRhdGEiLCJ1aWQiLCJwd2QiLCJVc2VyQWNjb3VudCIsInN0YXJ0IiwibGltaXQiLCJpc0RlYnVnIiwiaXNXZWl4SW4iLCJzdGF0ZSIsInRleHQiLCJ2YWx1ZSIsInBhZ2UiLCJpQ291bnQiLCJQYWdlSW5kZXgiLCJQYWdlU2l6ZSIsIm9uU2hvdyIsIm9wdGlvbnMiLCJvbkxvYWQiLCJvcHRpb24iLCJ0aGF0IiwiSm9zb25vcHRpb25zIiwiQWpheFBvc3QiLCJhamF4IiwibWV0aG9kIiwidXJsIiwidGhlbiIsImlDb3VudHMiLCJQZXJmb3JtYW5jZSIsInRvdGFsIiwiUGFnZVN0YXJ0IiwiUGFnZUVuZCIsImNvbnNvbGUiLCJsb2ciLCJjaGlsZHJlbiIsImZvckVhY2giLCJpbmRleCIsImFycnlzIiwicHVzaCIsInNldERhdGEiLCJvbkNsaWNrIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwibmFtZSIsIlRhc2tJRCIsInRpZCIsIlN0ZXBJRCIsInBpZCIsInd4IiwibmF2aWdhdGVUbyIsIm9uUHVsbERvd25SZWZyZXNoIiwiQ3VycmVudFBhZ2VJbmRleHMiLCJQYWdlU3RhcnRzIiwiUGFnZUVuZHMiLCJQYWdlRW5kbG9hZG1vcmUiLCJwYWdlSW5kZXgiLCJzZXROYXZpZ2F0aW9uQmFyVGl0bGUiLCJ0aXRsZSIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInN0b3BQdWxsRG93blJlZnJlc2giLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJvblJlYWNo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QUtPLGFBQUwsR0FBbUI7QUFESCxLQUF6QjtBQUlEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbInZhciBwYWdlSW5kZXhzPTE7XG4gIHZhciBQYWdlU2l6ZXM9MTA7XG4gIHZhciBhcHAgPSBnZXRBcHAoKTtcbiAgdmFyIG5ldHdvcmsgPSByZXF1aXJlKCcuLi8uLi91dGlsL25ldHdvcmsuanMnKTtcbiAgdmFyICAkID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9hamF4LmpzJyk7XG5cbiAgdmFyIEpPU09OPSByZXF1aXJlKCcuLi8uLi91dGlsL2pzb24yLmpzJyk7XG5cbiAgdmFyIHRoaXN1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbC91dGlsLmpzJyk7XG4gIHRoaXN1dGlsLlN0YXJ0UHVsbERvd25SZWZyZWgodGhpcyxhcHApO1xuICBsZXQgSXRlbT0gW107XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG5cbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qE6K+35rGCJyxcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiNmZmZmZmZcIixcbiAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiBcImJsYWNrXCIsXG4gICAgYmFja2dyb3VuZENvbG9yOiBcIiNlZWVlZWVcIixcbiAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiBcImxpZ2h0XCIsXG5cbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtbGlzdCc6ICdAbWludWkvd3hjLWxpc3QnLFxuICAgICAgJ3d4Yy1pY29uJzogJ0BtaW51aS93eGMtaWNvbicsXG4gICAgICAnd3hjLWxvYWRtb3JlJzogJ0BtaW51aS93eGMtbG9hZG1vcmUnXG4gICAgfVxuXG4gIH0sXG4gIGRhdGE6IHtcbiAgICBjaGVjazogdHJ1ZSxcbiAgICBsb2FkbW9yZTpmYWxzZSxcbiAgICBMc3RJdGVtOltdLFxuICAgIFBvc3RVUkw6YXBwLmdsb2JhbERhdGEuQlBNSG9zdCArXCIvTG9naW4uYXNoeFwiLFxuICAgIEdldFVSTDphcHAuZ2xvYmFsRGF0YS5CUE1Ib3N0ICtcIi9NeVJlcXVlc3RzLmFzaHhcIixcbiAgICBQb3N0ZGF0YSA6IHtcbiAgICAgIHVpZDpcIlNEVDEyODcyXCIsXG4gICAgICBwd2Q6XCJKb3NvbjA4MDI1NlwiLFxuICAgICAgVXNlckFjY291bnQ6XCJTRFQxMjg3MlwiLFxuICAgICAgc3RhcnQ6cGFnZUluZGV4cyxcbiAgICAgIGxpbWl0OlBhZ2VTaXplcyxcbiAgICAgIGlzRGVidWc6dHJ1ZSxcbiAgICAgIGlzV2VpeEluOnRydWVcbiAgICB9LFxuICAgIHN0YXRlOltcblxuICAgICAge3RleHQ6XCLlhajpg6hcIiwgdmFsdWU6XCJBbGxcIn0sXG4gICAgICB7dGV4dDpcIuW3suWujOaIkFwiLCB2YWx1ZTpcIkFwcHJvdmVkXCJ9LFxuICAgICAge3RleHQ6XCLov5vooYzkuK1cIiwgdmFsdWU6XCJSdW5uaW5nXCJ9LFxuICAgICAge3RleHQ6XCLlt7Lmi5Lnu51cIiwgdmFsdWU6XCJSZWplY3RlZFwifSxcbiAgICAgIHt0ZXh0Olwi5bey6YCA5ZueXCIsIHZhbHVlOlwiQWJvcnRlZFwifVxuXG4gICAgXSxcbiAgICBwYWdlOntcbiAgICAgIGlDb3VudDowLFxuICAgICAgUGFnZUluZGV4OnBhZ2VJbmRleHMsXG4gICAgICBQYWdlU2l6ZTpQYWdlU2l6ZXNcbiAgICB9LFxuICB9LFxuICBvblNob3cgKG9wdGlvbnMpIHtcblxuXG4gIH0sXG4gIG9uTG9hZChvcHRpb24pe1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBKb3Nvbm9wdGlvbnMgPSB0aGF0LmRhdGE7XG4gICAgdGhhdC5BamF4UG9zdChKb3Nvbm9wdGlvbnMpO1xuXG4gIH0sXG4gIEFqYXhQb3N0IDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cbiAgICBsZXQgdGhhdD10aGlzO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJsOiBvcHRpb25zLlBvc3RVUkwsXG4gICAgICBkYXRhOiBvcHRpb25zLlBvc3RkYXRhLFxuXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG5cbiAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMuR2V0VVJMLFxuICAgICAgICBkYXRhOiBvcHRpb25zLlBvc3RkYXRhLFxuXG4gICAgICB9KS50aGVuKFBlcmZvcm1hbmNlID0+IHtcblxuICAgICAgICBsZXQgaUNvdW50cz0gUGVyZm9ybWFuY2UudG90YWw7XG4gICAgICAgIGxldCBQYWdlU3RhcnQ9dGhhdC5kYXRhLnBhZ2UuUGFnZVN0YXJ0O1xuICAgICAgICBsZXQgUGFnZUVuZD10aGF0LmRhdGEucGFnZS5QYWdlRW5kO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFBlcmZvcm1hbmNlKTtcblxuICAgICAgICBQZXJmb3JtYW5jZS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZHJlbixpbmRleCxhcnJ5cykge1xuICAgICAgICAgIEl0ZW0ucHVzaChjaGlsZHJlbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coSXRlbSk7XG5cbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICBbXCJwYWdlLmlDb3VudFwiXTppQ291bnRzLFxuICAgICAgICAgIExzdEl0ZW0gOiAgUGVyZm9ybWFuY2UuY2hpbGRyZW5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgICBjb25zb2xlLmxvZyh0aGF0LmRhdGEpO1xuXG5cbiAgICB9KVxuXG4gIH0sXG5cblxuICBvbkNsaWNrKGUpIHtcblxuICAgIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgbGV0IGN1cnJlbnRUYXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lO1xuXG4gICAgbGV0IFRhc2tJRD1jdXJyZW50VGFyZ2V0LnRpZDtcbiAgICBsZXQgU3RlcElEPWN1cnJlbnRUYXJnZXQucGlkO1xuXG4gICAgLy/lhbPpl63lvZPliY3pobXpnaLvvIzot7PovazliLDlupTnlKjlhoXnmoTmn5DkuKrpobXpnaJcbi8vICAgICAgd3gucmVkaXJlY3RUbyh7XG4vLyAgICAgICAgdXJsOiAnLi4vVGFza0luZm8vaW5kZXg/VGFza0lEPScrVGFza0lEKycmU3RlcElEPScrU3RlcElEKycnXG4vLyAgICAgIH0pO1xuXG4gICAgLy/kv53nlZnlvZPliY3pobXpnaLvvIzot7PovazliLDlupTnlKjlhoXnmoTmn5DkuKrpobXpnaLvvIzkvb/nlKggd3gubmF2aWdhdGVCYWNrIOWPr+S7pei/lOWbnuWIsOWOn+mhtemdolxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vVGFza0luZm8vaW5kZXg/VGFza0lEPScrVGFza0lEKycmU3RlcElEPScrU3RlcElEKycnXG4gICAgfSlcblxuXG5cbiAgfSxcblxuICBvblB1bGxEb3duUmVmcmVzaCgpe1xuXG4gICAgbGV0IEN1cnJlbnRQYWdlSW5kZXhzPTE7XG5cbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IGlDb3VudHMgPSAgdGhhdC5kYXRhLnBhZ2UuaUNvdW50O1xuICAgIGxldCBQYWdlU3RhcnRzPXRoYXQuZGF0YS5wYWdlLlBhZ2VTdGFydDtcbiAgICBsZXQgUGFnZUVuZHM9dGhhdC5kYXRhLnBhZ2UuUGFnZUVuZDtcbiAgICBsZXQgUGFnZUVuZGxvYWRtb3JlPWZhbHNlO1xuXG5cbiAgICBpZihpQ291bnRzPlBhZ2VTdGFydHMpXG4gICAge1xuICAgICAgQ3VycmVudFBhZ2VJbmRleHM9ICAgcGFnZUluZGV4cyA8PTEgPyBwYWdlSW5kZXhzIDogIHBhZ2VJbmRleHMtLTtcblxuICAgICAgLy9pZiggcGFnZUluZGV4cyA+IDEpICBwYWdlSW5kZXhzLS07XG5cbiAgICAgIGxldCBwYWdlSW5kZXggPXBhZ2VJbmRleHM7XG4gICAgICBsZXQgUGFnZVNpemUgPSB0aGF0LmRhdGEucGFnZS5QYWdlU2l6ZTtcbiAgICAgIGxldCBQYWdlU3RhcnQgPSBwYWdlSW5kZXggPD0xID8gMSA6IChwYWdlSW5kZXggKiBQYWdlU2l6ZSk7XG4gICAgICBsZXQgUGFnZUVuZCA9ICBwYWdlSW5kZXggPD0xID8gUGFnZVNpemUgOiAocGFnZUluZGV4KzEpICogUGFnZVNpemU7XG5cbiAgICAgIHRoYXQuc2V0RGF0YSh7XG5cbiAgICAgICAgcGFnZToge1xuICAgICAgICAgIFBhZ2VTaXplOlBhZ2VTaXplLFxuICAgICAgICAgIHBhZ2VJbmRleDogcGFnZUluZGV4LFxuICAgICAgICAgIFBhZ2VTdGFydDogUGFnZVN0YXJ0LFxuICAgICAgICAgIFBhZ2VFbmQ6UGFnZUVuZFxuICAgICAgICB9LFxuXG4gICAgICAgIFBvc3RkYXRhOntcblxuICAgICAgICAgIHVpZDpcIlNEVDEyODcyXCIsXG4gICAgICAgICAgcHdkOlwiSm9zb24wODAyNTZcIixcbiAgICAgICAgICBVc2VyQWNjb3VudDpcIlNEVDEyODcyXCIsXG4gICAgICAgICAgc3RhcnQ6IFBhZ2VTdGFydCxcbiAgICAgICAgICBsaW1pdDogUGFnZVNpemVcbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgICAgY29uc29sZS5sb2coXCLkuIvmi4nnv7vpobXvvIznv7vpobXliLBcIitwYWdlSW5kZXhzK1wi6aG1XCIpO1xuXG4gICAgICAvL+WKqOaAgeiuvue9ruW9k+WJjemhtemdoueahOagh+mimOOAglxuICAgICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHtcbiAgICAgICAgdGl0bGU6ICflvZPliY0nK0N1cnJlbnRQYWdlSW5kZXhzK1wi6aG155qE5qCH6aKYXCJcbiAgICAgIH0pO1xuXG5cbiAgICB9ZWxzZXtcblxuICAgICAgUGFnZUVuZGxvYWRtb3JlPXRydWU7XG4gICAgICBjb25zb2xlLmxvZyhcIuS4i+aLiee/u+mhteesrOS4gOmhteS6hiDov5nmmK/nrKxcIisgKHBhZ2VJbmRleHMpICtcIumhtVwiKTtcblxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKFwi5Yi35pawIHBhZ2VJbmRleHM6XCIrcGFnZUluZGV4cytcIumhtVwiKTtcblxuXG4gICAgd3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKCk7Ly/lnKjlvZPliY3pobXpnaLmmL7npLrlr7zoiKrmnaHliqDovb3liqjnlLvjgIJcblxuICAgIC8vY29uc29sZS5sb2codGhhdC5kYXRhKTtcblxuICAgIHRoYXQuQWpheFBvc3QodGhhdC5kYXRhKTtcblxuICAgIGNvbnNvbGUubG9nKFwi6YeN5paw5Yqg6L295L+h5oGv5a6M5oiQXCIpO1xuXG4gICAgLy93eC5zdGFydFB1bGxEb3duUmVmcmVzaCgpO1xuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goc3VjY2Vzcz0+e30sZmFpbD0+e30sY29tcGxldGU9Pnt9KTsgLy/lgZzmraLlvZPliY3pobXpnaLkuIvmi4nliLfmlrDjgIJcblxuICAgIHd4LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpOy8v6ZqQ6JeP5a+86Iiq5p2h5Yqg6L295Yqo55S744CCXG5cblxuICAgIGNvbnNvbGUubG9nKFwi5YWz6ZetIOWBnOatouW9k+WJjemhtemdouS4i+aLieWIt+aWsFwiKTtcblxuICB9LFxuXG4gIG9uUmVhY2hCb3R0b20oKXtcblxuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgUGFnZUluZGV4ID1wYWdlSW5kZXhzOy8vdGhhdC5kYXRhLnBhZ2UucGFnZUluZGV4KzE7XG4gICAgbGV0IFBhZ2VTaXplID1QYWdlU2l6ZXM7Ly8gdGhhdC5kYXRhLnBhZ2UuUGFnZVNpemU7XG4gICAgbGV0IFBhZ2VTdGFydCA9IChQYWdlSW5kZXgpICogUGFnZVNpemU7XG4gICAgbGV0IFBhZ2VFbmQgPSAoUGFnZUluZGV4KzEpICogUGFnZVNpemU7XG5cbiAgICBsZXQgUGFnZVN0YXJ0WD1cInBhZ2UuUGFnZVN0YXJ0XCI7XG4gICAgbGV0IFBhZ2VFbmRYPVwicGFnZS5QYWdlRW5kXCI7XG5cblxuICAgIHRoYXQuc2V0RGF0YSh7XG5cbi8vICAgICAgcGFnZToge1xuLy8gICAgICAgIFBhZ2VTaXplOlBhZ2VTaXplcyxcbi8vICAgICAgICBwYWdlSW5kZXg6IHBhZ2VJbmRleCxcbi8vICAgICAgICBQYWdlU3RhcnQ6IFBhZ2VTdGFydCxcbi8vICAgICAgICBQYWdlRW5kOlBhZ2VFbmRcbi8vICAgICAgfSxcblxuICAgICAgW1wicGFnZS5QYWdlU2l6ZVwiXTpQYWdlU2l6ZSxcbiAgICAgIFtcInBhZ2UuUGFnZUluZGV4XCJdOiBQYWdlSW5kZXgsXG4gICAgICBbUGFnZVN0YXJ0WF0gOlBhZ2VTdGFydCxcbiAgICAgIFtQYWdlRW5kWF0gOlBhZ2VFbmQsXG5cbiAgICAgIFBvc3RkYXRhOntcblxuICAgICAgICB1aWQ6XCJTRFQxMjg3MlwiLFxuICAgICAgICBwd2Q6XCJKb3NvbjA4MDI1NlwiLFxuICAgICAgICBVc2VyQWNjb3VudDpcIlNEVDEyODcyXCIsXG4gICAgICAgIHN0YXJ0OlBhZ2VTdGFydCxcbiAgICAgICAgbGltaXQ6UGFnZVNpemVcbiAgICAgIH1cblxuICAgIH0pO1xuXG4vLyAgICBjb25zb2xlLmxvZyhQYWdlU2l6ZSk7XG4vLyAgICBjb25zb2xlLmxvZyhQYWdlSW5kZXgpO1xuLy8gICAgY29uc29sZS5sb2coUGFnZVNpemVzKTtcbi8vICAgIGNvbnNvbGUubG9nKHBhZ2VJbmRleHMpO1xuXG5cbiAgICB0aGlzLkFqYXhQb3N0KHRoYXQuZGF0YSk7XG5cbiAgICBsZXQgaUNvdW50cyA9ICB0aGF0LmRhdGEucGFnZS5pQ291bnQ7XG4gICAgbGV0IFBhZ2VTdGFydHM9dGhhdC5kYXRhLnBhZ2UuUGFnZVN0YXJ0O1xuICAgIGxldCBQYWdlRW5kcz10aGF0LmRhdGEucGFnZS5QYWdlRW5kO1xuICAgIGxldCBQYWdlRW5kbG9hZG1vcmU9ZmFsc2U7XG4gICAgbGV0IFNob3dQYWdlSW5kZXg9MTtcblxuICAgIGlmKGlDb3VudHM+UGFnZVN0YXJ0cyAmJiBpQ291bnRzPj1QYWdlRW5kcylcbiAgICB7XG5cbiAgICAgICBwYWdlSW5kZXhzKys7XG4gICAgICAgU2hvd1BhZ2VJbmRleD1wYWdlSW5kZXhzO1xuXG5cbiAgICAgIGNvbnNvbGUubG9nKFwi6aG16Z2i5LiK5ouJ57+76aG177yM57+76aG15YiwXCIrcGFnZUluZGV4cytcIumhtVwiKTtcblxuICAgIH1lbHNle1xuXG4gICAgICBQYWdlRW5kbG9hZG1vcmU9dHJ1ZTtcbiAgICAgIFNob3dQYWdlSW5kZXg9IHBhZ2VJbmRleHMrMTtcblxuICAgICAgY29uc29sZS5sb2coXCLpobXpnaLkuIrmi4nnv7vpobXmtYvor5Uh5pyA5ZCO5LiA6aG15LqGIOi/meaYr+esrFwiKyAocGFnZUluZGV4cysxKSArXCLpobVcIik7XG5cbiAgICB9XG5cbiAgICB0aGF0LnNldERhdGEoe2xvYWRtb3JlOlBhZ2VFbmRsb2FkbW9yZX0pO1xuXG4gICAgLy/liqjmgIHorr7nva7lvZPliY3pobXpnaLnmoTmoIfpopjjgIJcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6ICflvZPliY0nK1Nob3dQYWdlSW5kZXgrXCLpobXnmoTmoIfpophcIlxuICAgIH0pO1xuXG4gIH0sXG5cbn0iXX0=