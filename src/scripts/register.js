import { red, register } from "./request.js"
import { toast } from "./toast.js"

function goHome () {
    const buttonHome = document.querySelector('#button-register-home')

    buttonHome.addEventListener('click', (e) => {
        location.replace('../../index.html')
    })
}

function goLogin () {
    const buttonLogin = document.querySelector('#button-register-login')

    buttonLogin.addEventListener('click', (e) => {
        location.replace('../pages/login.html')
    })
}

function showCreate () {
    const inputs = document.querySelectorAll('.input')
    const buttonCreate = document.querySelector('.button_create')
    let createBody = {}
    let count = 0

    buttonCreate.addEventListener('click', async (e) => {
        e.preventDefault()
        
        inputs.forEach(input => {
            if(input.value.trim() == ''){
                count ++
            }
            createBody[input.name] = input.value
        
        })

        if(count !== 0){
            count = 0
            
            toast(red, 'Por favor preencha todos os campos corretamente')
            
        }else{
            await register(createBody)
        }
    })
}

showCreate ()

goLogin ()
goHome ()