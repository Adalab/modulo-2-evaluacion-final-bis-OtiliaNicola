'use strict';
//variables globales
const ulList = document.querySelector('.js_users');
let usersData = []; //array vacío
const url = "https://randomuser.me/api/?results=10";
//Funciones
//10 usuarios al azar
function renderRandom(user) {
    return `<li  id="${user.id.value}" class="user-li js_list">
        <img src="${user.picture.large}"/>
        <h3> ${user.name.first} ${user.name.last}</h3>
        <p>${user.location.city}</p>
        <p>${user.login.username}</p>
    </li>`;
}
//marco como amigo y renderizo la lista nuevamente
const addFriend = (ev) =>{
    //console.log(ev.currentTarget.id.value);
    //obtener todos los datos del usuario
    const liClikedId = ev.currentTarget.id;
    console.log('holis', liClikedId);
    const clikedUsersData = usersData.find((item)=>item.id.value === liClikedId);
    //añadir al array fiends el usuarios clicado
    usersFriends.push(clikedUsersData);
    //cuando clico sobre el usuario añado la propiedad
    clikedUsersData.isFriend === true;
    //console.log(clikedUsersData);
    //vuelvo a renderizar la lista nuevamente
    renderUsers();
}
//función para renderizar la lista de usuarios
function renderUsers(){
    //limpiar el contenid actual de la li
    ulList.innerHTML='';
    usersData.forEach(user => {
        //que se cambie el color en funcion de si es amigo o no
        //                      condicion ?      verdad    falso
        const backgroundColor = user.isFriend ? 'pink' : 'initial';
        const usersHTML = `<li  id="${user.id.value}" class="user-li js_list" style="background-color: ${backgroundColor}">
        <img src="${user.picture.large}"/>
        <h3> ${user.name.first} ${user.name.last}</h3>
        <p>${user.location.city}</p>
        <p>${user.login.username}</p>
    </li>`;
        ulList.innerHTML += usersHTML;
    })
    //añado el evento click nuevamente a mis elementos
    renderFriends();
}
//Evento click al elemento con la función:
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