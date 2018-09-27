'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({

  data: {},
  behaviors: [],
  externalClasses: ['i-class'],

  properties: {
    // default, primary, ghost, info, success, warning, error
    type: {
      type: String,
      value: ''
    },
    inline: {
      type: Boolean,
      value: false
    },
    // default, large, small
    size: {
      type: String,
      value: ''
    },
    // circle, square
    shape: {
      type: String,
      value: 'square'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false
    },
    long: {
      type: Boolean,
      value: false
    },
    openType: String,
    appParameter: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: {
      type: Number,
      value: 20
    },
    hoverStayTime: {
      type: Number,
      value: 70
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: {
      type: String,
      value: ''
    },
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean
  },

  methods: {
    handleTap: function handleTap() {
      if (this.data.disabled) return false;
      this.triggerEvent('click');
    },
    bindgetuserinfo: function bindgetuserinfo() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$detail = _ref.detail,
          detail = _ref$detail === undefined ? {} : _ref$detail;

      this.triggerEvent('getuserinfo', detail);
    },
    bindcontact: function bindcontact() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$detail = _ref2.detail,
          detail = _ref2$detail === undefined ? {} : _ref2$detail;

      this.triggerEvent('contact', detail);
    },
    bindgetphonenumber: function bindgetphonenumber() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$detail = _ref3.detail,
          detail = _ref3$detail === undefined ? {} : _ref3$detail;

      this.triggerEvent('getphonenumber', detail);
    },
    binderror: function binderror() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref4$detail = _ref4.detail,
          detail = _ref4$detail === undefined ? {} : _ref4$detail;

      this.triggerEvent('error', detail);
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJkYXRhIiwiYmVoYXZpb3JzIiwiZXh0ZXJuYWxDbGFzc2VzIiwicHJvcGVydGllcyIsInR5cGUiLCJTdHJpbmciLCJ2YWx1ZSIsImlubGluZSIsIkJvb2xlYW4iLCJzaXplIiwic2hhcGUiLCJkaXNhYmxlZCIsImxvYWRpbmciLCJsb25nIiwib3BlblR5cGUiLCJhcHBQYXJhbWV0ZXIiLCJob3ZlclN0b3BQcm9wYWdhdGlvbiIsImhvdmVyU3RhcnRUaW1lIiwiTnVtYmVyIiwiaG92ZXJTdGF5VGltZSIsImxhbmciLCJzZXNzaW9uRnJvbSIsInNlbmRNZXNzYWdlVGl0bGUiLCJzZW5kTWVzc2FnZVBhdGgiLCJzZW5kTWVzc2FnZUltZyIsInNob3dNZXNzYWdlQ2FyZCIsIm1ldGhvZHMiLCJoYW5kbGVUYXAiLCJ0cmlnZ2VyRXZlbnQiLCJiaW5kZ2V0dXNlcmluZm8iLCJkZXRhaWwiLCJiaW5kY29udGFjdCIsImJpbmRnZXRwaG9uZW51bWJlciIsImJpbmRlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU1FQSxRQUFNLEU7QUFDTkMsYUFBVyxFO0FBQ1hDLG1CQUFpQixDQUFDLFNBQUQsQzs7QUFFakJDLGNBQVk7QUFDVjtBQUNBQyxVQUFNO0FBQ0pBLFlBQU1DLE1BREY7QUFFSkMsYUFBTztBQUZILEtBRkk7QUFNVkMsWUFBUTtBQUNOSCxZQUFNSSxPQURBO0FBRU5GLGFBQU87QUFGRCxLQU5FO0FBVVY7QUFDQUcsVUFBTTtBQUNKTCxZQUFNQyxNQURGO0FBRUpDLGFBQU87QUFGSCxLQVhJO0FBZVY7QUFDQUksV0FBTztBQUNMTixZQUFNQyxNQUREO0FBRUxDLGFBQU87QUFGRixLQWhCRztBQW9CVkssY0FBVTtBQUNSUCxZQUFNSSxPQURFO0FBRVJGLGFBQU87QUFGQyxLQXBCQTtBQXdCVk0sYUFBUztBQUNQUixZQUFNSSxPQURDO0FBRVBGLGFBQU87QUFGQSxLQXhCQztBQTRCVk8sVUFBTTtBQUNKVCxZQUFNSSxPQURGO0FBRUpGLGFBQU87QUFGSCxLQTVCSTtBQWdDVlEsY0FBVVQsTUFoQ0E7QUFpQ1ZVLGtCQUFjVixNQWpDSjtBQWtDVlcsMEJBQXNCUixPQWxDWjtBQW1DVlMsb0JBQWdCO0FBQ2RiLFlBQU1jLE1BRFE7QUFFZFosYUFBTztBQUZPLEtBbkNOO0FBdUNWYSxtQkFBZTtBQUNiZixZQUFNYyxNQURPO0FBRWJaLGFBQU87QUFGTSxLQXZDTDtBQTJDVmMsVUFBTTtBQUNKaEIsWUFBTUMsTUFERjtBQUVKQyxhQUFPO0FBRkgsS0EzQ0k7QUErQ1ZlLGlCQUFhO0FBQ1hqQixZQUFNQyxNQURLO0FBRVhDLGFBQU87QUFGSSxLQS9DSDtBQW1EVmdCLHNCQUFrQmpCLE1BbkRSO0FBb0RWa0IscUJBQWlCbEIsTUFwRFA7QUFxRFZtQixvQkFBZ0JuQixNQXJETjtBQXNEVm9CLHFCQUFpQmpCO0FBdERQLEc7O0FBeURaa0IsV0FBUztBQUNQQyxhQURPLHVCQUNNO0FBQ1gsVUFBSSxLQUFLM0IsSUFBTCxDQUFVVyxRQUFkLEVBQXdCLE9BQU8sS0FBUDtBQUN4QixXQUFLaUIsWUFBTCxDQUFrQixPQUFsQjtBQUNELEtBSk07QUFLUEMsbUJBTE8sNkJBSytCO0FBQUEscUZBQUosRUFBSTtBQUFBLDZCQUFwQkMsTUFBb0I7QUFBQSxVQUFwQkEsTUFBb0IsK0JBQVgsRUFBVzs7QUFDcEMsV0FBS0YsWUFBTCxDQUFrQixhQUFsQixFQUFpQ0UsTUFBakM7QUFDRCxLQVBNO0FBUVBDLGVBUk8seUJBUTJCO0FBQUEsc0ZBQUosRUFBSTtBQUFBLCtCQUFwQkQsTUFBb0I7QUFBQSxVQUFwQkEsTUFBb0IsZ0NBQVgsRUFBVzs7QUFDaEMsV0FBS0YsWUFBTCxDQUFrQixTQUFsQixFQUE2QkUsTUFBN0I7QUFDRCxLQVZNO0FBV1BFLHNCQVhPLGdDQVdrQztBQUFBLHNGQUFKLEVBQUk7QUFBQSwrQkFBcEJGLE1BQW9CO0FBQUEsVUFBcEJBLE1BQW9CLGdDQUFYLEVBQVc7O0FBQ3ZDLFdBQUtGLFlBQUwsQ0FBa0IsZ0JBQWxCLEVBQW9DRSxNQUFwQztBQUNELEtBYk07QUFjUEcsYUFkTyx1QkFjeUI7QUFBQSxzRkFBSixFQUFJO0FBQUEsK0JBQXBCSCxNQUFvQjtBQUFBLFVBQXBCQSxNQUFvQixnQ0FBWCxFQUFXOztBQUM5QixXQUFLRixZQUFMLENBQWtCLE9BQWxCLEVBQTJCRSxNQUEzQjtBQUNEO0FBaEJNIiwiZmlsZSI6ImluZGV4Lnd4YyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgY29uZmlnOiB7XG4gICAgY29tcG9uZW50OiB0cnVlLFxuICAgIHVzaW5nQ29tcG9uZW50czogeyB9XG4gIH0sXG5cbiAgZGF0YTogeyB9LFxuICBiZWhhdmlvcnM6IFsgXSxcbiAgZXh0ZXJuYWxDbGFzc2VzOiBbJ2ktY2xhc3MnXSxcblxuICBwcm9wZXJ0aWVzOiB7XG4gICAgLy8gZGVmYXVsdCwgcHJpbWFyeSwgZ2hvc3QsIGluZm8sIHN1Y2Nlc3MsIHdhcm5pbmcsIGVycm9yXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsdWU6ICcnLFxuICAgIH0sXG4gICAgaW5saW5lOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfSxcbiAgICAvLyBkZWZhdWx0LCBsYXJnZSwgc21hbGxcbiAgICBzaXplOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJycsXG4gICAgfSxcbiAgICAvLyBjaXJjbGUsIHNxdWFyZVxuICAgIHNoYXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJ3NxdWFyZSdcbiAgICB9LFxuICAgIGRpc2FibGVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IGZhbHNlLFxuICAgIH0sXG4gICAgbG9hZGluZzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICB9LFxuICAgIGxvbmc6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9LFxuICAgIG9wZW5UeXBlOiBTdHJpbmcsXG4gICAgYXBwUGFyYW1ldGVyOiBTdHJpbmcsXG4gICAgaG92ZXJTdG9wUHJvcGFnYXRpb246IEJvb2xlYW4sXG4gICAgaG92ZXJTdGFydFRpbWU6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiAyMFxuICAgIH0sXG4gICAgaG92ZXJTdGF5VGltZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDcwXG4gICAgfSxcbiAgICBsYW5nOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogJ2VuJ1xuICAgIH0sXG4gICAgc2Vzc2lvbkZyb206IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnJ1xuICAgIH0sXG4gICAgc2VuZE1lc3NhZ2VUaXRsZTogU3RyaW5nLFxuICAgIHNlbmRNZXNzYWdlUGF0aDogU3RyaW5nLFxuICAgIHNlbmRNZXNzYWdlSW1nOiBTdHJpbmcsXG4gICAgc2hvd01lc3NhZ2VDYXJkOiBCb29sZWFuXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGhhbmRsZVRhcCAoKSB7XG4gICAgICBpZiAodGhpcy5kYXRhLmRpc2FibGVkKSByZXR1cm4gZmFsc2U7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCgnY2xpY2snKTtcbiAgICB9LFxuICAgIGJpbmRnZXR1c2VyaW5mbyh7IGRldGFpbCA9IHt9IH0gPSB7fSkge1xuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2dldHVzZXJpbmZvJywgZGV0YWlsKTtcbiAgICB9LFxuICAgIGJpbmRjb250YWN0KHsgZGV0YWlsID0ge30gfSA9IHt9KSB7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCgnY29udGFjdCcsIGRldGFpbCk7XG4gICAgfSxcbiAgICBiaW5kZ2V0cGhvbmVudW1iZXIoeyBkZXRhaWwgPSB7fSB9ID0ge30pIHtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdnZXRwaG9uZW51bWJlcicsIGRldGFpbCk7XG4gICAgfSxcbiAgICBiaW5kZXJyb3IoeyBkZXRhaWwgPSB7fSB9ID0ge30pIHtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdlcnJvcicsIGRldGFpbCk7XG4gICAgfVxuICB9XG59Il19