'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pageIndexs = 1;
var PageSizes = 10;
var app = getApp();
var thisutil = require('../../util/util.js');
var network = require('../../util/network.js');
var $ = require('../../util/ajax.js');
var animation;

thisutil.StartPullDownRefreh(undefined, app);

exports.default = Page({

  data: {
    menuType: 0,
    begin: null,
    status: "All",
    end: null,
    isVisible: false,
    animationData: {},
    page: {
      pageIndex: pageIndexs,
      PageSize: PageSizes
    },

    HistoryTaskType: [{ text: '我的申请', value: '0', checked: 'true' }, { text: '我的审批', value: '1' }, { text: '我的任务', value: '2' }, { text: '我的代理', value: '3' }],

    TaskState: [{ text: "全部", value: "All" }, { text: "已完成", value: "Approved" }, { text: "进行中", value: "Running" }, { text: "已拒绝", value: "Rejected" }, { text: "已退回", value: "Aborted" }],

    LstItem: {},
    PostURL: app.globalData.BPMHost + "/Login.ashx",
    GetURL: app.globalData.BPMHost + "/MyAllAccessable.ashx",
    Postdata: {

      uid: "SDT12872",
      pwd: "Joson080256",
      UserAccount: "SDT12872",
      isDebug: true,
      isWeixIn: true,
      start: 1,
      limit: 20
    }

  },

  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */
  methods: {},

  onPullDownRefresh: function onPullDownRefresh() {

    var that = this;
    var pageIndex = 1;
    var PageSizes = that.data.page.PageSize;
    var PageStart = pageIndex * PageSizes;
    var PageEnd = (pageIndex + 1) * PageSizes;

    that.setData({
      page: {
        PageSize: PageSizes,
        pageIndex: pageIndex,
        PageStart: PageStart,
        PageEnd: PageEnd
      },
      Postdata: {

        uid: "SDT12872",
        pwd: "Joson080256",
        UserAccount: "SDT12872",
        start: PageStart,
        limit: PageEnd
      }

    });

    console.log("刷新");

    wx.setNavigationBarTitle({
      title: '刷新中……'
    }); //动态设置当前页面的标题。

    wx.showNavigationBarLoading(); //在当前页面显示导航条加载动画。

    console.log(that.data);

    this.AjaxPost(that.data);
    console.log("重新加载信息完成");

    wx.hideNavigationBarLoading(); //隐藏导航条加载动画。

    //wx.startPullDownRefresh();
    wx.stopPullDownRefresh(function (success) {}, function (fail) {}, function (complete) {}); //停止当前页面下拉刷新。

    console.log("关闭 停止当前页面下拉刷新");

    wx.setNavigationBarTitle({
      title: '动态设置当前页面的标题'
    }); //动态设置当前页面的标题。

  },
  onReachBottom: function onReachBottom() {
    var _that$setData;

    var that = this;
    var pageIndex = pageIndexs; //that.data.page.pageIndex+1;
    var PageSize = PageSizes; // that.data.page.PageSize;
    var PageStart = pageIndex * PageSize;
    var PageEnd = (pageIndex + 1) * PageSize;

    var PageStartX = "page.PageStart";
    var PageEndX = "page.PageEnd";
    var TaskStatus = that.data.status = "All" ? " " : that.data.status;

    that.setData((_that$setData = {}, _defineProperty(_that$setData, PageStartX, PageStart), _defineProperty(_that$setData, PageEndX, PageEnd), _defineProperty(_that$setData, 'Postdata', {
      State: TaskStatus,
      uid: "SDT12872",
      pwd: "Joson080256",
      UserAccount: "SDT12872",
      start: PageStart,
      limit: PageEnd
    }), _that$setData));

    //    console.log(PageSize);
    //    console.log(pageIndex);
    //    console.log(PageSizes);
    //    console.log(pageIndexs);


    this.AjaxPost(that.data);

    //pageIndexs=pageIndexs+1;
    pageIndexs++;

    console.log("页面上拉翻页测试");
  },
  onShow: function onShow(options) {},
  onLoad: function onLoad(option) {

    var that = this;
    var Josonoptions = that.data;

    that.AjaxPost(Josonoptions);

    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease'
    });
    that.animation = animation;
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

  // 显示
  showMenuTap: function showMenuTap(e) {

    console.log(e);
    console.log("showMenuTap");
    //获取点击菜单的类型 1点击状态 2点击时间
    var menuType = e.currentTarget.dataset.type;

    this.setData({
      menuType: menuType
    });

    // 如果当前已经显示，再次点击时隐藏
    if (this.data.isVisible == true) {
      this.startAnimation(false, -200);
      return;
    }
    this.startAnimation(true, 0);
  },
  hideMenuTap: function hideMenuTap(e) {
    this.startAnimation(false, -200);
  },
  // 执行动画
  startAnimation: function startAnimation(isShow, offset) {
    var that = this;
    var offsetTem;
    if (offset == 0) {
      offsetTem = offset;
    } else {
      offsetTem = offset + 'rpx';
    }
    this.animation.translateY(offset).step();
    this.setData({
      animationData: this.animation.export(),
      isVisible: isShow
    });
    console.log(that.data);
  },
  // 选择状态按钮
  selectState: function selectState(e) {

    this.startAnimation(false, -200);
    var status = e.currentTarget.dataset.status;
    this.setData(_defineProperty({

      status: status
    }, "Postdata.State", status));

    var options = this.data;
    this.AjaxPost(options);

    console.log(this.data);
  },
  // 时间选择
  bindDateChange: function bindDateChange(e) {

    //console.log(e);

    if (e.currentTarget.dataset.type == 1) {

      //      this.setData({
      //        begin: e.detail.value,
      //        Year : e.detail.value,
      //        ["Postdata.Year"]:e.detail.value
      //      })

    } else if (e.currentTarget.dataset.type == 2) {

      var Years = e.detail.value;
      this.setData(_defineProperty({
        end: e.detail.value,
        Year: e.detail.value
      }, "Postdata.Year", e.detail.value));
    }
  },

  bindKeyWordChange: function bindKeyWordChange(e) {

    console.log(e);

    var KeyWords = e.detail.value;

    this.setData(_defineProperty({}, "Postdata.KeyWord", KeyWords));
  },

  sureDateTap: function sureDateTap() {

    this.data.pageNo = 1;
    this.startAnimation(false, -200);

    var options = this.data;
    this.AjaxPost(options);
  },
  // 执行动画
  startAddressAnimation: function startAddressAnimation(isShow) {

    console.log(isShow);

    var that = this;
    if (isShow) {
      that.animation.translateY(0 + 'vh').step();
    } else {
      that.animation.translateY(40 + 'vh').step();
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow
    });
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

        console.log(Performance);

        that.setData({
          LstItem: Performance
        });
      });

      console.log(that.data);
      //app.globalData.userInfo = options.userInfo;
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJwYWdlSW5kZXhzIiwiUGFnZVNpemVzIiwiYXBwIiwiZ2V0QXBwIiwidGhpc3V0aWwiLCJyZXF1aXJlIiwibmV0d29yayIsIiQiLCJhbmltYXRpb24iLCJTdGFydFB1bGxEb3duUmVmcmVoIiwiZGF0YSIsIm1lbnVUeXBlIiwiYmVnaW4iLCJzdGF0dXMiLCJlbmQiLCJpc1Zpc2libGUiLCJhbmltYXRpb25EYXRhIiwicGFnZSIsInBhZ2VJbmRleCIsIlBhZ2VTaXplIiwiSGlzdG9yeVRhc2tUeXBlIiwidGV4dCIsInZhbHVlIiwiY2hlY2tlZCIsIlRhc2tTdGF0ZSIsIkxzdEl0ZW0iLCJQb3N0VVJMIiwiZ2xvYmFsRGF0YSIsIkJQTUhvc3QiLCJHZXRVUkwiLCJQb3N0ZGF0YSIsInVpZCIsInB3ZCIsIlVzZXJBY2NvdW50IiwiaXNEZWJ1ZyIsImlzV2VpeEluIiwic3RhcnQiLCJsaW1pdCIsIm1ldGhvZHMiLCJvblB1bGxEb3duUmVmcmVzaCIsInRoYXQiLCJQYWdlU3RhcnQiLCJQYWdlRW5kIiwic2V0RGF0YSIsImNvbnNvbGUiLCJsb2ciLCJ3eCIsInNldE5hdmlnYXRpb25CYXJUaXRsZSIsInRpdGxlIiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwiQWpheFBvc3QiLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJzdG9wUHVsbERvd25SZWZyZXNoIiwib25SZWFjaEJvdHRvbSIsIlBhZ2VTdGFydFgiLCJQYWdlRW5kWCIsIlRhc2tTdGF0dXMiLCJTdGF0ZSIsIm9uU2hvdyIsIm9wdGlvbnMiLCJvbkxvYWQiLCJvcHRpb24iLCJKb3Nvbm9wdGlvbnMiLCJjcmVhdGVBbmltYXRpb24iLCJkdXJhdGlvbiIsInRyYW5zZm9ybU9yaWdpbiIsInRpbWluZ0Z1bmN0aW9uIiwib25DbGljayIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm5hbWUiLCJUYXNrSUQiLCJ0aWQiLCJTdGVwSUQiLCJwaWQiLCJuYXZpZ2F0ZVRvIiwidXJsIiwic2hvd01lbnVUYXAiLCJ0eXBlIiwic3RhcnRBbmltYXRpb24iLCJoaWRlTWVudVRhcCIsImlzU2hvdyIsIm9mZnNldCIsIm9mZnNldFRlbSIsInRyYW5zbGF0ZVkiLCJzdGVwIiwiZXhwb3J0Iiwic2VsZWN0U3RhdGUiLCJiaW5kRGF0ZUNoYW5nZSIsIlllYXJzIiwiZGV0YWlsIiwiWWVhciIsImJpbmRLZXlXb3JkQ2hhbmdlIiwiS2V5V29yZHMiLCJzdXJlRGF0ZVRhcCIsInBhZ2VObyIsInN0YXJ0QWRkcmVzc0FuaW1hdGlvbiIsImFuaW1hdGlvbkFkZHJlc3NNZW51IiwiYWRkcmVzc01lbnVJc1Nob3ciLCJhamF4IiwibWV0aG9kIiwidGhlbiIsIlBlcmZvcm1hbmNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUlBLGFBQVcsQ0FBZjtBQUNFLElBQUlDLFlBQVUsRUFBZDtBQUNBLElBQUlDLE1BQU1DLFFBQVY7QUFDQSxJQUFJQyxXQUFXQyxRQUFRLG9CQUFSLENBQWY7QUFDQSxJQUFJQyxVQUFVRCxRQUFRLHVCQUFSLENBQWQ7QUFDQSxJQUFLRSxJQUFJRixRQUFRLG9CQUFSLENBQVQ7QUFDQSxJQUFJRyxTQUFKOztBQUVBSixTQUFTSyxtQkFBVCxZQUFrQ1AsR0FBbEM7Ozs7QUFlQVEsUUFBTTtBQUNKQyxjQUFVLENBRE47QUFFSkMsV0FBTyxJQUZIO0FBR0pDLFlBQVEsS0FISjtBQUlKQyxTQUFLLElBSkQ7QUFLSkMsZUFBVyxLQUxQO0FBTUpDLG1CQUFlLEVBTlg7QUFPSkMsVUFBSztBQUNIQyxpQkFBVWxCLFVBRFA7QUFFSG1CLGdCQUFTbEI7QUFGTixLQVBEOztBQVlKbUIscUJBQ0UsQ0FDRSxFQUFDQyxNQUFNLE1BQVAsRUFBZUMsT0FBTyxHQUF0QixFQUEyQkMsU0FBUyxNQUFwQyxFQURGLEVBRUUsRUFBQ0YsTUFBTSxNQUFQLEVBQWVDLE9BQU8sR0FBdEIsRUFGRixFQUdFLEVBQUNELE1BQU0sTUFBUCxFQUFlQyxPQUFPLEdBQXRCLEVBSEYsRUFJRSxFQUFDRCxNQUFNLE1BQVAsRUFBZUMsT0FBTyxHQUF0QixFQUpGLENBYkU7O0FBb0JGRSxlQUFVLENBQ1IsRUFBQ0gsTUFBSyxJQUFOLEVBQVlDLE9BQU0sS0FBbEIsRUFEUSxFQUVSLEVBQUNELE1BQUssS0FBTixFQUFhQyxPQUFNLFVBQW5CLEVBRlEsRUFHUixFQUFDRCxNQUFLLEtBQU4sRUFBYUMsT0FBTSxTQUFuQixFQUhRLEVBSVIsRUFBQ0QsTUFBSyxLQUFOLEVBQWFDLE9BQU0sVUFBbkIsRUFKUSxFQUtSLEVBQUNELE1BQUssS0FBTixFQUFhQyxPQUFNLFNBQW5CLEVBTFEsQ0FwQlI7O0FBNkJKRyxhQUFRLEVBN0JKO0FBOEJKQyxhQUFReEIsSUFBSXlCLFVBQUosQ0FBZUMsT0FBZixHQUF3QixhQTlCNUI7QUErQkpDLFlBQU8zQixJQUFJeUIsVUFBSixDQUFlQyxPQUFmLEdBQXdCLHVCQS9CM0I7QUFnQ0pFLGNBQVc7O0FBRVRDLFdBQUksVUFGSztBQUdUQyxXQUFJLGFBSEs7QUFJVEMsbUJBQVksVUFKSDtBQUtUQyxlQUFRLElBTEM7QUFNVEMsZ0JBQVMsSUFOQTtBQU9UQyxhQUFNLENBUEc7QUFRVEMsYUFBTTtBQVJHOztBQWhDUCxHOztBQTZDTjtBQUNBQyxXQUFTLEU7O0FBRVRDLG1CLCtCQUFtQjs7QUFFakIsUUFBSUMsT0FBTyxJQUFYO0FBQ0EsUUFBSXRCLFlBQVksQ0FBaEI7QUFDQSxRQUFJakIsWUFBWXVDLEtBQUs5QixJQUFMLENBQVVPLElBQVYsQ0FBZUUsUUFBL0I7QUFDQSxRQUFJc0IsWUFBWXZCLFlBQVlqQixTQUE1QjtBQUNBLFFBQUl5QyxVQUFVLENBQUN4QixZQUFVLENBQVgsSUFBZ0JqQixTQUE5Qjs7QUFFQXVDLFNBQUtHLE9BQUwsQ0FBYTtBQUNYMUIsWUFBTTtBQUNKRSxrQkFBU2xCLFNBREw7QUFFSmlCLG1CQUFXQSxTQUZQO0FBR0p1QixtQkFBV0EsU0FIUDtBQUlKQyxpQkFBUUE7QUFKSixPQURLO0FBT1haLGdCQUFTOztBQUVQQyxhQUFJLFVBRkc7QUFHUEMsYUFBSSxhQUhHO0FBSVBDLHFCQUFZLFVBSkw7QUFLUEcsZUFBTUssU0FMQztBQU1QSixlQUFNSztBQU5DOztBQVBFLEtBQWI7O0FBbUJBRSxZQUFRQyxHQUFSLENBQVksSUFBWjs7QUFFQUMsT0FBR0MscUJBQUgsQ0FBeUI7QUFDdkJDLGFBQU87QUFEZ0IsS0FBekIsRUE3QmlCLENBK0JkOztBQUVIRixPQUFHRyx3QkFBSCxHQWpDaUIsQ0FpQ2E7O0FBRTlCTCxZQUFRQyxHQUFSLENBQVlMLEtBQUs5QixJQUFqQjs7QUFFQSxTQUFLd0MsUUFBTCxDQUFjVixLQUFLOUIsSUFBbkI7QUFDQWtDLFlBQVFDLEdBQVIsQ0FBWSxVQUFaOztBQUVBQyxPQUFHSyx3QkFBSCxHQXhDaUIsQ0F3Q2E7O0FBRTlCO0FBQ0NMLE9BQUdNLG1CQUFILENBQXVCLG1CQUFTLENBQUUsQ0FBbEMsRUFBbUMsZ0JBQU0sQ0FBRSxDQUEzQyxFQUE0QyxvQkFBVSxDQUFFLENBQXhELEVBM0NnQixDQTJDMkM7O0FBRTVEUixZQUFRQyxHQUFSLENBQVksZUFBWjs7QUFFQUMsT0FBR0MscUJBQUgsQ0FBeUI7QUFDdkJDLGFBQU87QUFEZ0IsS0FBekIsRUEvQ2lCLENBaURmOztBQUdILEc7QUFFREssZSwyQkFBZTtBQUFBOztBQUViLFFBQUliLE9BQU8sSUFBWDtBQUNBLFFBQUl0QixZQUFXbEIsVUFBZixDQUhhLENBR2E7QUFDMUIsUUFBSW1CLFdBQVVsQixTQUFkLENBSmEsQ0FJVztBQUN4QixRQUFJd0MsWUFBWXZCLFlBQVlDLFFBQTVCO0FBQ0EsUUFBSXVCLFVBQVUsQ0FBQ3hCLFlBQVUsQ0FBWCxJQUFnQkMsUUFBOUI7O0FBRUEsUUFBSW1DLGFBQVcsZ0JBQWY7QUFDQSxRQUFJQyxXQUFTLGNBQWI7QUFDQSxRQUFJQyxhQUFZaEIsS0FBSzlCLElBQUwsQ0FBVUcsTUFBVixHQUFpQixRQUFPLEdBQVAsR0FBYTJCLEtBQUs5QixJQUFMLENBQVVHLE1BQXhEOztBQUVBMkIsU0FBS0csT0FBTCxxREFXR1csVUFYSCxFQVdnQmIsU0FYaEIsa0NBWUdjLFFBWkgsRUFZY2IsT0FaZCw4Q0FjVztBQUNQZSxhQUFNRCxVQURDO0FBRVB6QixXQUFJLFVBRkc7QUFHUEMsV0FBSSxhQUhHO0FBSVBDLG1CQUFZLFVBSkw7QUFLUEcsYUFBTUssU0FMQztBQU1QSixhQUFNSztBQU5DLEtBZFg7O0FBeUJKO0FBQ0E7QUFDQTtBQUNBOzs7QUFHSSxTQUFLUSxRQUFMLENBQWNWLEtBQUs5QixJQUFuQjs7QUFFQTtBQUNBVjs7QUFFQTRDLFlBQVFDLEdBQVIsQ0FBWSxVQUFaO0FBRUQsRztBQUVEYSxRLGtCQUFRQyxPLEVBQVMsQ0FFaEIsQztBQUVEQyxRLGtCQUFPQyxNLEVBQU87O0FBRVosUUFBSXJCLE9BQU8sSUFBWDtBQUNBLFFBQUlzQixlQUFldEIsS0FBSzlCLElBQXhCOztBQUVBOEIsU0FBS1UsUUFBTCxDQUFjWSxZQUFkOztBQUVBO0FBQ0EsUUFBSXRELFlBQVlzQyxHQUFHaUIsZUFBSCxDQUFtQjtBQUNqQ0MsZ0JBQVUsR0FEdUI7QUFFakNDLHVCQUFpQixTQUZnQjtBQUdqQ0Msc0JBQWdCO0FBSGlCLEtBQW5CLENBQWhCO0FBS0ExQixTQUFLaEMsU0FBTCxHQUFpQkEsU0FBakI7QUFFRCxHO0FBRUQyRCxTLG1CQUFRQyxDLEVBQUc7O0FBRVR4QixZQUFRQyxHQUFSLENBQVl1QixDQUFaOztBQUVBLFFBQUlDLGdCQUFnQkQsRUFBRUMsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLElBQTVDOztBQUVBLFFBQUlDLFNBQU9ILGNBQWNJLEdBQXpCO0FBQ0EsUUFBSUMsU0FBT0wsY0FBY00sR0FBekI7O0FBR0E7QUFDSjtBQUNBO0FBQ0E7O0FBRUk7QUFDQTdCLE9BQUc4QixVQUFILENBQWM7QUFDWkMsV0FBSyw4QkFBNEJMLE1BQTVCLEdBQW1DLFVBQW5DLEdBQThDRSxNQUE5QyxHQUFxRDtBQUQ5QyxLQUFkO0FBTUQsRzs7QUFDRDtBQUNBSSxlQUFhLHFCQUFVVixDQUFWLEVBQWE7O0FBRXhCeEIsWUFBUUMsR0FBUixDQUFZdUIsQ0FBWjtBQUNBeEIsWUFBUUMsR0FBUixDQUFZLGFBQVo7QUFDQTtBQUNBLFFBQUlsQyxXQUFXeUQsRUFBRUMsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JTLElBQXZDOztBQUVBLFNBQUtwQyxPQUFMLENBQWE7QUFDWGhDLGdCQUFVQTtBQURDLEtBQWI7O0FBSUE7QUFDQSxRQUFJLEtBQUtELElBQUwsQ0FBVUssU0FBVixJQUF1QixJQUEzQixFQUFpQztBQUMvQixXQUFLaUUsY0FBTCxDQUFvQixLQUFwQixFQUEyQixDQUFDLEdBQTVCO0FBQ0E7QUFDRDtBQUNELFNBQUtBLGNBQUwsQ0FBb0IsSUFBcEIsRUFBMEIsQ0FBMUI7QUFFRCxHO0FBQ0RDLGVBQWEscUJBQVViLENBQVYsRUFBYTtBQUN4QixTQUFLWSxjQUFMLENBQW9CLEtBQXBCLEVBQTJCLENBQUMsR0FBNUI7QUFDRCxHO0FBQ0Q7QUFDQUEsa0JBQWdCLHdCQUFVRSxNQUFWLEVBQWtCQyxNQUFsQixFQUEwQjtBQUN4QyxRQUFJM0MsT0FBTyxJQUFYO0FBQ0EsUUFBSTRDLFNBQUo7QUFDQSxRQUFJRCxVQUFVLENBQWQsRUFBaUI7QUFDZkMsa0JBQVlELE1BQVo7QUFDRCxLQUZELE1BRU87QUFDTEMsa0JBQVlELFNBQVMsS0FBckI7QUFDRDtBQUNELFNBQUszRSxTQUFMLENBQWU2RSxVQUFmLENBQTBCRixNQUExQixFQUFrQ0csSUFBbEM7QUFDQSxTQUFLM0MsT0FBTCxDQUFhO0FBQ1gzQixxQkFBZSxLQUFLUixTQUFMLENBQWUrRSxNQUFmLEVBREo7QUFFWHhFLGlCQUFXbUU7QUFGQSxLQUFiO0FBSUF0QyxZQUFRQyxHQUFSLENBQVlMLEtBQUs5QixJQUFqQjtBQUNELEc7QUFDRDtBQUNBOEUsZUFBYSxxQkFBVXBCLENBQVYsRUFBYTs7QUFFeEIsU0FBS1ksY0FBTCxDQUFvQixLQUFwQixFQUEyQixDQUFDLEdBQTVCO0FBQ0EsUUFBSW5FLFNBQVN1RCxFQUFFQyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QnpELE1BQXJDO0FBQ0EsU0FBSzhCLE9BQUw7O0FBRUU5QixjQUFTQTtBQUZYLE9BR0csZ0JBSEgsRUFHcUJBLE1BSHJCOztBQU9BLFFBQUk4QyxVQUFRLEtBQUtqRCxJQUFqQjtBQUNBLFNBQUt3QyxRQUFMLENBQWVTLE9BQWY7O0FBRUFmLFlBQVFDLEdBQVIsQ0FBWSxLQUFLbkMsSUFBakI7QUFFRCxHO0FBQ0Q7QUFDQStFLGtCQUFnQix3QkFBVXJCLENBQVYsRUFBYTs7QUFFM0I7O0FBRUEsUUFBSUEsRUFBRUMsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JTLElBQXhCLElBQWdDLENBQXBDLEVBQXVDOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVLLEtBUkQsTUFRTyxJQUFJWCxFQUFFQyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QlMsSUFBeEIsSUFBZ0MsQ0FBcEMsRUFBdUM7O0FBRTVDLFVBQUlXLFFBQU90QixFQUFFdUIsTUFBRixDQUFTckUsS0FBcEI7QUFDQSxXQUFLcUIsT0FBTDtBQUNFN0IsYUFBS3NELEVBQUV1QixNQUFGLENBQVNyRSxLQURoQjtBQUVFc0UsY0FBT3hCLEVBQUV1QixNQUFGLENBQVNyRTtBQUZsQixTQUdHLGVBSEgsRUFHb0I4QyxFQUFFdUIsTUFBRixDQUFTckUsS0FIN0I7QUFNRDtBQUNGLEc7O0FBRUR1RSxxQkFBbUIsMkJBQVV6QixDQUFWLEVBQWE7O0FBRTlCeEIsWUFBUUMsR0FBUixDQUFZdUIsQ0FBWjs7QUFFQSxRQUFJMEIsV0FBVzFCLEVBQUV1QixNQUFGLENBQVNyRSxLQUF4Qjs7QUFFQSxTQUFLcUIsT0FBTCxxQkFDSyxrQkFETCxFQUN5Qm1ELFFBRHpCO0FBSUQsRzs7QUFFREMsZUFBYSx1QkFBWTs7QUFFdkIsU0FBS3JGLElBQUwsQ0FBVXNGLE1BQVYsR0FBbUIsQ0FBbkI7QUFDQSxTQUFLaEIsY0FBTCxDQUFvQixLQUFwQixFQUEyQixDQUFDLEdBQTVCOztBQUVBLFFBQUlyQixVQUFRLEtBQUtqRCxJQUFqQjtBQUNBLFNBQUt3QyxRQUFMLENBQWVTLE9BQWY7QUFFRCxHO0FBQ0Q7QUFDQXNDLHlCQUF1QiwrQkFBVWYsTUFBVixFQUFrQjs7QUFFdkN0QyxZQUFRQyxHQUFSLENBQVlxQyxNQUFaOztBQUVBLFFBQUkxQyxPQUFPLElBQVg7QUFDQSxRQUFJMEMsTUFBSixFQUFZO0FBQ1YxQyxXQUFLaEMsU0FBTCxDQUFlNkUsVUFBZixDQUEwQixJQUFJLElBQTlCLEVBQW9DQyxJQUFwQztBQUNELEtBRkQsTUFFTztBQUNMOUMsV0FBS2hDLFNBQUwsQ0FBZTZFLFVBQWYsQ0FBMEIsS0FBSyxJQUEvQixFQUFxQ0MsSUFBckM7QUFDRDtBQUNEOUMsU0FBS0csT0FBTCxDQUFhO0FBQ1h1RCw0QkFBc0IxRCxLQUFLaEMsU0FBTCxDQUFlK0UsTUFBZixFQURYO0FBRVhZLHlCQUFtQmpCO0FBRlIsS0FBYjtBQUlELEc7O0FBR0RoQyxZQUFXLGtCQUFTUyxPQUFULEVBQWlCOztBQUUxQixRQUFJbkIsT0FBSyxJQUFUOztBQUVBakMsTUFBRTZGLElBQUYsQ0FBTztBQUNMQyxjQUFRLE1BREg7QUFFTHhCLFdBQUtsQixRQUFRakMsT0FGUjtBQUdMaEIsWUFBTWlELFFBQVE3Qjs7QUFIVCxLQUFQLEVBS0d3RSxJQUxILENBS1Esb0JBQVk7O0FBRWxCOztBQUVBL0YsUUFBRTZGLElBQUYsQ0FBTztBQUNMQyxnQkFBUSxLQURIO0FBRUx4QixhQUFLbEIsUUFBUTlCLE1BRlI7QUFHTG5CLGNBQU1pRCxRQUFRN0I7O0FBSFQsT0FBUCxFQUtHd0UsSUFMSCxDQUtRLHVCQUFlOztBQUVyQjFELGdCQUFRQyxHQUFSLENBQVkwRCxXQUFaOztBQUVBL0QsYUFBS0csT0FBTCxDQUFhO0FBQ1hsQixtQkFBUzhFO0FBREUsU0FBYjtBQUlELE9BYkQ7O0FBZUEzRCxjQUFRQyxHQUFSLENBQVlMLEtBQUs5QixJQUFqQjtBQUNBO0FBRUQsS0EzQkQ7QUE2QkQiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHBhZ2VJbmRleHM9MTtcbiAgdmFyIFBhZ2VTaXplcz0xMDtcbiAgdmFyIGFwcCA9IGdldEFwcCgpO1xuICB2YXIgdGhpc3V0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsL3V0aWwuanMnKTtcbiAgdmFyIG5ldHdvcmsgPSByZXF1aXJlKCcuLi8uLi91dGlsL25ldHdvcmsuanMnKTtcbiAgdmFyICAkID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9hamF4LmpzJyk7XG4gIHZhciBhbmltYXRpb247XG5cbiAgdGhpc3V0aWwuU3RhcnRQdWxsRG93blJlZnJlaCh0aGlzLGFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOa1geeoiycsXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOnRydWUsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLWxpc3QnOiAnQG1pbnVpL3d4Yy1saXN0JyxcbiAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nLFxuICAgICAgJ3d4Yy1pbnB1dCc6ICdAbWludWkvd3hjLWlucHV0JyxcbiAgICAgICd3eGMtcG9wdXAnOiAnQG1pbnVpL3d4Yy1wb3B1cCcsXG4gICAgICAnd3hjLWxvYWRtb3JlJzogJ0BtaW51aS93eGMtbG9hZG1vcmUnXG4gICAgfVxuICB9LFxuXG4gIGRhdGE6IHtcbiAgICBtZW51VHlwZTogMCxcbiAgICBiZWdpbjogbnVsbCxcbiAgICBzdGF0dXM6IFwiQWxsXCIsXG4gICAgZW5kOiBudWxsLFxuICAgIGlzVmlzaWJsZTogZmFsc2UsXG4gICAgYW5pbWF0aW9uRGF0YToge30sXG4gICAgcGFnZTp7XG4gICAgICBwYWdlSW5kZXg6cGFnZUluZGV4cyxcbiAgICAgIFBhZ2VTaXplOlBhZ2VTaXplc1xuICAgIH0sXG5cbiAgICBIaXN0b3J5VGFza1R5cGU6XG4gICAgICBbXG4gICAgICAgIHt0ZXh0OiAn5oiR55qE55Sz6K+3JywgdmFsdWU6ICcwJywgY2hlY2tlZDogJ3RydWUnfSxcbiAgICAgICAge3RleHQ6ICfmiJHnmoTlrqHmibknLCB2YWx1ZTogJzEnfSxcbiAgICAgICAge3RleHQ6ICfmiJHnmoTku7vliqEnLCB2YWx1ZTogJzInfSxcbiAgICAgICAge3RleHQ6ICfmiJHnmoTku6PnkIYnLCB2YWx1ZTogJzMnfVxuICAgICAgXSxcblxuICAgICAgVGFza1N0YXRlOltcbiAgICAgICAge3RleHQ6XCLlhajpg6hcIiwgdmFsdWU6XCJBbGxcIn0sXG4gICAgICAgIHt0ZXh0Olwi5bey5a6M5oiQXCIsIHZhbHVlOlwiQXBwcm92ZWRcIn0sXG4gICAgICAgIHt0ZXh0Olwi6L+b6KGM5LitXCIsIHZhbHVlOlwiUnVubmluZ1wifSxcbiAgICAgICAge3RleHQ6XCLlt7Lmi5Lnu51cIiwgdmFsdWU6XCJSZWplY3RlZFwifSxcbiAgICAgICAge3RleHQ6XCLlt7LpgIDlm55cIiwgdmFsdWU6XCJBYm9ydGVkXCJ9XG4gICAgICBdLFxuXG5cbiAgICBMc3RJdGVtOnt9LFxuICAgIFBvc3RVUkw6YXBwLmdsb2JhbERhdGEuQlBNSG9zdCArXCIvTG9naW4uYXNoeFwiLFxuICAgIEdldFVSTDphcHAuZ2xvYmFsRGF0YS5CUE1Ib3N0ICtcIi9NeUFsbEFjY2Vzc2FibGUuYXNoeFwiLFxuICAgIFBvc3RkYXRhIDoge1xuXG4gICAgICB1aWQ6XCJTRFQxMjg3MlwiLFxuICAgICAgcHdkOlwiSm9zb24wODAyNTZcIixcbiAgICAgIFVzZXJBY2NvdW50OlwiU0RUMTI4NzJcIixcbiAgICAgIGlzRGVidWc6dHJ1ZSxcbiAgICAgIGlzV2VpeEluOnRydWUsXG4gICAgICBzdGFydDoxLFxuICAgICAgbGltaXQ6MjBcbiAgICB9LFxuXG4gIH0sXG5cbiAgLyoqIG5vdGU6IOWcqCB3eHAg5paH5Lu25oiW6ICF6aG16Z2i5paH5Lu25Lit6K+35Y675o6JIG1ldGhvZHMg5YyF6KOFICovXG4gIG1ldGhvZHM6IHsgfSxcblxuICBvblB1bGxEb3duUmVmcmVzaCgpe1xuXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGxldCBwYWdlSW5kZXggPSAxO1xuICAgIGxldCBQYWdlU2l6ZXMgPSB0aGF0LmRhdGEucGFnZS5QYWdlU2l6ZTtcbiAgICBsZXQgUGFnZVN0YXJ0ID0gcGFnZUluZGV4ICogUGFnZVNpemVzO1xuICAgIGxldCBQYWdlRW5kID0gKHBhZ2VJbmRleCsxKSAqIFBhZ2VTaXplcztcblxuICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICBwYWdlOiB7XG4gICAgICAgIFBhZ2VTaXplOlBhZ2VTaXplcyxcbiAgICAgICAgcGFnZUluZGV4OiBwYWdlSW5kZXgsXG4gICAgICAgIFBhZ2VTdGFydDogUGFnZVN0YXJ0LFxuICAgICAgICBQYWdlRW5kOlBhZ2VFbmRcbiAgICAgIH0sXG4gICAgICBQb3N0ZGF0YTp7XG5cbiAgICAgICAgdWlkOlwiU0RUMTI4NzJcIixcbiAgICAgICAgcHdkOlwiSm9zb24wODAyNTZcIixcbiAgICAgICAgVXNlckFjY291bnQ6XCJTRFQxMjg3MlwiLFxuICAgICAgICBzdGFydDpQYWdlU3RhcnQsXG4gICAgICAgIGxpbWl0OlBhZ2VFbmRcbiAgICAgIH1cblxuICAgIH0pO1xuXG5cbiAgICBjb25zb2xlLmxvZyhcIuWIt+aWsFwiKTtcblxuICAgIHd4LnNldE5hdmlnYXRpb25CYXJUaXRsZSh7XG4gICAgICB0aXRsZTogJ+WIt+aWsOS4reKApuKApidcbiAgICB9KTsvL+WKqOaAgeiuvue9ruW9k+WJjemhtemdoueahOagh+mimOOAglxuXG4gICAgd3guc2hvd05hdmlnYXRpb25CYXJMb2FkaW5nKCk7Ly/lnKjlvZPliY3pobXpnaLmmL7npLrlr7zoiKrmnaHliqDovb3liqjnlLvjgIJcblxuICAgIGNvbnNvbGUubG9nKHRoYXQuZGF0YSk7XG5cbiAgICB0aGlzLkFqYXhQb3N0KHRoYXQuZGF0YSk7XG4gICAgY29uc29sZS5sb2coXCLph43mlrDliqDovb3kv6Hmga/lrozmiJBcIik7XG5cbiAgICB3eC5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKTsvL+makOiXj+WvvOiIquadoeWKoOi9veWKqOeUu+OAglxuXG4gICAgLy93eC5zdGFydFB1bGxEb3duUmVmcmVzaCgpO1xuICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKHN1Y2Nlc3M9Pnt9LGZhaWw9Pnt9LGNvbXBsZXRlPT57fSk7IC8v5YGc5q2i5b2T5YmN6aG16Z2i5LiL5ouJ5Yi35paw44CCXG5cbiAgICBjb25zb2xlLmxvZyhcIuWFs+mXrSDlgZzmraLlvZPliY3pobXpnaLkuIvmi4nliLfmlrBcIik7XG5cbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xuICAgICAgdGl0bGU6ICfliqjmgIHorr7nva7lvZPliY3pobXpnaLnmoTmoIfpopgnXG4gICAgfSkvL+WKqOaAgeiuvue9ruW9k+WJjemhtemdoueahOagh+mimOOAglxuXG5cbiAgfSxcblxuICBvblJlYWNoQm90dG9tKCl7XG5cbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgbGV0IHBhZ2VJbmRleCA9cGFnZUluZGV4czsvL3RoYXQuZGF0YS5wYWdlLnBhZ2VJbmRleCsxO1xuICAgIGxldCBQYWdlU2l6ZSA9UGFnZVNpemVzOy8vIHRoYXQuZGF0YS5wYWdlLlBhZ2VTaXplO1xuICAgIGxldCBQYWdlU3RhcnQgPSBwYWdlSW5kZXggKiBQYWdlU2l6ZTtcbiAgICBsZXQgUGFnZUVuZCA9IChwYWdlSW5kZXgrMSkgKiBQYWdlU2l6ZTtcblxuICAgIGxldCBQYWdlU3RhcnRYPVwicGFnZS5QYWdlU3RhcnRcIjtcbiAgICBsZXQgUGFnZUVuZFg9XCJwYWdlLlBhZ2VFbmRcIjtcbiAgICBsZXQgVGFza1N0YXR1cyA9dGhhdC5kYXRhLnN0YXR1cz1cIkFsbFwiPyBcIiBcIiA6IHRoYXQuZGF0YS5zdGF0dXM7XG5cbiAgICB0aGF0LnNldERhdGEoe1xuXG4vLyAgICAgIHBhZ2U6IHtcbi8vICAgICAgICBQYWdlU2l6ZTpQYWdlU2l6ZXMsXG4vLyAgICAgICAgcGFnZUluZGV4OiBwYWdlSW5kZXgsXG4vLyAgICAgICAgUGFnZVN0YXJ0OiBQYWdlU3RhcnQsXG4vLyAgICAgICAgUGFnZUVuZDpQYWdlRW5kXG4vLyAgICAgIH0sXG5cbi8vICAgICAgW1wicGFnZS5QYWdlU2l6ZVwiXTpQYWdlU2l6ZXMsXG4vLyAgICAgIFtcInBhZ2UucGFnZUluZGV4XCJdOiBwYWdlSW5kZXgsXG4gICAgICBbUGFnZVN0YXJ0WF0gOlBhZ2VTdGFydCxcbiAgICAgIFtQYWdlRW5kWF0gOlBhZ2VFbmQsXG5cbiAgICAgIFBvc3RkYXRhOntcbiAgICAgICAgU3RhdGU6VGFza1N0YXR1cyxcbiAgICAgICAgdWlkOlwiU0RUMTI4NzJcIixcbiAgICAgICAgcHdkOlwiSm9zb24wODAyNTZcIixcbiAgICAgICAgVXNlckFjY291bnQ6XCJTRFQxMjg3MlwiLFxuICAgICAgICBzdGFydDpQYWdlU3RhcnQsXG4gICAgICAgIGxpbWl0OlBhZ2VFbmRcbiAgICAgIH1cblxuICAgIH0pO1xuXG4vLyAgICBjb25zb2xlLmxvZyhQYWdlU2l6ZSk7XG4vLyAgICBjb25zb2xlLmxvZyhwYWdlSW5kZXgpO1xuLy8gICAgY29uc29sZS5sb2coUGFnZVNpemVzKTtcbi8vICAgIGNvbnNvbGUubG9nKHBhZ2VJbmRleHMpO1xuXG5cbiAgICB0aGlzLkFqYXhQb3N0KHRoYXQuZGF0YSk7XG5cbiAgICAvL3BhZ2VJbmRleHM9cGFnZUluZGV4cysxO1xuICAgIHBhZ2VJbmRleHMrKztcblxuICAgIGNvbnNvbGUubG9nKFwi6aG16Z2i5LiK5ouJ57+76aG15rWL6K+VXCIpO1xuXG4gIH0sXG5cbiAgb25TaG93IChvcHRpb25zKSB7XG5cbiAgfSxcblxuICBvbkxvYWQob3B0aW9uKXtcblxuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBsZXQgSm9zb25vcHRpb25zID0gdGhhdC5kYXRhO1xuXG4gICAgdGhhdC5BamF4UG9zdChKb3Nvbm9wdGlvbnMpO1xuXG4gICAgLy8g5Yid5aeL5YyW5Yqo55S75Y+Y6YePXG4gICAgbGV0IGFuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcIjUwJSA1MCVcIixcbiAgICAgIHRpbWluZ0Z1bmN0aW9uOiAnZWFzZScsXG4gICAgfSk7XG4gICAgdGhhdC5hbmltYXRpb24gPSBhbmltYXRpb247XG5cbiAgfSxcblxuICBvbkNsaWNrKGUpIHtcblxuICAgIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgbGV0IGN1cnJlbnRUYXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5uYW1lO1xuXG4gICAgbGV0IFRhc2tJRD1jdXJyZW50VGFyZ2V0LnRpZDtcbiAgICBsZXQgU3RlcElEPWN1cnJlbnRUYXJnZXQucGlkO1xuXG5cbiAgICAvL+WFs+mXreW9k+WJjemhtemdou+8jOi3s+i9rOWIsOW6lOeUqOWGheeahOafkOS4qumhtemdolxuLy8gICAgICB3eC5yZWRpcmVjdFRvKHtcbi8vICAgICAgICB1cmw6ICcuLi9UYXNrSW5mby9pbmRleD9UYXNrSUQ9JytUYXNrSUQrJyZTdGVwSUQ9JytTdGVwSUQrJydcbi8vICAgICAgfSk7XG5cbiAgICAvL+S/neeVmeW9k+WJjemhtemdou+8jOi3s+i9rOWIsOW6lOeUqOWGheeahOafkOS4qumhtemdou+8jOS9v+eUqCB3eC5uYXZpZ2F0ZUJhY2sg5Y+v5Lul6L+U5Zue5Yiw5Y6f6aG16Z2iXG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcuLi9UYXNrSW5mby9pbmRleD9UYXNrSUQ9JytUYXNrSUQrJyZTdGVwSUQ9JytTdGVwSUQrJydcbiAgICB9KVxuXG5cblxuICB9LFxuICAvLyDmmL7npLpcbiAgc2hvd01lbnVUYXA6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICBjb25zb2xlLmxvZyhcInNob3dNZW51VGFwXCIpO1xuICAgIC8v6I635Y+W54K55Ye76I+c5Y2V55qE57G75Z6LIDHngrnlh7vnirbmgIEgMueCueWHu+aXtumXtFxuICAgIGxldCBtZW51VHlwZSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnR5cGU7XG5cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgbWVudVR5cGU6IG1lbnVUeXBlXG4gICAgfSk7XG5cbiAgICAvLyDlpoLmnpzlvZPliY3lt7Lnu4/mmL7npLrvvIzlho3mrKHngrnlh7vml7bpmpDol49cbiAgICBpZiAodGhpcy5kYXRhLmlzVmlzaWJsZSA9PSB0cnVlKSB7XG4gICAgICB0aGlzLnN0YXJ0QW5pbWF0aW9uKGZhbHNlLCAtMjAwKTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLnN0YXJ0QW5pbWF0aW9uKHRydWUsIDApXG5cbiAgfSxcbiAgaGlkZU1lbnVUYXA6IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhpcy5zdGFydEFuaW1hdGlvbihmYWxzZSwgLTIwMClcbiAgfSxcbiAgLy8g5omn6KGM5Yqo55S7XG4gIHN0YXJ0QW5pbWF0aW9uOiBmdW5jdGlvbiAoaXNTaG93LCBvZmZzZXQpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIG9mZnNldFRlbTtcbiAgICBpZiAob2Zmc2V0ID09IDApIHtcbiAgICAgIG9mZnNldFRlbSA9IG9mZnNldFxuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXRUZW0gPSBvZmZzZXQgKyAncnB4J1xuICAgIH1cbiAgICB0aGlzLmFuaW1hdGlvbi50cmFuc2xhdGVZKG9mZnNldCkuc3RlcCgpO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBhbmltYXRpb25EYXRhOiB0aGlzLmFuaW1hdGlvbi5leHBvcnQoKSxcbiAgICAgIGlzVmlzaWJsZTogaXNTaG93XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2codGhhdC5kYXRhKVxuICB9LFxuICAvLyDpgInmi6nnirbmgIHmjInpkq5cbiAgc2VsZWN0U3RhdGU6IGZ1bmN0aW9uIChlKSB7XG5cbiAgICB0aGlzLnN0YXJ0QW5pbWF0aW9uKGZhbHNlLCAtMjAwKTtcbiAgICBsZXQgc3RhdHVzID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuc3RhdHVzO1xuICAgIHRoaXMuc2V0RGF0YSh7XG5cbiAgICAgIHN0YXR1cyA6IHN0YXR1cyxcbiAgICAgIFtcIlBvc3RkYXRhLlN0YXRlXCJdOnN0YXR1c1xuXG4gICAgfSk7XG5cbiAgICBsZXQgb3B0aW9ucz10aGlzLmRhdGE7XG4gICAgdGhpcy5BamF4UG9zdCAob3B0aW9ucyk7XG5cbiAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXG5cbiAgfSxcbiAgLy8g5pe26Ze06YCJ5oupXG4gIGJpbmREYXRlQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuXG4gICAgLy9jb25zb2xlLmxvZyhlKTtcblxuICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50eXBlID09IDEpIHtcblxuLy8gICAgICB0aGlzLnNldERhdGEoe1xuLy8gICAgICAgIGJlZ2luOiBlLmRldGFpbC52YWx1ZSxcbi8vICAgICAgICBZZWFyIDogZS5kZXRhaWwudmFsdWUsXG4vLyAgICAgICAgW1wiUG9zdGRhdGEuWWVhclwiXTplLmRldGFpbC52YWx1ZVxuLy8gICAgICB9KVxuXG4gICAgfSBlbHNlIGlmIChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50eXBlID09IDIpIHtcblxuICAgICAgbGV0IFllYXJzPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGVuZDogZS5kZXRhaWwudmFsdWUsXG4gICAgICAgIFllYXIgOiBlLmRldGFpbC52YWx1ZSxcbiAgICAgICAgW1wiUG9zdGRhdGEuWWVhclwiXTplLmRldGFpbC52YWx1ZVxuXG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICBiaW5kS2V5V29yZENoYW5nZTogZnVuY3Rpb24gKGUpIHtcblxuICAgIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgbGV0IEtleVdvcmRzID0gZS5kZXRhaWwudmFsdWU7XG5cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBbXCJQb3N0ZGF0YS5LZXlXb3JkXCJdOktleVdvcmRzXG4gICAgfSk7XG5cbiAgfSxcblxuICBzdXJlRGF0ZVRhcDogZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy5kYXRhLnBhZ2VObyA9IDE7XG4gICAgdGhpcy5zdGFydEFuaW1hdGlvbihmYWxzZSwgLTIwMCk7XG5cbiAgICBsZXQgb3B0aW9ucz10aGlzLmRhdGE7XG4gICAgdGhpcy5BamF4UG9zdCAob3B0aW9ucyk7XG5cbiAgfSxcbiAgLy8g5omn6KGM5Yqo55S7XG4gIHN0YXJ0QWRkcmVzc0FuaW1hdGlvbjogZnVuY3Rpb24gKGlzU2hvdykge1xuXG4gICAgY29uc29sZS5sb2coaXNTaG93KTtcblxuICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICBpZiAoaXNTaG93KSB7XG4gICAgICB0aGF0LmFuaW1hdGlvbi50cmFuc2xhdGVZKDAgKyAndmgnKS5zdGVwKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5hbmltYXRpb24udHJhbnNsYXRlWSg0MCArICd2aCcpLnN0ZXAoKVxuICAgIH1cbiAgICB0aGF0LnNldERhdGEoe1xuICAgICAgYW5pbWF0aW9uQWRkcmVzc01lbnU6IHRoYXQuYW5pbWF0aW9uLmV4cG9ydCgpLFxuICAgICAgYWRkcmVzc01lbnVJc1Nob3c6IGlzU2hvdyxcbiAgICB9KVxuICB9LFxuXG5cbiAgQWpheFBvc3QgOiBmdW5jdGlvbihvcHRpb25zKXtcblxuICAgIGxldCB0aGF0PXRoaXM7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmw6IG9wdGlvbnMuUG9zdFVSTCxcbiAgICAgIGRhdGE6IG9wdGlvbnMuUG9zdGRhdGEsXG5cbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcblxuICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5HZXRVUkwsXG4gICAgICAgIGRhdGE6IG9wdGlvbnMuUG9zdGRhdGEsXG5cbiAgICAgIH0pLnRoZW4oUGVyZm9ybWFuY2UgPT4ge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFBlcmZvcm1hbmNlKTtcblxuICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIExzdEl0ZW06IFBlcmZvcm1hbmNlXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgICAgY29uc29sZS5sb2codGhhdC5kYXRhKTtcbiAgICAgIC8vYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBvcHRpb25zLnVzZXJJbmZvO1xuXG4gICAgfSlcblxuICB9LFxufSJdfQ==