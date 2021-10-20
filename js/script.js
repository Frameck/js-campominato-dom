// const difficultyLevel = document.getElementById('difficulty-select')
const playButton = document.getElementById('play-button')
const boxContainer = document.querySelector('.box-container')
const difficultySelect = document.getElementById('difficulty-select')

const bombArray = [] // tiene traccia della posizione delle bombe
const userPoints = [] // tiene traccia dei punti segnati dallo user


playButton.addEventListener('click', function() {
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

    // genero le bombe
    const totBombNumber = 16
    generateBombs(totBombNumber, totalBoxNumber)

    // calcolo le dimensioni del box in base al 'totalBoxNumber'
    const boxWidth = 100 / Math.sqrt(totalBoxNumber)
    
    // creo ed inserisco i box nel DOM
    for (let i = 1; i < totalBoxNumber + 1; i++) {
        // genero i box element
        const box = document.createElement('div')
        box.classList.add('box')
        box.textContent = i
        box.style.width = boxWidth + '%'
        box.style.height = boxWidth + '%'


        box.addEventListener('click', function() {
            const clickedBoxIndex = parseInt(this.textContent)
            const boxIsBomb = bombArray.includes(clickedBoxIndex)

            // controllo se l'indice del box corrisponde ad una bomba
            // se TRUE aggiungo la classe bomb e il gioco termina (calcolo i punti che l'utente ha fatto)
            // se FALSE il box si colora e il gioco continua
            if (boxIsBomb) {
                this.classList.add('bomb')
                let totUserPoints = userPoints.length
                // aggiungo 1,5sec di delay prima di resettare il gioco
                setTimeout(function() {
                    alert(`Hai trovato una bomba.\nHai perso con un punteggio di ${totUserPoints}`)
                    boxContainer.innerHTML = ''
                }, 1000);
            } else {
                this.classList.add('box-active')
                userPoints.push(clickedBoxIndex)
            }
            console.log(this.className)
            console.log(userPoints)
        })
        
        boxContainer.appendChild(box)
    }
}

console.log(bombArray)


// genera un numero casuale tra un min e un max (included)
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


/**
 * Funzione che genera un numero di bombe passato come argomento
 * @param {number} totBombNumber numero di bombe da generare
 * @param {number} totalBoxNumber numero totale di box = 49 || 81 || 100
 */
function generateBombs(totBombNumber, totalBoxNumber) {
    // finchè l'array non contiene 16 numeri unici continuo a pushare elementi
    for (let i = 0; i < totBombNumber; i++) {
        const newBomb = randomIntFromInterval(1, totalBoxNumber)
        const bombAlreadyExists = bombArray.includes(newBomb)
        
        if (bombAlreadyExists) {
            i--
        } else {
            bombArray.push(newBomb)
        }
    }
}