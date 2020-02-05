/*
 * @Author: rrr@burntsugar.rocks 
 * @Date: 2020-02-05 14:40:28 
 * @Last Modified by:   rrr@burntsugar.rocks 
 * @Last Modified time: 2020-02-05 14:40:28 
 */

export interface FetchOptionsInterface {
    setApiAccessToken(apiAccessToken: string): void,
    getApiAccessToken(): string,
    setJsonPayload(jsonPayload: string): void,
    getJsonPayload(): string,
}

export class FetchOptions implements FetchOptionsInterface {
    _apiAccessToken: string = '';
    _jsonPayload: string = '';

    constructor() { };

    setApiAccessToken(apiAccessToken: string): void {
        this._apiAccessToken = apiAccessToken;
    }

    getApiAccessToken(): string {
        return this._apiAccessToken;
    }

    setJsonPayload(jsonPayload: string): void {
        this._jsonPayload = jsonPayload;
    }

    getJsonPayload(): string {
        return this._jsonPayload;
    }

}