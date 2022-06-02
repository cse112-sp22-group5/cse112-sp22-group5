// Notes: data store in local storage as an object of objects

/**
 * @name storeToLocal
 * @function 
 * @description Store task to local storage and whether it is done or not
 * @param {string} storageKey local storage key
 * @param {string} key keyword
 * @param {boolean} value value of the key
 */
function storeToLocal(storageKey, key, value)
{
    const obj = retrieveDataFromStorage(storageKey);
    obj[key] = value;
    saveToStorage(storageKey, obj);
}

/**
 * @name deleteTaskFromLocal
 * @function
 * @description remove a key from local storage
 * @param {string} storageKey local storage key
 * @param {string} key task name
 */
function deleteFromLocal(storageKey,key) {

    const obj = retrieveDataFromStorage(storageKey);
    delete obj[key];
    saveToStorage(storageKey, obj);
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
 * @param {string} storageKey local storage key
 * @param {string} key local storage keyword to retrieve the object
 * @returns {object} return the object if found, or empty object
 */
function retrieveDataFromStorage(storageKey) {
    return localStorage.getItem(storageKey) ? JSON.parse(localStorage.getItem(storageKey)) : {};
}

/**
 * @name removeDataFromStorage
 * @function
 * @description remove the object from local storage
 * @param {string} storageKey local storage key
 */
function removeDataFromStorage(storageKey) {
    localStorage.removeItem(storageKey);
}

export {deleteFromLocal, storeToLocal, removeDataFromStorage, retrieveDataFromStorage}