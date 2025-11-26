import { notFound } from "next/navigation";
import ApplicationFormSection from "../../(sections)/application-form-section";
import jobsData from "@/data/jobs.json";

export async function generateStaticParams() {
  return jobsData.jobs.map((job) => ({
    id: job.id.toString(),
  }));
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

  return <ApplicationFormSection jobTitle={job.title} jobId={job.id} />;
}

