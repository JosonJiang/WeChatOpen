"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  externalClasses: ['i-class', 'i-class-mask', 'i-class-header'],
  options: {
    multipleSlots: true
  },
  behaviors: [],
  data: {},
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    showCancel: {
      type: Boolean,
      value: false
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    actions: {
      type: Array,
      value: []
    }
  },
  methods: {
    handleClickMask: function handleClickMask() {
      if (!this.data.maskClosable) return;
      this.handleClickCancel();
    },
    handleClickItem: function handleClickItem(_ref) {
      var _ref$currentTarget = _ref.currentTarget,
          currentTarget = _ref$currentTarget === undefined ? {} : _ref$currentTarget;

      var dataset = currentTarget.dataset || {};
      var index = dataset.index;

      this.triggerEvent('click', { index: index });
    },
    handleClickCancel: function handleClickCancel() {
      this.triggerEvent('cancel');
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJleHRlcm5hbENsYXNzZXMiLCJvcHRpb25zIiwibXVsdGlwbGVTbG90cyIsImJlaGF2aW9ycyIsImRhdGEiLCJwcm9wZXJ0aWVzIiwidmlzaWJsZSIsInR5cGUiLCJCb29sZWFuIiwidmFsdWUiLCJtYXNrQ2xvc2FibGUiLCJzaG93Q2FuY2VsIiwiY2FuY2VsVGV4dCIsIlN0cmluZyIsImFjdGlvbnMiLCJBcnJheSIsIm1ldGhvZHMiLCJoYW5kbGVDbGlja01hc2siLCJoYW5kbGVDbGlja0NhbmNlbCIsImhhbmRsZUNsaWNrSXRlbSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaW5kZXgiLCJ0cmlnZ2VyRXZlbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQVFFQSxtQkFBaUIsQ0FBQyxTQUFELEVBQVksY0FBWixFQUE0QixnQkFBNUIsQztBQUNqQkMsV0FBUztBQUNQQyxtQkFBZTtBQURSLEc7QUFHVEMsYUFBVyxFO0FBQ1hDLFFBQU0sRTtBQUNOQyxjQUFZO0FBQ1ZDLGFBQVM7QUFDUEMsWUFBTUMsT0FEQztBQUVQQyxhQUFPO0FBRkEsS0FEQztBQUtWQyxrQkFBYztBQUNaSCxZQUFNQyxPQURNO0FBRVpDLGFBQU87QUFGSyxLQUxKO0FBU1ZFLGdCQUFZO0FBQ1ZKLFlBQU1DLE9BREk7QUFFVkMsYUFBTztBQUZHLEtBVEY7QUFhVkcsZ0JBQVk7QUFDVkwsWUFBTU0sTUFESTtBQUVWSixhQUFPO0FBRkcsS0FiRjtBQWlCVkssYUFBUztBQUNQUCxZQUFNUSxLQURDO0FBRVBOLGFBQU87QUFGQTtBQWpCQyxHO0FBc0JaTyxXQUFTO0FBQ1BDLG1CQURPLDZCQUNZO0FBQ2pCLFVBQUksQ0FBQyxLQUFLYixJQUFMLENBQVVNLFlBQWYsRUFBNkI7QUFDN0IsV0FBS1EsaUJBQUw7QUFDRCxLQUpNO0FBTVBDLG1CQU5PLGlDQU1rQztBQUFBLG9DQUF0QkMsYUFBc0I7QUFBQSxVQUF0QkEsYUFBc0Isc0NBQU4sRUFBTTs7QUFDdkMsVUFBTUMsVUFBVUQsY0FBY0MsT0FBZCxJQUF5QixFQUF6QztBQUR1QyxVQUUvQkMsS0FGK0IsR0FFckJELE9BRnFCLENBRS9CQyxLQUYrQjs7QUFHdkMsV0FBS0MsWUFBTCxDQUFrQixPQUFsQixFQUEyQixFQUFFRCxZQUFGLEVBQTNCO0FBQ0QsS0FWTTtBQVlQSixxQkFaTywrQkFZYztBQUNuQixXQUFLSyxZQUFMLENBQWtCLFFBQWxCO0FBQ0Q7QUFkTSIsImZpbGUiOiJpbmRleC53eGMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIGNvbXBvbmVudDogdHJ1ZSxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgIFwiaS1idXR0b25cIjogXCJ3eGMtYnV0dG9uXCIsXG4gICAgICBcImktaWNvblwiOiBcInd4Yy1pY29uXCJcbiAgICB9XG4gIH0sXG4gIGV4dGVybmFsQ2xhc3NlczogWydpLWNsYXNzJywgJ2ktY2xhc3MtbWFzaycsICdpLWNsYXNzLWhlYWRlciddLFxuICBvcHRpb25zOiB7XG4gICAgbXVsdGlwbGVTbG90czogdHJ1ZVxuICB9LFxuICBiZWhhdmlvcnM6IFsgXSxcbiAgZGF0YTogeyB9LFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgdmlzaWJsZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH0sXG4gICAgbWFza0Nsb3NhYmxlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IHRydWVcbiAgICB9LFxuICAgIHNob3dDYW5jZWw6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9LFxuICAgIGNhbmNlbFRleHQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAn5Y+W5raIJ1xuICAgIH0sXG4gICAgYWN0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICB2YWx1ZTogW11cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBoYW5kbGVDbGlja01hc2sgKCkge1xuICAgICAgaWYgKCF0aGlzLmRhdGEubWFza0Nsb3NhYmxlKSByZXR1cm47XG4gICAgICB0aGlzLmhhbmRsZUNsaWNrQ2FuY2VsKCk7XG4gICAgfSxcblxuICAgIGhhbmRsZUNsaWNrSXRlbSAoeyBjdXJyZW50VGFyZ2V0ID0ge30gfSkge1xuICAgICAgY29uc3QgZGF0YXNldCA9IGN1cnJlbnRUYXJnZXQuZGF0YXNldCB8fCB7fTtcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IGRhdGFzZXQ7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCgnY2xpY2snLCB7IGluZGV4IH0pO1xuICAgIH0sXG5cbiAgICBoYW5kbGVDbGlja0NhbmNlbCAoKSB7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCgnY2FuY2VsJyk7XG4gICAgfVxuICB9XG59Il19