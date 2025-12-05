import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// 테스트 환경에서 Lottie 라이브러리 임포트 시 발생하는 아래 에러를 우회함
// TypeError: Cannot set properties of null (setting 'fillStyle')
vi.mock('lottie-web/build/player/lottie_light', () => ({}))
