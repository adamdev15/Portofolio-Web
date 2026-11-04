"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Project } from "@prisma/client";
import { SafeImage } from "@/components/ui/safe-image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/context/language-context";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const { t } = useLanguage();
  const hasMore = projects.length > visibleCount;

  const showMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <section id="projects" className="py-20 md:py-24 bg-secondary/30 px-4 md:px-6 scroll-mt-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3 max-w-xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
              {t("projects.title")} <span className="text-primary">{t("projects.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              {t("projects.subtitle")}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/projects">
              <Button variant="outline" className="rounded-full group border-primary/30 hover:bg-primary/10">
                {t("projects.viewAll")} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, visibleCount).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 6) * 0.08 }}
              className="group bg-card rounded-3xl overflow-hidden border border-border/60 hover:border-primary/50 transition-all duration-300 shadow-xl shadow-black/5 hover:-translate-y-1 flex flex-col"
            >
              {/* Project Image: Increased Height from h-42 to h-60 md:h-72 for clear and elegant showcase */}
              <div className="relative h-60 sm:h-64 md:h-72 w-full overflow-hidden bg-secondary/50">
                {project.image ? (
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
                
                {/* Overlay with interactive buttons */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors transform hover:scale-110"
                      aria-label="View Source on GitHub"
                    >
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-primary transition-colors transform hover:scale-110"
                      aria-label="View Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/40">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full">
                      Web App
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                      Fullstack
                    </span>
                  </div>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                    >
                      Demo <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex justify-center mt-12"
          >
            <Button 
              onClick={showMore}
              variant="outline" 
              className="rounded-full px-8 py-6 border-primary/30 hover:bg-primary/10 transition-all group font-semibold"
            >
              {t("projects.viewMore")} <ArrowRight className="ml-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
