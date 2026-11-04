"use client";

import { useLanguage, Language } from "@/context/language-context";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "pill" | "compact";
}

export function LanguageSwitcher({ className, variant = "pill" }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("h-9 w-24 rounded-full bg-secondary/50 animate-pulse", className)} />
    );
  }

  const languages: { code: Language; label: string; flag: string; fullName: string }[] = [
    { code: "id", label: "ID", flag: "🇮🇩", fullName: "Bahasa Indonesia" },
    { code: "en", label: "EN", flag: "🇬🇧", fullName: "English" },
  ];

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={cn(
        "inline-flex items-center p-1 rounded-full bg-secondary/70 border border-border/50 backdrop-blur-md shadow-sm transition-all",
        className
      )}
    >
      {languages.map((item) => {
        const isActive = lang === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLang(item.code)}
            title={item.fullName}
            aria-pressed={isActive}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-300 select-none",
              isActive
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-[1.03]"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            <span className="text-sm leading-none" role="img" aria-label={item.label}>
              {item.flag}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

