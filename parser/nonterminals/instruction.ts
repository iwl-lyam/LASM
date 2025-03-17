import {
  Directive,
  Ident,
  Instruction,
  Label,
  peek,
  Section,
  Token,
  NonTerminal
} from "../../util.ts";
import a from "./a.ts";

export default {
  name: "INSTRUCTION",
  select(
    tokens: Token[],
    current: number,
    parsed: (Section | Directive)[]
  ): (Section | Directive)[] {
    const lookahead = peek(tokens, current, 2);
      if (lookahead[1].char === null) {
        //A = epsilon ==> no instruction arg
        // parsed.push('instruction: '+lookahead[0].char)
        // let lastParsed = parsed[parsed.length-1] as Section
        // if (lastParsed.labels[lastParsed.labels.length - 1]) {
        //     let label = lastParsed.labels[lastParsed.labels.length - 1]
        //     label.instructions.push({instruction: lookahead[0].char?.toString(), args: []} as Instruction)
        //     (parsed[parsed.length-1] as Section).labels[lastParsed.labels.length - 1] = label
        // }
        const lastParsed = parsed[parsed.length - 1];
        if (lastParsed.labels) {
          lastParsed.labels[lastParsed.labels.length - 1].instructions.push({
            instruction: lookahead[0].char,
          } as Instruction);
        }
        parsed[parsed.length - 1] = lastParsed;
      } else {
        current += 1;
        // parsed.push('instruction: '+lookahead[0].char+', with args ')
        const lastParsed = parsed[parsed.length - 1];
        if (lastParsed.labels) {
          lastParsed.labels[lastParsed.labels.length - 1].instructions.push({
            instruction: lookahead[0].char,
            args: [],
          } as Instruction);
        }
        parsed[parsed.length - 1] = lastParsed;
        parsed = a.select(tokens, current, parsed);
    }
    return parsed;
  },
} as NonTerminal
