"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/context/language-context";

interface NavbarProps {
  name?: string;
  image?: string | null;
}

export function Navbar({ name = "ADAM", image }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navLinks = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.experience"), href: "#experience" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.certificates"), href: "#certificates" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        e.preventDefault();
        setMobileMenuOpen(false);
        const targetId = href.replace("#", "");
        if (targetId === "home" || targetId === "") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const el = document.getElementById(targetId);
          if (el) {
            const navbarOffset = 70;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }
      }
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/85 backdrop-blur-xl py-3 border-border/80 shadow-md shadow-black/5"
          : "bg-transparent py-4 border-transparent"
      )}
    >
      <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {image ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary group-hover:scale-110 transition-transform">
              <SafeImage src={image} alt={name} fill className="object-cover" sizes="40px" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
              {name.charAt(0)}
            </div>
          )}
          <span className="text-xl font-bold font-heading tracking-tighter">
            Portofolio<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}

          {/* Controls: Theme & Language Switcher */}
          <div className="flex items-center gap-2 pl-2 border-l border-border/60">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
          >
            <Button size="sm" className="rounded-full px-5 shadow-lg shadow-primary/20">
              {t("nav.hireMe")}
            </Button>
          </a>
        </div>

        {/* Medium screens (Tablet) */}
        <div className="hidden md:flex lg:hidden items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border shadow-2xl lg:hidden"
          >
            <div className="flex flex-col p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <span className="text-xs font-bold uppercase text-muted-foreground">Language & Theme</span>
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-base font-medium py-2 hover:text-primary transition-colors cursor-pointer border-b border-border/40"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
              >
                <Button className="w-full rounded-xl mt-2">{t("nav.hireMe")}</Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
