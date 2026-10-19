const DB_NAME = 'GAP';
const DB_VERSION = 1;
const DB_STORES = ['dictionary', 'settings']; // Define multiple stores

// Open the database
function openDB(dbname = DB_NAME, dbversion = DB_VERSION) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbname, dbversion);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;

            // Create all defined stores
//            db.createObjectStore(DB_STORES[0], { keyPath: 'id', autoIncrement: false });
// Create stores with 'word' as keyPath for dictionary and 'id' for settings
            if (!db.objectStoreNames.contains('dictionary')) {
                db.createObjectStore('dictionary', { keyPath: 'word', autoIncrement: false });
            }
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

        let text = `The entry already exists.  Are you sure you want to overwrite this item?

The item will be permanently modified.\r\n`;

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
/**
 * Initializes IndexedDB for the dictionary:
 * 1. Checks if the store is empty.
 * 2. If empty, seeds the IndexedDB with the initial array values.
 * 3. Reads all records from IndexedDB and merges/updates the in-memory array.
 */
async function initDictionaryDB() {
    const db = await openDB();
    const storedEntries = await getAllFromDB('dictionary');

    if (storedEntries.length === 0) {
        // First run: Seed IndexedDB with initial array entries
        const transaction = db.transaction(['dictionary'], 'readwrite');
        const store = transaction.objectStore('dictionary');

        for (const entry of dictionary) {
            store.put(entry);
        }

        await new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve();
            transaction.onerror = (e) => reject(e.target.error);
        });
    } else {
        // Subsequent runs: Merge DB items into the local in-memory array
        const storedMap = new Map(storedEntries.map(item => [item.word, item]));

        dictionary.forEach((item, index) => {
            if (storedMap.has(item.word)) {
                dictionary[index] = storedMap.get(item.word);
                storedMap.delete(item.word);
            }
        });

        // Add any additional items stored in IndexedDB that weren't in default array
        for (const extraItem of storedMap.values()) {
            dictionary.push(extraItem);
        }
    }

    sortDictionary();
}