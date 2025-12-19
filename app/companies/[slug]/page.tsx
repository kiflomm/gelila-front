import { notFound } from "next/navigation";
import Header from "@/components/header";
import companiesData from "@/data/companies/companies.json";
import PageHeadingSection from "./(sections)/page-heading-section";
import ProfileSection from "./(sections)/profile-section";

interface CompanyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return companiesData.companies.map((company) => ({
    slug: company.slug,
  }));
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  const company = companiesData.companies.find((c) => c.slug === slug);

  if (!company) {
    notFound();
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex flex-1 flex-col">
          <div className="relative">
            <Header />
            <PageHeadingSection company={company} />
          </div>
          <ProfileSection company={company} />
        </main>
      </div>
    </div>
  );
}
