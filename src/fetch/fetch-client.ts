/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:52:58
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-05 21:20:06
 */

import fetch from 'node-fetch';
import { FetchResult } from './fetch-result';
import { FetchResultInterface } from './fetch-result-interface';
import { FetchOptionsInterface } from './fetch-options';

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
     * @param {FetchOptionsInterface} fetchOptions
     * @return {Promise<FetchResultInterface>}
     */
  const fetchNow = async (apiBaseUrl: string, fetchOptions: FetchOptionsInterface): Promise<FetchResultInterface> => {
    const requestParams = buildRequestInfo(fetchOptions);
    return await client(apiBaseUrl, requestParams);
  };

  const client = async (apiBaseUrl: string, requestInf: object): Promise<FetchResultInterface> => {
    let response: FetchResultInterface = await fetch(apiBaseUrl, requestInf).then((data) => {
      return makeFetchResult(data.status.toString(), data.json());
    }).catch((error) => {
      return makeFetchResult(error.name, { error: `${error.name}, ${error.message}` });
    });
    return response;
  };
  const buildRequestInfo = (fetchOptions: FetchOptionsInterface): object => {

    const CONTENT_TYPE_APPL_JSON = 'application/json';
    const ACCEPT_TYPE_APPL_JSON = 'application/json';

    interface MyReqHeadersType {
      [key: string]: string,
    }
    let reqHeaders: MyReqHeadersType = {
      'Content-Type': CONTENT_TYPE_APPL_JSON,
      'Accept': ACCEPT_TYPE_APPL_JSON,
    }

    interface MyInitParamsType {
      method: string,
      headers: MyReqHeadersType,
      body?: string
    }
    const initParams: MyInitParamsType = {
      method: 'POST',
      headers: reqHeaders,
    };

    if (fetchOptions.getApiAccessToken()) {
      reqHeaders['Authorization'] = `Bearer ${fetchOptions.getApiAccessToken()}`;
    }

    if (fetchOptions.getJsonPayload()) {
      initParams['body'] = fetchOptions.getJsonPayload();
    }

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

