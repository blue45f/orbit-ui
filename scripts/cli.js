const fs = require('fs')
const path = require('path')
const execa = require('execa')
const chalk = require('chalk')
const cliSelect = require('cli-select')

const EXECUTE_TYPES = Object.freeze({
  PRISM_UI: 'Prism UI 컴포넌트 프로젝트 실행',
})

// ==============================================================================
// 실행

run()

async function run() {
  errorBoundary(async () => {
    printInfo('실행하실 타겟을 골라주세요.')

    const selectedExecuteType = await selectAnyway(EXECUTE_TYPES)

    switch (selectedExecuteType.value) {
      case EXECUTE_TYPES.PRISM_UI:
        executePrismUICommand()
        break
    }
  })
}

/** Prism UI 프로젝트 실행을 위한 Command */
async function executePrismUICommand() {
  errorBoundary(async () => {
    const executableProject = ['mint', 'foundation']
    const PROJECT_PATH = path.join(process.cwd(), '/packages')
    const projectList = fs
      .readdirSync(PROJECT_PATH, { withFileTypes: true })
      .filter((f) => executableProject.includes(f.name))
      .map((f) => f.name)

    printInfo('프로젝트 목록을 가져왔습니다', '아래에서 실행할 프로젝트를 선택해주세요.')

    const selectedProject = await selectAnyway(projectList)

    const execPath = `${PROJECT_PATH}/${selectedProject.value}`

    const originPackageFile = fs.readFileSync(`${execPath}/package.json`, {
      encoding: 'utf8',
    })

    const packageJson = JSON.parse(originPackageFile)

    // package.json 내 실행가능한 커맨드 목록
    const executableScripts = packageJson.scripts
    const executableCommandKeys = Object.keys(executableScripts)

    printInfo('커멘드 리스트를 가져왔습니다', '아래에서 실행할 커맨드를 선택해주세요')

    // 선택한 스크립트 키
    const selectedCommandKey = await selectAnyway(executableCommandKeys)

    // 프로젝트 이름
    const projectName = packageJson.name

    const command = `pnpm ${selectedCommandKey.value.includes('watch') ? '' : 'tr'} --filter=${projectName} ${
      selectedCommandKey.value
    }`

    printInfo(`${projectName} 프로젝트의 ${selectedCommandKey.value}를 실행합니다`, command)

    execa.command(command, { stdio: 'inherit' })
    return
  })
}

// ==============================================================================
// 에러 바인딩

/** 단순 취소일때, 에러 바인딩 */
class CancelError extends Error {
  constructor() {
    super()
    this.name = 'CancelError'
  }
}

/** 그 외의 함수에서 나오는 모든 커스텀 에러 바인딩 */
class CustomFunctionError extends Error {
  constructor(message) {
    super()
    this.name = 'CustomFunctionError'
  }

  print() {
    printError(this.message, this.stack)
  }
}

// ==============================================================================
// 유틸 함수

function printError(err, stack) {
  console.log('')
  console.log(chalk.red('문제가 발생하였습니다'))
  console.log(chalk.gray('-----------------------------'))
  console.log(chalk.gray('에러 메시지'))
  console.log(chalk.red(err))
  console.log(chalk.red(stack))
}

function printInfo(description, subDescription = null) {
  console.clear()
  console.log(chalk.blue('cli를 실행합니다'))
  console.log(chalk.gray('-----------------------------'))
  console.log(chalk.green(description))
  if (subDescription) console.log(chalk.blueBright(subDescription))
  console.log('')
}

async function errorBoundary(
  successFunc,
  errorOption = { cancelFunc: () => {}, customFunc: () => {}, defaultFunc: () => {} }
) {
  try {
    await successFunc()
  } catch (err) {
    if (err instanceof CancelError) {
      console.log('실행을 취소했습니다.')
      errorOption.cancelFunc()
    } else if (err instanceof CustomFunctionError) {
      err.print()
      errorOption.customFunc()
    } else {
      printError(err.message, err.stack)
      errorOption.defaultFunc()
    }
  }
}

/**
 * 리스트의 내용을 선택하고 반환값을 넘기는 함수
 *
 * @param {string[]} selectList 선택가능한 리스트
 */
async function selectAnyway(selectList) {
  try {
    const selectedValue = await cliSelect({
      values: selectList,
      defaultValue: 0,
      selected: '[x]',
      unselected: '[ ]',
    })

    // id, value 반환
    return selectedValue
  } catch (err) {
    if (!err) throw new CancelError()
    throw new CustomFunctionError('selectList 함수에서 에러가 발생했습니다')
  }
}
