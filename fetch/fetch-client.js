/*
 * @Author: rach@rach.colley
 * @Date: 2020-01-30 00:52:58
 * @Last Modified by:   rach@rach.colley
 * @Last Modified time: 2020-01-30 00:52:58
 */


import fetch from 'node-fetch';

const fetchClient = (() => {
  /**
     * Error types which propagate through Fetch API:
     * - FetchException - network, server errors
     * - TypeError - url errors
     * Error status from service
     * - 400 Bad Request - Problems parsing JSON, payload must be JSON/stringified. -browser
     * - 401 Unauthorised - Problem with access token. -service
     * - 404 Not found - Problem with path segment. -browser
     * @param {string} baseUrl
     * @param {*} stringifiedPayload
     * @param {string} accessToken
     */
  const fetchNow = async (baseUrl, stringifiedPayload, accessToken) => {
    let fetchResult;
    await client(baseUrl, stringifiedPayload, accessToken).then((data) => {
      fetchResult = data;
    }).catch((error) => {
      fetchResult = makeFetchResult(error.name, `${error.name}:  ${error.message}`);
    });
    return fetchResult;
  };

  const client = async (baseUrl, payload, accessToken) => {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken,
      },
      body: payload,
    });
    const status = response.status;
    const data = await response.json();
    return makeFetchResult(status, data);
  };

  const makeFetchResult = (status, data) => {
    return {status: status, body: data};
  };

  const testStart = async (baseUrl, payload, accessToken) => {
    const result = await fetchNow(baseUrl, payload, accessToken);
    console.log(result);
  };

  return {
    fetchNow: fetchNow,
    testStart: testStart,
  };
})();

export {fetchClient};
