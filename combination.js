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
        if (text.endsWith("?")) text += " _"

    // Cambia los Insert Name por tags en twitter
    if (text.includes("Insert Name" || text.includes("Insert Name's")))
        text.replace("Insert Name" || "Insert Name's", "[tag a friend]")

    for (let i = 0; i < randomBlackCard.pick; i++) {
        randomWhiteCards.push(cards.white[pickRandomNumber(cards.white.length)])
        textR = `${randomWhiteCards[i]}`

        // Capitaliza la carta blanca si la carta negra comienza con un espacio en blanco
        if (text.startsWith("_")) {
            textR.charAt(0) = textR.charAt(0).toUpperCase
        }

        text = text.replace("_", textR)
    }

    if (text.endsWith(".") && text.charAt(text.length - 1) == ".") 
        text = text.substring(0, text.length - 1)

    console.log(text)
    return text
}