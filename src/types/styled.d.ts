import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string
      secondary: string
    }
    size?: {}
    mixin: {
      wrapv1: string
    }
  }
}