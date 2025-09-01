import { api, APIError } from "encore.dev/api";
import { academyDB } from "./db";
import { requireAdmin } from "../auth/admin";

interface CourseModule {
  title: string;
  contentUrl?: string;
}

interface QuizQuestion {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

interface CreateCourseWithModulesParams {
  title: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  durationMinutes?: number;
  isPublished: boolean;
  isPremium: boolean;
  requiresQuiz: boolean;
  passingScore?: number;
  modules: CourseModule[];
  quizQuestions: QuizQuestion[];
}

interface CreateCourseWithModulesResponse {
  courseId: number;
  modulesCreated: number;
  questionsCreated: number;
  success: boolean;
}

// Creates a new course with modules and quiz questions.
export const createCourseWithModules = api<CreateCourseWithModulesParams, CreateCourseWithModulesResponse>(
  { auth: true, expose: true, method: "POST", path: "/admin/academy/courses/full" },
  async (params) => {
    requireAdmin();
    const tx = await academyDB.begin();
    
    try {
      // Create the course
      const course = await tx.queryRow<{ id: number }>`
        INSERT INTO courses (
          title, description, category, thumbnail_url, duration_minutes, 
          is_published, is_premium, requires_quiz, passing_score, updated_at
        )
        VALUES (
          ${params.title}, ${params.description}, ${params.category}, 
          ${params.thumbnailUrl}, ${params.durationMinutes}, 
          ${params.isPublished}, ${params.isPremium}, ${params.requiresQuiz}, 
          ${params.passingScore || 70}, NOW()
        )
        RETURNING id
      `;

      if (!course) {
        throw APIError.internal("failed to create course");
      }

      const courseId = course.id;

      // Create modules
      let modulesCreated = 0;
      for (let i = 0; i < params.modules.length; i++) {
        const module = params.modules[i];
        await tx.exec`
          INSERT INTO course_modules (course_id, title, content_url, order_index)
          VALUES (${courseId}, ${module.title}, ${module.contentUrl}, ${i})
        `;
        modulesCreated++;
      }

      // Create quiz questions
      let questionsCreated = 0;
      for (let i = 0; i < params.quizQuestions.length; i++) {
        const question = params.quizQuestions[i];
        await tx.exec`
          INSERT INTO quiz_questions (
            course_id, question, option_a, option_b, option_c, option_d, 
            correct_answer, order_index
          )
          VALUES (
            ${courseId}, ${question.question}, ${question.optionA}, 
            ${question.optionB}, ${question.optionC}, ${question.optionD}, 
            ${question.correctAnswer}, ${i}
          )
        `;
        questionsCreated++;
      }

      await tx.commit();

      return {
        courseId,
        modulesCreated,
        questionsCreated,
        success: true,
      };
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  }
);
