import {Directive, Ident, peek, Token, NonTerminal} from "../../util.ts"
import { Section, Label } from "../../util.ts"

export default {
    name: "SECT",
    select(tokens: Token[], current: number, parsed: (Section | Directive)[]): (Section | Directive)[] { //only tml
        const lookahead = peek(tokens, current, 1)
        if (lookahead[0].char == "TEXT") {
            parsed.push({char: "TEXT", labels: [] as Label[]})
        } else if (lookahead[0].char == "DATA") {
            parsed.push({char: "DATA", labels: [{name: "_", instructions: [], directives: []}] as Label[]})
        } else if (lookahead[0].char == "BSS") {
            parsed.push({char: "BSS", labels: [{name: "_", instructions: [], directives: []}] as Label[]})
        }
        return parsed
    }
} as NonTerminal