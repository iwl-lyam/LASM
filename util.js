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
    TERM: 14,
    AT: 15
}

export const negatives = /(!)|(:)|(\[)|(\])|(\{)|(\})|(\,)|(\+)|(\-)|(\~\*)|(\*\~)|(~)|(@)|(    )/gim