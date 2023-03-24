import * as moo from 'moo';

export interface ErrorRule {
  error: true;
}

export interface FallbackRule {
  fallback: true;
}

export type TypeMapper = (x: string) => string;

export interface Rule {
  match?: RegExp | string | string[] | undefined;
  lineBreaks?: boolean | undefined;
  push?: string | undefined;
  pop?: number | undefined;
  next?: string | undefined;
  error?: true | undefined;
  value?: ((x: string) => string) | undefined;
  type?: TypeMapper | undefined;
}
export interface Rules {
  [x: string]: RegExp | string | string[] | Rule | Rule[] | ErrorRule | FallbackRule;
}

export interface Lexer {
  formatError(token: Token, message?: string): string;
  has(tokenType: string): boolean;
  next(): Token | undefined;
  reset(chunk?: string, state?: LexerState): this;
  save(): LexerState;
  pushState(state: string): void;
  popState(): void;
  setState(state: string): void;

  [Symbol.iterator](): Iterator<Token>;
}

export interface Token {
  toString(): string;
  type?: string | undefined;
  value: string;
  offset: number;
  text: string;
  lineBreaks: number;
  line: number;
  col: number;
}

export interface LexerState {
  line: number;
  col: number;
  state: string;
}


const fontSize = 14;
const lineHeight = 20;
const charWidth = 9;
const numberOfSpaces = 4;
const indentSize = charWidth * numberOfSpaces;

const staticText = `impl gpui::View for TextView {
  fn ui_name() -> & 'static str {
    "View"
  }
  
  fn render(& mut self, _: & mut gpui:: RenderContext<Self>) -> gpui::ElementBox {
    TextElement.boxed()
  }
}
`
const rust: moo.Rules = {
  whitespace: { match: /[ \t]+/, lineBreaks: true },
  newline: { match: /\n/, lineBreaks: true },
  comment: /\/\/.*?$/,
  string: /["](?:\\[\s\S]|[^"\\])*["]|'(?:\\[\s\S]|[^'\\])*'/,
  number: /(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/,
  keyword: [
    'fn', 'let', 'const', 'mut', 'struct', 'enum', 'type', 'impl', 'trait', 'pub', 'crate', 'self', 'super', 'use', 'mod', 'extern', 'ref', 'for', 'break', 'continue', 'do', 'else', 'if', 'in', 'loop', 'match', 'return', 'while', 'async', 'await', 'dyn', 'priv', 'proc', 'move',
  ],
  type_annotation: /[a-zA-Z_][a-zA-Z0-9_]*::[a-zA-Z_][a-zA-Z0-9_]*/,
  lifetime: /&(?:'?[a-zA-Z_][a-zA-Z0-9_]*|static)\b/,
  generic_type: /[a-zA-Z_][a-zA-Z0-9_]*<(?:[^<>(),]*|(?:\([^()]*\)))*>/,
  identifier: /[a-zA-Z_][a-zA-Z0-9_]*/,
  punctuation: /[{}()[\],:;]/,
  operator: /[-+*/%!&|^]=?|<<?=?|>>?=?|&&?|\|\|?|=/,
  constant: /\b(?:true|false|Some|None|Ok|Err)\b/,
  storage_modifier: /\b(?:const|static|priv|pub)\b/,
  macro: /\b(?:log|error|warn|info|debug|log_enabled|fail|assert|assert_eq|unreachable|unimplemented|format|write|writeln|print|println|local_data_key|try|vec|select)!\b/,
};

const rustLexer = moo.compile(rust)

const syntaxTree = [];
let currentLine = 1;
let currentIndent = 0;

const lines = staticText.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lineIndent = line.search(/\S/);
  if (lineIndent === -1) continue;

  const nodes = [];
  const tokens = rustLexer.reset(line);
  for (const token of tokens) {
    const tokenValue = token.value.trim();
    if (!tokenValue) continue;

    const syntaxType = token.type;
    const value = tokenValue;
    nodes.push({ syntaxType, value });
  }

  if (nodes.length > 0) {
    if (lineIndent > currentIndent) {
      throw new Error(`Invalid indentation on line ${i + 1}`);
    } else if (lineIndent < currentIndent) {
      while (syntaxTree.length > 0 && syntaxTree[syntaxTree.length - 1].lineIndent >= lineIndent) {
        syntaxTree.pop();
      }
    }

    syntaxTree.push({ lineIndent, nodes });
    currentIndent = lineIndent;
    currentLine = i + 1;
  }
}

if (syntaxTree.length === 0) {
  throw new Error('No code found');
}

console.log(syntaxTree)
// const code = syntaxTree.map(({ nodes }) => ({ lineIndent: nodes[0].line, nodes }));