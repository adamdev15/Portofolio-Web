"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/context/language-context";
import { FileText, Award, Code2, AlertCircle, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
  const { lang, t } = useLanguage();
  const isEn = lang === "en";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4 md:px-6">
        <div className="container max-w-4xl mx-auto">
          {/* Back button */}
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-8 hover:bg-primary/10 hover:text-primary transition-all rounded-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> {t("legal.backHome")}
            </Button>
          </Link>

          {/* Header */}
          <div className="space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
              <FileText size={14} />
              <span>{isEn ? "Terms & Conditions" : "Syarat & Ketentuan Penggunaan"}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
              {t("terms.title")} <span className="text-primary">{t("terms.titleHighlight")}</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {t("terms.subtitle")}
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              {t("legal.lastUpdated")}: November 2026
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-foreground/90">
            {/* Section 1 */}
            <div className="bg-card p-6 md:p-8 rounded-3xl border border-border/60 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <FileText size={22} />
                <h2 className="text-xl font-bold font-heading">
                  {isEn ? "1. Acceptance of Terms" : "1. Penerimaan Ketentuan"}
                </h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {isEn
                  ? "By browsing and accessing this portfolio website, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please refrain from using or browsing this website."
                  : "Dengan mengakses dan menggunakan situs web portofolio ini, Anda menyetujui untuk mematuhi dan terikat oleh Syarat dan Ketentuan Layanan ini. Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, Anda disarankan untuk tidak melanjutkan penggunaan situs ini."}
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-card p-6 md:p-8 rounded-3xl border border-border/60 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Code2 size={22} />
                <h2 className="text-xl font-bold font-heading">
                  {isEn ? "2. Intellectual Property & Showcased Works" : "2. Hak Kekayaan Intelektual"}
                </h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {isEn
                  ? "All portfolio layouts, graphic assets, brand elements, and showcased project descriptions are the intellectual property of Adam unless otherwise stated. Projects originating from client work, internships, or open-source repositories remain governed by their respective client agreements or open-source software licenses (e.g. MIT, Apache)."
                  : "Seluruh tata letak portofolio, aset grafis, elemen merek, dan dokumentasi proyek merupakan hak kekayaan intelektual milik Adam kecuali dinyatakan sebaliknya. Proyek yang bersumber dari pekerjaan klien, instansi magang, atau repositori open-source tetap tunduk pada perjanjian kepemilikan klien atau lisensi perangkat lunak terkait (misalnya MIT, Apache)."}
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-card p-6 md:p-8 rounded-3xl border border-border/60 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <ExternalLink size={22} />
                <h2 className="text-xl font-bold font-heading">
                  {isEn ? "3. External Links & Third-Party Platforms" : "3. Tautan Pihak Ketiga"}
                </h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {isEn
                  ? "This portfolio contains outbound links to external sites such as GitHub, LinkedIn, live demo websites, and verification bodies. We are not responsible for the content, privacy practices, or availability of any third-party external services."
                  : "Portofolio ini memuat tautan menuju situs eksternal seperti GitHub, LinkedIn, demo web aplikasi, dan situs sertifikasi. Kami tidak bertanggung jawab atas isi konten, kebijakan privasi, atau ketersediaan operasional dari layanan pihak ketiga tersebut."}
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-card p-6 md:p-8 rounded-3xl border border-border/60 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <AlertCircle size={22} />
                <h2 className="text-xl font-bold font-heading">
                  {isEn ? "4. Disclaimer & Limitation of Liability" : "4. Batasan Tanggung Jawab"}
                </h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {isEn
                  ? "This website is provided on an 'as is' and 'as available' basis for professional portfolio and career presentation purposes. While all reasonable efforts are made to ensure accuracy and uptime, no warranties are made regarding uninterrupted access or error-free operation."
                  : "Situs web ini disediakan sebagaimana adanya ('as is') untuk tujuan presentasi profil profesional, portofolio karya, dan komunikasi karir. Meskipun upaya terbaik dilakukan guna menjaga keakuratan informasi dan uptime, tidak ada jaminan bahwa situs ini akan selalu bebas gangguan atau kekeliruan teknis."}
              </p>
            </div>

            {/* Section 5: Governing Law */}
            <div className="bg-primary/5 p-6 md:p-8 rounded-3xl border border-primary/20 space-y-3">
              <div className="flex items-center gap-3 text-primary">
                <Award size={22} />
                <h2 className="text-xl font-bold font-heading">
                  {isEn ? "5. Governing Law & Inquiries" : "5. Hukum yang Berlaku & Kontak"}
                </h2>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {isEn
                  ? "These terms are governed by and construed in accordance with the laws of the Republic of Indonesia. For questions regarding project rights, licensing, or commercial collaboration, please contact:"
                  : "Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum yang berlaku di Republik Indonesia. Untuk pertanyaan seputar hak cipta karya, lisensi, atau penawaran kerjasama, silakan hubungi:"}
              </p>
              <p className="font-semibold text-primary">
                <a href="mailto:adam.visionary15@gmail.com" className="hover:underline">
                  adam.visionary15@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

