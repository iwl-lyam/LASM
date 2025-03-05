import {Ident, peek} from "../../util.js"

export default {
    name: "ARG",
    select(tokens, current, parsed) {
        const lookahead = peek(tokens, current, 2)
        // console.log(lookahead)
        if (lookahead[0].ident === Ident.AT) {
            //pointer
            parsed[parsed.length-1] += `pointer to ${lookahead[1].char}, `
        } else {
            parsed[parsed.length-1] += `${lookahead[0].char}, `
        }
        return parsed
    }
}