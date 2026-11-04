"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useLanguage } from "@/context/language-context";

export function GithubContribution() {
  const username = "adamdev15";
  const { t } = useLanguage();

  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#162447", "#1f4068", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <section className="py-20 md:py-24 relative overflow-hidden px-4 md:px-6 bg-secondary/20">
      <div className="absolute top-0 right-0 -translate-y-1/2 w-[450px] h-[450px] bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 w-[450px] h-[450px] bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
            <FaGithub size={16} />
            <span>{t("github.badge")}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
            {t("github.title")} <span className="text-primary">{t("github.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            {t("github.subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-card border border-border/60 rounded-3xl p-6 shadow-xl shadow-black/5"
        >
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-border/40">
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t("github.activeStatus")}</span>
              </div>
              <a 
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs md:text-sm font-bold text-primary hover:underline flex items-center gap-1.5 group"
              >
                {t("github.viewProfile")}
                <Activity size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="w-full overflow-x-auto no-scrollbar pb-2">
              <div className="min-w-[780px] flex justify-center">
                <GitHubCalendar 
                  username={username}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={13}
                  theme={theme}
                  showWeekdayLabels
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
