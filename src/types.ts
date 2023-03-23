export type SyntacticCategory =
  | GeneralCategory
  | TypeCategory
  | VariableCategory
  | FunctionCategory
  | PunctuationCategory
  | LiteralCategory
  | CommentCategory
  | RustSpecificCategory
  | TypeScriptSpecificCategory;

type GeneralCategory =
  // Identifiers like variable names, function names, etc.
  // Example: let myVariable = 42;
  | "identifier"

  // Language keywords
  // Example: if, else, for, while, etc.
  | "keyword"

  // Operators like +, -, *, /, etc.
  // Example: a + b
  | "operator"

  // Expressions like function calls, arithmetic expressions, etc.
  // Example: a + b * (c - d)
  | "expression"

  // Statements like if, for, while, etc.
  // Example: if (condition) { /* ... */ }
  | "statement"

  // Code blocks enclosed in curly braces
  // Example: { /* ... */ }
  | "block"

  // Class definitions
  // Example: class MyClass { /* ... */ }
  | "class"

  // Method definitions inside classes
  // Example: class MyClass { myMethod() { /* ... */ } }
  | "method"

  // Constructor definitions inside classes
  // Example: class MyClass { constructor() { /* ... */ } }
  | "constructor"

  // Class field definitions
  // Example: class MyClass { myField: string; }
  | "field"

  // Annotations like @Override in Java
  // Example: @Override public void myMethod() { /* ... */ }
  | "annotation"

  // Module definitions
  // Example: module MyModule { /* ... */ }
  | "module"

  // Import statements
  // Example: import { MyComponent } from './my-component';
  | "import"

  // Decorators like @Component in Angular
  // Example: @Component({ /* ... */ }) class MyComponent { /* ... */ }
  | "decorator"

  // Object properties
  // Example: const obj = { myProperty: 42 };
  | "property"

  // Enum definitions
  // Example: enum Colors { Red, Green, Blue }
  | "enum"

  // Delegate definitions in C#
  // Example: delegate void MyDelegate(int x, int y);
  | "delegate"

  // Namespace definitions
  // Example: namespace MyNamespace { /* ... */ }
  | "namespace"

  // Struct definitions in C#
  // Example: struct MyStruct { /* ... */ }
  | "struct"

  // Union definitions in C
  // Example: union MyUnion { /* ... */ }
  | "union"

  // Constants like PI, MAX_VALUE, etc.
  // Example: const MAX_VALUE = 100;
  | "constant"

  // Symbol definitions
  // Example: const mySymbol = Symbol('mySymbol');
  | "symbol"

  // Protocol definitions in Swift
  // Example: protocol MyProtocol { /* ... */ }
  | "protocol"

  // Extension definitions in Swift
  // Example: extension MyType: MyProtocol { /* ... */ }
  | "extension"

  // Trait definitions in Rust
  // Example: trait MyTrait { /* ... */ }
  | "trait"

  // Implementations of traits in Rust
  // Example: impl MyTrait for MyType { /* ... */ }
  | "impl"

  // Trait definitions in Rust
  // Example: trait MyTrait { /* ... */ }
  | "trait";

type TypeCategory =
  // Custom user-defined types, e.g., classes, structs, or type aliases
  // Example: type Point = { x: number; y: number; };
  | "type"

  // Built-in types like string, number, boolean, etc.
  // Example: const myString: string = 'hello';
  | "type.builtin"

  // Interface definitions
  // Example: interface MyInterface { myMethod(): void; };
  | "interface";

type VariableCategory = "variable" | "variable.special";

type FunctionCategory =
  // Regular functions and methods
  // Example: function myFunction() { }
  | "function"

  // Methods inside a class, interface, or trait
  // Example: class MyClass { myMethod() { } }
  | "function.method"

  // Function definitions, where the function is being declared
  // Example: function myFunction() { }
  | "function.definition"

  // Special functions such as constructors, destructors, or macro invocations
  // Example: constructor() { }
  | "function.special"

  // Special function definitions, where the special function is being declared
  // Example: (Python) __init__(self, x, y):
  | "function.special.definition";

type PunctuationCategory = "punctuation.bracket";

type LiteralCategory = "string" | "number";

type CommentCategory = "comment";

// Language Specific

type RustSpecificCategory =
  // Rust macro invocations
  // Example: println!("Hello, world!");
  | "macro"

  // Rust macro definitions
  // Example: macro_rules! my_macro { /* ... */ }
  | "macro.definition"

  // Rust lifetime annotations
  // Example: fn foo<'a>(x: &'a i32) {}
  | "lifetime"

  // Rust lifetime parameter definitions
  // Example: struct MyStruct<'a> { x: &'a i32 }
  | "lifetime.definition"

  // Rust attributes
  // Example: #[derive(Debug)] struct MyStruct { /* ... */ }
  | "attribute";

type TypeScriptSpecificCategory =
  // TypeScript type aliases
  // Example: type MyAlias = string | number;
  | "type.alias"

  // TypeScript type assertions
  // Example: const x = <number>someValue;
  | "type.assertion"

  // TypeScript type annotations
  // Example: let x: number = 42;
  | "type.annotation";

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
