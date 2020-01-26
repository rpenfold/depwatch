const fs = require("fs");

function diff(actual, cached, misses = []) {
    if (actual) {
        Object.keys(actual).forEach((key) => {
            const cachedDep = cached[key];
            if (cachedDep !== actual[key]) {
                misses.push({
                    name: key,
                    from: cachedDep,
                    to: actual[key]
                })
            }
        });
    }

    return misses;
}

module.exports = function(options) {
    const { getPackageJson } = require ("../utils/packageJson");
    const { getCache, updateNodeCache } = require("../utils/cache");
    const shouldUpdate = options.update;

    const { dependencies, devDependencies, depWatch } = getPackageJson();
    const { node } = getCache();
    const cachedDependencies = node.dependencies || {};
    const cachedDevDependencies = node.devDependencies || {};

    let needsUpdate = diff(dependencies, cachedDependencies);
    needsUpdate = diff(devDependencies, cachedDevDependencies, needsUpdate);

    if (shouldUpdate && needsUpdate.length) {
        updateNodeCache({ dependencies, devDependencies });
    }   

    return needsUpdate;
}

