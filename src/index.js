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
        cardDiv.className = 'flashcard '
        cardDiv.innerHTML = `
        <div class="flashcard-front">
            <img class='flashCardImage' src= ${card.image}>
        </div>
        <div class="flashcard-back">
            <img class='flashCardImage' src= ${card.image}>
            <h2 class='english'> ${card.name}</h2>
            <h2 class='spanish hidden'> ${card.spanish}</h2>
            <h2 class='french hidden'> ${card.french}</h2>
        </div>
        <div>
            <img class='trash' src=${trashImg}>
        </div>
        <div>
            <img class='trash' src=${trashImg}>
        </div>
        `
        const trash = cardDiv.querySelector('.trash')
        trash.addEventListener('click', deleteCard)

        
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

const form = document.querySelector('.add-toy-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log("hi")
    const lowerName = e.target.name.value.toLowerCase()
    const upperName = lowerName.charAt(0).toUpperCase() + lowerName.slice(1)

    const newCardObj = {
        name: upperName,
        spanish: e.target.french.value,
        french: e.target.spanish.value,
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

function renderNewCards() {

}

const languages = document.querySelector('#language-select');
const changes = document.querySelector('.changed-language')

languages.addEventListener("change", (e) => {
    const chosenLanguage = e.target.value
    const english = Array.from(document.getElementsByClassName('english'));
    const french = Array.from(document.getElementsByClassName('french'));
    const spanish = Array.from(document.getElementsByClassName('spanish'));
    const cardContainer = document.querySelector('.flashcard-container');
    const hideLanguages = (language) => language.forEach(language => 
        {language.classList.add("hidden")
if (language ==="" || language ===" "){
    cardContainer.classList.add("hidden")
    }
});
    const showLanguages = (languages) => languages.forEach(languages => languages.classList.remove("hidden"));
    
    if (chosenLanguage === "Spanish") {
        hideLanguages(english);
        hideLanguages(french);
        showLanguages(spanish);
    }
    else if (chosenLanguage === "French") {
        hideLanguages(english);
        showLanguages(french);
        hideLanguages(spanish);
    }
    else {
        showLanguages(english);
        hideLanguages(french);
        hideLanguages(spanish);
    }
})

//when a language is selected, automatically flips all cards so no text is showing
//

function deleteCard(e) {
    const card = e.target.closest('.flashcard')
    card.remove()
    const id = card.id
    fetch(`http://localhost:3000/cards/${id}`, {
        method: 'DELETE'
    })
}