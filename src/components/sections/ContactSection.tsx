"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/context/language-context";

export function ContactSection() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(t("contact.success"));
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(t("contact.error"));
      }
    } catch (err) {
      toast.error(t("contact.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 relative overflow-hidden px-4 md:px-6 scroll-mt-16">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-3"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
            {t("contact.title")} <span className="text-primary">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-heading">{t("contact.infoTitle")}</h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {t("contact.infoDesc")}
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">{t("contact.email")}</p>
                  <a href="mailto:adam.visionary15@gmail.com" className="text-foreground font-medium hover:text-primary transition-colors">
                    adam.visionary15@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">{t("contact.phone")}</p>
                  <a href="https://wa.me/6285640600585" target="_blank" rel="noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">
                    +62 856 4060 0585
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">{t("contact.location")}</p>
                  <p className="text-foreground font-medium">Kab. Tegal, Jawa Tengah, Indonesia</p>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t("contact.followMe")}</p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/adamdev15"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  aria-label="GitHub"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/adam-8107ba307/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="https://www.instagram.com/_adam.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://wa.me/6285640600585"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card p-7 md:p-8 rounded-3xl border border-border/60 shadow-xl shadow-black/5"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("contact.nameLabel")}
                  </label>
                  <Input
                    required
                    placeholder={t("contact.namePlaceholder")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-11 rounded-xl bg-secondary/40 border-border/60 focus:bg-background transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {t("contact.emailLabel")}
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder={t("contact.emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-11 rounded-xl bg-secondary/40 border-border/60 focus:bg-background transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("contact.subjectLabel")}
                </label>
                <Input
                  required
                  placeholder={t("contact.subjectPlaceholder")}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="h-11 rounded-xl bg-secondary/40 border-border/60 focus:bg-background transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {t("contact.messageLabel")}
                </label>
                <Textarea
                  required
                  placeholder={t("contact.messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[140px] rounded-xl bg-secondary/40 border-border/60 focus:bg-background transition-all"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="w-full h-12 rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" /> {t("contact.sending")}
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" /> {t("contact.sendBtn")}
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
