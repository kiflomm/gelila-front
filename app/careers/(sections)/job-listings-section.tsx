"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useJobs } from "@/hooks/use-jobs";
import { JobDetailDialog } from "../(components)/job-detail-dialog";
import { JobFilters } from "../(components)/job-listings/job-filters";
import { JobListingsGrid } from "../(components)/job-listings/job-listings-grid";
import { JobPagination } from "../(components)/job-listings/job-pagination";
import type { Job } from "@/api/jobs";

const ITEMS_PER_PAGE = 6;

export default function JobListingsSection() {
  const { data: jobsData, isLoading } = useJobs();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isUpdatingRef = useRef(false);

  // Initialize state from URL params
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("location") || "All"
  );
  const [selectedDepartment, setSelectedDepartment] = useState(
    searchParams.get("department") || "All"
  );
  const [selectedJobType, setSelectedJobType] = useState(
    searchParams.get("type") || "All"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  // Update URL when filters change
  const updateURL = (updates: {
    search?: string;
    location?: string;
    department?: string;
    type?: string;
    page?: number;
  }) => {
    isUpdatingRef.current = true;
    const params = new URLSearchParams(searchParams.toString());

    if (updates.search !== undefined) {
      if (updates.search) {
        params.set("search", updates.search);
      } else {
        params.delete("search");
      }
    }

    if (updates.location !== undefined) {
      if (updates.location && updates.location !== "All") {
        params.set("location", updates.location);
      } else {
        params.delete("location");
      }
    }

    if (updates.department !== undefined) {
      if (updates.department && updates.department !== "All") {
        params.set("department", updates.department);
      } else {
        params.delete("department");
      }
    }

    if (updates.type !== undefined) {
      if (updates.type && updates.type !== "All") {
        params.set("type", updates.type);
      } else {
        params.delete("type");
      }
    }

    if (updates.page !== undefined) {
      if (updates.page > 1) {
        params.set("page", updates.page.toString());
      } else {
        params.delete("page");
      }
    }

    const newUrl = params.toString()
      ? `/careers?${params.toString()}`
      : "/careers";
    router.push(newUrl, { scroll: false });

    // Reset flag after a short delay to allow URL update to complete
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 0);
  };

  // Sync state with URL params when URL changes externally (e.g., browser back/forward)
  useEffect(() => {
    if (isUpdatingRef.current) return;

    const urlSearch = searchParams.get("search") || "";
    const urlLocation = searchParams.get("location") || "All";
    const urlDepartment = searchParams.get("department") || "All";
    const urlType = searchParams.get("type") || "All";
    const urlPage = parseInt(searchParams.get("page") || "1", 10);

    setSearchQuery((prev) => (urlSearch !== prev ? urlSearch : prev));
    setSelectedLocation((prev) => (urlLocation !== prev ? urlLocation : prev));
    setSelectedDepartment((prev) =>
      urlDepartment !== prev ? urlDepartment : prev
    );
    setSelectedJobType((prev) => (urlType !== prev ? urlType : prev));
    setCurrentPage((prev) => (urlPage !== prev ? urlPage : prev));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Create wrapper functions that reset page when filters change and update URL
  const updateSearchQuery = (value: string) => {
    if (value !== searchQuery) {
      setCurrentPage(1);
      setSearchQuery(value);
      updateURL({ search: value, page: 1 });
    }
  };

  const updateLocation = (value: string) => {
    if (value !== selectedLocation) {
      setCurrentPage(1);
      setSelectedLocation(value);
      updateURL({ location: value, page: 1 });
    }
  };

  const updateDepartment = (value: string) => {
    if (value !== selectedDepartment) {
      setCurrentPage(1);
      setSelectedDepartment(value);
      updateURL({ department: value, page: 1 });
    }
  };

  const updateJobType = (value: string) => {
    if (value !== selectedJobType) {
      setCurrentPage(1);
      setSelectedJobType(value);
      updateURL({ type: value, page: 1 });
    }
  };

  const filteredJobs = useMemo(() => {
    if (!jobsData?.jobs) return [];
    return jobsData.jobs.filter((job) => {
      // Strip HTML for search comparison
      const descriptionText = job.description.replace(/<[^>]*>/g, "").toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        descriptionText.includes(searchQuery.toLowerCase());
      const matchesLocation =
        selectedLocation === "All" || job.location === selectedLocation;
      const matchesDepartment =
        selectedDepartment === "All" || job.department === selectedDepartment;
      const matchesJobType =
        selectedJobType === "All" || job.type === selectedJobType;

      return (
        matchesSearch && matchesLocation && matchesDepartment && matchesJobType
      );
    });
  }, [
    jobsData,
    searchQuery,
    selectedLocation,
    selectedDepartment,
    selectedJobType,
  ]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLocation("All");
    setSelectedDepartment("All");
    setSelectedJobType("All");
    setCurrentPage(1);
    updateURL({
      search: "",
      location: "All",
      department: "All",
      type: "All",
      page: 1,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL({ page });
    // Scroll to top of job listings section
    document
      .getElementById("job-listings")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewDetail = (job: Job) => {
    setSelectedJob(job);
    setDetailDialogOpen(true);
  };

  return (
    <section id="job-listings" className="py-16 md:py-24">
      <div className="px-4 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-8 px-2 sm:px-4 md:px-6">
          {/* Section Header */}
          <h2 className="text-[#212529] dark:text-[#F8F9FA] text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] text-center">
            Explore Open Positions
          </h2>

          {/* Filters */}
          <JobFilters
            searchQuery={searchQuery}
            selectedLocation={selectedLocation}
            selectedDepartment={selectedDepartment}
            selectedJobType={selectedJobType}
            jobsData={jobsData}
            onSearchChange={updateSearchQuery}
            onLocationChange={updateLocation}
            onDepartmentChange={updateDepartment}
            onJobTypeChange={updateJobType}
            onReset={resetFilters}
          />

          {/* Job Listings Grid */}
          <JobListingsGrid
            jobs={paginatedJobs}
            isLoading={isLoading}
            onViewDetail={handleViewDetail}
          />

          {/* Pagination */}
          {filteredJobs.length > ITEMS_PER_PAGE && (
            <JobPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          {/* Results count */}
          {filteredJobs.length > 0 && !isLoading && (
            <div className="text-center mt-4">
              <p className="text-sm text-[#6C757D] dark:text-[#F8F9FA]/70">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredJobs.length)} of{" "}
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "job" : "jobs"}
              </p>
            </div>
          )}
        </div>

        {/* Job Detail Dialog */}
        <JobDetailDialog
          job={selectedJob}
          open={detailDialogOpen}
          onOpenChange={(open) => {
            setDetailDialogOpen(open);
            if (!open) {
              setSelectedJob(null);
            }
          }}
        />
      </div>
    </section>
  );
}
