//render on card name, img, delete icon
//mouseover and mouseout event on card
//flip event

const cardContainer = document.querySelector('.flashcard-container');

const url = "http://localhost:3000/cards"


fetch(url)
.then(resp => resp.json())
.then(data => renderCards(data))

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
