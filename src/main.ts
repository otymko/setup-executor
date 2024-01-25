import * as core from '@actions/core'
import * as exec from '@actions/exec'
import os from 'os'
import fs from 'fs'
import decompress from 'decompress'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    await downloadAndInstallExecutor()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function downloadAndInstallExecutor(): Promise<void> {
  const executorVersion = core.getInput('version')
  const token = core.getInput('token')

  if (!token) {
    throw new Error('Token for downloads not set')
  }

  const temporaryDirectory = os.tmpdir()
  const archivePath = `${temporaryDirectory}/executor.zip`

  await downloadExecutor(executorVersion, token, archivePath)
  await installExecutor(temporaryDirectory, archivePath)
}

async function downloadExecutor(
  executorVersion: string,
  token: string,
  archivePath: string
): Promise<number> {
  const url = `https://developer.1c.ru/applications/Console/api/v1/download/executor/${executorVersion}/universal`
  const command = `curl -H "X-Developer-1c-Api:${token}" -J ${url} --output ${archivePath}`

  return await exec.exec(command)
}

async function installExecutor(
  temporaryDirectory: string,
  archivePath: string
): Promise<void> {
  const executorPath = `${temporaryDirectory}/executor`

  await decompress(archivePath, executorPath)

  fs.unlink(archivePath, function (err) {
    if (err) return console.log(err)
    console.log('file deleted successfully')
  })

  core.addPath(executorPath)
  if (process.platform !== 'win32') {
    core.exportVariable('EXECUTOR_BIN', executorPath)
    // eslint-disable-next-line prefer-template
    core.exportVariable('PATH', '$EXECUTOR_BIN:' + process.env.PATH)
  }
}
