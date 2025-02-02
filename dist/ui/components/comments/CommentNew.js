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
import './Comments.css';
import CommentBar from "./CommentBar";
import CommentAvatar from "./CommentAvatar";
import TextareaAutosize from 'react-autosize-textarea';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from "@material-ui/core/styles/index";
var initialContainerStyle = {
  opacity: 1.0,
  pointerEvents: 'all'
};
var styles = {
  root: {
    alignItems: "start",
    paddingTop: 6,
    paddingBottom: 6
  }
};

var CommentNew = /*#__PURE__*/function (_Component) {
  _inherits(CommentNew, _Component);

  var _super = _createSuper(CommentNew);

  function CommentNew(_props) {
    var _this;

    _classCallCheck(this, CommentNew);

    _this = _super.call(this, _props);

    _this.initNewComment = function (props) {
      return {
        entityCode: _this.props.entityCode,
        entityKeyCode: _this.props.entityKeyCode,
        text: props.newCommentText
      };
    };

    _this.inputTextArea = function (event) {
      var element = event.target;
      var displayBar = element.value !== '' && !!_this.props.entityKeyCode; //The text

      var comment = _this.state.comment;
      comment.text = element.value;

      _this.updateState(displayBar, comment); //Value


      _this.props.updateNewCommentText(comment.text);
    };

    _this.showUpdating = function () {
      _this.setState(function () {
        return {
          containerStyle: {
            opacity: 0.4,
            pointerEvents: 'none'
          }
        };
      });
    };

    _this.updateState = function (displayBar, comment, containerStyle) {
      _this.setState(function () {
        return {
          displayBar: displayBar,
          comment: comment,
          containerStyle: containerStyle
        };
      });
    };

    _this.onKeyDownHandler = function (event) {
      if (event.keyCode === 13 || event.keyCode === 121) {
        event.stopPropagation();
      }
    };

    _this.state = {
      displayBar: false,
      comment: _this.initNewComment(_this.props),
      containerStyle: initialContainerStyle
    };
    return _this;
  }

  _createClass(CommentNew, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      //Display bar
      var displayBar = nextProps.newCommentText !== '' && !!this.props.entityKeyCode;
      this.updateState(displayBar, this.initNewComment(nextProps), initialContainerStyle);
    }
  }, {
    key: "render",
    value: function render() {
      var disabled = this.props.disabled;
      var placeholder = disabled ? 'Commenting is disabled' : 'Enter new comment here';
      return /*#__PURE__*/React.createElement(ListItem, {
        classes: {
          root: this.props.classes.root
        }
      }, /*#__PURE__*/React.createElement(CommentAvatar, {
        name: this.props.userCode
      }), /*#__PURE__*/React.createElement("div", {
        className: "commentContainer",
        style: this.state.containerStyle
      }, /*#__PURE__*/React.createElement("div", {
        className: "triangle"
      }), /*#__PURE__*/React.createElement("div", {
        className: "innerTriangle"
      }), this.state.displayBar && /*#__PURE__*/React.createElement("div", {
        className: "commentInfoContainer"
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: 20
        }
      }), /*#__PURE__*/React.createElement(CommentBar, {
        saveCommentHandler: this.props.createCommentHandler,
        displayBar: this.state.displayBar,
        comment: this.state.comment,
        displayClosingCheck: this.props.entityCode === 'EVNT',
        displayPrivateCheck: this.props.displayPrivateCheck,
        showUpdatingHandler: this.showUpdating
      })), /*#__PURE__*/React.createElement("div", {
        className: "commentTextContainer",
        onKeyDown: this.onKeyDownHandler
      }, /*#__PURE__*/React.createElement(TextareaAutosize, {
        placeholder: placeholder,
        className: "commentText",
        onInput: this.inputTextArea,
        value: this.props.newCommentText,
        onFocus: this.inputTextArea,
        disabled: disabled
      }))));
    }
  }]);

  return CommentNew;
}(Component);

export default withStyles(styles)(CommentNew);