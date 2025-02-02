function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import ajax from './ajax';
/**
 * Handles all calls to REST Api
 */

var WSEDMS = /*#__PURE__*/function () {
  function WSEDMS() {
    _classCallCheck(this, WSEDMS);
  }

  _createClass(WSEDMS, [{
    key: "getEDMSDocuments",
    value: //
    //EDMS
    //
    function getEDMSDocuments(objectID, objectType, mode) {
      var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      objectType = encodeURIComponent(objectType);
      return ajax.get(process.env.REACT_APP_BACKEND.replace('/logbookws/rest', '/cern-eam-services/rest').replace('/eamlightws/rest', '/cern-eam-services/rest') + "/edms/documents?objectid=".concat(objectID, "&objectType=").concat(objectType, "&mode=").concat(mode), config);
    }
  }, {
    key: "createNewDocument",
    value: function createNewDocument(data) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return ajax.post(process.env.REACT_APP_BACKEND.replace('/logbookws/rest', '/cern-eam-services/rest').replace('/eamlightws/rest', '/cern-eam-services/rest') + "/edms/createdocument", data, config);
    }
  }, {
    key: "getNCRProperties",
    value: function getNCRProperties(objectType, objectID) {
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return ajax.get(process.env.REACT_APP_BACKEND.replace('/logbookws/rest', '/cern-eam-services/rest').replace('/eamlightws/rest', '/cern-eam-services/rest') + "/edms/ncrproperties", config);
    }
  }, {
    key: "getNCRKeyWords",
    value: function getNCRKeyWords(objectID) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return ajax.get(process.env.REACT_APP_BACKEND.replace('/logbookws/rest', '/cern-eam-services/rest').replace('/eamlightws/rest', '/cern-eam-services/rest') + "/edms/ncrkeywords/".concat(objectID), config);
    }
  }, {
    key: "getEquipmentWorkOrders",
    value: function getEquipmentWorkOrders(objectType, objectID) {
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return ajax.get(process.env.REACT_APP_BACKEND.replace('/logbookws/rest', '/cern-eam-services/rest').replace('/eamlightws/rest', '/cern-eam-services/rest') + "/edms/equipmentwos?objectType=".concat(objectType, "&objectCode=").concat(objectID), config);
    }
  }]);

  return WSEDMS;
}();

export default new WSEDMS();