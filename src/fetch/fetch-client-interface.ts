/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-02-04 15:17:18 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-05 14:35:37
 */


import { FetchResultInterface } from './fetch-result-interface';
import { FetchOptionsInterface } from './fetch-options';

export interface fetchClientInterface {
    fetchNow(apiBaseUrl: string, fetchOptions: FetchOptionsInterface): Promise<FetchResultInterface>
}