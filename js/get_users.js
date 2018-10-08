function displayUser() {
    //let i = 0;
    let transaction = userDb.transaction(['randomUserStore'], 'readwrite');
    let userStore = transaction.objectStore('randomUserStore');
    let keyRange = IDBKeyRange.lowerBound(0);
    let cursorRequest = userStore.openCursor(keyRange);
    let randomUsers = [];
    cursorRequest.onsuccess = function(e) {
        randomUser = e.target.result;
        for(let i = 0; i < 10; i ++) {
            if(randomUser == false) {
                return;
            }
            randomUsers.push(randomUser.value);
        }
    };
}

function evaluateUser(e) {
    /*
    let transaction = userDb.transaction(['randomUserStore'], 'readwrite');
    let store = transaction.objectStore('randomUserStore');
    uLiked = true;
    let request = store.put(uLiked);
    return transaction.complete;
    /*set uLiked to true or false
    if(//mouse event of ) {
        set true
    } else {
        set false
    }
    display the next user
    return boolean
    */
}


const url = 'https://randomuser.me/api/?results=10';
const elUsers = document.getElementById('random-users');
//IndexedDB | uID, uName, uImg, uAge, uGender, uLocation
let userDb;
window.onload = function() {
    let request = window.indexedDB.open('randomUserDb', 1);
    request.onupgradeneeded = function(e) {
        let userDb = e.target.result;
        let userStore = userDb.createObjectStore('randomUserStore', {keyPath: 'uID', autoIncrement: true});
        userStore.createIndex('uID', 'uName', {unique: false});
        userStore.createIndex('uLiked', 'uLiked', {unique: false});
    }
    request.onsuccess = function(e) {
        console.log('Opened database')
        userDb = e.target.result;
        displayUser();
    }
    request.onerror = function(e) {
        console.log('Could not open database' + e.target.errorCode);
    }
}

fetch(url)
.then(function(response) {
    return response.json();
})
.catch(function(error) {
    console.error("Random users could not be fetched.");
})
.then(function(data) {       
    let randomUsers = data.results;
    //console.log(randomUsers);
    //indexed DB: store user obect to database
    return randomUsers.map(function(randomUser) {
        let transaction = userDb.transaction(['randomUserStore'], 'readwrite');
        let store = transaction.objectStore('randomUserStore');
        randomUser = {
            uName: randomUser.name.first,
            uAge: randomUser.dob.age,
            uImg: randomUser.picture.large,
            uGender: randomUser.gender,
            uLocation: randomUser.location.city,
            uLiked: false
        }
        let request = store.add(randomUser);
        request.onsuccess = function(e) {
        console.log(randomUser.uName + ' added to the user database');
        }
        request.onerror = function(e) {
            console.log('Error: ' + e.target.user.uName + ' NOT added to user database');
        }
    })
});