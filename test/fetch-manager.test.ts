/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:52:36
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 17:55:26
 */

import { fetchManager } from '../src/fetch/fetch-manager';
import { mockFetchClient } from '../mocks/mock-fetch-client';
import { props } from '../src/common/props';
import { FetchResultInterface } from '../src/fetch/fetch-result-interface';

describe('genericFetchController#fetchNow', () => {
  const badAccessToken = '123xyz';

  beforeEach(() => {
    fetchManager.setFetchClient(mockFetchClient);
  });

  describe('when the credentials are', () => {
    it('valid, it returns 200', async () => {
      const login: string = 'burntsugar';
      const body: string = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

      const data: FetchResultInterface = await fetchManager.fetchData('/fetch200', body, badAccessToken);
      expect(data.getStatus()).toEqual(props.STATUS_CODE.OK.toString());
    });

    it('not valid, it returns 401', async () => {
      const login = 'burntsugar';
      const body = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

      const data: FetchResultInterface = await fetchManager.fetchData('/fetch401', body, badAccessToken);
      expect(data.getStatus()).toEqual(props.STATUS_CODE.UNAUTHORIZED.toString());
    });
  });

  describe('when a FetchError is forced it', () => {
    it('returns a FetchError', async () => {
      const login = 'burntsugar';
      const body = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

      const data: FetchResultInterface = await fetchManager.fetchData('/fetchForceFetchError', body, badAccessToken);
      expect(data.getStatus()).toEqual(props.STATUS_CODE.FETCH_ERROR.toString());
    });
  });
});
