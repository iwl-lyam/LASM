import { Token } from "../util.ts"
import e from "./nonterminals/e.ts"

export let stuff = ""

export default function Parser(lines: Token[][]) {
    let parseStack: string[][] = []
    lines.forEach(line => {
        let count = 0
        parseStack.push(e.select(line, count))
    })
    return parseStack
}