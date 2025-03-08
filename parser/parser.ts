import { Token } from "../util.ts"
import e from "./nonterminals/e.ts"

export let stuff = ""

export default function Parser(lines: Token[][]) {
    let parseStack: any[] = []
    lines.forEach(line => {
        let count = 0
        let exp = e.select(line, count, parseStack)
        // console.log(parseStack, "\n")
        if (exp.length > 0) {
            parseStack = exp
        }
    })
    return parseStack
}