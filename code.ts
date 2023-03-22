// This plugin will create a code frame in the current page.

const data = {
    lines: [
        {
            words: [
                "Zephyr",
                "is",
                "designed",
                "for",
                "people",
                "that",
                "want",
                "highlighted",
                "code",
                "blocks",
                "in",
                "Figma",
                "for",
                "use",
                "in",
                "designing",
                "code",
                "editors,",
                "and",
                "other",
                "software",
                "engineering",
                "tools.",
            ],
        },
        {
            words: [
                "These",
                "tools",
                "have",
                "many",
                "states",
                "and",
                "feature",
                "that",
                "require",
                "being",
                "able",
                "to",
                "style",
                "individual",
                "text",
                "notes.",
            ],
        },
        {
            words: [
                "Zephyr",
                "was",
                "build",
                "out",
                "of",
                "frustration",
                "of",
                "the",
                "current",
                "state",
                "of",
                "plugins",
                "in",
                "this",
                "space",
                "and",
                "needing",
                "more",
                "control",
                "over",
                "the",
                "output.",
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

function createWordFrame(word: string) {
    const textNode = figma.createText();
    textNode.characters = word;
    textNode.fontSize = fontSize; // Use the static font size
    textNode.lineHeight = { value: lineHeight, unit: "PIXELS" }; // Use the static line height
    const frame = figma.createFrame();
    frame.resizeWithoutConstraints(textNode.width, lineHeight); // Set the height of the text frame to the static line height
    frame.appendChild(textNode);
    return frame;
}

main().then((message: string | undefined) => {
    figma.closePlugin(message);
});
