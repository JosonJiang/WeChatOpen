'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Component({
  behaviors: [],
  data: {},
  externalClasses: ['i-class'],
  properties: {
    //slot name
    name: {
      type: String,
      value: ''
    },
    //can click or not click
    checkable: {
      type: Boolean,
      value: false
    },
    //is current choose
    checked: {
      type: Boolean,
      value: true
    },
    //background and color setting
    color: {
      type: String,
      value: 'default'
    },
    //control fill or not
    type: {
      type: String,
      value: 'dot'
    }
  },
  methods: {
    tapTag: function tapTag() {
      var data = this.data;
      if (data.checkable) {
        var checked = data.checked ? false : true;
        this.triggerEvent('change', {
          name: data.name || '',
          checked: checked
        });
      }
    }
  }

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4Lnd4YyJdLCJuYW1lcyI6WyJiZWhhdmlvcnMiLCJkYXRhIiwiZXh0ZXJuYWxDbGFzc2VzIiwicHJvcGVydGllcyIsIm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwidmFsdWUiLCJjaGVja2FibGUiLCJCb29sZWFuIiwiY2hlY2tlZCIsImNvbG9yIiwibWV0aG9kcyIsInRhcFRhZyIsInRyaWdnZXJFdmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBS0VBLGFBQVcsRTtBQUNYQyxRQUFNLEU7QUFDTkMsbUJBQWlCLENBQUMsU0FBRCxDO0FBQ2pCQyxjQUFhO0FBQ1g7QUFDQUMsVUFBTztBQUNMQyxZQUFPQyxNQURGO0FBRUxDLGFBQVE7QUFGSCxLQUZJO0FBTVg7QUFDQUMsZUFBWTtBQUNWSCxZQUFPSSxPQURHO0FBRVZGLGFBQVE7QUFGRSxLQVBEO0FBV1g7QUFDQUcsYUFBVTtBQUNSTCxZQUFPSSxPQURDO0FBRVJGLGFBQVE7QUFGQSxLQVpDO0FBZ0JYO0FBQ0FJLFdBQVE7QUFDTk4sWUFBT0MsTUFERDtBQUVOQyxhQUFRO0FBRkYsS0FqQkc7QUFxQlg7QUFDQUYsVUFBTztBQUNMQSxZQUFPQyxNQURGO0FBRUxDLGFBQVE7QUFGSDtBQXRCSSxHO0FBMkJiSyxXQUFVO0FBQ1JDLFVBRFEsb0JBQ0E7QUFDTixVQUFNWixPQUFPLEtBQUtBLElBQWxCO0FBQ0EsVUFBSUEsS0FBS08sU0FBVCxFQUFvQjtBQUNsQixZQUFNRSxVQUFVVCxLQUFLUyxPQUFMLEdBQWUsS0FBZixHQUF1QixJQUF2QztBQUNBLGFBQUtJLFlBQUwsQ0FBa0IsUUFBbEIsRUFBMkI7QUFDekJWLGdCQUFPSCxLQUFLRyxJQUFMLElBQWEsRUFESztBQUV6Qk0sbUJBQVVBO0FBRmUsU0FBM0I7QUFJRDtBQUNGO0FBVk8iLCJmaWxlIjoiaW5kZXgud3hjIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWc6IHtcbiAgICBjb21wb25lbnQgOiB0cnVlLFxuICAgIHVzaW5nQ29tcG9uZW50czogeyB9XG4gIH0sXG4gIGJlaGF2aW9yczogWyBdLFxuICBkYXRhOiB7IH0sXG4gIGV4dGVybmFsQ2xhc3NlczogWydpLWNsYXNzJ10sXG4gIHByb3BlcnRpZXMgOiB7XG4gICAgLy9zbG90IG5hbWVcbiAgICBuYW1lIDoge1xuICAgICAgdHlwZSA6IFN0cmluZyxcbiAgICAgIHZhbHVlIDogJydcbiAgICB9LFxuICAgIC8vY2FuIGNsaWNrIG9yIG5vdCBjbGlja1xuICAgIGNoZWNrYWJsZSA6IHtcbiAgICAgIHR5cGUgOiBCb29sZWFuLFxuICAgICAgdmFsdWUgOiBmYWxzZVxuICAgIH0sXG4gICAgLy9pcyBjdXJyZW50IGNob29zZVxuICAgIGNoZWNrZWQgOiB7XG4gICAgICB0eXBlIDogQm9vbGVhbixcbiAgICAgIHZhbHVlIDogdHJ1ZVxuICAgIH0sXG4gICAgLy9iYWNrZ3JvdW5kIGFuZCBjb2xvciBzZXR0aW5nXG4gICAgY29sb3IgOiB7XG4gICAgICB0eXBlIDogU3RyaW5nLFxuICAgICAgdmFsdWUgOiAnZGVmYXVsdCdcbiAgICB9LFxuICAgIC8vY29udHJvbCBmaWxsIG9yIG5vdFxuICAgIHR5cGUgOiB7XG4gICAgICB0eXBlIDogU3RyaW5nLFxuICAgICAgdmFsdWUgOiAnZG90J1xuICAgIH1cbiAgfSxcbiAgbWV0aG9kcyA6IHtcbiAgICB0YXBUYWcoKXtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICBpZiggZGF0YS5jaGVja2FibGUgKXtcbiAgICAgICAgY29uc3QgY2hlY2tlZCA9IGRhdGEuY2hlY2tlZCA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2NoYW5nZScse1xuICAgICAgICAgIG5hbWUgOiBkYXRhLm5hbWUgfHwgJycsXG4gICAgICAgICAgY2hlY2tlZCA6IGNoZWNrZWRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbn0iXX0=