"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Certificate } from "@prisma/client";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ImageModal } from "@/components/ui/image-modal";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const { t } = useLanguage();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="certificates" className="py-20 md:py-24 bg-secondary/30 relative overflow-hidden px-4 md:px-6 scroll-mt-16">
      <ImageModal 
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.src || ""}
        alt={selectedImage?.alt || ""}
      />
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3 max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
              <span className="text-primary">{t("cert.title")}</span> {t("cert.titleHighlight")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              {t("cert.subtitle")}
            </p>
          </motion.div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-primary/20 hover:bg-primary/10 transition-all"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-primary/20 hover:bg-primary/10 transition-all"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="min-w-[320px] sm:min-w-[460px] md:min-w-[500px] snap-center bg-card rounded-3xl border border-border/60 flex flex-col sm:flex-row overflow-hidden hover:border-primary/50 transition-all duration-300 group shadow-xl shadow-black/5 hover:-translate-y-1"
            >
              {/* Left Side: Certificate Image with NO MARGIN / NO PADDING */}
              <div 
                className="relative w-full sm:w-48 md:w-56 h-48 sm:h-auto min-h-[190px] flex-shrink-0 bg-primary/5 cursor-zoom-in group/img overflow-hidden"
                onClick={() => cert.image && setSelectedImage({ src: cert.image, alt: cert.title })}
                title="Click to view full image"
              >
                {cert.image ? (
                  <SafeImage
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 224px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                    <Award size={48} className="text-primary/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs font-semibold text-white bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    Zoom
                  </span>
                </div>
              </div>
              
              {/* Right Side: Content */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {cert.issuer}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                  <span className="text-xs font-bold text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    {t("cert.issuedIn")} {cert.year}
                  </span>
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-primary flex items-center gap-1.5 text-xs font-bold hover:underline"
                    >
                      {t("cert.verify")} <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex justify-center mt-10"
        >
          <Link href="/certificates">
            <Button 
              variant="outline" 
              className="rounded-full px-8 py-6 border-primary/30 hover:bg-primary/10 transition-all group font-semibold"
            >
              {t("cert.viewMore")} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
