const fs = require("fs");

function getPackageJson() {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

    return packageJson;
}

function getConfig() {
    return getPackageJson().depwatch;
}

module.exports = {
    getPackageJson,
    getConfig
}
