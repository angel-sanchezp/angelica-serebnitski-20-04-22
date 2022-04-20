function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return (val)? JSON.parse(val) : null;
}

function saveToStorage(key, val) {
    console.log('value tu storage',key,val);
    localStorage[key] = JSON.stringify(val);
}


export default {
    loadFromStorage,
    saveToStorage,

}