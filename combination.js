const cards = require('./cards.json')

function pickRandomNumber(length) {
    return Math.floor(Math.random() * (length - 1))
}

exports.combo = () => {
    let randomBlackCard = cards.black[pickRandomNumber(cards.black.length)]
    let randomWhiteCards = []
    let text = randomBlackCard.text
    let textR = ""

    // Si la carta es una pregunta y no dispone de espacios en blanco, le añade un espacio en blanco al final
    if (!text.includes("_"))
        text += " _"

    // Cambia los Insert Name por tags en twitter
    if (text.includes("Insert Name" || text.includes("Insert Name's")))
        text = text.replace("Insert Name", "[tag a friend]")

    for (let i = 0; i < randomBlackCard.pick; i++) {
        randomWhiteCards.push(cards.white[pickRandomNumber(cards.white.length)])
        textR = `${randomWhiteCards[i]}`


        // Elimina los puntos de las cartas blancas
        textR = textR.endsWith(".") ? textR.slice(0, textR.length - 1) : textR

        // Capitaliza la carta blanca si la carta negra comienza con un espacio en blanco
        textR = text.startsWith("_") ? textR.charAt(0).toUpperCase() + textR.slice(1) : textR

        // Sustituye los espacios en blanco en las cartas negras por cartas blancas en cada iteración
        text = text.replace("_", textR)
    }

    return text
}