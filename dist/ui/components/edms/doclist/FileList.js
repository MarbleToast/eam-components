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
import FileRow from './FileRow';
import FilePlus from 'mdi-material-ui/FilePlus';
import IconButton from '@material-ui/core/IconButton';

var FileList = /*#__PURE__*/function (_Component) {
  _inherits(FileList, _Component);

  var _super = _createSuper(FileList);

  function FileList() {
    var _this;

    _classCallCheck(this, FileList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.fileAttachmentStyle = {
      position: "absolute",
      right: 0,
      top: 0
    };
    _this.fileListStyle = {
      position: "relative",
      borderTop: "1px solid #e0e0e0",
      minHeight: 40,
      wordBreak: "break-all",
      paddingRight: 40
    };
    return _this;
  }

  _createClass(FileList, [{
    key: "generateFileList",
    value: function generateFileList() {
      if (this.props.files) {
        return this.props.files.map(function (file) {
          return /*#__PURE__*/React.createElement(FileRow, {
            file: file
          });
        });
      } else {
        return /*#__PURE__*/React.createElement("h6", null, "No docs yet");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement("div", {
        style: this.fileListStyle
      }, /*#__PURE__*/React.createElement("div", {
        style: this.fileAttachmentStyle
      }, /*#__PURE__*/React.createElement(IconButton, {
        style: {
          color: "rgb(0, 170, 255)"
        },
        onClick: function onClick() {
          return _this2.props.dropzone.open();
        }
      }, /*#__PURE__*/React.createElement(FilePlus, null))), this.generateFileList());
    }
  }]);

  return FileList;
}(Component);

export default FileList;