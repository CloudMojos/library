const openModalButtons = document.querySelectorAll('[data-modal-target]')
const overlay = document.getElementById('overlay')
const addBtn = document.getElementById('add')
/* Styles */
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)

    })
})

function openModal(modal) {
    if (modal == null)  return
    modal.classList.add('active')
    overlay.classList.add('active')
}

overlay.addEventListener('click', () => {
    const modal = document.querySelector('.modal.active')
    closeModal(modal)
})

addBtn.onsubmit = ((e) => {
    e.preventDefault()
    console.log(e)
})

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        console.log('Escape has been clicked')
        const modal = document.querySelector('.modal.active')
        closeModal(modal)
    }
})

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}