/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:52:36
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-05 21:32:31
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

    const badFakeAccessToken = '123xyz';
    const goodfakeAccessToken = '123xyz';

    beforeEach(() => {
      fetchManagerInTest = fetchManager;
      fetchManagerInTest.setFetchClient(mockFetchClient);
    });

    describe('when the baseurl argument', () => {

      it('is left empty, it returns RangeError', async () => {
        const login: string = 'burntsugar';
        const jsonPayload: string = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

        const data: FetchResultInterface = await fetchManagerInTest.fetchData('', jsonPayload, goodfakeAccessToken);
        expect(data.getStatus()).toEqual(props.STATUS_CODE.RANGE_ERROR.toString());
      });

    });

    describe('when the jsonPayload argument', () => {

      it('is left empty, it returns RangeError', async () => {
        const login: string = 'burntsugar';
        const jsonPayload: string = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

        const data: FetchResultInterface = await fetchManagerInTest.fetchData('/200', '', goodfakeAccessToken);
        expect(data.getStatus()).toEqual(props.STATUS_CODE.RANGE_ERROR.toString());
      });

    });

    describe('when the apikey argument', () => {

      it('is left empty, it returns RangeError', async () => {
        const login: string = 'burntsugar';
        const jsonPayload: string = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

        const data: FetchResultInterface = await fetchManagerInTest.fetchData('/fetch200', jsonPayload, '');
        expect(data.getStatus()).toEqual(props.STATUS_CODE.RANGE_ERROR.toString());
      });

      // TODO:
      // Can't test this with typescript on.
      // it('is not a string, it returns RangeError', async () => {
      //   const login: string = 'burntsugar';
      //   const jsonPayload: string = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

      //   const data: FetchResultInterface = await fetchManagerInTest.fetchData('/fetch200', jsonPayload, 123);
      //   console.log('DATA >>>' + data);
      //   expect(data.getStatus()).toEqual(props.STATUS_CODE.RANGE_ERROR.toString());
      // });

    });

    describe('when all arguments', () => {

      it('are left empty, it returns RangeError', async () => {
        const login: string = 'burntsugar';
        const jsonPayload: string = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

        const data: FetchResultInterface = await fetchManagerInTest.fetchData('', '', '');
        expect(data.getStatus()).toEqual(props.STATUS_CODE.RANGE_ERROR.toString());
      });

    });

    describe('when the credentials are', () => {
      it('valid, it returns 200', async () => {
        const login: string = 'burntsugar';
        const body: string = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

        const data: FetchResultInterface = await fetchManagerInTest.fetchData('/fetch200', body, goodfakeAccessToken);
        expect(data.getStatus()).toEqual(props.STATUS_CODE.OK.toString());
      });

      it('not valid, it returns 401', async () => {
        const login = 'burntsugar';
        const body = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

        const data: FetchResultInterface = await fetchManagerInTest.fetchData('/fetch401', body, badFakeAccessToken);
        expect(data.getStatus()).toEqual(props.STATUS_CODE.UNAUTHORIZED.toString());
      });
    });

    describe('when a FetchError is forced it', () => {
      it('returns a FetchError', async () => {
        const login = 'burntsugar';
        const body = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;

        const data: FetchResultInterface = await fetchManagerInTest.fetchData('/fetchForceFetchError', body, goodfakeAccessToken);
        expect(data.getStatus()).toEqual(props.STATUS_CODE.FETCH_ERROR.toString());
      });
    });
  });

  describe('when the client is not mocked (live test)', () => {

    const BASE_URL = 'https://api.github.com/graphql';
    const ACTUAL_API_KEY = envKeys.GITHUB_API_KEY;
    const BAD_FAKE_API_KEY = envKeys.GITHUB_API_KEY_BAD;

    beforeEach(() => {
      fetchManagerInTest = fetchManager;
      fetchManagerInTest.setFetchClient(fetchClient);
    });

    describe('when the API KEY is', () => {

      it('valid, it returns 200', async () => {
        const login: string = 'burntsugar';
        const query: string = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;
        const jasonPayload = JSON.stringify({ query: query });

        const data: FetchResultInterface = await fetchManagerInTest.fetchData(BASE_URL, jasonPayload, ACTUAL_API_KEY);
        expect(data.getStatus()).toEqual(props.STATUS_CODE.OK.toString());
      });

      it('not valid, it returns 401', async () => {
        const login: string = 'burntsugar';
        const query: string = `query MyQuery { user(login: "${login}") { bio avatarUrl(size: 200) url login name } }`;
        const jsonPayload = JSON.stringify({ query: query });
        const data: FetchResultInterface = await fetchManagerInTest.fetchData(BASE_URL, jsonPayload, BAD_FAKE_API_KEY);
        expect(data.getStatus()).toEqual(props.STATUS_CODE.UNAUTHORIZED.toString());
      });
    });
  });

});
