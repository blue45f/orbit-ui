/// <reference types="vite/client" />

// CSS Modules - support for `import * as styles from '*.css'` pattern
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.css' {
  const content: { [key: string]: string }
  export = content
}

declare module '*.stories.css' {
  const content: { [key: string]: string }
  export = content
}
