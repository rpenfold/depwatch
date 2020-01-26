const fs = require("fs");
const { getPackageJson } = require("./packageJson");

const DEFAULT_FILE = "./depwatch.cache.json";

/**
 * Gets path to the depwatch cache.
 */
function getCacheFile() {
    const { depwatch, dependencies, devDependencies } = getPackageJson();
    const path = depwatch && depwatch.cacheFile ? depwatch.cacheFile : DEFAULT_FILE;

    try {
        fs.accessSync(path);
        return path;
    } catch (err) {
        fs.writeFileSync(path, JSON.stringify({
            node: {
                dependencies,
                devDependencies
            }
        }, null, 2));
        return DEFAULT_FILE;
    }
}

/**
 * Gets the depwatch cache.
 */
function getCache() {
    const cacheFile = getCacheFile();
    const cache = JSON.parse(fs.readFileSync(cacheFile));

    return cache;
}

/**
 * Updates the node depwatch cache.
 * @param {object} nodeCache 
 */
function updateNodeCache(nodeCache) {
    const cache = getCache();
    const cacheFile = getCacheFile();
    cache.node = nodeCache;
    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
}


module.exports = {
    getCacheFile,
    getCache,
    updateNodeCache
}
