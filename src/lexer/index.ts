import * as moo from "moo"
import { rust } from "./rust"

export const language = {
  rust
}

export function lexer(lang: moo.Rules): moo.Lexer {
  return moo.compile(lang)
}
