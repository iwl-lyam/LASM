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

export function peek(tokens, current, num) {
    let t = []
    for (let i = 0; i < num; i++) {
        if (tokens[current + i]) t.push(tokens[current+i])
        else t.push({char: null, ident: null})
    }
    return t
}

export function active(tokens, current) {
    return tokens[current]
}
