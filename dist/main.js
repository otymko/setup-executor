"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
    try {
        await downloadExecutor();
    }
    catch (error) {
        if (error instanceof Error)
            core.setFailed(error.message);
    }
}
exports.run = run;
async function downloadExecutor() {
    const executorVersion = core.getInput('version');
    const token = core.getInput('token');
    const temporaryDirectory = await (await import('temp-dir')).default;
    const archivePath = `${temporaryDirectory}/executor.zip`;
    core.warning(temporaryDirectory);
    const command = `curl -H "X-Developer-1c-Api:${token}" -OJ https://developer.1c.ru/applications/Console/api/v1/download/executor/${executorVersion}/universal --output ${archivePath}`;
    return await exec.exec(command);
    // const archiveName = 'executor.zip'
    // const command = `curl -H "X-Developer-1c-Api:${token}" -OJ https://developer.1c.ru/applications/Console/api/v1/download/executor/${executorVersion}/universal --output ${archiveName}`
    // return await exec.exec(command)
}
//# sourceMappingURL=main.js.map