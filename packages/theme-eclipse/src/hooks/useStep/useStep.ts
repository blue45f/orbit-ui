import { useCallback, useMemo, useState } from 'react'

export type UseStepOptions = {
  /** 총 단계 수 (1-based, total >= 1) */
  total: number
  /** 초기 단계 (1-based, default 1) */
  initial?: number
}

export type UseStepReturn = {
  /** 현재 단계 (1-based) */
  current: number
  /** 총 단계 */
  total: number
  /** 0-1 진행률 (current/total) */
  progress: number
  /** 다음 단계로. 마지막이면 무시. */
  next: () => void
  /** 이전 단계로. 첫 단계면 무시. */
  prev: () => void
  /** 특정 단계로 점프 (범위 밖이면 clamp) */
  goTo: (step: number) => void
  /** 첫 단계로 리셋 */
  reset: () => void
  /** 첫 단계인가 */
  isFirst: boolean
  /** 마지막 단계인가 */
  isLast: boolean
  /** 완료 직후 next 호출 후 사용. 마지막을 넘어 +1을 만들 수는 없으나 isLast 후 isCompleted 플래그로 외부에서 분기. */
  isCompleted: boolean
}

/**
 * 다단계 폼·온보딩·튜토리얼·결제 흐름을 위한 step state.
 *
 * @example
 * ```tsx
 * const step = useStep({ total: 3 })
 *
 * return (
 *   <>
 *     <Progress value={step.progress * 100} />
 *     <PageIndicator currentPage={step.current - 1} onPageChange={(i) => step.goTo(i + 1)}>
 *       {Array.from({ length: step.total }).map((_, i) => <span key={i} />)}
 *     </PageIndicator>
 *     {step.current === 1 && <StepInfo />}
 *     {step.current === 2 && <StepReview />}
 *     {step.current === 3 && <StepDone />}
 *     <SolidButton onClick={step.isLast ? handleSubmit : step.next}>
 *       {step.isLast ? '제출' : '다음'}
 *     </SolidButton>
 *   </>
 * )
 * ```
 */
export function useStep(options: UseStepOptions): UseStepReturn {
  const { total, initial = 1 } = options
  if (total < 1) throw new Error('useStep: total must be >= 1')

  const [current, setCurrent] = useState<number>(() => clamp(initial, 1, total))
  const [isCompleted, setCompleted] = useState(false)

  const next = useCallback(() => {
    setCurrent((c) => {
      if (c >= total) {
        setCompleted(true)
        return c
      }
      return c + 1
    })
  }, [total])

  const prev = useCallback(() => {
    setCurrent((c) => (c <= 1 ? c : c - 1))
    setCompleted(false)
  }, [])

  const goTo = useCallback(
    (step: number) => {
      setCurrent(clamp(step, 1, total))
      setCompleted(false)
    },
    [total],
  )

  const reset = useCallback(() => {
    setCurrent(clamp(initial, 1, total))
    setCompleted(false)
  }, [initial, total])

  return useMemo(
    () => ({
      current,
      total,
      progress: current / total,
      next,
      prev,
      goTo,
      reset,
      isFirst: current === 1,
      isLast: current === total,
      isCompleted,
    }),
    [current, total, next, prev, goTo, reset, isCompleted],
  )
}

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min
  if (value > max) return max
  return value
}
