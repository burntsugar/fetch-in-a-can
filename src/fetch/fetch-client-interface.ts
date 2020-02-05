/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-02-04 15:17:18 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-05 10:55:09
 */


import { FetchResultInterface } from './fetch-result-interface';


export interface fetchClientInterface {
    fetchNow(apiBaseUrl: string, jsonPayload: string, apiAccessToken: string): Promise<FetchResultInterface>
}