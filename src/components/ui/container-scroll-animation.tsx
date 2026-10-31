"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // thiệp bị gió thổi từ trái vào: chao lượn, lật qua lại rồi đập phẳng vào "tường" như tờ báo
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ scrollTrigger: { trigger: cardRef.current, start: "top 85%" } })
        .fromTo(
          cardRef.current,
          { x: "-110vw", y: -180, rotation: -35, rotationY: 70, rotationX: 25, scale: 0.6, autoAlpha: 0 },
          {
            keyframes: [
              { x: "-45vw", y: 60, rotation: 14, rotationY: -35, rotationX: -12, scale: 0.8, autoAlpha: 1, duration: 0.55, ease: "sine.inOut" },
              { x: "6vw", y: -30, rotation: -7, rotationY: 18, rotationX: 8, scale: 0.95, duration: 0.45, ease: "sine.inOut" },
              { x: 0, y: 0, rotation: 0, rotationY: 0, rotationX: 0, scale: 1, duration: 0.3, ease: "power3.in" },
            ],
          }
        )
        .to(cardRef.current, { scale: 0.97, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.out" });
    });
  });

  return (
    <div
      // overflow-x-clip: lúc thiệp bay từ ngoài màn hình vào không làm hiện thanh cuộn ngang
      className="min-h-[48rem] md:min-h-[64rem] flex items-center justify-center relative overflow-x-clip px-2 pt-2 md:px-10 md:pt-10 lg:px-20 lg:pt-20"
      ref={containerRef}
    >
      <div
        className="pt-6 md:pt-16 pb-23 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <div
          ref={cardRef}
          style={{
            boxShadow:
              "0 9px 20px #0000004d, 0 37px 37px #00000040, 0 84px 50px #00000026, 0 149px 60px #0000000d",
          }}
          className="max-w-5xl -mt-12 mx-auto flex min-h-[30rem] md:min-h-[40rem] w-full flex-col border-4 border-white/15 p-2 md:p-6 bg-white/5 backdrop-blur rounded-[30px] shadow-2xl"
        >
          <div className="flex w-full flex-1 flex-col overflow-hidden rounded-2xl bg-sage-950/40 md:p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};
