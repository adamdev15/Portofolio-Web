import { Project, Experience, Education, Hero } from "@prisma/client";

// Translation mapping for Hero Data
export const heroTranslations: Record<
  "id" | "en",
  { role: string; description: string }
> = {
  id: {
    role: "Web Development dan Computer Systems",
    description:
      "Lulusan Sarjana Sistem Informasi dari Universitas Harkat Negeri dengan pengalaman profesional selama 2 tahun di bidang Web Development dan Computer System. Memiliki keahlian dalam pengembangan aplikasi berbasis web menggunakan PHP, JavaScript, MySQL, PostgreSQL, Laravel, Next.js, dan React. Berpengalaman dalam merancang, mengembangkan, serta mengelola berbagai proyek aplikasi web sesuai kebutuhan pengguna dan organisasi. Memiliki kemampuan komunikasi yang baik, disiplin, teliti, mampu bekerja secara mandiri maupun dalam tim, serta memiliki semangat untuk terus mengembangkan kompetensi dan berkontribusi dalam bidang teknologi informasi.",
  },
  en: {
    role: "Web Development & Computer Systems Specialist",
    description:
      "Bachelor of Information Systems graduate from Harkat State University with 2 years of professional experience in Web Development and Computer Systems. Skilled in building full-stack web applications using PHP, JavaScript, MySQL, PostgreSQL, Laravel, Next.js, and React. Experienced in designing, architecting, and deploying tailored web platforms according to user and corporate requirements. Possesses strong communication skills, discipline, precision, collaborative teamwork, and a continuous drive to innovate in technology.",
  },
};

// Translation mappings for Experiences
export const experienceTranslations: Record<
  string,
  {
    en: { position: string; description: string };
    id?: { position: string; description: string };
  }
> = {
  "PT Aulia Art Media": {
    en: {
      position: "Web Developer",
      description:
        "Actively participated in building web applications and custom systems tailored to client and enterprise requirements. Developed responsive front-end and robust back-end features, managed relational databases, integrated third-party APIs, and performed system optimizations to ensure peak performance and stability.",
    },
  },
  "DPC PKB Kab. Tegal": {
    en: {
      position: "Data Entry & Database Assistant",
      description:
        "Responsible for organizing, processing, and maintaining organizational databases using MySQL Front to ensure seamless data operations, accuracy, and administrative efficiency.",
    },
  },
  "X-Treme Computer Slawi": {
    en: {
      position: "Computer Systems & Hardware Technician (Internship)",
      description:
        "Performed operating system installations and essential software setups to ensure optimal device performance. Assembled and diagnosed computer hardware (RAM, storage, displays, motherboards) under senior guidance and collaborated effectively with the technical support team.",
    },
  },
  "PT Tunas Media Data": {
    en: {
      position: "IT & Billing Systems Administrator",
      description:
        "Administered the Billing Connect Information System, overseeing customer accounts, recurring invoices, transaction logs, and service monitoring. Handled cashier transactions, recorded revenue and expenditure ledger, and delivered ongoing technical IT support to maintain business continuity.",
    },
  },
  "Universitas Harkat Negeri": {
    en: {
      position: "Web Developer Intern",
      description:
        "Engineered a web-based MBKM Internship portal using Laravel and MySQL to streamline internship applications, daily activity logs, faculty evaluations, and credit conversions. Conducted systematic testing and debugging to guarantee data integrity and platform reliability.",
    },
  },
  "Coding Camp DBS Foundation": {
    en: {
      position: "Frontend & Backend Developer Apprentice",
      description:
        "Graduated from an intensive 6-month full-stack development apprenticeship with Dicoding and DBS Bank. Mastered modern frontend and backend architectures, progressive web apps, REST APIs, and enhanced professional communication, problem solving, and financial literacy.",
    },
  },
};

// Translation mappings for Education
export const educationTranslations: Record<
  string,
  {
    en: { degree: string; field: string; description?: string };
    id?: { degree: string; field: string; description?: string };
  }
> = {
  "Universitas Harkat Negeri": {
    en: {
      degree: "Bachelor of Science (S.Kom / S1)",
      field: "Information Systems",
      description:
        "Graduated with honors. Active in practical web software engineering projects, database modeling, scientific research, and academic organizations.",
    },
  },
  "SMK Bhakti Praja Adiwerna": {
    en: {
      degree: "Vocational High School Diploma (SMK)",
      field: "Computer Network Engineering (TKJ)",
      description:
        "Focused on LAN/WAN network infrastructure, server administration, hardware diagnostics, routing, switching, and client-server system configuration.",
    },
  },
};

// Translation mappings for Projects
export const projectTranslations: Record<
  string,
  {
    en: { title: string; description: string };
    id?: { title: string; description: string };
  }
> = {
  "Sistem SPMB SMK Bhakti Praja Adiwerna": {
    en: {
      title: "New Student Admission System (SPMB)",
      description:
        "A full-fledged web-based student admission platform engineered with Laravel for SMK Bhakti Praja Adiwerna. Features applicant registration, digital form filling, automated document verification, WhatsApp gateway notifications, and online payment gateway integration to modernize the entire enrollment workflow.",
    },
  },
  "Sistem ABK Management": {
    en: {
      title: "Maritime Crew Management System (ABK)",
      description:
        "An enterprise-grade web application developed for PT RNT Utama Indonesia with role-based access control (Superadmin, HR, Finance, Operations, Document Controller). Manages crew data, deployment contracts, payroll processing, and operational reporting to streamline maritime operations.",
    },
  },
  "Website Profile Sekolah SMK Bhakti Praja Adiwerna": {
    en: {
      title: "Official School Profile & Academic Portal",
      description:
        "A comprehensive school portal developed with Laravel to support school digitization. Includes institution vision & mission, faculty and staff directory, student records, facility showcases, school news, event galleries, and integrated public academic announcements.",
    },
  },
  "Sistem MBKM STMIK YMI Tegal": {
    en: {
      title: "MBKM Academic Internship System",
      description:
        "A digitized platform developed to streamline the Merdeka Belajar Kampus Merdeka academic program. Facilitates internship applications, activity logbooks, mentor appraisals, and credit conversion for students, lecturers, partner companies, and administrators.",
    },
  },
  "Website KesehatanKu": {
    en: {
      title: "KesehatanKu AI Health Platform",
      description:
        "An innovative AI-assisted healthcare web platform providing verified medical information, AI image-based disease consultation models, and symptom-checker predictive diagnostics to promote preventive digital healthcare.",
    },
  },
  "Website Story MAP": {
    en: {
      title: "Story Mapping & PWA Web App",
      description:
        "A responsive story-sharing web application built with Webpack bundling, Babel JavaScript transpilation, and Progressive Web App (PWA) offline capabilities for seamless media upload and storytelling.",
    },
  },
};

// Helper: Translate a Hero object
export function getTranslatedHero(hero: Hero | null | undefined, lang: "id" | "en") {
  if (!hero) return null;
  if (lang === "id") return hero;

  return {
    ...hero,
    role: heroTranslations.en.role || hero.role,
    description: heroTranslations.en.description || hero.description,
  };
}

// Helper: Translate Project list
export function getTranslatedProjects(projects: Project[], lang: "id" | "en") {
  if (lang === "id") return projects;

  return projects.map((p) => {
    // Check exact match by title or slug
    const matched =
      projectTranslations[p.title] ||
      projectTranslations[p.slug] ||
      Object.entries(projectTranslations).find(
        ([key]) => p.title.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(p.title.toLowerCase())
      )?.[1];

    if (matched?.en) {
      return {
        ...p,
        title: matched.en.title,
        description: matched.en.description,
      };
    }
    return p;
  });
}

// Helper: Translate Experience list
export function getTranslatedExperiences(experiences: Experience[], lang: "id" | "en") {
  if (lang === "id") return experiences;

  return experiences.map((exp) => {
    const matched =
      experienceTranslations[exp.company] ||
      Object.entries(experienceTranslations).find(
        ([key]) => exp.company.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(exp.company.toLowerCase())
      )?.[1];

    if (matched?.en) {
      return {
        ...exp,
        position: matched.en.position,
        description: matched.en.description,
        endDate: exp.endDate === "Present" || !exp.endDate ? "Present" : exp.endDate,
      };
    }
    return exp;
  });
}

// Helper: Translate Education list
export function getTranslatedEducation(education: Education[], lang: "id" | "en") {
  if (lang === "id") return education;

  return education.map((edu) => {
    const matched =
      educationTranslations[edu.school] ||
      Object.entries(educationTranslations).find(
        ([key]) => edu.school.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(edu.school.toLowerCase())
      )?.[1];

    if (matched?.en) {
      return {
        ...edu,
        degree: matched.en.degree,
        field: matched.en.field,
        description: matched.en.description || edu.description,
        endDate: edu.endDate === "Present" || !edu.endDate ? "Present" : edu.endDate,
      };
    }
    return edu;
  });
}

