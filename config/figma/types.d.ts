type Color = {
  r: number
  g: number
  b: number
  a: number
}

export type EffectNode = {
  type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR'
  visible: true
  color: Color
  offset: {
    x: number
    y: number
  }
  radius: number
  spread?: number
}

export type FigmaNode = {
  id?: string
  children: FigmaNode[]
  characters?: string
  fills?: {
    blendMode: string
    type: string
    color?: Color
  }[]
  styles?: {
    fill: string
  }
  name?: string
  style: {
    fontSize: number
    fontWeight: number
    lineHeightPercentFontSize: number
  }
  strokes?: {
    blendMode: string
    type: string
    color: Color
  }[]
  strokeWeight?: number
  cornerRadius: number
  absoluteBoundingBox: {
    width: number
    height: number
  }
  effects: EffectNode[]
  type: string
}
