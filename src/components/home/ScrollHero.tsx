import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { STORE } from "@/data/site";
import { asset } from "@/lib/asset";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { IconWhatsApp } from "@/components/ui/Icon";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PARTNER_LOGOS = [
  { src: asset("/media/silestone22.png"), alt: "Silestone" },
  { src: asset("/media/grado2.png"), alt: "Grado" },
  { src: asset("/media/full-logo.png"), alt: "Full" },
  { src: asset("/media/coante.png"), alt: "Coante" },
  { src: asset("/media/cimstone-logo-600.png"), alt: "Cimstone" },
  { src: asset("/media/maestro.png"), alt: "Maestro" },
  { src: asset("/media/calisco_logo_ing.png"), alt: "Calisco" },
];

const FRAME_COUNT = 90;
const currentFrame = (index: number) => asset(`/frames/frame_${String(index).padStart(3, "0")}.webp`);

export function ScrollHero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const wrap = videoWrapRef.current;
    if (!canvas || !section || !wrap || reduced) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let ctx: gsap.Context | undefined;
    let killed = false;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const render = (index: number) => {
      const img = images[index];
      if (img && img.complete) {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
      }
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const loadFrames = () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
          loadedCount++;
          if (loadedCount === 1) render(0);
        };
        images.push(img);
      }
    };

    loadFrames();

    const setup = () => {
      if (killed) return;
      ctx = gsap.context(() => {
        ScrollTrigger.normalizeScroll(false);
        const air = { frame: 0 };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=2500",
            scrub: 0,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(air, {
          frame: FRAME_COUNT - 1,
          snap: "frame",
          ease: "none",
          duration: 1,
          onUpdate: () => {
            requestAnimationFrame(() => render(Math.round(air.frame)));
          },
        });
        tl.to(
          wrap,
          { opacity: 0, ease: "power1.out", duration: 0.2 },
          0.8,
        );
      }, section);
      ScrollTrigger.refresh();
    };

    const timer = setTimeout(setup, 300);

    return () => {
      killed = true;
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="video-section"
      className="relative h-dvh overflow-hidden bg-obsidian"
      aria-label="Külçeler eviye görsel giriş"
    >
      <div className="bg-image-layer absolute inset-0 z-0">
        <img
          src={asset("/media/sskulceler.png")}
          alt=""
          className="h-full w-full object-cover object-center"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-obsidian/40" />
      </div>

      <div ref={videoWrapRef} className="absolute inset-0 z-[1]">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="pointer-events-none relative z-[3] flex h-full flex-col justify-between px-4 pt-24 pb-20 md:px-10 md:py-24">
        <div className="overflow-visible border-y border-white/15 py-4 my-2">
          <div className="marquee-track gap-16 pr-16 items-center">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <img
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
                className="h-5 md:h-6 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>

        <div className="pointer-events-auto max-w-2xl">
          <p className="text-xs tracking-[0.4em] text-silver uppercase">Özel Kuvars Eviye Üretimi</p>
          <h1 className="font-display mt-4 text-[40px] leading-[1.0] font-medium text-ice sm:text-5xl lg:text-[72px]">
            Bir eviyeden
            <br />
            daha fazlası.
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-soft">
            Doğal kuvarsın karakterini kompozit gövde yapısıyla buluşturuyor; tezgâh üreticileri ve profesyonel uygulamacılar için özel eviye çözümleri sunuyoruz.
          </p>
           <div className="mt-8 flex flex-wrap gap-3">
             <a
               href="#yapi"
               className="group/btn relative inline-flex h-12 overflow-hidden items-center bg-ice px-7 text-sm tracking-[0.16em] text-obsidian uppercase transition-all duration-300 hover:scale-[1.02] hover:bg-white active:scale-95 shadow-lg"
             >
               <span className="relative z-10 flex items-center gap-2 font-medium">
                 Yapısını Keşfet
                 <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">↗</span>
               </span>
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
             </a>
             <a
               href={`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent("Merhaba, özel kuvars eviye üretimi ve iş birliği hakkında bilgi almak istiyorum.")}`}
               className="group/wa relative inline-flex h-12 overflow-hidden items-center border border-border bg-graphite/80 backdrop-blur-md px-7 text-sm tracking-[0.16em] text-ice uppercase transition-all duration-300 hover:border-silver hover:scale-[1.02] active:scale-95"
               target="_blank"
               rel="noreferrer"
             >
               <span className="relative z-10 flex items-center gap-2">
                 WhatsApp
                 <span className="inline-block transition-transform duration-300 group-hover/wa:scale-110">
                   <IconWhatsApp className="h-4 w-4 text-ice" />
                 </span>
               </span>
               <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/wa:opacity-100 transition-opacity duration-300" />
             </a>
           </div>
         </div>
       </div>
     </section>
   );
 }
