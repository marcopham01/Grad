import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { MomentsNewspaper } from "@/components/moments-newspaper";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Mountains } from "@/components/mountains";
import { Collage, Photo } from "@/components/photo";
import { hero, info, invitation } from "@/content";

export default function App() {
  return (
    <main className="bg-gradient-to-b from-sage-50 via-white to-sage-100 text-sage-950">
      <Hero />
      <Marquee />
      {/* phần ảnh + thiệp nền xanh rêu đậm */}
      <div className="bg-sage-900 text-sage-50">
        <MomentsNewspaper />
        <Invitation />
      </div>
    </main>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const words = info.shortName.split(" ");
  const nameRef = useRef<HTMLHeadingElement>(null);

  // tên hiện ra từng chữ cái; không dùng mask vì line-height thấp sẽ cắt mất dấu tiếng Việt
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      SplitText.create(nameRef.current, {
        type: "chars",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.chars, { yPercent: 60, rotation: 12, autoAlpha: 0, duration: 0.9, ease: "back.out(1.7)", stagger: 0.06 }),
      });
    });
  });

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <Mountains className="absolute inset-0" />
      {/* phủ tối bên trái và đáy để chữ trắng nổi trên ảnh */}
      <div className="absolute inset-0 bg-gradient-to-t from-sage-950/70 via-sage-950/10 to-sage-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-sage-950/50 to-transparent" />
      <motion.div style={{ scale, opacity, y }} className="relative flex min-h-[100svh] flex-col justify-between gap-8 px-4 py-8 md:px-10">
        <div className="flex items-start justify-between gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-white md:text-sm">
          <span>{hero.eyebrow}</span>
          <span className="text-right">{info.dateText}</span>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, rotate: 8, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 4, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-16 right-0 hidden w-[22vw] max-w-sm md:block"
          >
            <Collage seed={3}>
              <Photo src={hero.portrait} label="Ảnh chân dung" className="aspect-[3/4] w-full" />
              <p className="mt-2 text-center font-display text-lg italic text-sage-800">{hero.portraitCaption}</p>
            </Collage>
          </motion.div>
          <p className="mb-4 font-display text-2xl italic text-sage-100 md:text-4xl">{info.school}</p>
          <h1 ref={nameRef} className="relative font-display text-[18vw] font-semibold leading-[0.8] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(24,33,21,0.6)] md:text-[13vw]">
            {words.map((w, i) => (
              // pt/pb chừa chỗ cho dấu tiếng Việt (Ă, Ấ, Ạ...)
              <span key={i} className="block pt-[0.25em] pb-[0.1em]">
                {w}
              </span>
            ))}
          </h1>
          <Collage seed={3} className="ml-auto mt-6 w-[46vw] max-w-56 md:hidden">
            <Photo src={hero.portrait} label="Ảnh chân dung" className="aspect-[3/4] w-full" />
            <p className="mt-1 text-center font-display text-sm italic text-sage-800">{hero.portraitCaption}</p>
          </Collage>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-md text-lg font-semibold text-white md:text-2xl"
          >
            {hero.tagline}
          </motion.p>
          <p className="text-sm text-white/80">
            {info.major} · {info.cohort}
            <span className="ml-4 inline-block animate-bounce whitespace-nowrap">↓ cuộn xuống</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = [...hero.marquee, ...hero.marquee];
  return (
    <div className="overflow-hidden bg-sage-500 py-4 text-white">
      <div className="marquee flex w-max gap-12 whitespace-nowrap text-2xl font-extrabold uppercase md:text-4xl">
        {[...items, ...items].map((t, i) => (
          <span key={i}>
            {t} <span aria-hidden className="ml-6 inline-block size-3 rounded-full bg-amber-100 align-middle md:size-4" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Invitation() {
  return (
    <ContainerScroll
      titleComponent={
        <div className="mb-10">
          <p className="mb-4 font-mono text-sm text-sage-400">(02)</p>
          <h2 className="font-display text-5xl italic md:text-6xl lg:text-8xl">{invitation.title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-sage-200/80 md:text-lg">{invitation.text}</p>
        </div>
      }
    >
      <div className="paper-grain collage relative flex w-full flex-1 flex-col justify-end overflow-hidden rounded-xl text-white">
        <Photo src={invitation.cover} label="Ảnh bìa thiệp" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-sage-950/90 via-sage-800/40 to-transparent" />
        <div className="relative flex flex-col gap-6 p-5 md:p-12">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white">Lễ tốt nghiệp của</p>
            <p className="mt-2 font-display text-3xl font-semibold leading-tight md:text-5xl lg:text-6xl">{info.name}</p>
          </div>
          <Countdown />
          <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 md:grid-cols-3 md:text-base">
            <Info label="Ngày" value={info.dateText} />
            <Info label="Giờ" value={info.timeText} />
            <Info label="Địa điểm" value={`${info.venue}, ${info.address}`} />
          </dl>
          <div className="flex flex-wrap gap-3">
            <a href={calendarUrl()} target="_blank" rel="noreferrer" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sage-900 hover:bg-sage-100">
              Thêm vào lịch
            </a>
            <a href={info.mapUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/50 px-5 py-2.5 text-sm font-semibold hover:bg-white/15">
              Xem bản đồ
            </a>
          </div>
        </div>
      </div>
    </ContainerScroll>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sage-200">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

function Countdown() {
  const target = new Date(info.start).getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const s = Math.max(0, Math.floor((target - now) / 1000));
  const parts = [
    [Math.floor(s / 86400), "ngày"],
    [Math.floor((s % 86400) / 3600), "giờ"],
    [Math.floor((s % 3600) / 60), "phút"],
    [s % 60, "giây"],
  ] as const;
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-6">
      {parts.map(([n, unit]) => (
        <div key={unit} className="min-w-14 flex-1 rounded-xl border sm:flex-none border-white/30 bg-white/15 px-3 py-2 text-center backdrop-blur md:min-w-20">
          <div className="text-2xl font-black tabular-nums md:text-4xl">{String(n).padStart(2, "0")}</div>
          <div className="text-xs text-sage-100">{unit}</div>
        </div>
      ))}
    </div>
  );
}

function calendarUrl() {
  const fmt = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `Lễ tốt nghiệp của ${info.name}`,
    dates: `${fmt(info.start)}/${fmt(info.end)}`,
    location: `${info.venue}, ${info.address}`,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}
