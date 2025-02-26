import Lexer from './lexer/lexer.js'

console.log(Lexer(`~ LASM example code - note only 32 bits available
!section TEXT

!entry
_start:
  mov eax, 2
  mov ebx, 2
  mov edx, 5
  mov @buf, "hello world"

  mov eax, 4
  ~ and so on...

!section DATA
msg: assign "Hi there from LASM!",10,0
msglen: assign 21
msg2len: assign 11

!section BSS
buffer: reserve 11`))