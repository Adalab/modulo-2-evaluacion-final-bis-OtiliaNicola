'use strict';

//variables globales
const saveBtn = document.querySelector('.js_btnSave');
const recoverBtn = document.querySelector('.js_btnRecover');
const ul = document.querySelector('.js_ul');

//Array vacío
let userlist = [];



//Función en la que me pinta los 10 usuarios
function init ()
    const url = `https://randomuser.me/api/?results=10`;
    //llamanos a la API
    fetch(url)
    .then(response => response.json())
    .then(data => set)