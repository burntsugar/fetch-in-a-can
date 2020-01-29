/*
 * @Author: rach@rach.colley
 * @Date: 2020-01-29 13:55:23
 * @Last Modified by: rach@rach.colley
 * @Last Modified time: 2020-01-29 19:37:06
 */


/**
   * @class FetchResult
   * @description Defines an object which contains the result
   * of the fetch operation.
   */
class FetchResult {
  /**
     * @constructor
     * @param {string} status
     * @param {string} body
     */
  constructor(status, body) {
    this._status = status;
    this._body = body;
  }

  /**
   * @return {string} String representation of the object.
   */
  toString() {
    return `_status: ${this._status}, _body ${this._body}`;
  }

  /**
     * @return {number} status
     */
  get status() {
    return this._status;
  }

  /**
   * @param {number} status
   */
  set status(status) {
    this._status = status;
  }
  /**
     * @return {object} body
     */
  get body() {
    return this._body;
  }

  /**
   * @param {object} body
   */
  set body(body) {
    this._body = body;
  }
}

export {FetchResult};
