import Lexer from './lexer/lexer.ts'
import Parser from './parser/parser.ts'

const parsed = Parser(Lexer(`~ LASM example code - note only 32 bits available
!section TEXT

_start:
  !entry

  mov eax, 2
  mov ebx, 2
  mov edx, 5
  mov @buf, "hello world"
  call test

test:
  mov eax,@buf
  ret
  mov eax, 4
  ~ and so on...
!section DATA
assign msg, "Hi there from LASM!",10,0
assign msg, 21
assign msg2len, 11

!section BSS
reserve buffer, 11
`))

// parsed.forEach(p => {
//   p.labels.forEach(l => {
//     console.log(l.instructions)
//   })
// })
console.log(parsed)

// console.log((Lexer(`~ LASM example code - note only 32 bits available
//   !section TEXT
//   !entry
  
//   _start:
//     mov eax, 2
//     ret ~test
  
//     mov ebx, 2
//     mov edx, 5
//     mov @buf, "hello world"
//     call test
  
//   test:
//     mov eax,@buf
//     ret
//     mov eax, 4
//     ~ and so on...
//   !section DATA
//   assign msg, "Hi there from LASM!",10,0
//   assign msg, 21
//   assign msg2len, 11
  
//   !section BSS
//   reserve buffer, 11
//   `)))
