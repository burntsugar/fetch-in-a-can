/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:55:54
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 17:54:35
 */

const props = (() => {

  enum STATUS_CODE {
    OK = 200,
    UNAUTHORIZED = 401,
    FETCH_ERROR = -1000,
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

export { props };
