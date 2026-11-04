import { db } from "@/lib/db";
import ProjectClient from "./ProjectClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">Projects Management</h1>
        <p className="text-muted-foreground">Manage your projects and showcase your work to the world.</p>
      </div>
      <ProjectClient initialData={projects} />
    </div>
  );
}
