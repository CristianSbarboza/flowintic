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
  LayoutGrid, CornerDownLeft, Monitor, SquareCode
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
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
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
        
        <div className="relative aspect-video overflow-hidden rounded-[2rem] bg-pure-black z-10 border border-white/10">
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
        <div className="absolute -inset-10 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-0" />
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
    { name: "Home", href: "/" },
    { name: "Sobre", href: "#agencia" },
    { name: "Portfólio", href: "#portfolio" },
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
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
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
                    className="text-7xl font-light tracking-tighter hover:italic transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Menu Footer */}
            <div className="px-24 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/5">
              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="text-xs uppercase tracking-widest text-black/40 mb-4 font-medium">Contato</div>
                <div className="text-sm space-y-1">
                  <p>oi@flowintic.com.br</p>
                  <p>+55 (11) 99999-9999</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="text-xs uppercase tracking-widest text-black/40 mb-4 font-medium">Social</div>
                <div className="flex gap-6">
                  <Camera size={18} className="text-black/60 hover:text-black cursor-pointer transition-colors" />
                  <LinkIcon size={18} className="text-black/60 hover:text-black cursor-pointer transition-colors" />
                  <MessageCircle size={18} className="text-black/60 hover:text-black cursor-pointer transition-colors" />
                  <Code size={18} className="text-black/60 hover:text-black cursor-pointer transition-colors" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="flex flex-col items-start md:items-end justify-end"
              >
                <Button variant="outline" className="rounded-full px-8 py-6 border-black hover:bg-black hover:text-white transition-all duration-500">
                  <Globe size={16} className="mr-2" />
                  Trabalhe conosco
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="absolute top-0 w-full z-110 px-24 py-24 flex justify-between items-start pointer-events-none">
        <div className="flex items-start gap-12 pointer-events-auto">
          <div className="w-auto h-10 flex items-center justify-center">
            <Image 
              src="/imgs/flowintic-sf.png" 
              alt="Flow In Tic Logo" 
              width={60} 
              height={36} 
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
        onMouseMove={handleMouseMove}
        className="h-screen flex items-center px-24 overflow-hidden relative group/hero"
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
        className="bg-pure-black text-white py-40 px-24 rounded-3xl mx-4 my-10 overflow-hidden origin-center"
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="text-white text-xl mb-2 font-medium tracking-tight">Faça como o</div>
            <h2 className="text-6xl font-bold tracking-tight text-white">Freitas Alvf</h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <a href="https://freitasalvf.net" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-black">
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
                  y: [Math.sin(i * 0.5) * 80, Math.sin(i * 0.5 + Math.PI) * 80],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
                style={{ 
                  rotate: Math.cos(i * 0.5) * 15
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
      <section id="about" className="pt-10 pb-40 px-24 border-t border-black/5 bg-off-white text-black overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="label-sm mb-10 text-black/40">Estratégia & Design</div>
            <h3 className="text-6xl font-bold leading-tight mb-8">
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
      <section className="bg-pure-black text-white py-40 px-6 md:px-24">
        <div className="text-white text-xl mb-32 text-center font-medium tracking-tight opacity-60">Projetos que impactam</div>
        
        <div className="max-w-7xl mx-auto flex flex-col gap-40 md:gap-64">
          {PROJECTS.map((item, i) => (
            <ProjectCard key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-40 px-10 bg-off-white text-black text-center border-t border-black/5">
        <div className="max-w-4xl mx-auto">
          <div className="label-sm mb-10 text-black/40">Contato</div>
          <h2 className="heading-giant mb-16 uppercase tracking-tighter">Tenha um site arrebatador.</h2>
          <Button variant="primary" className="mx-auto h-16 px-12 text-lg rounded-full">
            Chame no WhatsApp
          </Button>
          
          <div className="mt-40 pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40 text-[10px] font-bold tracking-widest uppercase">
            <div>&copy; 2026 FLOW IN TIC. TODOS OS DIREITOS RESERVADOS.</div>
            <div className="flex gap-10">
              <a href="#" className="hover:text-black transition-colors">Privacidade</a>
              <a href="#" className="hover:text-black transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
