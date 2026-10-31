import { useEffect, useState, type ReactNode } from "react";
import { cn, rand } from "@/lib/utils";

// Mép giấy xé: đa giác răng cưa quanh 4 cạnh, mỗi seed một kiểu xé
function tear(seed: number) {
  const n = 12;
  const r = (i: number) => (rand(seed, i) * 2.2).toFixed(2);
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) pts.push(`${(i / n) * 100}% ${r(i)}%`);
  for (let i = 0; i <= n; i++) pts.push(`calc(100% - ${r(i + 20)}%) ${(i / n) * 100}%`);
  for (let i = n; i >= 0; i--) pts.push(`${(i / n) * 100}% calc(100% - ${r(i + 40)}%)`);
  for (let i = n; i >= 0; i--) pts.push(`${r(i + 60)}% ${(i / n) * 100}%`);
  return `polygon(${pts.join(",")})`;
}

// Khung collage: tờ giấy xé mép, có vân giấy, nghiêng nhẹ, dán băng keo
export function Collage({ seed = 0, className, children }: { seed?: number; className?: string; children: ReactNode }) {
  return (
    <div className={cn("collage relative", className)} style={{ rotate: `${(seed % 5) - 2}deg` }}>
      <div className="paper-grain relative h-full w-full bg-[#fbf7ee] p-[4%]" style={{ clipPath: tear(seed) }}>
        {children}
      </div>
      <span aria-hidden className="tape" style={{ rotate: `${seed % 2 ? -6 : 5}deg` }} />
    </div>
  );
}

// Ảnh chưa có (thiếu file) → ô gradient ghi tên file cần thêm.
// Chỉ gắn <img> khi ảnh đã tải xong, nên ảnh thiếu/lỗi không bao giờ hiện icon ảnh vỡ của trình duyệt.
export function Photo({ src, label, className }: { src?: string; label: string; className?: string }) {
  const [loaded, setLoaded] = useState<string>();
  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.onload = () => setLoaded(src);
    img.src = src;
    return () => {
      img.onload = null;
    };
  }, [src]);

  if (!src || loaded !== src)
    return (
      <div
        className={cn(
          "grid place-items-center bg-gradient-to-br from-sage-200 via-white to-sage-300 p-4 text-center text-xs text-sage-700/70",
          className
        )}
      >
        <span>
          {label}
          {src && <span className="mt-1 block font-mono opacity-70">public{src}</span>}
        </span>
      </div>
    );
  return <img src={src} alt={label} className={cn("object-cover", className)} />;
}
