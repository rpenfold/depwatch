const args = process.argv.splice(process.execArgv.length + 2);
const command = args[0];


if (command === "check") {
    require("./src/check")();
} else if ( command === "gitignore") {
    require("./src/gitignore")();
}