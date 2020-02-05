/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:52:51
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-05 11:04:42
 */

import { fetchClient } from './fetch-client';
import { fetchClientInterface } from './fetch-client-interface'
import { FetchResultInterface } from './fetch-result-interface';


const fetchManager = (() => {
  let internalCLient: fetchClientInterface = fetchClient;

  const setFetchClient = (client: fetchClientInterface):void => {
    internalCLient = client;
  };

  const fetchData = async (apiBaseUrl: string, jsonPayload: string, apiAccessToken: string): Promise<FetchResultInterface> => {
    const data: FetchResultInterface = await internalCLient.fetchNow(apiBaseUrl, jsonPayload, apiAccessToken);
    return data;
  };

  return {
    setFetchClient: setFetchClient,
    fetchData: fetchData,
  };
})();

export { fetchManager };
