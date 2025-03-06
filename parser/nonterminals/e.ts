import {Ident, peek, Token} from "../../util.ts"
import directive from "./directive.ts"
import instruction from "./instruction.ts"

export default {
    name: "E",
    select(tokens: Token[], current: number, parsed: string[] = []): string[] { // only ntml E can ommit parsed (S->E)
        const lookahead = peek(tokens, current, 3)
        if (lookahead[0].ident == Ident.BANG) {
            // directive
            // parsed.push("bang")
            current += 1
            parsed = directive.select(tokens, current, parsed)
        } else if (lookahead[0].ident == Ident.MISC && lookahead[1].ident == Ident.COLON) {
            // label
            parsed.push("label: "+lookahead[0].char)
        } else if (lookahead[0].ident == Ident.TAB) {
            current += 1
            parsed = this.select(tokens, current)
        } else {
            // instruction
            parsed = instruction.select(tokens, current, parsed)
        }
        return parsed
    }
}