import { createContext, useContext, useMemo } from 'react'

interface IconA11YProps extends Pick<React.SVGAttributes<SVGElement>, 'role'>, React.AriaAttributes {
  alt?: string
  title?: string
  description?: string
}

type Size = number | `${number}${'' | 'px' | 'rem' | '%'}` | null | undefined

export interface IconProps<
  Color extends string = string,
  ColorPart extends string = string,
  ColorPartKey extends string = string,
> extends IconA11YProps,
    React.SVGAttributes<SVGElement> {
  color?: Color
  colorParts?: Record<ColorPartKey, ColorPart>
  size?: Size
}

export const IconPropsContext = createContext<{ size?: Size; forcedColor?: string }>({})

interface Props extends IconProps {
  children: React.ReactNode
}

let uniqueId = 0
const useUniqueID = () => {
  const id = useMemo(() => {
    uniqueId += 1
    return `icon-${uniqueId}`
  }, [])
  return id
}

export const IconRoot: React.FC<Props> = ({ color, size, role, alt, title, description, children, style, ...rest }) => {
  const contextProps = useContext(IconPropsContext)
  const DEFAULT_SIZE = '24'

  const isValidSize = (value: Size): value is NonNullable<Size> => {
    if (typeof value === 'number') {
      return value > 0 && Number.isFinite(value)
    }
    if (typeof value === 'string') {
      return parseInt(value, 10) > 0
    }
    return Boolean(value)
  }

  const handledSize = isValidSize(size) ? size : contextProps.size || DEFAULT_SIZE
  const uniqueID = useUniqueID()

  const a11yProps = useMemo(() => {
    if (!alt && !title && !description) {
      return { 'aria-hidden': true }
    }

    return {
      ...{ role: role || 'img' },
      ...(alt ? { 'aria-label': alt } : {}),
      ...(title ? { 'aria-labelledby': `icon-title-${uniqueID}` } : {}),
      ...(description ? { 'aria-describedby': `icon-desc-${uniqueID}` } : {}),
    }
  }, [role, alt, title, description, uniqueID])

  const labelledById = 'aria-labelledby' in a11yProps ? a11yProps['aria-labelledby'] : undefined
  const describedById = 'aria-describedby' in a11yProps ? a11yProps['aria-describedby'] : undefined

  return (
    <svg
      viewBox={`0 0 ${DEFAULT_SIZE} ${DEFAULT_SIZE}`}
      xmlns='http://www.w3.org/2000/svg'
      width={handledSize}
      height={handledSize}
      style={{
        fill: contextProps.forcedColor || color || 'currentColor',
        flexShrink: 0,
        ...style,
      }}
      {...rest}
      {...a11yProps}
    >
      {title && labelledById && <title id={labelledById}>{title}</title>}
      {description && describedById && <desc id={describedById}>{description}</desc>}
      {children}
    </svg>
  )
}
