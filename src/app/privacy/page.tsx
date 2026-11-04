"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/context/language-context";
import { Shield, Lock, Eye, Database, UserCheck, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
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
              <Shield size={14} />
              <span>{isEn ? "Legal & Data Protection" : "Hukum & Perlindungan Data"}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-heading tracking-tight">
              {t("privacy.title")} <span className="text-primary">{t("privacy.titleHighlight")}</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {t("privacy.subtitle")}
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
                <Database size={22} />
                <h2 className="text-xl font-bold font-heading">
                  {isEn ? "1. Information We Collect" : "1. Informasi yang Kami Kumpulkan"}
                </h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {isEn
                  ? "We only collect information that you voluntarily provide when using the contact form on this website, including your name, email address, subject, and message content. Additionally, anonymous technical data such as browser type, device information, and page view telemetry may be logged to improve platform performance."
                  : "Kami hanya mengumpulkan informasi yang Anda berikan secara sukarela saat menggunakan formulir kontak di situs web ini, mencakup nama lengkap, alamat email, subjek, serta isi pesan Anda. Selain itu, data teknis anonim seperti jenis peramban, informasi perangkat, dan telemetri kunjungan halaman dapat dicatat untuk meningkatkan performa situs."}
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-card p-6 md:p-8 rounded-3xl border border-border/60 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Eye size={22} />
                <h2 className="text-xl font-bold font-heading">
                  {isEn ? "2. How We Use Your Information" : "2. Penggunaan Informasi"}
                </h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {isEn
                  ? "Information collected is strictly utilized to respond to your professional inquiries, discuss project collaborations, or provide requested technical consultations. We never sell, rent, or distribute your personal data to third parties for commercial advertising."
                  : "Informasi yang dikumpulkan digunakan secara ketat untuk membalas pertanyaan profesional Anda, mendiskusikan peluang kerjasama proyek, atau memberikan konsultasi teknis yang Anda minta. Kami tidak pernah menjual, menyewakan, atau menyebarkan data pribadi Anda kepada pihak ketiga untuk kepentingan iklan komersial."}
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-card p-6 md:p-8 rounded-3xl border border-border/60 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Lock size={22} />
                <h2 className="text-xl font-bold font-heading">
                  {isEn ? "3. Data Security & Storage" : "3. Keamanan & Penyimpanan Data"}
                </h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {isEn
                  ? "All data transmissions on this website are encrypted using Industry-standard SSL/TLS protocols (HTTPS). Database storage is protected with stringent authentication, role-based access control, and environment separation to prevent unauthorized access or disclosure."
                  : "Semua transmisi data di situs web ini dienkripsi menggunakan protokol standar industri SSL/TLS (HTTPS). Penyimpanan database dilindungi dengan otentikasi ketat, kontrol akses berbasis peran (RBAC), dan pemisahan environment untuk mencegah akses tidak sah atau kebocoran data."}
              </p>
            </div>

            {/* Section 4 */}
            <div className="bg-card p-6 md:p-8 rounded-3xl border border-border/60 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <UserCheck size={22} />
                <h2 className="text-xl font-bold font-heading">
                  {isEn ? "4. Your Privacy Rights" : "4. Hak Privasi Pengguna"}
                </h2>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {isEn
                  ? "In accordance with data protection principles (including the Indonesian Personal Data Protection Act / UU PDP), you have the right to request access to, correction of, or permanent deletion of any personal messages or contact information submitted through this site."
                  : "Sesuai dengan prinsip perlindungan data pribadi (termasuk Undang-Undang Perlindungan Data Pribadi / UU PDP Indonesia), Anda berhak meminta akses, perbaikan, atau penghapusan permanen atas setiap pesan atau data kontak pribadi yang pernah Anda kirimkan melalui situs ini."}
              </p>
            </div>

            {/* Section 5: Contact */}
            <div className="bg-primary/5 p-6 md:p-8 rounded-3xl border border-primary/20 space-y-3">
              <div className="flex items-center gap-3 text-primary">
                <Mail size={22} />
                <h2 className="text-xl font-bold font-heading">
                  {isEn ? "5. Contact for Privacy Matters" : "5. Kontak Terkait Privasi"}
                </h2>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {isEn
                  ? "If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out via email:"
                  : "Jika Anda memiliki pertanyaan, saran, atau permohonan terkait Kebijakan Privasi ini, silakan hubungi melalui email:"}
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

