/*
 * @Author: rach@rach.colley
 * @Date: 2020-01-28 15:23:22
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 15:05:22
 */
import {FetchResult} from '../fetch/fetch-result';
import {props} from '../common/props';

const mockFetchClient = (() => {

  const UNAUTHORIZED_RESPONSE:string = '{ "message": "Bad credentials" }';

  enum users
  {
    burntsugar = '{ "data": { "user": { "bio": "Software development. MEL, AU", "avatarUrl": "https://avatars2.githubusercontent.com/u/6642149?s=200&v=4", "url": "https://github.com/burntsugar", "login": "burntsugar", "name": "Rach" } } }',
    slipperyseal = '{ "data": { "user": { "bio": "robotics and embedded", "avatarUrl": "https://avatars0.githubusercontent.com/u/7922049?s=200&v=4", "url": "https://github.com/slipperyseal", "login": "slipperyseal", "name": "Slippery Seal" } } }',
  };

  const makeUserDoesNotExist = (user:string):string => {
    const response:string = `{ "data": { "user": null }, "errors": [ { "message": "Could not resolve to a User with the login of \'${user}\'." } ] }`;
    return response;
  }



  const findUser = (login:string):string => {
    switch(login){
      case users.burntsugar:
        return users.burntsugar;
        case users.slipperyseal:
        return users.slipperyseal;
        default: return '';
    }
  };

  const fetchNow = async (baseUrl:string, stringifiedPayload:string, accessToken:string) => {
    switch (baseUrl) {
    case '/fetch200':
      return fetch200();
    case '/fetch401':
      return fetch401();
    case '/fetchForceFetchError':
      return fetchForceFetchError();    
    default: return fetchUser(stringifiedPayload);
    }
  };

  const fetchUser = (stringifiedPayload:string) => {
    const login = extractLoginFromQuery(stringifiedPayload);
    let data:string;
    let status;
    const user = findUser(login);
    if (login == '') {
      data = makeUserDoesNotExist(login);
      status = props.STATUS_CODE.OK;
    } else if (user) {
      data = user;
      status = props.STATUS_CODE.OK;
    } else {
      data = makeUserDoesNotExist(login);
      status = props.STATUS_CODE.OK;
    }
    return new FetchResult(status.toString(), JSON.parse(data));
  };

  // 200 OK
  const fetch200 = () => {
    const data = users.burntsugar;
    const status = props.STATUS_CODE.OK;
    return new FetchResult(status.toString(), JSON.parse(data));
  };

  // 401 Unauthorized
  const fetch401 = () => {
    const status = props.STATUS_CODE.UNAUTHORIZED;
    const data = UNAUTHORIZED_RESPONSE;
    return new FetchResult(status.toString(), JSON.parse(data));
  };

  // FETCH_ERROR FetchError
  const fetchForceFetchError = () => {
    const status = props.STATUS_CODE.FETCH_ERROR;
    const data = {error: props.STATUS_MSG.FETCH_ERROR};
    return new FetchResult(status, data);
  };

  const extractLoginFromQuery = (str:string) => {
    const str1 = str.replace(/[^\x20-\x7E]+/g, '');
    const str2 = str1.replace(/\\/g, '');
    const splitStr1 = str2.split('(');
    const splitStr2 = splitStr1[1].split('"');
    const extracted = splitStr2[1];
    return extracted;
  };

  return {
    fetchNow: fetchNow,
  };
})();

export {mockFetchClient};


// /*
//  * @Author: rach@rach.colley
//  * @Date: 2020-01-28 15:23:22
//  * @Last Modified by: rach@rach.colley
//  * @Last Modified time: 2020-01-30 01:42:18
//  */
// import {FetchResult} from '../fetch/fetch-result.js';
// import {props} from '../common/props.js';

// const mockFetchClient = (() => {

//   const UNAUTHORIZED_RESPONSE = '{ "message": "Bad credentials", "documentation_url": "https://developer.github.com/v4" }';

//   const makeUserDoesNotExist = (user) => {
//     const response = `{ "data": { "user": null }, "errors": [ { "type": "NOT_FOUND", "path": [ "user" ], "locations": [ { "line": 1, "column": 17 } ], "message": "Could not resolve to a User with the login of \'${user}\'." } ] }`;
//   }

//   const users =
//   {
//     burntsugar: '{ "data": { "user": { "bio": "Software development. MEL, AU", "avatarUrl": "https://avatars2.githubusercontent.com/u/6642149?s=200&v=4", "url": "https://github.com/burntsugar", "login": "burntsugar", "name": "Rach" } } }',
//     slipperyseal: '{ "data": { "user": { "bio": "robotics and embedded", "avatarUrl": "https://avatars0.githubusercontent.com/u/7922049?s=200&v=4", "url": "https://github.com/slipperyseal", "login": "slipperyseal", "name": "Slippery Seal" } } }',
//   };

//   const findUser = (login) => {
//     return users[login] || null;
//   };

//   const fetchNow = async (baseUrl, stringifiedPayload, accessToken) => {
//     switch (baseUrl) {
//     case '/fetch200':
//       return fetch200();
//     case '/fetch401':
//       return fetch401();
//     case '/fetchForceFetchError':
//       return fetchForceFetchError();    
//     default: return fetchUser(stringifiedPayload);
//     }
//   };

//   const fetchUser = (stringifiedPayload) => {
//     const login = extractLoginFromQuery(stringifiedPayload);
//     let data;
//     let status;
//     const user = findUser(login);
//     if (login == '') {
//       data = makeUserDoesNotExist(login);
//       status = props.STATUS_CODE.OK;
//     } else if (user) {
//       data = user;
//       status = props.STATUS_CODE.OK;
//     } else {
//       data = makeUserDoesNotExist(login);
//       status = props.STATUS_CODE.OK;
//     }
//     return new FetchResult(status, JSON.parse(data));
//   };

//   // 200 OK
//   const fetch200 = () => {
//     const data = users.burntsugar;
//     const status = props.STATUS_CODE.OK;
//     return new FetchResult(status, JSON.parse(data));
//   };

//   // 401 Unauthorized
//   const fetch401 = () => {
//     const status = props.STATUS_CODE.UNAUTHORIZED;
//     const data = UNAUTHORIZED_RESPONSE;
//     return new FetchResult(status, JSON.parse(data));
//   };

//   // FETCH_ERROR FetchError
//   const fetchForceFetchError = () => {
//     const status = props.STATUS_CODE.FETCH_ERROR;
//     const data = props.STATUS_MSG.FETCH_ERROR;
//     return new FetchResult(status, data);
//   };

//   const extractLoginFromQuery = (str) => {
//     const str1 = str.replace(/[^\x20-\x7E]+/g, '');
//     const str2 = str1.replace(/\\/g, '');
//     const splitStr1 = str2.split('(');
//     const splitStr2 = splitStr1[1].split('"');
//     const extracted = splitStr2[1];
//     return extracted;
//   };

//   return {
//     fetchNow: fetchNow,
//   };
// })();

// export {mockFetchClient};
