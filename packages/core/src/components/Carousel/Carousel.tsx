import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ArrowLeftIcon, ArrowRightIcon, PauseLineIcon, PlayFillIcon } from '@heejun-com/icons'

import { cn } from '../../styles'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
  /** 자동 재생 활성화 (opt-in). prefers-reduced-motion 환경에서는 무시된다. */
  autoPlay?: boolean
  /** 자동 재생 간격(ms) @default 4000 */
  autoPlayInterval?: number
}

/** prefers-reduced-motion 사용자 환경이면 true */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  /** 자동 재생 사용 여부 (autoPlay prop). reduced-motion 으로 비활성된 경우 false */
  autoPlayEnabled: boolean
  /** 현재 슬라이드가 자동 전환 중인지 여부 (일시정지/탭 비표시 시 false) */
  isPlaying: boolean
  /** 자동 재생 일시정지/재개 토글 (autoPlay 가 켜졌을 때만 의미 있음) */
  toggleAutoPlay: () => void
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

const CarouselRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      autoPlay = false,
      autoPlayInterval = 4000,
      className,
      children,
      ...props
    },
    ref
  ) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  // reduced-motion 환경이면 autoPlay 를 강제로 끈다.
  const autoPlayEnabled = autoPlay && !prefersReducedMotion()

  // 사용자가 수동으로 일시정지했는지 (pause/play 토글)
  const [paused, setPaused] = React.useState(false)
  // 포인터 호버 / 포커스 인 시 일시정지
  const [interacting, setInteracting] = React.useState(false)

  // 실제 자동 전환이 동작 중인지: autoPlay 켜짐 && 수동 일시정지 아님 && 상호작용 중 아님
  const isPlaying = autoPlayEnabled && !paused && !interacting

  const toggleAutoPlay = React.useCallback(() => {
    setPaused((prev) => !prev)
  }, [])

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return
    }

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }

    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on('reInit', onSelect)
    api.on('select', onSelect)
    // schedule initial sync as a microtask to avoid synchronous setState in effect
    const frame = requestAnimationFrame(() => onSelect(api))

    return () => {
      cancelAnimationFrame(frame)
      api?.off('select', onSelect)
    }
  }, [api, onSelect])

  // 자동 재생: isPlaying 동안 interval 로 다음 슬라이드로 전환한다.
  // 루프(opts.loop)가 꺼져 있고 마지막 슬라이드면 처음으로 되돌려 순환을 유지한다.
  // 일시정지/언마운트 시 interval 을 정리한다.
  React.useEffect(() => {
    if (!api || !isPlaying) {
      return
    }

    const id = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, autoPlayInterval)

    return () => clearInterval(id)
  }, [api, isPlaying, autoPlayInterval])

  const contextValue = React.useMemo(
    () => ({
      carouselRef,
      api,
      opts,
      orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
      autoPlayEnabled,
      isPlaying,
      toggleAutoPlay,
    }),
    [
      carouselRef,
      api,
      opts,
      orientation,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
      autoPlayEnabled,
      isPlaying,
      toggleAutoPlay,
    ]
  )

  // 자동 재생 중 포인터 호버 / 포커스 인 시 일시정지, 벗어나면 재개한다.
  const pauseHandlers = autoPlayEnabled
    ? {
        onPointerEnter: () => setInteracting(true),
        onPointerLeave: () => setInteracting(false),
        onFocusCapture: () => setInteracting(true),
        onBlurCapture: (event: React.FocusEvent<HTMLDivElement>) => {
          // 포커스가 캐러셀 외부로 나갈 때만 재개 (내부 이동은 유지)
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setInteracting(false)
          }
        },
      }
    : null

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        aria-label={props['aria-label'] ?? 'carousel'}
        {...pauseHandlers}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
  }
)
CarouselRoot.displayName = 'Carousel'

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel()

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          // 슬라이드 전환을 스크린 리더에 알린다 (자동/수동 모두). atomic=false 로 변경된 슬라이드만 announce.
          aria-live="polite"
          aria-atomic="false"
          className={cn(
            'flex',
            orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
CarouselContent.displayName = 'CarouselContent'

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel()

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          'min-w-0 shrink-0 grow-0 basis-full',
          orientation === 'horizontal' ? 'pl-4' : 'pt-4',
          className
        )}
        {...props}
      />
    )
  }
)
CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <button
      ref={ref}
      className={cn(
        'absolute h-8 w-8 rounded-full border border-[var(--sem-eclipse-color-borderTertiary)] bg-[var(--sem-eclipse-color-surfaceContainer)] text-[var(--sem-eclipse-color-foregroundSecondary)] shadow-[var(--sem-eclipse-shadow-level1)] transition-colors hover:bg-[var(--sem-eclipse-color-fillSecondary)] hover:text-[var(--sem-eclipse-color-foregroundPrimary)] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--sem-base-focus-ring-color)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center',
        orientation === 'horizontal'
          ? '-left-12 top-1/2 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeftIcon className="h-4 w-4" tone="soft" />
      <span className="sr-only">Previous slide</span>
    </button>
  )
})
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <button
      ref={ref}
      className={cn(
        'absolute h-8 w-8 rounded-full border border-[var(--sem-eclipse-color-borderTertiary)] bg-[var(--sem-eclipse-color-surfaceContainer)] text-[var(--sem-eclipse-color-foregroundSecondary)] shadow-[var(--sem-eclipse-shadow-level1)] transition-colors hover:bg-[var(--sem-eclipse-color-fillSecondary)] hover:text-[var(--sem-eclipse-color-foregroundPrimary)] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--sem-base-focus-ring-color)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center',
        orientation === 'horizontal'
          ? '-right-12 top-1/2 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRightIcon className="h-4 w-4" tone="soft" />
      <span className="sr-only">Next slide</span>
    </button>
  )
})
CarouselNext.displayName = 'CarouselNext'

/**
 * 자동 재생 일시정지/재개 토글. `autoPlay` 가 켜진 경우에만 렌더되며,
 * 그 외에는 null 을 반환한다. aria-pressed 로 일시정지 상태를 표기한다.
 */
const CarouselPlayToggle = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { autoPlayEnabled, isPlaying, toggleAutoPlay } = useCarousel()

  if (!autoPlayEnabled) {
    return null
  }

  const label = isPlaying ? '자동 재생 일시정지' : '자동 재생 시작'

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      aria-pressed={!isPlaying}
      className={cn(
        'absolute right-2 bottom-2 z-10 h-8 w-8 rounded-full border border-[var(--sem-eclipse-color-borderTertiary)] bg-[var(--sem-eclipse-color-surfaceContainer)] text-[var(--sem-eclipse-color-foregroundSecondary)] shadow-[var(--sem-eclipse-shadow-level1)] transition-colors hover:bg-[var(--sem-eclipse-color-fillSecondary)] hover:text-[var(--sem-eclipse-color-foregroundPrimary)] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--sem-base-focus-ring-color)] focus-visible:outline-offset-2 flex items-center justify-center',
        className
      )}
      onClick={(event) => {
        toggleAutoPlay()
        onClick?.(event)
      }}
      {...props}
    >
      {isPlaying ? (
        <PauseLineIcon className="h-4 w-4" tone="soft" />
      ) : (
        <PlayFillIcon className="h-4 w-4" tone="soft" />
      )}
      <span className="sr-only">{label}</span>
    </button>
  )
})
CarouselPlayToggle.displayName = 'CarouselPlayToggle'

export const Carousel = Object.assign(CarouselRoot, {
  Content: CarouselContent,
  Item: CarouselItem,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  PlayToggle: CarouselPlayToggle,
})
