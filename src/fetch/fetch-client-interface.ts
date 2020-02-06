/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-02-04 15:17:18 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-06 12:59:34
 */


import { FetchResultInterface } from './fetch-result-interface';

export interface fetchClientInterface {
    fetchPostGraphQLApi(apiBaseUrl: string, payload: string, apiAccessToken: string): Promise<FetchResultInterface>;
    fetchGetRestApi(endpoint: string): Promise<FetchResultInterface>;
}