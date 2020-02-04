/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-02-04 15:17:18 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 18:55:29
 */


import { FetchResultInterface } from './fetch-result-interface';


export interface fetchClientInterface {
    fetchNow(baseUrl: string, stringifiedPayload: string, accessToken: string): Promise<FetchResultInterface>
}