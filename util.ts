//Ident, Classify, negatives

export const Ident = {
	BANG: 0,
    COLON: 1,
    OPEN_SQBRK: 2,
    CLOSE_SQBRK: 3,
    OPEN_CBRK: 4,
    CLOSE_CBRK: 5,
    COMMA: 6,
    ADD: 7,
    MINUS: 8,
    OPEN_LCOMMENT: 9,
    CLOSE_LCOMMENT: 10,
    COMMENT: 11,
    TAB: 12,
    NEWLINE: 13,
    MISC: 14,
    AT: 15,
    EOF: 16,
    NUMBER: 17,
    STRING: 18
}

export const negatives = /(!)|(:)|(\[)|(\])|(\{)|(\})|(\,)|(\+)|(\-)|(\~\*)|(\*\~)|(~)|(@)|(\")|(  )|(\s)/gim

export function peek(tokens: Token[], current: number, num: number) {
    let t: Token[] = []
    for (let i = 0; i < num; i++) {
        if (tokens[current + i]) t.push(tokens[current+i])
        else t.push({char: null, ident: null})
    }
    return t
}

export function active(tokens, current) {
    return tokens[current]
}

export type NonTerminal = {
    name: string,
    select(tokens: Token[], current: number, parsed: string[]): string[]
}

export type Token = {
    char: string | null,
    ident: number | null
}

export type Section = {
    char: "DATA" | "TEXT" | "BSS",
    labels: Label[]
}

export type Label = {
    instructions: Instruction[], //all instructions must within a label
    name: string,
    directives: Directive[]
}

export type Directive = {
    type: "ENTRY" // only one for now
}

export type Instruction = {
    instruction: string,
    args?: Argument[]
}

export type Argument = {
    pointer?: boolean,
    name: string,
    type: number
}
