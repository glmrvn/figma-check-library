//REGEX. Only lowercase (a-z) with '_'
var regex = /^[a-z\d_]*$/;

//Creating variables
var allNodes;
var problemObjects = [];
let count = 0;

//Search frames and instances on the current page
const allFrames = figma.currentPage.findAll(node => node.type === "FRAME" && node.parent.type != "FRAME");
const allInstances = figma.currentPage.findAll(node => node.type === "INSTANCE" && node.parent.type != "INSTANCE" && node.parent.type != "FRAME");

//Merging frame and instances
allNodes = allFrames.concat(allInstances);

// Validating frames and instances with regex
for (let index in allNodes) {
    let frame = allNodes[index];
    if (regex.test(frame.name) != true) {
        count++;
        problemObjects.push(frame);
        continue;
    }
}

// Showing notification
if (count == 0) {
    figma.notify('Cool 😎', { timeout: 1500 });
}
else {
    // Selecting problem elements and move to viewport
    figma.currentPage.selection = problemObjects;
    figma.viewport.scrollAndZoomIntoView(problemObjects);

    // Error notification text
    figma.notify('🚨🚨🚨 You are have ' + count + ' errors', { timeout: 3000 });
}

// Close plugin
figma.closePlugin();
