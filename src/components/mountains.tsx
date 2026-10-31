import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { hero } from "@/content";

// Ảnh núi làm nền, trôi chậm hơn trang khi cuộn (parallax). Dùng background-image nên thiếu file cũng không hiện icon ảnh vỡ.
export function Mountains({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <div ref={ref} aria-hidden className={cn("overflow-hidden bg-sage-300", className)}>
      <motion.div
        style={{ y, backgroundImage: `url(${hero.background})` }}
        className="absolute inset-x-0 -top-[10%] h-[120%] bg-cover bg-center"
      />
    </div>
  );
}
