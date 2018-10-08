function displayUser() {
    console.log('displaying user');
    let transaction = userDb.transaction(['randomUserStore'], 'readwrite');
    let userStore = transaction.objectStore('randomUserStore');
    let keyRange = IDBKeyRange.lowerBound(0);
    let cursorRequest = userStore.openCursor(keyRange);
    let users = [];
    /*
    cursorRequest.onsuccess = function(e) {
        randomUser = e.target.result;
        for(let i = 0; i < 10; i ++) {
            if(randomUser == false) {
                return;
            }
            randomUsers.push(randomUser.value);
        }
    };
    */
   cursorRequest.onsuccess = users.map(function(user) {
       user = e.target.result;
       console.log('got '+user);
       return user;
   })
   cursorRequest.onerror = function(e) {
       console.log('Error: ' + e.target.result);
   }
   console.log(users);
}

function evaluateUser(like) {
    let uLiked;
    if(like) {
        uLiked = true;
    } else {
        uLiked = false;
    }
    return uLiked;
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
        userStore.createIndex('uName', 'uName', {unique: false});
        //createIndex
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
    console.error(error + "Random users could not be fetched.");
})
.then(function(data) {       
    let randomUsers = data.results;
    //indexed DB: store user obect to database
    randomUsers.map(function(randomUser) {
        randomUser = {
            uName: randomUser.name.first,
            uAge: randomUser.dob.age,
            uImg: randomUser.picture.large,
            uGender: randomUser.gender,
            uLocation: randomUser.location.city,
            uLiked: false
        }
        let transaction = userDb.transaction(['randomUserStore'], 'readwrite');
        let store = transaction.objectStore('randomUserStore');
        let request = store.add(randomUser);
        request.onsuccess = function(e) {
        console.log(randomUser.uName + ' added to the user database');
        }
        request.onerror = function(e) {
        console.log('Error: ' + e.target.user.uName + ' NOT added to user database');
        }
    })
});