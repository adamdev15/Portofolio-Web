import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SubpageHeader } from "@/components/layout/SubpageHeader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AllProjectsPage() {
  const heroData = await db.hero.findFirst();
  const projects = await db.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={heroData?.name} image={heroData?.image} />
      <main className="flex-grow pt-28 pb-20">
        <SubpageHeader type="projects" />
        <ProjectsSection projects={projects} />
      </main>
      <Footer name={heroData?.name} image={heroData?.image} />
    </div>
  );
}
