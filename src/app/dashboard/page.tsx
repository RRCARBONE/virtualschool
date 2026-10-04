import { getCourses, getCareerPaths, getAllLessonsForCourse } from "@/lib/data";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const [courses, careerPaths] = await Promise.all([getCourses(), getCareerPaths()]);

  const lessonIdsByCourse: Record<string, string[]> = {};
  await Promise.all(
    courses.map(async (course) => {
      const lessons = await getAllLessonsForCourse(course.id);
      lessonIdsByCourse[course.id] = lessons.map(({ lesson }) => lesson.id);
    })
  );

  return <DashboardClient courses={courses} careerPaths={careerPaths} lessonIdsByCourse={lessonIdsByCourse} />;
}
