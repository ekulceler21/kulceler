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

export function ScrollHero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const wrap = videoWrapRef.current;
    if (!video || !section || !wrap || reduced) return;

    let ctx: gsap.Context | undefined;
    let killed = false;

    const setup = () => {
      if (killed) return;
      const duration = video.duration || 10;
      video.pause();
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=3000",
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(
          video,
          { currentTime: 0 },
          { currentTime: duration, ease: "none", duration: 1 },
          0,
        );
        tl.fromTo(
          wrap,
          { opacity: 1 },
          { opacity: 0, ease: "power1.out", duration: 0.2 },
          0.8,
        );
      }, section);
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) setup();
    else video.addEventListener("loadedmetadata", setup, { once: true });

    return () => {
      killed = true;
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
        <video
          ref={videoRef}
          id="sink-video"
          className="h-full w-full object-cover"
          src={asset("/media/scrollkulceler.mp4")}
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
      </div>

      <div className="pointer-events-none relative z-[3] flex h-full flex-col justify-between px-4 py-24 md:px-10">
        <div className="overflow-hidden border-y border-white/15 py-3">
          <div className="marquee-track gap-16 pr-16 items-center">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <img
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
                className="h-6 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
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
