"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Nav
    "nav.home": "Beranda",
    "nav.experience": "Pengalaman",
    "nav.projects": "Proyek",
    "nav.skills": "Keahlian",
    "nav.certificates": "Sertifikat",
    "nav.contact": "Kontak",
    "nav.hireMe": "Hubungi Saya",

    // Hero
    "hero.greeting": "Halo, Saya",
    "hero.downloadCv": "Unduh CV",
    "hero.connectLinkedin": "Terhubung di LinkedIn",
    "hero.roles": "Backend Developer, Frontend Developer, Fullstack Web Developer, UI/UX Explorer",

    // Github Contribution
    "github.badge": "Open Source",
    "github.title": "Kontribusi",
    "github.titleHighlight": "GitHub",
    "github.subtitle": "Konsistensi dalam coding dan pembelajaran berkelanjutan melalui proyek open source dan mandiri.",
    "github.activeStatus": "Aktif mengembangkan dan berkontribusi setiap hari",
    "github.viewProfile": "Lihat Profil Lengkap",

    // Experience & Education
    "exp.title": "Perjalanan &",
    "exp.titleHighlight": "Pengalaman",
    "exp.subtitle": "Linimasa perkembangan karir profesional dan latar belakang akademis saya.",
    "exp.education": "Pendidikan",
    "exp.experience": "Pengalaman",
    "exp.present": "Sekarang",
    "exp.noEducation": "Belum ada data pendidikan.",
    "exp.noExperience": "Belum ada data pengalaman.",

    // Projects
    "projects.title": "Proyek",
    "projects.titleHighlight": "Pilihan",
    "projects.subtitle": "Koleksi karya dan aplikasi terbaru yang telah saya kembangkan di berbagai bidang teknologi.",
    "projects.viewAll": "Lihat Semua Halaman",
    "projects.viewMore": "Lihat Proyek Lainnya",
    "projects.allTitle": "Semua",
    "projects.allHighlight": "Proyek",
    "projects.allSubtitle": "Kumpulan portofolio lengkap dari karya, eksperimen, dan kontribusi profesional saya.",
    "projects.backHome": "Kembali ke Beranda",
    "projects.noData": "Belum ada proyek yang ditampilkan.",

    // Skills
    "skills.title": "Keahlian",
    "skills.titleHighlight": "Teknis",
    "skills.subtitle": "Teknologi dan *tools* yang saya kuasai untuk merealisasikan ide menjadi solusi digital nyata.",

    // Certificates
    "cert.title": "Sertifikat",
    "cert.titleHighlight": "& Penghargaan",
    "cert.subtitle": "Bukti pembelajaran berkelanjutan dan verifikasi keahlian profesional saya.",
    "cert.issuedIn": "Diterbitkan tahun",
    "cert.verify": "Verifikasi",
    "cert.viewMore": "Lihat Semua Sertifikat",
    "cert.allTitle": "Semua",
    "cert.allHighlight": "Sertifikat",
    "cert.allSubtitle": "Daftar lengkap sertifikasi profesional, lisensi, dan pelatihan yang telah saya selesaikan.",

    // Contact
    "contact.title": "Hubungi",
    "contact.titleHighlight": "Saya",
    "contact.subtitle": "Punya ide proyek atau ingin berkolaborasi? Mari diskusikan bersama.",
    "contact.infoTitle": "Informasi Kontak",
    "contact.infoDesc": "Kirimkan pesan melalui formulir di samping dan saya akan segera membalasnya.",
    "contact.email": "Email",
    "contact.phone": "Telepon / WhatsApp",
    "contact.location": "Lokasi",
    "contact.locationValue": "Indonesia",
    "contact.followMe": "Ikuti Saya",
    "contact.nameLabel": "Nama Lengkap",
    "contact.namePlaceholder": "Nama Anda",
    "contact.emailLabel": "Alamat Email",
    "contact.emailPlaceholder": "email@anda.com",
    "contact.subjectLabel": "Subjek",
    "contact.subjectPlaceholder": "Diskusi Proyek / Kerjasama",
    "contact.messageLabel": "Pesan",
    "contact.messagePlaceholder": "Ceritakan detail kebutuhan proyek atau pesan Anda...",
    "contact.sendBtn": "Kirim Pesan",
    "contact.sending": "Mengirim...",
    "contact.success": "Pesan Anda berhasil dikirim!",
    "contact.error": "Gagal mengirim pesan. Silakan coba lagi.",

    // Footer
    "footer.quickLinks": "Tautan Cepat",
    "footer.services": "Layanan",
    "footer.rights": "Hak Cipta Dilindungi.",
    "footer.privacy": "Kebijakan Privasi",
    "footer.terms": "Ketentuan Layanan",
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.certificates": "Certificates",
    "nav.contact": "Contact",
    "nav.hireMe": "Hire Me",

    // Hero
    "hero.greeting": "Hello, I'm",
    "hero.downloadCv": "Download CV",
    "hero.connectLinkedin": "Let's Connect LinkedIn",
    "hero.roles": "Backend Developer, Frontend Developer, Fullstack Web Developer, UI/UX Explorer",

    // Github Contribution
    "github.badge": "Open Source",
    "github.title": "GitHub",
    "github.titleHighlight": "Contributions",
    "github.subtitle": "Consistency in coding and continuous learning through open-source and personal projects.",
    "github.activeStatus": "Actively developing and contributing daily",
    "github.viewProfile": "View Full Profile",

    // Experience & Education
    "exp.title": "Journey &",
    "exp.titleHighlight": "Experience",
    "exp.subtitle": "A timeline of my professional growth and educational background.",
    "exp.education": "Education",
    "exp.experience": "Experience",
    "exp.present": "Present",
    "exp.noEducation": "No education data yet.",
    "exp.noExperience": "No experience data yet.",

    // Projects
    "projects.title": "Featured",
    "projects.titleHighlight": "Projects",
    "projects.subtitle": "A selection of my recent works across various modern technologies.",
    "projects.viewAll": "View All Page",
    "projects.viewMore": "View More Projects",
    "projects.allTitle": "All",
    "projects.allHighlight": "Projects",
    "projects.allSubtitle": "A comprehensive showcase of my work, experiments, and professional contributions.",
    "projects.backHome": "Back to Home",
    "projects.noData": "No projects found.",

    // Skills
    "skills.title": "Technical",
    "skills.titleHighlight": "Skills",
    "skills.subtitle": "Tools and technologies I use to bring ideas to life as scalable digital solutions.",

    // Certificates
    "cert.title": "Certificates",
    "cert.titleHighlight": "& Awards",
    "cert.subtitle": "Recognition of my professional continuous learning and skills verification.",
    "cert.issuedIn": "Issued in",
    "cert.verify": "Verify",
    "cert.viewMore": "View More Certificates",
    "cert.allTitle": "All",
    "cert.allHighlight": "Certificates",
    "cert.allSubtitle": "A complete showcase of my verified certificates, credentials, and honors.",

    // Contact
    "contact.title": "Get In",
    "contact.titleHighlight": "Touch",
    "contact.subtitle": "Have a project in mind? Let's talk and create something impactful.",
    "contact.infoTitle": "Contact Information",
    "contact.infoDesc": "Fill out the form and I will get back to you as soon as possible.",
    "contact.email": "Email",
    "contact.phone": "Phone / WhatsApp",
    "contact.location": "Location",
    "contact.locationValue": "Indonesia",
    "contact.followMe": "Follow Me",
    "contact.nameLabel": "Full Name",
    "contact.namePlaceholder": "John Doe",
    "contact.emailLabel": "Email Address",
    "contact.emailPlaceholder": "john@example.com",
    "contact.subjectLabel": "Subject",
    "contact.subjectPlaceholder": "Project Inquiry / Collaboration",
    "contact.messageLabel": "Message",
    "contact.messagePlaceholder": "Tell me about your project...",
    "contact.sendBtn": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Message sent successfully!",
    "contact.error": "Failed to send message. Please try again.",

    // Footer
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.rights": "All Rights Reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "id",
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang") as Language;
    if (saved === "id" || saved === "en") {
      setLangState(saved);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_lang", newLang);
    }
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

