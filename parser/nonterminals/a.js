import {Ident, peek} from "../../util.js"
import arg from './arg.js'

export default {
    name: "A",
    select(tokens, current, parsed) {
        let lookahead = peek(tokens, current, 3)
        if (lookahead[1].ident == Ident.COMMA || lookahead[2].ident == Ident.COMMA) {
            // multi argument
            parsed = arg.select(tokens, current, parsed) 
            current += (lookahead[2].ident == Ident.COMMA ? 3 : 2)
            parsed = this.select(tokens, current, parsed)
        } else if (lookahead[0].char === null) {
            return parsed
        } else {
            // single argument
            parsed = arg.select(tokens, current, parsed) 
        }

        return parsed
    }
}