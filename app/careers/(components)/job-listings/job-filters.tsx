"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/use-debounce";
import type { JobsData } from "@/api/jobs";

interface JobFiltersProps {
  searchQuery: string;
  selectedLocation: string;
  selectedDepartment: string;
  selectedJobType: string;
  jobsData: JobsData | undefined;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onJobTypeChange: (value: string) => void;
  onReset: () => void;
}

export function JobFilters({
  searchQuery,
  selectedLocation,
  selectedDepartment,
  selectedJobType,
  jobsData,
  onSearchChange,
  onLocationChange,
  onDepartmentChange,
  onJobTypeChange,
  onReset,
}: JobFiltersProps) {
  // Local state for immediate UI feedback
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  
  // Debounce the search query
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // Sync local state with prop when it changes externally (e.g., from URL)
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  // Call onSearchChange when debounced value changes (only if different from current)
  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      onSearchChange(debouncedSearchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  return (
    <div className="border rounded-xl p-4 sm:p-5 md:p-6 bg-white dark:bg-[#212529]/30 border-[#F8F9FA] dark:border-white/10 flex flex-col md:flex-row gap-4 items-center">
      {/* Search Input */}
      <div className="w-full md:grow">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-[#6C757D] dark:text-[#F8F9FA]/60" />
          <Input
            type="text"
            placeholder="Search by keyword, role..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
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
                {selectedLocation === "All" ? "All Locations" : `Location: ${selectedLocation}`}
              </span>
              <ChevronDown className="size-4 text-[#6C757D] dark:text-[#F8F9FA]/80" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {jobsData?.locations.map((location) => (
              <DropdownMenuItem
                key={location}
                onClick={() => onLocationChange(location)}
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
                {selectedDepartment === "All" ? "All Departments" : `Department: ${selectedDepartment}`}
              </span>
              <ChevronDown className="size-4 text-[#6C757D] dark:text-[#F8F9FA]/80" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {jobsData?.departments.map((department) => (
              <DropdownMenuItem
                key={department}
                onClick={() => onDepartmentChange(department)}
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
                {selectedJobType === "All" ? "All Job Types" : `Job Type: ${selectedJobType}`}
              </span>
              <ChevronDown className="size-4 text-[#6C757D] dark:text-[#F8F9FA]/80" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {jobsData?.jobTypes.map((jobType) => (
              <DropdownMenuItem
                key={jobType}
                onClick={() => onJobTypeChange(jobType)}
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
        onClick={onReset}
        className="h-12 w-full md:w-auto px-4 text-sm font-bold text-[#6C757D] dark:text-[#F8F9FA]/80 hover:text-primary transition-colors"
      >
        Reset
      </Button>
    </div>
  );
}

