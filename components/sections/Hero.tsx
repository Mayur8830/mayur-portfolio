"use client";

import Image from "next/image";
import { motion } from "motion/react";

import Counter from "../Counter";
import Magnetic from "../Magnetic";
import SplitText from "../SplitText";
import Tilt from "../Tilt";
import { IconArrow, IconDownload } from "../icons";
import { profile, stats } from "@/data/portfolio";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div>
          <motion.span className="hero__badge" {...rise(0.2)}>
            <span className="pulse" aria-hidden="true" />
            {profile.location} · Full Stack Developer
          </motion.span>

          <SplitText
            tag="h1"
            className="hero__title"
            delay={0.28}
            stagger={0.052}
            segments={[
              { text: "I build web applications" },
              { text: "from idea", className: "grad" },
              { text: "to production." },
            ]}
          />

          <motion.p className="hero__lede" {...rise(0.62)}>
            I’m Mayur, a full stack developer working with React, Next.js and Node.js.
            I build web applications across frontend, backend and cloud, with
            experience in AI and voice integrations.
          </motion.p>

          <motion.div className="hero__cta" {...rise(0.72)}>
            <Magnetic strength={0.3}>
              <a className="btn btn--solid" href="#work" data-cursor="link">
                View my work
                <IconArrow />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a className="btn btn--down" href={profile.resume} download data-cursor="link">
                Download resume
                <IconDownload />
              </a>
            </Magnetic>
          </motion.div>

          <motion.dl className="hero__stats" {...rise(0.84)}>
            {stats.map((s) => (
              <div key={s.k}>
                <dd className="stat__v">
                  {typeof s.n === "number"
                    ? <Counter value={s.n} suffix={s.suffix ?? ""} />
                    : s.v}
                </dd>
                <dt className="stat__k">{s.k}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="hero__portrait"
          initial={{ opacity: 0, scale: 0.94, y: 26 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Tilt max={8}>
            <div className="portrait" data-cursor="label" data-cursor-label={profile.initials}>
              <div className="portrait__inner">
                <Image
                  src={profile.portrait}
                  alt={`Portrait of ${profile.name}`}
                  width={1372}
                  height={1296}
                  priority
                  sizes="(max-width: 940px) 90vw, 420px"
                />
                <div className="portrait__scrim" />
                <div className="portrait__cap">
                  <span>
                    <span className="portrait__name">{profile.name}</span>
                    <span className="portrait__role">{profile.role}</span>
                  </span>
                  <span className="portrait__chip">{profile.focus}</span>
                </div>
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}
