function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

import DateFnsUtils from '@date-io/date-fns';
import Icon from '@material-ui/core/Icon';
import { format } from 'date-fns';
import parse from "date-fns/parse";
import { DatePicker, DateTimePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import React from 'react';
import EAMBaseInput from './EAMBaseInput';
import EAMTextField from './EAMTextField';
import EventIcon from '@material-ui/icons/Event';
import { InputAdornment, IconButton } from "@material-ui/core";

var DefaultEndAdornment = function DefaultEndAdornment(props) {
  return /*#__PURE__*/React.createElement(InputAdornment, {
    position: "end"
  }, props.endAdornment ? props.endAdornment : '', /*#__PURE__*/React.createElement(IconButton, {
    size: "small"
  }, /*#__PURE__*/React.createElement(EventIcon, null)));
};

var EAMDatePicker = /*#__PURE__*/function (_EAMBaseInput) {
  _inherits(EAMDatePicker, _EAMBaseInput);

  var _super = _createSuper(EAMDatePicker);

  function EAMDatePicker() {
    var _this;

    _classCallCheck(this, EAMDatePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.init = function (props) {
      _this.setValue(_this.convert(props.value));
    };

    _this.readValue = function (value) {
      return value instanceof Date ? value : typeof value === "string" && value.length ? parse(value.substring(0, _this.props.dateFormatValue.length), _this.props.dateFormatValue, new Date()) : typeof value === "number" ? new Date(value) : null;
    };

    _this.readDate = function (date) {
      return !date ? _this.props.timestamp ? null : '' : _this.props.timestamp ? date.getTime() : format(date, _this.props.dateFormatValue);
    };

    _this.convert = function (value) {
      return _this.readDate(_this.readValue(value || ''));
    };

    return _this;
  }

  _createClass(EAMDatePicker, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.value !== nextProps.value || this.state.error !== nextState.error || this.state.helperText !== nextState.helperText || this.state.disabled !== nextState.disabled || JSON.stringify(this.props.elementInfo || {}) !== JSON.stringify(nextProps.elementInfo || {});
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var value = this.props.value;

      if (value instanceof Date || typeof value === 'string' && this.props.timestamp || typeof value === 'number' && !this.props.timestamp) {
        this.onChangeHandler(this.convert(value));
      }
    }
  }, {
    key: "getPickerProps",
    value: function getPickerProps(state, props) {
      var _this2 = this;

      var elementInfo = props.elementInfo,
          dateFormatDisplay = props.dateFormatDisplay,
          value = props.value;
      var helperText = state.helperText,
          error = state.error,
          disabled = state.disabled;
      return {
        inputadornmentprops: {
          style: {
            marginRight: -12
          }
        },
        error: error,
        helperText: helperText,
        disabled: disabled || elementInfo && elementInfo.readonly,
        required: this.isRequired(),
        clearable: true,
        value: this.readValue(value),
        // Always formats the value. In EDGE and IE, the new Date() has a different behavior than in Chrome and Firefox
        onChange: function onChange(str) {
          return _this2.onChangeHandler(_this2.convert(str));
        },
        format: dateFormatDisplay,
        label: elementInfo && elementInfo.text,
        leftArrowIcon: /*#__PURE__*/React.createElement(Icon, null, " keyboard_arrow_left "),
        rightArrowIcon: /*#__PURE__*/React.createElement(Icon, null, " keyboard_arrow_right "),
        TextFieldComponent: EAMTextField
      };
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      var _this$props = this.props,
          showTime = _this$props.showTime,
          endAdornment = _this$props.endAdornment;
      var pickerProps = this.getPickerProps(this.state, this.props);
      return showTime ? /*#__PURE__*/React.createElement(DateTimePicker, _extends({}, pickerProps, {
        ampm: false,
        InputProps: {
          endAdornment: /*#__PURE__*/React.createElement(DefaultEndAdornment, {
            endAdornment: endAdornment
          })
        }
      })) : /*#__PURE__*/React.createElement(DatePicker, _extends({}, pickerProps, {
        InputProps: {
          endAdornment: /*#__PURE__*/React.createElement(DefaultEndAdornment, {
            endAdornment: endAdornment
          })
        }
      }));
    }
  }]);

  return EAMDatePicker;
}(EAMBaseInput);

export { EAMDatePicker as default };
EAMDatePicker.propTypes = {
  dateFormatDisplay: PropTypes.string.isRequired,
  dateFormatValue: PropTypes.string.isRequired,
  showTime: PropTypes.bool.isRequired
};
EAMDatePicker.defaultProps = {
  showTime: false
};