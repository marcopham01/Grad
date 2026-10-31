import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { info, moments } from "@/content";

// Một tờ báo về thời đại học: tin trang nhất + ảnh xếp theo cột báo, mỗi ảnh xuất hiện một lần
type P = { title: string; thumbnail: string };

function Photo({ p, className }: { p: P; className?: string }) {
  return (
    <figure className={`paper-item break-inside-avoid ${className ?? ""}`}>
      <img src={p.thumbnail} alt={p.title} loading="lazy" className="w-full grayscale-50 sepia-25 transition duration-500 hover:grayscale-0 hover:sepia-0" />
      <figcaption className="mt-1 border-b border-stone-400 pb-1 text-xs italic text-stone-600">{p.title}</figcaption>
    </figure>
  );
}

export function MomentsNewspaper() {
  const ref = useRef<HTMLElement>(null);
  const [lead, ...rest] = moments.photos;
  const [leadStory, ...stories] = moments.stories;

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".paper", { y: 120, rotation: -3, autoAlpha: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".paper", start: "top 85%" } });
        gsap.from(".paper-item", { y: 30, autoAlpha: 0, duration: 0.6, stagger: 0.05, scrollTrigger: { trigger: ".paper", start: "top 60%" } });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="overflow-x-clip px-3 py-16 md:py-24">
      <article className="paper paper-grain relative mx-auto max-w-6xl bg-[#f3efe4] p-4 text-stone-900 shadow-2xl shadow-black/60 md:p-10">
        <header className="border-b-4 border-double border-stone-900 pb-3 text-center">
          <div className="flex justify-between gap-2 border-b border-stone-900 pb-1 text-[10px] uppercase tracking-widest md:text-xs">
            <span>Số đặc biệt</span>
            <span>{info.dateText}</span>
            <span>Priceless</span>
          </div>
          <h2 className="mt-2 font-display text-6xl font-black tracking-tight md:text-9xl">{moments.title}</h2>
          <p className="font-display italic text-stone-600 md:text-lg">{moments.text}</p>
        </header>

        {/* tin trang nhất */}
        <div className="paper-item mt-6 grid gap-6 border-b border-stone-900 pb-6 md:grid-cols-[2fr_1fr]">
          <Photo p={lead} />
          <div>
            <h3 className="font-display text-3xl font-bold leading-tight md:text-5xl">{leadStory.headline}</h3>
            <p className="mt-4 text-sm leading-relaxed first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:font-black md:text-base">
              {leadStory.text}
            </p>
            <blockquote className="mt-6 border-l-4 border-stone-900 pl-4">
              <p className="font-display text-lg italic leading-snug md:text-2xl">“{moments.quote.text}”</p>
              <footer className="mt-2 text-sm font-semibold text-stone-600">— {moments.quote.author}</footer>
            </blockquote>
            <p className="mt-4 text-xs uppercase tracking-widest text-stone-500">
              {info.school} · {info.cohort}
            </p>
          </div>
        </div>

        {/* các ảnh còn lại chảy theo cột báo, xen bài ngắn */}
        <div className="mt-6 columns-2 gap-4 [column-rule:1px_solid_#a8a29e] md:columns-4 md:gap-6">
          {rest.map((p, i) => {
            const s = i % 4 === 1 ? stories[(i - 1) / 4] : undefined;
            return [
              <Photo key={p.thumbnail} p={p} className="mb-4" />,
              s && (
                <div key={s.headline} className="paper-item mb-4 break-inside-avoid border-y-2 border-stone-900 py-3">
                  <h4 className="font-display text-xl font-bold leading-tight">{s.headline}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">{s.text}</p>
                </div>
              ),
            ];
          })}
        </div>
      </article>
    </section>
  );
}
