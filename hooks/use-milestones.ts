import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { milestonesApi, type MilestoneItem, type CreateMilestoneData, type UpdateMilestoneData } from "@/api/milestones";

export function useMilestones() {
  return useQuery({
    queryKey: ["milestones"],
    queryFn: () => milestonesApi.getMilestones(),
  });
}

// Admin hooks
export function useMilestonesForAdmin() {
  return useQuery({
    queryKey: ["milestones", "admin", "all"],
    queryFn: () => milestonesApi.getAllMilestones(),
  });
}

export function useCreateMilestone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMilestoneData) => milestonesApi.createMilestone(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
    },
  });
}

export function useUpdateMilestone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMilestoneData }) =>
      milestonesApi.updateMilestone(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
    },
  });
}

export function useDeleteMilestone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => milestonesApi.deleteMilestone(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["milestones"] });
    },
  });
}

