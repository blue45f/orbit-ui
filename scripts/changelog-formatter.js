/** @typedef {import("@changesets/types").ChangelogFunctions} ChangelogFunctions */

const fs = require('fs')

// GitHub 저장소 링크 (실제 저장소로 변경 필요)
const REPO_LINK = 'https://github.com/prism-ui/prism-ui'

// ========== getReleaseLine (본 패키지 변경사항 요약) ==========

/**
 * @type {ChangelogFunctions['getReleaseLine']}
 * @see {@link https://github.com/changesets/changesets/blob/0c8829bf8729ed5080bd7da843a717f60ea4b84b/packages/changelog-git/src/index.ts#L8-L25 default formatter}
 */
const getReleaseLine = async (changeset, type, changelogOpts) => {
  const { commit, releases, summary } = changeset
  const [firstLine, ...futureLines] = summary.split('\n').map((line) => line.trimEnd())

  writeNoticeFile(releases, `- ${firstLine}\n`)

  let releaseLine = `- ${commit ? `${toCommitLink(commit)}: ` : ''}${firstLine}`

  if (futureLines.length > 0) {
    releaseLine += `${futureLines.map((line) => `  ${line}`).join('\n')}`
  }

  return releaseLine
}

// 슬랙 알림을 위한 패키지별 요약 파일 생성
const writeNoticeFile = (releases, text) => {
  releases.forEach(({ name }) => {
    const packageName = name.split('/')[1]
    fs.appendFileSync(`notice-summary-${packageName}.txt`, text)
  })
}

// ========== getDependencyReleaseLine (의존성을 가진 패키지 변경사항 요약) ==========

/**
 * @type {ChangelogFunctions['getDependencyReleaseLine']}
 * @see {@link https://github.com/changesets/changesets/blob/0c8829bf8729ed5080bd7da843a717f60ea4b84b/packages/changelog-git/src/index.ts#L27C19-L45 default formatter}
 */
const getDependencyReleaseLine = async (changesets, dependenciesUpdated) => {
  if (dependenciesUpdated.length === 0) return ''

  const changesetLinks = changesets.map(
    (changeset) =>
      `- Updated dependencies${changeset.commit ? ` [${toCommitLink(changeset.commit)}]` : ''}`
  )

  const updatedDependenciesList = dependenciesUpdated.map(
    (dependency) => `  - ${dependency.name}@${dependency.newVersion}`
  )

  return [...changesetLinks, ...updatedDependenciesList].join('\n')
}

// ========== utils ==========

// 커밋 링크로 변환하기
const toCommitLink = (hash) => {
  return `[${hash}](${REPO_LINK}/commit/${hash})`
}

// ========== exports ==========

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
}
