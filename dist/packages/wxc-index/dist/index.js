'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  externalClasses: ['i-class'],
  properties: {
    height: {
      type: String,
      value: '300'
    },
    itemHeight: {
      type: Number,
      value: 18
    }
  },
  relations: {
    '../../wxc-index-item/dist/index': {
      type: 'child',
      linked: function linked() {
        this._updateDataChange();
      },
      linkChanged: function linkChanged() {
        this._updateDataChange();
      },
      unlinked: function unlinked() {
        this._updateDataChange();
      }
    }
  },
  data: {
    scrollTop: 0,
    fixedData: [],
    current: 0,
    timer: null,
    startTop: 0,
    itemLength: 0,
    currentName: '',
    isTouches: false
  },
  methods: {
    loop: function loop() {},
    _updateDataChange: function _updateDataChange() {
      var _this = this;

      var indexItems = this.getRelationNodes('../../wxc-index-item/dist/index');
      var len = indexItems.length;
      var fixedData = this.data.fixedData;
      /*
       * 使用函数节流限制重复去设置数组内容进而限制多次重复渲染
       * 暂时没有研究微信在渲染的时候是否会进行函数节流
      */
      if (len > 0) {

        if (this.data.timer) {
          clearTimeout(this.data.timer);
          this.setData({
            timer: null
          });
        }

        this.data.timer = setTimeout(function () {
          var data = [];
          indexItems.forEach(function (item) {
            if (item.data.name && fixedData.indexOf(item.data.name) === -1) {
              data.push(item.data.name);
              item.updateDataChange();
            }
          });
          _this.setData({
            fixedData: data,
            itemLength: indexItems.length
          });
          //组件加载完成之后重新设置顶部高度
          _this.setTouchStartVal();
        }, 0);
        this.setData({
          timer: this.data.timer
        });
      }
    },
    handlerScroll: function handlerScroll(event) {
      var _this2 = this;

      var detail = event.detail;
      var scrollTop = detail.scrollTop;
      var indexItems = this.getRelationNodes('../../wxc-index-item/dist/index');
      indexItems.forEach(function (item, index) {
        var data = item.data;
        var offset = data.top + data.height;
        if (scrollTop < offset && scrollTop >= data.top) {
          _this2.setData({
            current: index,
            currentName: data.currentName
          });
        }
      });
    },
    getCurrentItem: function getCurrentItem(index) {

      var indexItems = this.getRelationNodes('../../wxc-index-item/dist/index');
      var result = {};
      result = indexItems[index].data;
      result.total = indexItems.length;
      return result;
    },
    triggerCallback: function triggerCallback(options) {
      this.triggerEvent('change', options);
    },
    handlerFixedTap: function handlerFixedTap(event) {

      var eindex = event.currentTarget.dataset.index;
      var item = this.getCurrentItem(eindex);
      this.setData({
        scrollTop: item.top,
        currentName: item.currentName,
        isTouches: true
      });

      this.triggerCallback({
        index: eindex,
        current: item.currentName
      });
    },
    handlerTouchMove: function handlerTouchMove(event) {

      var data = this.data;
      var touches = event.touches[0] || {};
      var pageY = touches.pageY;
      var rest = pageY - data.startTop;
      var index = Math.ceil(rest / data.itemHeight);
      index = index >= data.itemLength ? data.itemLength - 1 : index;
      var movePosition = this.getCurrentItem(index);

      /*
       * 当touch选中的元素和当前currentName不相等的时候才震动一下
       * 微信震动事件
      */
      if (movePosition.name !== this.data.currentName) {
        wx.vibrateShort();
      }

      this.setData({
        scrollTop: movePosition.top,
        currentName: movePosition.name,
        isTouches: true
      });

      this.triggerCallback({
        index: index,
        current: movePosition.name
      });
    },
    handlerTouchEnd: function handlerTouchEnd() {
      this.setData({
        isTouches: false
      });
    },
    setTouchStartVal: function setTouchStartVal() {
      var _this3 = this;

      var className = '.i-index-fixed';
      var query = wx.createSelectorQuery().in(this);
      query.select(className).boundingClientRect(function (res) {
        _this3.setData({
          startTop: res.top
        });
      }).exec();
    }
  }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJiZWhhdmlvcnMiLCJleHRlcm5hbENsYXNzZXMiLCJwcm9wZXJ0aWVzIiwiaGVpZ2h0IiwidHlwZSIsIlN0cmluZyIsInZhbHVlIiwiaXRlbUhlaWdodCIsIk51bWJlciIsInJlbGF0aW9ucyIsImxpbmtlZCIsIl91cGRhdGVEYXRhQ2hhbmdlIiwibGlua0NoYW5nZWQiLCJ1bmxpbmtlZCIsImRhdGEiLCJzY3JvbGxUb3AiLCJmaXhlZERhdGEiLCJjdXJyZW50IiwidGltZXIiLCJzdGFydFRvcCIsIml0ZW1MZW5ndGgiLCJjdXJyZW50TmFtZSIsImlzVG91Y2hlcyIsIm1ldGhvZHMiLCJsb29wIiwiaW5kZXhJdGVtcyIsImdldFJlbGF0aW9uTm9kZXMiLCJsZW4iLCJsZW5ndGgiLCJjbGVhclRpbWVvdXQiLCJzZXREYXRhIiwic2V0VGltZW91dCIsImZvckVhY2giLCJpdGVtIiwibmFtZSIsImluZGV4T2YiLCJwdXNoIiwidXBkYXRlRGF0YUNoYW5nZSIsInNldFRvdWNoU3RhcnRWYWwiLCJoYW5kbGVyU2Nyb2xsIiwiZXZlbnQiLCJkZXRhaWwiLCJpbmRleCIsIm9mZnNldCIsInRvcCIsImdldEN1cnJlbnRJdGVtIiwicmVzdWx0IiwidG90YWwiLCJ0cmlnZ2VyQ2FsbGJhY2siLCJvcHRpb25zIiwidHJpZ2dlckV2ZW50IiwiaGFuZGxlckZpeGVkVGFwIiwiZWluZGV4IiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJoYW5kbGVyVG91Y2hNb3ZlIiwidG91Y2hlcyIsInBhZ2VZIiwicmVzdCIsIk1hdGgiLCJjZWlsIiwibW92ZVBvc2l0aW9uIiwid3giLCJ2aWJyYXRlU2hvcnQiLCJoYW5kbGVyVG91Y2hFbmQiLCJjbGFzc05hbWUiLCJxdWVyeSIsImNyZWF0ZVNlbGVjdG9yUXVlcnkiLCJpbiIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsInJlcyIsImV4ZWMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtF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QU1tQixlQUFlLEtBQUtoQixjQUFMLENBQW9CSCxLQUFwQixDQUFyQjs7QUFFQTs7OztBQUlBLFVBQUltQixhQUFhM0IsSUFBYixLQUFzQixLQUFLcEIsSUFBTCxDQUFVTyxXQUFwQyxFQUFpRDtBQUMvQ3lDLFdBQUdDLFlBQUg7QUFDRDs7QUFFRCxXQUFLakMsT0FBTCxDQUFhO0FBQ1hmLG1CQUFZOEMsYUFBYWpCLEdBRGQ7QUFFWHZCLHFCQUFjd0MsYUFBYTNCLElBRmhCO0FBR1haLG1CQUFZO0FBSEQsT0FBYjs7QUFNQSxXQUFLMEIsZUFBTCxDQUFxQjtBQUNuQk4sZUFBUUEsS0FEVztBQUVuQnpCLGlCQUFVNEMsYUFBYTNCO0FBRkosT0FBckI7QUFJRCxLQWhITztBQWlIUjhCLG1CQWpIUSw2QkFpSFM7QUFDZixXQUFLbEMsT0FBTCxDQUFhO0FBQ1hSLG1CQUFZO0FBREQsT0FBYjtBQUdELEtBckhPO0FBc0hSZ0Isb0JBdEhRLDhCQXNIVTtBQUFBOztBQUNoQixVQUFNMkIsWUFBWSxnQkFBbEI7QUFDQSxVQUFNQyxRQUFRSixHQUFHSyxtQkFBSCxHQUF5QkMsRUFBekIsQ0FBNEIsSUFBNUIsQ0FBZDtBQUNBRixZQUFNRyxNQUFOLENBQWNKLFNBQWQsRUFBMEJLLGtCQUExQixDQUE2QyxVQUFDQyxHQUFELEVBQU87QUFDbEQsZUFBS3pDLE9BQUwsQ0FBYTtBQUNYWCxvQkFBV29ELElBQUkzQjtBQURKLFNBQWI7QUFHRCxPQUpELEVBSUc0QixJQUpIO0FBS0Q7QUE5SE8iLCJmaWxlIjoiaW5kZXgud3hjIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBjb21wb25lbnQ6IHRydWUsXG4gICAgdXNpbmdDb21wb25lbnRzOiB7IH1cbiAgfSxcbiAgYmVoYXZpb3JzOiBbIF0sXG4gIGV4dGVybmFsQ2xhc3NlczogWydpLWNsYXNzJ10sXG4gIHByb3BlcnRpZXMgOiB7XG4gICAgaGVpZ2h0IDoge1xuICAgICAgdHlwZSA6IFN0cmluZyxcbiAgICAgIHZhbHVlIDogJzMwMCdcbiAgICB9LFxuICAgIGl0ZW1IZWlnaHQgOiB7XG4gICAgICB0eXBlIDogTnVtYmVyLFxuICAgICAgdmFsdWUgOiAxOFxuICAgIH1cbiAgfSxcbiAgcmVsYXRpb25zIDoge1xuICAgICcuLi8uLi93eGMtaW5kZXgtaXRlbS9kaXN0L2luZGV4JyA6IHtcbiAgICAgIHR5cGUgOiAnY2hpbGQnLFxuICAgICAgbGlua2VkKCl7XG4gICAgICAgIHRoaXMuX3VwZGF0ZURhdGFDaGFuZ2UoKTtcbiAgICAgIH0sXG4gICAgICBsaW5rQ2hhbmdlZCAoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZURhdGFDaGFuZ2UoKTtcbiAgICAgIH0sXG4gICAgICB1bmxpbmtlZCAoKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZURhdGFDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGRhdGEgOiB7XG4gICAgc2Nyb2xsVG9wIDogMCxcbiAgICBmaXhlZERhdGEgOiBbXSxcbiAgICBjdXJyZW50IDogMCxcbiAgICB0aW1lciA6IG51bGwsXG4gICAgc3RhcnRUb3AgOiAwLFxuICAgIGl0ZW1MZW5ndGggOiAwLFxuICAgIGN1cnJlbnROYW1lIDogJycsXG4gICAgaXNUb3VjaGVzIDogZmFsc2VcbiAgfSxcbiAgbWV0aG9kcyA6IHtcbiAgICBsb29wKCl7fSxcbiAgICBfdXBkYXRlRGF0YUNoYW5nZSggKXtcbiAgICAgIGNvbnN0IGluZGV4SXRlbXMgPSB0aGlzLmdldFJlbGF0aW9uTm9kZXMoJy4uLy4uL3d4Yy1pbmRleC1pdGVtL2Rpc3QvaW5kZXgnKTtcbiAgICAgIGNvbnN0IGxlbiA9IGluZGV4SXRlbXMubGVuZ3RoO1xuICAgICAgY29uc3QgZml4ZWREYXRhID0gdGhpcy5kYXRhLmZpeGVkRGF0YTtcbiAgICAgIC8qXG4gICAgICAgKiDkvb/nlKjlh73mlbDoioLmtYHpmZDliLbph43lpI3ljrvorr7nva7mlbDnu4TlhoXlrrnov5vogIzpmZDliLblpJrmrKHph43lpI3muLLmn5NcbiAgICAgICAqIOaaguaXtuayoeacieeglOeptuW+ruS/oeWcqOa4suafk+eahOaXtuWAmeaYr+WQpuS8mui/m+ihjOWHveaVsOiKgua1gVxuICAgICAgKi9cbiAgICAgIGlmIChsZW4gPiAwKSB7XG5cbiAgICAgICAgaWYoIHRoaXMuZGF0YS50aW1lciApe1xuICAgICAgICAgIGNsZWFyVGltZW91dCggdGhpcy5kYXRhLnRpbWVyICk7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHRpbWVyIDogbnVsbFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGEudGltZXIgPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgY29uc3QgZGF0YSA9IFtdO1xuICAgICAgICAgIGluZGV4SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaWYoIGl0ZW0uZGF0YS5uYW1lICYmIGZpeGVkRGF0YS5pbmRleE9mKCBpdGVtLmRhdGEubmFtZSApID09PSAtMSApe1xuICAgICAgICAgICAgICBkYXRhLnB1c2goaXRlbS5kYXRhLm5hbWUpO1xuICAgICAgICAgICAgICBpdGVtLnVwZGF0ZURhdGFDaGFuZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgZml4ZWREYXRhIDogZGF0YSxcbiAgICAgICAgICAgIGl0ZW1MZW5ndGggOiBpbmRleEl0ZW1zLmxlbmd0aFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8v57uE5Lu25Yqg6L295a6M5oiQ5LmL5ZCO6YeN5paw6K6+572u6aG26YOo6auY5bqmXG4gICAgICAgICAgdGhpcy5zZXRUb3VjaFN0YXJ0VmFsKCk7XG4gICAgICAgIH0sMCk7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgdGltZXIgOiB0aGlzLmRhdGEudGltZXJcbiAgICAgICAgfSlcblxuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlclNjcm9sbChldmVudCl7XG5cbiAgICAgIGNvbnN0IGRldGFpbCA9IGV2ZW50LmRldGFpbDtcbiAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IGRldGFpbC5zY3JvbGxUb3A7XG4gICAgICBjb25zdCBpbmRleEl0ZW1zID0gdGhpcy5nZXRSZWxhdGlvbk5vZGVzKCcuLi8uLi93eGMtaW5kZXgtaXRlbS9kaXN0L2luZGV4Jyk7XG4gICAgICBpbmRleEl0ZW1zLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG4gICAgICAgIGxldCBkYXRhID0gaXRlbS5kYXRhO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gZGF0YS50b3AgKyBkYXRhLmhlaWdodDtcbiAgICAgICAgaWYoIHNjcm9sbFRvcCA8IG9mZnNldCAmJiBzY3JvbGxUb3AgPj0gZGF0YS50b3AgKXtcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgY3VycmVudCA6IGluZGV4LFxuICAgICAgICAgICAgY3VycmVudE5hbWUgOiBkYXRhLmN1cnJlbnROYW1lXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIH0sXG4gICAgZ2V0Q3VycmVudEl0ZW0oaW5kZXgpe1xuXG4gICAgICBjb25zdCBpbmRleEl0ZW1zID0gdGhpcy5nZXRSZWxhdGlvbk5vZGVzKCcuLi8uLi93eGMtaW5kZXgtaXRlbS9kaXN0L2luZGV4Jyk7XG4gICAgICBsZXQgcmVzdWx0ID0ge307XG4gICAgICByZXN1bHQgPSBpbmRleEl0ZW1zW2luZGV4XS5kYXRhO1xuICAgICAgcmVzdWx0LnRvdGFsID0gaW5kZXhJdGVtcy5sZW5ndGg7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgfSxcbiAgICB0cmlnZ2VyQ2FsbGJhY2sob3B0aW9ucyl7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCgnY2hhbmdlJyxvcHRpb25zKVxuICAgIH0sXG4gICAgaGFuZGxlckZpeGVkVGFwKGV2ZW50KXtcblxuICAgICAgY29uc3QgZWluZGV4ID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXMuZ2V0Q3VycmVudEl0ZW0oZWluZGV4KTtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHNjcm9sbFRvcCA6IGl0ZW0udG9wLFxuICAgICAgICBjdXJyZW50TmFtZSA6IGl0ZW0uY3VycmVudE5hbWUsXG4gICAgICAgIGlzVG91Y2hlcyA6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXJDYWxsYmFjayh7XG4gICAgICAgIGluZGV4IDogZWluZGV4LFxuICAgICAgICBjdXJyZW50IDogaXRlbS5jdXJyZW50TmFtZVxuICAgICAgfSlcbiAgICB9LFxuICAgIGhhbmRsZXJUb3VjaE1vdmUoZXZlbnQpe1xuXG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5kYXRhO1xuICAgICAgY29uc3QgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXNbMF0gfHwge307XG4gICAgICBjb25zdCBwYWdlWSA9IHRvdWNoZXMucGFnZVk7XG4gICAgICBjb25zdCByZXN0ID0gcGFnZVkgLSBkYXRhLnN0YXJ0VG9wO1xuICAgICAgbGV0IGluZGV4ID0gTWF0aC5jZWlsKCByZXN0L2RhdGEuaXRlbUhlaWdodCApO1xuICAgICAgaW5kZXggPSBpbmRleCA+PSBkYXRhLml0ZW1MZW5ndGggPyBkYXRhLml0ZW1MZW5ndGggLTEgOiBpbmRleDtcbiAgICAgIGNvbnN0IG1vdmVQb3NpdGlvbiA9IHRoaXMuZ2V0Q3VycmVudEl0ZW0oaW5kZXgpO1xuXG4gICAgICAvKlxuICAgICAgICog5b2TdG91Y2jpgInkuK3nmoTlhYPntKDlkozlvZPliY1jdXJyZW50TmFtZeS4jeebuOetieeahOaXtuWAmeaJjemch+WKqOS4gOS4i1xuICAgICAgICog5b6u5L+h6ZyH5Yqo5LqL5Lu2XG4gICAgICAqL1xuICAgICAgaWYoIG1vdmVQb3NpdGlvbi5uYW1lICE9PSB0aGlzLmRhdGEuY3VycmVudE5hbWUgKXtcbiAgICAgICAgd3gudmlicmF0ZVNob3J0KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHNjcm9sbFRvcCA6IG1vdmVQb3NpdGlvbi50b3AsXG4gICAgICAgIGN1cnJlbnROYW1lIDogbW92ZVBvc2l0aW9uLm5hbWUsXG4gICAgICAgIGlzVG91Y2hlcyA6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnRyaWdnZXJDYWxsYmFjayh7XG4gICAgICAgIGluZGV4IDogaW5kZXgsXG4gICAgICAgIGN1cnJlbnQgOiBtb3ZlUG9zaXRpb24ubmFtZVxuICAgICAgfSlcbiAgICB9LFxuICAgIGhhbmRsZXJUb3VjaEVuZCgpe1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgaXNUb3VjaGVzIDogZmFsc2VcbiAgICAgIH0pXG4gICAgfSxcbiAgICBzZXRUb3VjaFN0YXJ0VmFsKCl7XG4gICAgICBjb25zdCBjbGFzc05hbWUgPSAnLmktaW5kZXgtZml4ZWQnO1xuICAgICAgY29uc3QgcXVlcnkgPSB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KCkuaW4odGhpcyk7XG4gICAgICBxdWVyeS5zZWxlY3QoIGNsYXNzTmFtZSApLmJvdW5kaW5nQ2xpZW50UmVjdCgocmVzKT0+e1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHN0YXJ0VG9wIDogcmVzLnRvcFxuICAgICAgICB9KVxuICAgICAgfSkuZXhlYygpXG4gICAgfVxuICB9XG5cbn0iXX0=