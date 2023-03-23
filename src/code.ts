const fontSize = 14;
const lineHeight = 20;
const charWidth = 9;
const numberOfSpaces = 2;
const indentSize = charWidth * numberOfSpaces;

const syntaxTree = `source_file [0, 0] - [9, 0]
  impl_item [0, 0] - [8, 1]
    trait: scoped_type_identifier [0, 5] - [0, 15]
      path: identifier [0, 5] - [0, 9]
      name: type_identifier [0, 11] - [0, 15]
    type: type_identifier [0, 20] - [0, 28]
    body: declaration_list [0, 29] - [8, 1]
      function_item [1, 4] - [3, 5]
        name: identifier [1, 7] - [1, 14]
        parameters: parameters [1, 14] - [1, 16]
        return_type: reference_type [1, 20] - [1, 32]
          lifetime [1, 21] - [1, 28]
            identifier [1, 22] - [1, 28]
          type: primitive_type [1, 29] - [1, 32]
        body: block [1, 33] - [3, 5]
          string_literal [2, 8] - [2, 14]
      function_item [5, 4] - [7, 5]
        name: identifier [5, 7] - [5, 13]
        parameters: parameters [5, 13] - [5, 59]
          self_parameter [5, 14] - [5, 23]
            mutable_specifier [5, 15] - [5, 18]
            self [5, 19] - [5, 23]
          parameter [5, 25] - [5, 58]
            type: reference_type [5, 28] - [5, 58]
              mutable_specifier [5, 29] - [5, 32]
              type: generic_type [5, 33] - [5, 58]
                type: scoped_type_identifier [5, 33] - [5, 52]
                  path: identifier [5, 33] - [5, 37]
                  name: type_identifier [5, 39] - [5, 52]
                type_arguments: type_arguments [5, 52] - [5, 58]
                  type_identifier [5, 53] - [5, 57]
        return_type: scoped_type_identifier [5, 63] - [5, 79]
          path: identifier [5, 63] - [5, 67]
          name: type_identifier [5, 69] - [5, 79]
        body: block [5, 80] - [7, 5]
          call_expression [6, 8] - [6, 27]
            function: field_expression [6, 8] - [6, 25]
              value: identifier [6, 8] - [6, 19]
              field: field_identifier [6, 20] - [6, 25]
            arguments: arguments [6, 25] - [6, 27]`;

async function main(): Promise<string | undefined> {
  await loadFont();
  const textNode = await getSelectedTextNode();
  const text = textNode.characters;
  const data = treeToData(syntaxTree, text);
  const codeFrame = createCodeFrame(data);
  figma.currentPage.appendChild(codeFrame);
  figma.viewport.scrollAndZoomIntoView([codeFrame]);
  console.log("Plugin executed successfully!");
  return undefined;
}

async function loadFont() {
  try {
    await figma.loadFontAsync({
      family: "Roboto Mono",
      style: "Regular",
    });
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

async function getSelectedTextNode(): Promise<TextNode> {
  const selection = figma.currentPage.selection;
  if (selection.length !== 1 || selection[0].type !== "TEXT") {
    console.log("Error: Please select a single text node.");
    throw new Error("Please select a single text node.");
  }
  return selection[0] as TextNode;
}

function treeToData(tree: string, text: string): TextData {
  const data: TextData = {
    lines: [],
  };

  // Split the tree string into lines
  const treeLines = tree.split("\n");

  // Process each line in the tree
  for (const treeLine of treeLines) {
    const match = treeLine.match(/^\s*([^\s]+) \[([\d, ]+)\]/);

    if (!match) {
      continue;
    }

    const [_, type, rangeStr] = match;
    const [startRow, startCol, endRow, endCol] = rangeStr
      .split(", ")
      .map((n) => parseInt(n, 10));

    // Extract the corresponding text from the source
    const sourceLines = text.split("\n").slice(startRow, endRow + 1);
    if (startRow === endRow) {
      sourceLines[0] = sourceLines[0].slice(startCol, endCol);
    } else {
      sourceLines[0] = sourceLines[0].slice(startCol);
      sourceLines[sourceLines.length - 1] = sourceLines[
        sourceLines.length - 1
      ].slice(0, endCol);
    }

    const sourceText = sourceLines.join("\n");

    // Convert the source text to words and add them to the TextData structure
    const words: WordData[] = [
      {
        value: sourceText,
        syntaxType: type === "identifier" ? "text" : "punctuation",
      },
    ];

    const indentLevel = startCol / numberOfSpaces;
    data.lines.push({
      words,
      indentLevel,
    });
  }

  return data;
}

function createCodeFrame(data: TextData): FrameNode {
  const codeFrame = figma.createFrame();
  setCodeFrameProperties(codeFrame);

  for (const line of data.lines) {
    const lineFrame = createLineFrame(line);
    codeFrame.appendChild(lineFrame);
  }
  return codeFrame;
}

function setCodeFrameProperties(codeFrame: FrameNode) {
  codeFrame.name = "code";
  codeFrame.layoutMode = "VERTICAL";
  codeFrame.paddingLeft = 4;
  codeFrame.paddingRight = 4;
  codeFrame.paddingTop = 4;
  codeFrame.paddingBottom = 4;
  codeFrame.primaryAxisSizingMode = "AUTO";
  codeFrame.counterAxisSizingMode = "AUTO";
}

function createLineFrame(line: LineData): FrameNode {
  const lineFrame = figma.createFrame();
  setLineFrameProperties(lineFrame);

  let isFirstWord = true;
  for (const word of line.words) {
    if (isFirstWord) {
      addIndentFrames(lineFrame, line.indentLevel);
      isFirstWord = false;
    }
    const wordFrame = createWordFrame(word);
    lineFrame.appendChild(wordFrame);
  }
  return lineFrame;
}

function setLineFrameProperties(lineFrame: FrameNode) {
  lineFrame.name = "line";
  lineFrame.layoutMode = "HORIZONTAL";
  lineFrame.itemSpacing = 4;
  lineFrame.resizeWithoutConstraints(lineFrame.width, lineHeight);
}

function addIndentFrames(lineFrame: FrameNode, indentLevel: number) {
  for (let i = 0; i < indentLevel; i++) {
    const indentFrame = createIndentFrame();
    lineFrame.appendChild(indentFrame);
  }
}

function createIndentFrame(): FrameNode {
  const frame = figma.createFrame();
  frame.resizeWithoutConstraints(indentSize, lineHeight);
  return frame;
}

interface WordData {
  value: string;
  syntaxType: "text" | "punctuation";
}

interface LineData {
  words: WordData[];
  indentLevel: number;
}

interface TextData {
  lines: LineData[];
}

function createWordFrame(word: WordData): FrameNode {
  const { value, syntaxType } = word;

  const textNode = figma.createText();
  setTextNodeProperties(textNode, value, syntaxType);

  const frame = figma.createFrame();
  setFrameProperties(frame, textNode);
  frame.appendChild(textNode);
  return frame;
}

function setTextNodeProperties(textNode: TextNode, value: string, syntaxType: "text" | "punctuation") {
  textNode.characters = value;
  textNode.fontName = {
    family: "Roboto Mono",
    style: "Regular",
  };
  textNode.fontSize = fontSize;
  textNode.lineHeight = { value: lineHeight, unit: "PIXELS" };

  if (syntaxType === "punctuation") {
    textNode.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
  }
}

function setFrameProperties(frame: FrameNode, textNode: TextNode) {
  frame.resizeWithoutConstraints(textNode.width, lineHeight);
}

main().then((message: string | undefined) => {
  figma.closePlugin(message);
});
