import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApplicationFormSection from "../../(sections)/application-form-section";
import { jobsApi } from "@/api/jobs";
import { siteConfig, getJobPostingSchema, getAbsoluteUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const jobId = parseInt(resolvedParams.id);

  // Check if jobId is valid
  if (isNaN(jobId)) {
    return {
      title: "Job Not Found - Gelila Manufacturing PLC",
    };
  }

  try {
    const job = await jobsApi.getJobById(jobId);
    

    const title = `Apply for ${job.title} - Gelila Manufacturing PLC`;
    // Strip HTML tags for metadata description
    const descriptionText = job.description.replace(/<[^>]*>/g, "").substring(0, 160);
    const description = `Apply for the ${job.title} position at Gelila Manufacturing PLC. ${descriptionText}`;

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
        canonical: getAbsoluteUrl(`/careers/apply/${job.id}`),
      },
    };
  } catch (error: any) {
    // If job doesn't exist or API error, return basic metadata
    return {
      title: "Job Not Found - Gelila Manufacturing PLC",
    };
  }
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const jobId = parseInt(resolvedParams.id);

  // Validate jobId is a valid number
  if (isNaN(jobId) || jobId <= 0) {
    notFound();
  }

  // Fetch job from database and verify it exists
  let job;
  try {
    job = await jobsApi.getJobById(jobId);
    
    // Explicitly verify the job exists and is valid
    if (!job) {
      notFound();
    }
    
    // Verify required fields exist
    if (!job.id || !job.title || !job.department || !job.location || !job.type) {
      notFound();
    }
    
    // Verify the job ID matches what was requested
    if (job.id !== jobId) {
      notFound();
    }
    
    // Verify job is active (backend should handle this, but double-check)
    if (job.isActive === false) {
      notFound();
    }
  } catch (error: any) {
    // Log error for debugging
    console.error("Error fetching job from database:", error);
    
    // Check error status - axios throws errors for 4xx/5xx responses
    const statusCode = error?.response?.status || error?.status;
    const errorMessage = String(error?.response?.data?.message || error?.message || "").toLowerCase();
    
    // Explicitly check for 404 or "not found" errors
    if (
      statusCode === 404 ||
      statusCode === 400 ||
      errorMessage.includes("not found") ||
      errorMessage.includes("does not exist") ||
      errorMessage.includes("not exist")
    ) {
      notFound();
    }
    
    // For any other API error, show 404 to avoid exposing internal errors
    notFound();
  }
  
  // Final safety check - ensure job is defined before using it
  if (!job) {
    notFound();
  }

  // Strip HTML for structured data
  const descriptionText = job.description.replace(/<[^>]*>/g, "").substring(0, 300);
  const jobPostingSchema = getJobPostingSchema({
    title: job.title,
    description: descriptionText,
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
