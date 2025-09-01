import { api, APIError } from "encore.dev/api";
import { academyDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface CourseModule {
  id: number;
  title: string;
  contentUrl?: string;
  orderIndex: number;
}

interface QuizQuestion {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  orderIndex: number;
}

interface CourseWithModules {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  durationMinutes?: number;
  isPublished: boolean;
  isPremium: boolean;
  requiresQuiz: boolean;
  passingScore: number;
  createdAt: string;
  modules: CourseModule[];
  quizQuestions: QuizQuestion[];
}

interface GetCourseWithModulesParams {
  id: number;
}

// Gets a course with all its modules and quiz questions.
export const getCourseWithModules = api<GetCourseWithModulesParams, CourseWithModules>(
  { auth: true, expose: true, method: "GET", path: "/admin/academy/courses/:id/full" },
  async ({ id }) => {
    requireAdmin();
    // Get course details
    const course = await academyDB.queryRow<{
      id: number;
      title: string;
      description: string;
      category: string;
      thumbnail_url?: string;
      duration_minutes?: number;
      is_published: boolean;
      is_premium: boolean;
      requires_quiz: boolean;
      passing_score: number;
      created_at: string;
    }>`
      SELECT id, title, description, category, thumbnail_url, duration_minutes, 
             is_published, is_premium, requires_quiz, passing_score, created_at
      FROM courses 
      WHERE id = ${id}
    `;

    if (!course) {
      throw APIError.notFound("course not found");
    }

    // Get modules
    const modules = await academyDB.queryAll<{
      id: number;
      title: string;
      content_url?: string;
      order_index: number;
    }>`
      SELECT id, title, content_url, order_index
      FROM course_modules
      WHERE course_id = ${id}
      ORDER BY order_index
    `;

    // Get quiz questions
    const questions = await academyDB.queryAll<{
      id: number;
      question: string;
      option_a: string;
      option_b: string;
      option_c: string;
      option_d: string;
      correct_answer: string;
      order_index: number;
    }>`
      SELECT id, question, option_a, option_b, option_c, option_d, correct_answer, order_index
      FROM quiz_questions
      WHERE course_id = ${id}
      ORDER BY order_index
    `;

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      thumbnailUrl: course.thumbnail_url,
      durationMinutes: course.duration_minutes,
      isPublished: course.is_published,
      isPremium: course.is_premium,
      requiresQuiz: course.requires_quiz,
      passingScore: course.passing_score,
      createdAt: course.created_at,
      modules: modules.map(m => ({
        id: m.id,
        title: m.title,
        contentUrl: m.content_url,
        orderIndex: m.order_index,
      })),
      quizQuestions: questions.map(q => ({
        id: q.id,
        question: q.question,
        optionA: q.option_a,
        optionB: q.option_b,
        optionC: q.option_c,
        optionD: q.option_d,
        correctAnswer: q.correct_answer,
        orderIndex: q.order_index,
      })),
    };
  }
);
