"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Certificate } from "@prisma/client";
import { SafeImage } from "@/components/ui/safe-image";
import { useState } from "react";
import { ImageModal } from "@/components/ui/image-modal";
import { useLanguage } from "@/context/language-context";

interface CertificatesGridProps {
  certificates: Certificate[];
}

export function CertificatesGrid({ certificates }: CertificatesGridProps) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const { t } = useLanguage();

  return (
    <>
      <ImageModal 
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage?.src || ""}
        alt={selectedImage?.alt || ""}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 container px-4 md:px-6 mx-auto">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card rounded-3xl border border-border/60 flex flex-col sm:flex-row overflow-hidden hover:border-primary/50 transition-all duration-300 group shadow-lg shadow-black/5 hover:-translate-y-1"
          >
            {/* Left side: No margin image */}
            <div 
              className="relative w-full sm:w-40 md:w-48 h-44 sm:h-auto min-h-[170px] flex-shrink-0 bg-primary/5 cursor-zoom-in group/img overflow-hidden"
              onClick={() => cert.image && setSelectedImage({ src: cert.image, alt: cert.title })}
              title="Click to view full image"
            >
              {cert.image ? (
                <SafeImage
                  src={cert.image}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 192px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                  <Award size={40} className="text-primary/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs font-semibold text-white bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Zoom
                </span>
              </div>
            </div>
            
            {/* Right side: Content */}
            <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <h3 className="text-base md:text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs font-medium text-muted-foreground">
                  {cert.issuer}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/40">
                <span className="text-[11px] font-bold text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                  {t("cert.issuedIn")} {cert.year}
                </span>
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-primary flex items-center gap-1 text-xs font-bold hover:underline"
                  >
                    {t("cert.verify")} <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
