import { DepartamentsIdUser, companiesIdUser, funcionarioPerfil } from "./request.js"


function logout () {
    const logoutButton = document.querySelector('#button-UserPage')
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

async function renderNameEmail(funcionario) {
    const nameUser = document.querySelector('.dados__container > h1')
    const emailUser = document.querySelector('.dados__container > p')

    nameUser.innerHTML = funcionario.name
    emailUser.innerHTML = funcionario.email
}
async function empresa (funcionario){
    if(funcionario.company_id === null){
        const divBusiness = document.querySelector('.user__business')
        const h1 = document.createElement('h1')

        h1.innerHTML = 'Usuario não contratado'
        divBusiness.appendChild(h1)
    }else{
        const company = await companiesIdUser(funcionario.company_id)
        const departament = await DepartamentsIdUser(funcionario.department_id)

        renderCompania(company, departament)
    }
}

function renderCompania(company, departament){
    const nomeCompany = document.querySelector('.compania > h1')
    const nomeDepartamento = document.querySelector('.compania > h1 > span')
    const ulFuncionarios = document.querySelector('.funcionarios > ul')

    nomeCompany.innerHTML = company.name
    nomeDepartamento.innerHTML = departament.name

    const funcionarios = company.employees

    funcionarios.forEach(funcionario => {
        const li = document.createElement('li')
        const p = document.createElement('p')

        p.innerHTML = funcionario.name

        ulFuncionarios.appendChild(li)
        li.appendChild(p)
    });
}

function verificaToken() {
    if(!localStorage.getItem('@token')){
        location.replace('../../index.html')
    }
}

verificaToken()
renderNameEmail (await funcionarioPerfil())
logout ()
empresa (await funcionarioPerfil())

