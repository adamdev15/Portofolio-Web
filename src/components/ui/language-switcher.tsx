"use client";

import { useLanguage, Language } from "@/context/language-context";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("h-8 w-20 rounded-full bg-secondary/50 animate-pulse", className)} />
    );
  }

  const options: { code: Language; label: string; title: string }[] = [
    { code: "id", label: "ID", title: "Bahasa Indonesia" },
    { code: "en", label: "EN", title: "English" },
  ];

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={cn(
        "inline-flex items-center p-0.5 rounded-full bg-secondary/80 border border-border/60 shadow-sm",
        className
      )}
    >
      {options.map((item) => {
        const isActive = lang === item.code;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLang(item.code)}
            title={item.title}
            aria-pressed={isActive}
            className={cn(
              "px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 select-none tracking-wider",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-background/40"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
