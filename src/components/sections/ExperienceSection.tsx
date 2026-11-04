"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { Experience, Education } from "@prisma/client";
import { useLanguage } from "@/context/language-context";

interface ExperienceSectionProps {
  experiences: Experience[];
  education: Education[];
}

export function ExperienceSection({ experiences, education }: ExperienceSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 md:py-24 relative overflow-hidden bg-white/5 px-4 md:px-6 scroll-mt-16">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-3"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
            {t("exp.title")} <span className="text-primary">{t("exp.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            {t("exp.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
          {/* Vertical Divider for Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/40 hidden lg:block -translate-x-1/2" />

          {/* Left Column: Education */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                <GraduationCap size={22} />
              </div>
              <h3 className="text-2xl font-bold font-heading">{t("exp.education")}</h3>
            </div>

            <div className="space-y-6 relative pl-6 md:pl-8 border-l border-primary/20">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-2 w-3.5 h-3.5 rounded-full bg-background border-2 border-primary z-10" />
                  
                  <div className="bg-card p-6 rounded-2xl border border-border/60 hover:border-primary/40 transition-all group shadow-md shadow-black/5">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                          <Calendar size={12} /> {edu.startDate} - {edu.endDate || t("exp.present")}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors">{edu.degree}</h4>
                        <p className="text-muted-foreground font-medium text-sm">{edu.school}</p>
                      </div>
                      {edu.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {education.length === 0 && (
                <p className="text-muted-foreground italic text-sm">{t("exp.noEducation")}</p>
              )}
            </div>
          </div>

          {/* Right Column: Experience */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                <Briefcase size={22} />
              </div>
              <h3 className="text-2xl font-bold font-heading">{t("exp.experience")}</h3>
            </div>

            <div className="space-y-6 relative pl-6 md:pl-8 border-l border-primary/20">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-2 w-3.5 h-3.5 rounded-full bg-background border-2 border-primary z-10" />
                  
                  <div className="bg-card p-6 rounded-2xl border border-border/60 hover:border-primary/40 transition-all group shadow-md shadow-black/5">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                          <Calendar size={12} /> {exp.startDate} - {exp.endDate || t("exp.present")}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors">{exp.position}</h4>
                        <p className="text-muted-foreground font-medium text-sm">{exp.company}</p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {experiences.length === 0 && (
                <p className="text-muted-foreground italic text-sm">{t("exp.noExperience")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
