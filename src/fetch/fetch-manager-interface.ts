/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-02-04 18:55:11 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-05 11:03:26
 */

import { FetchResultInterface } from './fetch-result-interface';
import { fetchClientInterface } from './fetch-client-interface';

export interface FetchManagerInterface {
    fetchData(apiBaseUrl: string, jsonPayload: string, apiAccessToken: string): Promise<FetchResultInterface>;
    setFetchClient(client: fetchClientInterface):void;
}