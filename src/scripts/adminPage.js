import { deletUser, createDepartament, delet, editDepartament, editUser, viewsDepartament } from "./modalAdmin.js";
import { renderDepartamentos, renderUsersCadastrados, showModalCreate, showSelect } from "./renders.js";
import { allUsers, departaments, getEmpresas } from "./request.js";


createDepartament ()
showSelect(await getEmpresas(), await departaments())
renderUsersCadastrados (await allUsers())
editUser ()
deletUser ()

renderDepartamentos (await departaments())
viewsDepartament ()
editDepartament ()
delet ()

showModalCreate(await getEmpresas())

function logout () {
    const logoutButton = document.querySelector('#button-Logout')
    const body = document.body
    
    const modalLogout = document.createElement('dialog')
    const sim = document.createElement('button')
    const não = document.createElement('button')
    const div = document.createElement('div')
    const h1 = document.createElement('h1')
    
    sim.classList.add('button__red_back')
    sim.classList.add('button')
    não.classList.add('button')
    não.classList.add('button_blue_back')
    modalLogout.classList.add('logout')
    
    h1.innerHTML = 'Tem Certeza que deseja sair?'
    sim.innerText = 'Sim'
    não.innerText = 'Não'

    body.appendChild(modalLogout)
    modalLogout.appendChild(h1)
    modalLogout.appendChild(div)
    div.appendChild(sim)
    div.appendChild(não)
    
    logoutButton.addEventListener('click', () => {
        modalLogout.showModal()
    })

    não.addEventListener('click', () => {
        modalLogout.close()
    })
    sim.addEventListener('click', () => {
        location.replace('../../index.html')
        localStorage.removeItem('@token')
        localStorage.removeItem('@isAdm')
    })
}

function verificaToken() {
    if(!localStorage.getItem('@token')){
        location.replace('../../index.html')
    }
}

logout ()
verificaToken()