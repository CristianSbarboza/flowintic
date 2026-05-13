"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence, useSpring, useMotionValue, useMotionTemplate, useScroll, useTransform, useInView } from "framer-motion";
import React from "react";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { 
  MessageCircle, Camera, Link as LinkIcon, Code, Globe,
  Command, Sparkles, GitBranch, ArrowRight, FileText, 
  RotateCw, Box, ArrowUp, Share2, Folder, Terminal, 
  LayoutGrid, CornerDownLeft, Monitor, SquareCode, User
} from "lucide-react";
import { SmoothVideo } from "@/components/ui/SmoothVideo";
import { Particles } from "@/components/ui/Particles";

interface ProjectItem {
  title: string;
  description: string;
  video: string;
}

function ProjectCard({ item, index }: { item: ProjectItem, index: number }) {
  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { amount: 0.3 });
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handlePlay = () => {
      if (isInView) v.play().catch(() => {});
    };

    if (isInView) {
      if (v.readyState >= 2) {
        v.play().catch(() => {});
      } else {
        v.addEventListener("canplay", handlePlay);
      }
    } else {
      v.pause();
      v.removeEventListener("canplay", handlePlay);
    }

    return () => v.removeEventListener("canplay", handlePlay);
  }, [isInView]);

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-between gap-12 md:gap-24`}
    >
      {/* Text Side */}
      <div className="w-full md:w-[40%] text-left">
        <h4 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{item.title}</h4>
        <p className="text-lg md:text-xl text-white/60 leading-relaxed font-body">
          {item.description}
        </p>
      </div>

      {/* Video Side */}
      <div className="w-full md:w-[55%] group relative p-[1.5px] overflow-hidden rounded-[2.2rem]">
        {/* Rotating Silver Border Beam - Always Infinite */}
        <motion.div 
          className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_75%,#ffffff_85%,#a1a1aa_95%,transparent_100%)] opacity-30 group-hover:opacity-100 transition-opacity duration-1000"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="relative aspect-video overflow-hidden rounded-4xl bg-pure-black z-10 border border-white/10">
          <video 
            ref={videoRef}
            src={item.video} 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
          />
        </div>
        
        {/* Decorative Glow */}
        <div className="absolute -inset-10 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
      </div>
    </motion.div>
  );
}

const PROJECTS = [
  { 
    title: "Naia Storytelling", 
    description: "Agente de interface anônima que auxilia escritores e entusiastas iniciantes a darem vida à sua imaginação, criando histórias, narrando e lendo em livros digitais, com suporte a idiomas e download em PDF das histórias.",
    video: "/videos/storytelling.mp4"
  },
  { 
    title: "New Order", 
    description: "Plataforma de lifestyle e vestuário que redefine a experiência de compra através de um design minimalista e performance excepcional.",
    video: "/videos/neworder.mp4"
  },
  { 
    title: "Freitas Alvf", 
    description: "Design minimalista e tecnologia de ponta para elevar o posicionamento digital da Freitas Alvf.",
    video: "/videos/freaitasalvf.mp4"
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const mouseX = useSpring(useMotionValue(-1000), { stiffness: 100, damping: 20 });
  const mouseY = useSpring(useMotionValue(-1000), { stiffness: 100, damping: 20 });
  const spotlightMask = useMotionTemplate`radial-gradient(circle 150px at ${mouseX}px ${mouseY}px, transparent 0%, black 100%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const showcaseRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const menuLinks = [
    { name: "Home", href: "#hero" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Sobre", href: "#sobre" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <div className="relative min-h-screen bg-off-white selection:bg-black selection:text-white overflow-x-hidden">
      <CustomCursor />
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ clipPath: "circle(0% at calc(100% - 6rem) 6rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 6rem) 6rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 6rem) 6rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-100 flex flex-col"
            style={{ backgroundColor: "#d3d3d3" }}
          >
            {/* Main Navigation */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 pt-24 md:pt-0">
              {menuLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 40, y: -40 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.4 + (0.1 * i), duration: 0.6, ease: "circOut" }}
                >
                  <a 
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl md:text-7xl font-light tracking-tighter hover:italic transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="px-6 py-8 md:px-24 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/5">
              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="text-xs uppercase tracking-widest text-black/40 mb-4 font-medium">Contato</div>
                <div className="text-sm space-y-1">
                  <p>flowintic@gmail.com</p>
                  <p>+55 (21) 97211-7641</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="text-xs uppercase tracking-widest text-black/40 mb-4 font-medium">Social</div>
                <div className="flex gap-6">
                  <a href="https://www.instagram.com/flowintic/" target="_blank" rel="noopener noreferrer" title="Instagram">
                    <Camera size={18} className="text-black/60 hover:text-black cursor-pointer transition-colors" />
                  </a>
                  <a href="https://portifolio-cristian-barboza.vercel.app/" target="_blank" rel="noopener noreferrer" title="Portfólio">
                    <LinkIcon size={18} className="text-black/60 hover:text-black cursor-pointer transition-colors" />
                  </a>
                  <a href="https://wa.me/5521972117641" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                    <MessageCircle size={18} className="text-black/60 hover:text-black cursor-pointer transition-colors" />
                  </a>
                  <a href="https://github.com/CristianSbarboza" target="_blank" rel="noopener noreferrer" title="GitHub">
                    <Code size={18} className="text-black/60 hover:text-black cursor-pointer transition-colors" />
                  </a>
                </div>
              </motion.div>


            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="absolute top-0 w-full z-110 px-6 py-8 md:px-24 md:py-24 flex justify-between items-start pointer-events-none">
        <div className="flex items-start gap-12 pointer-events-auto">
          <div className="w-auto h-10 flex items-center justify-center">
            <Image 
              src="/imgs/flowintic-sf.png" 
              alt="Flow In Tic Logo" 
              width={60} 
              height={36} 
              style={{ height: 'auto' }}
              className="object-contain grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
              priority
            />
          </div>
        </div>
        <motion.div 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 flex flex-col items-end justify-center gap-1.5 group cursor-pointer text-black pointer-events-auto relative"
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          whileHover="hover"
        >
          <motion.div 
            className="h-[2px] bg-black group-hover:bg-white transition-colors duration-300" 
            variants={{
              closed: { width: "24px", rotate: 0, y: 0 },
              open: { width: "32px", rotate: 45, y: 4, x: -4 },
              hover: { width: "40px" }
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="h-[2px] bg-black group-hover:bg-white transition-colors duration-300" 
            variants={{
              closed: { width: "40px", opacity: 1 },
              open: { width: "0px", opacity: 0 },
              hover: { width: "24px" }
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.div 
            className="h-[2px] bg-black group-hover:bg-white transition-colors duration-300" 
            variants={{
              closed: { width: "24px", rotate: 0, y: 0 },
              open: { width: "32px", rotate: -45, y: -4, x: -4 },
              hover: { width: "40px" }
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero"
        onMouseMove={handleMouseMove}
        className="h-screen flex items-center px-6 md:px-24 overflow-hidden relative group/hero"
      >
        <div className="absolute inset-0 z-0">
          <SmoothVideo src="/videos/Video-Hero.mp4" startTime={2}/>
          <Particles 
            className="absolute inset-0 h-1/2 pointer-events-none"
            quantity={150}
          />
        </div>
        
        {/* Overlay de Grayscale com máscara para revelar cor */}
        <motion.div 
          className="absolute inset-0 z-1 backdrop-grayscale pointer-events-none"
          style={{
            maskImage: spotlightMask,
            WebkitMaskImage: spotlightMask,
          }}
        />
        
        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-off-white/40 z-1" />

        <div className="w-full relative z-10">
          <div className="max-w-4xl">
            <div className="tracking-[0.6em]">FLOW IN TIC</div>
            <h1 className="heading-giant flex flex-col gap-2">
              <span>Onde a tecnologia encontra o flow.</span>
            </h1>
          </div>
        </div>
      </section>


      {/* Showcase Section 1 - Dark */}
      <motion.section 
        ref={showcaseRef}
        id="portfolio" 
        style={{ scale, opacity }}
        className="bg-pure-black text-white py-20 px-6 md:py-40 md:px-24 rounded-3xl mx-2 md:mx-4 my-5 md:my-10 overflow-hidden origin-center"
      >
        <div className="flex flex-row justify-between items-center md:items-end gap-4 md:gap-10 mb-10 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-white text-sm md:text-xl mb-1 md:mb-2 font-medium tracking-tight">Faça como o</div>
            <h2 className="text-2xl md:text-6xl font-bold tracking-tight text-white">Freitas Alvf</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <a href="https://freitasalvf.net" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="px-4 md:px-8 text-xs md:text-sm border-white text-white hover:bg-white hover:text-black whitespace-nowrap">
                Ver Projeto
              </Button>
            </a>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          <a href="https://freitasalvf.net" target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative aspect-video w-full overflow-hidden rounded-sm">
              <Image 
                src="/imgs/prova-social-freitasalvf.png" 
                alt="Freitas Alvf" 
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
              />
            </div>
          </a>
        </motion.div>
      </motion.section>

      {/* Marquee Icons Section */}
      <section className="h-[250px] flex items-center overflow-hidden relative">
        <motion.div 
          className="flex gap-12 whitespace-nowrap"
          style={{ x: useTransform(useScroll().scrollYProgress, [0, 1], [0, -1500]) }}
        >
          {[...Array(40)].map((_, i) => {
            const icons = [
              <Command key="1" size={24} />, <Sparkles key="2" size={24} />, 
              <GitBranch key="3" size={24} />, <ArrowRight key="4" size={24} />,
              <FileText key="5" size={24} />, <RotateCw key="6" size={24} />,
              <Box key="7" size={24} />, <ArrowUp key="8" size={24} />,
              <Share2 key="9" size={24} />, <Folder key="10" size={24} />,
              <Terminal key="11" size={24} />, <LayoutGrid key="12" size={24} />,
              <CornerDownLeft key="13" size={24} />, <Monitor key="14" size={24} />,
              <Code key="15" size={24} />, <SquareCode key="16" size={24} />
            ];
            const Icon = icons[i % icons.length];
            return (
              <motion.div 
                key={i} 
                animate={{
                  y: [
                    Number((Math.sin(i * 0.5) * 80).toFixed(4)), 
                    Number((Math.sin(i * 0.5 + Math.PI) * 80).toFixed(4))
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
                style={{ 
                  rotate: Number((Math.cos(i * 0.5) * 15).toFixed(4))
                }}
                className="shrink-0 w-24 h-24 rounded-full border border-black/10 flex items-center justify-center text-black/20 hover:text-black hover:border-black/40 transition-all duration-500 bg-black/2"
              >
                {Icon}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Process Section - Light */}
      <section id="about" className="pt-10 pb-20 md:pb-40 px-6 md:px-24 border-t border-black/5 bg-off-white text-black overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h3 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
              Design exclusivo para marcas que não aceitam o comum.
            </h3>
            <p className="text-xl opacity-80 leading-relaxed max-w-3xl font-body font-medium text-black mb-12">
              Criamos o ecossistema digital que o seu negócio merece, elevando sua presença online ao patamar das marcas mais influentes do mundo.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button variant="outline" className="w-fit text-lg py-6 px-10">
              Quero impactar o mundo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Grid Showcase - Staggered */}
      <section className="bg-pure-black text-white py-20 md:py-40 px-6 md:px-24">
        <div className="text-white text-xl mb-20 md:mb-32 text-center font-medium tracking-tight opacity-60">Projetos que impactam</div>
        
        <div className="max-w-7xl mx-auto flex flex-col gap-40 md:gap-64">
          {PROJECTS.map((item, i) => (
            <ProjectCard key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-40 px-6 md:px-10 bg-off-white text-black text-center border-t border-black/5">
        <div className="max-w-4xl mx-auto">
          <div className="label-sm mb-10 text-black/40">Contato</div>
          <h2 className="heading-giant mb-16 uppercase tracking-tighter">Tenha um site arrebatador.</h2>
          <a href="https://wa.me/5521972117641" target="_blank" rel="noopener noreferrer" className="block w-fit mx-auto">
            <Button variant="primary" className="h-16 px-12 text-lg rounded-full">
              Chame no WhatsApp
            </Button>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="bg-pure-black text-white pt-32 pb-10 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          
          {/* Flow In Tic */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >

            <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
              A <span className="font-bold">Flow In Tic</span> nasceu para redefinir o padrão da web.
            </h3>
            <p className="text-lg text-white/60 leading-relaxed font-body">
              Não criamos apenas sites; construímos ecossistemas digitais de alto impacto. 
              Nosso foco é unir estética premium, performance impecável e psicologia de conversão 
              para marcas que desejam se destacar e liderar seus mercados. Onde a tecnologia encontra o flow.
            </p>
          </motion.div>

          {/* CEO */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-10 items-start"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 relative rounded-full overflow-hidden border border-white/10 bg-white/5 group">
              <Image 
                src="/imgs/ceo.jpeg" 
                alt="Cristian Barboza - CEO" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
            </div>
            <div>
              <div className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-4">CEO & Founder</div>
              <h4 className="text-3xl font-bold mb-4 tracking-tight">Cristian Barboza</h4>
              <p className="text-white/60 font-body mb-8 leading-relaxed text-sm">
                Desenvolvedor fullstack, entusiasta blockchain e implementador de IA. Especialista em criar experiências imersivas que convertem e encantam.
              </p>
              
              <div className="flex gap-4">
                <a href="https://github.com/CristianSbarboza" target="_blank" rel="noopener noreferrer" title="GitHub" className="p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/cristian-dsbs" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://www.instagram.com/flowintic/" target="_blank" rel="noopener noreferrer" title="Instagram" className="p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="https://portifolio-cristian-barboza.vercel.app/" target="_blank" rel="noopener noreferrer" title="Portfólio" className="p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll Connection & Final CTA Section */}
      <section id="contato" className="bg-pure-black text-white pb-32 px-6 md:px-24">
        <div className="max-w-4xl mx-auto flex flex-col items-center">

          <div className="flex flex-col md:flex-row items-center justify-center w-full relative gap-16 md:gap-0">
            {/* Desktop Horizontal Line Base */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-px bg-white/10 -translate-y-1/2 z-0"></div>
            {/* Desktop Animated Line */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "70%" }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="hidden md:block absolute top-1/2 left-[15%] h-px bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] -translate-y-1/2 origin-left z-0"
            ></motion.div>


            {/* Nodes */}
            <div className="flex flex-col md:flex-row justify-between gap-24 md:gap-0 w-full z-10 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-4 bg-pure-black p-4"
              >
                <div className="w-16 h-16 rounded-full border border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-md" title="Empresa">
                  <Box size={24} className="text-white/70" />
                </div>
                <div className="font-bold text-lg tracking-tight">Sua Empresa</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.75 }}
                className="flex flex-col items-center gap-4 bg-pure-black p-4"
              >
                <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]" title="Site Arrebatador">
                  <Globe size={32} />
                </div>
                <div className="font-bold text-xl tracking-tight">Site Arrebatador</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="flex flex-col items-center gap-4 bg-pure-black p-4"
              >
                <div className="w-16 h-16 rounded-full border border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-md" title="Cliente">
                  <User size={24} className="text-white/70" />
                </div>
                <div className="font-bold text-lg tracking-tight">Seu Cliente</div>
              </motion.div>
            </div>
            
            {/* Mobile Vertical Line Base */}
            <div className="md:hidden absolute top-[10%] bottom-[10%] left-1/2 w-px bg-white/10 -translate-x-1/2 z-0"></div>
            {/* Mobile Animated Line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "80%" }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="md:hidden absolute top-[10%] left-1/2 w-px bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] -translate-x-1/2 origin-top z-0"
            ></motion.div>
          </div>

          {/* Call to action */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 2 }}
            className="mt-32 mb-32 text-center flex flex-col items-center w-full"
          >
            <h3 className="text-3xl md:text-5xl font-light tracking-tight mb-10 max-w-2xl">
              Pronto para criar uma <span className="font-bold italic">conexão real</span> com o seu público?
            </h3>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <a href="https://wa.me/5521972117641" target="_blank" rel="noopener noreferrer" className="h-14 px-8 rounded-full flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
                <MessageCircle size={18} />
                Chamar no WhatsApp
              </a>
              <a href="https://www.instagram.com/flowintic/" target="_blank" rel="noopener noreferrer" className="h-14 px-8 rounded-full flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                Nosso Instagram
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer Copyright */}
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 text-[10px] font-bold tracking-widest uppercase">
          <div>&copy; 2026 FLOW IN TIC. TODOS OS DIREITOS RESERVADOS.</div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </section>
    </div>
  );
}
