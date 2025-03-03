import {Ident, peek} from "../../util.js"
import directive from "./directive.js"

export default {
    name: "E",
    select(tokens, current, parsed=[]) { // only ntml E can ommit parsed (S->E)
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
            parsed.push("instruction: "+lookahead[0].char)
        }
        return parsed
    }
}