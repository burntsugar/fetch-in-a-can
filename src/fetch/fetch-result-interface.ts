/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-02-04 16:58:23 
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 17:09:27
 */

export interface FetchResultInterface {
    getStatus(): string;
    setStatus(status: string): void;
    getBody(): object;
    setBody(body: object): void;
}