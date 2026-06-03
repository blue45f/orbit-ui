import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
} from 'react'

import { cn } from '../../styles'
import { useUniqueID } from '../primitives/UniqueIDProvider'

/* ========================================================================
 * Context
 * ======================================================================== */

type FieldContextValue = {
  /** 컨트롤(input 등)에 부여되는 id. label[for] 가 가리키는 대상이에요. */
  controlId: string
  /** label 요소의 id */
  labelId: string
  /** 보조 설명(description) 요소의 id */
  descriptionId: string
  /** 에러 메시지 요소의 id */
  errorId: string
  /** 유효성 검증 실패 여부 */
  invalid: boolean
  /** 필수 입력 여부 */
  required: boolean
  /** 비활성화 여부 */
  disabled: boolean
  /** 보조 설명이 렌더링되어 있는지 여부 */
  hasDescription: boolean
  /** 에러 메시지가 렌더링되어 있는지 여부 */
  hasError: boolean
}

const FieldContext = createContext<FieldContextValue | null>(null)

/**
 * Field 하위 컴포넌트(Label/Control/Description/Error)에서 공유 컨텍스트를 읽어요.
 * `Field` 외부에서 호출하면 명시적으로 에러를 던집니다.
 */
export const useFieldContext = (): FieldContextValue => {
  const context = useContext(FieldContext)

  if (context === null) {
    throw new Error('Field 하위 컴포넌트는 <Field> 내부에서만 사용할 수 있습니다.')
  }

  return context
}

/* ========================================================================
 * Types
 * ======================================================================== */

export type FieldSpecificProps = {
  /** 컨트롤에 직접 지정할 id (미지정 시 자동 생성) */
  id?: string
  /** 유효성 검증 실패 여부. `aria-invalid` 가 컨트롤에 전달돼요. @defaultValue false */
  invalid?: boolean
  /** 필수 입력 여부. `aria-required` / `required` 가 컨트롤에 전달돼요. @defaultValue false */
  required?: boolean
  /** 비활성화 여부 @defaultValue false */
  disabled?: boolean
  children?: React.ReactNode
  /** 스타일 */
  style?: React.CSSProperties
  /** 클래스명 */
  className?: string
}

export type FieldProps = FieldSpecificProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>

/* ========================================================================
 * Root
 * ======================================================================== */

const FieldRoot = forwardRef<HTMLDivElement, FieldProps>((props, ref) => {
  const {
    id: idProp,
    invalid = false,
    required = false,
    disabled = false,
    children,
    className,
    ...rest
  } = props

  // 단일 useUniqueID 호출을 base 로 삼아 파생 id 를 만든다(hook 호출 순서 안정).
  const baseId = useUniqueID(idProp)
  const controlId = idProp ?? `${baseId}-control`

  // 자식 트리에 Description / Error 가 존재하는지 검사해 aria-describedby 합성에 활용한다.
  const { hasDescription, hasError } = useMemo(() => {
    let description = false
    let error = false

    const visit = (nodes: React.ReactNode): void => {
      Children.forEach(nodes, (child) => {
        if (!isValidElement(child)) return
        if (child.type === FieldDescription) description = true
        if (child.type === FieldError) error = true
        const childProps = child.props as { children?: React.ReactNode }
        if (childProps?.children) visit(childProps.children)
      })
    }

    visit(children)
    return { hasDescription: description, hasError: error }
  }, [children])

  const contextValue = useMemo<FieldContextValue>(
    () => ({
      controlId,
      labelId: `${baseId}-label`,
      descriptionId: `${baseId}-description`,
      errorId: `${baseId}-error`,
      invalid,
      required,
      disabled,
      hasDescription,
      hasError,
    }),
    [controlId, baseId, invalid, required, disabled, hasDescription, hasError]
  )

  return (
    <FieldContext.Provider value={contextValue}>
      <div
        ref={ref}
        role="group"
        data-orbit-ui-component="Field"
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        className={cn('flex flex-col gap-1', className)}
        {...rest}
      >
        {children}
      </div>
    </FieldContext.Provider>
  )
})

FieldRoot.displayName = 'Field'

/* ========================================================================
 * Label
 * ======================================================================== */

export type FieldLabelProps = {
  children?: React.ReactNode
} & Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor'>

/**
 * 컨트롤과 `for`/`id` 로 자동 연결되는 라벨이에요. 필수 입력이면 표식을 노출해요.
 */
export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ children, className, ...rest }, ref) => {
    const { controlId, labelId, required } = useFieldContext()

    return (
      <label
        ref={ref}
        id={labelId}
        htmlFor={controlId}
        className={cn('inline-flex items-center gap-0.5', className)}
        {...rest}
      >
        {children}
        {required && (
          <span aria-hidden="true" data-field-required-marker="">
            *
          </span>
        )}
      </label>
    )
  }
)

FieldLabel.displayName = 'Field.Label'

/* ========================================================================
 * Control
 * ======================================================================== */

export type FieldControlProps = {
  /** 단일 폼 컨트롤 엘리먼트. id/aria 속성이 자동으로 주입돼요. */
  children: React.ReactElement
}

/**
 * 단일 자식 컨트롤에 `id` + `aria-describedby` + `aria-invalid` + `aria-required`
 * 를 주입해 label/description/error 와 연결해요. 자식이 이미 지정한 속성은 보존해요.
 */
export const FieldControl = ({ children }: FieldControlProps): React.ReactElement => {
  const {
    controlId,
    descriptionId,
    errorId,
    invalid,
    required,
    disabled,
    hasDescription,
    hasError,
  } = useFieldContext()

  const child = Children.only(children)
  const childProps = (child.props ?? {}) as Record<string, unknown>

  // aria-describedby: 자식이 지정한 값 + 내부 description/error id 를 공백 결합
  const describedBy = [
    childProps['aria-describedby'] as string | undefined,
    hasDescription ? descriptionId : undefined,
    hasError ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  return cloneElement(child, {
    // controlId 가 권위(authoritative)다. label[for] 와 반드시 일치시킨다.
    // 커스텀 id 는 <Field id="..."> 로 지정한다.
    id: controlId,
    'aria-describedby': describedBy || undefined,
    'aria-invalid': childProps['aria-invalid'] ?? (invalid || undefined),
    'aria-required': childProps['aria-required'] ?? (required || undefined),
    disabled: (childProps.disabled as boolean | undefined) ?? (disabled || undefined),
  } as Record<string, unknown>)
}

FieldControl.displayName = 'Field.Control'

/* ========================================================================
 * Description
 * ======================================================================== */

export type FieldDescriptionProps = {
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLParagraphElement>

/**
 * 컨트롤의 보조 설명이에요. `aria-describedby` 로 컨트롤과 연결돼요.
 */
export const FieldDescription = forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ children, className, ...rest }, ref) => {
    const { descriptionId } = useFieldContext()

    return (
      <p
        ref={ref}
        id={descriptionId}
        data-field-description=""
        className={cn('text-sm', className)}
        {...rest}
      >
        {children}
      </p>
    )
  }
)

FieldDescription.displayName = 'Field.Description'

/* ========================================================================
 * Error
 * ======================================================================== */

export type FieldErrorProps = {
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLParagraphElement>

/**
 * 에러 메시지예요. `aria-describedby` 로 컨트롤과 연결되고 `role="alert"` 로
 * 보조기기에 즉시 알려요. 필드가 invalid 가 아니어도 메시지가 있으면 렌더링해요.
 */
export const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ children, className, ...rest }, ref) => {
    const { errorId } = useFieldContext()

    if (children == null || children === false) return null

    return (
      <p
        ref={ref}
        id={errorId}
        role="alert"
        data-field-error=""
        className={cn('text-sm', className)}
        {...rest}
      >
        {children}
      </p>
    )
  }
)

FieldError.displayName = 'Field.Error'

/* ========================================================================
 * Export
 * ======================================================================== */

type FieldComponent = typeof FieldRoot & {
  Label: typeof FieldLabel
  Control: typeof FieldControl
  Description: typeof FieldDescription
  Error: typeof FieldError
}

/**
 * 폼 필드 래퍼 컴포넌트.
 *
 * label[for] ↔ control[id] 연결과, description/error 의 `aria-describedby` /
 * `aria-invalid` / `aria-required` 연결을 `useUniqueID` 기반으로 자동 처리해요.
 *
 * @example
 * ```tsx
 * <UniqueIDProvider>
 *   <Field invalid required>
 *     <Field.Label>이메일</Field.Label>
 *     <Field.Control>
 *       <input type="email" />
 *     </Field.Control>
 *     <Field.Description>회사 이메일을 입력하세요.</Field.Description>
 *     <Field.Error>올바른 이메일이 아니에요.</Field.Error>
 *   </Field>
 * </UniqueIDProvider>
 * ```
 */
export const Field: FieldComponent = Object.assign(FieldRoot, {
  Label: FieldLabel,
  Control: FieldControl,
  Description: FieldDescription,
  Error: FieldError,
})
