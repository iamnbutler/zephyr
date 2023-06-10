const fontSize = 14;
const lineHeight = 20;
const charWidth = 9;
const numberOfSpaces = 4;
const indentSize = charWidth * numberOfSpaces;

async function main(): Promise<string | undefined> {
    await loadFont();

    const test = figma.createFrame();
    setTestFrameProperties(test);
    figma.currentPage.appendChild(test);
    figma.viewport.scrollAndZoomIntoView([test]);

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

function setTestFrameProperties(frame: FrameNode) {
    frame.name = "code";
    frame.layoutMode = "VERTICAL";
    frame.paddingLeft = 4;
    frame.paddingRight = 4;
    frame.paddingTop = 4;
    frame.paddingBottom = 4;
    frame.primaryAxisSizingMode = "AUTO";
    frame.counterAxisSizingMode = "AUTO";
}

function setFrameProperties(frame: FrameNode, textNode: TextNode) {
    frame.resizeWithoutConstraints(textNode.width, lineHeight);
}

main().then((message: string | undefined) => {
    figma.closePlugin(message);
});
