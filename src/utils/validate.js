/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validMobile(str) {
  let patt = /^1[34578]\d{9}$/;
  return patt.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 6-20位数字
 */
export function validPassword(str) {
  return /^(\w){6,20}$/.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validVcode(str) {
  return /\d{6}/.test(str);
}
