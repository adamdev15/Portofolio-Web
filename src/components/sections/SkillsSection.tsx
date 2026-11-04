"use client";

import { motion } from "framer-motion";
import { Skill } from "@prisma/client";
import { SafeImage } from "@/components/ui/safe-image";
import { useLanguage } from "@/context/language-context";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { t } = useLanguage();
  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <section id="skills" className="py-20 md:py-24 px-4 md:px-6 scroll-mt-16">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-3"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
            {t("skills.title")} <span className="text-primary">{t("skills.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.08 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold border-l-4 border-primary pl-3 uppercase tracking-wider text-foreground">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-3.5">
                {skills
                  .filter(s => s.category === category)
                  .map((skill) => (
                    <motion.div
                      key={skill.id}
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="p-5 rounded-2xl bg-card border border-border/60 flex flex-col items-center justify-center gap-3 group transition-all duration-300 hover:border-primary/40 shadow-md shadow-black/5"
                      title={skill.name}
                    >
                      {skill.image ? (
                        <div className="relative w-11 h-11 transition-all duration-300 group-hover:scale-110">
                          <SafeImage src={skill.image} alt={skill.name} fill className="object-contain" sizes="44px" />
                        </div>
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                          {skill.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors text-center line-clamp-1">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
