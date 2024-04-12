//render on card name, img, delete icon
//mouseover and mouseout event on card
//flip event

//load Dom//

const cardContainer = document.querySelector('.flashcard-container');

const url = "http://localhost:3000/cards"

//this is a test//
fetch(url)
    .then(resp => resp.json())
    .then(data => renderCard(data))

function renderCards(cardArr) {

    cardArr.forEach(card => {
        const cardDiv = document.createElement('div')
        cardDiv.className = 'flashcard'
        cardDiv.innerHTML = `
        <div class="flashcard-front">
            <img class='flashCardImage' src= ${card.image}>
        </div>
        <div class="flashcard-back">
            <img class='flashCardImage' src= ${card.image}>
            <h2>${card.name}</h2>
        </div>
        `

        cardDiv.addEventListener('mouseover', () => {
            cardDiv.classList.toggle('hover')
        })
        cardDiv.addEventListener('mouseout', () => {
            cardDiv.classList.toggle('hover')

        })
        cardDiv.addEventListener('click', flipCard);
        cardContainer.appendChild(cardDiv)
    })
}

function flipCard() {
    this.classList.toggle('flipCard')
}

function renderCard(cardArr) {
    const toyContainer = document.getElementById("flashcard-container");

    cardArr.forEach((cardObj) => {
        //each card
    })
}

const form = document.getElementById('')
form.addEventListener('submit', (e) => handleAddNewcard(e))

function handleAddNewCard(e) {
    e.preventDefault()

    console.log(e.target.image.value)

    const newCardObj = {
        name: e.target.name.value,
        image: e.target.image.value,
        id: 0
    }

    renderCard([newCardObj])
}

fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newJsonObj)
})
    .then((resp) => resp.json())
    .then((data) => renderNewCard([data]))