'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _city = require('./city.js');

exports.default = Page({
  data: {
    '__code__': {
      readme: '<h1 class="md-h1">wxc-index</h1><blockquote>\n<p>Index - \u5C0F\u7A0B\u5E8F\u7EC4\u4EF6</p>\n</blockquote>\n<h2 class="md-h2">Install</h2><code class="lang-bash md-code">$ <span class="hljs-built_in">min</span> install wxc-<span class="hljs-built_in">index</span></code><h2 class="md-h2">API</h2><h3 class="md-h3">Index</h3><table class="md-table">\n    <tr class="md-tr">\n<th class="md-th">\u540D\u79F0</th>\n<th class="md-th">\u63CF\u8FF0</th>\n</tr>\n\n    <tr class="md-tr">\n<td class="md-td"><code class="md-code">prop-name</code></td>\n<td class="md-td">\u63CF\u8FF0\u5C5E\u6027\u7684\u7C7B\u578B\uFF0C\u9ED8\u8BA4\u503C\u7B49</td>\n</tr>\n<tr class="md-tr">\n<td class="md-td"><code class="md-code">method-name</code></td>\n<td class="md-td">\u63CF\u8FF0\u65B9\u6CD5\u7684\u53C2\u6570\uFF0C\u8FD4\u56DE\u503C\u7B49</td>\n</tr>\n\n  </table><h2 class="md-h2">ChangeLog</h2><h4 class="md-h4">v1.0.0\uFF082018-9-20\uFF09</h4><ul>\n<li>\u521D\u59CB\u7248\u672C</li>\n</ul>\n'
    },

    cities: []
  },
  onChange: function onChange(event) {

    console.log(event.detail, 'click right menu callback data');
  },
  onReady: function onReady() {

    var storeCity = new Array(26);
    var words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    words.forEach(function (item, index) {
      storeCity[index] = {
        key: item,
        list: []
      };
    });

    _city.cities.forEach(function (item) {

      var firstName = item.pinyin.substring(0, 1);
      var index = words.indexOf(firstName);
      storeCity[index].list.push({
        name: item.name,
        key: firstName
      });
    });

    this.data.cities = storeCity;

    this.setData({
      cities: this.data.cities
    });
  },

  methods: {}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4cCJdLCJuYW1lcyI6WyJkYXRhIiwiY2l0aWVzIiwib25DaGFuZ2UiLCJldmVudCIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCJvblJlYWR5Iiwic3RvcmVDaXR5IiwiQXJyYXkiLCJ3b3JkcyIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJrZXkiLCJsaXN0IiwiZmlyc3ROYW1lIiwicGlueWluIiwic3Vic3RyaW5nIiwiaW5kZXhPZiIsInB1c2giLCJuYW1lIiwic2V0RGF0YSIsIm1ldGhvZHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7QUFXSUEsUUFBTztBQUFBO0FBQUE7QUFBQTs7QUFDTEMsWUFBUztBQURKLEc7QUFHUEMsVSxvQkFBU0MsSyxFQUFNOztBQUViQyxZQUFRQyxHQUFSLENBQVlGLE1BQU1HLE1BQWxCLEVBQXlCLGdDQUF6QjtBQUVELEc7QUFDREMsUyxxQkFBUzs7QUFFUCxRQUFJQyxZQUFZLElBQUlDLEtBQUosQ0FBVSxFQUFWLENBQWhCO0FBQ0EsUUFBTUMsUUFBUSxDQUFDLEdBQUQsRUFBSyxHQUFMLEVBQVMsR0FBVCxFQUFhLEdBQWIsRUFBaUIsR0FBakIsRUFBcUIsR0FBckIsRUFBeUIsR0FBekIsRUFBNkIsR0FBN0IsRUFBaUMsR0FBakMsRUFBcUMsR0FBckMsRUFBeUMsR0FBekMsRUFBNkMsR0FBN0MsRUFBaUQsR0FBakQsRUFBcUQsR0FBckQsRUFBeUQsR0FBekQsRUFBNkQsR0FBN0QsRUFBaUUsR0FBakUsRUFBcUUsR0FBckUsRUFBeUUsR0FBekUsRUFBNkUsR0FBN0UsRUFBaUYsR0FBakYsRUFBcUYsR0FBckYsRUFBeUYsR0FBekYsRUFBNkYsR0FBN0YsRUFBaUcsR0FBakcsRUFBcUcsR0FBckcsQ0FBZDtBQUNBQSxVQUFNQyxPQUFOLENBQWMsVUFBQ0MsSUFBRCxFQUFNQyxLQUFOLEVBQWM7QUFDMUJMLGdCQUFVSyxLQUFWLElBQW1CO0FBQ2pCQyxhQUFNRixJQURXO0FBRWpCRyxjQUFPO0FBRlUsT0FBbkI7QUFJRCxLQUxEOztBQU9BZCxpQkFBT1UsT0FBUCxDQUFlLFVBQUNDLElBQUQsRUFBUTs7QUFFckIsVUFBSUksWUFBWUosS0FBS0ssTUFBTCxDQUFZQyxTQUFaLENBQXNCLENBQXRCLEVBQXdCLENBQXhCLENBQWhCO0FBQ0EsVUFBSUwsUUFBUUgsTUFBTVMsT0FBTixDQUFlSCxTQUFmLENBQVo7QUFDQVIsZ0JBQVVLLEtBQVYsRUFBaUJFLElBQWpCLENBQXNCSyxJQUF0QixDQUEyQjtBQUN6QkMsY0FBT1QsS0FBS1MsSUFEYTtBQUV6QlAsYUFBTUU7QUFGbUIsT0FBM0I7QUFLRCxLQVREOztBQVdBLFNBQUtoQixJQUFMLENBQVVDLE1BQVYsR0FBbUJPLFNBQW5COztBQUVBLFNBQUtjLE9BQUwsQ0FBYTtBQUNYckIsY0FBUyxLQUFLRCxJQUFMLENBQVVDO0FBRFIsS0FBYjtBQUdELEc7O0FBQ0RzQixXQUFTIiwiZmlsZSI6ImluZGV4Lnd4cCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNpdGllcyB9IGZyb20gJy4vY2l0eSc7XG5cbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIGNvbmZpZzoge1xuICAgICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOmZhbHNlLFxuICAgICAgdXNpbmdDb21wb25lbnRzOiB7XG4gICAgICAgICd3eGMtaW5kZXgnOiAnd3hjLWluZGV4JyxcbiAgICAgICAgJ3d4Yy1pbmRleC1pdGVtJzogJ3d4Yy1pbmRleC1pdGVtJ1xuXG4gICAgICB9XG4gICAgfSxcbiAgICBkYXRhIDoge1xuICAgICAgY2l0aWVzIDogW11cbiAgICB9LFxuICAgIG9uQ2hhbmdlKGV2ZW50KXtcblxuICAgICAgY29uc29sZS5sb2coZXZlbnQuZGV0YWlsLCdjbGljayByaWdodCBtZW51IGNhbGxiYWNrIGRhdGEnKTtcblxuICAgIH0sXG4gICAgb25SZWFkeSgpe1xuXG4gICAgICBsZXQgc3RvcmVDaXR5ID0gbmV3IEFycmF5KDI2KTtcbiAgICAgIGNvbnN0IHdvcmRzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiLFwiSVwiLFwiSlwiLFwiS1wiLFwiTFwiLFwiTVwiLFwiTlwiLFwiT1wiLFwiUFwiLFwiUVwiLFwiUlwiLFwiU1wiLFwiVFwiLFwiVVwiLFwiVlwiLFwiV1wiLFwiWFwiLFwiWVwiLFwiWlwiXTtcbiAgICAgIHdvcmRzLmZvckVhY2goKGl0ZW0saW5kZXgpPT57XG4gICAgICAgIHN0b3JlQ2l0eVtpbmRleF0gPSB7XG4gICAgICAgICAga2V5IDogaXRlbSxcbiAgICAgICAgICBsaXN0IDogW11cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNpdGllcy5mb3JFYWNoKChpdGVtKT0+e1xuXG4gICAgICAgIGxldCBmaXJzdE5hbWUgPSBpdGVtLnBpbnlpbi5zdWJzdHJpbmcoMCwxKTtcbiAgICAgICAgbGV0IGluZGV4ID0gd29yZHMuaW5kZXhPZiggZmlyc3ROYW1lICk7XG4gICAgICAgIHN0b3JlQ2l0eVtpbmRleF0ubGlzdC5wdXNoKHtcbiAgICAgICAgICBuYW1lIDogaXRlbS5uYW1lLFxuICAgICAgICAgIGtleSA6IGZpcnN0TmFtZVxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZGF0YS5jaXRpZXMgPSBzdG9yZUNpdHk7XG5cbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGNpdGllcyA6IHRoaXMuZGF0YS5jaXRpZXNcbiAgICAgIH0pXG4gICAgfSxcbiAgICBtZXRob2RzOiB7IH1cbiAgfSJdfQ==