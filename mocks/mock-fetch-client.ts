/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-28 15:23:22
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-05 14:34:42
 */

import { FetchResult } from '../src/fetch/fetch-result';
import { props } from '../src/common/props';
import { FetchResultInterface } from '../src/fetch/fetch-result-interface';
import { FetchOptionsInterface } from '../src/fetch/fetch-options';

const mockFetchClient = (() => {

  enum users {
    burntsugar = '{ "data": { "user": { "bio": "Software development. MEL, AU", "avatarUrl": "https://avatars2.githubusercontent.com/u/6642149?s=200&v=4", "url": "https://github.com/burntsugar", "login": "burntsugar", "name": "Rach" } } }',
    slipperyseal = '{ "data": { "user": { "bio": "robotics and embedded", "avatarUrl": "https://avatars0.githubusercontent.com/u/7922049?s=200&v=4", "url": "https://github.com/slipperyseal", "login": "slipperyseal", "name": "Slippery Seal" } } }',
  };

  const makeUserDoesNotExist = (user: string): string => {
    return `{ "data": { "user": null }, "errors": [ { "message": "Could not resolve to a User with the login of \'${user}\'." } ] }`;
  }

  const makeFetchError = (): string => {
    return `{"error": "${props.STATUS_MSG.FETCH_ERROR}"}`
  }

  const makeUnauthorizedResponse = (): string => {
    return '{ "message": "Bad credentials" }';
  }

  const findUser = (login: string): string => {
    switch (login) {
      case users.burntsugar:
        return users.burntsugar;
      case users.slipperyseal:
        return users.slipperyseal;
      default: return '';
    }
  };

  const fetchNow = async (baseUrl: string, fetchOptions: FetchOptionsInterface): Promise<FetchResultInterface> => {
    switch (baseUrl) {
      case '/fetch200':
        return fetch200();
      case '/fetch401':
        return fetch401();
      case '/fetchForceFetchError':
        return fetchForceFetchError();
      default: return fetchUser(fetchOptions.getJsonPayload());
    }
  };

  const fetchUser = (stringifiedPayload: string): FetchResultInterface => {
    const login: string = extractLoginFromQuery(stringifiedPayload);
    let data: string;
    let status: string;
    const user: string = findUser(login);
    if (login == '') {
      status = props.STATUS_CODE.OK.toString();
      data = makeUserDoesNotExist(login);
    } else if (user) {
      status = props.STATUS_CODE.OK.toString();
      data = user;
    } else {
      status = props.STATUS_CODE.OK.toString();
      data = makeUserDoesNotExist(login);
    }
    return makeFetchResult(status.toString(), JSON.parse(data));
  };

  // 200 OK
  const fetch200 = (): FetchResultInterface => {
    const status: string = props.STATUS_CODE.OK.toString();
    const data: string = users.burntsugar;
    return makeFetchResult(status.toString(), JSON.parse(data));
  };

  // 401 Unauthorized
  const fetch401 = (): FetchResultInterface => {
    const status: string = props.STATUS_CODE.UNAUTHORIZED.toString();
    const data: string = makeUnauthorizedResponse();
    return makeFetchResult(status.toString(), JSON.parse(data));
  };

  // FETCH_ERROR FetchError
  const fetchForceFetchError = (): FetchResultInterface => {
    const status: string = props.STATUS_CODE.FETCH_ERROR.toString();
    const data: string = makeFetchError();
    return makeFetchResult(status.toString(), JSON.parse(data));
  };

  const extractLoginFromQuery = (str: string): string => {
    const str1: string = str.replace(/[^\x20-\x7E]+/g, '');
    const str2: string = str1.replace(/\\/g, '');
    const splitStr1: string[] = str2.split('(');
    const splitStr2: string[] = splitStr1[1].split('"');
    const extracted: string = splitStr2[1];
    return extracted;
  };

  const makeFetchResult = (status: string, body: object): FetchResultInterface => {
    return new FetchResult(status, body);
  };

  return {
    fetchNow: fetchNow,
  };
})();

export { mockFetchClient };
