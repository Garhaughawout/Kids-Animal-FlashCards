
//render on card name, img, delete icon
//mouseover and mouseout event on card
//flip event

fetch("http://localhost:3000/cards")
    .then((resp) => resp.json())
    .then((data) => renderCards(data))

    function renderCards(cardArr) {
        const toyContainer = document.getElementById("flashcard-container");

        cardArr.forEach((cardObj)) {
            for (let i = 0; i < toyContainer.length; i++) {
                toyContainer[i].addEventListener('mouseover', function hoverOverCard (e) =>{
                    console.log (e.target)
                })
            }
        }
    }