'use strict';
//variables globales
const ulList = document.querySelector('.js_users');
const saveBtn = document.querySelector('.js_btnSave');
const recoverBtn = document.querySelector('.js_btnRecover');
let usersData = []; //array vacío
const url = "https://randomuser.me/api/?results=10";
//Funciones
function renderRandom(user) {//10 usuarios al azar
    return `<li  id="${user.login.uuid}" class="user-li js_list">
        <img src="${user.picture.large}"/>
        <h3> ${user.name.first} ${user.name.last}</h3>
        <p>${user.location.city}</p>
        <p>${user.login.username}</p>
    </li>`;
}

function addFriend(ev) {
    const liClikedId = ev.currentTarget.id; //obtener todos los datos del usuario
    const clikedUsersData = usersData.findIndex((item) => item.login.uuid === liClikedId);
    usersData[clikedUsersData].isFriend = true;
    renderUsers(); //vuelvo a renderizar la lista nuevamente
}

function renderUsers() {//función para renderizar la lista de usuarios
    ulList.innerHTML = '';//limpiar el contenid actual de la li
    usersData.forEach(user => {
        const backgroundColor = user.isFriend ? 'pink' : '#a3e2f5';
        const usersHTML = `<li  id="${user.login.uuid}" class="user-li js_list" style="background-color: ${backgroundColor}">
        <img src="${user.picture.large}"/>
        <h3> ${user.name.first} ${user.name.last}</h3>
        <p>${user.location.city}</p>
        <p>${user.login.username}</p>
    </li>`;
        ulList.innerHTML += usersHTML;
    })
    renderFriends();//añado el evento click nuevamente a mis elementos
}

function renderFriends() {//Evento click al elemento con la función:
    const allUserLi = document.querySelectorAll('.js_list');
    for (const li of allUserLi) {
        li.addEventListener('click', addFriend);
    }
}
const getData = () => {
    fetch(url)
        .then(response => response.json())
        .then((dataApi) => {
            usersData = dataApi.results;
            renderUsers();
            //localStorage.setItem("userStoredList", JSON.stringify(usersData));
        });
};
function handleSave(event){
    event.preventDefault();
    localStorage.setItem("userStoredList", JSON.stringify(usersData));
}
function handleRecover(event){
    event.preventDefault();
    const savedUsers = JSON.parse(localStorage.getItem("userStoredList"));
    usersData=savedUsers;
    renderUsers();
}
getData();//se ejecuta cuando carga la págima
saveBtn.addEventListener('click', handleSave);
recoverBtn.addEventListener('click', handleRecover);