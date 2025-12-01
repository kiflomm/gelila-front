"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import jobsData from "@/data/jobs.json";

const ITEMS_PER_PAGE = 6;

export default function JobListingsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredJobs = useMemo(() => {
    return jobsData.jobs.filter((job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());
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
  }, [searchQuery, selectedLocation, selectedDepartment, selectedJobType]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLocation, selectedDepartment, selectedJobType]);

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
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of job listings section
    document
      .getElementById("job-listings")
      ?.scrollIntoView({ behavior: "smooth" });
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
          <div className="border rounded-xl p-4 sm:p-5 md:p-6 bg-white dark:bg-[#212529]/30 border-[#F8F9FA] dark:border-white/10 flex flex-col md:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="w-full md:grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#6C757D] dark:text-[#F8F9FA]/60" />
                <Input
                  type="text"
                  placeholder="Search by keyword, role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark text-[#212529] dark:text-white placeholder:text-[#6C757D] h-12 pl-10 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex h-12 w-full sm:w-auto shrink-0 items-center justify-between gap-x-2 rounded-lg bg-[#F8F9FA] dark:bg-background-dark border border-[#F8F9FA] dark:border-white/10 px-4 hover:bg-[#F8F9FA]/80 dark:hover:bg-background-dark/80"
                  >
                    <span className="text-[#6C757D] dark:text-[#F8F9FA]/80 text-sm font-medium leading-normal">
                      {selectedLocation}
                    </span>
                    <ChevronDown className="size-4 text-[#6C757D] dark:text-[#F8F9FA]/80" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {jobsData.locations.map((location) => (
                    <DropdownMenuItem
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={
                        selectedLocation === location ? "bg-primary/10" : ""
                      }
                    >
                      {location}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex h-12 w-full sm:w-auto shrink-0 items-center justify-between gap-x-2 rounded-lg bg-[#F8F9FA] dark:bg-background-dark border border-[#F8F9FA] dark:border-white/10 px-4 hover:bg-[#F8F9FA]/80 dark:hover:bg-background-dark/80"
                  >
                    <span className="text-[#6C757D] dark:text-[#F8F9FA]/80 text-sm font-medium leading-normal">
                      {selectedDepartment}
                    </span>
                    <ChevronDown className="size-4 text-[#6C757D] dark:text-[#F8F9FA]/80" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {jobsData.departments.map((department) => (
                    <DropdownMenuItem
                      key={department}
                      onClick={() => setSelectedDepartment(department)}
                      className={
                        selectedDepartment === department ? "bg-primary/10" : ""
                      }
                    >
                      {department}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex h-12 w-full sm:w-auto shrink-0 items-center justify-between gap-x-2 rounded-lg bg-[#F8F9FA] dark:bg-background-dark border border-[#F8F9FA] dark:border-white/10 px-4 hover:bg-[#F8F9FA]/80 dark:hover:bg-background-dark/80"
                  >
                    <span className="text-[#6C757D] dark:text-[#F8F9FA]/80 text-sm font-medium leading-normal">
                      {selectedJobType}
                    </span>
                    <ChevronDown className="size-4 text-[#6C757D] dark:text-[#F8F9FA]/80" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {jobsData.jobTypes.map((jobType) => (
                    <DropdownMenuItem
                      key={jobType}
                      onClick={() => setSelectedJobType(jobType)}
                      className={
                        selectedJobType === jobType ? "bg-primary/10" : ""
                      }
                    >
                      {jobType}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Reset Button */}
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="h-12 w-full md:w-auto px-4 text-sm font-bold text-[#6C757D] dark:text-[#F8F9FA]/80 hover:text-primary transition-colors"
            >
              Reset
            </Button>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {paginatedJobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-xl p-6 bg-white dark:bg-[#212529]/30 border-[#F8F9FA] dark:border-white/10 flex flex-col gap-4 hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/50 transition-all"
              >
                <h3 className="text-xl font-bold text-[#212529] dark:text-[#F8F9FA]">
                  {job.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium bg-primary/20 text-primary py-1 px-2 rounded-full">
                    {job.department}
                  </span>
                  <span className="text-xs font-medium bg-[#F8F9FA] dark:bg-background-dark text-[#6C757D] py-1 px-2 rounded-full">
                    {job.location}
                  </span>
                  <span className="text-xs font-medium bg-[#F8F9FA] dark:bg-background-dark text-[#6C757D] py-1 px-2 rounded-full">
                    {job.type}
                  </span>
                </div>
                <p className="text-[#6C757D] dark:text-[#F8F9FA]/70 text-sm leading-relaxed grow">
                  {job.description}
                </p>
                <Button
                  asChild
                  className="mt-4 flex! w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary! text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90! transition-opacity hover:bg-primary!"
                >
                  <Link href={`/careers/apply/${job.id}`}>
                    <span className="truncate">Apply Now</span>
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#6C757D] dark:text-[#F8F9FA]/70 text-lg">
                No jobs found matching your criteria.
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredJobs.length > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-10 w-10 rounded-full border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark hover:bg-[#F8F9FA]/80 dark:hover:bg-background-dark/80 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="size-5 text-[#6C757D] dark:text-[#F8F9FA]/80" />
              </Button>

              <div className="flex items-center gap-1">
                {(() => {
                  const pages: (number | "ellipsis")[] = [];

                  if (totalPages <= 7) {
                    // Show all pages if 7 or fewer
                    for (let i = 1; i <= totalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    // Always show first page
                    pages.push(1);

                    if (currentPage <= 3) {
                      // Show pages 2, 3, 4 if current page is near start
                      for (let i = 2; i <= 4; i++) {
                        pages.push(i);
                      }
                      pages.push("ellipsis");
                      pages.push(totalPages);
                    } else if (currentPage >= totalPages - 2) {
                      // Show pages near the end if current page is near end
                      pages.push("ellipsis");
                      for (let i = totalPages - 3; i <= totalPages; i++) {
                        pages.push(i);
                      }
                    } else {
                      // Show pages around current page
                      pages.push("ellipsis");
                      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                        pages.push(i);
                      }
                      pages.push("ellipsis");
                      pages.push(totalPages);
                    }
                  }

                  return pages.map((page, index) => {
                    if (page === "ellipsis") {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 text-[#6C757D] dark:text-[#F8F9FA]/70"
                        >
                          ...
                        </span>
                      );
                    }

                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "ghost"}
                        onClick={() => handlePageChange(page)}
                        className={`h-10 w-10 rounded-full ${
                          currentPage === page
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "text-[#6C757D] dark:text-[#F8F9FA]/80 hover:bg-[#F8F9FA] dark:hover:bg-background-dark/80"
                        }`}
                        aria-label={`Go to page ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </Button>
                    );
                  });
                })()}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-10 w-10 rounded-full border-[#F8F9FA] dark:border-white/10 bg-[#F8F9FA] dark:bg-background-dark hover:bg-[#F8F9FA]/80 dark:hover:bg-background-dark/80 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="size-5 text-[#6C757D] dark:text-[#F8F9FA]/80" />
              </Button>
            </div>
          )}

          {/* Results count */}
          {filteredJobs.length > 0 && (
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
      </div>
    </section>
  );
}
