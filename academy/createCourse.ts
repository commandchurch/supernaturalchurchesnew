import { api, APIError } from "encore.dev/api";
import { academyDB } from "./db";
import { Course } from "./listCourses";
import { requireAdmin } from "../auth/admin";
import { validateInput, sanitizeInput, commonValidationRules } from "../auth/validation";

interface CreateCourseParams {
  title: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
  durationMinutes?: number;
  isPublished: boolean;
  isPremium: boolean;
}

// Validation rules for course creation
const createCourseValidationRules = [
  {
    field: 'title',
    type: 'string' as const,
    required: true,
    minLength: 3,
    maxLength: 200
  },
  commonValidationRules.description('description', 2000),
  {
    field: 'category',
    type: 'string' as const,
    required: true,
    maxLength: 50
  },
  {
    field: 'thumbnailUrl',
    type: 'url' as const,
    required: false
  },
  {
    field: 'videoUrl',
    type: 'url' as const,
    required: false
  },
  {
    field: 'pdfUrl',
    type: 'url' as const,
    required: false
  },
  {
    field: 'durationMinutes',
    type: 'number' as const,
    required: false
  },
  {
    field: 'isPublished',
    type: 'boolean' as const,
    required: true
  },
  {
    field: 'isPremium',
    type: 'boolean' as const,
    required: true
  }
];

// Creates a new course.
export const createCourse = api<CreateCourseParams, Course>(
  { auth: true, expose: true, method: "POST", path: "/admin/academy/courses" },
  async (params) => {
    requireAdmin();

    // Sanitize input data
    const sanitizedData = sanitizeInput(params);

    // Validate input data
    const validation = validateInput(sanitizedData, createCourseValidationRules);
    if (!validation.isValid) {
      throw APIError.invalidArgument(`Validation failed: ${validation.errors.join(', ')}`);
    }
    const course = await academyDB.queryRow<any>`
      INSERT INTO courses (title, description, category, thumbnail_url, video_url, pdf_url, duration_minutes, is_published, is_premium, updated_at)
      VALUES (${params.title}, ${params.description}, ${params.category}, ${params.thumbnailUrl}, ${params.videoUrl}, ${params.pdfUrl}, ${params.durationMinutes}, ${params.isPublished}, ${params.isPremium}, NOW())
      RETURNING *
    `;

    if (!course) {
      throw APIError.internal("failed to create course");
    }

    return {
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      thumbnailUrl: course.thumbnail_url,
      videoUrl: course.video_url,
      pdfUrl: course.pdf_url,
      durationMinutes: course.duration_minutes,
      isPublished: course.is_published,
      isPremium: course.is_premium,
      createdAt: course.created_at,
    };
  }
);
