import { vi } from 'vitest'

/**
 * A controllable browser: which media queries match, IntersectionObservers a test can fire,
 * and requestAnimationFrame callbacks a test runs frame by frame.
 */
export const media = { finePointer: true, reducedMotion: false }

export function installMatchMedia() {
  window.matchMedia = ((query: string) => ({
    matches:
      (query.includes('prefers-reduced-motion') && media.reducedMotion) ||
      (query.includes('pointer: fine') && media.finePointer),
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia
}

export const observers: FakeObserver[] = []
export class FakeObserver {
  elements: Element[] = []
  disconnected = false
  constructor(readonly callback: IntersectionObserverCallback, readonly options?: IntersectionObserverInit) {
    observers.push(this)
  }
  observe(el: Element) {
    this.elements.push(el)
  }
  unobserve() {}
  disconnect() {
    this.disconnected = true
  }
  takeRecords() {
    return []
  }
  /** Reports every observed element as (not) intersecting. */
  fire(isIntersecting = true) {
    this.callback(this.elements.map((target) => ({ isIntersecting, target }) as IntersectionObserverEntry), this as never)
  }
}

let frames: { id: number; cb: FrameRequestCallback }[] = []
let nextId = 1
let clock = 0
export function installFrames() {
  frames = []
  clock = 0
  window.requestAnimationFrame = (cb) => {
    const id = nextId++
    frames.push({ id, cb })
    return id
  }
  window.cancelAnimationFrame = (id) => {
    frames = frames.filter((f) => f.id !== id)
  }
  vi.spyOn(performance, 'now').mockImplementation(() => clock)
}
/** Runs the queued frames `count` times, advancing the clock `ms` each time. */
export function runFrames(count = 1, ms = 16) {
  for (let i = 0; i < count; i++) {
    clock += ms
    const due = frames
    frames = []
    for (const f of due) f.cb(clock)
  }
}
export const pendingFrames = () => frames.length
