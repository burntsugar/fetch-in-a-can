/*
 * @Author: rach@rach.colley
 * @Date: 2020-01-30 00:52:36
 * @Last Modified by: rach@rach.colley
 * @Last Modified time: 2020-01-30 01:53:08
 */

import {fetchManager} from '../fetch/fetch-manager.js';
import {mockFetchClient} from '../mocks/mock-fetch-client.js';
import {props} from '../common/props.js';

describe('genericFetchController#fetchNow', () => {
  const badAccessToken = '123xyz';

  beforeEach(() => {
    fetchManager.setFetchClient(mockFetchClient);
  });

  describe('when the credentials are', () => {
    it('valid, it returns 200', async () => {
      const login = 'burntsugar';
      const body = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

      const data = await fetchManager.fetchData('/fetch200', body, badAccessToken);
      expect(data.status).toEqual(props.STATUS_CODE.OK);
    });

    it('not valid, it returns 401', async () => {
      const login = 'burntsugar';
      const body = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

      const data = await fetchManager.fetchData('/fetch401', body, badAccessToken);
      expect(data.status).toEqual(props.STATUS_CODE.UNAUTHORIZED);
    });
  });

  describe('when a FetchError is forced it', () => {
    it('returns a FetchError', async () => {
      const login = 'burntsugar';
      const body = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

      const data = await fetchManager.fetchData('/fetchForceFetchError', body, badAccessToken);
      expect(data.status).toEqual(props.STATUS_CODE.FETCH_ERROR);
    });
  });
});
