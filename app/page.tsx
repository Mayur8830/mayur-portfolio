import Hero from "@/components/sections/Hero";
import ExperienceRail from "@/components/ExperienceRail";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import { IconArrowUpRight } from "@/components/icons";
import {
  capabilities, education, experience, profile, work,
} from "@/data/portfolio";

const contactLinks = [
  { k: "Email", v: profile.email, href: `mailto:${profile.email}`, ext: false },
  { k: "LinkedIn", v: profile.linkedin.replace("https://", ""), href: profile.linkedin, ext: true },
  { k: "GitHub", v: profile.github.replace("https://", ""), href: profile.github, ext: true },
  { k: "Resume", v: "View my resume", href: profile.resume, ext: true },
];

export default function Home() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Nav initials={profile.initials} cta="Let’s talk" />

      <div className="shell portfolio-compact">
        <main id="main">
          <Hero />

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
                      Web applications across sports, education and fintech.
                    </p>
                  </Reveal>
                </div>
                <Reveal as="span" className="work__count" delay={160}>
                  {String(work.length).padStart(2, "0")} projects
                </Reveal>
              </div>

              <div className="project-grid">
                {work.map((project, index) => (
                  <Reveal key={project.title} delay={index * 50}>
                    <Spotlight className="wcard project-card">
                      <h3 className="wcard__title">{project.title}</h3>
                      <span className="wcard__meta">{project.meta}</span>
                      <p className="wcard__body">{project.body}</p>
                      <div className="tags">
                        {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                      </div>
                    </Spotlight>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="skills">
            <div className="wrap">
              <Reveal><h2 className="section-title">My toolkit.</h2></Reveal>
              <div className="toolkit">
                {capabilities.map((group) => (
                  <Reveal key={group.name} className="toolkit__row">
                    <h3>{group.name}</h3>
                    <div>
                      <p>{group.items.join(" · ")}</p>
                    </div>
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
                  Experience & background.
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

          {/* ----------------------------- contact ----------------------------- */}
          <section className="section" id="contact">
            <div className="wrap">
              <Reveal as="span" className="eyebrow">Contact</Reveal>
              <Reveal delay={60}>
                <h2 className="contact__title">Let’s connect.</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="section-lede">
                  Have a role, a project or a collaboration in mind? I’d be happy to hear from you.
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
