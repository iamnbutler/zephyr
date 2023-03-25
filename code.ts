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
      text: "#",
      highlight: null,
    },
    {
      text: "[",
      highlight: "punctuation.bracket",
    },
    {
      text: "derive",
      highlight: null,
    },
    {
      text: "(",
      highlight: "punctuation.bracket",
    },
    {
      text: "Default",
      highlight: "type",
    },
    {
      text: ")",
      highlight: "punctuation.bracket",
    },
    {
      text: "]",
      highlight: "punctuation.bracket",
    },
    {
      text: "",
      highlight: null,
    },
  ],
  [
    {
      text: "",
      highlight: null,
    },
    {
      text: "pub",
      highlight: "keyword",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: "struct",
      highlight: "keyword",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: "Em",
      highlight: "type",
    },
    {
      text: "pty",
      highlight: "type",
    },
    {
      text: " ",
      highlight: null,
    },
    {
      text: "{",
      highlight: "punctuation.bracket",
    },
    {
      text: "",
      highlight: null,
    },
  ],
  [
    {
      text: "    ",
      highlight: null,
    },
    {
      text: "collapsed",
      highlight: "property",
    },
    {
      text: ": ",
      highlight: null,
    },
    {
      text: "bool",
      highlight: "type",
    },
    {
      text: ",",
      highlight: null,
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
  frame.resizeWithoutConstraints(INDENT_FRAME_WIDTH, LINE_HEIGHT); // Set the width and height of the indent frame
  return frame;
}

function createLine(line: ZedHighlightNode[]): FrameNode {
  const lineFrame = figma.createFrame();
  lineFrame.layoutMode = "HORIZONTAL";
  lineFrame.primaryAxisAlignItems = "CENTER";
  lineFrame.counterAxisAlignItems = "CENTER";

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

  const frame = figma.createFrame();
  // Ensure width is never less than 0.01
  frame.resizeWithoutConstraints(
    textNode.width <= 0 ? 1 : textNode.width,
    LINE_HEIGHT
  );
  frame.appendChild(textNode);
  return frame;
}

async function main(): Promise<string | undefined> {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  try {
    console.log("Loading font...");
    await figma.loadFontAsync({
      family: "Roboto Mono",
      style: "Regular",
    });
    console.log("Font loaded.");

    const codeFrame = figma.createFrame();
    codeFrame.layoutMode = "VERTICAL";
    codeFrame.primaryAxisSizingMode = "AUTO";
    codeFrame.counterAxisSizingMode = "AUTO";
    codeFrame.itemSpacing = 0;

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
