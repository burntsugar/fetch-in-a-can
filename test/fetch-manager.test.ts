/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:52:36
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-05 14:40:56
 */

import { fetchManager } from '../src/fetch/fetch-manager';
import { FetchManagerInterface } from '../src/fetch/fetch-manager-interface';
import { mockFetchClient } from '../mocks/mock-fetch-client';
import { fetchClient } from '../src/fetch/fetch-client';

import { props } from '../src/common/props';
import { FetchResultInterface } from '../src/fetch/fetch-result-interface';
import { envKeys } from './keys';

let fetchManagerInTest: FetchManagerInterface;

describe('fetchManager#fetchData', () => {

  describe('when the client is mocked', () => {

    const badAccessToken = '123xyz';

    beforeEach(() => {
      fetchManagerInTest = fetchManager;
      fetchManagerInTest.setFetchClient(mockFetchClient);
    });

    describe('when the credentials are', () => {
      it('valid, it returns 200', async () => {
        const login: string = 'burntsugar';
        const body: string = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

        const data: FetchResultInterface = await fetchManagerInTest.fetchData('/fetch200', body, badAccessToken);
        expect(data.getStatus()).toEqual(props.STATUS_CODE.OK.toString());
      });

      it('not valid, it returns 401', async () => {
        const login = 'burntsugar';
        const body = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

        const data: FetchResultInterface = await fetchManagerInTest.fetchData('/fetch401', body, badAccessToken);
        expect(data.getStatus()).toEqual(props.STATUS_CODE.UNAUTHORIZED.toString());
      });
    });

    describe('when a FetchError is forced it', () => {
      it('returns a FetchError', async () => {
        const login = 'burntsugar';
        const body = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

        const data: FetchResultInterface = await fetchManagerInTest.fetchData('/fetchForceFetchError', body, badAccessToken);
        expect(data.getStatus()).toEqual(props.STATUS_CODE.FETCH_ERROR.toString());
      });
    });
  });

  describe('when the client is not mocked', () => {

    const BASE_URL = 'https://api.github.com/graphql';

    beforeEach(() => {
      fetchManagerInTest = fetchManager;
      fetchManagerInTest.setFetchClient(fetchClient);
    });

    describe('when the credentials are', () => {
      it('valid, it returns 200', async () => {
        const login: string = 'burntsugar';
        const body: string = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;
        const sq = JSON.stringify({ query: body });

        const data: FetchResultInterface = await fetchManagerInTest.fetchData(BASE_URL, sq, envKeys.GITHUB_API_KEY);
        expect(data.getStatus()).toEqual(props.STATUS_CODE.OK.toString());
      });

      it('not valid, it returns 401', async () => {
        const login: string = 'burntsugar';
        const body: string = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;
        const sq = JSON.stringify({ query: body });
        const data: FetchResultInterface = await fetchManagerInTest.fetchData(BASE_URL, sq, envKeys.GITHUB_API_KEY_BAD);
        expect(data.getStatus()).toEqual(props.STATUS_CODE.UNAUTHORIZED.toString());
      });
    });
  });

});
