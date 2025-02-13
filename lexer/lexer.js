export default function Lexer(input) {
    let lines = input.split('\n')
    lines.forEach(line => {
        let seps = line.split(/(!)|(:)|(\[)|(\])|(\{)|(\})|(\,)|(\+)|(\-)|(\~\*)|(\*\~)|(~)|(    )/gim)
        // seps.forEach(word => {
        //     if (word != undefined) {
        //         console.log(word)
        //     }
        // })  
        console.log(seps)      
    })
    
}