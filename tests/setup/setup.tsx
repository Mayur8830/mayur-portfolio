import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
import { FakeObserver, installFrames, installMatchMedia, media, observers } from '../support/browser'

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt, priority: _p, ...rest }: { src: string; alt: string; priority?: boolean }) => <img src={src} alt={alt} {...rest} />,
}))
vi.mock('next/font/google', () => {
  const font = (name: string) => () => ({ variable: `--font-${name}`, className: name })
  return { Bricolage_Grotesque: font('display'), Inter_Tight: font('sans'), JetBrains_Mono: font('mono') }
})

beforeEach(() => {
  media.finePointer = true
  media.reducedMotion = false
  observers.length = 0
  installMatchMedia()
  installFrames()
  window.IntersectionObserver = FakeObserver as unknown as typeof IntersectionObserver
  sessionStorage.clear()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.useRealTimers()
})
