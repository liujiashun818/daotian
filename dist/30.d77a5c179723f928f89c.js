(function(){var e=this,t=this,n=function(e,n,i){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}t.Object.defineProperty(n,"__esModule",{value:!0});var a=i(4),l=_interopRequireDefault(a),r=i(5),o=_interopRequireDefault(r),u=i(8),s=_interopRequireDefault(u),c=i(7),d=_interopRequireDefault(c),f=i(6),p=_interopRequireDefault(f),m=i(0),g=_interopRequireDefault(m),h=i(314),v=_interopRequireDefault(h),b=i(35),y=_interopRequireDefault(b),w=i(41),_=_interopRequireDefault(w),E=i(320),x=_interopRequireDefault(E),R=function(e,n){var i={};for(var a in e)t.Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof t.Object.getOwnPropertySymbols)for(var l=0,a=t.Object.getOwnPropertySymbols(e);l<a.length;l++)n.indexOf(a[l])<0&&(i[a[l]]=e[a[l]]);return i},D=function(e){function Popconfirm(e){(0,o.default)(this,Popconfirm);var n=(0,d.default)(this,(Popconfirm.__proto__||t.Object.getPrototypeOf(Popconfirm)).call(this,e));return n.onConfirm=function(e){n.setVisible(!1);var t=n.props.onConfirm;t&&t.call(n,e)},n.onCancel=function(e){n.setVisible(!1);var t=n.props.onCancel;t&&t.call(n,e)},n.onVisibleChange=function(e){n.setVisible(e)},n.state={visible:e.visible},n}return(0,p.default)(Popconfirm,e),(0,s.default)(Popconfirm,[{key:"componentWillReceiveProps",value:function(e){"visible"in e&&this.setState({visible:e.visible})}},{key:"getPopupDomNode",value:function(){return this.refs.tooltip.getPopupDomNode()}},{key:"setVisible",value:function(e){var t=this.props;"visible"in t||this.setState({visible:e});var n=t.onVisibleChange;n&&n(e)}},{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.title,i=e.placement,a=e.okText,r=e.okType,o=e.cancelText,u=R(e,["prefixCls","title","placement","okText","okType","cancelText"]),s=this.getLocale(),c=g.default.createElement("div",null,g.default.createElement("div",{className:t+"-inner-content"},g.default.createElement("div",{className:t+"-message"},g.default.createElement(y.default,{type:"exclamation-circle"}),g.default.createElement("div",{className:t+"-message-title"},n)),g.default.createElement("div",{className:t+"-buttons"},g.default.createElement(_.default,{onClick:this.onCancel,size:"small"},o||s.cancelText),g.default.createElement(_.default,{onClick:this.onConfirm,type:r,size:"small"},a||s.okText))));return g.default.createElement(v.default,(0,l.default)({},u,{prefixCls:t,placement:i,onVisibleChange:this.onVisibleChange,visible:this.state.visible,overlay:c,ref:"tooltip"}))}}]),Popconfirm}(g.default.Component);D.defaultProps={prefixCls:"ant-popover",transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary"};var P=(0,x.default)("Popconfirm",{cancelText:"取消",okText:"确定"});n.default=P(D),e.exports=n.default},i=function(e,t,n){"use strict";n(23),n(317),n(47)},a=function(e,n,i){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,n){if(!(e instanceof n))throw new t.TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new t.ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new t.TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=t.Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(t.Object.setPrototypeOf?t.Object.setPrototypeOf(e,n):e.__proto__=n)}t.Object.defineProperty(n,"__esModule",{value:!0});var a=(i(1597),i(1596)),l=_interopRequireDefault(a),r=(i(47),i(41)),o=_interopRequireDefault(r),u=(i(66),i(65)),s=_interopRequireDefault(u),c=function(){function defineProperties(e,n){for(var i=0;i<n.length;i++){var a=n[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),t.Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),d=i(0),f=_interopRequireDefault(d),p=i(22),m=_interopRequireDefault(p),g=function(e){function Shield(e){_classCallCheck(this,Shield);var n=_possibleConstructorReturn(this,(Shield.__proto__||t.Object.getPrototypeOf(Shield)).call(this,e));return n.handleShield=n.handleShield.bind(n),n}return _inherits(Shield,e),c(Shield,[{key:"handleShield",value:function(){var e=this;m.default.ajax({url:m.default.question.shield(),type:"post",data:{question_id:this.props.id}},function(){s.default.success("问题屏蔽成功"),e.props.handleSuccess()},function(e){s.default.error("问题屏蔽失败["+e+"]")})}},{key:"render",value:function(){var e=this.props,t=e.shape,n=e.disabled;return f.default.createElement("span",null,n?f.default.createElement("span",null,"button"===t?f.default.createElement(o.default,{type:"primary",disabled:n},"屏蔽问题"):f.default.createElement("a",{href:"javascript:",disabled:n},"屏蔽问题")):f.default.createElement(l.default,{placement:"topRight",title:"你确定要屏蔽问题内容吗？",onConfirm:this.handleShield},"button"===t?f.default.createElement(o.default,{type:"primary",disabled:n},"屏蔽问题"):f.default.createElement("a",{href:"javascript:",disabled:n},"屏蔽问题")))}}]),Shield}(f.default.Component);g.defaultProps={disabled:!1},n.default=g},l=function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAIAAAABc2X6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0U2MjU0RDZCRkE0MTFFNjkyRjVCNDQwMzU0RTUwMTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0U2MjU0RDdCRkE0MTFFNjkyRjVCNDQwMzU0RTUwMTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3RTYyNTRENEJGQTQxMUU2OTJGNUI0NDAzNTRFNTAxNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3RTYyNTRENUJGQTQxMUU2OTJGNUI0NDAzNTRFNTAxNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgVkUtcAAAXHSURBVHja7FxtbFNVGH66lrbrx9Z9dZOFsG4aEEiM3woG/DFERRM1ElkMwahBfqCJQ6dxoChIGLoZjSYalMQPogsG9scYQRNjmCCIEqNzRs0mm46t7T66bmvXdvWcde05p+lou13Sey/3ybKc07N77/vc95z3vOc5Z9VFo1FcTtBphDXCGmGNsAoIT/6Jgefh/xpTPnnZm1cAWy2c+2C8SjrCk3+g6xZEhuXrJr0DrlMwLpnLG0vx2cALsmZLQMwjRkrm4c5C2fXkFJ6yYemoRIQ7dKy8LNUIF/4gTHqYhL5DhyHRcadvnqVt6WCY0xAqRcQzUw52wrRcMr7kbsw0Z6ZXRScxegQjrTTW5llgWgbHo7CszngMp0X+DazsflnKjurezcrmazK6JNSNrpvRW4fRNgR/w8QZDH+I7jXo24JoWCLChZtY2XcYvRsR/J32xrljit6B3MfXmvops143gn/WInAuRdPQAfRtlWgME/vIS5348RLGJNKJXD+k8EeSbRe2YfCdi92nqh2WlfP2MLmqsjWLMZZ1YHGi8rP0tgU7MPQeqxZsQPU5LD4OYw37cPigFF2awFhNp35+MEsF8/WoOikYPRv6n2GjlCRelR/TYW+tRQXn88BPUkTpGBa4aK8jsdH3KSbOItw/j2Gsp14lr6+gDoUPZeoG/5esXN4EnSnuRCsXwMPSEY51kMI6+pNbWG+H/X5WHXyLlU1XS9Sl5ZRzobyF1cbb4fucC/UbVUfYsRnmaxM9GP1P09+JUG+/T12ESUbtfJVVRw7RxIMN7DfIvKsuwiUNMFwRTw7GhSVUwYOw3CZRpiUTLFiEku2s6m1GqCeeT5ngbJIul84Vxk8IVedeulSIIfwfvPtZU/FTNFNQOOFYQErknjeh8GFOtNiBKX98Ui9D2Y5sFA95YuQTLnvXTU9FOpZOkRUS8/wrVPpSNuHkgLQBllVcjrmdrmdmMo3lcDx+0VlbEfC+hlBv3LtmlO9jTaNHMfYtNxU1Q2dQOOHwv5QwH5BIGp/QOvqfY022u2Bbly4vkz9oQBpjK8eyRi5tfpvKOjOeN6D89QwSUZkjcBbDH7Fq2W4WkCJeeDhJqOgJqmYpnvCFei4grUDRY6zJvYvp53oHyl7KbKkhZ/iOYPw7Vq1oYZJwsBND77Km0kY6/SqbcDSIgQYuIN0N69pZ5I4aFD+Z8WJStqAB6W8uIDWzprHj8H/BZRr7mdyhVMIRDzx7uIC0FaalibbpgR2HZTUKHshGLpAnkgPSLtY09AGCvzL7K1qy1EdkiCT9tXQn9CXxHNMH905O7thEVU7FExYC0pUo3saaPHsRHojbbhXkDqUS9n8l6q8kIBlnyqFueN/k5I5nYahUOGHiWOLeBJL0V5I2RwMC4ewhM8LD7wsBiZ+KqP56WLTdonDCJCANvMgFpM0wX8fJHfVMf50H5ETYvQcRd9wuG5zcPEz119OSPEQ2hENdwhYJDUgLObmjUarnyIZwfwNNnmOg+isXugZbEDqvLsLjJ4QNIUF/7YOnScJHyYFwkv56o6i/Ngr6qxoIj30j6q/chlDg52T9VQ2EfUdZmW4I8fprfeb6q3IIT3AbKI5HWHm0LSv9VSGEyRowwKVW+fETN1R/5eWOO9PqrwohPPE967TmFXTpS9/CIM6vE/XXZqkeaMgxYX5DMH96OzfYiZ57MfkX18+3ZKK/KsTDZEnAxJpV8B9D90qBrXGJkGMqnjB/ajD4C3rWIzLEvYI1cLVDX6SmxGOKUzOahGNVZBJafIyJOyohnDr26uku0cIDTOtQD2FnU3KPzbNjUZtweENVhI01cJ2mp6nyrJQqKVSfgf2eS/fAuR0fzh3mbZsKjh5qhDXCGmGNsEZYI6wR1ghrhDXCOcFl9w/TqTxsq1WAp2x3SOfhYCe6b5X7lx5UneRObs3Tw+RGrlP0tBdZkcuuJ9upYcS8ObGF9sUl6sf/AgwAxHHlFKRcW9gAAAAASUVORK5CYII="},r=function(e,t,n){t=e.exports=n(14)(),t.push([e.i,".section-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.question-info {\n  display: flex;\n  flex-direction: row;\n  padding: 20px;\n  border-bottom: 1px solid #e5e5e5;\n}\n.question-info .avatar {\n  width: 44px;\n  height: 44px;\n  border: 1px solid #e5e5e5;\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.question-info .question-desc {\n  margin-left: 10px;\n}\n.dialog-container .header {\n  padding: 10px 0;\n}\n.dialog-container .dialog {\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 20px;\n}\n.dialog-container .dialog-list {\n  width: 260px;\n  min-height: 500px;\n  overflow-y: auto;\n  border: 1px solid #e5e5e5;\n}\n.dialog-container .dialog-list .dialog-item {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 71px;\n  border-top: 1px solid #e5e5e5;\n  cursor: pointer;\n  position: relative;\n}\n.dialog-container .dialog-list .dialog-item:last-child {\n  border-bottom: 1px solid #e5e5e5;\n}\n.dialog-container .dialog-list .dialog-item:hover {\n  background: #e7f2fc;\n}\n.dialog-container .dialog-list .dialog-item.active {\n  background: #e7f2fc;\n}\n.dialog-container .dialog-list .dialog-item.delete::after {\n  content: '\\5DF2\\5C4F\\853D';\n  color: #999;\n  font-size: 12px;\n  position: absolute;\n  right: 10px;\n}\n.dialog-container .dialog-list .dialog-item .avatar {\n  margin: 5px;\n}\n.dialog-container .dialog-list .dialog-item .dialog-item-content {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  width: 158px;\n}\n.dialog-container .dialog-list .dialog-item .dialog-item-content p:last-child {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.dialog-container .dialog-view {\n  width: 600px;\n  min-height: 450px;\n  max-height: 720px;\n  border: 1px solid #e5e5e5;\n  background: #e7f2fc;\n  overflow: hidden;\n}\n.dialog-container .dialog-view .dialog-view-header {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 60px;\n  text-align: center;\n  border-bottom: 1px solid #e5e5e5;\n  background: #fff;\n  position: relative;\n}\n.dialog-container .dialog-view .dialog-view-header .dialog-view-header-extra {\n  position: absolute;\n  right: 15px;\n}\n.dialog-container .dialog-view .dialog-view-content {\n  padding: 20px;\n  min-height: 450px;\n  max-height: 600px;\n  overflow-y: auto;\n}\n.dialog-container .dialog-view .dialog-view-content .dialog-item {\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 18px;\n}\n.dialog-container .dialog-view .dialog-view-content .dialog-item .dialog-msg-container p {\n  font-size: 12px;\n  color: #999;\n}\n.dialog-container .dialog-view .dialog-view-content .dialog-item .dialog-msg-box {\n  border: 1px solid #e5e5e5;\n  border-radius: 4px;\n  background: #fff;\n  padding: 5px;\n  min-height: 35px;\n  min-width: 120px;\n  display: inherit;\n  align-items: center;\n}\n.dialog-container .dialog-view .dialog-view-content .dialog-item.left .dialog-msg-container p {\n  margin-left: 5px;\n}\n.dialog-container .dialog-view .dialog-view-content .dialog-item.left .dialog-msg-box {\n  margin-left: 5px;\n}\n.dialog-container .dialog-view .dialog-view-content .dialog-item.center {\n  justify-content: center;\n}\n.dialog-container .dialog-view .dialog-view-content .dialog-item.center .dialog-item-msg {\n  width: 180px;\n  background: rgba(0, 0, 0, 0.28);\n  color: #ffffff;\n  height: 32px;\n  line-height: 32px;\n  border-radius: 6px;\n}\n.dialog-container .dialog-view .dialog-view-content .dialog-item.right {\n  flex-direction: row-reverse;\n}\n.dialog-container .dialog-view .dialog-view-content .dialog-item.right .dialog-msg-container p {\n  margin-right: 5px;\n}\n.dialog-container .dialog-view .dialog-view-content .dialog-item.right .dialog-msg-box {\n  margin-right: 5px;\n  justify-content: flex-end;\n}\n.dialog-container .dialog-view .dialog-view-content .dialog-item.is-adopt .dialog-msg-box {\n  background: #f5deb5;\n  color: #FF9900;\n}\n.image-preview {\n  max-width: 100%;\n}\n.profile {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-bottom: 10px;\n}\n.profile img {\n  align-self: flex-start;\n  margin-right: 5px;\n}\n",""])},o=function(e,n,i){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,n){if(!(e instanceof n))throw new t.TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new t.ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new t.TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=t.Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(t.Object.setPrototypeOf?t.Object.setPrototypeOf(e,n):e.__proto__=n)}t.Object.defineProperty(n,"__esModule",{value:!0});var a=(i(312),i(311)),l=_interopRequireDefault(a),r=function(){function defineProperties(e,n){for(var i=0;i<n.length;i++){var a=n[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),t.Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=i(0),u=_interopRequireDefault(o),s=i(22),c=_interopRequireDefault(s),d=i(313),f=_interopRequireDefault(d),p=function(e){function BigImagePreview(e){_classCallCheck(this,BigImagePreview);var n=_possibleConstructorReturn(this,(BigImagePreview.__proto__||t.Object.getPrototypeOf(BigImagePreview)).call(this,e));return n.state={visible:!1,thumbnailUrl:"",originalUrl:""},n}return _inherits(BigImagePreview,e),r(BigImagePreview,[{key:"componentDidMount",value:function(){var e=this.props.fileType;e&&this.getImageThumbnailUrl(e)}},{key:"showModal",value:function(){this.setState({visible:!0});var e=this.props.fileType;e&&this.getImageOriginalUrl(e)}},{key:"getImageThumbnailUrl",value:function(e){var t=this;c.default.ajax({url:c.default.system.getQaPublicFileUrl(e,"2")},function(e){t.setState({thumbnailUrl:e.res.url})})}},{key:"getImageOriginalUrl",value:function(e){var t=this;c.default.ajax({url:c.default.system.getQaPublicFileUrl(e,"0")},function(e){t.setState({originalUrl:e.res.url})})}},{key:"render",value:function(){return u.default.createElement("div",null,u.default.createElement("img",{src:this.state.thumbnailUrl,width:120,height:100,alt:"聊天内容",onClick:this.showModal,style:{cursor:"pointer"}}),u.default.createElement(l.default,{title:"图片预览",visible:this.state.visible,width:960,className:"ant-modal-full",onCancel:this.hideModal,footer:null},u.default.createElement("img",{className:"image-preview",src:this.state.originalUrl,alt:"图片预览"})))}}]),BigImagePreview}(f.default);n.default=p},u=function(e,n,i){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,n){if(!(e instanceof n))throw new t.TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new t.ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new t.TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=t.Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(t.Object.setPrototypeOf?t.Object.setPrototypeOf(e,n):e.__proto__=n)}t.Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function defineProperties(e,n){for(var i=0;i<n.length;i++){var a=n[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),t.Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),l=i(0),r=_interopRequireDefault(l),o=i(22),u=_interopRequireDefault(o),s=function(e){function Profile(e){_classCallCheck(this,Profile);var n=_possibleConstructorReturn(this,(Profile.__proto__||t.Object.getPrototypeOf(Profile)).call(this,e));return n.state={avatarUrl:""},n}return _inherits(Profile,e),a(Profile,[{key:"componentDidMount",value:function(){var e=this.props.fileType;e&&this.getImageUrl(e)}},{key:"getImageUrl",value:function(e){var t=this;u.default.ajax({url:u.default.system.getPublicPicUrl(e)},function(e){t.setState({avatarUrl:e.res.url})})}},{key:"render",value:function(){return r.default.createElement("img",{src:this.state.avatarUrl,alt:"无头像",className:"avatar",style:{width:40,height:40,cursor:"pointer"}})}}]),Profile}(r.default.Component);n.default=s},s=function(e,n,i){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,n){if(!(e instanceof n))throw new t.TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new t.ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new t.TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=t.Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(t.Object.setPrototypeOf?t.Object.setPrototypeOf(e,n):e.__proto__=n)}t.Object.defineProperty(n,"__esModule",{value:!0});var a=(i(317),i(324)),l=_interopRequireDefault(a),r=function(){function defineProperties(e,n){for(var i=0;i<n.length;i++){var a=n[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),t.Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=i(0),u=_interopRequireDefault(o),s=i(22),c=_interopRequireDefault(s),d=i(197),f=_interopRequireDefault(d),p=function(e){function Profile(e){_classCallCheck(this,Profile);var n=_possibleConstructorReturn(this,(Profile.__proto__||t.Object.getPrototypeOf(Profile)).call(this,e));return n.state={avatarUrl:""},n}return _inherits(Profile,e),r(Profile,[{key:"componentDidMount",value:function(){this.getImageUrl(this.props.item.from_avatar_pic)}},{key:"getImageUrl",value:function(e){var t=this;c.default.ajax({url:c.default.system.getPublicPicUrl(e)},function(e){t.setState({avatarUrl:e.res.url})})}},{key:"render",value:function(){var e=this.props.artificer,t=this.state.avatarUrl,n=u.default.createElement("div",null,u.default.createElement("div",{className:"profile"},u.default.createElement("img",{src:t,width:40,height:40,alt:"无头像",style:{cursor:"pointer"}}),u.default.createElement("div",{className:"profile-content"},u.default.createElement("h3",null,e.name,u.default.createElement("small",{className:"ml5"},f.default.gender[e.gender])),u.default.createElement("p",null,e.phone))),u.default.createElement("p",null,"擅长品牌：",e.skilled_brand_names),u.default.createElement("p",null,"所在地区：",e.province+" "+e.city+" "+e.country),u.default.createElement("p",null,"入行时间：",e.started_work_time));return u.default.createElement("div",null,u.default.createElement(l.default,{title:null,content:n,trigger:"click"},u.default.createElement("img",{src:t,width:40,height:40,alt:"无头像",style:{cursor:"pointer"}})))}}]),Profile}(u.default.Component);n.default=p},c=function(e,t,n){var i=n(2089);"string"==typeof i&&(i=[[e.i,i,""]]);n(15)(i,{});i.locals&&(e.exports=i.locals)},d=function(e,n,i){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,n){if(!(e instanceof n))throw new t.TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new t.ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new t.TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=t.Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(t.Object.setPrototypeOf?t.Object.setPrototypeOf(e,n):e.__proto__=n)}t.Object.defineProperty(n,"__esModule",{value:!0});var a=(i(1597),i(1596)),l=_interopRequireDefault(a),r=(i(47),i(41)),o=_interopRequireDefault(r),u=(i(66),i(65)),s=_interopRequireDefault(u),c=function(){function defineProperties(e,n){for(var i=0;i<n.length;i++){var a=n[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),t.Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),d=i(0),f=_interopRequireDefault(d),p=i(9),m=_interopRequireDefault(p),g=i(22),h=_interopRequireDefault(g),v=i(2093),b=_interopRequireDefault(v),y=i(1849),w=_interopRequireDefault(y),_=i(2326),E=_interopRequireDefault(_),x=i(2325),R=_interopRequireDefault(x);i(2390);var D=function(e){function Detail(e){_classCallCheck(this,Detail);var n=_possibleConstructorReturn(this,(Detail.__proto__||t.Object.getPrototypeOf(Detail)).call(this,e));return n.state={id:e.match.params.id,detail:{},dialogs:[],dialogItems:[],currentDialog:{},artificer:{},fromUserAvatarType:"",targetUserAvatarType:""},n.handleAdoptAnswer=n.handleAdoptAnswer.bind(n),n.getDetail=n.getDetail.bind(n),n}return _inherits(Detail,e),c(Detail,[{key:"componentDidMount",value:function(){var e=this.state.id;this.getDetail(e),this.getDialogs(e)}},{key:"handleAdoptAnswer",value:function(){var e=this.state.id;h.default.ajax({url:h.default.question.adoptAllAnswer(),data:{question_ids:e},type:"POST"},function(){s.default.success("平分成功"),t.location.reload()},function(e){s.default.error("平分失败["+e+"]")})}},{key:"handleDialogSelect",value:function(e){this.getDialogItems(this.state.id,e),this.getArtificer(e.artificer_id)}},{key:"handleShieldDialog",value:function(e,t){var n=this;h.default.ajax({url:h.default.question.shieldDialog(),type:"post",data:{question_id:e,dialog_id:t}},function(){s.default.success("对话屏蔽成功"),n.getDialogs(n.state.id)},function(e){s.default.error("对话屏蔽失败["+e+"]")})}},{key:"setUserAvatarType",value:function(e){var t=this;e.forEach(function(e){if("1"!==e.type&&e.from_avatar_pic)return t.setState({targetUserAvatarType:e.from_avatar_pic}),!1})}},{key:"getDetail",value:function(e){var t=this,n=e||this.state.id;h.default.ajax({url:h.default.question.detail(n)},function(e){t.setState({detail:e.res.detail})})}},{key:"getDialogs",value:function(e){var t=this;h.default.ajax({url:h.default.question.dialogList(e)},function(e){t.setState({dialogs:e.res.list})})}},{key:"getDialogItems",value:function(e,t){var n=this;h.default.ajax({url:h.default.question.dialogItemList(e,t._id)},function(e){var i=e.res.list;n.setUserAvatarType(i),n.setState({dialogItems:i,currentDialog:t})})}},{key:"getArtificer",value:function(e){var t=this;h.default.ajax({url:h.default.technician.detail(e)},function(e){t.setState({artificer:e.res.detail})})}},{key:"render",value:function(){var e=this,n=this.state,a=n.detail,r=n.dialogs,u=n.dialogItems,s=n.currentDialog,c=n.artificer,d=n.targetUserAvatarType;return f.default.createElement("div",null,f.default.createElement("div",{className:"section-header"},f.default.createElement("h3",null,"问题详情"),f.default.createElement("div",null,f.default.createElement(l.default,{placement:"topRight",title:"你确定要平分收益吗？",onConfirm:this.handleAdoptAnswer},f.default.createElement(o.default,{className:"mr10",disabled:"1"===a.is_balance},"平分收益")),f.default.createElement(w.default,{id:a._id,shape:"button",disabled:"-1"===a.status,handleSuccess:this.getDetail}))),f.default.createElement("div",{className:"question-info"},f.default.createElement("div",{className:"avatar"},f.default.createElement("img",{src:i(1852),alt:"无头像",style:{width:30,height:30}})),f.default.createElement("div",{className:"question-desc"},f.default.createElement("p",{className:"text-gray"},f.default.createElement("span",null,a.questioner_name),f.default.createElement("span",{className:"ml20"},a.ctime),f.default.createElement("span",{className:"ml20"},a.questioner_company_name)),f.default.createElement("p",null,f.default.createElement("label",{className:"label"},"问题描述"),f.default.createElement("span",null,a.content)),f.default.createElement("p",null,f.default.createElement("label",{className:"label"},"车型"),f.default.createElement("span",null,a.auto_brand_name," ",a.auto_series_name)),f.default.createElement("p",null,f.default.createElement("label",{className:"label"},"问题类型"),f.default.createElement("span",null,a.type_name)))),f.default.createElement("div",{className:"dialog-container"},f.default.createElement("p",{className:"header"},"共",a.dialog_count,"人回答，",a.dialog_item_count,"条回复"),f.default.createElement("div",{className:"dialog"},f.default.createElement("ul",{className:"dialog-list"},r.map(function(n){var i=(0,m.default)({"dialog-item":!0,active:n._id===s._id,delete:"-1"===n.status});return f.default.createElement("li",{className:i,key:n._id,onClick:e.handleDialogSelect.bind(e,n)},f.default.createElement(R.default,{fileType:n.artificer_avatar_pic}),f.default.createElement("div",{className:"dialog-item-content"},f.default.createElement("p",{className:"text-gray"},n.artificer_name," "),f.default.createElement("p",{capture:"text-gray"},n.mtime),f.default.createElement("p",null,!!n.last_message&&t.JSON.parse(n.last_message).text)))})),f.default.createElement("div",{className:"dialog-view"},f.default.createElement("div",{className:"dialog-view-header"},f.default.createElement("h3",null,s.artificer_name?s.artificer_name+"的回答":""),f.default.createElement("div",{className:"dialog-view-header-extra"},t.Object.keys(s).length>0&&"-1"!==s.status&&f.default.createElement(l.default,{placement:"topRight",title:"你确定要屏蔽该对话吗？",onConfirm:this.handleShieldDialog.bind(this,a._id,s._id)},f.default.createElement("a",{href:"javascript:"},"屏蔽")))),f.default.createElement("div",{className:"dialog-view-content"},u.map(function(e){return f.default.createElement("div",{className:"1"===e.type?"dialog-item left":"dialog-item right",key:e._id},"1"===e.type?f.default.createElement(E.default,{artificer:c,item:e}):f.default.createElement(R.default,{fileType:e.from_avatar_pic}),f.default.createElement("div",{className:"dialog-msg-container"},f.default.createElement("div",{className:"dialog-msg-box"},"1"===e.msg_type?f.default.createElement("span",null,!!e.content&&t.JSON.parse(e.content).text):f.default.createElement(b.default,{fileType:!!e.content&&t.JSON.parse(e.content).file_name})),f.default.createElement("p",null,e.mtime)))}),"1"===s.is_adopt&&f.default.createElement("div",{className:"dialog-item right is-adopt"},f.default.createElement(R.default,{fileType:d}),f.default.createElement("div",{className:"dialog-msg-box"},f.default.createElement("p",null,"用户采纳了答案"))),"-1"===s.status&&f.default.createElement("div",{className:"dialog-item center"},f.default.createElement("div",{className:"dialog-item-msg"},"该对话已关闭")))))))}}]),Detail}(f.default.Component);n.default=D},f=e,p=f.webpackJsonp;if(f.webpackJsonp!==p)throw new Error("Prepack model invariant violation: "+f.webpackJsonp);var m=[30],g={1596:n,1597:i,1849:a,1852:l,2089:r,2093:o,2325:u,2326:s,2390:c,665:d};p(m,g)}).call(this);