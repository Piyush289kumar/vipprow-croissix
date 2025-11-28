// hooks/useCourses.ts

import { useQuery } from "@tanstack/react-query";
import {
  fetchPublicCourses,
  fetchCourseById,
  CourseQuery,
  CourseApiResponse,
  Course,
} from "@/api/course.api";

// List (Pagination)
export const useCourses = (query: CourseQuery = {}) => {
  return useQuery<CourseApiResponse>({
    queryKey: ["public-courses", query],
    queryFn: () => fetchPublicCourses(query),
  });
};

// Single Course
export const useCourse = (id: string) => {
  return useQuery<Course>({
    queryKey: ["course", id],
    queryFn: () => fetchCourseById(id),
    enabled: !!id,
  });
};
