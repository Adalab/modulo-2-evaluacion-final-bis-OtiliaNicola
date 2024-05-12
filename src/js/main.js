'use strict';
//variables globales
const ulList = document.querySelector('.js_users');
const saveBtn = document.querySelector('.js_btnSave');
const recoverBtn = document.querySelector('.js_btnRecover');
let usersData = []; //array vacío
const url = "https://randomuser.me/api/?results=10";

//Funciones
function saveCleanedUserData(usersListFromApi){
    // Limpiar los datos que ya existiesen en el array
    usersData = [];
    // Recorremos el listado y añadimos solo la información que necesitamos
    usersListFromApi.forEach(user=>{
        const transformedUser = {
            id: user.login.uuid,
            userImage: user.picture.large,
            userCompleteName: `${user.name.first} ${user.name.last}`,
            city: user.location.city,
            username: user.login.username,
        };
        // Añado al listado el usuario con los datos en limpio
        usersData.push(transformedUser);
    });
    // cuando terminamos de recorrer la colección renderizamos los datos
    renderUsers();
}

function renderRandom(user) {//10 usuarios al azar
    const backgroundColor = user.isFriend ? 'pink' : '#a3e2f5';
    return `<li  id="${user.id}" class="user-li js_list" style="background-color: ${backgroundColor}">
        <img src="${user.userImage}"/>
        <h3> ${user.userCompleteName}</h3>
        <p>${user.city}</p>
        <p>${user.username}</p>
    </li>`;
}

function renderUsers() {//función para renderizar la lista de usuarios
    ulList.innerHTML = '';//limpiar el contenid actual de la li
    usersData.forEach(user => {
        ulList.innerHTML += renderRandom(user);
    })
    renderFriends();//añado el evento click nuevamente a mis elementos
}

function addFriend(ev) {
    const liClikedId = ev.currentTarget.id; //obtener todos los datos del usuario
    const clikedUsersData = usersData.findIndex((item) => item.id === liClikedId);
    usersData[clikedUsersData].isFriend = true;
    renderUsers(); //vuelvo a renderizar la lista nuevamente
}

function renderFriends() {//Evento click al elemento con la función:
    const allUserLi = document.querySelectorAll('.js_list');
    for (const li of allUserLi) {
        li.addEventListener('click', addFriend);
    }
}

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

const getData = () => {
    fetch(url)
        .then(response => response.json())
        .then((dataApi) => {
            saveCleanedUserData(dataApi.results);
        });
};

getData();//se ejecuta cuando carga la págima
saveBtn.addEventListener('click', handleSave);
recoverBtn.addEventListener('click', handleRecover);