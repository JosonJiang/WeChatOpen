'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var network = require('../../util/network.js');
var $ = require('../../util/ajax.js');

exports.default = Page({
  data: {
    LstItem: [],
    PostURL: app.globalData.BPMHost + "/Login.ashx",
    GetURL: app.globalData.BPMHost + "/MyProcessed.ashx",
    Postdata: { uid: "SDT12872", pwd: "Joson080256", UserAccount: "SDT12872", isDebug: true, isWeixIn: true }
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

        console.log(Performance);

        that.setData({
          LstItem: Performance.children
        });
      });

      console.log(that.data);
      //app.globalData.userInfo = options.userInfo;
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJhcHAiLCJnZXRBcHAiLCJuZXR3b3JrIiwicmVxdWlyZSIsIiQiLCJkYXRhIiwiTHN0SXRlbSIsIlBvc3RVUkwiLCJnbG9iYWxEYXRhIiwiQlBNSG9zdCIsIkdldFVSTCIsIlBvc3RkYXRhIiwidWlkIiwicHdkIiwiVXNlckFjY291bnQiLCJpc0RlYnVnIiwiaXNXZWl4SW4iLCJvbkNsaWNrIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsIm5hbWUiLCJUYXNrSUQiLCJ0aWQiLCJTdGVwSUQiLCJwaWQiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJvblNob3ciLCJvcHRpb25zIiwib25Mb2FkIiwib3B0aW9uIiwidGhhdCIsIkpvc29ub3B0aW9ucyIsIkFqYXhQb3N0IiwiYWpheCIsIm1ldGhvZCIsInRoZW4iLCJQZXJmb3JtYW5jZSIsInNldERhdGEiLCJjaGlsZHJlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFJQSxNQUFNQyxRQUFWO0FBQ0UsSUFBSUMsVUFBVUMsUUFBUSx1QkFBUixDQUFkO0FBQ0EsSUFBS0MsSUFBSUQsUUFBUSxvQkFBUixDQUFUOzs7QUFVRUUsUUFBTTtBQUNKQyxhQUFRLEVBREo7QUFFSkMsYUFBUVAsSUFBSVEsVUFBSixDQUFlQyxPQUFmLEdBQXdCLGFBRjVCO0FBR0pDLFlBQU9WLElBQUlRLFVBQUosQ0FBZUMsT0FBZixHQUF3QixtQkFIM0I7QUFJSkUsY0FBVyxFQUFDQyxLQUFJLFVBQUwsRUFBZ0JDLEtBQUksYUFBcEIsRUFBa0NDLGFBQVksVUFBOUMsRUFBeURDLFNBQVEsSUFBakUsRUFBc0VDLFVBQVMsSUFBL0U7QUFKUCxHO0FBTU5DLFMsbUJBQVFDLEMsRUFBRzs7QUFFVEMsWUFBUUMsR0FBUixDQUFZRixDQUFaOztBQUVBLFFBQUlHLGdCQUFnQkgsRUFBRUcsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLElBQTVDOztBQUVBLFFBQUlDLFNBQU9ILGNBQWNJLEdBQXpCO0FBQ0EsUUFBSUMsU0FBT0wsY0FBY00sR0FBekI7O0FBRUE7QUFDTjtBQUNBO0FBQ0E7O0FBRU07QUFDQUMsT0FBR0MsVUFBSCxDQUFjO0FBQ1pDLFdBQUssOEJBQTRCTixNQUE1QixHQUFtQyxVQUFuQyxHQUE4Q0UsTUFBOUMsR0FBcUQ7QUFEOUMsS0FBZDtBQUlELEc7QUFFREssUSxrQkFBUUMsTyxFQUFTLENBRWhCLEM7QUFFREMsUSxrQkFBT0MsTSxFQUFPOztBQUVaLFFBQUlDLE9BQU8sSUFBWDtBQUNBLFFBQUlDLGVBQWVELEtBQUs5QixJQUF4QjtBQUNBOEIsU0FBS0UsUUFBTCxDQUFjRCxZQUFkO0FBRUQsRzs7QUFDREMsWUFBVyxrQkFBU0wsT0FBVCxFQUFpQjs7QUFFMUIsUUFBSUcsT0FBSyxJQUFUOztBQUVBL0IsTUFBRWtDLElBQUYsQ0FBTztBQUNMQyxjQUFRLE1BREg7QUFFTFQsV0FBS0UsUUFBUXpCLE9BRlI7QUFHTEYsWUFBTTJCLFFBQVFyQjs7QUFIVCxLQUFQLEVBS0c2QixJQUxILENBS1Esb0JBQVk7O0FBRWxCOztBQUVBcEMsUUFBRWtDLElBQUYsQ0FBTztBQUNMQyxnQkFBUSxLQURIO0FBRUxULGFBQUtFLFFBQVF0QixNQUZSO0FBR0xMLGNBQU0yQixRQUFRckI7O0FBSFQsT0FBUCxFQUtHNkIsSUFMSCxDQUtRLHVCQUFlOztBQUVyQnJCLGdCQUFRQyxHQUFSLENBQVlxQixXQUFaOztBQUVBTixhQUFLTyxPQUFMLENBQWE7QUFDWHBDLG1CQUFTbUMsWUFBWUU7QUFEVixTQUFiO0FBSUQsT0FiRDs7QUFlQXhCLGNBQVFDLEdBQVIsQ0FBWWUsS0FBSzlCLElBQWpCO0FBQ0E7QUFFRCxLQTNCRDtBQTZCRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gZ2V0QXBwKCk7XG4gIHZhciBuZXR3b3JrID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9uZXR3b3JrLmpzJyk7XG4gIHZhciAgJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvYWpheC5qcycpO1xuXG4gIGV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb25maWc6IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTlrqHmibknLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtbGlzdCc6ICdAbWludWkvd3hjLWxpc3QnLFxuICAgICAgICAnd3hjLWljb24nOiAnQG1pbnVpL3d4Yy1pY29uJ1xuICAgICAgfVxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgTHN0SXRlbTpbXSxcbiAgICAgIFBvc3RVUkw6YXBwLmdsb2JhbERhdGEuQlBNSG9zdCArXCIvTG9naW4uYXNoeFwiLFxuICAgICAgR2V0VVJMOmFwcC5nbG9iYWxEYXRhLkJQTUhvc3QgK1wiL015UHJvY2Vzc2VkLmFzaHhcIixcbiAgICAgIFBvc3RkYXRhIDoge3VpZDpcIlNEVDEyODcyXCIscHdkOlwiSm9zb24wODAyNTZcIixVc2VyQWNjb3VudDpcIlNEVDEyODcyXCIsaXNEZWJ1Zzp0cnVlLGlzV2VpeEluOnRydWV9LFxuICAgIH0sXG4gICAgb25DbGljayhlKSB7XG5cbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgICB2YXIgY3VycmVudFRhcmdldCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Lm5hbWU7XG5cbiAgICAgIGxldCBUYXNrSUQ9Y3VycmVudFRhcmdldC50aWQ7XG4gICAgICBsZXQgU3RlcElEPWN1cnJlbnRUYXJnZXQucGlkO1xuXG4gICAgICAvL+WFs+mXreW9k+WJjemhtemdou+8jOi3s+i9rOWIsOW6lOeUqOWGheeahOafkOS4qumhtemdolxuLy8gICAgICB3eC5yZWRpcmVjdFRvKHtcbi8vICAgICAgICB1cmw6ICcuLi9UYXNrSW5mby9pbmRleD9UYXNrSUQ9JytUYXNrSUQrJyZTdGVwSUQ9JytTdGVwSUQrJydcbi8vICAgICAgfSk7XG5cbiAgICAgIC8v5L+d55WZ5b2T5YmN6aG16Z2i77yM6Lez6L2s5Yiw5bqU55So5YaF55qE5p+Q5Liq6aG16Z2i77yM5L2/55SoIHd4Lm5hdmlnYXRlQmFjayDlj6/ku6Xov5Tlm57liLDljp/pobXpnaJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuLi9UYXNrSW5mby9pbmRleD9UYXNrSUQ9JytUYXNrSUQrJyZTdGVwSUQ9JytTdGVwSUQrJydcbiAgICAgIH0pXG5cbiAgICB9LFxuXG4gICAgb25TaG93IChvcHRpb25zKSB7XG5cbiAgICB9LFxuXG4gICAgb25Mb2FkKG9wdGlvbil7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBKb3Nvbm9wdGlvbnMgPSB0aGF0LmRhdGE7XG4gICAgICB0aGF0LkFqYXhQb3N0KEpvc29ub3B0aW9ucyk7XG5cbiAgICB9LFxuICAgIEFqYXhQb3N0IDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cbiAgICAgIGxldCB0aGF0PXRoaXM7XG5cbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6IG9wdGlvbnMuUG9zdFVSTCxcbiAgICAgICAgZGF0YTogb3B0aW9ucy5Qb3N0ZGF0YSxcblxuICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5HZXRVUkwsXG4gICAgICAgICAgZGF0YTogb3B0aW9ucy5Qb3N0ZGF0YSxcblxuICAgICAgICB9KS50aGVuKFBlcmZvcm1hbmNlID0+IHtcblxuICAgICAgICAgIGNvbnNvbGUubG9nKFBlcmZvcm1hbmNlKTtcblxuICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICBMc3RJdGVtOiBQZXJmb3JtYW5jZS5jaGlsZHJlblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoYXQuZGF0YSk7XG4gICAgICAgIC8vYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBvcHRpb25zLnVzZXJJbmZvO1xuXG4gICAgICB9KVxuXG4gICAgfSxcbiAgfSJdfQ==