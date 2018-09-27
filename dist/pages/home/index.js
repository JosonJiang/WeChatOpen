'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({

  data: {
    '__code__': {
      readme: ''
    }
  },
  methods: {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {},

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

    //    wx.redirectTo({
    //      url: '../iaywhere/index'
    //    });

    wx.navigateTo({
      url: '../iaywhere/index'
    });

    //console.log(event)
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwibWV0aG9kcyIsIm9uUmVhZHkiLCJvblNob3ciLCJvbkhpZGUiLCJvblVubG9hZCIsIm9uUHVsbERvd25SZWZyZXNoIiwib25SZWFjaEJvdHRvbSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwib25DbGljayIsImV2ZW50Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBVUVBLFFBQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxHO0FBQ05DLFdBQVMsRTtBQUNUOzs7QUFHQUMsV0FBUyxtQkFBWSxDQUVwQixDOztBQUVEOzs7QUFHQUMsVUFBUSxrQkFBWSxDQUVuQixDOztBQUVEOzs7QUFHQUMsVUFBUSxrQkFBWSxDQUVuQixDOztBQUVEOzs7QUFHQUMsWUFBVSxvQkFBWSxDQUVyQixDOztBQUVEOzs7QUFHQUMscUJBQW1CLDZCQUFZLENBRTlCLEM7O0FBRUQ7OztBQUdBQyxpQkFBZSx5QkFBWSxDQUUxQixDOztBQUVEOzs7QUFHQUMscUJBQW1CLDZCQUFZLENBRTlCLEM7QUFDREMsUyxtQkFBUUMsSyxFQUFPOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUlDLE9BQUdDLFVBQUgsQ0FBYztBQUNaQyxXQUFLO0FBRE8sS0FBZDs7QUFJQTtBQUVEIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb25maWc6IHtcblxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ0luZGV4JyxcbiAgICAgIHVzaW5nQ29tcG9uZW50czoge1xuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gIGRhdGE6IHsgfSxcbiAgbWV0aG9kczoge30sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWIneasoea4suafk+WujOaIkFxuICAgKi9cbiAgb25SZWFkeTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5pi+56S6XG4gICAqL1xuICBvblNob3c6IGZ1bmN0aW9uICgpIHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdoumakOiXj1xuICAgKi9cbiAgb25IaWRlOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLljbjovb1cbiAgICovXG4gIG9uVW5sb2FkOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i5LiK5ouJ6Kem5bqV5LqL5Lu255qE5aSE55CG5Ye95pWwXG4gICAqL1xuICBvblJlYWNoQm90dG9tOiBmdW5jdGlvbiAoKSB7XG5cbiAgfSxcblxuICAvKipcbiAgICog55So5oi354K55Ye75Y+z5LiK6KeS5YiG5LqrXG4gICAqL1xuICBvblNoYXJlQXBwTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG4gIH0sXG4gIG9uQ2xpY2soZXZlbnQpIHtcblxuLy8gICAgd3gucmVkaXJlY3RUbyh7XG4vLyAgICAgIHVybDogJy4uL2lheXdoZXJlL2luZGV4J1xuLy8gICAgfSk7XG5cbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy4uL2lheXdoZXJlL2luZGV4J1xuICAgIH0pO1xuXG4gICAgLy9jb25zb2xlLmxvZyhldmVudClcblxuICB9fSJdfQ==