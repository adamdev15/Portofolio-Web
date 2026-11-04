"use client";

import React, { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { Activity, GitBranch, Users, RefreshCw, GitCommit } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useLanguage } from "@/context/language-context";
import { useTheme } from "next-themes";

interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalContributions: number;
  latestRepo?: string;
  latestCommit?: string;
  latestTime?: string;
}

export function GithubContribution() {
  const username = "adamdev15";
  const { t, lang } = useLanguage();
  const { resolvedTheme } = useTheme();

  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 18,
    followers: 12,
    totalContributions: 131,
    latestRepo: "Portofolio-Web",
    latestCommit: "update fitur themes dan language",
    latestTime: "Recently",
  });
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchRealtimeData = async () => {
    setLoading(true);
    try {
      // 1. Fetch user stats
      const userRes = await fetch(`https://api.github.com/users/${username}`, {
        cache: "no-store",
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        setStats((prev) => ({
          ...prev,
          publicRepos: userData.public_repos || prev.publicRepos,
          followers: userData.followers || prev.followers,
        }));
      }

      // 2. Fetch latest public events for live activity
      const eventsRes = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=5`,
        { cache: "no-store" }
      );
      if (eventsRes.ok) {
        const events = await eventsRes.json();
        const pushEvent = events.find((e: any) => e.type === "PushEvent") || events[0];
        if (pushEvent) {
          const repoName = pushEvent.repo?.name?.split("/").pop() || "Portofolio-Web";
          const commitMsg =
            pushEvent.payload?.commits?.[0]?.message?.slice(0, 50) || "Code updates";
          setStats((prev) => ({
            ...prev,
            latestRepo: repoName,
            latestCommit: commitMsg,
            latestTime: new Date(pushEvent.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }));
        }
      }

      // 3. Fetch contribution count
      const contribRes = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        { cache: "no-store" }
      );
      if (contribRes.ok) {
        const contribData = await contribRes.json();
        if (contribData?.total?.lastYear) {
          setStats((prev) => ({
            ...prev,
            totalContributions: contribData.total.lastYear,
          }));
        }
      }

      setLastRefreshed(new Date());
    } catch (err) {
      console.error("Realtime GitHub Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealtimeData();
    // Auto refresh every 60 seconds
    const interval = setInterval(fetchRealtimeData, 60000);
    return () => clearInterval(interval);
  }, []);

  const isDark = resolvedTheme === "dark";
  const calendarTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#0f172a", "#1e3a8a", "#2563eb", "#60a5fa", "#93c5fd"],
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

        {/* Realtime Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-card p-4 rounded-2xl border border-border/60 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading">{stats.totalContributions}</p>
              <p className="text-xs text-muted-foreground">{t("github.totalContribs")}</p>
            </div>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-border/60 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
              <GitBranch size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading">{stats.publicRepos}</p>
              <p className="text-xs text-muted-foreground">{t("github.publicRepos")}</p>
            </div>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-border/60 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
              <Users size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold font-heading">{stats.followers}</p>
              <p className="text-xs text-muted-foreground">{t("github.followers")}</p>
            </div>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-border/60 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <GitCommit size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-foreground truncate">{stats.latestRepo}</p>
              <p className="text-[11px] text-muted-foreground truncate" title={stats.latestCommit}>
                {stats.latestCommit}
              </p>
            </div>
          </div>
        </div>

        {/* Calendar Card */}
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
                <span className="font-medium text-foreground">{t("github.liveStatus")}</span>
                <span>• {t("github.activeStatus")}</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={fetchRealtimeData}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  title="Refresh live telemetry"
                >
                  <RefreshCw size={12} className={loading ? "animate-spin text-primary" : ""} />
                  <span>Sync</span>
                </button>
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
            </div>

            <div className="w-full overflow-x-auto no-scrollbar pb-2">
              <div className="min-w-[780px] flex justify-center">
                <GitHubCalendar
                  key={`${isDark ? "dark" : "light"}-${lastRefreshed.getTime()}`}
                  username={username}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={13}
                  theme={calendarTheme}
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
