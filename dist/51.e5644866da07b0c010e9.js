(function(){var e=this,t=this,n=function(e,n,a){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _toConsumableArray(e){if(t.Array.isArray(e)){for(var n=0,a=t.Array(e.length);n<e.length;n++)a[n]=e[n];return a}return t.Array.from(e)}function _classCallCheck(e,n){if(!(e instanceof n))throw new t.TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new t.ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new t.TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=t.Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(t.Object.setPrototypeOf?t.Object.setPrototypeOf(e,n):e.__proto__=n)}t.Object.defineProperty(n,"__esModule",{value:!0});var r=(a(1699),a(1698)),i=_interopRequireDefault(r),l=(a(49),a(48)),o=_interopRequireDefault(l),u=(a(51),a(50)),s=_interopRequireDefault(u),c=(a(644),a(643)),f=_interopRequireDefault(c),d=(a(158),a(131)),p=_interopRequireDefault(d),h=(a(37),a(59)),m=_interopRequireDefault(h),y=function(){function defineProperties(e,n){for(var a=0;a<n.length;a++){var r=n[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),t.Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),g=a(0),b=_interopRequireDefault(g),v=a(22),_=_interopRequireDefault(v),k=a(315),E=_interopRequireDefault(k),R=a(2338),w=_interopRequireDefault(R),C=a(2339),D=_interopRequireDefault(C),x=m.default.Search,S=p.default.Option,q=function(e){function List(e){_classCallCheck(this,List);var n=_possibleConstructorReturn(this,(List.__proto__||t.Object.getPrototypeOf(List)).call(this,e));return n.state={page:1,key:"",userType:"-1",cityId:""},n.handleSearchChange=n.handleSearchChange.bind(n),n.handleUserTypeChange=n.handleUserTypeChange.bind(n),n.getRegin=n.getRegin.bind(n),["handleRegionChange","handleSearchChange","handleUserTypeChange","getRegin"].map(function(e){return n[e]=n[e].bind(n)}),n}return _inherits(List,e),y(List,[{key:"componentDidMount",value:function(){this.getProvinces()}},{key:"handleSearchChange",value:function(e){var t=e.target.value;this.setState({key:t})}},{key:"handleUserTypeChange",value:function(e){this.setState({userType:e})}},{key:"handleRegionChange",value:function(e,t){this.setState({province:e[0]||"",cityId:t[1]?t[1].city_id:"",country:e[2]||""})}},{key:"getProvinces",value:function(){var e=this;_.default.ajax({url:_.default.admin.system.provinceList()},function(t){var n=t.res.province_list.map(function(e){return e.value=e.name,e.label=e.name,e.isLeaf=!1,e});e.setState({options:n})})}},{key:"getRegin",value:function(e){var t=this,n=e[e.length-1];n.loading=!0,_.default.ajax({url:_.default.system.getCities(n.name)},function(e){n.loading=!1,n.children=[],e.res.city_list.map(function(e){e.value=e.name,e.label=e.name,e.isLeaf=!0,n.children.push(e)}),t.setState({options:[].concat(_toConsumableArray(t.state.options))})})}},{key:"render",value:function(){var e=this.state.options;return b.default.createElement("div",null,b.default.createElement(o.default,{className:"head-action-bar"},b.default.createElement(s.default,{span:20},b.default.createElement(x,{size:"large",style:{width:220},onChange:this.handleSearchChange,placeholder:"请输入姓名搜索"}),b.default.createElement("label",{className:"label ml20"},"账号类型"),b.default.createElement(p.default,{size:"large",style:{width:220},defaultValue:"-1",onChange:this.handleUserTypeChange},b.default.createElement(S,{value:"-1"},"全部"),b.default.createElement(S,{value:"1"},"连锁店管理员"),b.default.createElement(S,{value:"2"},"区域管理员"),b.default.createElement(S,{value:"3"},"总公司管理员")),b.default.createElement("span",{className:"label ml20"},"区域"),b.default.createElement(f.default,{options:e,loadData:this.getRegin,onChange:this.handleRegionChange,changeOnSelect:!0,style:{width:220},placeholder:"请选择地区",size:"large"})),b.default.createElement(s.default,{span:4},b.default.createElement("div",{className:"pull-right"},b.default.createElement(w.default,{onSuccess:this.handleSuccess})))),b.default.createElement(o.default,{className:"mb20"},b.default.createElement(i.default,{showIcon:!0,type:"warning",message:b.default.createElement("div",null,b.default.createElement("div",null,"总公司管理员可查看并操作稻田系统、水稻优车及水稻管车板块下全部汽修厂、经销商、公司及产品信息"),b.default.createElement("div",null,"区域管理员可查看所在区域稻田系统及水稻优车板块下汽修厂、经销商信息"))})),b.default.createElement("span",{className:"settings-account"},b.default.createElement(D.default,{source:_.default.admin.account.list(this.state),page:this.state.page,reload:this.state.reload,updateState:this.updateState,onSuccess:this.handleSuccess})))}}]),List}(E.default);n.default=q},a=function(e,n,a){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}t.Object.defineProperty(n,"__esModule",{value:!0});var r=a(4),i=_interopRequireDefault(r),l=a(5),o=_interopRequireDefault(l),u=a(8),s=_interopRequireDefault(u),c=a(7),f=_interopRequireDefault(c),d=a(6),p=_interopRequireDefault(d),h=a(0),m=_interopRequireDefault(h),y=a(314),g=_interopRequireDefault(y),b=a(35),v=_interopRequireDefault(b),_=a(41),k=_interopRequireDefault(_),E=a(320),R=_interopRequireDefault(E),w=function(e,n){var a={};for(var r in e)t.Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(a[r]=e[r]);if(null!=e&&"function"==typeof t.Object.getOwnPropertySymbols)for(var i=0,r=t.Object.getOwnPropertySymbols(e);i<r.length;i++)n.indexOf(r[i])<0&&(a[r[i]]=e[r[i]]);return a},C=function(e){function Popconfirm(e){(0,o.default)(this,Popconfirm);var n=(0,f.default)(this,(Popconfirm.__proto__||t.Object.getPrototypeOf(Popconfirm)).call(this,e));return n.onConfirm=function(e){n.setVisible(!1);var t=n.props.onConfirm;t&&t.call(n,e)},n.onCancel=function(e){n.setVisible(!1);var t=n.props.onCancel;t&&t.call(n,e)},n.onVisibleChange=function(e){n.setVisible(e)},n.state={visible:e.visible},n}return(0,p.default)(Popconfirm,e),(0,s.default)(Popconfirm,[{key:"componentWillReceiveProps",value:function(e){"visible"in e&&this.setState({visible:e.visible})}},{key:"getPopupDomNode",value:function(){return this.refs.tooltip.getPopupDomNode()}},{key:"setVisible",value:function(e){var t=this.props;"visible"in t||this.setState({visible:e});var n=t.onVisibleChange;n&&n(e)}},{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.title,a=e.placement,r=e.okText,l=e.okType,o=e.cancelText,u=w(e,["prefixCls","title","placement","okText","okType","cancelText"]),s=this.getLocale(),c=m.default.createElement("div",null,m.default.createElement("div",{className:t+"-inner-content"},m.default.createElement("div",{className:t+"-message"},m.default.createElement(v.default,{type:"exclamation-circle"}),m.default.createElement("div",{className:t+"-message-title"},n)),m.default.createElement("div",{className:t+"-buttons"},m.default.createElement(k.default,{onClick:this.onCancel,size:"small"},o||s.cancelText),m.default.createElement(k.default,{onClick:this.onConfirm,type:l,size:"small"},r||s.okText))));return m.default.createElement(g.default,(0,i.default)({},u,{prefixCls:t,placement:a,onVisibleChange:this.onVisibleChange,visible:this.state.visible,overlay:c,ref:"tooltip"}))}}]),Popconfirm}(m.default.Component);C.defaultProps={prefixCls:"ant-popover",transitionName:"zoom-big",placement:"top",trigger:"click",okType:"primary"};var D=(0,R.default)("Popconfirm",{cancelText:"取消",okText:"确定"});n.default=D(C),e.exports=n.default},r=function(e,t,n){"use strict";n(23),n(317),n(47)},i=function(e,n,a){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function noop(){}t.Object.defineProperty(n,"__esModule",{value:!0});var r=a(10),i=_interopRequireDefault(r),l=a(5),o=_interopRequireDefault(l),u=a(8),s=_interopRequireDefault(u),c=a(7),f=_interopRequireDefault(c),d=a(6),p=_interopRequireDefault(d),h=a(0),m=_interopRequireDefault(h),y=a(18),g=_interopRequireDefault(y),b=a(95),v=_interopRequireDefault(b),_=a(35),k=_interopRequireDefault(_),E=a(9),R=_interopRequireDefault(E),w=function(e){function Alert(e){(0,o.default)(this,Alert);var n=(0,f.default)(this,(Alert.__proto__||t.Object.getPrototypeOf(Alert)).call(this,e));return n.handleClose=function(e){e.preventDefault();var t=g.default.findDOMNode(n);t.style.height=t.offsetHeight+"px",t.style.height=t.offsetHeight+"px",n.setState({closing:!1}),(n.props.onClose||noop)(e)},n.animationEnd=function(){n.setState({closed:!0,closing:!0})},n.state={closing:!0,closed:!1},n}return(0,p.default)(Alert,e),(0,s.default)(Alert,[{key:"render",value:function(){var e,t=this.props,n=t.closable,a=t.description,r=t.type,l=t.prefixCls,o=void 0===l?"ant-alert":l,u=t.message,s=t.closeText,c=t.showIcon,f=t.banner,d=t.className,p=void 0===d?"":d,h=t.style;c=!(!f||void 0!==c)||c,r=f&&void 0===r?"warning":r||"info";var y="";switch(r){case"success":y="check-circle";break;case"info":y="info-circle";break;case"error":y="cross-circle";break;case"warning":y="exclamation-circle";break;default:y="default"}a&&(y+="-o");var g=(0,R.default)(o,(e={},(0,i.default)(e,o+"-"+r,!0),(0,i.default)(e,o+"-close",!this.state.closing),(0,i.default)(e,o+"-with-description",!!a),(0,i.default)(e,o+"-no-icon",!c),(0,i.default)(e,o+"-banner",!!f),e),p);s&&(n=!0);var b=n?m.default.createElement("a",{onClick:this.handleClose,className:o+"-close-icon"},s||m.default.createElement(k.default,{type:"cross"})):null;return this.state.closed?null:m.default.createElement(v.default,{component:"",showProp:"data-show",transitionName:o+"-slide-up",onEnd:this.animationEnd},m.default.createElement("div",{"data-show":this.state.closing,className:g,style:h},c?m.default.createElement(k.default,{className:o+"-icon",type:y}):null,m.default.createElement("span",{className:o+"-message"},u),m.default.createElement("span",{className:o+"-description"},a),b))}}]),Alert}(m.default.Component);n.default=w,e.exports=n.default},l=function(e,t,n){"use strict";n(23),n(1748)},o=function(e,t,n){t=e.exports=n(14)(),t.push([e.i,"/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable declaration-bang-space-before */\n/* stylelint-disable declaration-bang-space-before */\n.ant-alert {\n  position: relative;\n  padding: 8px 48px 8px 38px;\n  border-radius: 4px;\n  color: rgba(0, 0, 0, 0.65);\n  font-size: 12px;\n  line-height: 1.5;\n}\n.ant-alert.ant-alert-no-icon {\n  padding: 8px 48px 8px 16px;\n}\n.ant-alert-icon {\n  font-size: 14px;\n  top: 10px;\n  left: 16px;\n  position: absolute;\n}\n.ant-alert-description {\n  font-size: 12px;\n  line-height: 21px;\n  display: none;\n}\n.ant-alert-success {\n  border: 1px solid #cfefdf;\n  background-color: #ebf8f2;\n}\n.ant-alert-success .ant-alert-icon {\n  color: #00a854;\n}\n.ant-alert-info {\n  border: 1px solid #d2eafb;\n  background-color: #ecf6fd;\n}\n.ant-alert-info .ant-alert-icon {\n  color: #108ee9;\n}\n.ant-alert-warning {\n  border: 1px solid #fff3cf;\n  background-color: #fffaeb;\n}\n.ant-alert-warning .ant-alert-icon {\n  color: #ffbf00;\n}\n.ant-alert-error {\n  border: 1px solid #fcdbd9;\n  background-color: #fef0ef;\n}\n.ant-alert-error .ant-alert-icon {\n  color: #f04134;\n}\n.ant-alert-close-icon {\n  font-size: 12px;\n  position: absolute;\n  right: 16px;\n  top: 10px;\n  height: 12px;\n  line-height: 12px;\n  overflow: hidden;\n  cursor: pointer;\n}\n.ant-alert-close-icon .anticon-cross {\n  color: rgba(0, 0, 0, 0.43);\n  transition: color .3s ease;\n}\n.ant-alert-close-icon .anticon-cross:hover {\n  color: #404040;\n}\n.ant-alert-close-text {\n  position: absolute;\n  right: 16px;\n}\n.ant-alert-with-description {\n  padding: 16px 16px 16px 60px;\n  position: relative;\n  border-radius: 4px;\n  color: rgba(0, 0, 0, 0.65);\n  line-height: 1.5;\n}\n.ant-alert-with-description.ant-alert-no-icon {\n  padding: 16px;\n}\n.ant-alert-with-description .ant-alert-icon {\n  position: absolute;\n  top: 16px;\n  left: 20px;\n  font-size: 24px;\n}\n.ant-alert-with-description .ant-alert-close-icon {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  cursor: pointer;\n  font-size: 12px;\n}\n.ant-alert-with-description .ant-alert-message {\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.85);\n  display: block;\n  margin-bottom: 4px;\n}\n.ant-alert-with-description .ant-alert-description {\n  display: block;\n}\n.ant-alert.ant-alert-close {\n  height: 0 !important;\n  margin: 0;\n  padding-top: 0;\n  padding-bottom: 0;\n  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n  -webkit-transform-origin: 50% 0;\n      -ms-transform-origin: 50% 0;\n          transform-origin: 50% 0;\n}\n.ant-alert-slide-up-leave {\n  -webkit-animation: antAlertSlideUpOut 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n          animation: antAlertSlideUpOut 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n}\n.ant-alert-banner {\n  border-radius: 0;\n  border: 0;\n  margin-bottom: 0;\n}\n@-webkit-keyframes antAlertSlideUpIn {\n  0% {\n    opacity: 0;\n    -webkit-transform-origin: 0% 0%;\n            transform-origin: 0% 0%;\n    -webkit-transform: scaleY(0);\n            transform: scaleY(0);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform-origin: 0% 0%;\n            transform-origin: 0% 0%;\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@keyframes antAlertSlideUpIn {\n  0% {\n    opacity: 0;\n    -webkit-transform-origin: 0% 0%;\n            transform-origin: 0% 0%;\n    -webkit-transform: scaleY(0);\n            transform: scaleY(0);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform-origin: 0% 0%;\n            transform-origin: 0% 0%;\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n}\n@-webkit-keyframes antAlertSlideUpOut {\n  0% {\n    opacity: 1;\n    -webkit-transform-origin: 0% 0%;\n            transform-origin: 0% 0%;\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform-origin: 0% 0%;\n            transform-origin: 0% 0%;\n    -webkit-transform: scaleY(0);\n            transform: scaleY(0);\n  }\n}\n@keyframes antAlertSlideUpOut {\n  0% {\n    opacity: 1;\n    -webkit-transform-origin: 0% 0%;\n            transform-origin: 0% 0%;\n    -webkit-transform: scaleY(1);\n            transform: scaleY(1);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform-origin: 0% 0%;\n            transform-origin: 0% 0%;\n    -webkit-transform: scaleY(0);\n            transform: scaleY(0);\n  }\n}\n",""])},u=function(e,t,n){var a=n(1747);"string"==typeof a&&(a=[[e.i,a,""]]);n(15)(a,{});a.locals&&(e.exports=a.locals)},s=function(e,n,a){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _toConsumableArray(e){if(t.Array.isArray(e)){for(var n=0,a=t.Array(e.length);n<e.length;n++)a[n]=e[n];return a}return t.Array.from(e)}function _classCallCheck(e,n){if(!(e instanceof n))throw new t.TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new t.ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new t.TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=t.Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(t.Object.setPrototypeOf?t.Object.setPrototypeOf(e,n):e.__proto__=n)}t.Object.defineProperty(n,"__esModule",{value:!0});var r=(a(312),a(311)),i=_interopRequireDefault(r),l=(a(47),a(41)),o=_interopRequireDefault(l),u=(a(37),a(59)),s=_interopRequireDefault(u),c=(a(157),a(35)),f=_interopRequireDefault(c),d=(a(644),a(643)),p=_interopRequireDefault(d),h=(a(66),a(65)),m=_interopRequireDefault(h),y=(a(158),a(131)),g=_interopRequireDefault(y),b=(a(630),a(318)),v=_interopRequireDefault(b),_=(a(68),a(67)),k=_interopRequireDefault(_),E=t.Object.assign||function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var r in a)t.Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},R=function(){function defineProperties(e,n){for(var a=0;a<n.length;a++){var r=n[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),t.Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),w=a(0),C=_interopRequireDefault(w),D=a(313),x=_interopRequireDefault(D),S=a(22),q=_interopRequireDefault(S),O=a(114),P=_interopRequireDefault(O),j=a(80),N=_interopRequireDefault(j),T=a(116),I=_interopRequireDefault(T),A=k.default.Item,L=v.default.Group,M=g.default.Option,z=function(e){function Edit(e){_classCallCheck(this,Edit);var n=_possibleConstructorReturn(this,(Edit.__proto__||t.Object.getPrototypeOf(Edit)).call(this,e));return n.state={visible:!1,detail:{},chains:[],keys:[1],options:[],cityIds:[],adminCityInfos:[]},["handleEdit","handleSubmit","getProvinces","renderRegins","handleRegionChange","getRegin","handleReginInsert"].map(function(e){return n[e]=n[e].bind(n)}),n}return _inherits(Edit,e),R(Edit,[{key:"handleEdit",value:function(){this.getDetail(this.props.id),this.getProvinces(),this.showModal(),this.getChains()}},{key:"handleSubmit",value:function(){var e=this;this.props.form.validateFieldsAndScroll(function(n,a){if(n)return void m.default.error(N.default.text.hasError);var r=e.state.cityIds;if("2"===t.String(a.user_type)&&(a.city_ids=r.filter(function(e){return!!e}).join(",")),"2"===t.String(a.user_type)&&!a.city_ids)return m.default.error("请选择区域"),!1;q.default.ajax({url:q.default.admin.account.edit(),type:"POST",data:a},function(){m.default.success("编辑成功"),e.hideModal(),e.props.onSuccess()},function(e){m.default.error("编辑失败["+e+"]")})})}},{key:"handleReginDelete",value:function(e){var n=this,a=this.state,r=a.keys,i=a.cityIds;r[e]=null,i[e]=null;var l=1e3;try{l=r.filter(function(e){return!!t.Number(e)}).length}catch(e){}this.setState({keys:r,cityIds:i},function(){0===l&&n.handleReginInsert()})}},{key:"handleReginInsert",value:function(){var e=this.state.keys;e.push(e.length+1),this.setState({keys:e})}},{key:"handleRegionChange",value:function(e,t){var n=this.state.cityIds;2===t.length&&(n[e]=t[1].city_id,this.setState({cityIds:n}))}},{key:"getChains",value:function(){var e=this;q.default.ajax({url:q.default.overview.getAllChains()},function(t){e.setState({chains:t.res.list})})}},{key:"getRegin",value:function(e){var t=this,n=e[e.length-1];n.loading=!0,q.default.ajax({url:q.default.system.getCities(n.name)},function(e){n.loading=!1,n.children=[],e.res.city_list.map(function(e){e.value=e.name,e.label=e.name,e.isLeaf=!0,n.children.push(e)}),t.setState({options:[].concat(_toConsumableArray(t.state.options))})})}},{key:"getProvinces",value:function(){var e=this;q.default.ajax({url:q.default.system.getProvinces()},function(t){var n=t.res.province_list.map(function(e){return e.value=e.name,e.label=e.name,e.isLeaf=!1,e});e.setState({options:n})})}},{key:"getDetail",value:function(e){var t=this;q.default.ajax({url:q.default.admin.account.detail(e)},function(e){var n=e.res.user_info.admin_city_infos||[],a=[],r=[];n.map(function(e,t){a.push(e.city_id),r.push(t+1)}),n.length<=0&&r.push(1),t.setState({detail:e.res.user_info,cityIds:a,keys:r,adminCityInfos:n})})}},{key:"renderRegins",value:function(){var e=this,n=this.state,a=n.keys,r=n.options,i=n.adminCityInfos,l=P.default.formItemLayout,o=0;return a.map(function(n,a){return!!n&&o++,C.default.createElement("div",{key:""+t.String(n)+(a+1)},n&&(i[a]?C.default.createElement(A,E({},l,{label:"区域"+o}),C.default.createElement("span",null,i[a].name),C.default.createElement("a",{href:"javascript:;",onClick:function(){return e.handleReginDelete(a)},className:"ml20"},"删除")):C.default.createElement(A,E({},l,{label:"区域"+o}),C.default.createElement(p.default,{options:r,loadData:e.getRegin,onChange:function(t,n){return e.handleRegionChange(a,n)},changeOnSelect:!0,style:{width:220},placeholder:"请选择地区",size:"large"}),C.default.createElement("a",{href:"javascript:;",onClick:function(){return e.handleReginDelete(a)},className:0===t.Number(a)?"hide":"ml20"},"删除"))))})}},{key:"render",value:function(){var e=P.default.formItemLayout,t=P.default.selectStyle,n=this.props.form,a=n.getFieldDecorator,r=n.getFieldValue,l=this.state,u=l.visible,c=l.detail,d=l.chains;return C.default.createElement("span",null,C.default.createElement("a",{href:"javascript:",onClick:this.handleEdit},"编辑"),C.default.createElement(i.default,{title:C.default.createElement("span",null,C.default.createElement(f.default,{type:"plus"})," 编辑账号"),visible:u,width:720,onOk:this.handleSubmit,onCancel:this.hideModal},C.default.createElement(k.default,null,a("_id",{initialValue:c._id})(C.default.createElement(s.default,{type:"hidden"})),C.default.createElement(A,E({label:"姓名"},e),a("name",{initialValue:c.name,rules:I.default.getRuleNotNull(),validatorTrigger:"onBlur"})(C.default.createElement(s.default,{placeholder:"请输入姓名"}))),C.default.createElement(A,E({label:"性别"},e),a("gender",{initialValue:c.gender||"1"})(C.default.createElement(L,null,C.default.createElement(v.default,{value:"1"},"男"),C.default.createElement(v.default,{value:"0"},"女")))),C.default.createElement(A,E({label:"手机号"},e),a("phone",{initialValue:c.phone,rules:I.default.getRulePhoneNumber(),validatorTrigger:"onBlur"})(C.default.createElement(s.default,{placeholder:"请输入手机号"}))),C.default.createElement(A,E({label:"账号类型"},e),a("user_type",{initialValue:c.user_type,rules:I.default.getRuleNotNull(),validatorTrigger:"onBlur"})(C.default.createElement(g.default,E({},t,{placeholder:"请选择账号类型"}),C.default.createElement(M,{value:"1"},"连锁店管理员"),C.default.createElement(M,{value:"2"},"区域管理员"),C.default.createElement(M,{value:"3"},"总公司管理员")))),"1"===r("user_type")&&C.default.createElement(A,E({label:"选择连锁"},e),a("chain_id",{initialValue:c.chain_id})(C.default.createElement(g.default,E({},t,{placeholder:"请选择连锁店"}),d.map(function(e){return C.default.createElement(M,{key:e._id},e.chain_name)})))),"2"===r("user_type")&&this.renderRegins(),"2"===r("user_type")&&C.default.createElement(o.default,{onClick:this.handleReginInsert,className:"font-size-14",style:{marginLeft:170},type:"primary"},"添加区域"))))}}]),Edit}(x.default);z=k.default.create()(z),n.default=z},c=function(e,n,a){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _toConsumableArray(e){if(t.Array.isArray(e)){for(var n=0,a=t.Array(e.length);n<e.length;n++)a[n]=e[n];return a}return t.Array.from(e)}function _classCallCheck(e,n){if(!(e instanceof n))throw new t.TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new t.ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new t.TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=t.Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(t.Object.setPrototypeOf?t.Object.setPrototypeOf(e,n):e.__proto__=n)}t.Object.defineProperty(n,"__esModule",{value:!0});var r=(a(312),a(311)),i=_interopRequireDefault(r),l=(a(37),a(59)),o=_interopRequireDefault(l),u=(a(157),a(35)),s=_interopRequireDefault(u),c=(a(47),a(41)),f=_interopRequireDefault(c),d=(a(644),a(643)),p=_interopRequireDefault(d),h=(a(66),a(65)),m=_interopRequireDefault(h),y=(a(158),a(131)),g=_interopRequireDefault(y),b=(a(630),a(318)),v=_interopRequireDefault(b),_=(a(68),a(67)),k=_interopRequireDefault(_),E=t.Object.assign||function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var r in a)t.Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},R=function(){function defineProperties(e,n){for(var a=0;a<n.length;a++){var r=n[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),t.Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),w=a(0),C=_interopRequireDefault(w),D=a(313),x=_interopRequireDefault(D),S=a(22),q=_interopRequireDefault(S),O=a(114),P=_interopRequireDefault(O),j=a(80),N=_interopRequireDefault(j),T=a(116),I=_interopRequireDefault(T),A=k.default.Item,L=v.default.Group,M=g.default.Option,z=function(e){function New(e){_classCallCheck(this,New);var n=_possibleConstructorReturn(this,(New.__proto__||t.Object.getPrototypeOf(New)).call(this,e));return n.state={visible:!1,chains:[],keys:[1],options:[],cityIds:[]},["handleSubmit","handleUserTypeChange","getProvinces","renderRegins","handleRegionChange","getRegin","handleReginInsert"].map(function(e){return n[e]=n[e].bind(n)}),n}return _inherits(New,e),R(New,[{key:"componentDidMount",value:function(){this.getProvinces()}},{key:"handleSubmit",value:function(){var e=this;this.props.form.validateFieldsAndScroll(function(n,a){if(n)return void m.default.error(N.default.text.hasError);var r=e.state.cityIds;if(a.city_ids=r.filter(function(e){return!!e}).join(","),"2"===t.String(a.user_type)&&!a.city_ids)return m.default.error("请选择区域"),!1;q.default.ajax({url:q.default.admin.account.add(),type:"POST",data:a},function(){m.default.success("创建账号成功"),e.hideModal(),e.props.onSuccess()})})}},{key:"handleUserTypeChange",value:function(e){0===this.state.chains.length&&"1"===e&&this.getChains()}},{key:"handleRegionChange",value:function(e,t){var n=this.state.cityIds;2===t.length&&(n[e]=t[1].city_id,this.setState({cityIds:n}))}},{key:"handleReginDelete",value:function(e){var t=this.state,n=t.keys,a=t.cityIds;n[e]=null,a[e]=null,this.setState({keys:n,cityIds:a})}},{key:"handleReginInsert",value:function(){var e=this.state.keys;e.push(e.length+1),this.setState({keys:e})}},{key:"hideModal",value:function(){this.props.form.resetFields(),this.setState({visible:!1})}},{key:"getChains",value:function(){var e=this;q.default.ajax({url:q.default.overview.getAllChains()},function(t){e.setState({chains:t.res.list})})}},{key:"getProvinces",value:function(){var e=this;q.default.ajax({url:q.default.system.getProvinces()},function(t){var n=t.res.province_list.map(function(e){return e.value=e.name,e.label=e.name,e.isLeaf=!1,e});e.setState({options:n})})}},{key:"getRegin",value:function(e){var t=this,n=e[e.length-1];n.loading=!0,q.default.ajax({url:q.default.system.getCities(n.name)},function(e){n.loading=!1,n.children=[],e.res.city_list.map(function(e){e.value=e.name,e.label=e.name,e.isLeaf=!0,n.children.push(e)}),t.setState({options:[].concat(_toConsumableArray(t.state.options))})})}},{key:"renderRegins",value:function(){var e=this,n=this.state,a=n.keys,r=n.options,i=P.default.formItemLayout,l=0;return a.map(function(n,a){return!!n&&l++,C.default.createElement("div",{key:""+t.String(n)+(a+1)},n&&C.default.createElement(A,E({},i,{label:"区域"+l}),C.default.createElement(p.default,{options:r,loadData:e.getRegin,onChange:function(t,n){return e.handleRegionChange(a,n)},changeOnSelect:!0,style:{width:220},placeholder:"请选择地区",size:"large",allowClear:!1}),C.default.createElement("a",{href:"javascript:;",onClick:function(){return e.handleReginDelete(a)},className:0===t.Number(a)?"hide":"ml20"},"删除")))})}},{key:"render",value:function(){var e=P.default.formItemLayout,t=P.default.selectStyle,n=this.props.form,a=n.getFieldDecorator,r=n.getFieldValue,l=this.state,u=l.visible,c=l.chains;return C.default.createElement("span",null,C.default.createElement(f.default,{type:"primary",onClick:this.showModal},"创建账号"),C.default.createElement(i.default,{title:C.default.createElement("span",null,C.default.createElement(s.default,{type:"plus"})," 创建账号"),visible:u,width:720,onOk:this.handleSubmit,onCancel:this.hideModal},C.default.createElement(k.default,null,C.default.createElement(A,E({label:"姓名"},e),a("name",{rules:I.default.getRuleNotNull(),validatorTrigger:"onBlur"})(C.default.createElement(o.default,{placeholder:"请输入姓名"}))),C.default.createElement(A,E({label:"性别"},e),a("gender",{initialValue:"1"})(C.default.createElement(L,null,C.default.createElement(v.default,{value:"1"},"男"),C.default.createElement(v.default,{value:"0"},"女")))),C.default.createElement(A,E({label:"手机号"},e),a("phone",{rules:I.default.getRulePhoneNumber(),validatorTrigger:"onBlur"})(C.default.createElement(o.default,{placeholder:"请输入手机号"}))),C.default.createElement(A,E({label:"账号类型"},e),a("user_type",{initialValue:"3",rules:I.default.getRuleNotNull(),validatorTrigger:"onBlur",onChange:this.handleUserTypeChange})(C.default.createElement(g.default,E({},t,{placeholder:"请选择账号类型"}),C.default.createElement(M,{value:"1"},"连锁店管理员"),C.default.createElement(M,{value:"2"},"区域管理员"),C.default.createElement(M,{value:"3"},"总公司管理员")))),"1"===r("user_type")&&C.default.createElement(A,E({label:"选择连锁"},e),a("chain_id")(C.default.createElement(g.default,E({},t,{placeholder:"请选择连锁店"}),c.map(function(e){return C.default.createElement(M,{key:e._id},e.chain_name)})))),"2"===r("user_type")&&this.renderRegins(),"2"===r("user_type")&&C.default.createElement(f.default,{onClick:this.handleReginInsert,className:"font-size-14",style:{marginLeft:170},type:"primary"},"添加区域"))))}}]),New}(x.default);z=k.default.create()(z),n.default=z},f=function(e,n,a){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,n){if(!(e instanceof n))throw new t.TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new t.ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new t.TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=t.Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(t.Object.setPrototypeOf?t.Object.setPrototypeOf(e,n):e.__proto__=n)}t.Object.defineProperty(n,"__esModule",{value:!0});var r=(a(1597),a(1596)),i=_interopRequireDefault(r),l=(a(629),a(314)),o=_interopRequireDefault(l),u=(a(66),a(65)),s=_interopRequireDefault(u),c=function(){function defineProperties(e,n){for(var a=0;a<n.length;a++){var r=n[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),t.Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),f=a(0),d=_interopRequireDefault(f),p=a(22),h=_interopRequireDefault(p),m=a(197),y=_interopRequireDefault(m),g=a(316),b=_interopRequireDefault(g),v=a(2337),_=_interopRequireDefault(v),k=function(e){function Table(){return _classCallCheck(this,Table),_possibleConstructorReturn(this,(Table.__proto__||t.Object.getPrototypeOf(Table)).apply(this,arguments))}return _inherits(Table,e),c(Table,[{key:"handleStop",value:function(e,t){var n=this;h.default.ajax({url:h.default.admin.account.modifyStatus(),type:"POST",data:{_id:e,status:t}},function(){s.default.success("停用成功"),n.props.onSuccess()},function(e){s.default.error("停用失败["+e+"]")})}},{key:"render",value:function(){var e=this,n=[{title:"姓名",dataIndex:"name",key:"name",width:110},{title:"手机号",dataIndex:"phone",key:"phone",width:110},{title:"账号类型",dataIndex:"user_type",key:"user_type",width:103,render:function(e){return y.default.settings.account.userType[e]}},{title:"负责区域",dataIndex:"admin_city_infos",key:"admin_city_infos",render:function(e){if(!e||!t.Array.isArray(e))return"--";var n=e.map(function(e){return e.name}).join(",");return n.length<=6?d.default.createElement("span",null,n):d.default.createElement(o.default,{placement:"topLeft",title:n},n)}},{title:"负责连锁",dataIndex:"chain_name",key:"chain_name",width:145,render:function(e){return e?e.length<=9?d.default.createElement("span",null,e):d.default.createElement(o.default,{placement:"topLeft",title:e},e):"--"}},{title:"创建人",dataIndex:"create_user_name",key:"create_user_name",width:110},{title:"创建时间",dataIndex:"ctime",key:"ctime",width:160},{title:"操作",dataIndex:"_id",key:"action",className:"center",width:90,render:function(t,n){return d.default.createElement("span",null,d.default.createElement(_.default,{id:t,onSuccess:e.props.onSuccess}),d.default.createElement("span",{className:"ant-divider"}),d.default.createElement(i.default,{placement:"topRight",title:"确定要停用吗？",onConfirm:e.handleStop.bind(e,t,-1)},"-1"===n.status?d.default.createElement("a",{href:"javascript:",disabled:!0},"已停用"):d.default.createElement("a",{href:"javascript:"},"停用")))}}];return this.renderTable(n)}}]),Table}(b.default);n.default=k},d=e,p=d.webpackJsonp;if(d.webpackJsonp!==p)throw new Error("Prepack model invariant violation: "+d.webpackJsonp);var h=[51],m={1575:n,1596:a,1597:r,1698:i,1699:l,1747:o,1748:u,2337:s,2338:c,2339:f};p(h,m)}).call(this);