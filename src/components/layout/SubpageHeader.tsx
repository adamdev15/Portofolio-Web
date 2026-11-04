"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

interface SubpageHeaderProps {
  type: "projects" | "certificates";
}

export function SubpageHeader({ type }: SubpageHeaderProps) {
  const { t } = useLanguage();

  const isProjects = type === "projects";
  const title = isProjects ? t("projects.allTitle") : t("cert.allTitle");
  const highlight = isProjects ? t("projects.allHighlight") : t("cert.allHighlight");
  const subtitle = isProjects ? t("projects.allSubtitle") : t("cert.allSubtitle");

  return (
    <div className="container px-4 md:px-6 mx-auto mb-12">
      <Link href="/">
        <Button variant="ghost" className="mb-6 hover:bg-primary/10 hover:text-primary transition-all rounded-full">
          <ArrowLeft className="mr-2 h-4 w-4" /> {t("projects.backHome")}
        </Button>
      </Link>
      <div className="space-y-3">
        <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
          {title} <span className="text-primary">{highlight}</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

