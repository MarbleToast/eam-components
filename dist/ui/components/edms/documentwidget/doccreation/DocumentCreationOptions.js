function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
import EAMInput from "../../../inputs/EAMInput";

var DocumentCreationOptions = /*#__PURE__*/function (_Component) {
  _inherits(DocumentCreationOptions, _Component);

  var _super = _createSuper(DocumentCreationOptions);

  function DocumentCreationOptions() {
    var _this;

    _classCallCheck(this, DocumentCreationOptions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.inputStyle = {
      flex: "1 1 auto",
      border: "1px solid #ced4da",
      padding: "5px 10px",
      fontSize: 16,
      transition: "border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      borderRadius: 4,
      backgroundColor: "#fff",
      marginTop: 5,
      marginBottom: 5
    };
    _this.mainDivStyle = {
      margin: 5,
      display: "flex"
    };
    _this.optionsLabelStyle = {
      marginTop: 11,
      width: 110,
      fontWeight: 500
    };
    _this.optionsStyle = {
      display: "flex",
      flexDirection: "column"
    };
    return _this;
  }

  _createClass(DocumentCreationOptions, [{
    key: "render",
    value: //
    // RENDER
    //
    function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement("div", {
        style: this.mainDivStyle
      }, /*#__PURE__*/React.createElement("div", {
        style: this.optionsStyle
      }, /*#__PURE__*/React.createElement(EAMInput, {
        label: "Description",
        placeholder: "Description",
        valueKey: "description",
        value: this.props.description,
        updateProperty: function updateProperty(key, value) {
          return _this2.props.onPropertyChange(key, value);
        }
      })));
    }
  }]);

  return DocumentCreationOptions;
}(Component);

export default DocumentCreationOptions;