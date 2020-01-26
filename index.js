#!/usr/bin/env node

const commandLineArgs = require('command-line-args');
const optionDefinitions = [
    { name: 'command', type: String, defaultOption: true },
    { name: 'node', alias: 'n', type: Boolean },
    { name: 'pods', alias: 'p', type: Boolean },
    { name: 'restore', alias: 'r', type: Boolean },
    { name: 'update', alias: 'u', type: Boolean }
];
const options = commandLineArgs(optionDefinitions);

switch (options.command) {
    case "check":
        require("./src/check")(options);
        break;
    case "gitignore":
        require("./src/gitignore")(options);
        break;
    default:
        break;
}
