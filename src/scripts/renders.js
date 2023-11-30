
import { editUser, allUsers, companesCategory, companiasPorId, contrateFuncionario, crearDepartamento, deletDepartament, departamentPorEmpresa, departaments, editDepartametoModal, red, deletFuncionario } from "./request.js";
import { toast } from "./toast.js";


// RENDER HOME PAGE ========================

export function renderHomePageEmpresas(arrayEmpresas, arrayCategory) {
    const ul = document.querySelector('.lista-de-empresas')
    ul.innerHTML = ''

    arrayEmpresas.forEach(empresa => {         
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        const span = document.createElement('span')

        ul.appendChild(li)
        li.appendChild(h3)
        li.appendChild(span)

        h3.innerHTML = empresa.name

        arrayCategory.forEach( category => {
            if(category.id == empresa.category_id){
                span.innerText = category.name
            }
        })
    });
}

export function renderSelect(arrayCategories, arrayEmpresas) {
    const select = document.querySelector('#setor')

    arrayCategories.forEach(category => {
        const opt = document.createElement('option')
        
        select.appendChild(opt)

        opt.innerText = category.name

        opt.value = category.name

        select.addEventListener('change', async (e) => {
            if(e.target.value == 'All'){
                renderHomePageEmpresas(arrayEmpresas, arrayCategories)
            }else{
                const empresas = await companesCategory(e.target.value)
                renderHomePageEmpresas(empresas, arrayCategories)
            }
        })
    })
    
}

// RENDER ADMIN PAGE ========================


export function renderDepartamentos (arrayDepartamentos) {
    const departamentos = document.querySelector('.dep')
    departamentos.innerHTML = ''

    const modalView = document.querySelector('.views-departament')
    const modalEdit = document.querySelector('.edit-departament')
    const modalDelet = document.querySelector('.delet-modal')
    
    arrayDepartamentos.forEach(async departamento => {
        const li = document.createElement('li')
        const divNames = document.createElement('div')
        const h2 = document.createElement('h2')
        const pDescript = document.createElement('p')
        const pNameCompani = document.createElement('p')
        
        const divIcons = document.createElement('div')
        const imgEyes = document.createElement('img')
        const imgPen = document.createElement('img')
        const imgTrash = document.createElement('img')


        departamentos.appendChild(li)
        li.appendChild(divNames)
        divNames.appendChild(h2)
        divNames.appendChild(pDescript)
        divNames.appendChild(pNameCompani)
        
        li.appendChild(divIcons)
        divIcons.appendChild(imgEyes)
        divIcons.appendChild(imgPen)
        divIcons.appendChild(imgTrash)


        divNames.classList.add('names')
        h2.innerHTML = departamento.name
        pDescript.innerHTML = departamento.description

        const nomeEmpresa = await companiasPorId (departamento.company_id)
        pNameCompani.innerHTML = nomeEmpresa.name
        
        divIcons.classList.add('icons')
        
        imgEyes.src = '../assets/img/Vector.svg'
        imgEyes.classList.add('view')
        imgEyes.addEventListener('click',async () =>{
            modalView.showModal()
            renderModalView (departamento)
        })
        
        imgPen.src = '../assets/img/pen.svg'
        imgPen.classList.add('edit')
        imgPen.addEventListener('click', () => {
            modalEdit.showModal()
            editDepartamento(departamento)      
        })
        
        imgTrash.src = '../assets/img/lixo.svg'
        imgTrash.classList.add('delet')
        imgTrash.addEventListener('click', (e) =>{
            modalDelet.showModal()
            deletModalDepartament (departamento.id)
        } )
    })
}

export function renderUsersCadastrados (arrayUsers) {
    const modalEditUser = document.querySelector('.edit-user-modal')
    const modalDeletUser =  document.querySelector('.delet-user-modal')

    const users = document.querySelector('.user')
    users.innerHTML = ''

    arrayUsers.forEach(async user => {
        const li = document.createElement('li')
        const divNames = document.createElement('div')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')

        const divIcons = document.createElement('div')
        const imgPen = document.createElement('img')
        const delet = document.createElement('img')

        users.appendChild(li)
        li.appendChild(divNames)
        divNames.classList.add('names')
        divNames.appendChild(h3)
        divNames.appendChild(p)
        
        li.appendChild(divIcons)
        divIcons.classList.add('icons')
        divIcons.appendChild(imgPen)
        divIcons.appendChild(delet)

        h3.innerHTML = user.name
        
        if(user.company_id){
            const empresa = await companiasPorId (user.company_id)
            p.innerHTML = empresa.name
        }else{ 
            p.innerHTML = 'Não contratado'
        }
        imgPen.src = "../assets/img/pen.svg"
        imgPen.addEventListener('click', () => {
            modalEditUser.showModal()
            editUsers(user.id)
        })
        delet.src = "../assets/img/lixo.svg"
        delet.addEventListener('click' ,() => {
            modalDeletUser.showModal()
            deletUsers(user.id)
        })
        
    })
}

export function showSelect(arrayEmpresas,departamento) {
    const select = document.querySelector('.select')
    const vazio = {}

    arrayEmpresas.forEach(empresa => {
        const opt = document.createElement('option')

        select.appendChild(opt)

        opt.innerText = empresa.name
        opt.value = empresa.name

        select.addEventListener('change', async (e) => {
            console.log(e.target.value)
            if(e.target.value == 'All'){
                renderDepartamentos(departamento)
            }else{
                const departamentos = await departamentPorEmpresa (empresa.id)
                renderDepartamentos(departamentos)
            }
        })
    });
}

export async function renderModalView (departamento) {

    const company = await companiasPorId (departamento.company_id)

    const funcionariosall = await allUsers ()
    console.log(funcionariosall)

    let funcionarios = company.employees
    

    const modalView = document.querySelector('.views-departament')
    const divContainer = document.querySelector('.views__container')
    divContainer.innerHTML = ''

    const divHeader = document.createElement('div')
    const h1 = document.createElement('h1')
    const span = document.createElement('span')
    
    divContainer.appendChild(divHeader)
    divHeader.classList.add('views__header')
    divHeader.appendChild(h1)
    divHeader.appendChild(span)

    h1.innerHTML = departamento.name
    span.innerHTML = 'X'

    span.addEventListener('click', () => {
        modalView.close()

    })

    const divDescript = document.createElement('div')
    divDescript.classList.add('descript__container')
    const h2 = document.createElement('h2')

    divContainer.appendChild(divDescript)
    divDescript.appendChild(h2)

    h2.innerHTML = company.description


    const divLabel = document.createElement('div')
    const label = document.createElement('label')

    
    divContainer.appendChild(divLabel)
    divLabel.appendChild(label)
    divLabel.classList.add('label')
    
    label.innerHTML = company.name


    const divSelect = document.createElement('div')
    const select = document.createElement('select')
    divSelect.classList.add('view__select')
    const optionAll = document.createElement('option')
    optionAll.innerHTML = 'Selecionar Empresas'
    select.appendChild(optionAll)
    
    divContainer.appendChild(divSelect)
    divSelect.appendChild(select)
    
    const buttonContratar = document.createElement('button')
    buttonContratar.innerText = 'Contratar'
    buttonContratar.classList.add('button')
    buttonContratar.classList.add('button__green')
    divSelect.appendChild(buttonContratar)
    
    funcionariosall.forEach(funcionario => {
        const option = document.createElement('option')
        option.innerText = funcionario.name
        option.value = funcionario.id

        select.appendChild(option)

        
    })
    buttonContratar.addEventListener('click', async () => {  
        // select.addEventListener('change',async (e) => {
        //     await contrateFuncionario (e.target.value)
        //     console.log(e.target.value)
        // })
        await contrateFuncionario(select.value, {department_id: departamento.id})
    })
    
    

    const ul = document.createElement('ul')
    divContainer.appendChild(ul)
    if(funcionarios.length != 0){
        funcionarios.forEach(funcionario => {
            const li = document.createElement('li')
            const div = document.createElement('div')
            const h3 = document.createElement('h3')
            const p = document.createElement('p')
            const button = document.createElement('button')
    
            h3.innerText = funcionario.name
            p.innerText = company.name
    
            button.innerText = 'Desligar'
            button.classList.add('button')
            button.classList.add('button__red')
    
            button.addEventListener('click',async () =>{
                await demiteFuncionario (funcionario.id)
            })
    
            ul.appendChild(li)
            li.appendChild(div)
            div.appendChild(h3)
            div.appendChild(p)
            li.appendChild(button)
        })
    }else{
        const h4 = document.createElement('h4')
        h4.innerHTML = 'Nenhum funcionario contratado'
        ul.appendChild(h4)

        ul.style.justifyContent = 'center'
        ul.style.alignItems = 'center'
        ul.style.display = 'flex'
    }

}

export function showModalCreate(arrayEmpresas) {
    const modalCriar = document.querySelector('.criate-departamento')
    const inputs = document.querySelectorAll('.inp_edit')
    const select =  document.querySelector('.select_edit')
    const fechar = document.querySelector('.fechar_create')
    const buttonCriar = document.querySelector('.button_criar')
    let createBody = {}
    let count = 0
    
    arrayEmpresas.forEach(empresa => {
        const opt = document.createElement('option')
        opt.innerText = empresa.name
        opt.value = empresa.id

        select.appendChild(opt)
    })

    buttonCriar.addEventListener('click',async (e) => {
        e.preventDefault()
        inputs.forEach( input => {
            if(input.value.trim() == ''){
                count ++
            }

            createBody[input.name] = input.value
            createBody[select.name] = select.value
            
        })

        if(count != 0){
            return toast(red, 'Porfavor Preencha todos os campos corretamente')
        }else{
            await crearDepartamento(createBody).then(async () => {
                const departamentAll = await departaments()
                renderDepartamentos(departamentAll)
            })
            createBody = {}
        }
        modalCriar.close()
    })

    fechar.addEventListener('click', () => {
        modalCriar.close()
    })
}

export function editDepartamento(departament) {
    const modalEdit = document.querySelector('.edit-departament')
    const textArea = document.querySelector('.editar_descrição')
    const buttonEdit = document.querySelector('.button_edit')
    const fecharModal = document.querySelector('.fechar_edit')
    let bodyEdit = {}
    let count = 0

    textArea.placeholder = departament.description

    buttonEdit.addEventListener('click', async (e) => {
        e.preventDefault()
        if(textArea.value == ''){
            count ++
        }else{
            bodyEdit[textArea.name] = textArea.value
        }
        
        
        if(count != 0){
            return toast(red, 'Preencha todos os campos corretamente')
        }else{
            await editDepartametoModal(bodyEdit, departament.id).then(async () =>{
                const departamentAll = await departaments()
                renderDepartamentos(departamentAll)
            })
            modalEdit.close()
        }
    })
    
    fecharModal.addEventListener('click', () => {
        modalEdit.close()
    })

}

export function deletModalDepartament (departamentoId){
    const modalDelet = document.querySelector('.delet-modal')
    const buttonDelet = document.querySelector('.delet_departament')
    const fechar = document.querySelector('.fechar_delet')


    buttonDelet.addEventListener('click', async (e) => {
        e.preventDefault()
        await deletDepartament(departamentoId).then(async () => {
            const departamentAll = await departaments()
            renderDepartamentos(departamentAll)
        })
        modalDelet.close()
    })
    fechar.addEventListener('click',() => modalDelet.close())
}

export function editUsers(funcionarioId) {
    const modalUserEdit = document.querySelector('.edit-user-modal')
    const inputs = document.querySelectorAll('.inp_editUser')
    const buttonEdit = document.querySelector('.edit_user_buton')
    const fechar = document.querySelector('.fechar_edit_user')
    let bodyEdit = {}
    let count = 0

    buttonEdit.addEventListener('click', async (e) => {
        e.preventDefault()
        inputs.forEach(input => {
            if(input.value == ''){
                count++
            }
            inputs[input.name] = input.value
        })
        if(count != 0){
            return toast(red, 'Porfavor Preencha todos os campos corretamente')
        }else{
            await editUser(bodyEdit, funcionarioId).then( async () => {
                const allUser = await allUsers ()
                renderUsersCadastrados (allUser)
            })

            modalUserEdit.close()
        }
    })
    fechar.addEventListener('click', () => {
        modalUserEdit.close()
    })

}

export function deletUsers(idFuncionario){
    const modalDeletUser =  document.querySelector('.delet-user-modal')
    const buttonDeteletUser = document.querySelector('.button_deletUser')
    const fechar = document.querySelector('.fechar_modal_delet_user')

    buttonDeteletUser.addEventListener('click', async () => {
       await deletFuncionario(idFuncionario).then( async () => {
                const allUser = await allUsers ()
                renderUsersCadastrados (allUser)

                modalDeletUser.close()
       })
    })
    fechar.addEventListener('click', () => {
        modalDeletUser.close()
    })
}