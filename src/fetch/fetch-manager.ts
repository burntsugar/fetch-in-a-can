/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-30 00:52:51
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-06 14:40:01
 */

import { fetchClient } from './fetch-client';
import { fetchClientInterface } from './fetch-client-interface'
import { FetchResultInterface } from './fetch-result-interface';
import { FetchResult } from './fetch-result';
import { props } from '../common/props';
import lodash from 'lodash';

const fetchManager = (() => {

  let internalCLient: fetchClientInterface = fetchClient;

  const setFetchClient = (client: fetchClientInterface): void => {
    internalCLient = client;
  };

  const fetchGetRestApi = async (endpoint: string): Promise<FetchResultInterface> => {
    if (!validateParamCollection([endpoint])) {
      return new FetchResult(props.STATUS_CODE.RANGE_ERROR.toString(),
        { error: props.STATUS_NAME.RANGE_ERROR, message: props.STATUS_MSG.RANGE_ERROR });
    }
    const data: FetchResultInterface = await internalCLient.fetchGetRestApi(endpoint);
    return data;
  }

  const fetchPostGraphQLApi = async (apiBaseUrl: string, jsonPayload: string, apiAccessToken: string): Promise<FetchResultInterface> => {

    if (!validateParamCollection([apiBaseUrl, jsonPayload, apiAccessToken])) {
      return new FetchResult(props.STATUS_CODE.RANGE_ERROR.toString(),
        { error: props.STATUS_NAME.RANGE_ERROR, message: props.STATUS_MSG.RANGE_ERROR });
    }
    const data: FetchResultInterface = await internalCLient.fetchPostGraphQLApi(apiBaseUrl, jsonPayload, apiAccessToken);
    return data;
  }

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
    fetchGetRestApi: fetchGetRestApi,
    fetchPostGraphQLApi: fetchPostGraphQLApi,
    setFetchClient: setFetchClient,
  };
})();

export { fetchManager };
