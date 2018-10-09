'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = getApp();
var network = require('../../util/network.js');
var $ = require('../../util/ajax.js');

var thisutil = require('../../util/util.js');

thisutil.StartPullDownRefreh(undefined, app);

exports.default = Page({
  data: {

    Application: {},
    FormInfo: {},
    PostURL: app.globalData.BPMHost + "/Mobile.ashx?UserAccount=SDT12872&Method=TaskProcess",
    GetURL: app.globalData.BPMHost + "/Mobile.ashx?UserAccount=SDT12872&Method=GetFormInfo",
    Postdata: {
      Comment: "审批通过",
      isDebug: true,
      isWeixIn: true
    },
    $toast: {
      show: false,
      icon: "yes",
      iconColor: "#333",
      msg: "审批成功"
    },
    visible: false,
    actions: [{
      name: '选项1',
      color: '#ed3f14'
    }, {
      name: '选项2'
    }, {
      name: '去分享',
      icon: 'share',
      openType: 'share'
    }]

  },

  bindblur: function bindblur(e) {

    console.log(e);

    this.setData(_defineProperty({}, "Postdata.Comment", e.detail.value));
  },
  onClickLeft: function onClickLeft() {

    //    wx.redirectTo({
    //      url: '../MyTasks/index?tid=701461'
    //    });

    wx.navigateTo({
      url: '../TaskTrace/index?TaskID=' + this.data.Postdata.TaskID
    });
  },
  onShow: function onShow(options) {

    var that = this;
  },
  onLoad: function onLoad(option) {
    var _that$setData;

    console.log(option);

    var that = this;
    var Josonoptions = that.data;

    var StepID = option.StepID;
    var TaskID = option.TaskID;

    that.setData((_that$setData = {}, _defineProperty(_that$setData, "Postdata.TaskID", TaskID), _defineProperty(_that$setData, "Postdata.StepID", StepID), _that$setData));

    that.AjaxPost(Josonoptions);
  },


  AjaxPost: function AjaxPost(options) {
    var _this = this;

    var that = this;

    $.ajax({
      method: 'Post',
      url: options.GetURL,
      data: options.Postdata,
      PostJson: true

      //contentType:"application/json;charset=gb2312"

    }).then(function (response) {

      console.log(response);

      if (response.success === false) {

        var responseMsg = response.errorMessage;
        that.setData({
          $toast: {
            show: true,
            icon: "close",
            iconColor: "#fff",
            msg: responseMsg
          }
        });

        setTimeout(function () {
          _this.setData({
            $toast: {
              show: false
            }
          });

          wx.navigateBack();
        }, 1500);

        //console.log(that.data.$toast);
      } else {

        console.log(response);

        var TaskCommList = [];
        var ButtonList = [];
        var FormInfoTitleArry = [];
        var FormInfoBodyArry = [];
        var TaskCommArry = [];
        var FormInfoTitle = response.FormInfo[0] ? response.FormInfo[0].Rows : [];
        var FormInfoBody = response.FormInfo[1] ? response.FormInfo[1].Rows : [];
        var BtnList = response.ButtonList || [];
        var TaskComm = response.TaskCommList[0] ? response.TaskCommList[0] : [];

        //console.log(TaskComm);

        FormInfoTitle.forEach(function (item, index, arrys) {
          for (var ix in item) {
            var val = item[ix];
            if (val.Value.length > 0) FormInfoTitleArry.push(val);
          }
        });

        FormInfoBody.forEach(function (item, index, arrys) {

          for (var ix in item) {
            var val = item[ix];
            if (val.Value.length > 0) FormInfoBodyArry.push(val);
          }
        });

        BtnList.forEach(function (Itemval, index, arrys) {
          var Text = Itemval.Text,
              Action = Itemval.Action,
              Type = Itemval.Type;

          var Val = {
            name: Text,
            color: '#ee3f14',
            Text: Text,
            Action: Action,
            Type: Type
          };

          ButtonList.push(Val);
        });

        for (var Item in TaskComm) {

          var Title = "",
              ShowValue = "";
          var Text = Item,
              Value = TaskComm[Item];

          switch (Text) {
            case "ProcessName":
              Title = "流程名称";break;
            case "SerialNum":
              Title = "流程编号";break;
            case "CreateAt":
              Title = "提交时间";break;
            case "OwnerFullName":
              Title = "流程发起人";break;
            //case "ApplicantAccount" :Title="发起人工号"; break;
            case "TaskState":
              Title = "流程状态";break;
            default:
              Title = "";
          }

          switch (Value) {
            case "Running":
              ShowValue = "进行中";break;
            case "Approved":
              ShowValue = "已完成";break;
            case "Rejected":
              ShowValue = "已拒绝";break;
            case "Aborted":
              ShowValue = "已退回";break;
            default:
              ShowValue = Value;
          }

          var Val = {
            Title: Title,
            Value: ShowValue
          };

          if (Title.length > 0 && ShowValue !== "null") {

            //console.log(Title,":",ShowValue);
            TaskCommList.push(Val);
          }
          //console.log(Item,":",TaskComm[Item]);
        }

        //      console.log(TaskCommList);
        //      console.log(ButtonList);
        //      console.log(FormInfoTitleArry);
        //      console.log(FormInfoBodyArry);

        that.setData({
          Application: FormInfoTitleArry,
          FormInfo: FormInfoBodyArry,
          actions: ButtonList,
          TaskCommInfo: TaskCommList,
          ShowBtn: ButtonList.length > 0
        });

        console.log(that.data);
      }
    });
  },

  handleOpen: function handleOpen(e) {
    this.setData({
      visible: true
    });
    console.log(e);
  },
  handleCancel: function handleCancel() {
    this.setData({
      visible: false
    });
  },
  handleClickItem: function handleClickItem(_ref) {
    var _this2 = this;

    var detail = _ref.detail;


    var index = detail.index;
    var action = [].concat(_toConsumableArray(this.data.actions));
    var PostAction = action[index];
    //console.log(action);

    var content = '点击了选项' + index;
    console.log(content);
    console.log(PostAction);

    var options = this.data;

    var Action = PostAction.Action;
    var Type = PostAction.Type;

    var Transfer_TransferTo = null;
    var Consign_ConsignUsers = null;
    var RecedeBack_ToStepID = null;

    options.Postdata.Action = Action;
    options.Postdata.Type = Type;

    options.Postdata.Transfer_TransferTo = Transfer_TransferTo;
    options.Postdata.Consign_ConsignUsers = Consign_ConsignUsers;
    options.Postdata.RecedeBack_ToStepID = RecedeBack_ToStepID;

    console.log(options);

    $.ajax({
      method: 'Post',
      url: options.PostURL,
      data: options.Postdata,
      PostJson: true

    }).then(function (response) {

      console.log(response);

      //let msg=response.msg;

      if (response.success) {

        _this2.setData({
          $toast: {
            show: true
          }
        });
        setTimeout(function () {
          _this2.setData({
            $toast: {
              show: false
            },
            visible: false
          });

          wx.redirectTo({
            url: '../MyTasks/index?'
          });
        }, 1500);
      } else {

        _this2.setData({
          $toast: {
            show: true,
            msg: msg
          }
        });
      }
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJhcHAiLCJnZXRBcHAiLCJuZXR3b3JrIiwicmVxdWlyZSIsIiQiLCJ0aGlzdXRpbCIsIlN0YXJ0UHVsbERvd25SZWZyZWgiLCJkYXRhIiwiQXBwbGljYXRpb24iLCJGb3JtSW5mbyIsIlBvc3RVUkwiLCJnbG9iYWxEYXRhIiwiQlBNSG9zdCIsIkdldFVSTCIsIlBvc3RkYXRhIiwiQ29tbWVudCIsImlzRGVidWciLCJpc1dlaXhJbiIsIiR0b2FzdCIsInNob3ciLCJpY29uIiwiaWNvbkNvbG9yIiwibXNnIiwidmlzaWJsZSIsImFjdGlvbnMiLCJuYW1lIiwiY29sb3IiLCJvcGVuVHlwZSIsImJpbmRibHVyIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJzZXREYXRhIiwiZGV0YWlsIiwidmFsdWUiLCJvbkNsaWNrTGVmdCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIlRhc2tJRCIsIm9uU2hvdyIsIm9wdGlvbnMiLCJ0aGF0Iiwib25Mb2FkIiwib3B0aW9uIiwiSm9zb25vcHRpb25zIiwiU3RlcElEIiwiQWpheFBvc3QiLCJhamF4IiwibWV0aG9kIiwiUG9zdEpzb24iLCJ0aGVuIiwicmVzcG9uc2UiLCJzdWNjZXNzIiwicmVzcG9uc2VNc2ciLCJlcnJvck1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiVGFza0NvbW1MaXN0IiwiQnV0dG9uTGlzdCIsIkZvcm1JbmZvVGl0bGVBcnJ5IiwiRm9ybUluZm9Cb2R5QXJyeSIsIlRhc2tDb21tQXJyeSIsIkZvcm1JbmZvVGl0bGUiLCJSb3dzIiwiRm9ybUluZm9Cb2R5IiwiQnRuTGlzdCIsIlRhc2tDb21tIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImFycnlzIiwiaXgiLCJ2YWwiLCJWYWx1ZSIsImxlbmd0aCIsInB1c2giLCJJdGVtdmFsIiwiVGV4dCIsIkFjdGlvbiIsIlR5cGUiLCJWYWwiLCJJdGVtIiwiVGl0bGUiLCJTaG93VmFsdWUiLCJUYXNrQ29tbUluZm8iLCJTaG93QnRuIiwiaGFuZGxlT3BlbiIsImhhbmRsZUNhbmNlbCIsImhhbmRsZUNsaWNrSXRlbSIsImFjdGlvbiIsIlBvc3RBY3Rpb24iLCJjb250ZW50IiwiVHJhbnNmZXJfVHJhbnNmZXJUbyIsIkNvbnNpZ25fQ29uc2lnblVzZXJzIiwiUmVjZWRlQmFja19Ub1N0ZXBJRCIsInJlZGlyZWN0VG8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxNQUFNQyxRQUFWO0FBQ0UsSUFBSUMsVUFBVUMsUUFBUSx1QkFBUixDQUFkO0FBQ0EsSUFBS0MsSUFBSUQsUUFBUSxvQkFBUixDQUFUOztBQUVBLElBQUlFLFdBQVdGLFFBQVEsb0JBQVIsQ0FBZjs7QUFFQUUsU0FBU0MsbUJBQVQsWUFBa0NOLEdBQWxDOzs7QUFlQU8sUUFBTTs7QUFFSkMsaUJBQVksRUFGUjtBQUdKQyxjQUFTLEVBSEw7QUFJSkMsYUFBUVYsSUFBSVcsVUFBSixDQUFlQyxPQUFmLEdBQXdCLHNEQUo1QjtBQUtKQyxZQUFPYixJQUFJVyxVQUFKLENBQWVDLE9BQWYsR0FBd0Isc0RBTDNCO0FBTUpFLGNBQVc7QUFDVEMsZUFBUSxNQURDO0FBRVRDLGVBQVEsSUFGQztBQUdUQyxnQkFBUztBQUhBLEtBTlA7QUFXSkMsWUFBUTtBQUNOQyxZQUFNLEtBREE7QUFFTkMsWUFBSyxLQUZDO0FBR05DLGlCQUFVLE1BSEo7QUFJTkMsV0FBSztBQUpDLEtBWEo7QUFpQkpDLGFBQVEsS0FqQko7QUFrQkpDLGFBQVMsQ0FDUDtBQUNFQyxZQUFNLEtBRFI7QUFFRUMsYUFBTztBQUZULEtBRE8sRUFLUDtBQUNFRCxZQUFNO0FBRFIsS0FMTyxFQVFQO0FBQ0VBLFlBQU0sS0FEUjtBQUVFTCxZQUFNLE9BRlI7QUFHRU8sZ0JBQVU7QUFIWixLQVJPOztBQWxCTCxHOztBQW9DTkMsVSxvQkFBU0MsQyxFQUFFOztBQUVUQyxZQUFRQyxHQUFSLENBQVlGLENBQVo7O0FBRUEsU0FBS0csT0FBTCxxQkFDRyxrQkFESCxFQUN3QkgsRUFBRUks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YUFERztBQUlYSSxxQkFBUTtBQUpHLFdBQWI7O0FBT0FhLGFBQUc0RCxVQUFILENBQWM7QUFDWjFELGlCQUFLO0FBRE8sV0FBZDtBQUlELFNBWkQsRUFZRyxJQVpIO0FBY0gsT0FyQkQsTUFxQks7O0FBRUgsZUFBS04sT0FBTCxDQUFhO0FBQ1hkLGtCQUFRO0FBQ05DLGtCQUFNLElBREE7QUFFTkcsaUJBQUlBO0FBRkU7QUFERyxTQUFiO0FBTUQ7QUFFRixLQTNDRDtBQTZDRCIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gZ2V0QXBwKCk7XG4gIHZhciBuZXR3b3JrID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9uZXR3b3JrLmpzJyk7XG4gIHZhciAgJCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvYWpheC5qcycpO1xuXG4gIHZhciB0aGlzdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvdXRpbC5qcycpO1xuXG4gIHRoaXN1dGlsLlN0YXJ0UHVsbERvd25SZWZyZWgodGhpcyxhcHApO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmtYHnqIvkv6Hmga8nLFxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDp0cnVlLFxuICAgIHVzaW5nQ29tcG9uZW50czoge1xuICAgICAgJ3d4Yy1pY29uJzogJ3d4Yy1pY29uJyxcbiAgICAgICd3eGMtbmF2YmFyJzogJ3d4Yy1uYXZiYXInLFxuICAgICAgXCJpLWFjdGlvbi1zaGVldFwiOiAnd3hjLWFjdGlvbnNoZWV0JyxcbiAgICAgIFwiaS1idXR0b25cIjogJ3d4Yy1idXR0b24nLFxuICAgICAgJ3d4Yy10b2FzdCc6ICdAbWludWkvd3hjLXRvYXN0JyxcbiAgICAgICd3eGMtaW5wdXQnOiAnQG1pbnVpL3d4Yy1pbnB1dCdcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHtcblxuICAgIEFwcGxpY2F0aW9uOnt9LFxuICAgIEZvcm1JbmZvOnt9LFxuICAgIFBvc3RVUkw6YXBwLmdsb2JhbERhdGEuQlBNSG9zdCArXCIvTW9iaWxlLmFzaHg/VXNlckFjY291bnQ9U0RUMTI4NzImTWV0aG9kPVRhc2tQcm9jZXNzXCIsXG4gICAgR2V0VVJMOmFwcC5nbG9iYWxEYXRhLkJQTUhvc3QgK1wiL01vYmlsZS5hc2h4P1VzZXJBY2NvdW50PVNEVDEyODcyJk1ldGhvZD1HZXRGb3JtSW5mb1wiLFxuICAgIFBvc3RkYXRhIDoge1xuICAgICAgQ29tbWVudDpcIuWuoeaJuemAmui/h1wiLFxuICAgICAgaXNEZWJ1Zzp0cnVlLFxuICAgICAgaXNXZWl4SW46dHJ1ZVxuICAgIH0sXG4gICAgJHRvYXN0OiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIGljb246XCJ5ZXNcIixcbiAgICAgIGljb25Db2xvcjpcIiMzMzNcIixcbiAgICAgIG1zZzogXCLlrqHmibnmiJDlip9cIlxuICAgIH0sXG4gICAgdmlzaWJsZTpmYWxzZSxcbiAgICBhY3Rpb25zOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICfpgInpobkxJyxcbiAgICAgICAgY29sb3I6ICcjZWQzZjE0J1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ+mAiemhuTInXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAn5Y675YiG5LqrJyxcbiAgICAgICAgaWNvbjogJ3NoYXJlJyxcbiAgICAgICAgb3BlblR5cGU6ICdzaGFyZSdcbiAgICAgIH1cbiAgICBdLFxuXG4gIH0sXG5cblxuICBiaW5kYmx1cihlKXtcblxuICAgIGNvbnNvbGUubG9nKGUpO1xuXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIFtcIlBvc3RkYXRhLkNvbW1lbnRcIl06IGUuZGV0YWlsLnZhbHVlLFxuICAgIH0pXG5cbiAgfSxcblxuXG4gIG9uQ2xpY2tMZWZ0KCkge1xuXG5cbi8vICAgIHd4LnJlZGlyZWN0VG8oe1xuLy8gICAgICB1cmw6ICcuLi9NeVRhc2tzL2luZGV4P3RpZD03MDE0NjEnXG4vLyAgICB9KTtcblxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vVGFza1RyYWNlL2luZGV4P1Rhc2tJRD0nK3RoaXMuZGF0YS5Qb3N0ZGF0YS5UYXNrSURcbiAgICB9KTtcblxuXG4gIH0sXG5cbiAgb25TaG93IChvcHRpb25zKSB7XG5cbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgfSxcblxuICBvbkxvYWQob3B0aW9uKXtcblxuICAgIGNvbnNvbGUubG9nKG9wdGlvbik7XG5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIEpvc29ub3B0aW9ucyA9IHRoYXQuZGF0YTtcblxuICAgIGxldCBTdGVwSUQ9b3B0aW9uLlN0ZXBJRDtcbiAgICBsZXQgVGFza0lEPW9wdGlvbi5UYXNrSUQ7XG5cbiAgICB0aGF0LnNldERhdGEoe1xuXG4gICAgICBbXCJQb3N0ZGF0YS5UYXNrSURcIl06VGFza0lELFxuICAgICAgW1wiUG9zdGRhdGEuU3RlcElEXCJdOlN0ZXBJRCxcblxuLy8gICAgICBQb3N0ZGF0YTp7XG4vLyAgICAgICAgVGFza0lEOlRhc2tJRCxcbi8vICAgICAgICBTdGVwSUQ6U3RlcElELFxuLy8gICAgICB9XG5cbiAgICB9KTtcblxuICAgIHRoYXQuQWpheFBvc3QoSm9zb25vcHRpb25zKTtcblxuICB9LFxuXG4gIEFqYXhQb3N0IDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cbiAgICBsZXQgdGhhdD10aGlzO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIG1ldGhvZDogJ1Bvc3QnLFxuICAgICAgdXJsOiBvcHRpb25zLkdldFVSTCxcbiAgICAgIGRhdGE6IG9wdGlvbnMuUG9zdGRhdGEsXG4gICAgICBQb3N0SnNvbjp0cnVlLFxuXG4gICAgICAvL2NvbnRlbnRUeXBlOlwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PWdiMjMxMlwiXG5cbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcblxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG5cbiAgICAgIGlmKHJlc3BvbnNlLnN1Y2Nlc3M9PT1mYWxzZSl7XG5cbiAgICAgICAgbGV0IHJlc3BvbnNlTXNnPXJlc3BvbnNlLmVycm9yTWVzc2FnZTtcbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICAkdG9hc3Q6IHtcbiAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICBpY29uOlwiY2xvc2VcIixcbiAgICAgICAgICAgIGljb25Db2xvcjpcIiNmZmZcIixcbiAgICAgICAgICAgIG1zZyA6IHJlc3BvbnNlTXNnXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgJHRvYXN0OiB7XG4gICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soKTtcblxuICAgICAgICB9LCAxNTAwKTtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoYXQuZGF0YS4kdG9hc3QpO1xuXG4gICAgICB9ZWxzZXtcblxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICBsZXQgVGFza0NvbW1MaXN0PVtdO1xuICAgICAgbGV0IEJ1dHRvbkxpc3Q9W107XG4gICAgICBsZXQgRm9ybUluZm9UaXRsZUFycnk9W107XG4gICAgICBsZXQgRm9ybUluZm9Cb2R5QXJyeT1bXTtcbiAgICAgIGxldCBUYXNrQ29tbUFycnk9W107XG4gICAgICBsZXQgRm9ybUluZm9UaXRsZT0gcmVzcG9uc2UuRm9ybUluZm9bMF0gPyByZXNwb25zZS5Gb3JtSW5mb1swXS5Sb3dzIDogW107XG4gICAgICBsZXQgRm9ybUluZm9Cb2R5PXJlc3BvbnNlLkZvcm1JbmZvWzFdID8gcmVzcG9uc2UuRm9ybUluZm9bMV0uUm93cyA6IFtdO1xuICAgICAgbGV0IEJ0bkxpc3Q9IHJlc3BvbnNlLkJ1dHRvbkxpc3QgfHwgW107XG4gICAgICBsZXQgVGFza0NvbW09cmVzcG9uc2UuVGFza0NvbW1MaXN0WzBdID8gcmVzcG9uc2UuVGFza0NvbW1MaXN0WzBdIDogW107XG5cbiAgICAgIC8vY29uc29sZS5sb2coVGFza0NvbW0pO1xuXG4gICAgICBGb3JtSW5mb1RpdGxlLmZvckVhY2goZnVuY3Rpb24oaXRlbSxpbmRleCxhcnJ5cyl7XG4gICAgICAgIGZvcih2YXIgaXggaW4gaXRlbSlcbiAgICAgICAge1xuICAgICAgICAgIGxldCB2YWw9IGl0ZW1baXhdO1xuICAgICAgICAgIGlmKHZhbC5WYWx1ZS5sZW5ndGg+MClcbiAgICAgICAgICBGb3JtSW5mb1RpdGxlQXJyeS5wdXNoKHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBGb3JtSW5mb0JvZHkuZm9yRWFjaChmdW5jdGlvbihpdGVtLGluZGV4LGFycnlzKXtcblxuICAgICAgICAgIGZvcih2YXIgaXggaW4gaXRlbSlcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdmFsPSBpdGVtW2l4XTtcbiAgICAgICAgICAgIGlmKHZhbC5WYWx1ZS5sZW5ndGg+MClcbiAgICAgICAgICAgICAgRm9ybUluZm9Cb2R5QXJyeS5wdXNoKHZhbCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICBCdG5MaXN0LmZvckVhY2goZnVuY3Rpb24oSXRlbXZhbCxpbmRleCxhcnJ5cyl7XG4gICAgICAgIGxldCBUZXh0PUl0ZW12YWwuVGV4dCxcbiAgICAgICAgICAgIEFjdGlvbj1JdGVtdmFsLkFjdGlvbixcbiAgICAgICAgICAgIFR5cGU9SXRlbXZhbC5UeXBlO1xuXG4gICAgICAgIGxldCBWYWw9e1xuICAgICAgICAgIG5hbWUgOlRleHQsXG4gICAgICAgICAgY29sb3I6ICcjZWUzZjE0JyxcbiAgICAgICAgICBUZXh0OlRleHQsXG4gICAgICAgICAgQWN0aW9uIDpBY3Rpb24sXG4gICAgICAgICAgVHlwZSA6VHlwZVxuICAgICAgICB9O1xuXG4gICAgICAgICAgQnV0dG9uTGlzdC5wdXNoKFZhbCk7XG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICBmb3IodmFyIEl0ZW0gaW4gVGFza0NvbW0pIHtcblxuICAgICAgICAgIHZhciBUaXRsZT1cIlwiLFNob3dWYWx1ZT1cIlwiO1xuICAgICAgICAgIGxldCBUZXh0PUl0ZW0sVmFsdWU9VGFza0NvbW1bSXRlbV07XG5cbiAgICAgICAgICBzd2l0Y2goVGV4dCl7XG4gICAgICAgICAgICBjYXNlIFwiUHJvY2Vzc05hbWVcIiA6VGl0bGU9XCLmtYHnqIvlkI3np7BcIjsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiU2VyaWFsTnVtXCIgOlRpdGxlPVwi5rWB56iL57yW5Y+3XCI7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkNyZWF0ZUF0XCIgOlRpdGxlPVwi5o+Q5Lqk5pe26Ze0XCI7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIk93bmVyRnVsbE5hbWVcIiA6VGl0bGU9XCLmtYHnqIvlj5HotbfkurpcIjsgYnJlYWs7XG4gICAgICAgICAgICAvL2Nhc2UgXCJBcHBsaWNhbnRBY2NvdW50XCIgOlRpdGxlPVwi5Y+R6LW35Lq65bel5Y+3XCI7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIlRhc2tTdGF0ZVwiIDpUaXRsZT1cIua1geeoi+eKtuaAgVwiOyBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6IFRpdGxlPVwiXCI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3dpdGNoKFZhbHVlKXtcbiAgICAgICAgICAgIGNhc2UgXCJSdW5uaW5nXCIgOlNob3dWYWx1ZT1cIui/m+ihjOS4rVwiOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJBcHByb3ZlZFwiIDpTaG93VmFsdWU9XCLlt7LlrozmiJBcIjsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUmVqZWN0ZWRcIiA6U2hvd1ZhbHVlPVwi5bey5ouS57udXCI7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkFib3J0ZWRcIiA6U2hvd1ZhbHVlPVwi5bey6YCA5ZueXCI7IGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpTaG93VmFsdWU9VmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IFZhbD17XG4gICAgICAgICAgICBUaXRsZSA6VGl0bGUsXG4gICAgICAgICAgICBWYWx1ZSA6U2hvd1ZhbHVlXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmKFRpdGxlLmxlbmd0aD4wICYmIFNob3dWYWx1ZSAhPT0gXCJudWxsXCIpe1xuXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFRpdGxlLFwiOlwiLFNob3dWYWx1ZSk7XG4gICAgICAgICAgICBUYXNrQ29tbUxpc3QucHVzaChWYWwpO1xuXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vY29uc29sZS5sb2coSXRlbSxcIjpcIixUYXNrQ29tbVtJdGVtXSk7XG5cbiAgICAgICAgfVxuXG4vLyAgICAgIGNvbnNvbGUubG9nKFRhc2tDb21tTGlzdCk7XG4vLyAgICAgIGNvbnNvbGUubG9nKEJ1dHRvbkxpc3QpO1xuLy8gICAgICBjb25zb2xlLmxvZyhGb3JtSW5mb1RpdGxlQXJyeSk7XG4vLyAgICAgIGNvbnNvbGUubG9nKEZvcm1JbmZvQm9keUFycnkpO1xuXG4gICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICBBcHBsaWNhdGlvbjogRm9ybUluZm9UaXRsZUFycnksXG4gICAgICAgIEZvcm1JbmZvOiBGb3JtSW5mb0JvZHlBcnJ5LFxuICAgICAgICBhY3Rpb25zOiBCdXR0b25MaXN0LFxuICAgICAgICBUYXNrQ29tbUluZm86VGFza0NvbW1MaXN0LFxuICAgICAgICBTaG93QnRuIDpCdXR0b25MaXN0Lmxlbmd0aD4wXG4gICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGF0LmRhdGEpO1xuXG4gICAgICB9XG4gICAgfSlcblxuICB9LFxuXG4gIGhhbmRsZU9wZW4gKGUpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9LFxuXG4gIGhhbmRsZUNhbmNlbCAoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgfSk7XG4gIH0sXG5cbiAgaGFuZGxlQ2xpY2tJdGVtICh7IGRldGFpbCB9KSB7XG5cbiAgICBjb25zdCBpbmRleCA9IGRldGFpbC5pbmRleDtcbiAgICBjb25zdCBhY3Rpb24gPSBbLi4udGhpcy5kYXRhLmFjdGlvbnNdO1xuICAgIGNvbnN0IFBvc3RBY3Rpb249YWN0aW9uW2luZGV4XTtcbiAgICAvL2NvbnNvbGUubG9nKGFjdGlvbik7XG5cbiAgICBsZXQgY29udGVudD0gJ+eCueWHu+S6humAiemhuScgKyBpbmRleCA7XG4gICAgY29uc29sZS5sb2coY29udGVudCk7XG4gICAgY29uc29sZS5sb2coUG9zdEFjdGlvbik7XG5cbiAgICBsZXQgb3B0aW9ucz10aGlzLmRhdGE7XG5cbiAgICBsZXQgQWN0aW9uPVBvc3RBY3Rpb24uQWN0aW9uO1xuICAgIGxldCBUeXBlPVBvc3RBY3Rpb24uVHlwZTtcblxuICAgIGxldCBUcmFuc2Zlcl9UcmFuc2ZlclRvPW51bGw7XG4gICAgbGV0IENvbnNpZ25fQ29uc2lnblVzZXJzPW51bGw7XG4gICAgbGV0IFJlY2VkZUJhY2tfVG9TdGVwSUQ9bnVsbDtcblxuICAgIG9wdGlvbnMuUG9zdGRhdGEuQWN0aW9uPUFjdGlvbjtcbiAgICBvcHRpb25zLlBvc3RkYXRhLlR5cGU9VHlwZTtcblxuICAgIG9wdGlvbnMuUG9zdGRhdGEuVHJhbnNmZXJfVHJhbnNmZXJUbz1UcmFuc2Zlcl9UcmFuc2ZlclRvO1xuICAgIG9wdGlvbnMuUG9zdGRhdGEuQ29uc2lnbl9Db25zaWduVXNlcnM9Q29uc2lnbl9Db25zaWduVXNlcnM7XG4gICAgb3B0aW9ucy5Qb3N0ZGF0YS5SZWNlZGVCYWNrX1RvU3RlcElEPVJlY2VkZUJhY2tfVG9TdGVwSUQ7XG5cbiAgICBjb25zb2xlLmxvZyhvcHRpb25zKTtcblxuICAgICQuYWpheCh7XG4gICAgICBtZXRob2Q6ICdQb3N0JyxcbiAgICAgIHVybDogb3B0aW9ucy5Qb3N0VVJMLFxuICAgICAgZGF0YTogb3B0aW9ucy5Qb3N0ZGF0YSxcbiAgICAgIFBvc3RKc29uOnRydWUsXG5cbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcblxuICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuXG4gICAgICAvL2xldCBtc2c9cmVzcG9uc2UubXNnO1xuXG4gICAgICBpZihyZXNwb25zZS5zdWNjZXNzKXtcblxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAkdG9hc3Q6IHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICR0b2FzdDoge1xuICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHZpc2libGU6ZmFsc2VcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi4vTXlUYXNrcy9pbmRleD8nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0sIDE1MDApO1xuXG4gICAgICB9ZWxzZXtcblxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICR0b2FzdDoge1xuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIG1zZzptc2dcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfSxcblxuXG59Il19