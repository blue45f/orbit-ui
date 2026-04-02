const execa = require('execa')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const os = require('os')

const packageName = process.argv[2]

if (packageName !== 'mint') {
  console.error(chalk.red('패키지 옵션이 유효하지 않아요. "mint"를 전달해주세요.'))
  process.exit(1)
}

const filterOptions = `--filter @prism-ui/${packageName}...`
const buildCommand = `pnpm tr build ${filterOptions} --force`
const publishCommand = `pnpm ${filterOptions} publish --no-git-checks --tag v2-experimental`

// mint 패키지 경로
const mintPackagePath = path.join(__dirname, '../../packages/clay/mint')
const mintPackageJsonPath = path.join(mintPackagePath, 'package.json')

const findAvailableVersion = async (packageName = '@prism-ui/theme-ocean') => {
  // 실제 사용자명과 날짜 가져오기
  const username = os.userInfo().username || process.env.USER || 'unknown'
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '') // YYYYMMDD 형식

  let increment = 0
  let version = `0.0.0-experimental-${username}-${dateStr}-00`

  while (true) {
    try {
      // 배포된 버전이 하나라도 있으면 다음 버전 탐색
      await Promise.any([execa.command(`npm view ${packageName}@${version}`, { shell: true })])
    } catch {
      break
    }

    increment += 1
    version = `0.0.0-experimental-${username}-${dateStr}-${String(increment).padStart(2, '0')}`
  }

  return version
}

;(async () => {
  let originalPackageJson = null
  let originalName = null

  try {
    // 1. mint와 의존 패키지 빌드
    console.log(chalk.green(`빌드 실행 중: ${buildCommand}`))
    await execa.command(buildCommand, { cleanup: true, stdin: 'inherit', stdout: 'inherit' })

    // 2. mint와 의존 패키지 version 업데이트
    const version = await findAvailableVersion(`@prism-ui/${packageName}`)
    const versionCommand = `pnpm ${filterOptions} version "${version}"`

    console.log(chalk.green(`업데이트 작업 중: ${versionCommand}`))
    await execa.command(versionCommand, { shell: true, stdout: 'inherit' })

    // 3. mint와 의존 패키지 publish
    console.log(chalk.green(`Publish 작업 중: ${publishCommand}`))
    await execa.command(publishCommand, { shell: true, stdout: 'inherit' })

    console.log(chalk.green('mint 배포를 완료했어요.'))

    // 4. canary 배포 준비
    console.log(chalk.yellow('canary 패키지 배포를 시작합니다.'))

    // package.json 백업 및 name 필드만 변경
    originalPackageJson = JSON.parse(fs.readFileSync(mintPackageJsonPath, 'utf8'))
    originalName = originalPackageJson.name

    originalPackageJson.name = '@prism-ui/canary'
    fs.writeFileSync(mintPackageJsonPath, JSON.stringify(originalPackageJson, null, 2) + '\n')
    console.log(chalk.green(`package.json name 변경: ${originalName} -> @prism-ui/canary`))

    // 5. canary publish (같은 태그로)
    const canaryPublishCommand = `pnpm --filter @prism-ui/canary publish --no-git-checks --tag v2-experimental`
    console.log(chalk.green(`Canary Publish 작업 중: ${canaryPublishCommand}`))
    await execa.command(canaryPublishCommand, { shell: true, stdout: 'inherit' })

    // 6. name 필드 복원
    originalPackageJson.name = originalName
    fs.writeFileSync(mintPackageJsonPath, JSON.stringify(originalPackageJson, null, 2) + '\n')
    console.log(chalk.green('package.json name 복구 완료'))

    console.log(
      chalk.green(`canary 배포를 완료했어요. 설치 방법: pnpm add @prism-ui/canary@v2-experimental`)
    )
    console.log(chalk.green('모든 배포를 완료했어요.'))
  } catch (error) {
    // 에러 발생 시 package.json 복구
    if (originalPackageJson && originalName) {
      try {
        originalPackageJson.name = originalName
        fs.writeFileSync(mintPackageJsonPath, JSON.stringify(originalPackageJson, null, 2) + '\n')
        console.log(chalk.yellow('에러 발생으로 package.json을 복구했습니다.'))
      } catch (restoreError) {
        console.error(chalk.red(`package.json 복구 중 에러 발생: ${restoreError.message}`))
      }
    }
    console.error(chalk.red(`에러가 발생했어요: ${error.message}`))
    process.exit(1)
  }
})()
