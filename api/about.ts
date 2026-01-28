import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface AboutConfig {
  id: number;
  // Page Heading
  pageHeadingTitle: string;
  pageHeadingDescription: string;
  pageHeadingImageUrl: string | null; // Kept for backward compatibility
  pageHeadingImageAlt: string | null; // Kept for backward compatibility
  pageHeadingImageUrls: string[] | null; // New field for multiple image URLs
  pageHeadingImageAlts: string[] | null; // New field for multiple image alt texts
  // Story
  storyBadge: string;
  storyTitle: string;
  storyContent: string;
  storyImageUrl: string | null; // Kept for backward compatibility
  storyImageAlt: string | null; // Kept for backward compatibility
  storyImageUrls: string[] | null; // New field for multiple image URLs
  storyImageAlts: string[] | null; // New field for multiple image alt texts
  // Stats
  statSectorsValue: string;
  statSectorsLabel: string;
  statEmployeesValue: string;
  statEmployeesLabel: string;
  statYearsValue: string;
  statYearsLabel: string;
  // Vision
  visionTitle: string;
  visionStatements: string[];
  // Mission
  missionTitle: string;
  missionStatements: string[];
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateAboutConfigData {
  // Page Heading
  pageHeadingTitle?: string;
  pageHeadingDescription?: string;
  pageHeadingImages?: File[];
  pageHeadingImageUrls?: string[];
  pageHeadingImageAlts?: string[];
  // Story
  storyBadge?: string;
  storyTitle?: string;
  storyContent?: string;
  storyImages?: File[];
  storyImageUrls?: string[];
  storyImageAlts?: string[];
  // Stats
  statSectorsValue?: string;
  statSectorsLabel?: string;
  statEmployeesValue?: string;
  statEmployeesLabel?: string;
  statYearsValue?: string;
  statYearsLabel?: string;
  // Vision
  visionTitle?: string;
  visionStatements?: string[];
  // Mission
  missionTitle?: string;
  missionStatements?: string[];
}

export const aboutApi = {
  getAboutConfig: async (): Promise<AboutConfig> => {
    const response = await axiosPublicClient.get("/about/config");
    return response.data;
  },

  // Admin API functions
  getAboutConfigForAdmin: async (): Promise<AboutConfig> => {
    const response = await axiosProtectedClient.get("/about/admin/config");
    return response.data;
  },

  updateAboutConfig: async (
    data: UpdateAboutConfigData
  ): Promise<AboutConfig> => {
    const formData = new FormData();

    // Page Heading fields
    if (data.pageHeadingTitle !== undefined) {
      formData.append("pageHeadingTitle", data.pageHeadingTitle);
    }
    if (data.pageHeadingDescription !== undefined) {
      formData.append("pageHeadingDescription", data.pageHeadingDescription);
    }
    if (data.pageHeadingImages && data.pageHeadingImages.length > 0) {
      data.pageHeadingImages.forEach((file) => {
        formData.append("pageHeadingImages", file);
      });
    }
    if (data.pageHeadingImageUrls && data.pageHeadingImageUrls.length > 0) {
      data.pageHeadingImageUrls.forEach((url, index) => {
        formData.append(`pageHeadingImageUrls[${index}]`, url);
      });
    }
    if (data.pageHeadingImageAlts && data.pageHeadingImageAlts.length > 0) {
      data.pageHeadingImageAlts.forEach((alt, index) => {
        formData.append(`pageHeadingImageAlts[${index}]`, alt);
      });
    }

    // Story fields
    if (data.storyBadge !== undefined) {
      formData.append("storyBadge", data.storyBadge);
    }
    if (data.storyTitle !== undefined) {
      formData.append("storyTitle", data.storyTitle);
    }
    if (data.storyContent !== undefined) {
      formData.append("storyContent", data.storyContent);
    }
    if (data.storyImages && data.storyImages.length > 0) {
      data.storyImages.forEach((file) => {
        formData.append("storyImages", file);
      });
    }
    if (data.storyImageUrls && data.storyImageUrls.length > 0) {
      data.storyImageUrls.forEach((url, index) => {
        formData.append(`storyImageUrls[${index}]`, url);
      });
    }
    if (data.storyImageAlts && data.storyImageAlts.length > 0) {
      data.storyImageAlts.forEach((alt, index) => {
        formData.append(`storyImageAlts[${index}]`, alt);
      });
    }

    // Stats fields
    if (data.statSectorsValue !== undefined) {
      formData.append("statSectorsValue", data.statSectorsValue);
    }
    if (data.statSectorsLabel !== undefined) {
      formData.append("statSectorsLabel", data.statSectorsLabel);
    }
    if (data.statEmployeesValue !== undefined) {
      formData.append("statEmployeesValue", data.statEmployeesValue);
    }
    if (data.statEmployeesLabel !== undefined) {
      formData.append("statEmployeesLabel", data.statEmployeesLabel);
    }
    if (data.statYearsValue !== undefined) {
      formData.append("statYearsValue", data.statYearsValue);
    }
    if (data.statYearsLabel !== undefined) {
      formData.append("statYearsLabel", data.statYearsLabel);
    }

    // Vision fields
    if (data.visionTitle !== undefined) {
      formData.append("visionTitle", data.visionTitle);
    }
    if (data.visionStatements && data.visionStatements.length > 0) {
      data.visionStatements.forEach((statement, index) => {
        formData.append(`visionStatements[${index}]`, statement);
      });
    }

    // Mission fields
    if (data.missionTitle !== undefined) {
      formData.append("missionTitle", data.missionTitle);
    }
    if (data.missionStatements && data.missionStatements.length > 0) {
      data.missionStatements.forEach((statement, index) => {
        formData.append(`missionStatements[${index}]`, statement);
      });
    }

    const response = await axiosProtectedClient.patch(
      "/about/admin/config",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};

