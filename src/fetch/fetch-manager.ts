/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:52:51
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-05 21:37:55
 */

import { fetchClient } from './fetch-client';
import { fetchClientInterface } from './fetch-client-interface'
import { FetchResultInterface } from './fetch-result-interface';
import { FetchOptions } from './fetch-options';
import { FetchOptionsInterface } from './fetch-options';
import { FetchResult } from './fetch-result';
import { props } from '../common/props';
import lodash from 'lodash';

const fetchManager = (() => {

  let internalCLient: fetchClientInterface = fetchClient;

  const setFetchClient = (client: fetchClientInterface): void => {
    internalCLient = client;
  };

  const fetchData = async (apiBaseUrl: string, jsonPayload: string, apiAccessToken: string): Promise<FetchResultInterface> => {

    if (!validateParamCollection([apiBaseUrl, jsonPayload, apiAccessToken])) {
      return new FetchResult(props.STATUS_CODE.RANGE_ERROR.toString(),
        { error: props.STATUS_NAME.RANGE_ERROR, message: props.STATUS_MSG.RANGE_ERROR });
    }

    const fetchOptions: FetchOptionsInterface = new FetchOptions();
    fetchOptions.setApiAccessToken(apiAccessToken);
    fetchOptions.setJsonPayload(jsonPayload);
    const data: FetchResultInterface = await internalCLient.fetchNow(apiBaseUrl, fetchOptions);
    return data;
  };

  const validateParamCollection = (params: string[]): boolean => {
    let i = 0;
    for (i; i < params.length; i++) {
      if ((lodash.isEmpty(params[i])) || (!lodash.isString(params[i]))) {
        return false;
      }
    }
    return true;
  }

  return {
    setFetchClient: setFetchClient,
    fetchData: fetchData,
  };
})();

export { fetchManager };
