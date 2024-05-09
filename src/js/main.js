'use strict';

//variables globales
const ulList = document.querySelector('.js_users');

let usersData = []; //array vacío
let usersFriends = [];//array isFriend

const url = "https://randomuser.me/api/?results=10";

//Funciones

//10 usuarios al azar
function renderRandom(user) {
    console.log(user);
    return `<li  id="${user.id.value}" class="user-li js_list">
        <img src="${user.picture.large}"/>
        <h3> ${user.name.first} ${user.name.last}</h3>
        <p>${user.location.city}</p>
        <p>${user.login.username}</p>
    </li>`;
}


function renderFriends(){
    
    const allUserLi = document.querySelectorAll('.js_list');
    for (const li of allUserLi) {
        li.addEventListener('click', addFriend);
    }
}

const getData = () => {
    fetch(url)
    .then(response=> response.json())
    .then((dataApi)=>{
        usersData = dataApi.results;
        usersData.forEach(user => {
            ulList.innerHTML += renderRandom(user);
        });
    localStorage.setItem("userData", JSON.stringify(usersData));
    });    
};
//se ejecuta cuando carga la págima
getData();