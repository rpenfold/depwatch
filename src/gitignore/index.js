const fs = require("fs");

const GITIGNORE_PATH = "./.gitignore";


module.exports = function updateGitignore() {
    try {
        fs.accessSync(GITIGNORE_PATH);
    } catch {
        fs.writeFileSync(GITIGNORE_PATH, '');
    }

    const gitignore = fs.readFileSync(GITIGNORE_PATH);
    const alreadyIgnored = /depwatch.*\.json/g.test(gitignore);

    if (!alreadyIgnored) {
        fs.appendFileSync(GITIGNORE_PATH, '**/depwatch.cache.json');
        console.debug("`depwatch.cache.json` now ignored");
    } else {
        console.debug("`depwatch.cache.json` is already ignored");
    }
}

