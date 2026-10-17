"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { Img, Showcase as ShowcaseData } from "@/content/projects";

type Props = {
  showcase: ShowcaseData;
  tint: [string, string];
  /** "hero" is the large cover on a project page; it loads eagerly. */
  size?: "card" | "hero";
  className?: string;
};

const DURATION: Record<ShowcaseData["kind"], number> = {
  phones: 10,
  browser: 10,
  pan: 12,
  rag: 9,
  loop: 9,
  bars: 8,
  chart: 9,
  video: 54,
};

/**
 * Animated project cover: a short looping "showcase video" built with CSS from the
 * project's own screens and numbers. It only plays while on screen.
 */
export function Showcase({ showcase, tint, size = "card", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.setAttribute("data-play", "");
        else el.removeAttribute("data-play");
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = {
    "--a": tint[0],
    "--b": tint[1],
    "--sc-dur": `${DURATION[showcase.kind]}s`,
  } as CSSProperties;

  const hero = size === "hero";
  // Data covers start mid-loop, so the first (or a paused) frame already shows the finished state.
  const offset = showcase.kind === "rag" || showcase.kind === "bars" || showcase.kind === "chart";

  return (
    <div ref={ref} aria-hidden className={`sc absolute inset-0 overflow-hidden ${offset ? "sc-offset" : ""} ${className}`} style={style}>
      {showcase.kind === "phones" && <Phones screens={showcase.screens} hero={hero} />}
      {showcase.kind === "browser" && <Browser url={showcase.url} screens={showcase.screens} hero={hero} />}
      {showcase.kind === "pan" && <Pan image={showcase.image} hero={hero} />}
      {showcase.kind === "rag" && <Rag nodes={showcase.nodes} metric={showcase.metric} />}
      {showcase.kind === "loop" && <Loop nodes={showcase.nodes} center={showcase.center} />}
      {showcase.kind === "bars" && <Bars code={showcase.code} bars={showcase.bars} unit={showcase.unit} />}
      {showcase.kind === "video" && <Video src={hero ? showcase.hero : showcase.card} poster={showcase.poster} />}
      {showcase.kind === "chart" && <Chart code={showcase.code} image={showcase.image} chips={showcase.chips} hero={hero} />}
    </div>
  );
}

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });
const sizes = (hero: boolean, card: string, big: string) => (hero ? big : card);

/* ---------- Mobile UI: three phones, each cycling screens with an offset ---------- */
function Phones({ screens, hero }: { screens: Img[]; hero: boolean }) {
  const set = screens.slice(0, 4);
  const dur = DURATION.phones;
  // Each phone shows the same screens shifted by `offset` slots, so all three differ.
  // Slot 0 is rendered first: it is the one visible in the resting (paused) frame.
  const phone = (offset: number) =>
    set.map((_, slot) => {
      const s = set[(slot + offset) % set.length];
      return (
        <Image
          key={s.src}
          src={s.src}
          alt=""
          width={s.width}
          height={s.height}
          sizes={sizes(hero, "140px", "260px")}
          loading={hero ? "eager" : "lazy"}
          className="sc-slide sc-slot4 absolute inset-0 h-full w-full object-contain"
          style={delay(slot * (dur / 4) - dur)}
        />
      );
    });

  return (
    <div className="absolute inset-0">
      {/* Soft spotlight behind the centre phone */}
      <div className="absolute top-1/2 left-1/2 size-[70cqh] -translate-1/2 rounded-full bg-paper/50 blur-2xl" />
      <div className="sc-float absolute top-[16cqh] left-[12cqw] h-[64cqh] w-[33cqh]" style={{ "--r": "-9deg", ...delay(-1.1) } as CSSProperties}>
        <Stack>{phone(1)}</Stack>
      </div>
      <div className="sc-float absolute top-[16cqh] right-[12cqw] h-[64cqh] w-[33cqh]" style={{ "--r": "9deg", ...delay(-2.3) } as CSSProperties}>
        <Stack>{phone(2)}</Stack>
      </div>
      <div className="sc-float absolute top-[8cqh] left-1/2 z-10 -ml-[21cqh] h-[84cqh] w-[42cqh] drop-shadow-xl" style={delay(-0.4)}>
        <Stack>{phone(0)}</Stack>
        {/* Tap indicator, like a screen recording */}
        <span className="sc-in-1 absolute bottom-[22%] left-1/2 -ml-3 size-6 rounded-full border-2 border-white/90 bg-ember-500/40 shadow" />
      </div>
    </div>
  );
}

function Stack({ children }: { children: ReactNode }) {
  return <div className="relative h-full w-full">{children}</div>;
}

/* ---------- Web: browser window panning across pages, with a demo cursor ---------- */
function Browser({ url, screens, hero }: { url: string; screens: Img[]; hero: boolean }) {
  const dur = DURATION.browser;
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="sc-tilt relative h-[76cqh] w-[84cqw] overflow-hidden rounded-[12px] border border-black/10 bg-white shadow-2xl">
        <div className="flex h-[9cqh] min-h-5 items-center gap-1.5 border-b border-black/10 bg-[#f4f4f2] px-[2.5cqw]">
          <span className="size-[1.6cqh] min-h-1.5 min-w-1.5 rounded-full bg-[#ff5f57]" />
          <span className="size-[1.6cqh] min-h-1.5 min-w-1.5 rounded-full bg-[#febc2e]" />
          <span className="size-[1.6cqh] min-h-1.5 min-w-1.5 rounded-full bg-[#28c840]" />
          <span className="ml-[2cqw] flex h-[5cqh] min-h-3 flex-1 items-center rounded-full bg-white px-[2cqw] text-[max(8px,3.2cqh)] text-[#6b6b6b]">
            {url}
          </span>
        </div>
        <div className="relative h-[calc(100%-9cqh)]">
          {screens.slice(0, 2).map((s, k) => (
            <div key={s.src} className="sc-slide sc-slot2 absolute inset-0" style={delay(k * (dur / 2) - dur)}>
              <Image
                src={s.src}
                alt=""
                fill
                sizes={sizes(hero, "360px", "1100px")}
                loading={hero ? "eager" : "lazy"}
                className="sc-pan object-cover"
                style={delay(k * (dur / 2) - dur)}
              />
            </div>
          ))}
        </div>
      </div>
      <Cursor />
    </div>
  );
}

function Cursor() {
  return (
    <svg viewBox="0 0 24 24" className="sc-cursor absolute top-0 left-0 z-20 size-[max(14px,6cqh)] drop-shadow-md">
      <path d="M4 3l7 17 2.5-7L21 10.5 4 3Z" fill="#141414" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Mobile mockup collage: camera pan with a moving viewfinder ---------- */
function Pan({ image, hero }: { image: Img; hero: boolean }) {
  return (
    <div className="absolute inset-0">
      <Image
        src={image.src}
        alt=""
        fill
        sizes={sizes(hero, "400px", "1200px")}
        loading={hero ? "eager" : "lazy"}
        className="sc-kenburns object-cover"
      />
      <span className="sc-finder absolute" style={{ inset: "16% 54% 30% 8%" }}>
        {(["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-r-2 border-b-2"] as const).map(
          (c) => (
            <span key={c} className={`absolute size-[5cqh] min-h-3 min-w-3 border-white ${c}`} />
          ),
        )}
      </span>
      <span className="label absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-white backdrop-blur">
        <span className="sc-dots inline-flex">
          <span className="size-1.5 rounded-full bg-[#ff5f57]" />
        </span>
        REC
      </span>
    </div>
  );
}

/* ---------- RAG: a request flowing through the pipeline into an answer ---------- */
function Rag({ nodes, metric }: { nodes: string[]; metric: { label: string; value: string } }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-[5cqh] px-[7cqw]">
      <div className="relative">
        <div className="absolute top-1/2 right-[4%] left-[4%] h-px bg-ink/25" />
        <span className="sc-travel absolute top-1/2 -mt-1 -ml-1 size-2 rounded-full bg-ember-500 shadow-[0_0_0_4px_rgb(242_101_26/0.25)]" />
        <ol className="relative flex justify-between gap-1">
          {nodes.map((n, i) => (
            <li
              key={n}
              className={`sc-in-${Math.min(i, 3)} rounded-full border border-ink/15 bg-paper px-[1.6cqw] py-[1.2cqh] text-center text-[max(8px,3.4cqh)] leading-tight font-medium text-ink shadow-sm`}
            >
              {n}
            </li>
          ))}
        </ol>
      </div>

      <div className="mx-auto w-[78cqw] space-y-[2.4cqh] rounded-[14px] border border-ink/10 bg-paper/85 p-[3.5cqw] shadow-lg backdrop-blur">
        <div className="sc-in-0 ml-auto h-[5cqh] w-[46%] rounded-full bg-ink/12" />
        <div className="sc-in-1 sc-dots flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-[2cqh] min-h-1.5 min-w-1.5 rounded-full bg-ink/40" style={delay(i * 0.2)} />
          ))}
        </div>
        <div className="space-y-[1.6cqh]">
          {[92, 80, 64].map((w, i) => (
            <div key={w} className="sc-grow h-[3.2cqh] origin-left rounded-full bg-ember-500/35" style={{ width: `${w}%`, "--d": `${i * 0.25}s` } as CSSProperties} />
          ))}
        </div>
      </div>

      <div className="sc-in-3 absolute top-[7cqh] right-[6cqw] rounded-full bg-night px-[3cqw] py-[1.4cqh] text-[max(9px,3.6cqh)] font-semibold text-white shadow-lg">
        {metric.label} <span className="text-ember-400">{metric.value}</span>
      </div>
    </div>
  );
}

/* ---------- MLOps: a packet orbiting the continuous-improvement loop ---------- */
function Loop({ nodes, center }: { nodes: string[]; center: string }) {
  const dur = DURATION.loop;
  const R = 36; // % of the square
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square h-[86cqh]">
        <svg viewBox="0 0 100 100" className="absolute inset-0">
          <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.6" strokeDasharray="1.5 2" className="text-ink" />
        </svg>
        <div className="sc-spin absolute inset-0">
          <span
            className="absolute left-1/2 -ml-[1.6%] size-[3.2%] rounded-full bg-ember-500 shadow-[0_0_0_6px_rgb(242_101_26/0.25)]"
            style={{ top: `${50 - R - 1.6}%` }}
          />
        </div>
        <div className="absolute inset-[30%] grid place-items-center rounded-full bg-paper/80 text-center shadow-inner backdrop-blur">
          <span className="font-display text-[10cqh] leading-none text-ink uppercase">{center}</span>
        </div>
        {nodes.map((n, i) => {
          const a = (i / nodes.length) * 2 * Math.PI - Math.PI / 2;
          return (
            <span
              key={n}
              className="sc-node absolute rounded-full border border-ink/15 bg-paper px-[1.4cqh] py-[0.8cqh] text-center text-[max(8px,3.2cqh)] leading-tight font-medium whitespace-nowrap text-ink shadow-sm"
              style={{
                left: `${50 + R * Math.cos(a)}%`,
                top: `${50 + R * Math.sin(a)}%`,
                transform: "translate(-50%, -50%)",
                ...delay((i / nodes.length) * dur),
              }}
            >
              {n}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Model comparison: typed code, bars racing, winner tag ---------- */
function Bars({ code, bars, unit }: { code: string; bars: { label: string; value: number }[]; unit: string }) {
  const best = Math.max(...bars.map((b) => b.value));
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-[3cqh] px-[8cqw]">
      <Code code={code} />
      <p className="label text-ink-3">{unit}</p>
      <ul className="space-y-[2.2cqh]">
        {bars.map((b, i) => {
          const win = b.value === best;
          return (
            <li key={b.label} className="grid grid-cols-[3.2em_1fr_3.6em] items-center gap-2 text-[max(9px,3.6cqh)]">
              <span className={`font-semibold ${win ? "text-signal-ink" : "text-ink-2"}`}>{b.label}</span>
              <span className="relative h-[4cqh] min-h-1.5 overflow-hidden rounded-full bg-ink/10">
                <span
                  className={`sc-grow absolute inset-y-0 left-0 origin-left rounded-full ${win ? "bg-ember-500" : "bg-ink/45"}`}
                  style={{ width: `${b.value * 100}%`, "--d": `${i * 0.12}s` } as CSSProperties}
                />
              </span>
              <span className={`sc-mono text-right ${win ? "font-semibold text-ink" : "text-ink-3"}`}>{b.value.toFixed(3)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Analysis: typed code, chart revealed by a scanning line, metric chips ---------- */
function Chart({ code, image, chips, hero }: { code: string; image: Img; chips: string[]; hero: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-[3cqh] px-[7cqw]">
      <Code code={code} />
      <div className="relative mx-auto h-[56cqh] w-full overflow-hidden rounded-[12px] bg-white p-[2cqh] shadow-xl">
        <div className="sc-wipe relative h-full w-full">
          {/* Eager: while the wipe clips it to nothing, lazy loading never fires. */}
          <Image src={image.src} alt="" fill sizes={sizes(hero, "360px", "1000px")} loading="eager" className="object-contain" />
        </div>
        <span className="sc-scan absolute inset-y-0 w-0.5 bg-ember-500 shadow-[0_0_12px_2px_rgb(242_101_26/0.6)]" style={{ left: "100%", opacity: 0 }} />
      </div>
      <ul className="flex flex-wrap justify-center gap-[1.5cqw]">
        {chips.map((c, i) => (
          <li
            key={c}
            className={`sc-in-${i + 1} rounded-full px-[2.6cqw] py-[1cqh] text-[max(9px,3.4cqh)] font-semibold shadow-sm ${
              i === 1 ? "bg-night text-white" : "bg-paper text-ink"
            }`}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Code({ code }: { code: string }) {
  return (
    <p className="sc-mono flex items-center rounded-[10px] bg-night px-[3cqw] py-[1.8cqh] text-[max(9px,3.6cqh)] text-[#e6e6e3] shadow-lg">
      <span className="mr-2 text-ember-400">❯</span>
      <span className="sc-type inline-block overflow-hidden whitespace-nowrap" style={{ "--n": code.length, width: `${code.length}ch` } as CSSProperties}>
        {code}
      </span>
      <span className="sc-caret ml-0.5 inline-block h-[1.1em] w-[0.5ch] bg-ember-400" />
    </p>
  );
}

/**
 * Recorded showcase. The file is only requested once the cover first scrolls into view, then it
 * plays while visible, unless the visitor paused covers (<html data-motion>) or prefers reduced motion.
 */
function Video({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const sync = () => {
      if (visible && !video.src) {
        video.src = src;
      }
      const canPlay = visible && !reduce.matches && root.getAttribute("data-motion") !== "paused";
      if (canPlay) video.play().catch(() => {});
      else video.pause();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    const mo = new MutationObserver(sync);
    io.observe(video);
    mo.observe(root, { attributes: true, attributeFilter: ["data-motion"] });
    reduce.addEventListener("change", sync);
    return () => {
      io.disconnect();
      mo.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 size-full object-cover"
    />
  );
}
