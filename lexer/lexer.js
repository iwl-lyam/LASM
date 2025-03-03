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
import { Ident, negatives } from '../util.js'

export default function Lexer(script) {
    /*console.log(script)
    console.log("END SCRIPT")*/
    let program = script.split('\n')
    let idents = []
    let str = false
    let cstr = ""
    let lcomment = false
    program.forEach((line) => {
        let lineTokens = []
        let chars = line.split(negatives)
        let comment = false
        chars.forEach((char) => {
            if (str && char != '"') {
                if (char === undefined || char === null) return
                cstr += char
                return
            }
            if (comment) return
            if (parseFloat(char) || Math.abs(parseFloat(char)) || char === 0 && char != "") {
                const payload = { 'char': char, 'ident': Ident.NUMBER }
                return lineTokens.push(payload)
            }
            if (!char) return;
            if (char !== "*~" && lcomment) return;
            if (char === null) return;
            switch (char) {
                case '"':
                    str = !str
                    if (!str) {
                        lineTokens.push({ char: cstr, ident: Ident.STRING })
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
                    return lineTokens.push({ 'char': char, 'ident': Ident.BANG })
                case ',':
                    return lineTokens.push({ 'char': char, 'ident': Ident.COMMA })
                case ':':
                    return lineTokens.push({ 'char': char, 'ident': Ident.COLON })
                case '[':
                    return lineTokens.push({ 'char': char, 'ident': Ident.OPEN_SQBRK })
                case ']':
                    return lineTokens.push({ 'char': char, 'ident': Ident.CLOSE_SQBRK })
                case '{':
                    return lineTokens.push({ 'char': char, 'ident': Ident.OPEN_CBRK })
                case '}':
                    return lineTokens.push({ 'char': char, 'ident': Ident.CLOSE_CBRK })
                case '+':
                    return lineTokens.push({ 'char': char, 'ident': Ident.ADD })
                case '-':
                    return lineTokens.push({ 'char': char, 'ident': Ident.MINUS })
                case '  ':
                    return lineTokens.push({ 'char': char, 'ident': Ident.TAB })
                case '@':
                    return lineTokens.push({ 'char': char, 'ident': Ident.AT })
                default:
                    if (char == ' ' || char == null) return;
                    const readmem = { 'char': char, 'ident': Ident.MISC }
                    return lineTokens.push(readmem)
            }
        })
        if (lineTokens.length > 0) idents.push(lineTokens)
    })
    return idents
}