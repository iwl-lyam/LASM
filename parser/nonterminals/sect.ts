import {Ident, peek, Token} from "../../util.ts"

export default {
    name: "SECT",
    select(tokens: Token[], current: number, parsed: string[]): string[] { //only tml
        const lookahead = peek(tokens, current, 1)
        if (lookahead[0].char == "TEXT") {
            parsed.push("Text section")
        } else if (lookahead[0].char == "DATA") {
            parsed.push("Data section")
        } else if (lookahead[0].char == "BSS") {
            parsed.push("BSS section")
        }
        return parsed
    }
}