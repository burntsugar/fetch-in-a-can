/*
 * @Author: rrr@burntsugar.rocks
 * @Date: 2020-01-29 13:55:23
 * @Last Modified by: rrr@burntsugar.rocks
 * @Last Modified time: 2020-02-04 16:08:57
 */


/**
   * @class FetchResult
   * @description Defines an object which contains the result
   * of the fetch operation.
   */
class FetchResult {

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
  get status(): string {
    return this._status;
  }

  /**
   * @param {string} status
   */
  set status(status: string) {
    this._status = status;
  }
  /**
     * @return {object} body
     */
  get body(): object {
    return this._body;
  }

  /**
   * @param {object} body
   */
  set body(body: object) {
    this._body = body;
  }
}

export { FetchResult };
