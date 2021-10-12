export function getEDMSFileUrl(file) {
  //Real URL
  return process.env.REACT_APP_BACKEND.replace('/logbookws/rest', '/cern-eam-services/rest').replace('/eamlightws/rest', '/cern-eam-services/rest') + "/edms/file?edmsid=".concat(file.edmsId, "&version=").concat(file.version, "&filename=").concat(file.fileName, "&filetype=").concat(file.fileType, "&convertedname=").concat(file.convertedName);
}
export function getEDMSFileThumbnailUrl(file) {
  return process.env.REACT_APP_BACKEND.replace('/logbookws/rest', '/cern-eam-services/rest').replace('/eamlightws/rest', '/cern-eam-services/rest') + "/edms/thumbnail?edmsid=".concat(file.edmsId, "&version=").concat(file.version, "&filename=").concat(file.fileName, "&filetype=").concat(file.fileType);
}