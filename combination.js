const cards = require('./cards.json')

function pickRandomNumber(length) {
    return Math.floor(Math.random() * (length - 1))
}

exports.combo = () => {
    let randomBlackCard = cards.black[pickRandomNumber(cards.black.length)]
    let randomWhiteCards = []
    let text = randomBlackCard.text
    let textR = ""

    if (!text.includes("_"))
        if (text.endsWith("?")) text += " _"

    if (text.includes("Insert Name" || text.includes("Insert Name's")))
        text.replace("Insert Name" || "Insert Name's", "[tag a friend]")

    for (let i = 0; i < randomBlackCard.pick; i++) {
        randomWhiteCards.push(cards.white[pickRandomNumber(cards.white.length)])
        textR = `${randomWhiteCards[i]}`
        text = text.replace("_", textR)
    }
    console.log(text)
    return text
}