import e from "./nonterminals/e.js"

export let stuff = ""

export default function Parser(lines) {
    let parseStack = []
    lines.forEach(line => {
        let count = 0
        parseStack.push(e.select(line, count))
    })
    return parseStack
}