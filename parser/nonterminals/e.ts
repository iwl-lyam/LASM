import {Directive, Ident, Label, peek, Token, Section, NonTerminal} from "../../util.ts"
import directive from "./directive.ts"
import instruction from "./instruction.ts"

export default {
    name: "E",
    select(tokens: Token[], current: number, parsed: (Section | Directive)[] = []): (Section | Directive)[] { // only ntml E can ommit parsed (S->E)
        const lookahead = peek(tokens, current, 3)
        // console.log(parsed)
        if (lookahead[0].ident == Ident.BANG) {
            // directive
            // parsed.push("bang")
            current += 1
            parsed = directive.select(tokens, current, parsed)
        } else if (lookahead[0].ident == Ident.MISC && lookahead[1].ident == Ident.COLON) {
            // label
            // parsed.push("label: "+lookahead[0].char)
            const lastParsed = parsed[parsed.length - 1];
            // console.log("its an array")
            if (Array.isArray((lastParsed as Section).labels)) {
                (lastParsed as Section).labels.push({name: lookahead[0].char, instructions: [], directives: []} as Label)
            }
            parsed[parsed.length - 1] = lastParsed
        } else if (lookahead[0].ident == Ident.TAB) {
            current += 1
            parsed = this.select(tokens, current, parsed)
        } else if (lookahead[0].ident == Ident.MISC) {
            // instruction
            parsed = instruction.select(tokens, current, parsed)
        }
        return parsed
    }
} as NonTerminal