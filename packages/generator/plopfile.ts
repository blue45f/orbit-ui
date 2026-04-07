import { NodePlopAPI } from 'plop'

export default function (plop: NodePlopAPI): void {
  plop.setGenerator('component', {
    description: '새 컴포넌트 구성 파일을 생성합니다.',
    prompts: [
      {
        type: 'list',
        name: 'packageName',
        message: '패키지를 선택해주세요.',
        choices: ['core', 'theme-eclipse'],
      },
      {
        type: 'input',
        name: 'componentName',
        message: '컴포넌트 이름을 입력해주세요.',
      },
      {
        type: 'list',
        name: 'componentType',
        message: '컴포넌트 타입을 선택해주세요.',
        choices: ['base', 'slotted'],
      },
      {
        type: 'input',
        name: 'subComponentNames',
        message: '서브 컴포넌트 이름을 `,`로 구분해서 소문자로 입력해주세요. (e.g., line,fill)',
        when: (answers) => answers.componentType === 'slotted',
      },
    ],
    actions: [
      (answers) => {
        answers.isCorePackage = answers.packageName === 'core'
        answers.isSlotted = answers.componentType === 'slotted'
        answers.subComponentNames = answers.subComponentNames?.replace(/ /g, '').split(',')

        return ''
      },
      {
        type: 'addMany',
        templateFiles: './templates/component/*',
        base: './templates/component',
        destination: '../{{packageName}}/src/components/{{componentName}}',
      },
    ],
  })
}
