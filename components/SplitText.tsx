"use client";

import { Fragment } from "react";
import { motion } from "motion/react";

type Segment = { text: string; className?: string };

const TAGS = { h1: motion.h1, h2: motion.h2, p: motion.p } as const;

/**
 * Word-by-word rise-in. Each word sits in an overflow-hidden box so it appears
 * to slide up from behind the line above. Segments let part of a heading carry
 * its own class (e.g. the gradient word).
 */
export default function SplitText({
  segments,
  delay = 0,
  stagger = 0.045,
  className = "",
  tag = "h1",
}: {
  segments: Segment[];
  delay?: number;
  stagger?: number;
  className?: string;
  tag?: keyof typeof TAGS;
}) {
  const Tag = TAGS[tag];

  // Flatten to words, remembering which segment each came from.
  const words: Segment[] = segments.flatMap((seg) =>
    seg.text.split(" ").filter(Boolean).map((w) => ({ text: w, className: seg.className })),
  );

  const plain = words.map((w) => w.text).join(" ");

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={plain}
    >
      {words.map((w, i) => (
        <Fragment key={`${w.text}-${i}`}>
          <span className="word" aria-hidden="true">
            <motion.span
              className={w.className}
              variants={{
                hidden: { y: "112%", opacity: 0 },
                show: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {w.text}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

export type { Segment };
