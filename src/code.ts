import { lexer, language } from "./lexer";

const fontSize = 14;
const lineHeight = 20;
const charWidth = 9;
const numberOfSpaces = 4;
const indentSize = charWidth * numberOfSpaces;

const staticText = `use gpui::{
    color::Color,
    fonts::{Properties, Weight},
    text_layout::RunStyle,
    DebugContext, Element as _, MeasurementContext, Quad,
};
use log::LevelFilter;
use pathfinder_geometry::rect::RectF;
use simplelog::SimpleLogger;
use std::ops::Range;
`

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


interface LineData {
  words: Token[];
  indentLevel: number
}

interface TextData {
  lines: LineData[];
}

const stringToTokens = lexer(language.rust)
const tokens = stringToTokens.reset(staticText)
for (const token of tokens) {
  console.log(token);
}

function buildTree(tokens: Token[]) {
  const tree: TextData = { lines: [] };
  let currentLine: LineData = { words: [], indentLevel: 0 };
  for (const token of tokens) {
    if (token.line > currentLine.words[0]?.line || !currentLine.words.length) {
      tree.lines.push(currentLine);
      currentLine = { words: [], indentLevel: 0 };
    }
    currentLine.words.push(token);
    if (token.lineBreaks) {
      const whitespace = token.value.match(/^\s+/);
      if (whitespace) {
        currentLine.indentLevel = whitespace[0].length;
      }
    }
  }
  tree.lines.push(currentLine);
  return tree;
}

async function main(): Promise<string | undefined> {
  const stringToTokens = lexer(language.rust);
  const tokens = stringToTokens.reset(staticText);

  await loadFont();

  const data = treeToData(tokens);
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

function createWordFrame(word): FrameNode {
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
