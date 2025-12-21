import { axiosPublicClient, axiosProtectedClient } from "@/lib/axios-client";

export interface AboutConfig {
  id: number;
  // Page Heading
  pageHeadingTitle: string;
  pageHeadingDescription: string;
  pageHeadingImageUrl: string | null;
  pageHeadingImageAlt: string | null;
  // Story
  storyBadge: string;
  storyTitle: string;
  storyContent: string;
  storyImageUrl: string | null;
  storyImageAlt: string | null;
  // Stats
  statSectorsValue: string;
  statSectorsLabel: string;
  statEmployeesValue: string;
  statEmployeesLabel: string;
  statYearsValue: string;
  statYearsLabel: string;
  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateAboutConfigData {
  // Page Heading
  pageHeadingTitle?: string;
  pageHeadingDescription?: string;
  pageHeadingImage?: File;
  // Story
  storyBadge?: string;
  storyTitle?: string;
  storyContent?: string;
  storyImage?: File;
  // Stats
  statSectorsValue?: string;
  statSectorsLabel?: string;
  statEmployeesValue?: string;
  statEmployeesLabel?: string;
  statYearsValue?: string;
  statYearsLabel?: string;
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
    if (data.pageHeadingImage) {
      formData.append("pageHeadingImage", data.pageHeadingImage);
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
    if (data.storyImage) {
      formData.append("storyImage", data.storyImage);
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

