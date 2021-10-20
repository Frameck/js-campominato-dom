// const difficultyLevel = document.getElementById('difficulty-select')
const playButton = document.getElementById('play-button')
const boxContainer = document.querySelector('.box-container')
const difficultySelect = document.getElementById('difficulty-select')

const bombArray = []


playButton.addEventListener('click', () => {
    // al momento del click leggo il livello di difficoltà inserito dall'utente
    const difficultyLevel = difficultySelect.value

    // passo il livello di difficoltà come parametro nella funzione che genera il layout
    generateGridLayout(difficultyLevel)
})



/**
 * Funzione che calcola il numero totale di box da inserire in base al livello di difficoltà e poi li inserisce nel DOM
 * @param {number} difficultyLevel Livello di difficoltà scelto dall'utente tramite il select
 */
function generateGridLayout(difficultyLevel) {

    // reset del contenuto del 'box-container'
    boxContainer.innerHTML = ''

    difficultyLevel = parseInt(difficultyLevel)

    let totalBoxNumber

    // in base alla difficoltà scelta dall'utente, imposto il corretto numero di box
    switch (difficultyLevel) {
        case 1:
            totalBoxNumber = 100
            break;
        case 2:
            totalBoxNumber = 81
            break;
        case 3:
            totalBoxNumber = 49
            break;
    }

    // calcolo le dimensioni del box in base al 'totalBoxNumber'
    const boxWidth = 100 / Math.sqrt(totalBoxNumber)
    
    // creo ed inserisco i box nel DOM
    for (let i = 1; i < totalBoxNumber + 1; i++) {
        const box = document.createElement('div')
        box.classList.add('box')
        box.textContent = i
        box.style.width = boxWidth + '%'
        box.style.height = boxWidth + '%'

        box.addEventListener('click', function() {
            this.classList.toggle("box-active")
            console.log(this, 'NORMALE')
        })
        
        boxContainer.appendChild(box)
    }
    
    // tentativo di aggiungere le bombe
    const numBombe = 16

    // finchè l'array non è uguale a 16 continuo a pushare elementi
    for (let i = 0; i < numBombe; i++) {
        const generatedRandomBomb = randomIntFromInterval(1, totalBoxNumber)
        const bombAlreadyExists = bombArray.includes(generatedRandomBomb)

        if (bombAlreadyExists) {
            i--
        } else {
            bombArray.push(generatedRandomBomb)
        }
    }
    
    // for (let j = 0; j < bombArray.length; j++) {
    //     const generatedRandomBomb = bombArray[j];
    //     const boxElement = document.querySelector(`:nth-child(${generatedRandomBomb})`)
    //     boxElement.addEventListener('click', function () {
    //         this.classList.remove('box-active')
    //         this.classList.add('bomb')
    //         alert('Hai trovato una bomba!\nHai perso')
    //         console.log(this, 'BOMBA')
    //     })
    // }
}

console.log(bombArray);



// genera un numero casuale tra un min e un max (included)
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}