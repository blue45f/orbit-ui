import { createContext, useContext, useMemo } from 'react'

interface IconA11YProps
  extends Pick<React.SVGAttributes<SVGElement>, 'role'>, React.AriaAttributes {
  alt?: string
  title?: string
  description?: string
}

type Size = number | `${number}${'' | 'px' | 'rem' | '%'}` | null | undefined
export type IconTone = 'flat' | 'soft' | 'premium'

export interface IconProps<
  Color extends string = string,
  ColorPart extends string = string,
  ColorPartKey extends string = string,
>
  extends IconA11YProps, React.SVGAttributes<SVGElement> {
  color?: Color
  colorParts?: Record<ColorPartKey, ColorPart>
  size?: Size
  tone?: IconTone
}

const iconToneStyles: Record<IconTone, React.CSSProperties> = {
  flat: {},
  soft: {
    filter: 'var(--heejun-icon-tone-soft-filter, drop-shadow(0 1px 1px rgba(14, 20, 34, 0.08)))',
  },
  premium: {
    filter: 'var(--heejun-icon-tone-premium-filter, drop-shadow(0 1px 4px rgba(14, 20, 34, 0.16)))',
    opacity: 0.98,
  },
}

export const IconPropsContext = createContext<{
  size?: Size
  forcedColor?: string
  tone?: IconTone
}>({})

interface Props extends IconProps {
  children: React.ReactNode
}

let _iconUniqueIdCounter = 0
const useUniqueID = () => {
  return useMemo(() => `icon-${++_iconUniqueIdCounter}`, [])
}

export const IconRoot: React.FC<Props> = ({
  color,
  size,
  role,
  alt,
  title,
  description,
  children,
  style,
  tone = 'flat',
  ...rest
}) => {
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
  const polishTone = iconToneStyles[contextProps.tone || tone] ?? iconToneStyles.flat

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
      xmlns="http://www.w3.org/2000/svg"
      width={handledSize}
      height={handledSize}
      style={{
        fill: contextProps.forcedColor || color || 'currentColor',
        flexShrink: 0,
        display: 'block',
        shapeRendering: 'geometricPrecision',
        transition: 'transform 0.2s ease, filter 0.2s ease, opacity 0.2s ease',
        ...polishTone,
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
