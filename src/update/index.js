const { updateNodeCache } = require("../utils/cache");
const { getPackageJson } = require("../utils/packageJson");


module.exports = function update(options) {
    if (options.node || options.all) {
        const { dependencies, devDependencies } = getPackageJson();
        updateNodeCache({ dependencies, devDependencies });
    }
}
