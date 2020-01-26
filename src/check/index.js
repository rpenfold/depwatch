const { execSync } = require('child_process');
const colors = require("colors");
const checkNodeDeps = require("./checkNodeDeps");
const { getConfig } = require("../utils/packageJson");

module.exports = function() {
    const config = getConfig() || {};
    const shouldRestore = process.argv.includes('-r') || config.restore;
    const shouldRunNode = process.argv.includes('--node') || config.checkNode;
    const shouldRunPods = process.argv.includes('--pods') || config.checkPods;
    const noTypesSpecified = !shouldRunNode && !shouldRunPods;

    function resultMessageBuilder(type, count) {
        const icon = count === 0
            ? "✔️".green
            : "✖️".red;

        return `${icon} ${count} ${type} package${count === 1 ? '' : 's'} need to be restored`;
    }

    if (shouldRunNode || noTypesSpecified) {
        const needsUpdate = checkNodeDeps();
        const message = resultMessageBuilder("node", needsUpdate.length);

        console.debug(message);

        if (shouldRestore && needsUpdate.length) {
            console.debug("Restoring missing dependencies...");
            const stdout = execSync("npm i");
            console.debug("Missing node dependencies restore");
        }
    }

    if (shouldRunPods || noTypesSpecified) {
        console.debug("Detection for CocoaPods has not been implemented yet. Skipping...")
    }
}
