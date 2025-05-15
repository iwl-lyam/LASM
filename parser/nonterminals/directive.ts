import {Directive, Ident, peek, Section, Token, NonTerminal} from "../../util.ts"
import sect from "./sect.ts"

export default {
    name: "DIRECTIVE",
    select(tokens: Token[], current: number, parsed: (Section | Directive)[]): (Section | Directive)[] {
        const lookahead = peek(tokens, current, 1)
        if (lookahead[0].char == "entry") {
            const lastParsed = parsed[parsed.length - 1] as Section;
            if (lastParsed.labels && lastParsed.char === "TEXT") {
                lastParsed.labels[lastParsed.labels.length - 1].directives.push({type: "ENTRY"});
            }
            parsed[parsed.length - 1] = lastParsed;
        } else if (lookahead[0].char == "section") {
            current += 1
            parsed = sect.select(tokens, current, parsed)
        }
        return parsed
    }
} as NonTerminal