/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:52:51
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 17:04:22
 */

import { fetchClient } from './fetch-client';
import { fetchClientInterface } from './fetch-client-interface'
import { FetchResultInterface } from './fetch-result-interface';


const fetchManager = (() => {
  let internalCLient: fetchClientInterface = fetchClient;

  const setFetchClient = (client: fetchClientInterface) => {
    internalCLient = client;
  };

  const fetchData = async (baseUrl: string, payload: string, accessToken: string): Promise<FetchResultInterface> => {
    const data: FetchResultInterface = await internalCLient.fetchNow(baseUrl, payload, accessToken);
    return data;
  };

  return {
    setFetchClient: setFetchClient,
    fetchData: fetchData,
  };
})();

export { fetchManager };
