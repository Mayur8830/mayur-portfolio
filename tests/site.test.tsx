import { act, fireEvent, render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, test, vi } from 'vitest'
import RootLayout, { metadata, viewport } from '@/app/layout'
import Home from '@/app/page'
import { capabilities, education, experience, profile, stats, work } from '@/data/portfolio'
import Counter from '@/components/Counter'
import Cursor from '@/components/Cursor'
import Field from '@/components/Field'
import Intro from '@/components/Intro'
import Magnetic from '@/components/Magnetic'
import Marquee from '@/components/Marquee'
import Nav from '@/components/Nav'
import Reveal from '@/components/Reveal'
import SmoothScroll from '@/components/SmoothScroll'
import Spotlight from '@/components/Spotlight'
import Tilt from '@/components/Tilt'
import { IconTop } from '@/components/icons'
import { media, observers, pendingFrames, runFrames } from './support/browser'
import { knownBug } from './support/known-bug'

// Lenis does real scrolling; a stand-in records what SmoothScroll asks of it.
const lenis = vi.hoisted(() => ({ instances: [] as { raf: ReturnType<typeof vi.fn>; scrollTo: ReturnType<typeof vi.fn>; destroy: ReturnType<typeof vi.fn>; options: unknown }[] }))
vi.mock('lenis', () => ({
  default: class {
    raf = vi.fn()
    scrollTo = vi.fn()
    destroy = vi.fn()
    constructor(readonly options: unknown) {
      lenis.instances.push(this as never)
    }
  },
}))

const repo = path.resolve(__dirname, '..')

describe('content', () => {
  test('metadata, viewport and the layout chrome', () => {
    expect(metadata.title).toEqual({ default: 'Mayur Kale — Full Stack Developer', template: '%s — Mayur Kale' })
    expect(viewport).toEqual({ themeColor: '#05060b', colorScheme: 'dark' })
    const html = renderToStaticMarkup(<RootLayout>{<p>child</p>}</RootLayout>)
    expect(html).toContain('class="--font-display --font-sans --font-mono"')
    expect(html).toContain('<p>child</p>')
    expect(html).toContain("sessionStorage.getItem('mk-intro')")
  })

  test('the home page lists every project, skill group, job and contact link', () => {
    render(<Home />)
    for (const project of work) expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    expect(screen.getByText(`0${work.length} projects`)).toBeInTheDocument()
    for (const group of capabilities) expect(screen.getByText(group.items.join(' · '))).toBeInTheDocument()
    for (const job of experience) expect(screen.getByText(job.when)).toBeInTheDocument()
    expect(screen.getByText(`Graduated with ${education.score}.`)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Email/ })).toHaveAttribute('href', `mailto:${profile.email}`)
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link', { name: /Email/ })).not.toHaveAttribute('target')
    expect(screen.getByRole('link', { name: /Download resume/ })).toHaveAttribute('download')
    expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('aria-label', 'I build web applications from idea to production.')
  })

  test('the resume and portrait the page links to exist', () => {
    for (const file of [profile.resume, profile.portrait]) expect(existsSync(path.join(repo, 'public', file))).toBe(true)
    expect(stats.filter((s) => typeof s.n === 'number')).toHaveLength(2)
  })

  // FINDING: data/portfolio.ts still has "TODO: replace with your real handles" — the GitHub
  // link is github.com/mayurkale, but the account the projects live under is Mayur8830.
  knownBug('the GitHub link points at the real account', () => {
    expect(profile.github).toBe('https://github.com/Mayur8830')
  })
})

describe('Reveal and Counter (scroll-in effects)', () => {
  test('Reveal waits for the element to enter view, once', () => {
    render(<Reveal as="span" delay={60} className="x">hi</Reveal>)
    const el = screen.getByText('hi')
    expect(el).toHaveClass('reveal', 'x')
    expect(el.style.getPropertyValue('--d')).toBe('60ms')
    observers[0].fire(false)
    expect(el).not.toHaveClass('reveal--in')
    observers[0].fire(true)
    expect(el).toHaveClass('reveal--in')
    expect(observers[0].disconnected).toBe(true)
  })

  test('Reveal shows at once under reduced motion', () => {
    media.reducedMotion = true
    render(<Reveal>calm</Reveal>)
    expect(screen.getByText('calm')).toHaveClass('reveal--in')
    expect(observers).toHaveLength(0)
  })

  test('Counter counts up with an ease-out once visible', () => {
    const { container } = render(<Counter value={5} suffix=" yrs" duration={100} />)
    const el = container.querySelector('span')!
    expect(el).toHaveTextContent('0 yrs')
    observers[0].fire(false)
    expect(pendingFrames()).toBe(0)
    observers[0].fire(true)
    runFrames(1, 50)
    expect(Number(el.textContent!.split(' ')[0])).toBeGreaterThan(0)
    runFrames(5, 50)
    expect(el).toHaveTextContent('5 yrs')
    expect(pendingFrames()).toBe(0)
  })

  test('Counter settles immediately under reduced motion', () => {
    media.reducedMotion = true
    const { container } = render(<Counter value={3} prefix="~" />)
    expect(container.querySelector('span')).toHaveTextContent('~3')
  })
})

describe('Intro curtain', () => {
  test('first visit: holds the page, then lifts after the meter fills', () => {
    vi.useFakeTimers()
    render(<Intro />)
    expect(screen.getByText('MK')).toBeInTheDocument()
    expect(document.body.style.overflow).toBe('hidden')
    expect(sessionStorage.getItem('mk-intro')).toBe('1')
    act(() => vi.advanceTimersByTime(1750))
    expect(document.body.style.overflow).toBe('')
  })

  test('a repeat visit or reduced motion skips it straight away', () => {
    vi.useFakeTimers()
    sessionStorage.setItem('mk-intro', '1')
    const { unmount } = render(<Intro mark="X" />)
    expect(document.body.style.overflow).toBe('')
    act(() => vi.advanceTimersByTime(0))
    unmount()
    sessionStorage.clear()
    media.reducedMotion = true
    render(<Intro />)
    expect(sessionStorage.getItem('mk-intro')).toBeNull()
  })
})

describe('pointer effects', () => {
  test('Field drifts its glow toward the pointer, or hides it on touch screens', () => {
    const { container, unmount } = render(<Field />)
    const glow = container.querySelector<HTMLElement>('.field__pointer')!
    fireEvent.pointerMove(window, { clientX: 100, clientY: 100 })
    runFrames(2)
    expect(glow.style.transform).toMatch(/^translate3d\(/)
    unmount()

    media.finePointer = false
    const touch = render(<Field />)
    expect(touch.container.querySelector<HTMLElement>('.field__pointer')!.style.opacity).toBe('0')
  })

  test('Magnetic pulls toward the pointer and springs back', () => {
    render(<Magnetic strength={0.5}><button>pull</button></Magnetic>)
    const wrapper = screen.getByText('pull').parentElement!
    vi.spyOn(wrapper, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 100, height: 40 } as DOMRect)
    fireEvent.pointerMove(wrapper, { clientX: 90, clientY: 30 })
    runFrames(3)
    expect(wrapper.style.transform).toMatch(/translate3d\(\d/)
    fireEvent.pointerLeave(wrapper)
    runFrames(200)
    expect(wrapper.style.transform).toBe('')
  })

  test('Magnetic and Tilt do nothing on touch screens or under reduced motion', () => {
    media.finePointer = false
    render(<><Magnetic><b>m</b></Magnetic><Tilt><div><i>t</i></div></Tilt></>)
    fireEvent.pointerMove(screen.getByText('m').parentElement!, { clientX: 5, clientY: 5 })
    expect(pendingFrames()).toBe(0)
    media.finePointer = true
    media.reducedMotion = true
    render(<Tilt><div /></Tilt>)
    expect(pendingFrames()).toBe(0)
  })

  test('Tilt rotates its child toward the pointer and settles back', () => {
    const { container } = render(<Tilt max={10}><div className="inner" /></Tilt>)
    const outer = container.firstElementChild as HTMLElement
    const inner = container.querySelector<HTMLElement>('.inner')!
    vi.spyOn(outer, 'getBoundingClientRect').mockReturnValue({ left: 0, top: 0, width: 200, height: 200 } as DOMRect)
    fireEvent.pointerMove(outer, { clientX: 200, clientY: 0 })
    runFrames(2)
    expect(inner.style.transform).toMatch(/rotateY\(\d/)
    fireEvent.pointerLeave(outer)
    runFrames(300)
    expect(pendingFrames()).toBe(0)
  })

  test('Tilt with no child does nothing', () => {
    render(<Tilt>{null}</Tilt>)
    expect(pendingFrames()).toBe(0)
  })

  test('Spotlight feeds the pointer position to CSS', () => {
    render(<Spotlight className="c" data-x="1">card</Spotlight>)
    const card = screen.getByText('card')
    vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({ left: 10, top: 20 } as DOMRect)
    fireEvent.pointerMove(card, { clientX: 30, clientY: 50 })
    expect(card.style.getPropertyValue('--mx')).toBe('20px')
    expect(card.style.getPropertyValue('--my')).toBe('30px')
    expect(card).toHaveClass('card', 'c')
  })
})

describe('Cursor', () => {
  const ctx = { setTransform: vi.fn(), clearRect: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), stroke: vi.fn(), lineCap: '', lineJoin: '', lineWidth: 0, strokeStyle: '' }

  test('draws a trail, tracks hover states and hides when the pointer leaves', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx as never)
    const { container, unmount } = render(
      <>
        <Cursor />
        <a data-cursor="label" data-cursor-label="Resume">link</a>
        <span data-cursor="label">default label</span>
      </>,
    )
    const root = container.querySelector<HTMLElement>('.cursor')!
    expect(document.body).toHaveClass('has-cursor')

    fireEvent.pointerMove(screen.getByText('link'), { clientX: 40, clientY: 40 })
    expect(root).not.toHaveClass('cursor--hidden')
    expect(root.dataset.state).toBe('label')
    expect(container.querySelector('.cursor__label')).toHaveTextContent('Resume')
    fireEvent.pointerMove(document.body, { clientX: 50, clientY: 50 }) // off the link first
    fireEvent.pointerMove(screen.getByText('default label'), { clientX: 60, clientY: 60 })
    fireEvent.pointerMove(screen.getByText('default label'), { clientX: 61, clientY: 61 })
    expect(container.querySelector('.cursor__label')).toHaveTextContent('View')
    runFrames(30)
    expect(ctx.stroke).toHaveBeenCalled()

    fireEvent.pointerDown(window)
    expect(root.dataset.state).toBe('down')
    fireEvent.pointerUp(window)
    fireEvent.pointerMove(document.body, { clientX: 1, clientY: 1 })
    expect(root.dataset.state).toBe('')
    runFrames(2)
    fireEvent(window, new Event('resize'))
    fireEvent.pointerLeave(document)
    expect(root).toHaveClass('cursor--hidden')
    fireEvent.pointerEnter(document)
    expect(root).not.toHaveClass('cursor--hidden')

    unmount()
    expect(document.body).not.toHaveClass('has-cursor')
  })

  // FINDING: the label is refreshed only when the hover *state* changes, so moving straight from
  // one labelled element to another (the adjacent contact links) keeps the first one's label.
  knownBug('moving between two labelled elements shows the second label', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(ctx as never)
    const { container } = render(
      <>
        <Cursor />
        <a data-cursor="label" data-cursor-label="Email">email</a>
        <a data-cursor="label" data-cursor-label="GitHub">github</a>
      </>,
    )
    fireEvent.pointerMove(screen.getByText('email'), { clientX: 1, clientY: 1 })
    fireEvent.pointerMove(screen.getByText('github'), { clientX: 2, clientY: 2 })
    expect(container.querySelector('.cursor__label')).toHaveTextContent('GitHub')
  })

  test('stays off on touch screens and under reduced motion', () => {
    media.finePointer = false
    render(<Cursor />)
    expect(document.body).not.toHaveClass('has-cursor')
  })
})

describe('navigation and scrolling', () => {
  test('Nav sticks after a little scroll and marks the section in view', () => {
    render(
      <>
        <Nav initials="MK" cta="Let’s talk" />
        <section id="work" />
        <section id="contact" />
      </>,
    )
    const nav = screen.getByRole('navigation')
    expect(nav).not.toHaveClass('nav--stuck')
    Object.defineProperty(document.getElementById('contact'), 'offsetTop', { value: 99999 })
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true })
    fireEvent.scroll(window)
    expect(nav).toHaveClass('nav--stuck')
    expect(screen.getByRole('link', { name: /Work/ })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: /Contact/ })).not.toHaveAttribute('aria-current')
    fireEvent(window, new Event('resize'))
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  })

  test('Nav without sections on the page marks nothing', () => {
    render(<Nav initials="MK" cta="Hi" />)
    expect(screen.getByRole('link', { name: /Work/ })).not.toHaveAttribute('aria-current')
  })

  test('SmoothScroll routes in-page links through Lenis', () => {
    const replace = vi.spyOn(history, 'replaceState')
    const { unmount } = render(
      <>
        <SmoothScroll />
        <a href="#target">go</a>
        <a href="#">top</a>
        <a href="#missing">nowhere</a>
        <a href="/elsewhere">away</a>
        <div id="target" />
      </>,
    )
    const instance = lenis.instances.at(-1)!
    runFrames(1)
    expect(instance.raf).toHaveBeenCalled()
    expect((instance.options as { easing: (t: number) => number }).easing(1)).toBe(1)

    fireEvent.click(screen.getByText('go'))
    expect(instance.scrollTo).toHaveBeenCalledWith(document.getElementById('target'), { offset: -92, duration: 1.3 })
    expect(replace).toHaveBeenCalledWith(null, '', '#target')
    for (const name of ['top', 'nowhere', 'away']) fireEvent.click(screen.getByText(name))
    fireEvent.click(screen.getByText('go'), { metaKey: true })
    expect(instance.scrollTo).toHaveBeenCalledTimes(1)

    unmount()
    expect(instance.destroy).toHaveBeenCalled()
  })

  test('SmoothScroll is off under reduced motion', () => {
    media.reducedMotion = true
    const before = lenis.instances.length
    render(<SmoothScroll />)
    expect(lenis.instances).toHaveLength(before)
  })
})

describe('unused components', () => {
  test('Marquee loops its items and slows on hover', () => {
    const { container } = render(<Marquee items={['React', 'Node']} speed={100} />)
    const track = container.querySelector<HTMLElement>('.marquee__track')!
    const group = track.firstElementChild as HTMLElement
    Object.defineProperty(group, 'offsetWidth', { value: 0, configurable: true })
    runFrames(1)
    expect(track.style.transform).toBe('')
    Object.defineProperty(group, 'offsetWidth', { value: 500, configurable: true })
    runFrames(1, 100)
    expect(track.style.transform).toMatch(/translate3d\(-/)
    fireEvent.pointerEnter(track)
    fireEvent.pointerLeave(track)
    expect(screen.getAllByText('React')).toHaveLength(2)
  })

  test('Marquee stays still under reduced motion; IconTop renders', () => {
    media.reducedMotion = true
    render(<><Marquee items={['A']} /><IconTop /></>)
    expect(pendingFrames()).toBe(0)
    expect(document.querySelector('svg')).not.toBeNull()
  })
})
