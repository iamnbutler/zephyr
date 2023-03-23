export type SyntacticCategory =
  | "identifier"
  | "keyword"
  | "literal"
  | "operator"
  | "expression"
  | "statement"
  | "block"
  | "class"
  | "interface"
  | "method"
  | "constructor"
  | "field"
  | "annotation"
  | "module"
  | "import"
  | "decorator"
  | "property"
  | "enum"
  | "delegate"
  | "namespace"
  | "struct"
  | "union"
  | "constant"
  | "symbol"
  | "protocol"
  | "extension"
  | "trait";

export interface SyntaxColors {
  module: string;
  import_statement: string;
  name: string;
  dotted_name: string;
  identifier: string;
  function_definition: string;
  parameters: string;
  body: string;
  block: string;
  expression_statement: string;
  assignment: string;
  for_statement: string;
  pattern_list: string;
  call: string;
  attribute: string;
  arguments: string;
  argument_list: string;
  comment: string;
  if_statement: string;
  condition: string;
  consequence: string;
  comparison_operator: string;
  augmented_assignment: string;
  string: string;
  interpolation: string;
  escape_sequence: string;
  binary_operator: string;
  parenthesized_expression: string;
  integer: string;
  return_statement: string;
}
