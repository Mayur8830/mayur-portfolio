import Hero from "@/components/sections/Hero";
import ExperienceRail from "@/components/ExperienceRail";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import { IconArrowUpRight } from "@/components/icons";
import {
  about, capabilities, education, experience, profile, work,
} from "@/data/portfolio";

const [lead, ...rest] = work;

/** Bento spans over a 6-column grid: feature, two halves, three thirds. */
const CAP_SPAN = [
  "cap-cell--feature",
  "cap-cell--half",
  "cap-cell--half",
  "cap-cell--sm",
  "cap-cell--sm",
  "cap-cell--sm",
];

/** One accent per group, used for the rule, dot, glow and chip hover. */
const CAP_ACCENT = ["#7c5cff", "#34e2f0", "#ff5fa2", "#ffb45c", "#4ade80", "#8aa4ff"];

/** A curated ribbon of the headline skills, pulled straight from capabilities. */
const ribbon = [
  ...capabilities[0].items.slice(0, 8),
  ...capabilities[1].items.slice(0, 4),
  ...capabilities[2].items.slice(0, 3),
  ...capabilities[4].items.slice(0, 3),
];

const contactLinks = [
  { k: "Email", v: profile.email, href: `mailto:${profile.email}`, ext: false },
  { k: "LinkedIn", v: profile.linkedin.replace("https://", ""), href: profile.linkedin, ext: true },
  { k: "GitHub", v: profile.github.replace("https://", ""), href: profile.github, ext: true },
  { k: "Phone", v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, ext: false },
];

export default function Home() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Nav initials={profile.initials} cta="Get in touch" />

      <div className="shell">
        <main id="main">
          <Hero />

          <Marquee items={ribbon} />

          {/* ------------------------------ work ------------------------------ */}
          <section className="section" id="work">
            <div className="wrap">
              <div className="work__head">
                <div>
                  <Reveal as="span" className="eyebrow">Selected work</Reveal>
                  <Reveal delay={60}>
                    <h2 className="section-title">Things I built and shipped.</h2>
                  </Reveal>
                  <Reveal delay={120}>
                    <p className="section-lede">
                      Five products across three industries — each one owned from the
                      architecture conversation through to the deploy.
                    </p>
                  </Reveal>
                </div>
                <Reveal as="span" className="work__count" delay={160}>
                  {String(work.length).padStart(2, "0")} projects
                </Reveal>
              </div>

              <div className="work__list">
                <Reveal>
                  <Spotlight className="wcard wcard--lead">
                    <span className="wcard__flag">
                      <span className="pulse" aria-hidden="true" />
                      Most recent AI work
                    </span>
                    <div className="wcard__top">
                      <div>
                        <h3 className="wcard__title">{lead.title}</h3>
                        <span className="wcard__meta">{lead.meta}</span>
                      </div>
                      <span className="wcard__idx">01</span>
                    </div>
                    <p className="wcard__body">{lead.body}</p>
                    <ul className="wcard__points">
                      {lead.points.map((pt) => <li key={pt}>{pt}</li>)}
                    </ul>
                    <div className="tags">
                      {lead.tags.map((t) => (
                        <span key={t} className={lead.keyTags.includes(t) ? "tag tag--key" : "tag"}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </Spotlight>
                </Reveal>

                {rest.map((p, i) => (
                  <Reveal key={p.title} delay={i * 70}>
                    <Spotlight className="wcard">
                      <div className="wcard__top">
                        <div>
                          <h3 className="wcard__title">{p.title}</h3>
                          <span className="wcard__meta">{p.meta}</span>
                        </div>
                        <span className="wcard__idx">{String(i + 2).padStart(2, "0")}</span>
                      </div>
                      <p className="wcard__body">{p.body}</p>
                      <ul className="wcard__points">
                        {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                      </ul>
                      <div className="tags">
                        {p.tags.map((t) => (
                          <span key={t} className={p.keyTags.includes(t) ? "tag tag--key" : "tag"}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </Spotlight>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* -------------------------- capabilities -------------------------- */}
          <section className="section" id="skills">
            <div className="wrap">
              <Reveal delay={60}>
                <h2 className="section-title">The stack I reach for.</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="section-lede" style={{ marginBottom: 46 }}>
                  Weighted towards what I actually ship with — the AI side first,
                  because that&rsquo;s where most of my recent work lives.
                </p>
              </Reveal>

              <div className="caps">
                {capabilities.map((c, i) => (
                  <Reveal
                    key={c.name}
                    delay={i * 60}
                    className={`cap-cell ${CAP_SPAN[i] ?? "cap-cell--sm"}`}
                  >
                    <Spotlight
                      className={`cap ${i === 0 ? "cap--feature" : ""}`.trim()}
                      style={{ "--c": CAP_ACCENT[i % CAP_ACCENT.length] } as React.CSSProperties}
                    >
                      <span className="cap__ghost" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="cap__head">
                        <h3 className="cap__name">
                          <span className="cap__dot" aria-hidden="true" />
                          {c.name}
                        </h3>
                        <span className="cap__n">
                          {String(c.items.length).padStart(2, "0")}
                          <em>skills</em>
                        </span>
                      </div>
                      <div className="cap__items">
                        {c.items.map((it) => (
                          <span key={it} className="cap__item">{it}</span>
                        ))}
                      </div>
                    </Spotlight>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* --------------------------- experience --------------------------- */}
          <section className="section" id="experience">
            <div className="wrap">
              <Reveal as="span" className="eyebrow">Experience</Reveal>
              <Reveal delay={60}>
                <h2 className="section-title" style={{ marginBottom: 46 }}>
                  Where I&rsquo;ve been.
                </h2>
              </Reveal>

              <ExperienceRail>
                {experience.map((x, i) => (
                  <Reveal key={x.org + x.when} delay={i * 70}>
                    <div className={`xp__item ${i === 0 ? "xp__item--now" : ""}`.trim()}>
                      <span className="xp__when">{x.when}</span>
                      <div>
                        <h3 className="xp__role">
                          {x.role} <span className="xp__org">· {x.org}</span>
                        </h3>
                        <p className="xp__note">{x.note}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
                <Reveal delay={experience.length * 70}>
                  <div className="xp__item">
                    <span className="xp__when">{education.when}</span>
                    <div>
                      <h3 className="xp__role">
                        {education.degree} <span className="xp__org">· {education.school}</span>
                      </h3>
                      <p className="xp__note">Graduated with {education.score}.</p>
                    </div>
                  </div>
                </Reveal>
              </ExperienceRail>
            </div>
          </section>

          {/* ------------------------------ about ------------------------------ */}
          <section className="section" id="about">
            <div className="wrap">
              <Reveal as="span" className="eyebrow">About</Reveal>
              <div className="about">
                <div className="about__body">
                  {about.map((para, i) => (
                    <Reveal key={para.slice(0, 24)} delay={i * 90}>
                      <p>{para}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ----------------------------- contact ----------------------------- */}
          <section className="section" id="contact">
            <div className="wrap">
              <Reveal as="span" className="eyebrow">Contact</Reveal>
              <Reveal delay={60}>
                <h2 className="contact__title">Always up for a good problem.</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="section-lede">
                  If you&rsquo;re building something interesting — or just want to talk
                  about retrieval, agents or why your latency is bad — I&rsquo;m easy to reach.
                </p>
              </Reveal>

              <div className="links">
                {contactLinks.map((l, i) => (
                  <Reveal key={l.k} delay={i * 60}>
                    <a
                      className="link"
                      href={l.href}
                      data-cursor="label"
                      data-cursor-label={l.k}
                      {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className="link__k">{l.k}</span>
                      <span className="link__v">
                        {l.v}
                        <IconArrowUpRight />
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  );
}
