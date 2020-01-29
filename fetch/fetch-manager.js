/*
 * @Author: rach@rach.colley
 * @Date: 2020-01-30 00:52:51
 * @Last Modified by:   rach@rach.colley
 * @Last Modified time: 2020-01-30 00:52:51
 */

import {fetchClient} from './fetch-client.js';

const fetchManager = (() => {
  let internalCLient = fetchClient;

  const setFetchClient = (client) => {
    internalCLient = client;
  };

  const fetchData = async (baseUrl, payload, accessToken) => {
    const data = await internalCLient.fetchNow(baseUrl, payload, accessToken);
    return data;
  };

  return {
    setFetchClient: setFetchClient,
    fetchData: fetchData,
  };
})();

export {fetchManager};
