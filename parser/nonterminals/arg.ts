import {Directive, Ident, peek, Section, Token, NonTerminal} from "../../util.ts"

export default {
    name: "ARG",
    select(tokens: Token[], current: number, parsed: (Section | Directive)[]): (Section | Directive)[] {
        const lookahead = peek(tokens, current, 2)
        // console.log(lookahead)
        if (lookahead[0].ident === Ident.AT) {
            //pointer
            // parsed[parsed.length-1] += `pointer to ${lookahead[1].char}, `
            const lastParsed = parsed[parsed.length-1];
            if (lastParsed.labels) {
                const ins = lastParsed.labels[lastParsed.labels.length-1].instructions
                if (ins[ins.length-1].args) {
                    ins[ins.length-1].args.push({pointer: true, name: lookahead[1].char, type: lookahead[1].ident});
                }
                lastParsed.labels[lastParsed.labels.length-1].instructions = ins
            }
            parsed[parsed.length-1] = lastParsed
        } else {
            const lastParsed = parsed[parsed.length-1];
            if (lastParsed.labels) {
                const ins = lastParsed.labels[lastParsed.labels.length-1].instructions
                if (ins[ins.length-1].args) {
                    ins[ins.length-1].args.push({pointer: false, name: lookahead[0].char, type: lookahead[0].ident});
                }
                lastParsed.labels[lastParsed.labels.length-1].instructions = ins
            }
            parsed[parsed.length-1] = lastParsed        
        }
        return parsed
    }
} as NonTerminal