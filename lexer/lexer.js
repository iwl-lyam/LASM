// export default function Lexer(input) {
//     let lines = input.split('\n')
//     lines.forEach(line => {
//         let seps = line.split(/(!)|(:)|(\[)|(\])|(\{)|(\})|(\,)|(\+)|(\-)|(\~\*)|(\*\~)|(~)|(    )/gim)
//         // seps.forEach(word => {
//         //     if (word != undefined) {
//         //         console.log(word)
//         //     }
//         // })  
//         console.log(seps)      
//     })

// }
import { Ident, Classify, negatives } from '../util.js'

export function Lexer(script) {
    /*console.log(script)
    console.log("END SCRIPT")*/
    let program = script.split('\n')
    let idents = []
    let str = false
    let cstr = ""
    let lcomment = false
    idents.push({ 'char': '<EOF>', 'ident': Ident.EOF })
    program.forEach((line) => {
        idents.push({ char: null, ident: Ident.NEWLINE })
        let chars = line.split(negatives)
        let comment = false
        chars.forEach((char) => {
            if (str && char != '"') {
                if (char === undefined) return
                cstr += char
                return
            }
            if (comment) return
            if (parseFloat(char) || Math.abs(parseFloat(char)) || char === 0 && char != "") {
                const payload = { 'char': char, 'ident': Ident.NUMBER }
                return idents.push(payload)
            }
            if (!char) return;
            if (char !== "*~" && lcomment) return;
            switch (char) {
                case '"':
                    str = !str
                    if (!str) {
                        idents.push({ char: cstr, ident: Ident.STRING })
                        cstr = ""
                    }
                    break;
                case '~':
                    comment = true
                    break;
                case '~*':
                    lcomment = true
                    break;
                case '*~':
                    lcomment = false
                    break;
                // NOTE: Put all tokens below here. Comments + Strings have priority.
                case '!':
                    return idents.push({ 'char': char, 'ident': Ident.BANG })
                case ',':
                    return idents.push({ 'char': char, 'ident': Ident.COMMA })
                case ':':
                    return idents.push({ 'char': char, 'ident': Ident.COLON })
                case '[':
                    return idents.push({ 'char': char, 'ident': Ident.OPEN_SQBRK })
                case ']':
                    return idents.push({ 'char': char, 'ident': Ident.CLOSE_SQBRK })
                case '{':
                    return idents.push({ 'char': char, 'ident': Ident.COMMA })

                default:
                    if (char == ' ') return;
                    const readmem = { 'char': char, 'ident': Ident.TERM }
                    return idents.push(readmem)
            }
        })
    })
    idents.push({ 'char': '<EOF>', 'ident': Ident.EOF })
    return idents
}