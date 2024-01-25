import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

let errorMock: jest.SpyInstance
let getInputMock: jest.SpyInstance

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
  })

  it('check install stable version', async () => {
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'version':
          return 'stable'
        case 'token':
          return `${process.env.DEVELOPER_1C_TOKEN === undefined ? '' : process.env.DEVELOPER_1C_TOKEN}`
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()
    expect(errorMock).not.toHaveBeenCalled()
  })
})
