//render on card name, img, delete icon
//mouseover and mouseout event on card
//flip event

//load Dom//
const cardContainer = document.querySelector('.flashcard-container');

const trashImg = "https://cdn-icons-png.flaticon.com/512/2891/2891491.png"
const url = "http://localhost:3000/cards"

fetch(url)
    .then(resp => resp.json())
    .then(data => renderCards(data))

function renderCards(cardArr) {
    console.log(cardArr)
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
        // <img class='trash' src=${trashImg} alt='trash'>
        `

        cardDiv.addEventListener('mouseover', () => {
            cardDiv.classList.toggle('hover')
        })
        cardDiv.addEventListener('mouseout', () => {
            cardDiv.classList.toggle('hover')

        })
        cardDiv.addEventListener('click', flipCard);
        console.log(cardDiv)
        cardContainer.appendChild(cardDiv)
    })
}

function flipCard() {
    this.classList.toggle('flipCard')
}



const form = document.querySelector('.add-toy-form')
console.log(form)
form.addEventListener('submit', (e) => {
      e.preventDefault()

    console.log("hi")
    const lowerName = e.target.name.value.toLowerCase()
    const upperName = lowerName.charAt(0).toUpperCase() + lowerName.slice(1)

    const newCardObj = {
        name: upperName,
        image: e.target.image.value
    }
    renderCards([newCardObj])

    fetch("http://localhost:3000/cards", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCardObj)
    })
        .then((resp) => resp.json())
        .then((data) => renderNewCards([data]))
})

function renderNewCards () {
    
}

// function deleteCard() {
//     fetch(`http://localhost:3000/cards/${card.id}`, {
//         method: 'DELETE'
//     })
//         .then(resp => resp.json())
//         .then(data => {
//             this.remove()
//         })
// }