'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  externalClasses: ['i-class'],
  properties: {
    percent: {
      type: Number,
      value: 0
    },
    // normal || active || wrong || success
    status: {
      type: String,
      value: 'normal'
    },
    strokeWidth: {
      type: Number,
      value: 10
    },
    hideInfo: {
      type: Boolean,
      value: false
    }
  },
  data: {},
  methods: {}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJiZWhhdmlvcnMiLCJleHRlcm5hbENsYXNzZXMiLCJwcm9wZXJ0aWVzIiwicGVyY2VudCIsInR5cGUiLCJOdW1iZXIiLCJ2YWx1ZSIsInN0YXR1cyIsIlN0cmluZyIsInN0cm9rZVdpZHRoIiwiaGlkZUluZm8iLCJCb29sZWFuIiwiZGF0YSIsIm1ldGhvZHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtFQSxhQUFXLEU7QUFDWEMsbUJBQWlCLENBQUMsU0FBRCxDO0FBQ2pCQyxjQUFZO0FBQ1ZDLGFBQVM7QUFDUEMsWUFBTUMsTUFEQztBQUVQQyxhQUFPO0FBRkEsS0FEQztBQUtWO0FBQ0FDLFlBQVE7QUFDTkgsWUFBTUksTUFEQTtBQUVORixhQUFPO0FBRkQsS0FORTtBQVVWRyxpQkFBYTtBQUNYTCxZQUFNQyxNQURLO0FBRVhDLGFBQU87QUFGSSxLQVZIO0FBY1ZJLGNBQVU7QUFDUk4sWUFBTU8sT0FERTtBQUVSTCxhQUFPO0FBRkM7QUFkQSxHO0FBbUJaTSxRQUFNLEU7QUFDTkMsV0FBUyIsImZpbGUiOiJpbmRleC53eGMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIGNvbXBvbmVudDogdHJ1ZSxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHsgfVxuICB9LFxuICBiZWhhdmlvcnM6IFsgXSxcbiAgZXh0ZXJuYWxDbGFzc2VzOiBbJ2ktY2xhc3MnXSxcbiAgcHJvcGVydGllczoge1xuICAgIHBlcmNlbnQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiAwXG4gICAgfSxcbiAgICAvLyBub3JtYWwgfHwgYWN0aXZlIHx8IHdyb25nIHx8IHN1Y2Nlc3NcbiAgICBzdGF0dXM6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnbm9ybWFsJ1xuICAgIH0sXG4gICAgc3Ryb2tlV2lkdGg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiAxMFxuICAgIH0sXG4gICAgaGlkZUluZm86IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9XG4gIH0sXG4gIGRhdGE6IHsgfSxcbiAgbWV0aG9kczogeyB9XG59Il19