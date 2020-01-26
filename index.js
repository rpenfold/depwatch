const command = process.argv[2];

if (command === "check") {
    const check = require("./src/check");
    check();
} else if ( command === "gitignore") {
    const gitignore = require("./src/gitignore");
    gitignore();
}