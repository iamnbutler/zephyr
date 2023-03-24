import * as moo from 'moo';

export const rust: moo.Rules = {
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

// function_call: { match: /\b([a-zA-Z_][a-zA-Z0-9_]*)(::&lt;(.*)&gt;)?\s*\(/, captureIndices: [0] },
// macro_definition: { match: /\b(macro_rules!)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\{/, captureIndices: [1] },
// function_definition: { match: /\b(fn)\s+([a-zA-Z_][a-zA-Z0-9_]*)/, captureIndices: [1] },
// type_declaration: { match: /\b(enum|struct|trait|type)\s+([a-zA-Z_][a-zA-Z0-9_]*)/, captureIndices: [0, 1] },
// implementation: { match: /\b(impl)\b/, captureIndices: [0] },
// variable_declaration: { match: /:/, end: /[=;,\)\|]/ },
