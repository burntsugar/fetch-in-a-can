/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:52:58
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-06 13:00:11
 */

import fetch from 'node-fetch';
import { FetchResult } from './fetch-result';
import { FetchResultInterface } from './fetch-result-interface';

const fetchClient = (() => {
  /**
     * Error types which propagate through Fetch API:
     * - FetchException - network, server errors
     * - TypeError - url errors
     * Error status from service
     * - 400 Bad Request - Problems parsing JSON, payload must be JSON/stringified. -browser
     * - 401 Unauthorised - Problem with access token. -service
     * - 404 Not found - Problem with path segment. -browser
     * @param {string} apiBaseUrl
     * @param {string} payload
     * @param {apiAccessToken} string
     * @return {Promise<FetchResultInterface>}
     */
  const fetchPostGraphQLApi = async (apiBaseUrl: string, payload: string, apiAccessToken: string): Promise<FetchResultInterface> => {
    let response: FetchResultInterface = await fetch(apiBaseUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiAccessToken,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: payload,
    }).then((data) => {
      return makeFetchResult(data.status.toString(), data.json());
    }).catch((error) => {
      return makeFetchResult(error.name, { error: `${error.name}, ${error.message}` });
    });
    return response;
  };

  const fetchGetRestApi = async (endpoint: string): Promise<FetchResultInterface> => {
    let response: FetchResultInterface = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then((data) => {
      return makeFetchResult(data.status.toString(), data.json());
    }).catch((error) => {
      return makeFetchResult(error.name, { error: `${error.name}, ${error.message}` });
    });
    return response;
  };

  const makeFetchResult = (status: string, body: object): FetchResultInterface => {
    return new FetchResult(status, body);
  };

  return {
    fetchPostGraphQLApi: fetchPostGraphQLApi,
    fetchGetRestApi: fetchGetRestApi,
  };
})();

export { fetchClient };
