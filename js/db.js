//https://javascript.info/indexeddb
// Generic IndexedDB Wrapper
const dbName = "Accessibility";
const storeName = "dictionary";
const dbVersion = 1;
const DB_STORES = ['dictionary', 'settings']; // Define multiple stores


// 1. Initialize/Open Database
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onerror = (event) => reject("Database error: " + event.target.error);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // Create object store if it doesn't exist
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(DB_STORES[0], { keyPath: "id", autoIncrement: false });
                db.createObjectStore(DB_STORES[1], { keyPath: "id", autoIncrement: false });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
    });
};

// 2. Generic Transaction Handler (Readwrite)
const performTransaction = async (storeName, mode, callback) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, mode);
        const store = transaction.objectStore(storeName);
        const request = callback(store);

        transaction.oncomplete = () => resolve(request.result);
        transaction.onerror = (event) => reject(event.target.error);
    });
};

// --- CRUD OPERATIONS ---

// ADD: {Link: IDBObjectStore.add() https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/add}
const addItem = (item) => {
    return performTransaction(storeName, "readwrite", (store) => store.add(item));
};

// UPDATE: {Link: IDBObjectStore.put() https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put}
const updateItem = (item) => {
    return performTransaction(storeName, "readwrite", (store) => store.put(item));
};

// DELETE: {Link: IDBObjectStore.delete() https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/delete}
const deleteItem = (id) => {
    return performTransaction(storeName, "readwrite", (store) => store.delete(id));
};

// GET ALL: {Link: IDBObjectStore.getAll() https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAll}
const getAllItems = () => {
    return performTransaction(storeName, "readonly", (store) => store.getAll());
};

function getJsonData(name = null,importance = null,occurrence = null,isActive = null,category = null, strName = 'dictionary') {
    let ans = ``;
    if (name === null) { }
    if (importance === null) { importance = 1; }
    if (occurrence === null) { occurrence = 1; }
    if (isActive === null) { isActive = 1; }
    if (category === null) { category = "None"; }
    if (strName === 'dictionary') {
        ans = `{ "storeName": "${strName}"
                , "id": "${name}"
                , "name": "${name}"
                , "importance": ${importance}
                , "occurrence": ${occurrence}
                , "isActive": ${isActive}
                , "category": "${category}"
        }`;
    } else if (strName === 'Settings') {
        ans = `{ "storeName": "${strName}"
                , "id": "${name}"
                , "category": "${category}"
                , "name": "${name}"
                , "value": "${importance}"
        }`;
    }
    return JSON.parse(ans);
}
// --- USAGE EXAMPLE ---
const exampleUsage = async () => {
    try {
        // Add
        const newId = await addItem(getJsonData("Help",500,1,1,"Important"));
        console.log("Added item with ID:", newId);
        const newId2 = await addItem(getJsonData("This is a test of the Emergency Broadcast System", 1, 1, 1,"None"));
        console.log("Added item with ID:", newId2);
        const newId3 = await addItem(getJsonData("Waffle",250,10,1,"Food"));
        console.log("Added item with ID:", newId3);

        // Update
        await updateItem({ id: newId, name: "Updated Item", type: newId.occurrence++ });
        console.log("Item updated");

        // Get
        const items = await getAllItems();
        console.log("All items:", items);

        // Delete
        await deleteItem(newId);
        console.log("Item deleted");
    } catch (error) {
        console.error(error);
    }
};

//exampleUsage();