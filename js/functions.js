function convertJsonToCSV(objArray) {
    // ... conversion logic ... // Full function in
    return csv;
}
function convertCsvToJSON(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }
    return JSON.stringify(result, null, 2); // Converts the array of objects to a JSON string
}