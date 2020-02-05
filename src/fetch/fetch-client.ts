/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:52:58
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-05 12:26:18
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
     * @param {string  } apiBaseUrl
     * @param {string} jsonPayload
     * @param {string} apiAccessToken
     * @return {Promise<FetchResultInterface>}
     */
  const fetchNow = async (apiBaseUrl: string, jsonPayload: string, apiAccessToken: string): Promise<FetchResultInterface> => {
    return await client(apiBaseUrl, jsonPayload, apiAccessToken);
  };

  const client = async (apiBaseUrl: string, jsonPayload: string, apiAccessToken: string): Promise<FetchResultInterface> => {

    const requestInfo: object = buildRequestInfo(jsonPayload, apiAccessToken);

    let response: FetchResultInterface = await fetch(apiBaseUrl, requestInfo).then((data) => {
      return makeFetchResult(data.status.toString(), data.json());
    }).catch((error) => {
      return makeFetchResult(error.name, { error: `${error.name}, ${error.message}` });
    });
    return response;
  };

  const buildRequestInfo = (jsonPayload: string, apiAccessToken: string): object => {
    const CONTENT_TYPE_APPL_JSON = 'application/json';
    const ACCEPT_TYPE_APPL_JSON = 'application/json';

    const reqHeaders = {
      'Content-Type': CONTENT_TYPE_APPL_JSON,
      'Accept': ACCEPT_TYPE_APPL_JSON,
      'Authorization': `Bearer ${apiAccessToken}`,
    }

    const initParams = {
      method: 'POST',
      headers: reqHeaders,
      body: jsonPayload,
    };

    return initParams;
  };

  const makeFetchResult = (status: string, body: object): FetchResultInterface => {
    return new FetchResult(status, body);
  };

  return {
    fetchNow: fetchNow,
  };
})();

export { fetchClient };

