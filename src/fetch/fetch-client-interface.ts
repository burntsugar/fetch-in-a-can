import { FetchResult } from './fetch-result';

export interface fetchClientInterface {
    fetchNow(baseUrl: string, stringifiedPayload: string, accessToken: string): Promise<FetchResult>
}