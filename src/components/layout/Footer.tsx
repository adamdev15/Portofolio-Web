"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/context/language-context";

interface FooterProps {
  name?: string;
  image?: string | null;
}

export function Footer({ name = "ADAM" }: FooterProps) {
  const { t } = useLanguage();

  return (
    <footer className="bg-card text-foreground py-16 mt-16 relative overflow-hidden border-t border-border/60">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] pointer-events-none" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold font-heading tracking-tight">
                Portofolio<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm md:text-base">
              {t("footer.desc")}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/adamdev15"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/adam-8107ba307/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://www.instagram.com/_adam.dev/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://wa.me/6285640600585"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-base mb-4 text-foreground">{t("footer.quickLinks")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/#home" className="hover:text-primary transition-colors">{t("nav.home")}</a></li>
              <li><a href="/#experience" className="hover:text-primary transition-colors">{t("nav.experience")}</a></li>
              <li><a href="/#projects" className="hover:text-primary transition-colors">{t("nav.projects")}</a></li>
              <li><a href="/#skills" className="hover:text-primary transition-colors">{t("nav.skills")}</a></li>
              <li><a href="/#certificates" className="hover:text-primary transition-colors">{t("nav.certificates")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4 text-foreground">{t("footer.services")}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-default">Web Development</li>
              <li className="hover:text-primary cursor-default">Backend API & System</li>
              <li className="hover:text-primary cursor-default">UI/UX Design</li>
              <li className="hover:text-primary cursor-default">Database Architecture</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {name}. {t("footer.rights")}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground hover:underline transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="hover:text-foreground hover:underline transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
