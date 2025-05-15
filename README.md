# The Lyam Assembler - GCSE Project
The Lyam Assembler - Compiles LASM code into ELF x86 machine code, very fun, very fun indeed. I use Deno but I'm sure other runtimes will also work. I am extremely proud of this parser!! Scribbles of a person who found out about the dragon book.

## Syntax
```
~ LASM example code - note only 32 bits available
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
assign msg, "Hi there from LASM!",10,0
assign msg, 21
assign msg2len, 11

!section BSS
reserve buffer, 11
```

### Grammar formal definition
```md
S -> E
E -> INDENT | DIRECTIVE | INSTRUCTION | LABEL
INDENT -> "  "E
DIRECTIVE -> ! entry | ! section SECT
SECT -> <TEXT> | <DATA> | <BSS>
INSTRUCTION -> <INS> A
A -> ARG | ARG , A | epsilon
ARG -> @ <ARG> | <ARG>
LABEL -> <LABEL> : MEM | <LABEL>
MEM -> <MEMTYPE> <BYTES> | <MEMTYPE> STRING
STRING -> <STR> | <STR> , STRING | <NUM> | <NUM> , STRING
```

Where _custom_ terminals are in brackets. Tokens are separated by spaces for clarification.

## Stage 1 - Lexical analysis
Tokens:
- TAB
- ! (directive)
- reserve
- import
- export
- entry
- :
- [ (square brackets are banned)
- ]
- {
- }
- ,
- \+
- \-
- @
- ~ (comment)
- ~* (mult comment open)
- *~ (mult comment close)

## Stage 2 - parsing
- Recursive descent parser

## Stage 3 - Compiling
- Loop through mnemonics
  - Validate all mnemonics (i.e. name, arguments (types/amount), operation)
  - Generate bytecode based on the mnemonic
  - Add square brackets around each symbol name used
  - Put the bytecode onto the AST

## Stage 4 - Code generation
- ELF format magic
- Split program into pairs, length of the generated list is the program segment size
- Generate headers and add to program
- Output to file
