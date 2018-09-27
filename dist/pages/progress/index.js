'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: '<h1 class="md-h1">wxc-progress</h1><blockquote>\n<p>progress - \u5C0F\u7A0B\u5E8F\u7EC4\u4EF6</p>\n</blockquote>\n<h2 class="md-h2">Install</h2><code class="lang-bash md-code"><span class="hljs-symbol">$</span> <span class="hljs-built-in">min</span> install wxc-progress</code><h2 class="md-h2">API</h2><h3 class="md-h3">Progress</h3><table class="md-table">\n    <tr class="md-tr">\n<th class="md-th">\u540D\u79F0</th>\n<th class="md-th">\u63CF\u8FF0</th>\n</tr>\n\n    <tr class="md-tr">\n<td class="md-td"><code class="md-code">prop-name</code></td>\n<td class="md-td">\u63CF\u8FF0\u5C5E\u6027\u7684\u7C7B\u578B\uFF0C\u9ED8\u8BA4\u503C\u7B49</td>\n</tr>\n<tr class="md-tr">\n<td class="md-td"><code class="md-code">method-name</code></td>\n<td class="md-td">\u63CF\u8FF0\u65B9\u6CD5\u7684\u53C2\u6570\uFF0C\u8FD4\u56DE\u503C\u7B49</td>\n</tr>\n\n  </table><h2 class="md-h2">ChangeLog</h2><h4 class="md-h4">v1.0.0\uFF082018-9-21\uFF09</h4><ul>\n<li>\u521D\u59CB\u7248\u672C</li>\n</ul>\n'
    },

    percent: 0,
    status: 'normal'
  },
  handleAdd: function handleAdd() {
    if (this.data.percent === 100) return;
    this.setData({
      percent: this.data.percent + 10
    });
    if (this.data.percent === 100) {
      this.setData({
        status: 'success'
      });
    }
  },
  handleReduce: function handleReduce() {
    if (this.data.percent === 0) return;
    this.setData({
      percent: this.data.percent - 10,
      status: 'normal'
    });
  },

  methods: {}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwicGVyY2VudCIsInN0YXR1cyIsImhhbmRsZUFkZCIsInNldERhdGEiLCJoYW5kbGVSZWR1Y2UiLCJtZXRob2RzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFRSUEsUUFBTTtBQUFBO0FBQUE7QUFBQTs7QUFDSkMsYUFBUyxDQURMO0FBRUpDLFlBQVE7QUFGSixHO0FBSU5DLFcsdUJBQWE7QUFDWCxRQUFJLEtBQUtILElBQUwsQ0FBVUMsT0FBVixLQUFzQixHQUExQixFQUErQjtBQUMvQixTQUFLRyxPQUFMLENBQWE7QUFDWEgsZUFBUyxLQUFLRCxJQUFMLENBQVVDLE9BQVYsR0FBb0I7QUFEbEIsS0FBYjtBQUdBLFFBQUksS0FBS0QsSUFBTCxDQUFVQyxPQUFWLEtBQXNCLEdBQTFCLEVBQStCO0FBQzdCLFdBQUtHLE9BQUwsQ0FBYTtBQUNYRixnQkFBUTtBQURHLE9BQWI7QUFHRDtBQUNGLEc7QUFDREcsYywwQkFBZ0I7QUFDZCxRQUFJLEtBQUtMLElBQUwsQ0FBVUMsT0FBVixLQUFzQixDQUExQixFQUE2QjtBQUM3QixTQUFLRyxPQUFMLENBQWE7QUFDWEgsZUFBUyxLQUFLRCxJQUFMLENBQVVDLE9BQVYsR0FBb0IsRUFEbEI7QUFFWEMsY0FBUTtBQUZHLEtBQWI7QUFJRCxHOztBQUNESSxXQUFTIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb25maWc6IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwiUHJvZ3Jlc3Mg6L+b5bqm5p2hXCIsXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ2ktcHJvZ3Jlc3MnOiAnd3hjLXByb2dyZXNzJyxcbiAgICAgICAgJ2ktYnV0dG9uJzogJ3d4Yy1idXR0b24nXG4gICAgICB9XG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICBwZXJjZW50OiAwLFxuICAgICAgc3RhdHVzOiAnbm9ybWFsJ1xuICAgIH0sXG4gICAgaGFuZGxlQWRkICgpIHtcbiAgICAgIGlmICh0aGlzLmRhdGEucGVyY2VudCA9PT0gMTAwKSByZXR1cm47XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBwZXJjZW50OiB0aGlzLmRhdGEucGVyY2VudCArIDEwXG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLmRhdGEucGVyY2VudCA9PT0gMTAwKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgc3RhdHVzOiAnc3VjY2VzcydcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVSZWR1Y2UgKCkge1xuICAgICAgaWYgKHRoaXMuZGF0YS5wZXJjZW50ID09PSAwKSByZXR1cm47XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBwZXJjZW50OiB0aGlzLmRhdGEucGVyY2VudCAtIDEwLFxuICAgICAgICBzdGF0dXM6ICdub3JtYWwnXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHsgfVxuICB9Il19