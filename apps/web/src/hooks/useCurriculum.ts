import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { CurriculumPhase, CurriculumDay, CurriculumTopic, CurriculumLesson } from "@/types/curriculum";

export function usePhases() {
  return useQuery({
    queryKey: ["phases"],
    queryFn: async () => {
      const response = await api.get<CurriculumPhase[]>("/api/v1/curriculum/phases");
      return response.data;
    },
  });
}

export function usePhase(phaseId: number) {
  return useQuery({
    queryKey: ["phase", phaseId],
    queryFn: async () => {
      const response = await api.get<CurriculumPhase>(`/api/v1/curriculum/phases/${phaseId}`);
      return response.data;
    },
    enabled: !!phaseId,
  });
}

export function useDays(phaseId?: number) {
  return useQuery({
    queryKey: ["days", phaseId],
    queryFn: async () => {
      const params = phaseId ? { phase_id: phaseId } : {};
      const response = await api.get<CurriculumDay[]>("/api/v1/curriculum/days", { params });
      return response.data;
    },
  });
}

export function useDay(dayNumber: number) {
  return useQuery({
    queryKey: ["day", dayNumber],
    queryFn: async () => {
      const response = await api.get<CurriculumDay>(`/api/v1/curriculum/days/${dayNumber}`);
      return response.data;
    },
    enabled: !!dayNumber,
  });
}

export function useTopics(phaseId?: number, dayNumber?: number) {
  return useQuery({
    queryKey: ["topics", phaseId, dayNumber],
    queryFn: async () => {
      const params: Record<string, number> = {};
      if (phaseId) params.phase_id = phaseId;
      if (dayNumber) params.day_number = dayNumber;
      const response = await api.get<CurriculumTopic[]>("/api/v1/curriculum/topics", { params });
      return response.data;
    },
  });
}

export function useTopic(topicId: string) {
  return useQuery({
    queryKey: ["topic", topicId],
    queryFn: async () => {
      const response = await api.get<CurriculumTopic>(`/api/v1/curriculum/topics/${topicId}`);
      return response.data;
    },
    enabled: !!topicId,
  });
}

export function useLesson(lessonId: string) {
  return useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: async () => {
      const response = await api.get<CurriculumLesson>(`/api/v1/curriculum/lessons/${lessonId}`);
      return response.data;
    },
    enabled: !!lessonId,
  });
}
