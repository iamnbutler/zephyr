import * as Parser from "web-tree-sitter";

async function initializeTreeSitter() {
  await Parser.init();
  const parser = new Parser();
  const Lang = await Parser.Language.load('./tree-sitter/languages/rust/tree-sitter-rust.wasm');
  parser.setLanguage(Lang);
  const tree = parser.parse('let mut x = 1;');
  console.log(tree.rootNode.toString());
}

initializeTreeSitter();

// This plugin will create a code frame in the current page.
interface ZTextNode {
  value: string;
  syntaxType: ZSyntaxType;
}

type ZSyntaxType = "text" | "punctuation";

interface ZLine {
  words: ZTextNode[];
}

interface ZData {
  lines: ZLine[];
}

const fontSize = 14; // Set a static font size
const lineHeight = 20; // Set a static line height
const charWidth = 9; // The width of a single character. This will impact indent size
const numberOfSpaces = 2;
const indentSize = charWidth * numberOfSpaces;

async function main(): Promise<string | undefined> {
  // Load the "Inter Regular" font before creating any text nodes using that font
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  try {
    await figma.loadFontAsync({
      family: "Roboto Mono",
      style: "Regular",
    });
  } catch (err) {
    console.error(`Error: ${err}`);
  }

  const selection = figma.currentPage.selection;
  if (selection.length !== 1 || selection[0].type !== "TEXT") {
    console.log("Error: Please select a single text node.");
    return "Please select a single text node.";
  }

  const textNode = selection[0] as TextNode;
  const text = textNode.characters;

  console.log("Input text:", text); // Debugging statement

  const data = textToData(text);

  console.log("Converted data:", data); // Debugging statement

  if (!data) {
    console.log("Error: Could not convert selection to Data.");
    return "Could not convert selection to Data.";
  }

  const codeFrame = figma.createFrame();
  codeFrame.name = "code";
  codeFrame.layoutMode = "VERTICAL";
  codeFrame.paddingLeft = 4;
  codeFrame.paddingRight = 4;
  codeFrame.paddingTop = 4;
  codeFrame.paddingBottom = 4;
  codeFrame.primaryAxisSizingMode = "AUTO";
  codeFrame.counterAxisSizingMode = "AUTO";

  for (const line of data.lines) {
    // Create a FrameNode for the line instead of a GroupNode
    const lineFrame = figma.createFrame();
    lineFrame.name = "line";
    lineFrame.layoutMode = "HORIZONTAL";
    lineFrame.itemSpacing = 4; // Add a 4px gap between items
    lineFrame.resizeWithoutConstraints(lineFrame.width, lineHeight); // Set the height of the line frame to the static line height

    let isFirstWord = true;
    for (const word of line.words) {
      if (isFirstWord) {
        for (let i = 0; i < line.indentLevel; i++) {
          const indentFrame = createIndentFrame(); // Create an indentFrame for each indent level
          lineFrame.appendChild(indentFrame);
        }
        isFirstWord = false;
      }
      const wordFrame = createWordFrame(word);
      lineFrame.appendChild(wordFrame);
    }
    codeFrame.appendChild(lineFrame);
  }

  figma.currentPage.appendChild(codeFrame);
  figma.viewport.scrollAndZoomIntoView([codeFrame]);

  // Log the output to help debug issues
  console.log("Plugin executed successfully!");

  return undefined;
}

function createIndentFrame() {
  const frame = figma.createFrame();
  frame.resizeWithoutConstraints(indentSize, lineHeight); // Set the width and height of the indent frame
  return frame;
}

// TODO
// Import treesitter and get basic hello world working
// Get some rust code samples to use
// Find what we need to get rust bindings working with treesitter
// Connect our highlights.scm to treesitter
// Apply the correct syntaxType to out data object for each node

interface WordData {
  value: string;
  syntaxType: "text";
}

interface LineData {
  words: WordData[];
  indentLevel: number; // Add indentLevel property to LineData interface
}

interface TextData {
  lines: LineData[];
}

function textToData(text: string): TextData {
  const lines = text.split("\n");
  const data: TextData = {
    lines: [],
  };

  lines.forEach((line) => {
    const words: WordData[] = [];
    let start = 0;
    let inSpaces = true;
    let leadingSpaces = 0;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === " " && inSpaces) {
        leadingSpaces++;
        continue;
      } else {
        inSpaces = false;
      }

      if (line[i] === " " || i === line.length - 1) {
        const word = line
          .slice(start, i === line.length - 1 ? undefined : i)
          .trim();
        if (word.length > 0) {
          words.push({
            value: word,
            syntaxType: "text",
          });
        }
        start = i + 1;
      }
    }

    data.lines.push({
      words,
      indentLevel: Math.floor(leadingSpaces / numberOfSpaces), // Store indentLevel for each line instead of each word
    });
  });

  return data;
}

function createWordFrame(word: ZTextNode) {
  const { value, syntaxType } = word;

  const textNode = figma.createText();
  textNode.characters = value;
  textNode.fontName = {
    family: "Roboto Mono",
    style: "Regular",
  };
  textNode.fontSize = fontSize; // Use the static font size
  textNode.lineHeight = { value: lineHeight, unit: "PIXELS" }; // Use the static line height

  // Set the text color to light gray for punctuation nodes
  if (syntaxType === "punctuation") {
    textNode.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
  }

  const frame = figma.createFrame();
  frame.resizeWithoutConstraints(textNode.width, lineHeight); // Set the height of the text frame to the static line height
  frame.appendChild(textNode);
  return frame;
}

main().then((message: string | undefined) => {
  figma.closePlugin(message);
});
