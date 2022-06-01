// Local Storage object
let objName = "";

/**
 * @name setObj
 * @function
 * @description Must call set Object/Key in localStorage before using any other functions
 * @param {string} string object/key name in localStorage
 */
function setObj(string) {
  objName = string;
}
/**
 * @name storeToLocal
 * @function
 * @description Store task to local storage and whether it is done or not
 * @param {string} key keyword
 * @param {boolean} value value of the key
 */
function storeToLocal(key, value) {
  const obj = retrieveDataFromStorage(objName);
  obj[key] = value;
  saveToStorage(objName, obj);
}

/**
 * @name deleteTaskFromLocal
 * @function
 * @description remove a key from local storage
 * @param {string} key task name
 */
function deleteFromLocal(key) {
  const obj = retrieveDataFromStorage(objName);
  delete obj[key];
  saveToStorage(objName, obj);
}

/**
 * @name saveToStorage
 * @function
 * @description save an object to local storage
 * @param {string} key local storage keyword to store
 * @param {string} obj
 */
function saveToStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

/**
 * @name retrieveDataFromStorage
 * @function
 * @description retrieve an object from local storage
 * @param {string} key local storage keyword to retrieve the object
 * @returns {object} return the object if found, or empty object
 */
function retrieveDataFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {};
}

/**
 * @name removeDataFromStorage
 * @function
 * @description remove the object from local storage
 */
function removeDataFromStorage() {
  localStorage.removeItem(objName);
}

export {
  deleteFromLocal,
  storeToLocal,
  removeDataFromStorage,
  retrieveDataFromStorage,
  setObj,
};
