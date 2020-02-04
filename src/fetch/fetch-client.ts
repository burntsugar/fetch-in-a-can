/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:52:58
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 18:56:28
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
     * @param {string  } baseUrl
     * @param {string} stringifiedPayload
     * @param {string} accessToken
     * @return {Promise<FetchResultInterface>}
     */
  const fetchNow = async (baseUrl: string, stringifiedPayload: string, accessToken: string): Promise<FetchResultInterface> => {
    return await client(baseUrl, stringifiedPayload, accessToken);
  };

  const client = async (baseUrl: string, payload: string, accessToken: string): Promise<FetchResultInterface> => {
    let response: FetchResultInterface = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
      },
      body: payload,
    }).then((data) => {
      return makeFetchResult(data.status.toString(), data.body);
    }).catch((error) => {
      return makeFetchResult(error.name, { error: `${error.name}, ${error.message}` });
    });
    return response;
  };

  const makeFetchResult = (status: string, body: object): FetchResultInterface => {
    return new FetchResult(status, body);
  };

  return {
    fetchNow: fetchNow,
  };
})();

export { fetchClient };