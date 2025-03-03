import e from "./nonterminals/e.js"

export let stuff = ""

export default function Parser(lines) {
    let parseStack = []
    lines.forEach(line => {
        let count = 0
        // let parsed = []
        
        // S -> E
        parseStack.push(e.select(line, count))
    })
    return parseStack
}