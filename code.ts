interface SyntaxHighlightStyle {
  [key: string]: {
    color: string;
    weight?: string;
    underline?: boolean;
    italic?: boolean;
  };
}

const syntaxStyles: SyntaxHighlightStyle = {
  comment: {
    color: "#655f6d",
  },
  "comment.doc": {
    color: "#8b8792",
  },
  primary: {
    color: "#e2dfe7",
  },
  predictive: {
    color: "#7d7786",
  },
  emphasis: {
    color: "#576dda",
  },
  "emphasis.strong": {
    color: "#576dda",
    weight: "bold",
  },
  title: {
    color: "#efecf4",
    weight: "bold",
  },
  link_uri: {
    color: "#2c9292",
    underline: true,
  },
  link_text: {
    color: "#aa573c",
    italic: true,
  },
  "text.literal": {
    color: "#aa573c",
  },
  punctuation: {
    color: "#e2dfe7",
  },
  "punctuation.bracket": {
    color: "#8b8792",
  },
  "punctuation.delimiter": {
    color: "#8b8792",
  },
  "punctuation.special": {
    color: "#bf40bf",
  },
  "punctuation.list_marker": {
    color: "#e2dfe7",
  },
  string: {
    color: "#2a9292",
  },
  "string.special": {
    color: "#bf40bf",
  },
  "string.special.symbol": {
    color: "#2a9292",
  },
  "string.escape": {
    color: "#8b8792",
  },
  "string.regex": {
    color: "#398bc6",
  },
  variant: {
    color: "#a06e3b",
  },
  type: {
    color: "#a06e3b",
  },
  variable: {
    color: "#e2dfe7",
  },
  label: {
    color: "#576dda",
  },
  tag: {
    color: "#576dda",
  },
  attribute: {
    color: "#576dda",
  },
  property: {
    color: "#be4678",
  },
  constant: {
    color: "#2c9292",
  },
  keyword: {
    color: "#955ae7",
  },
  enum: {
    color: "#aa573c",
  },
  operator: {
    color: "#8b8792",
  },
  number: {
    color: "#aa573c",
  },
  boolean: {
    color: "#2c9292",
  },
  function: {
    color: "#576ddb",
  },
  preproc: {
    color: "#efecf4",
  },
  embedded: {
    color: "#efecf4",
  },
  "function.method": {
    color: "#576ddb",
  },
  "function.special.definition": {
    color: "#a06e3b",
  },
  "variable.special": {
    color: "#955ae7",
  },
};

type HighlightType =
  | "operator"
  | "string"
  | "variable"
  | "punctuation.delimiter"
  | "punctuation.bracket"
  | "property"
  | "type"
  | "keyword"
  | null;

interface ZedHighlightNode {
  text: string;
  highlight: HighlightType;
}

type ZedHighlightArray = ZedHighlightNode[][];

const code: ZedHighlightArray = [
  [
    {
      text: "const",
      highlight: "keyword",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: "syntaxStyles",
      highlight: "variable",
    },
    {
      text: ":",
      highlight: "punctuation.delimiter",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: "SyntaxHighlightStyle",
      highlight: "type",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: "=",
      highlight: "operator",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: "{",
      highlight: "punctuation.bracket",
    },
  ],
  [
    {
      text: "  ",
      highlight: null,
    },
    {
      text: '"comment"',
      highlight: "string",
    },
    {
      text: ":",
      highlight: "punctuation.delimiter",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: "{",
      highlight: "punctuation.bracket",
    },
  ],
  [
    {
      text: "    ",
      highlight: null,
    },
    {
      text: '"color"',
      highlight: "string",
    },
    {
      text: ":",
      highlight: "punctuation.delimiter",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: '"#655f6d"',
      highlight: "string",
    },
  ],
  [
    {
      text: "  ",
      highlight: null,
    },
    {
      text: "}",
      highlight: "punctuation.bracket",
    },
    {
      text: ",",
      highlight: "punctuation.delimiter",
    },
  ],
  [
    {
      text: "  ",
      highlight: null,
    },
    {
      text: '"comment.doc"',
      highlight: "string",
    },
    {
      text: ":",
      highlight: "punctuation.delimiter",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: "{",
      highlight: "punctuation.bracket",
    },
  ],
  [
    {
      text: "    ",
      highlight: null,
    },
    {
      text: '"color"',
      highlight: "string",
    },
    {
      text: ":",
      highlight: "punctuation.delimiter",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: '"#8b8792"',
      highlight: "string",
    },
  ],
  [
    {
      text: "  ",
      highlight: null,
    },
    {
      text: "}",
      highlight: "punctuation.bracket",
    },
    {
      text: ",",
      highlight: "punctuation.delimiter",
    },
  ],
  [
    {
      text: "  ",
      highlight: null,
    },
    {
      text: '"primary"',
      highlight: "string",
    },
    {
      text: ":",
      highlight: "punctuation.delimiter",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: "{",
      highlight: "punctuation.bracket",
    },
  ],
  [
    {
      text: "    ",
      highlight: null,
    },
    {
      text: '"color"',
      highlight: "string",
    },
    {
      text: ":",
      highlight: "punctuation.delimiter",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: '"#e2dfe7"',
      highlight: "string",
    },
  ],
  [
    {
      text: "  ",
      highlight: null,
    },
    {
      text: "}",
      highlight: "punctuation.bracket",
    },
    {
      text: ",",
      highlight: "punctuation.delimiter",
    },
  ],
  [
    {
      text: "  ",
      highlight: null,
    },
    {
      text: '"predictive"',
      highlight: "string",
    },
    {
      text: ":",
      highlight: "punctuation.delimiter",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: "{",
      highlight: "punctuation.bracket",
    },
  ],
  [
    {
      text: "    ",
      highlight: null,
    },
    {
      text: '"color"',
      highlight: "string",
    },
    {
      text: ":",
      highlight: "punctuation.delimiter",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: '"#7d7786"',
      highlight: "string",
    },
  ],
  [
    {
      text: "  ",
      highlight: null,
    },
    {
      text: "}",
      highlight: "punctuation.bracket",
    },
    {
      text: ",",
      highlight: "punctuation.delimiter",
    },
  ],
  [
    {
      text: "  ",
      highlight: null,
    },
    {
      text: '"emphasis"',
      highlight: "string",
    },
    {
      text: ":",
      highlight: "punctuation.delimiter",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: "{",
      highlight: "punctuation.bracket",
    },
  ],
  [
    {
      text: "    ",
      highlight: null,
    },
    {
      text: '"color"',
      highlight: "string",
    },
    {
      text: ":",
      highlight: "punctuation.delimiter",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: '"#576dda"',
      highlight: "string",
    },
  ],
  [
    {
      text: "  ",
      highlight: null,
    },
    {
      text: "}",
      highlight: "punctuation.bracket",
    },
  ],
];

const FONT_SIZE = 14; // Set a static font size
const LINE_HEIGHT = 20; // Set a static line height
const CHAR_WIDTH = 9; // The width of a single character. This will impact indent size
const NUMBER_OF_SPACES_IN_INDENT = 2;
const INDENT_FRAME_WIDTH = CHAR_WIDTH * NUMBER_OF_SPACES_IN_INDENT;

function createIndentFrame() {
  const frame = figma.createFrame();
  // Remove default white fill
  frame.fills = [];
  frame.resizeWithoutConstraints(INDENT_FRAME_WIDTH, LINE_HEIGHT); // Set the width and height of the indent frame
  return frame;
}

function createLine(line: ZedHighlightNode[]): FrameNode {
  const lineFrame = figma.createFrame();
  lineFrame.layoutMode = "HORIZONTAL";
  lineFrame.name = "line";
  lineFrame.primaryAxisSizingMode = "AUTO";
  lineFrame.counterAxisSizingMode = "AUTO";
  lineFrame.itemSpacing = 2;
  // Remove default white fill
  lineFrame.fills = [];

  for (const node of line) {
    if (
      node.highlight === null &&
      node.text.includes(" ") &&
      line.indexOf(node) === 0
    ) {
      const spacesCount = node.text.length;
      const indentLevels = spacesCount / NUMBER_OF_SPACES_IN_INDENT;
      for (let i = 0; i < indentLevels; i++) {
        const indentFrame = createIndentFrame();
        lineFrame.appendChild(indentFrame);
      }
    } else {
      const wordFrame = createWordFrame(node);
      lineFrame.appendChild(wordFrame);
    }
  }

  return lineFrame;
}

function createWordFrame(node: ZedHighlightNode) {
  const textNode = figma.createText();
  textNode.characters = node.text;
  textNode.fontName = {
    family: "Roboto Mono",
    style: "Regular",
  };
  textNode.fontSize = FONT_SIZE;
  textNode.lineHeight = { value: LINE_HEIGHT, unit: "PIXELS" };

  // Apply styling based on node.highlight
  if (node.highlight && syntaxStyles[node.highlight]) {
    const style = syntaxStyles[node.highlight];
    textNode.fills = [{ type: "SOLID", color: parseColor(style.color) }];

    if (style.weight) {
      textNode.fontName = {
        family: "Roboto Mono",
        style: style.weight === "bold" ? "Bold" : "Regular",
      };
    }

    if (style.underline) {
      textNode.textDecoration = "UNDERLINE";
    }

    // if (style.italic) {
    //   textNode.italic = true;
    // }
  }

  const frame = figma.createFrame();
  // Remove default white fill
  frame.fills = [];
  frame.name = node.highlight !== null ? node.highlight : "null";
  frame.resizeWithoutConstraints(
    textNode.width <= 0 ? 1 : textNode.width,
    LINE_HEIGHT
  );
  frame.appendChild(textNode);
  return frame;
}

// Helper function to convert a CSS color string to a Figma color object
function parseColor(color: string): RGB {
  const hex = color.substring(1);
  const bigint = parseInt(hex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  return { r, g, b };
}

async function main(): Promise<string | undefined> {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  try {
    console.log("Loading font...");
    await figma.loadFontAsync({
      family: "Roboto Mono",
      style: "Regular",
    });
    await figma.loadFontAsync({
      family: "Roboto Mono",
      style: "Bold",
    });
    console.log("Font loaded.");

    const codeFrame = figma.createFrame();
    codeFrame.name = "code";
    codeFrame.layoutMode = "VERTICAL";
    codeFrame.primaryAxisSizingMode = "AUTO";
    codeFrame.counterAxisSizingMode = "AUTO";
    codeFrame.paddingLeft = 4;
    codeFrame.paddingRight = 4;
    codeFrame.paddingTop = 4;
    codeFrame.paddingBottom = 4;
    codeFrame.itemSpacing = 0;
    codeFrame.fills = [{ type: "SOLID", color: parseColor("#19171C") }];

    let totalHeight = 0;

    for (const line of code) {
      const lineFrame = createLine(line);
      lineFrame.resize(lineFrame.width, LINE_HEIGHT); // Set lineFrame height to LINE_HEIGHT
      totalHeight += LINE_HEIGHT;
      codeFrame.appendChild(lineFrame);
    }

    codeFrame.resize(codeFrame.width, totalHeight); // Set the codeFrame height to totalHeight

    figma.currentPage.appendChild(codeFrame);
    figma.viewport.scrollAndZoomIntoView([codeFrame]);

    console.log("Plugin executed successfully!");

    return undefined;
  } catch (err) {
    console.error(`Error: ${err}`);
  } finally {
    figma.closePlugin();
  }
}

main();
