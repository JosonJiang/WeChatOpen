"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  options: {
    multipleSlots: true
  },
  behaviors: [],

  data: {},
  externalClasses: ['custom-class'],
  properties: {
    title: String,
    leftText: String,
    rightText: String,
    leftArrow: {
      type: Boolean,
      value: true
    },
    fixed: Boolean,
    size: {
      type: Number,
      value: 48
    },
    color: {
      type: String,
      value: "#333"
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },
  methods: {
    onClickLeft: function onClickLeft() {
      this.triggerEvent('click-left');
    },
    onClickRight: function onClickRight() {
      this.triggerEvent('click-right');
    }
  }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJvcHRpb25zIiwibXVsdGlwbGVTbG90cyIsImJlaGF2aW9ycyIsImRhdGEiLCJleHRlcm5hbENsYXNzZXMiLCJwcm9wZXJ0aWVzIiwidGl0bGUiLCJTdHJpbmciLCJsZWZ0VGV4dCIsInJpZ2h0VGV4dCIsImxlZnRBcnJvdyIsInR5cGUiLCJCb29sZWFuIiwidmFsdWUiLCJmaXhlZCIsInNpemUiLCJOdW1iZXIiLCJjb2xvciIsInpJbmRleCIsIm1ldGhvZHMiLCJvbkNsaWNrTGVmdCIsInRyaWdnZXJFdmVudCIsIm9uQ2xpY2tSaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBUUVBLFdBQVM7QUFDUEMsbUJBQWU7QUFEUixHO0FBR1RDLGFBQVcsRTs7QUFFWEMsUUFBTSxFO0FBQ05DLG1CQUFpQixDQUFDLGNBQUQsQztBQUNqQkMsY0FBWTtBQUNWQyxXQUFPQyxNQURHO0FBRVZDLGNBQVVELE1BRkE7QUFHVkUsZUFBV0YsTUFIRDtBQUlWRyxlQUFXO0FBQ1RDLFlBQU1DLE9BREc7QUFFVEMsYUFBTztBQUZFLEtBSkQ7QUFRVkMsV0FBT0YsT0FSRztBQVNWRyxVQUFLO0FBQ0hKLFlBQU1LLE1BREg7QUFFSEgsYUFBTztBQUZKLEtBVEs7QUFhVkksV0FBTTtBQUNKTixZQUFNSixNQURGO0FBRUpNLGFBQU87QUFGSCxLQWJJO0FBaUJWSyxZQUFRO0FBQ05QLFlBQU1LLE1BREE7QUFFTkgsYUFBTztBQUZEO0FBakJFLEc7QUFzQlpNLFdBQVM7QUFDUEMsZUFETyx5QkFDTztBQUNaLFdBQUtDLFlBQUwsQ0FBa0IsWUFBbEI7QUFDRCxLQUhNO0FBS1BDLGdCQUxPLDBCQUtRO0FBQ2IsV0FBS0QsWUFBTCxDQUFrQixhQUFsQjtBQUNEO0FBUE0iLCJmaWxlIjoiaW5kZXgud3hjIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBjb21wb25lbnQ6IHRydWUsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICBcInd4Yy1pY29uXCI6IFwid3hjLWljb25cIixcbiAgICAgIFwid3hjLWJsb2NrXCI6XCJ3eGMtYmxvY2tcIlxuICAgIH1cbiAgfSxcbiAgb3B0aW9uczoge1xuICAgIG11bHRpcGxlU2xvdHM6IHRydWVcbiAgfSxcbiAgYmVoYXZpb3JzOiBbIF0sXG5cbiAgZGF0YTogeyB9LFxuICBleHRlcm5hbENsYXNzZXM6IFsnY3VzdG9tLWNsYXNzJ10sXG4gIHByb3BlcnRpZXM6IHtcbiAgICB0aXRsZTogU3RyaW5nLFxuICAgIGxlZnRUZXh0OiBTdHJpbmcsXG4gICAgcmlnaHRUZXh0OiBTdHJpbmcsXG4gICAgbGVmdEFycm93OiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IHRydWVcbiAgICB9LFxuICAgIGZpeGVkOiBCb29sZWFuLFxuICAgIHNpemU6e1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDQ4XG4gICAgfSxcbiAgICBjb2xvcjp7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWx1ZTogXCIjMzMzXCJcbiAgICB9LFxuICAgIHpJbmRleDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDFcbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvbkNsaWNrTGVmdCgpIHtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdjbGljay1sZWZ0Jyk7XG4gICAgfSxcblxuICAgIG9uQ2xpY2tSaWdodCgpIHtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdjbGljay1yaWdodCcpO1xuICAgIH1cbiAgfVxuXG59Il19