"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import Typewriter from "typewriter-effect";
import { useLanguage } from "@/context/language-context";

interface HeroProps {
  heroData: {
    name: string;
    role: string;
    description: string;
    image?: string | null;
    cv?: string | null;
  };
}

export function Hero({ heroData }: HeroProps) {
  const { t, lang } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  const typewriterStrings =
    lang === "id"
      ? ["Web Developer", "Backend Developer", "Frontend Developer", "Fullstack Developer"]
      : ["Web Developer", "Backend Developer", "Frontend Developer", "Fullstack Developer"];

  return (
    <section id="home" className="relative flex items-center pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden px-4 md:px-6">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5 md:space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-2 md:space-y-3">
              <h2 className="text-lg md:text-xl font-semibold text-primary tracking-wide">
                {t("hero.greeting")}
              </h2>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight text-foreground leading-[1.1]">
                {heroData.name}
              </h1>
              <div className="text-xl md:text-3xl font-semibold text-muted-foreground min-h-[40px] flex items-center">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-primary">
                  <Typewriter
                    options={{
                      strings: typewriterStrings,
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 40,
                    }}
                  />
                </span>
              </div>
            </motion.div>

            {/* Description: Rata Kanan Kiri (text-justify) with clean line height */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl text-justify"
            >
              {heroData.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-1">
              {heroData.cv && (
                <a href={heroData.cv} target="_blank" rel="noreferrer">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-7 shadow-lg shadow-primary/20 transition-all hover:scale-105">
                    {t("hero.downloadCv")}
                  </Button>
                </a>
              )}
              <a href="https://www.linkedin.com/in/adam-8107ba307/" target="_blank" rel="noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-7 glass border-primary/40 hover:bg-primary/10 transition-all hover:scale-105">
                  {t("hero.connectLinkedin")}
                </Button>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-5 pt-2">
              <a
                href="https://github.com/adamdev15"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/adam-8107ba307/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:adam.visionary@gmail.com"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                aria-label="Email"
              >
                <FaEnvelope className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/6285640600585"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px]">
              {/* Decorative Animated Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
              <div className="absolute inset-3 rounded-full border border-accent/25 animate-reverse-spin" />
              
              {/* Image Circle Container */}
              <div className="absolute inset-6 rounded-full overflow-hidden glass border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                {heroData.image ? (
                  <SafeImage 
                    src={heroData.image} 
                    alt={heroData.name} 
                    fill 
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground">No Image</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
