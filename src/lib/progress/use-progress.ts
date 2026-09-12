"use client";

import { useSyncExternalStore } from "react";
import { progressStore } from "./store";
import { getAllLessonsForCourse, getCoursesForCareerPath } from "@/lib/data";

export function useProgress() {
  return useSyncExternalStore(
    progressStore.subscribe,
    progressStore.getSnapshot,
    progressStore.getServerSnapshot
  );
}

export function useCourseProgress(courseId: string) {
  const state = useProgress();
  const lessons = getAllLessonsForCourse(courseId);
  const total = lessons.length;
  const completed = lessons.filter(({ lesson }) => state.completedLessons.includes(lesson.id)).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, percent, isEnrolled: state.enrolledCourses.includes(courseId) };
}

export function useCareerPathProgress(pathSlug: string) {
  const state = useProgress();
  const courses = getCoursesForCareerPath(pathSlug);
  let total = 0;
  let completed = 0;
  for (const course of courses) {
    const lessons = getAllLessonsForCourse(course.id);
    total += lessons.length;
    completed += lessons.filter(({ lesson }) => state.completedLessons.includes(lesson.id)).length;
  }
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, percent, courses };
}
