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

const data: ZData = {
    lines: [
        {
            words: [
                { value: "This", syntaxType: "text" },
                { value: "is", syntaxType: "text" },
                { value: "the", syntaxType: "text" },
                { value: "first", syntaxType: "text" },
                { value: "line", syntaxType: "text" },
                { value: ".", syntaxType: "punctuation" },
            ],
        },
        {
            words: [
                { value: "This", syntaxType: "text" },
                { value: "is", syntaxType: "text" },
                { value: "the", syntaxType: "text" },
                { value: "second", syntaxType: "text" },
                { value: "line", syntaxType: "text" },
                { value: ".", syntaxType: "punctuation" },
            ],
        },
        {
            words: [
                { value: "This", syntaxType: "text" },
                { value: "is", syntaxType: "text" },
                { value: "the", syntaxType: "text" },
                { value: "third", syntaxType: "text" },
                { value: "line", syntaxType: "text" },
                { value: ".", syntaxType: "punctuation" },
            ],
        },
        {
            words: [
                { value: "This", syntaxType: "text" },
                { value: "is", syntaxType: "text" },
                { value: "the", syntaxType: "text" },
                { value: "fourth", syntaxType: "text" },
                { value: "line", syntaxType: "text" },
                { value: ".", syntaxType: "punctuation" },
            ],
        },
    ],
};


const fontSize = 14; // Set a static font size
const lineHeight = 20; // Set a static line height

async function main(): Promise<string | undefined> {
    // Load the "Inter Regular" font before creating any text nodes using that font
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });

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

        for (const word of line.words) {
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

function createWordFrame(word: ZTextNode) {
    const { value, syntaxType } = word

    const textNode = figma.createText();
    textNode.characters = value;
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
