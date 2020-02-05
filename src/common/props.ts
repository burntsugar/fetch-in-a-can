/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:55:54
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-05 17:25:10
 */

const props = (() => {

  enum STATUS_CODE {
    OK = 200,
    UNAUTHORIZED = 401,
    FETCH_ERROR = -1000,
    RANGE_ERROR = -2000,
  };

  enum STATUS_NAME {
    OK = 'OK',
    UNAUTHORIZED = 'Unauthorized',
    FETCH_ERROR = 'FetchError',
    RANGE_ERROR = 'RangeError'
  };

  enum STATUS_MSG {
    OK = 'The request has succeeded.',
    UNAUTHORIZED = 'The request requires user authentication.',
    FETCH_ERROR = 'There was a problem during fetch',
    RANGE_ERROR = 'There was a problem with arguments'
  };

  return {
    STATUS_CODE: STATUS_CODE,
    STATUS_NAME: STATUS_NAME,
    STATUS_MSG: STATUS_MSG,
  };
})();

export { props };
