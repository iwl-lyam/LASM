import {Ident, peek} from "../../util.js"
import sect from "./sect.js"

export default {
    name: "DIRECTIVE",
    select(tokens, current, parsed) {
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