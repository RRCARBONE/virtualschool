import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Clock, Layers, Star } from "lucide-react";
import { Cover } from "@/components/ui/cover";
import { RatingStars } from "@/components/rating-stars";
import { FormationHeaderProgress, CourseJourneyItem } from "@/components/career-path/formation-journey";
import {
  getCareerPath,
  getCoursesForCareerPath,
  getProfessionById,
  getArea,
  getAllLessonsForCourse,
  getReviewsFor,
  averageRating,
} from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ formacao: string }>;
}): Promise<Metadata> {
  const { formacao } = await params;
  const path = await getCareerPath(formacao);
  if (!path) return {};
  return { title: path.title, description: path.description };
}

export default async function FormationPage({ params }: { params: Promise<{ formacao: string }> }) {
  const { formacao } = await params;
  const path = await getCareerPath(formacao);
  if (!path) notFound();

  const courses = await getCoursesForCareerPath(path.slug);
  const profession = await getProfessionById(path.professionId);
  const area = profession ? await getArea(profession.areaId) : undefined;
  const pathReviews = getReviewsFor({ careerPathId: path.id });
  const rating = averageRating(pathReviews);

  const coursesWithLessons = await Promise.all(
    courses.map(async (course) => {
      const lessons = await getAllLessonsForCourse(course.id);
      return { course, lessonIds: lessons.map(({ lesson }) => lesson.id) };
    })
  );

  return (
    <div className="container-app py-12">
      <nav className="flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link href="/profissoes" className="hover:text-foreground">Profissões</Link>
        {area && (
          <>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href={`/profissoes/${area.slug}`} className="hover:text-foreground">{area.name}</Link>
          </>
        )}
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground">{path.title.replace("Formação — ", "")}</span>
      </nav>

      <div className="mt-6 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand">Formação completa</span>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{path.title.replace("Formação — ", "")}</h1>
          <p className="mt-3 text-lg text-muted">{path.description}</p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="flex items-center gap-1.5"><Layers className="h-4 w-4" /> {courses.length} cursos</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {path.totalHours}h de conteúdo</span>
            {pathReviews.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4" /> {rating.toFixed(1)} ({pathReviews.length} avaliações)
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Cover gradient={path.coverImage} className="h-32 w-full">
            <Layers className="h-10 w-10 text-white/90" strokeWidth={1.5} />
          </Cover>
          <FormationHeaderProgress pathId={path.id} courses={coursesWithLessons} />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold">Sua jornada</h2>
        <p className="mt-1 text-sm text-muted">Siga os cursos em ordem para construir uma base sólida.</p>
        <div className="mt-5 space-y-3">
          {coursesWithLessons.map(({ course, lessonIds }, i) => (
            <CourseJourneyItem key={course.id} course={course} index={i} lessonIds={lessonIds} />
          ))}
        </div>
      </div>

      {pathReviews.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold">O que os alunos dizem</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {pathReviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-border bg-surface p-5 shadow-card">
                <RatingStars rating={review.rating} />
                <p className="mt-3 text-sm text-muted">&quot;{review.comment}&quot;</p>
                <p className="mt-3 text-sm font-semibold">{review.userName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
