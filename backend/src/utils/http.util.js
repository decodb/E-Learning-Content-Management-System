// Error Status Codes
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const UNSUPPORTED_MEDIA_TYPE = 415;
const INTERNAL_SERVER_ERROR = 500;

// Success Status Codes
const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;

function sendOk(res, data, message = "Success") {
  return res.status(OK).json({ success: true, message, data });
}

function sendCreated(res, data, accessToken , message = "Created") {
  return res.status(CREATED).json({ success: true, message, accessToken, data });
}

function sendNoContent(res) {
  return res.sendStatus(NO_CONTENT);
}

function sendBadRequest(res, message = "Bad Request") {
  return res.status(BAD_REQUEST).json({ success: false, message });
}

function sendUnauthorized(res, message = "Unauthorized") {
  return res.status(UNAUTHORIZED).json({ success: false, message });
}

function sendForbidden(res, message = "Forbidden") {
  return res.status(FORBIDDEN).json({ success: false, message });
}

function sendNotFound(res, message = "Not Found") {
  return res.status(NOT_FOUND).json({ success: false, message });
}

function sendConflict(res, message = "Conflict") {
  return res.status(CONFLICT).json({ success: false, message });
}

function sendUnsupportedMediaType(res, message = "Unsupported Media Type") {
  return res.status(UNSUPPORTED_MEDIA_TYPE).json({ success: false, message });
}

const sendInternalServerError = ( res, message = "Internal Server Error") => {
  return res.status(INTERNAL_SERVER_ERROR).json({ success: false, message });
};

export {
  sendOk,
  sendCreated,
  sendNoContent,
  sendBadRequest,
  sendUnauthorized,
  sendForbidden,
  sendNotFound,
  sendConflict,
  sendUnsupportedMediaType,
  sendInternalServerError
};