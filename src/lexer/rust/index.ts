import * as moo from 'moo';

export const rust: moo.Rules = {
  whitespace: { match: /[ \t]+/, lineBreaks: true },
  newline: { match: /\n/, lineBreaks: true },
  comment: /\/\/.*?$/,
  string: /["](?:\\[\s\S]|[^"\\])*["]|'(?:\\[\s\S]|[^'\\])*'/,
  number: /(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/,
  keyword: [
    'fn', 'let', 'const', 'mut', 'struct', 'enum', 'type', 'impl', 'trait', 'pub', 'crate', 'self', 'super', 'use', 'mod', 'extern', 'ref', 'for',
  ],
  type_annotation: /[a-zA-Z_][a-zA-Z0-9_]*::[a-zA-Z_][a-zA-Z0-9_]*/,
  lifetime: /&'?[a-zA-Z_][a-zA-Z0-9_]*\b/,
  generic_type: /[a-zA-Z_][a-zA-Z0-9_]*<[^<>]+>/,
  identifier: /[a-zA-Z_][a-zA-Z0-9_]*/,
  punctuation: /[{}()[\],:;]/,
  operator: /[-+*/%!&|^]=?|<<?=?|>>?=?|&&?|\|\|?|=/,
}
