"use client";

import { useSyncExternalStore } from "react";
import { adminStore } from "./store";
import { professions as seedProfessions, careerPaths as seedCareerPaths, aiTeachers as seedTeachers, allCourses } from "@/lib/data";

function useAdminState() {
  return useSyncExternalStore(adminStore.subscribe, adminStore.getSnapshot, adminStore.getServerSnapshot);
}

export function useAllTeachers() {
  const state = useAdminState();
  return [...seedTeachers, ...state.teachers];
}

export function useAllProfessions() {
  const state = useAdminState();
  return [...seedProfessions, ...state.professions];
}

export function useAllCareerPaths() {
  const state = useAdminState();
  return [...seedCareerPaths, ...state.careerPaths];
}

export function useCoursesWithPublishState() {
  const state = useAdminState();
  return allCourses.map((c) => ({
    ...c,
    published: state.coursePublishOverrides[c.id] ?? c.published,
  }));
}
