import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApplicationFormSection from "../../(sections)/application-form-section";
import jobsData from "@/data/jobs.json";
import { siteConfig, getJobPostingSchema, getAbsoluteUrl } from "@/lib/seo";

export async function generateStaticParams() {
  return jobsData.jobs.map((job) => ({
    id: job.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const jobId = parseInt(resolvedParams.id);
  const job = jobsData.jobs.find((j) => j.id === jobId);

  if (!job) {
    return {
      title: "Job Not Found - Gelila Manufacturing PLC",
    };
  }

  const title = `Apply for ${job.title} - Gelila Manufacturing PLC`;
  const description = `Apply for the ${job.title} position at Gelila Manufacturing PLC. ${job.description}`;

  return {
    title,
    description,
    keywords: [
      job.title.toLowerCase(),
      job.department.toLowerCase(),
      job.location.toLowerCase(),
      job.type.toLowerCase(),
      "careers",
      "jobs",
      "employment",
      "gelila manufacturing",
      "ethiopia jobs",
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      url: getAbsoluteUrl(`/careers/apply/${job.id}`),
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `/careers/apply/${job.id}`,
    },
  };
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const jobId = parseInt(resolvedParams.id);
  const job = jobsData.jobs.find((j) => j.id === jobId);

  if (!job) {
    notFound();
  }

  const jobPostingSchema = getJobPostingSchema({
    title: job.title,
    description: job.description,
    employmentType: job.type,
    location: job.location,
    datePosted: new Date().toISOString(),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <ApplicationFormSection jobTitle={job.title} jobId={job.id} />
    </>
  );
}
