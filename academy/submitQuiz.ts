import { api, APIError } from "encore.dev/api";
import { academyDB } from "./db";
import { getAuthData } from "~encore/auth";
import { issueOrUpdateCertificate } from "./util_certificates";

interface QuizAnswer {
  questionId: number;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
}

interface SubmitQuizParams {
  courseId: number;
  answers: QuizAnswer[];
}

interface SubmitQuizResponse {
  score: number;
  totalQuestions: number;
  passed: boolean;
  passingScore: number;
  certificateIssued: boolean;
}

// Submits quiz answers and calculates score. Issues named certificate on pass.
export const submitQuiz = api<SubmitQuizParams, SubmitQuizResponse>(
  { auth: true, expose: true, method: "POST", path: "/academy/courses/:courseId/quiz/submit" },
  async ({ courseId, answers }) => {
    const auth = getAuthData()!;
    const userId = auth.userID;

    // Get course and verify it requires a quiz
    const course = await academyDB.queryRow<{
      requires_quiz: boolean;
      passing_score: number;
      title: string;
    }>`
      SELECT requires_quiz, passing_score, title FROM courses WHERE id = ${courseId}
    `;

    if (!course || !course.requires_quiz) {
      throw APIError.invalidArgument("course does not require a quiz");
    }

    // Get all quiz questions for this course
    const questions = await academyDB.queryAll<{
      id: number;
      correct_answer: string;
    }>`
      SELECT id, correct_answer FROM quiz_questions WHERE course_id = ${courseId}
    `;

    if (questions.length === 0) {
      throw APIError.invalidArgument("no quiz questions found for this course");
    }

    // Calculate score
    let correctAnswers = 0;
    const answerMap = new Map(answers.map(a => [a.questionId, a.selectedAnswer]));

    for (const question of questions) {
      const userAnswer = answerMap.get(question.id);
      if (userAnswer === question.correct_answer) {
        correctAnswers++;
      }
    }

    const score = Math.round((correctAnswers / questions.length) * 100);
    const passed = score >= course.passing_score;

    // Save quiz attempt
    await academyDB.exec`
      INSERT INTO quiz_attempts (user_id, course_id, score, total_questions, passed, answers)
      VALUES (${userId}, ${courseId}, ${score}, ${questions.length}, ${passed}, ${JSON.stringify(answers)})
    `;

    let certificateIssued = false;

    // If passed, issue certificate and mark course as complete
    if (passed) {
      // Mark course as complete
      await academyDB.exec`
        INSERT INTO course_progress (user_id, course_id, progress_percentage, completed_at, last_accessed, updated_at)
        VALUES (${userId}, ${courseId}, 100, NOW(), NOW(), NOW())
        ON CONFLICT (user_id, course_id)
        DO UPDATE SET
          progress_percentage = 100,
          completed_at = COALESCE(course_progress.completed_at, NOW()),
          last_accessed = NOW(),
          updated_at = NOW()
      `;

      await issueOrUpdateCertificate(userId, courseId, course.title);
      certificateIssued = true;
    }

    return {
      score,
      totalQuestions: questions.length,
      passed,
      passingScore: course.passing_score,
      certificateIssued,
    };
  }
);
