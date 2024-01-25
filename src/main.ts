import * as core from '@actions/core'
import * as exec from '@actions/exec'
import os from 'os'
import fs from 'fs'

const decompress = require('decompress')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    await downloadExecutor()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function downloadExecutor(): Promise<void> {
  const executorVersion = core.getInput('version')
  const token = core.getInput('token')

  const temporaryDirectory = os.tmpdir()
  const archivePath = `${temporaryDirectory}/executor.zip`
  const executorPath = `${temporaryDirectory}/executor`

  const command = `curl -H "X-Developer-1c-Api:${token}" -J https://developer.1c.ru/applications/Console/api/v1/download/executor/${executorVersion}/universal --output ${archivePath}`
  await exec.exec(command)

  decompress(archivePath, executorPath)
    .then(() => {})
    .catch((error: any) => {
      core.error(error)
    })

  fs.unlink(archivePath, function (err) {
    if (err) return console.log(err)
    console.log('file deleted successfully')
  })

  core.addPath(executorPath)
  if (process.platform != 'win32') {
    core.exportVariable('EXECUTOR_BIN', executorPath)
    core.exportVariable('PATH', '$EXECUTOR_BIN:' + process.env.PATH)
  }
}
