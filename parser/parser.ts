import { Directive, Section, Token } from "../util.ts"
import e from "./nonterminals/e.ts"

export let stuff = ""

/**
 * LASM Recursive Descent Parser
 * (leftmost derivation, no backtracking, uses prediction)
 * @param {Token[][]} lines - Array of array of lines of tokens
 * @returns {(Directive | Section)[]} LASM Abstract Syntax Tree
 */
export default function Parser(lines: Token[][]) : (Directive | Section)[] {
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