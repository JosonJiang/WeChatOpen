'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = Page({
  data: {
    '__code__': {
      readme: '<h1 class="md-h1">wxc-tag</h1><blockquote>\n<p>tag - \u5C0F\u7A0B\u5E8F\u7EC4\u4EF6</p>\n</blockquote>\n<h2 class="md-h2">Install</h2><code class="lang-bash md-code"><span class="hljs-symbol">$</span> <span class="hljs-built-in">min</span> install wxc-tag</code><h2 class="md-h2">API</h2><h3 class="md-h3">Tag</h3><table class="md-table">\n    <tr class="md-tr">\n<th class="md-th">\u540D\u79F0</th>\n<th class="md-th">\u63CF\u8FF0</th>\n</tr>\n\n    <tr class="md-tr">\n<td class="md-td"><code class="md-code">prop-name</code></td>\n<td class="md-td">\u63CF\u8FF0\u5C5E\u6027\u7684\u7C7B\u578B\uFF0C\u9ED8\u8BA4\u503C\u7B49</td>\n</tr>\n<tr class="md-tr">\n<td class="md-td"><code class="md-code">method-name</code></td>\n<td class="md-td">\u63CF\u8FF0\u65B9\u6CD5\u7684\u53C2\u6570\uFF0C\u8FD4\u56DE\u503C\u7B49</td>\n</tr>\n\n  </table><h2 class="md-h2">ChangeLog</h2><h4 class="md-h4">v1.0.0\uFF082018-9-20\uFF09</h4><ul>\n<li>\u521D\u59CB\u7248\u672C</li>\n</ul>\n'
    },

    oneChecked: false,
    tags: [{
      name: '标签一',
      checked: false,
      color: 'default'
    }, {
      name: '标签二',
      checked: false,
      color: 'red'
    }, {
      name: '标签三',
      checked: true,
      color: 'blue'
    }, {
      name: '标签4️',
      checked: true,
      color: 'green'
    }]
  },
  oneChange: function oneChange(event) {
    this.setData({
      'oneChecked': event.detail.checked
    });
  },
  onChange: function onChange(event) {
    var detail = event.detail;
    this.setData(_defineProperty({}, 'tags[' + event.detail.name + '].checked', detail.checked));
  },

  methods: {}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwib25lQ2hlY2tlZCIsInRhZ3MiLCJuYW1lIiwiY2hlY2tlZCIsImNvbG9yIiwib25lQ2hhbmdlIiwiZXZlbnQiLCJzZXREYXRhIiwiZGV0YWlsIiwib25DaGFuZ2UiLCJtZXRob2RzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFNSUEsUUFBTztBQUFBO0FBQUE7QUFBQTs7QUFDTEMsZ0JBQWEsS0FEUjtBQUVMQyxVQUFPLENBQ0w7QUFDRUMsWUFBTyxLQURUO0FBRUVDLGVBQVUsS0FGWjtBQUdFQyxhQUFRO0FBSFYsS0FESyxFQU1MO0FBQ0VGLFlBQU8sS0FEVDtBQUVFQyxlQUFVLEtBRlo7QUFHRUMsYUFBUTtBQUhWLEtBTkssRUFXTDtBQUNFRixZQUFPLEtBRFQ7QUFFRUMsZUFBVSxJQUZaO0FBR0VDLGFBQVE7QUFIVixLQVhLLEVBZ0JMO0FBQ0VGLFlBQU8sTUFEVDtBQUVFQyxlQUFVLElBRlo7QUFHRUMsYUFBUTtBQUhWLEtBaEJLO0FBRkYsRztBQXlCUEMsVyxxQkFBVUMsSyxFQUFNO0FBQ2QsU0FBS0MsT0FBTCxDQUFhO0FBQ1gsb0JBQWVELE1BQU1FLE1BQU4sQ0FBYUw7QUFEakIsS0FBYjtBQUdELEc7QUFDRE0sVSxvQkFBU0gsSyxFQUFNO0FBQ2IsUUFBTUUsU0FBU0YsTUFBTUUsTUFBckI7QUFDQSxTQUFLRCxPQUFMLHFCQUNHLFVBQVFELE1BQU1FLE1BQU4sQ0FBYU4sSUFBckIsR0FBMEIsV0FEN0IsRUFDNENNLE9BQU9MLE9BRG5EO0FBSUQsRzs7QUFDRE8sV0FBUyIsImZpbGUiOiJpbmRleC53eHAiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gICAgY29uZmlnOiB7XG4gICAgICB1c2luZ0NvbXBvbmVudHM6IHtcbiAgICAgICAgJ2ktdGFnJzogJ3d4Yy10YWcnXG4gICAgICB9XG4gICAgfSxcbiAgICBkYXRhIDoge1xuICAgICAgb25lQ2hlY2tlZCA6IGZhbHNlLFxuICAgICAgdGFncyA6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWUgOiAn5qCH562+5LiAJyxcbiAgICAgICAgICBjaGVja2VkIDogZmFsc2UsXG4gICAgICAgICAgY29sb3IgOiAnZGVmYXVsdCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWUgOiAn5qCH562+5LqMJyxcbiAgICAgICAgICBjaGVja2VkIDogZmFsc2UsXG4gICAgICAgICAgY29sb3IgOiAncmVkJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZSA6ICfmoIfnrb7kuIknLFxuICAgICAgICAgIGNoZWNrZWQgOiB0cnVlLFxuICAgICAgICAgIGNvbG9yIDogJ2JsdWUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lIDogJ+agh+etvjTvuI8nLFxuICAgICAgICAgIGNoZWNrZWQgOiB0cnVlLFxuICAgICAgICAgIGNvbG9yIDogJ2dyZWVuJ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICBvbmVDaGFuZ2UoZXZlbnQpe1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgJ29uZUNoZWNrZWQnIDogZXZlbnQuZGV0YWlsLmNoZWNrZWRcbiAgICAgIH0pXG4gICAgfSxcbiAgICBvbkNoYW5nZShldmVudCl7XG4gICAgICBjb25zdCBkZXRhaWwgPSBldmVudC5kZXRhaWw7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBbJ3RhZ3NbJytldmVudC5kZXRhaWwubmFtZSsnXS5jaGVja2VkJ10gOiBkZXRhaWwuY2hlY2tlZFxuICAgICAgfSlcblxuICAgIH0sXG4gICAgbWV0aG9kczogeyB9XG4gIH0iXX0=