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
    check: true,
    LstItem: [],
    PostURL: app.globalData.BPMHost + "/Login.ashx",
    GetURL: app.globalData.BPMHost + "/MyTasks.ashx",
    Postdata: {
      //        UserAccount:app.globalData.EmpID,
      //        isDebug:true,
      //        isWeixIn:true
    }

  },

  //页面的初始数据、生命周期回调、事件处理函数等
  //https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html

  onShow: function onShow() {

    var that = this;
    //      let UserAccount=app.globalData.EmpID;
    //      //console.log(app.globalData);
    //
    //      that.setData({
    //        ["Postdata.UserAccount"]:UserAccount
    //      });
    //
    //      //console.log(that.data);
    //      let Josonoptions = that.data;
    //      that.AjaxPost(Josonoptions);
  },
  onReady: function onReady() {

    //      let that = this;
    //      let UserAccount=app.globalData.EmpID;
    //      //console.log(app.globalData);
    //
    //      that.setData({
    //        ["Postdata.UserAccount"]:UserAccount
    //      });
    //
    //      //console.log(that.data);
    //      let Josonoptions = that.data;
    //      that.AjaxPost(Josonoptions);

  },
  onLoad: function onLoad(option) {

    var that = this;
    var UserAccount = app.globalData.EmpID;
    console.log(app.globalData);

    that.setData(_defineProperty({}, "Postdata.UserAccount", UserAccount));

    var Josonoptions = that.data;
    that.AjaxPost(Josonoptions);
  },

  AjaxPost: function AjaxPost(options) {
    var _this = this;

    //console.log(options);

    $.ajax({
      method: 'GET',
      url: options.GetURL,
      data: options.Postdata,
      PostJson: true

    }).then(function (X) {

      //console.log(X);

      var that = _this;
      that.setData({
        LstItem: X.children
      });
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


  /** note: 在 wxp 文件或者页面文件中请去掉 methods 包装 */
  methods: {}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJhcHAiLCJnZXRBcHAiLCJuZXR3b3JrIiwicmVxdWlyZSIsIiQiLCJkYXRhIiwiY2hlY2siLCJMc3RJdGVtIiwiUG9zdFVSTCIsImdsb2JhbERhdGEiLCJCUE1Ib3N0IiwiR2V0VVJMIiwiUG9zdGRhdGEiLCJvblNob3ciLCJ0aGF0Iiwib25SZWFkeSIsIm9uTG9hZCIsIm9wdGlvbiIsIlVzZXJBY2NvdW50IiwiRW1wSUQiLCJjb25zb2xlIiwibG9nIiwic2V0RGF0YSIsIkpvc29ub3B0aW9ucyIsIkFqYXhQb3N0Iiwib3B0aW9ucyIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJQb3N0SnNvbiIsInRoZW4iLCJYIiwiY2hpbGRyZW4iLCJvbkNsaWNrIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwibmFtZSIsIlRhc2tJRCIsInRpZCIsIlN0ZXBJRCIsInBpZCIsInd4IiwibmF2aWdhdGVUbyIsIm1ldGhvZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTUMsUUFBVjtBQUNFLElBQUlDLFVBQVVDLFFBQVEsdUJBQVIsQ0FBZDtBQUNBLElBQUtDLElBQUlELFFBQVEsb0JBQVIsQ0FBVDs7QUFjRUUsUUFBTTtBQUNKQyxXQUFPLElBREg7QUFFSkMsYUFBUSxFQUZKO0FBR0pDLGFBQVFSLElBQUlTLFVBQUosQ0FBZUMsT0FBZixHQUF3QixhQUg1QjtBQUlKQyxZQUFPWCxJQUFJUyxVQUFKLENBQWVDLE9BQWYsR0FBd0IsZUFKM0I7QUFLSkUsY0FBVztBQUNqQjtBQUNBO0FBQ0E7QUFIaUI7O0FBTFAsRzs7QUFhTjtBQUNBOztBQUVBQyxRLG9CQUFVOztBQUVSLFFBQUlDLE9BQU8sSUFBWDtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUssRztBQUNEQyxTLHFCQUFTOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUssRztBQUNEQyxRLGtCQUFPQyxNLEVBQU87O0FBRVosUUFBSUgsT0FBTyxJQUFYO0FBQ0EsUUFBSUksY0FBWWxCLElBQUlTLFVBQUosQ0FBZVUsS0FBL0I7QUFDQUMsWUFBUUMsR0FBUixDQUFZckIsSUFBSVMsVUFBaEI7O0FBRUFLLFNBQUtRLE9BQUwscUJBQ0csc0JBREgsRUFDMkJKLFdBRDNCOztBQUlBLFFBQUlLLGVBQWVULEtBQUtULElBQXhCO0FBQ0FTLFNBQUtVLFFBQUwsQ0FBY0QsWUFBZDtBQUVELEc7O0FBQ0RDLFlBQVcsa0JBQVNDLE9BQVQsRUFBaUI7QUFBQTs7QUFFMUI7O0FBRUFyQixNQUFFc0IsSUFBRixDQUFPO0FBQ0xDLGNBQVEsS0FESDtBQUVMQyxXQUFLSCxRQUFRZCxNQUZSO0FBR0xOLFlBQU1vQixRQUFRYixRQUhUO0FBSUxpQixnQkFBUzs7QUFKSixLQUFQLEVBTUdDLElBTkgsQ0FNUSxhQUFLOztBQUVYOztBQUVBLFVBQUloQixPQUFPLEtBQVg7QUFDQUEsV0FBS1EsT0FBTCxDQUFhO0FBQ1hmLGlCQUFVd0IsRUFBRUM7QUFERCxPQUFiO0FBSUQsS0FmRDtBQWlCRCxHOztBQUVEQyxTLG1CQUFRQyxDLEVBQUc7O0FBRVRkLFlBQVFDLEdBQVIsQ0FBWWEsQ0FBWjs7QUFFQSxRQUFJQyxnQkFBZ0JELEVBQUVDLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxJQUE1Qzs7QUFFQSxRQUFJQyxTQUFPSCxjQUFjSSxHQUF6QjtBQUNBLFFBQUlDLFNBQU9MLGNBQWNNLEdBQXpCOztBQUVBO0FBQ047QUFDQTtBQUNBOztBQUVNO0FBQ0FDLE9BQUdDLFVBQUgsQ0FBYztBQUNaZixXQUFLLDhCQUE0QlUsTUFBNUIsR0FBbUMsVUFBbkMsR0FBOENFLE1BQTlDLEdBQXFEO0FBRDlDLEtBQWQ7QUFJRCxHOzs7QUFHRDtBQUNBSSxXQUFTIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBnZXRBcHAoKTtcbiAgdmFyIG5ldHdvcmsgPSByZXF1aXJlKCcuLi8uLi91dGlsL25ldHdvcmsuanMnKTtcbiAgdmFyICAkID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9hamF4LmpzJyk7XG4gIGV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGNvbmZpZzoge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOW+heWKnicsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6IFwiYmxhY2tcIixcbiAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZWVlZWVlXCIsXG4gICAgICBiYWNrZ3JvdW5kVGV4dFN0eWxlOiBcImxpZ2h0XCIsXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ3d4Yy1saXN0JzogJ0BtaW51aS93eGMtbGlzdCcsXG4gICAgICAgICd3eGMtaWNvbic6ICdAbWludWkvd3hjLWljb24nXG4gICAgICB9XG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICBjaGVjazogdHJ1ZSxcbiAgICAgIExzdEl0ZW06W10sXG4gICAgICBQb3N0VVJMOmFwcC5nbG9iYWxEYXRhLkJQTUhvc3QgK1wiL0xvZ2luLmFzaHhcIixcbiAgICAgIEdldFVSTDphcHAuZ2xvYmFsRGF0YS5CUE1Ib3N0ICtcIi9NeVRhc2tzLmFzaHhcIixcbiAgICAgIFBvc3RkYXRhIDoge1xuLy8gICAgICAgIFVzZXJBY2NvdW50OmFwcC5nbG9iYWxEYXRhLkVtcElELFxuLy8gICAgICAgIGlzRGVidWc6dHJ1ZSxcbi8vICAgICAgICBpc1dlaXhJbjp0cnVlXG4gICAgICB9LFxuXG4gICAgfSxcblxuICAgIC8v6aG16Z2i55qE5Yid5aeL5pWw5o2u44CB55Sf5ZG95ZGo5pyf5Zue6LCD44CB5LqL5Lu25aSE55CG5Ye95pWw562JXG4gICAgLy9odHRwczovL2RldmVsb3BlcnMud2VpeGluLnFxLmNvbS9taW5pcHJvZ3JhbS9kZXYvZnJhbWV3b3JrL2FwcC1zZXJ2aWNlL3BhZ2UuaHRtbFxuXG4gICAgb25TaG93ICgpIHtcblxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuLy8gICAgICBsZXQgVXNlckFjY291bnQ9YXBwLmdsb2JhbERhdGEuRW1wSUQ7XG4vLyAgICAgIC8vY29uc29sZS5sb2coYXBwLmdsb2JhbERhdGEpO1xuLy9cbi8vICAgICAgdGhhdC5zZXREYXRhKHtcbi8vICAgICAgICBbXCJQb3N0ZGF0YS5Vc2VyQWNjb3VudFwiXTpVc2VyQWNjb3VudFxuLy8gICAgICB9KTtcbi8vXG4vLyAgICAgIC8vY29uc29sZS5sb2codGhhdC5kYXRhKTtcbi8vICAgICAgbGV0IEpvc29ub3B0aW9ucyA9IHRoYXQuZGF0YTtcbi8vICAgICAgdGhhdC5BamF4UG9zdChKb3Nvbm9wdGlvbnMpO1xuXG4gICAgfSxcbiAgICBvblJlYWR5KCl7XG5cbi8vICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuLy8gICAgICBsZXQgVXNlckFjY291bnQ9YXBwLmdsb2JhbERhdGEuRW1wSUQ7XG4vLyAgICAgIC8vY29uc29sZS5sb2coYXBwLmdsb2JhbERhdGEpO1xuLy9cbi8vICAgICAgdGhhdC5zZXREYXRhKHtcbi8vICAgICAgICBbXCJQb3N0ZGF0YS5Vc2VyQWNjb3VudFwiXTpVc2VyQWNjb3VudFxuLy8gICAgICB9KTtcbi8vXG4vLyAgICAgIC8vY29uc29sZS5sb2codGhhdC5kYXRhKTtcbi8vICAgICAgbGV0IEpvc29ub3B0aW9ucyA9IHRoYXQuZGF0YTtcbi8vICAgICAgdGhhdC5BamF4UG9zdChKb3Nvbm9wdGlvbnMpO1xuXG4gICAgfSxcbiAgICBvbkxvYWQob3B0aW9uKXtcblxuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgbGV0IFVzZXJBY2NvdW50PWFwcC5nbG9iYWxEYXRhLkVtcElEO1xuICAgICAgY29uc29sZS5sb2coYXBwLmdsb2JhbERhdGEpO1xuXG4gICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICBbXCJQb3N0ZGF0YS5Vc2VyQWNjb3VudFwiXTpVc2VyQWNjb3VudFxuICAgICAgfSk7XG5cbiAgICAgIGxldCBKb3Nvbm9wdGlvbnMgPSB0aGF0LmRhdGE7XG4gICAgICB0aGF0LkFqYXhQb3N0KEpvc29ub3B0aW9ucyk7XG5cbiAgICB9LFxuICAgIEFqYXhQb3N0IDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cbiAgICAgIC8vY29uc29sZS5sb2cob3B0aW9ucyk7XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5HZXRVUkwsXG4gICAgICAgIGRhdGE6IG9wdGlvbnMuUG9zdGRhdGEsXG4gICAgICAgIFBvc3RKc29uOnRydWVcblxuICAgICAgfSkudGhlbihYID0+IHtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKFgpO1xuXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICBMc3RJdGVtIDogWC5jaGlsZHJlblxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgb25DbGljayhlKSB7XG5cbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgICBsZXQgY3VycmVudFRhcmdldCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWU7XG5cbiAgICAgIGxldCBUYXNrSUQ9Y3VycmVudFRhcmdldC50aWQ7XG4gICAgICBsZXQgU3RlcElEPWN1cnJlbnRUYXJnZXQucGlkO1xuXG4gICAgICAvL+WFs+mXreW9k+WJjemhtemdou+8jOi3s+i9rOWIsOW6lOeUqOWGheeahOafkOS4qumhtemdolxuLy8gICAgICB3eC5yZWRpcmVjdFRvKHtcbi8vICAgICAgICB1cmw6ICcuLi9UYXNrSW5mby9pbmRleD9UYXNrSUQ9JytUYXNrSUQrJyZTdGVwSUQ9JytTdGVwSUQrJydcbi8vICAgICAgfSk7XG5cbiAgICAgIC8v5L+d55WZ5b2T5YmN6aG16Z2i77yM6Lez6L2s5Yiw5bqU55So5YaF55qE5p+Q5Liq6aG16Z2i77yM5L2/55SoIHd4Lm5hdmlnYXRlQmFjayDlj6/ku6Xov5Tlm57liLDljp/pobXpnaJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuLi9UYXNrSW5mby9pbmRleD9UYXNrSUQ9JytUYXNrSUQrJyZTdGVwSUQ9JytTdGVwSUQrJydcbiAgICAgIH0pXG5cbiAgICB9LFxuXG5cbiAgICAvKiogbm90ZTog5ZyoIHd4cCDmlofku7bmiJbogIXpobXpnaLmlofku7bkuK3or7fljrvmjokgbWV0aG9kcyDljIXoo4UgKi9cbiAgICBtZXRob2RzOiB7XG5cbiAgICB9XG4gIH0iXX0=