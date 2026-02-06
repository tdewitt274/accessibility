const DB_NAME = 'SWACS';
const DB_VERSION = 1;
const DB_STORES = ['dictionary', 'settings']; // Define multiple stores

// Open the database
function openDB(dbname = DB_NAME, dbversion = DB_VERSION) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbname, dbversion);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;

            // Create all defined stores
            db.createObjectStore(DB_STORES[0], { keyPath: 'id', autoIncrement: false });
            db.createObjectStore(DB_STORES[1], { keyPath: 'id', autoIncrement: false });
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}
// Helper function to check if an item exists in the store
function checkIfItemExists(db, storename, id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storename], 'readonly');
        const store = transaction.objectStore(storename);
        const getRequest = store.get(id);

        getRequest.onsuccess = function(event) {
            resolve(event.target.result); // Resolve with the existing item, if found
        };

        getRequest.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

async function saveToDB(item, storename, dbname = DB_NAME, dbversion = DB_VERSION) {
    const db = await openDB(dbname, dbversion);

    try {
        // First, check if the item already exists
        const existingItem = await checkIfItemExists(db, storename, item.id);

        let text = "The entry already exists.  Are you sure you want to overwrite this item?\r\n\r\nThe item will be permanently modified.\r\n";

        let warn = true;
        if (existingItem) {
            // Item already exists, do not insert
            warn = confirm(text);
        } 
        if (warn) {
            // Item does not exist, insert it
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([storename], 'readwrite');
                const store = transaction.objectStore(storename);
                const putRequest = store.put(item);

                putRequest.onsuccess = function() {
                    resolve('Item successfully inserted.');
                };

                putRequest.onerror = function(event) {
                    reject(event.target.error);
                };
            });
        }
    } catch (error) {
        throw new Error('Error checking item existence: ' + error);
    }
}

// Get individual from store
async function getItemFromDB(id, storename, dbname = DB_NAME, dbversion = DB_VERSION) {
    const db = await openDB(dbname, dbversion);

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storename], 'readonly');
        const store = transaction.objectStore(storename);
        const getRequest = store.get(id);

        getRequest.onsuccess = function(event) {
            return getRequest.result;
        };

        getRequest.onerror = function(event) {
            reject(event.target.error);
        };
    });
}
// Get all items from the specified store
async function getAllFromDB(storename, dbname = DB_NAME, dbversion = DB_VERSION) {
    const db = await openDB(dbname, dbversion);

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storename], 'readonly');
        const store = transaction.objectStore(storename);
        const request = store.getAll();

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

// Clear all items from the specified store
async function clearFromDB(storename, dbname = DB_NAME, dbversion = DB_VERSION) {
    const db = await openDB(dbname, dbversion);

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storename], 'readwrite');
        const store = transaction.objectStore(storename);
        const request = store.clear();

        request.onsuccess = function() {
            resolve();
        };

        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

// Delete an item by ID from the specified store
async function deleteFromDB(id, storename, dbname = DB_NAME, dbversion = DB_VERSION) {
    let text = "Are you sure you want to delete this item?\r\n\r\nThe item will be permanently deleted.\r\n";
    if (confirm(text) != true) {
        return;
    }
    const db = await openDB(dbname, dbversion);

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storename], 'readwrite');
        const store = transaction.objectStore(storename);
        const request = store.delete(id);

        request.onsuccess = function() {
            resolve();
        };

        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}