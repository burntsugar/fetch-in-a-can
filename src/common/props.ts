/*
 * @Author: rach@rach.colley
 * @Date: 2020-01-30 00:55:54
 * @Last Modified by: rach@rach.colley
 * @Last Modified time: 2020-01-30 01:42:53
 */

const props = (() => {

  enum STATUS_CODE {
    OK = 200,
    UNAUTHORIZED = 401,
    FETCH_ERROR = 'FETCH_ERROR',
  };

  enum STATUS_NAME {
    OK = 'OK',
    UNAUTHORIZED = 'Unauthorized',
    FETCH_ERROR = 'FetchError',
  };

  enum STATUS_MSG {
    OK = 'The request has succeeded.',
    UNAUTHORIZED = 'The request requires user authentication.',
    FETCH_ERROR = 'There was a problem during fetch',
  };

  return {
    STATUS_CODE: STATUS_CODE,
    STATUS_NAME: STATUS_NAME,
    STATUS_MSG: STATUS_MSG,
  };
})();

export {props};