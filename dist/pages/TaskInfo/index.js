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

        var ButtonList = [];
        var FormInfoTitleArry = [];
        var FormInfoBodyArry = [];
        var FormInfoTitle = response.FormInfo[0] ? response.FormInfo[0].Rows : [];
        var FormInfoBody = response.FormInfo[1] ? response.FormInfo[1].Rows : [];
        var BtnList = response.ButtonList || [];

        //console.log(FormInfoTitle);

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

        //      console.log(ButtonList);
        //      console.log(FormInfoTitleArry);
        //      console.log(FormInfoBodyArry);

        that.setData({
          Application: FormInfoTitleArry,
          FormInfo: FormInfoBodyArry,
          actions: ButtonList,
          ShowBtn: ButtonList.length > 0
        });

        console.log(that.data);
        //app.globalData.userInfo = options.userInfo;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJhcHAiLCJnZXRBcHAiLCJuZXR3b3JrIiwicmVxdWlyZSIsIiQiLCJ0aGlzdXRpbCIsIlN0YXJ0UHVsbERvd25SZWZyZWgiLCJkYXRhIiwiQXBwbGljYXRpb24iLCJGb3JtSW5mbyIsIlBvc3RVUkwiLCJnbG9iYWxEYXRhIiwiQlBNSG9zdCIsIkdldFVSTCIsIlBvc3RkYXRhIiwiQ29tbWVudCIsImlzRGVidWciLCJpc1dlaXhJbiIsIiR0b2FzdCIsInNob3ciLCJpY29uIiwiaWNvbkNvbG9yIiwibXNnIiwidmlzaWJsZSIsImFjdGlvbnMiLCJuYW1lIiwiY29sb3IiLCJvcGVuVHlwZSIsImJpbmRibHVyIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJzZXREYXRhIiwiZGV0YWlsIiwidmFsdWUiLCJvbkNsaWNrTGVmdCIsInd4IiwibmF2aWdhdGVUbyIsInVybCIsIlRhc2tJRCIsIm9uU2hvdyIsIm9wdGlvbnMiLCJ0aGF0Iiwib25Mb2FkIiwib3B0aW9uIiwiSm9zb25vcHRpb25zIiwiU3RlcElEIiwiQWpheFBvc3QiLCJhamF4IiwibWV0aG9kIiwiUG9zdEpzb24iLCJ0aGVuIiwicmVzcG9uc2UiLCJzdWNjZXNzIiwicmVzcG9uc2VNc2ciLCJlcnJvck1lc3NhZ2UiLCJzZXRUaW1lb3V0IiwibmF2aWdhdGVCYWNrIiwiQnV0dG9uTGlzdCIsIkZvcm1JbmZvVGl0bGVBcnJ5IiwiRm9ybUluZm9Cb2R5QXJyeSIsIkZvcm1JbmZvVGl0bGUiLCJSb3dzIiwiRm9ybUluZm9Cb2R5IiwiQnRuTGlzdCIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJhcnJ5cyIsIml4IiwidmFsIiwiVmFsdWUiLCJsZW5ndGgiLCJwdXNoIiwiSXRlbXZhbCIsIlRleHQiLCJBY3Rpb24iLCJUeXBlIiwiVmFsIiwiU2hvd0J0biIsImhhbmRsZU9wZW4iLCJoYW5kbGVDYW5jZWwiLCJoYW5kbGVDbGlja0l0ZW0iLCJhY3Rpb24iLCJQb3N0QWN0aW9uIiwiY29udGVudCIsIlRyYW5zZmVyX1RyYW5zZmVyVG8iLCJDb25zaWduX0NvbnNpZ25Vc2VycyIsIlJlY2VkZUJhY2tfVG9TdGVwSUQiLCJyZWRpcmVjdFRvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBTUMsUUFBVjtBQUNFLElBQUlDLFVBQVVDLFFBQVEsdUJBQVIsQ0FBZDtBQUNBLElBQUtDLElBQUlELFFBQVEsb0JBQVIsQ0FBVDs7QUFFQSxJQUFJRSxXQUFXRixRQUFRLG9CQUFSLENBQWY7O0FBRUFFLFNBQVNDLG1CQUFULFlBQWtDTixHQUFsQzs7O0FBZUFPLFFBQU07O0FBRUpDLGlCQUFZLEVBRlI7QUFHSkMsY0FBUyxFQUhMO0FBSUpDLGFBQVFWLElBQUlXLFVBQUosQ0FBZUMsT0FBZixHQUF3QixzREFKNUI7QUFLSkMsWUFBT2IsSUFBSVcsVUFBSixDQUFlQyxPQUFmLEdBQXdCLHNEQUwzQjtBQU1KRSxjQUFXO0FBQ1RDLGVBQVEsTUFEQztBQUVUQyxlQUFRLElBRkM7QUFHVEMsZ0JBQVM7QUFIQSxLQU5QO0FBV0pDLFlBQVE7QUFDTkMsWUFBTSxLQURBO0FBRU5DLFlBQUssS0FGQztBQUdOQyxpQkFBVSxNQUhKO0FBSU5DLFdBQUs7QUFKQyxLQVhKO0FBaUJKQyxhQUFRLEtBakJKO0FBa0JKQyxhQUFTLENBQ1A7QUFDRUMsWUFBTSxLQURSO0FBRUVDLGFBQU87QUFGVCxLQURPLEVBS1A7QUFDRUQsWUFBTTtBQURSLEtBTE8sRUFRUDtBQUNFQSxZQUFNLEtBRFI7QUFFRUwsWUFBTSxPQUZSO0FBR0VPLGdCQUFVO0FBSFosS0FSTzs7QUFsQkwsRzs7QUFvQ05DLFUsb0JBQVNDLEMsRUFBRTs7QUFFVEMsWUFBUUMsR0FBUixDQUFZRixDQUFaOztBQUVBLFNBQUtHLE9BQUwscUJBQ0csa0JBREgsRUFDd0JILEVBQUVJLE1BQUYsQ0FBU0MsS0FEakM7QUFJRCxHO0FBR0RDLGEseUJBQWM7O0FBR2hCO0FBQ0E7QUFDQTs7QUFFSUMsT0FBR0MsVUFBSCxDQUFjO0FBQ1pD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UTtBQUNOQyxrQkFBTSxJQURBO0FBRU5HLGlCQUFJQTtBQUZFO0FBREcsU0FBYjtBQU1EO0FBRUYsS0EzQ0Q7QUE2Q0QiLCJmaWxlIjoiaW5kZXgud3hwIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGdldEFwcCgpO1xuICB2YXIgbmV0d29yayA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvbmV0d29yay5qcycpO1xuICB2YXIgICQgPSByZXF1aXJlKCcuLi8uLi91dGlsL2FqYXguanMnKTtcblxuICB2YXIgdGhpc3V0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsL3V0aWwuanMnKTtcblxuICB0aGlzdXRpbC5TdGFydFB1bGxEb3duUmVmcmVoKHRoaXMsYXBwKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5rWB56iL5L+h5oGvJyxcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6dHJ1ZSxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICd3eGMtaWNvbic6ICd3eGMtaWNvbicsXG4gICAgICAnd3hjLW5hdmJhcic6ICd3eGMtbmF2YmFyJyxcbiAgICAgIFwiaS1hY3Rpb24tc2hlZXRcIjogJ3d4Yy1hY3Rpb25zaGVldCcsXG4gICAgICBcImktYnV0dG9uXCI6ICd3eGMtYnV0dG9uJyxcbiAgICAgICd3eGMtdG9hc3QnOiAnQG1pbnVpL3d4Yy10b2FzdCcsXG4gICAgICAnd3hjLWlucHV0JzogJ0BtaW51aS93eGMtaW5wdXQnXG4gICAgfVxuICB9LFxuICBkYXRhOiB7XG5cbiAgICBBcHBsaWNhdGlvbjp7fSxcbiAgICBGb3JtSW5mbzp7fSxcbiAgICBQb3N0VVJMOmFwcC5nbG9iYWxEYXRhLkJQTUhvc3QgK1wiL01vYmlsZS5hc2h4P1VzZXJBY2NvdW50PVNEVDEyODcyJk1ldGhvZD1UYXNrUHJvY2Vzc1wiLFxuICAgIEdldFVSTDphcHAuZ2xvYmFsRGF0YS5CUE1Ib3N0ICtcIi9Nb2JpbGUuYXNoeD9Vc2VyQWNjb3VudD1TRFQxMjg3MiZNZXRob2Q9R2V0Rm9ybUluZm9cIixcbiAgICBQb3N0ZGF0YSA6IHtcbiAgICAgIENvbW1lbnQ6XCLlrqHmibnpgJrov4dcIixcbiAgICAgIGlzRGVidWc6dHJ1ZSxcbiAgICAgIGlzV2VpeEluOnRydWVcbiAgICB9LFxuICAgICR0b2FzdDoge1xuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICBpY29uOlwieWVzXCIsXG4gICAgICBpY29uQ29sb3I6XCIjMzMzXCIsXG4gICAgICBtc2c6IFwi5a6h5om55oiQ5YqfXCJcbiAgICB9LFxuICAgIHZpc2libGU6ZmFsc2UsXG4gICAgYWN0aW9uczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAn6YCJ6aG5MScsXG4gICAgICAgIGNvbG9yOiAnI2VkM2YxNCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICfpgInpobkyJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ+WOu+WIhuS6qycsXG4gICAgICAgIGljb246ICdzaGFyZScsXG4gICAgICAgIG9wZW5UeXBlOiAnc2hhcmUnXG4gICAgICB9XG4gICAgXSxcblxuICB9LFxuXG5cbiAgYmluZGJsdXIoZSl7XG5cbiAgICBjb25zb2xlLmxvZyhlKTtcblxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBbXCJQb3N0ZGF0YS5Db21tZW50XCJdOiBlLmRldGFpbC52YWx1ZSxcbiAgICB9KVxuXG4gIH0sXG5cblxuICBvbkNsaWNrTGVmdCgpIHtcblxuXG4vLyAgICB3eC5yZWRpcmVjdFRvKHtcbi8vICAgICAgdXJsOiAnLi4vTXlUYXNrcy9pbmRleD90aWQ9NzAxNDYxJ1xuLy8gICAgfSk7XG5cbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uL1Rhc2tUcmFjZS9pbmRleD9UYXNrSUQ9Jyt0aGlzLmRhdGEuUG9zdGRhdGEuVGFza0lEXG4gICAgfSk7XG5cblxuICB9LFxuXG4gIG9uU2hvdyAob3B0aW9ucykge1xuXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gIH0sXG5cbiAgb25Mb2FkKG9wdGlvbil7XG5cbiAgICBjb25zb2xlLmxvZyhvcHRpb24pO1xuXG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBKb3Nvbm9wdGlvbnMgPSB0aGF0LmRhdGE7XG5cbiAgICBsZXQgU3RlcElEPW9wdGlvbi5TdGVwSUQ7XG4gICAgbGV0IFRhc2tJRD1vcHRpb24uVGFza0lEO1xuXG4gICAgdGhhdC5zZXREYXRhKHtcblxuICAgICAgW1wiUG9zdGRhdGEuVGFza0lEXCJdOlRhc2tJRCxcbiAgICAgIFtcIlBvc3RkYXRhLlN0ZXBJRFwiXTpTdGVwSUQsXG5cbi8vICAgICAgUG9zdGRhdGE6e1xuLy8gICAgICAgIFRhc2tJRDpUYXNrSUQsXG4vLyAgICAgICAgU3RlcElEOlN0ZXBJRCxcbi8vICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICB0aGF0LkFqYXhQb3N0KEpvc29ub3B0aW9ucyk7XG5cbiAgfSxcblxuICBBamF4UG9zdCA6IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXG4gICAgbGV0IHRoYXQ9dGhpcztcblxuICAgICQuYWpheCh7XG4gICAgICBtZXRob2Q6ICdQb3N0JyxcbiAgICAgIHVybDogb3B0aW9ucy5HZXRVUkwsXG4gICAgICBkYXRhOiBvcHRpb25zLlBvc3RkYXRhLFxuICAgICAgUG9zdEpzb246dHJ1ZSxcblxuICAgICAgLy9jb250ZW50VHlwZTpcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1nYjIzMTJcIlxuXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG5cbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuXG4gICAgICBpZihyZXNwb25zZS5zdWNjZXNzPT09ZmFsc2Upe1xuXG4gICAgICAgIGxldCByZXNwb25zZU1zZz1yZXNwb25zZS5lcnJvck1lc3NhZ2U7XG4gICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgJHRvYXN0OiB7XG4gICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgaWNvbjpcImNsb3NlXCIsXG4gICAgICAgICAgICBpY29uQ29sb3I6XCIjZmZmXCIsXG4gICAgICAgICAgICBtc2cgOiByZXNwb25zZU1zZ1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICR0b2FzdDoge1xuICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgd3gubmF2aWdhdGVCYWNrKCk7XG5cbiAgICAgICAgfSwgMTUwMCk7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGF0LmRhdGEuJHRvYXN0KTtcblxuICAgICAgfWVsc2V7XG5cbiAgICAgIGxldCBCdXR0b25MaXN0PVtdO1xuICAgICAgbGV0IEZvcm1JbmZvVGl0bGVBcnJ5PVtdO1xuICAgICAgbGV0IEZvcm1JbmZvQm9keUFycnk9W107XG4gICAgICBsZXQgRm9ybUluZm9UaXRsZT0gcmVzcG9uc2UuRm9ybUluZm9bMF0gPyByZXNwb25zZS5Gb3JtSW5mb1swXS5Sb3dzIDogW107XG4gICAgICBsZXQgRm9ybUluZm9Cb2R5PXJlc3BvbnNlLkZvcm1JbmZvWzFdID8gcmVzcG9uc2UuRm9ybUluZm9bMV0uUm93cyA6IFtdO1xuICAgICAgbGV0IEJ0bkxpc3Q9IHJlc3BvbnNlLkJ1dHRvbkxpc3QgfHwgW107XG5cbiAgICAgIC8vY29uc29sZS5sb2coRm9ybUluZm9UaXRsZSk7XG5cbiAgICAgIEZvcm1JbmZvVGl0bGUuZm9yRWFjaChmdW5jdGlvbihpdGVtLGluZGV4LGFycnlzKXtcbiAgICAgICAgZm9yKHZhciBpeCBpbiBpdGVtKVxuICAgICAgICB7XG4gICAgICAgICAgbGV0IHZhbD0gaXRlbVtpeF07XG4gICAgICAgICAgaWYodmFsLlZhbHVlLmxlbmd0aD4wKVxuICAgICAgICAgIEZvcm1JbmZvVGl0bGVBcnJ5LnB1c2godmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIEZvcm1JbmZvQm9keS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0saW5kZXgsYXJyeXMpe1xuXG4gICAgICAgICAgZm9yKHZhciBpeCBpbiBpdGVtKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxldCB2YWw9IGl0ZW1baXhdO1xuICAgICAgICAgICAgaWYodmFsLlZhbHVlLmxlbmd0aD4wKVxuICAgICAgICAgICAgICBGb3JtSW5mb0JvZHlBcnJ5LnB1c2godmFsKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIEJ0bkxpc3QuZm9yRWFjaChmdW5jdGlvbihJdGVtdmFsLGluZGV4LGFycnlzKXtcbiAgICAgICAgbGV0IFRleHQ9SXRlbXZhbC5UZXh0LFxuICAgICAgICAgICAgQWN0aW9uPUl0ZW12YWwuQWN0aW9uLFxuICAgICAgICAgICAgVHlwZT1JdGVtdmFsLlR5cGU7XG5cbiAgICAgICAgbGV0IFZhbD17XG4gICAgICAgICAgbmFtZSA6VGV4dCxcbiAgICAgICAgICBjb2xvcjogJyNlZTNmMTQnLFxuICAgICAgICAgIFRleHQ6VGV4dCxcbiAgICAgICAgICBBY3Rpb24gOkFjdGlvbixcbiAgICAgICAgICBUeXBlIDpUeXBlXG4gICAgICAgIH07XG5cbiAgICAgICAgQnV0dG9uTGlzdC5wdXNoKFZhbCk7XG5cbiAgICAgICAgfSk7XG5cblxuLy8gICAgICBjb25zb2xlLmxvZyhCdXR0b25MaXN0KTtcbi8vICAgICAgY29uc29sZS5sb2coRm9ybUluZm9UaXRsZUFycnkpO1xuLy8gICAgICBjb25zb2xlLmxvZyhGb3JtSW5mb0JvZHlBcnJ5KTtcblxuICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgQXBwbGljYXRpb246IEZvcm1JbmZvVGl0bGVBcnJ5LFxuICAgICAgICBGb3JtSW5mbzogRm9ybUluZm9Cb2R5QXJyeSxcbiAgICAgICAgYWN0aW9uczogQnV0dG9uTGlzdCxcbiAgICAgICAgU2hvd0J0biA6QnV0dG9uTGlzdC5sZW5ndGg+MFxuICAgICAgfSk7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhhdC5kYXRhKTtcbiAgICAgIC8vYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBvcHRpb25zLnVzZXJJbmZvO1xuICAgICAgfVxuICAgIH0pXG5cbiAgfSxcblxuICBoYW5kbGVPcGVuIChlKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHZpc2libGU6IHRydWVcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgfSxcblxuICBoYW5kbGVDYW5jZWwgKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB2aXNpYmxlOiBmYWxzZVxuICAgIH0pO1xuICB9LFxuXG4gIGhhbmRsZUNsaWNrSXRlbSAoeyBkZXRhaWwgfSkge1xuXG4gICAgY29uc3QgaW5kZXggPSBkZXRhaWwuaW5kZXg7XG4gICAgY29uc3QgYWN0aW9uID0gWy4uLnRoaXMuZGF0YS5hY3Rpb25zXTtcbiAgICBjb25zdCBQb3N0QWN0aW9uPWFjdGlvbltpbmRleF07XG4gICAgLy9jb25zb2xlLmxvZyhhY3Rpb24pO1xuXG4gICAgbGV0IGNvbnRlbnQ9ICfngrnlh7vkuobpgInpobknICsgaW5kZXggO1xuICAgIGNvbnNvbGUubG9nKGNvbnRlbnQpO1xuICAgIGNvbnNvbGUubG9nKFBvc3RBY3Rpb24pO1xuXG4gICAgbGV0IG9wdGlvbnM9dGhpcy5kYXRhO1xuXG4gICAgbGV0IEFjdGlvbj1Qb3N0QWN0aW9uLkFjdGlvbjtcbiAgICBsZXQgVHlwZT1Qb3N0QWN0aW9uLlR5cGU7XG5cbiAgICBsZXQgVHJhbnNmZXJfVHJhbnNmZXJUbz1udWxsO1xuICAgIGxldCBDb25zaWduX0NvbnNpZ25Vc2Vycz1udWxsO1xuICAgIGxldCBSZWNlZGVCYWNrX1RvU3RlcElEPW51bGw7XG5cbiAgICBvcHRpb25zLlBvc3RkYXRhLkFjdGlvbj1BY3Rpb247XG4gICAgb3B0aW9ucy5Qb3N0ZGF0YS5UeXBlPVR5cGU7XG5cbiAgICBvcHRpb25zLlBvc3RkYXRhLlRyYW5zZmVyX1RyYW5zZmVyVG89VHJhbnNmZXJfVHJhbnNmZXJUbztcbiAgICBvcHRpb25zLlBvc3RkYXRhLkNvbnNpZ25fQ29uc2lnblVzZXJzPUNvbnNpZ25fQ29uc2lnblVzZXJzO1xuICAgIG9wdGlvbnMuUG9zdGRhdGEuUmVjZWRlQmFja19Ub1N0ZXBJRD1SZWNlZGVCYWNrX1RvU3RlcElEO1xuXG4gICAgY29uc29sZS5sb2cob3B0aW9ucyk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgbWV0aG9kOiAnUG9zdCcsXG4gICAgICB1cmw6IG9wdGlvbnMuUG9zdFVSTCxcbiAgICAgIGRhdGE6IG9wdGlvbnMuUG9zdGRhdGEsXG4gICAgICBQb3N0SnNvbjp0cnVlLFxuXG4gICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG5cbiAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblxuICAgICAgLy9sZXQgbXNnPXJlc3BvbnNlLm1zZztcblxuICAgICAgaWYocmVzcG9uc2Uuc3VjY2Vzcyl7XG5cbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgJHRvYXN0OiB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAkdG9hc3Q6IHtcbiAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB2aXNpYmxlOmZhbHNlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgIHVybDogJy4uL015VGFza3MvaW5kZXg/J1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9LCAxNTAwKTtcblxuICAgICAgfWVsc2V7XG5cbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAkdG9hc3Q6IHtcbiAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICBtc2c6bXNnXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH0sXG5cblxufSJdfQ==