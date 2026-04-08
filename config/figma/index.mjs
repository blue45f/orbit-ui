import path from 'node:path'
import url from 'node:url'
import axios from 'axios'
import * as dotenv from 'dotenv'
import meta from './meta.json' assert { type: 'json' }

const parseEnv = () => {
  const currentFilePath = url.fileURLToPath(import.meta.url)
  const envFilePath = path.join(path.dirname(currentFilePath), '.env')
  const { parsed, error } = dotenv.config({ path: envFilePath })

  if (error) {
    throw new Error(error)
  }

  if (!parsed?.FIGMA_API_ACCESS_TOKEN) {
    throw new Error('피그마 엑세스 토큰이 없습니다.')
  }

  return parsed
}

const createAPIClient = () =>
  axios.create({
    baseURL: 'https://api.figma.com',
    headers: {
      'X-Figma-Token': parseEnv().FIGMA_API_ACCESS_TOKEN,
    },
  })

const getMetaInfo = (packageName, type) => {
  const { tokenURL } = meta[packageName]
  const { pathname, query } = url.parse(
    {
      token: tokenURL,
    }[type],
    true
  )
  const pathFragments = pathname.split('/')
  const branchIndex = pathFragments.findIndex((frag) => frag === 'file')
  const branchID = pathFragments[branchIndex + 1]
  const nodeID = query['node-id'].replace('-', ':')

  return { branchID, nodeID }
}

/**
 * 노드 정보 조회
 *
 * @param {Object} params
 * @param {'blue' | 'eclipse'} params.packageName
 * @param {'icon' | 'image' | 'token'} params.type
 * @returns {Promise<{ version: string; nodeTree: import("./types").FigmaNode }>}
 */
export const fetchNodeTree = async ({ packageName, type }) => {
  const { branchID, nodeID } = getMetaInfo(packageName, type)
  const response = await createAPIClient().get(`/v1/files/${branchID}/nodes`, {
    params: {
      ids: nodeID,
    },
  })

  const version = getVersionFromName(response.data.name)

  return { version, nodeTree: response.data.nodes[nodeID].document }
}

/**
 * Figma 파일 이름에서 버전정보 파싱
 *
 * @param {string} figmaFileName
 * @returns {string} 버전정보
 */
const getVersionFromName = (figmaFileName) => {
  const VERSION_REGEX = /\d+.\d+.\d+/g
  const version = figmaFileName.split(' ').at(4)

  if (!VERSION_REGEX.test(version)) {
    throw new Error('버전 형식이 유효하지 않습니다.')
  }

  return version
}
