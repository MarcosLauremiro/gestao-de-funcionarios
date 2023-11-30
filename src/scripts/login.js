import { red,  loginRequest } from './request.js'
import { toast } from './toast.js'

function goHome () {
    const buttonHome = document.querySelector('#button-home-login')

    buttonHome.addEventListener('click', (e) => {
        location.replace('../../index.html')
    })
}

function goRegister () {
    const buttonRegister = document.querySelectorAll('.button-register-login')
    buttonRegister.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            location.replace('../pages/register.html')
        })
    })

}

function loginInputs () {
    const inps = document.querySelectorAll('.input')
    const buttonLogin = document.querySelector('#button-login')
    let loginBody = {}
    let count = 0

    buttonLogin.addEventListener('click', async (e) => {
        e.preventDefault()

        inps.forEach(input => {
            if(input.value.trim() == ''){
                count ++
            }
            
            loginBody[input.name] = input.value
        })
        
        if(count !== 0) {
            count = 0
            return toast( red, 'Por favor preencha todos os capos' )
        }else{
            const token = await  loginRequest(loginBody)

            return token
        }
    })
}

loginInputs ()

goRegister ()
goHome ()