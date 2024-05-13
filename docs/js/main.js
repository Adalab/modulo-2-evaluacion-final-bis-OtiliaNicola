const o=document.querySelector(".js_users"),c=document.querySelector(".js_btnSave"),a=document.querySelector(".js_btnRecover");let n=[];const l="https://randomuser.me/api/?results=10";function d(e){n=[],e.forEach(t=>{const r={id:t.login.uuid,userImage:t.picture.large,userCompleteName:`${t.name.first} ${t.name.last}`,city:t.location.city,username:t.login.username};n.push(r)}),s()}function u(e){const t=e.isFriend?"pink":"var(--blue)";return`<li  id="${e.id}" class="user-li js_list" style="background-color: ${t}">
        <img src="${e.userImage}"/>
        <h3> ${e.userCompleteName}</h3>
        <p>${e.city}</p>
        <p>${e.username}</p>
    </li>`}function s(){o.innerHTML="",n.forEach(e=>{o.innerHTML+=u(e)}),f()}function m(e){const t=e.currentTarget.id,r=n.findIndex(i=>i.id===t);n[r].isFriend=!0,s()}function f(){const e=document.querySelectorAll(".js_list");for(const t of e)t.addEventListener("click",m)}function v(e){e.preventDefault(),localStorage.setItem("userStoredList",JSON.stringify(n))}function g(e){e.preventDefault(),n=JSON.parse(localStorage.getItem("userStoredList")),s()}const p=()=>{fetch(l).then(e=>e.json()).then(e=>{d(e.results)})};p();c.addEventListener("click",v);a.addEventListener("click",g);
//# sourceMappingURL=main.js.map
