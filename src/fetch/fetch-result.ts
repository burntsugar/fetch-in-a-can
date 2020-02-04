/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-29 13:55:23
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 17:55:16
 */

import { FetchResultInterface } from './fetch-result-interface';
/**
   * @class FetchResult
   * @description Defines an object which contains the result
   * of the fetch operation.
   */
class FetchResult implements FetchResultInterface {

  _status: string;
  _body: object

  /**
     * @constructor
     * @param {string} status
     * @param {object} body
     */
  constructor(status: string, body: object) {
    this._status = status;
    this._body = body;
  }

  /**
   * @return {string} String representation of the object.
   */
  toString(): string {
    return `_status: ${this._status}, _body ${this._body}`;
  }

  /**
     * @return {string} status
     */
  getStatus(): string {
    return this._status;
  }

  /**
   * @param {string} status
   */
  setStatus(status: string): void {
    this._status = status;
  }
  /**
     * @return {object} body
     */
  getBody(): object {
    return this._body;
  }

  /**
   * @param {object} body
   */
  setBody(body: object): void {
    this._body = body;
  }
}

export { FetchResult };
