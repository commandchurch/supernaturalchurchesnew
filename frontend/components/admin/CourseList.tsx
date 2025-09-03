import React from 'react';
import { Edit, Trash2, CheckCircle, XCircle, BookOpen } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  pdfUrl?: string;
  durationMinutes?: number;
  isPublished: boolean;
  isPremium: boolean;
  createdAt: string;
}

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (courseId: number) => void;
}

export default function CourseList({ courses, onEdit, onDelete }: CourseListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left text-gray-400 font-semibold py-3 px-3">Title</th>
            <th className="text-left text-gray-400 font-semibold py-3 px-3">Category</th>
            <th className="text-left text-gray-400 font-semibold py-3 px-3">Status</th>
            <th className="text-left text-gray-400 font-semibold py-3 px-3">Access</th>
            <th className="text-left text-gray-400 font-semibold py-3 px-3">Duration</th>
            <th className="text-left text-gray-400 font-semibold py-3 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course: Course) => (
            <tr key={course.id} className="border-b border-gray-700">
              <td className="py-3 px-3 text-white">{course.title}</td>
              <td className="py-3 px-3 text-gray-300 capitalize">{course.category}</td>
              <td className="py-3 px-3">
                {course.isPublished ? (
                  <span className="inline-flex items-center gap-1 text-green-400 text-sm"><CheckCircle className="h-4 w-4" /> Published</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-yellow-400 text-sm"><XCircle className="h-4 w-4" /> Draft</span>
                )}
              </td>
              <td className="py-3 px-3">
                {course.isPremium ? (
                  <span className="text-purple-400 text-sm">Premium</span>
                ) : (
                  <span className="text-gray-400 text-sm">Free</span>
                )}
              </td>
              <td className="py-3 px-3 text-gray-300 text-sm">
                {course.durationMinutes ? `${course.durationMinutes} min` : 'N/A'}
              </td>
              <td className="py-3 px-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(course)}
                    className="text-blue-400 hover:text-blue-300"
                    title="Edit course"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(course.id)}
                    className="text-red-400 hover:text-red-300"
                    title="Delete course"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {courses.length === 0 && (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No courses found. Create your first course!</p>
        </div>
      )}
    </div>
  );
}
