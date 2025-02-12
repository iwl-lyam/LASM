# The Lyam Assembler - GCSE Project
The Lyam Assembler - Compiles LASM code into ELF x86 machine code, very fun, very fun indeed

## Syntax
idk we'll see

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

## Stage 2 - Symbolic analysis
- Group symbols together into an AST
- Set program properties following directives

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
