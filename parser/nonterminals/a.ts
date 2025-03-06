import {Ident, peek, Token} from "../../util.ts"
import arg from './arg.ts'

export default {
    name: "A",
    select(tokens: Token[], current: number, parsed: string[]): string[] {
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