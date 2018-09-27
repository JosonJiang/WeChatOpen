'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: '<h1 class="md-h1">wxc-navbar</h1><blockquote>\n<p>navbar - \u5C0F\u7A0B\u5E8F\u7EC4\u4EF6</p>\n</blockquote>\n<h2 class="md-h2">Install</h2><code class="lang-bash md-code"><span class="hljs-symbol">$</span> <span class="hljs-built-in">min</span> install wxc-navbar</code><h2 class="md-h2">API</h2><h3 class="md-h3">Navbar</h3><table class="md-table">\n    <tr class="md-tr">\n<th class="md-th">\u540D\u79F0</th>\n<th class="md-th">\u63CF\u8FF0</th>\n</tr>\n\n    <tr class="md-tr">\n<td class="md-td"><code class="md-code">prop-name</code></td>\n<td class="md-td">\u63CF\u8FF0\u5C5E\u6027\u7684\u7C7B\u578B\uFF0C\u9ED8\u8BA4\u503C\u7B49</td>\n</tr>\n<tr class="md-tr">\n<td class="md-td"><code class="md-code">method-name</code></td>\n<td class="md-td">\u63CF\u8FF0\u65B9\u6CD5\u7684\u53C2\u6570\uFF0C\u8FD4\u56DE\u503C\u7B49</td>\n</tr>\n\n  </table><h2 class="md-h2">ChangeLog</h2><h4 class="md-h4">v1.0.0\uFF082018-9-21\uFF09</h4><ul>\n<li>\u521D\u59CB\u7248\u672C</li>\n</ul>\n'
    }
  },
  onClickLeft: function onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
  },
  onClickRight: function onClickRight() {
    wx.showToast({ title: '点击按钮', icon: 'none' });
  },

  methods: {}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwib25DbGlja0xlZnQiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsIm9uQ2xpY2tSaWdodCIsIm1ldGhvZHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQVFJQSxRQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUEsRztBQUdOQyxhLHlCQUFjO0FBQ1pDLE9BQUdDLFNBQUgsQ0FBYSxFQUFFQyxPQUFPLE1BQVQsRUFBaUJDLE1BQU0sTUFBdkIsRUFBYjtBQUNELEc7QUFFREMsYywwQkFBZTtBQUNiSixPQUFHQyxTQUFILENBQWEsRUFBRUMsT0FBTyxNQUFULEVBQWlCQyxNQUFNLE1BQXZCLEVBQWI7QUFDRCxHOztBQUNERSxXQUFTIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgICBjb25maWc6IHtcbiAgICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ3d4Yy1pY29uJzogJ3d4Yy1pY29uJyxcbiAgICAgICAgJ3d4Yy1uYXZiYXInOiAnd3hjLW5hdmJhcidcbiAgICAgIH1cbiAgICB9LFxuICAgIGRhdGE6IHtcblxuICAgIH0sXG4gICAgb25DbGlja0xlZnQoKSB7XG4gICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogJ+eCueWHu+i/lOWbnicsIGljb246ICdub25lJyB9KTtcbiAgICB9LFxuXG4gICAgb25DbGlja1JpZ2h0KCkge1xuICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6ICfngrnlh7vmjInpkq4nLCBpY29uOiAnbm9uZScgfSk7XG4gICAgfSxcbiAgICBtZXRob2RzOiB7IH1cbiAgfSJdfQ==