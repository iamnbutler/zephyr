type Frame = Partial<Pick<FrameNode, "name" | "layoutMode" | "paddingLeft" | "paddingRight" | "paddingTop" | "paddingBottom" | "primaryAxisSizingMode" | "counterAxisSizingMode" | "cornerRadius" | "strokes" | "strokeWeight" | "fills">>;

function hexColorToRGB(hex: string): RGB {
    const rgb: RGB = {
        r: parseInt(hex.substring(1, 3), 16) / 255,
        g: parseInt(hex.substring(3, 5), 16) / 255,
        b: parseInt(hex.substring(5, 7), 16) / 255,
    };

    return rgb;
}

const testContainer: Container = {
    width: 28,
    height: 28,
    padding: 4,
    background: "#FF00FF",
    cornerRadius: 4,
    border: {
        color: "#000000",
        width: 1,
    }
}

function containerToFrame(container: Container, name?: string): FrameNode {
    const frame: Frame = {
        name: name ?? "frame",
        layoutMode: "HORIZONTAL",
        paddingLeft: container.padding,
        paddingRight: container.padding,
        paddingTop: container.padding,
        paddingBottom: container.padding,
        primaryAxisSizingMode: "AUTO",
        counterAxisSizingMode: "AUTO",
        cornerRadius: container.cornerRadius,
        fills: [{
            type: "SOLID",
            color: hexColorToRGB(container.background),
        }],
        strokeWeight: container.border.width,
        strokes: [{
            type: "SOLID",
            color: hexColorToRGB(container.border.color),
        }]
    };

    const frameNode = figma.createFrame();

    // TODO: Handle "fill" values
    if (container.width !== "fill" && container.height !== "fill") {
        frameNode.resizeWithoutConstraints(container.width, container.height);
    }

    Object.assign(frameNode, frame);

    return frameNode;
}

async function main(): Promise<string | undefined> {
    await loadFont();

    const test = containerToFrame(testContainer, "test")
    // setTestFrameProperties(test);
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

main().then((message: string | undefined) => {
    figma.closePlugin(message);
});
