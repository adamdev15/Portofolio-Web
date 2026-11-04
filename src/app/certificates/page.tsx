import { db } from "@/lib/db";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CertificatesGrid } from "@/components/sections/CertificatesGrid";
import { SubpageHeader } from "@/components/layout/SubpageHeader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AllCertificatesPage() {
  const heroData = await db.hero.findFirst();
  const certificates = await db.certificate.findMany({
    orderBy: { year: "desc" },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar name={heroData?.name} image={heroData?.image} />
      <main className="flex-grow pt-28 pb-20">
        <SubpageHeader type="certificates" />
        <CertificatesGrid certificates={certificates} />
      </main>
      <Footer name={heroData?.name} image={heroData?.image} />
    </div>
  );
}
