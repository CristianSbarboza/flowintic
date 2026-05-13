"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SmoothVideoProps {
  src: string;
  className?: string;
  fadeDuration?: number;
  startTime?: number;
}

export function SmoothVideo({ 
  src, 
  className, 
  fadeDuration = 2.8, 
  startTime = 0 
}: SmoothVideoProps) {
  const v1 = useRef<HTMLVideoElement>(null);
  const v2 = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(1);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const v = v1.current;
    if (v) {
      const handleCanPlay = () => {
        v.play().catch(() => {});
        v.removeEventListener("canplay", handleCanPlay);
      };
      if (v.readyState >= 2) {
        v.play().catch(() => {});
      } else {
        v.addEventListener("canplay", handleCanPlay);
      }
    }
  }, []);

  useEffect(() => {
    let rafId: number;

    const checkLoop = () => {
      const currentVideo = active === 1 ? v1.current : v2.current;
      const nextVideo = active === 1 ? v2.current : v1.current;

      if (!currentVideo || !nextVideo || !currentVideo.duration) {
        rafId = requestAnimationFrame(checkLoop);
        return;
      }

      // Inicia a transição quando estiver perto do fim
      if (currentVideo.currentTime >= currentVideo.duration - fadeDuration && !isTransitioning.current) {
        // Verifica se o próximo vídeo está pronto para tocar e buscar
        if (nextVideo.readyState < 3) {
          return;
        }

        isTransitioning.current = true;
        
        nextVideo.currentTime = startTime;
        nextVideo.play().then(() => {
          setActive(active === 1 ? 2 : 1);
          
          // Libera para a próxima transição após o tempo do fade
          setTimeout(() => {
            isTransitioning.current = false;
          }, fadeDuration * 1000);
        }).catch(() => {
          // Não logamos para não poluir o console caso seja um erro comum de interrupção
          // Mas resetamos com um delay para evitar loop infinito de erros
          setTimeout(() => {
            isTransitioning.current = false;
          }, 2000);
        });
      }

      rafId = requestAnimationFrame(checkLoop);
    };

    rafId = requestAnimationFrame(checkLoop);
    return () => cancelAnimationFrame(rafId);
  }, [active, fadeDuration, startTime]);

  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      <motion.video
        ref={v1}
        src={src}
        muted
        playsInline
        preload="auto"
        initial={false}
        animate={{ opacity: active === 1 ? 1 : 0 }}
        transition={{ duration: fadeDuration, ease: "linear" }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <motion.video
        ref={v2}
        src={src}
        muted
        playsInline
        preload="auto"
        initial={false}
        animate={{ opacity: active === 2 ? 1 : 0 }}
        transition={{ duration: fadeDuration, ease: "linear" }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
