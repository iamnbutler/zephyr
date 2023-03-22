// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

function createWordFrame(word: string) {
    const frame = figma.createFrame();
    const textNode = figma.createText();
    textNode.characters = word;
    frame.appendChild(textNode);
    return frame;
}

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async msg => {
    if (msg.type === 'run-plugin') {
        const data = await figma.clientStorage.getAsync('json-data');
        const jsonData = JSON.parse(data);
        const codeFrame = figma.createFrame();
        codeFrame.name = 'code';
        codeFrame.layoutMode = 'VERTICAL';

        for (const line of jsonData.lines) {
            const lineFrame = figma.createFrame();
            lineFrame.name = 'line';
            lineFrame.layoutMode = 'HORIZONTAL';

            for (const word of line.words) {
                const wordFrame = createWordFrame(word);
                lineFrame.appendChild(wordFrame);
            }

            codeFrame.appendChild(lineFrame);
        }

        figma.currentPage.appendChild(codeFrame);
        figma.viewport.scrollAndZoomIntoView([codeFrame]);

        figma.closePlugin();
    };
};
