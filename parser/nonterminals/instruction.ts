import {Ident, peek, Token} from "../../util.ts"
import a from './a.ts'

export default {
    name: "INSTRUCTION",
    select(tokens: Token[], current: number, parsed: string[]): string[] {
        const lookahead = peek(tokens, current, 2)
        if (lookahead[1].char === null) {
            //A = epsilon ==> no instruction arg
            parsed.push('instruction: '+lookahead[0].char)
        } else {
            current += 1
            parsed.push('instruction: '+lookahead[0].char+', with args ')
            parsed = a.select(tokens, current, parsed)
        }
        return parsed
    }
}