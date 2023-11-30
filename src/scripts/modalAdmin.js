export function viewsDepartament () {
    const view = document.querySelectorAll('.icons > .view')
    const modalView = document.querySelector('.views-departament')

    view.forEach((button) => {
        button.addEventListener('click', () => {
            modalView.showModal()
        })
    })
}

export function createDepartament () {
    const criar = document.querySelector('.criar')
    const modalCriar = document.querySelector('.criate-departamento')

    criar.addEventListener('click', () => {
        modalCriar.showModal()
    })
}

export function editDepartament() {
    const edit = document.querySelectorAll('.edit')
    const modalEdit = document.querySelector('.edit-departament')

    edit.forEach((edit) => {
        edit.addEventListener('click', () => {
            modalEdit.showModal()
        })
    })
}

export function delet () {
    const delet = document.querySelectorAll('.delet')
    const deletModal = document.querySelector('.delet-modal')

    delet.forEach((delet) => {
        delet.addEventListener('click', () => {
            deletModal.showModal()
        })
    })
}

export function editUser () {
    const editUser = document.querySelectorAll('.edit-user')
    const editModalUser = document.querySelector('.edit-user-modal')

    editUser.forEach((edit) => {
        edit.addEventListener('click', () => {
            editModalUser.showModal()
        })
    })
}

export function deletUser () {
    const deletUser = document.querySelectorAll('.delet-user')
    const deletModal = document.querySelector('.delet-user-modal')

    deletUser.forEach((delet) => {
        delet.addEventListener('click', () => {
            deletModal.showModal()
        })
    })
}