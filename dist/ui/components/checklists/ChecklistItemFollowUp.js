function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';

var ChecklistItemFollowUp = /*#__PURE__*/function (_Component) {
  _inherits(ChecklistItemFollowUp, _Component);

  var _super = _createSuper(ChecklistItemFollowUp);

  function ChecklistItemFollowUp() {
    var _this;

    _classCallCheck(this, ChecklistItemFollowUp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.mainStyle = {
      flex: "1",
      display: "flex",
      marginLeft: 10
    };
    _this.followUpWOCodeStyle = {
      paddingLeft: '8px',
      paddingRight: '16px',
      fontSize: '12px'
    };

    _this.handleChange = function (event) {
      // invert the input since we are using an onMouseDown/onTouchStart handler, before the input is changed
      _this.props.onChange(_objectSpread({}, _this.props.checklistItem, {
        followUp: !event.target.checked
      }));
    };

    return _this;
  }

  _createClass(ChecklistItemFollowUp, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          checklistItem = _this$props.checklistItem,
          getWoLink = _this$props.getWoLink;
      return /*#__PURE__*/React.createElement("div", {
        style: {
          padding: 2
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: this.mainStyle
      }, /*#__PURE__*/React.createElement(FormControlLabel, {
        control: checklistItem.followUpWorkOrder ? /*#__PURE__*/React.createElement("div", {
          style: this.followUpWOCodeStyle
        }, /*#__PURE__*/React.createElement(Link, {
          to: getWoLink(checklistItem.followUpWorkOrder),
          target: "_blank"
        }, checklistItem.followUpWorkOrder)) : /*#__PURE__*/React.createElement(Checkbox, _defineProperty({
          color: "primary",
          checked: checklistItem.followUp === '+' || checklistItem.followUp === true,
          disabled: Boolean(checklistItem.followUpWorkOrder),
          onMouseDown: this.handleChange,
          onTouchStart: this.handleChange
        }, "disabled", this.props.disabled)),
        labelPlacement: "start",
        label: "Follow-up"
      })));
    }
  }]);

  return ChecklistItemFollowUp;
}(Component);

export { ChecklistItemFollowUp as default };