/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:52:51
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-05 14:39:54
 */

import { fetchClient } from './fetch-client';
import { fetchClientInterface } from './fetch-client-interface'
import { FetchResultInterface } from './fetch-result-interface';
import { FetchOptions } from './fetch-options';
import { FetchOptionsInterface } from './fetch-options';

const fetchManager = (() => {
  let internalCLient: fetchClientInterface = fetchClient;

  const setFetchClient = (client: fetchClientInterface): void => {
    internalCLient = client;
  };

  const fetchData = async (apiBaseUrl: string, jsonPayload: string, apiAccessToken: string): Promise<FetchResultInterface> => {
    const fetchOptions: FetchOptionsInterface = new FetchOptions();
    fetchOptions.setApiAccessToken(apiAccessToken);
    fetchOptions.setJsonPayload(jsonPayload);
    const data: FetchResultInterface = await internalCLient.fetchNow(apiBaseUrl, fetchOptions);
    return data;
  };

  return {
    setFetchClient: setFetchClient,
    fetchData: fetchData,
  };
})();

export { fetchManager };
