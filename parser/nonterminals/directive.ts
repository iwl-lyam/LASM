import {Ident, peek, Token} from "../../util.ts"
import sect from "./sect.ts"

export default {
    name: "DIRECTIVE",
    select(tokens: Token[], current: number, parsed: string[]): string[] {
        const lookahead = peek(tokens, current, 1)
        if (lookahead[0].char == "entry") {
            parsed.push("entry directive")
        } else if (lookahead[0].char == "section") {
            current += 1
            parsed = sect.select(tokens, current, parsed)
        }
        return parsed
    }
}