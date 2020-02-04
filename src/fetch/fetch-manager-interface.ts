/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-02-04 18:55:11 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 19:02:05
 */

import { FetchResultInterface } from './fetch-result-interface';
import { fetchClientInterface } from './fetch-client-interface';

export interface FetchManagerInterface {
    fetchData(baseUrl: string, payload: string, accessToken: string): Promise<FetchResultInterface>;
    setFetchClient(client: fetchClientInterface):void;
}