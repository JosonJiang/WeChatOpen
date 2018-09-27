'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  externalClasses: ['i-class'],
  properties: {
    name: {
      type: String,
      value: ''
    }
  },
  relations: {
    '../../wxc-index/dist/index': {
      type: 'parent'
    }
  },
  data: {
    top: 0,
    height: 0,
    currentName: ''
  },
  methods: {
    updateDataChange: function updateDataChange() {
      var _this = this;

      var className = '.i-index-item';
      var query = wx.createSelectorQuery().in(this);
      query.select(className).boundingClientRect(function (res) {
        _this.setData({
          top: res.top,
          height: res.height,
          currentName: _this.data.name
        });
      }).exec();
    }
  }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJiZWhhdmlvcnMiLCJleHRlcm5hbENsYXNzZXMiLCJwcm9wZXJ0aWVzIiwibmFtZSIsInR5cGUiLCJTdHJpbmciLCJ2YWx1ZSIsInJlbGF0aW9ucyIsImRhdGEiLCJ0b3AiLCJoZWlnaHQiLCJjdXJyZW50TmFtZSIsIm1ldGhvZHMiLCJ1cGRhdGVEYXRhQ2hhbmdlIiwiY2xhc3NOYW1lIiwicXVlcnkiLCJ3eCIsImNyZWF0ZVNlbGVjdG9yUXVlcnkiLCJpbiIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsInJlcyIsInNldERhdGEiLCJleGVjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLRUEsYUFBVyxFO0FBQ1hDLG1CQUFpQixDQUFDLFNBQUQsQztBQUNqQkMsY0FBYTtBQUNYQyxVQUFPO0FBQ0xDLFlBQU9DLE1BREY7QUFFTEMsYUFBUTtBQUZIO0FBREksRztBQU1iQyxhQUFZO0FBQ1Ysa0NBQStCO0FBQzdCSCxZQUFPO0FBRHNCO0FBRHJCLEc7QUFLWkksUUFBTztBQUNMQyxTQUFNLENBREQ7QUFFTEMsWUFBUyxDQUZKO0FBR0xDLGlCQUFjO0FBSFQsRztBQUtQQyxXQUFTO0FBQ1BDLG9CQURPLDhCQUNZO0FBQUE7O0FBQ2pCLFVBQU1DLFlBQVksZUFBbEI7QUFDQSxVQUFNQyxRQUFRQyxHQUFHQyxtQkFBSCxHQUF5QkMsRUFBekIsQ0FBNEIsSUFBNUIsQ0FBZDtBQUNBSCxZQUFNSSxNQUFOLENBQWNMLFNBQWQsRUFBMEJNLGtCQUExQixDQUE2QyxVQUFDQyxHQUFELEVBQU87QUFDbEQsY0FBS0MsT0FBTCxDQUFhO0FBQ1hiLGVBQU1ZLElBQUlaLEdBREM7QUFFWEMsa0JBQVNXLElBQUlYLE1BRkY7QUFHWEMsdUJBQWMsTUFBS0gsSUFBTCxDQUFVTDtBQUhiLFNBQWI7QUFLRCxPQU5ELEVBTUdvQixJQU5IO0FBT0Q7QUFYTSIsImZpbGUiOiJpbmRleC53eGMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGNvbmZpZzoge1xuICAgIGNvbXBvbmVudDogdHJ1ZSxcbiAgICB1c2luZ0NvbXBvbmVudHM6IHsgfVxuICB9LFxuICBiZWhhdmlvcnM6IFsgXSxcbiAgZXh0ZXJuYWxDbGFzc2VzOiBbJ2ktY2xhc3MnXSxcbiAgcHJvcGVydGllcyA6IHtcbiAgICBuYW1lIDoge1xuICAgICAgdHlwZSA6IFN0cmluZyxcbiAgICAgIHZhbHVlIDogJydcbiAgICB9XG4gIH0sXG4gIHJlbGF0aW9ucyA6IHtcbiAgICAnLi4vLi4vd3hjLWluZGV4L2Rpc3QvaW5kZXgnIDoge1xuICAgICAgdHlwZSA6ICdwYXJlbnQnXG4gICAgfVxuICB9LFxuICBkYXRhIDoge1xuICAgIHRvcCA6IDAsXG4gICAgaGVpZ2h0IDogMCxcbiAgICBjdXJyZW50TmFtZSA6ICcnXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICB1cGRhdGVEYXRhQ2hhbmdlKCkge1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gJy5pLWluZGV4LWl0ZW0nO1xuICAgICAgY29uc3QgcXVlcnkgPSB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KCkuaW4odGhpcyk7XG4gICAgICBxdWVyeS5zZWxlY3QoIGNsYXNzTmFtZSApLmJvdW5kaW5nQ2xpZW50UmVjdCgocmVzKT0+e1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHRvcCA6IHJlcy50b3AsXG4gICAgICAgICAgaGVpZ2h0IDogcmVzLmhlaWdodCxcbiAgICAgICAgICBjdXJyZW50TmFtZSA6IHRoaXMuZGF0YS5uYW1lXG4gICAgICAgIH0pXG4gICAgICB9KS5leGVjKClcbiAgICB9XG4gIH1cblxufSJdfQ==