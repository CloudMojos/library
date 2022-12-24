// Constants and Handles
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const overlay = document.getElementById('overlay')
const addBookForm = document.getElementById('add')
const bookSection = document.querySelector('section')
let frontCards = document.querySelectorAll('.book-card')
const colors = [
    "#ffc0cb", // pink
    "#c1e1c1", // green
    "#87ceeb",  // skyblue
    "#fdfd96" // yellow
]
// Styles

// Open modal elements
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)

    })
})

// Add .active on modals
function openModal(modal) {
    if (modal == null)  return
    modal.classList.add('active')
    overlay.classList.add('active')
}

// Close modal via click on the overlay
overlay.addEventListener('click', () => {
    closeModalHelper()
})

// Close modal via escape key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        console.log('Escape has been clicked')
        closeModalHelper()
    }
})

// Helper function for closing modal
function closeModalHelper() {
    const modal = document.querySelector('.modal.active')
    closeModal(modal)
}

// Remove .active on modals
function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

function buttonClick(e) {
    e.stopPropagation()
}

// Rotate cards
function rotateCards () {
    frontCards = document.querySelectorAll('.book-card')
    frontCards.forEach(card => {
        if (card.hasEventListener) { return }

        card.addEventListener('click', (e) => {        
        card.classList.contains('active') ? card.classList.remove('active') : card.classList.add('active')
        card.hasEventListener = true
        console.log(card.hasEventListener)
        })
    })
}

// Submit form then close modal
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    newBook = addBook()
    newBook.createBookCard()
    closeModalHelper()
})


// Adding Book to the page
// Book constructor
function Book (title, author, pages, haveRead) {
    this.title = title
    this.author = author
    this.pages = pages 
    this.haveRead = haveRead
}

Book.prototype.createBookCard = function () {
    const randomIndex = Math.floor(Math.random() * colors.length);
    by = document.createElement('p')
    by.appendChild(document.createTextNode('by'))
    // The card container
    card = document.createElement('div')
    card.classList.add('book-card')

    // The front of the card
    front = document.createElement('div')
    front.classList.add('front')
    color = colors[randomIndex]
    front.style.backgroundColor = color + 'aa'

    // Children of front
    titleAndAuthor = document.createElement('div')
    titleAndAuthor.classList.add('book-card-separation')
    pagesAndRead = document.createElement('div')
    pagesAndRead.classList.add('book-card-separation')

    // Children of titleAndAuthor
    titleElement = document.createElement('p')
    titleElement.classList.add('title')
    titleElement.appendChild(document.createTextNode(this.title))
    authorElement = document.createElement('p')
    authorElement.classList.add('author')
    authorElement.appendChild(document.createTextNode(this.author))

    // Children of pagesAndRead
    pagesElement = document.createElement('p')
    pagesElement.classList.add('pages')
    buttonReadElement = document.createElement('button')
    if (!this.haveRead) {
        buttonReadElement.classList.add('read', 'clickable')
    }

    // The back of the card
    back = document.createElement('div')
    back.classList.add('back')
    back.style.backgroundColor = color

    // Children of back
    deleteDiv = document.createElement('div')
    deleteDiv.classList.add('book-card-separation')

    // Children of deleteDiv
    deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.appendChild(document.createTextNode('✖'))
    deleteBtn.setAttribute("onclick", "buttonClick(event); deleteBook();")
    
    // Appending to back
    deleteDiv.appendChild(deleteBtn)
    back.appendChild(deleteDiv)

    // Adding the nodes to the DOM
    // titleAndAuthor 
    titleAndAuthor.appendChild(titleElement)
    titleAndAuthor.appendChild(authorElement)
    titleAndAuthor.insertBefore(by, authorElement)
    // pagesAndRead
    pagesAndRead.appendChild(pagesElement)
    pagesAndRead.appendChild(buttonReadElement)
    // front
    front.appendChild(titleAndAuthor)
    front.appendChild(pagesAndRead)
    // card
    card.appendChild(front)
    card.appendChild(back)
    // bookSection/section element
    bookSection.appendChild(card)

    rotateCards()
}

function addBook () {
    const title = addBookForm.querySelector('#book-title').value
    const author = addBookForm.querySelector('#book-author').value
    const pages = addBookForm.querySelector('#book-pages').value
    const haveRead = addBookForm.querySelector('#book-read').checked
    return new Book(title, author, pages, haveRead)
}

rotateCards()
