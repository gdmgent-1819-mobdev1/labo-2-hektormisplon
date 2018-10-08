function createNode(el, cl) {
    element = document.createElement(el);
    elClass = element.classList.add(cl);
    return element;
}
function append(parent, el) {
    return parent.appendChild(el);
}

/*v1
let div = createNode('div', 'user'),
userName = createNode('h3', 'user-name'),
userAge = createNode('h3', 'user-age'),
userGender = createNode('h3', 'user-gender'),
userLocation = createNode('h3', 'user-location'),
userImage = createNode('img', 'user-image');

append(elUsers, div);
append(div, userName);
append(div, userAge);
append(div, userGender);
append(div, userLocation);
append(div, userImage);
    
console.log(randomUser.picture.large);
userName.innerHTML = randomUser.name.first + " " + randomUser.name.last;
userAge.innerHTML = "age: " + randomUser.dob.age;
userGender.innerHTML = "gender: " + randomUser.gender;
userLocation.innerHTML = "location: " + randomUser.location.city;
userImage.setAttribute('src', randomUser.picture.large);
*/