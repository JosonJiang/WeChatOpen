'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//  const  { $Message } = require('../base/index');

exports.default = Page({

  data: {
    visible1: false,
    //    visible2: false,
    actions1: [{
      name: '选项1'
    }, {
      name: '选项2'
    }, {
      name: '去分享',
      icon: 'share',
      openType: 'share'
    }],
    actions2: [{
      name: '删除',
      color: '#ed3f14'
    }]
  },

  onShareAppMessage: function onShareAppMessage() {
    return {
      title: 'iView Weapp',
      imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
    };
  },
  handleOpen1: function handleOpen1(e) {

    this.setData({
      visible1: true
    });
  },
  handleCancel1: function handleCancel1() {

    this.setData({
      visible1: false
    });
  },
  handleOpen2: function handleOpen2(e) {

    this.setData({
      visible2: true
    });
    console.log(e);
  },
  handleCancel2: function handleCancel2() {
    this.setData({
      visible2: false
    });
  },
  handleClickItem1: function handleClickItem1(_ref) {
    var detail = _ref.detail;


    var index = detail.index + 1;

    var content = '点击了选项' + index;
    console.log(content);

    //    $Message({
    //      content: content
    //    });
  },
  handleClickItem2: function handleClickItem2() {
    var _this = this;

    var action = [].concat(_toConsumableArray(this.data.actions2));
    action[0].loading = true;

    this.setData({
      actions2: action
    });

    setTimeout(function () {

      action[0].loading = false;
      _this.setData({
        visible2: false,
        actions2: action
      });

      var content = '删除成功';
      console.log(content);

      //      $Message({
      //        content: '删除成功！',
      //        type: 'success'
      //      });

    }, 2000);
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwidmlzaWJsZTEiLCJhY3Rpb25zMSIsIm5hbWUiLCJpY29uIiwib3BlblR5cGUiLCJhY3Rpb25zMiIsImNvbG9yIiwib25TaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsImltYWdlVXJsIiwiaGFuZGxlT3BlbjEiLCJlIiwic2V0RGF0YSIsImhhbmRsZUNhbmNlbDEiLCJoYW5kbGVPcGVuMiIsInZpc2libGUyIiwiY29uc29sZSIsImxvZyIsImhhbmRsZUNhbmNlbDIiLCJoYW5kbGVDbGlja0l0ZW0xIiwiZGV0YWlsIiwiaW5kZXgiLCJjb250ZW50IiwiaGFuZGxlQ2xpY2tJdGVtMiIsImFjdGlvbiIsImxvYWRpbmciLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBYUVBLFFBQU07QUFDSkMsY0FBVSxLQUROO0FBRVI7QUFDSUMsY0FBVSxDQUNSO0FBQ0VDLFlBQU07QUFEUixLQURRLEVBSVI7QUFDRUEsWUFBTTtBQURSLEtBSlEsRUFPUjtBQUNFQSxZQUFNLEtBRFI7QUFFRUMsWUFBTSxPQUZSO0FBR0VDLGdCQUFVO0FBSFosS0FQUSxDQUhOO0FBZ0JKQyxjQUFVLENBQ1I7QUFDRUgsWUFBTSxJQURSO0FBRUVJLGFBQU87QUFGVCxLQURRO0FBaEJOLEc7O0FBd0JOQyxtQiwrQkFBb0I7QUFDbEIsV0FBTztBQUNMQyxhQUFPLGFBREY7QUFFTEMsZ0JBQVU7QUFGTCxLQUFQO0FBSUQsRztBQUVEQyxhLHVCQUFhQyxDLEVBQUc7O0FBRWQsU0FBS0MsT0FBTCxDQUFhO0FBQ1haLGdCQUFVO0FBREMsS0FBYjtBQUdELEc7QUFFRGEsZSwyQkFBaUI7O0FBRWYsU0FBS0QsT0FBTCxDQUFhO0FBQ1haLGdCQUFVO0FBREMsS0FBYjtBQUdELEc7QUFFRGMsYSx1QkFBYUgsQyxFQUFHOztBQUVkLFNBQUtDLE9BQUwsQ0FBYTtBQUNYRyxnQkFBVTtBQURDLEtBQWI7QUFHQUMsWUFBUUMsR0FBUixDQUFZTixDQUFaO0FBQ0QsRztBQUVETyxlLDJCQUFpQjtBQUNmLFNBQUtOLE9BQUwsQ0FBYTtBQUNYRyxnQkFBVTtBQURDLEtBQWI7QUFHRCxHO0FBRURJLGtCLGtDQUE4QjtBQUFBLFFBQVZDLE1BQVUsUUFBVkEsTUFBVTs7O0FBRTVCLFFBQU1DLFFBQVFELE9BQU9DLEtBQVAsR0FBZSxDQUE3Qjs7QUFFQSxRQUFLQyxVQUFTLFVBQVVELEtBQXhCO0FBQ0FMLFlBQVFDLEdBQVIsQ0FBWUssT0FBWjs7QUFFSjtBQUNBO0FBQ0E7QUFFRyxHO0FBRURDLGtCLDhCQUFvQjtBQUFBOztBQUVsQixRQUFNQyxzQ0FBYSxLQUFLekIsSUFBTCxDQUFVTSxRQUF2QixFQUFOO0FBQ0FtQixXQUFPLENBQVAsRUFBVUMsT0FBVixHQUFvQixJQUFwQjs7QUFFQSxTQUFLYixPQUFMLENBQWE7QUFDWFAsZ0JBQVVtQjtBQURDLEtBQWI7O0FBSUFFLGVBQVcsWUFBTTs7QUFFZkYsYUFBTyxDQUFQLEVBQVVDLE9BQVYsR0FBb0IsS0FBcEI7QUFDQSxZQUFLYixPQUFMLENBQWE7QUFDWEcsa0JBQVUsS0FEQztBQUVYVixrQkFBVW1CO0FBRkMsT0FBYjs7QUFLQSxVQUFLRixVQUFTLE1BQWQ7QUFDQU4sY0FBUUMsR0FBUixDQUFZSyxPQUFaOztBQUVOO0FBQ0E7QUFDQTtBQUNBOztBQUdLLEtBakJELEVBaUJHLElBakJIO0FBbUJEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbIi8vICBjb25zdCAgeyAkTWVzc2FnZSB9ID0gcmVxdWlyZSgnLi4vYmFzZS9pbmRleCcpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwiQWN0aW9uU2hlZXQg5Yqo5L2c6Z2i5p2/XCIsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAnd3hjLWNhcmQnOiAnd3hjLWNhcmQnLFxuICAgICAgXCJpLWFjdGlvbi1zaGVldFwiOiAnd3hjLWFjdGlvbnNoZWV0JyxcbiAgICAgIFwiaS1idXR0b25cIjogJ3d4Yy1idXR0b24nXG5cbiAgICB9XG4gIH0sXG5cbiAgZGF0YToge1xuICAgIHZpc2libGUxOiBmYWxzZSxcbi8vICAgIHZpc2libGUyOiBmYWxzZSxcbiAgICBhY3Rpb25zMTogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAn6YCJ6aG5MScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAn6YCJ6aG5MidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICfljrvliIbkuqsnLFxuICAgICAgICBpY29uOiAnc2hhcmUnLFxuICAgICAgICBvcGVuVHlwZTogJ3NoYXJlJ1xuICAgICAgfVxuICAgIF0sXG4gICAgYWN0aW9uczI6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ+WIoOmZpCcsXG4gICAgICAgIGNvbG9yOiAnI2VkM2YxNCdcbiAgICAgIH1cbiAgICBdXG4gIH0sXG5cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAnaVZpZXcgV2VhcHAnLFxuICAgICAgaW1hZ2VVcmw6ICdodHRwczovL2ZpbGUuaXZpZXd1aS5jb20vaXZpZXctd2VhcHAtbG9nby5wbmcnXG4gICAgfTtcbiAgfSxcblxuICBoYW5kbGVPcGVuMSAoZSkge1xuXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHZpc2libGUxOiB0cnVlXG4gICAgfSk7XG4gIH0sXG5cbiAgaGFuZGxlQ2FuY2VsMSAoKSB7XG5cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdmlzaWJsZTE6IGZhbHNlXG4gICAgfSk7XG4gIH0sXG5cbiAgaGFuZGxlT3BlbjIgKGUpIHtcblxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB2aXNpYmxlMjogdHJ1ZVxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9LFxuXG4gIGhhbmRsZUNhbmNlbDIgKCkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB2aXNpYmxlMjogZmFsc2VcbiAgICB9KTtcbiAgfSxcblxuICBoYW5kbGVDbGlja0l0ZW0xICh7IGRldGFpbCB9KSB7XG5cbiAgICBjb25zdCBpbmRleCA9IGRldGFpbC5pbmRleCArIDE7XG5cbiAgICBsZXQgIGNvbnRlbnQ9ICfngrnlh7vkuobpgInpobknICsgaW5kZXg7XG4gICAgY29uc29sZS5sb2coY29udGVudCk7XG5cbi8vICAgICRNZXNzYWdlKHtcbi8vICAgICAgY29udGVudDogY29udGVudFxuLy8gICAgfSk7XG5cbiAgfSxcblxuICBoYW5kbGVDbGlja0l0ZW0yICgpIHtcblxuICAgIGNvbnN0IGFjdGlvbiA9IFsuLi50aGlzLmRhdGEuYWN0aW9uczJdO1xuICAgIGFjdGlvblswXS5sb2FkaW5nID0gdHJ1ZTtcblxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBhY3Rpb25zMjogYWN0aW9uXG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgYWN0aW9uWzBdLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHZpc2libGUyOiBmYWxzZSxcbiAgICAgICAgYWN0aW9uczI6IGFjdGlvblxuICAgICAgfSk7XG5cbiAgICAgIGxldCAgY29udGVudD0gJ+WIoOmZpOaIkOWKnyc7XG4gICAgICBjb25zb2xlLmxvZyhjb250ZW50KTtcblxuLy8gICAgICAkTWVzc2FnZSh7XG4vLyAgICAgICAgY29udGVudDogJ+WIoOmZpOaIkOWKn++8gScsXG4vLyAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnXG4vLyAgICAgIH0pO1xuXG5cbiAgICB9LCAyMDAwKTtcblxuICB9XG5cbn0iXX0=