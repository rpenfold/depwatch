const { execSync } = require('child_process');
const colors = require("colors");
const checkNodeDeps = require("./checkNodeDeps");
const { getConfig } = require("../utils/packageJson");

function resultMessageBuilder(type, count) {
    const icon = count === 0
        ? "✔️".green
        : "✖️".red;

    return `${icon} ${count} ${type} package${count === 1 ? '' : 's'} need to be restored`;
}

module.exports = function(options) {
    const config = getConfig() || {};
    const shouldRestore = options.restore || config.restore;
    const shouldRunNode = options.node || config.checkNode;
    const shouldRunPods = options.pods || config.checkPods;
    const noTypesSpecified = !shouldRunNode && !shouldRunPods;

    if (shouldRunNode || noTypesSpecified) {
        const needsUpdate = checkNodeDeps(options);
        const message = resultMessageBuilder("node", needsUpdate.length);

        console.debug(message);

        if (shouldRestore && needsUpdate.length) {
            console.debug("Restoring missing dependencies...");
            const stdout = execSync("npm i");
            console.debug("Missing node dependencies restored");
        }
    }

    if (shouldRunPods || noTypesSpecified) {
        console.debug("Detection for CocoaPods has not been implemented yet. Skipping...")
    }
}
