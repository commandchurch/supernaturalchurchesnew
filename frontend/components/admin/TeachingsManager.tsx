import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../_generated/api';
import { BookOpen, Plus, Edit, Trash2, CheckCircle, XCircle, X } from 'lucide-react';

type Teaching = {
  _id: string;
  title: string;
  excerpt?: string;
  content: string;
  category: string;
  slug: string;
  authorId: string;
  featuredImageUrl?: string;
  isPublished: boolean;
  publishedAt?: number;
  _creationTime: number;
};

interface TeachingFormData {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  slug?: string;
  authorId?: string;
  featuredImageUrl?: string;
  isPublished: boolean;
}

const emptyTeaching: TeachingFormData = {
  title: '',
  excerpt: '',
  content: '',
  category: 'healing',
  featuredImageUrl: '',
  isPublished: false,
};

export default function TeachingsManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeaching, setEditingTeaching] = useState<TeachingFormData>(emptyTeaching);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teachingsData = useQuery(api.church.listAllTeachings);
  const isLoading = teachingsData === undefined;

  const createMutation = useMutation(api.church.createTeaching);
  const updateMutation = useMutation(api.church.updateTeaching);
  const deleteMutation = useMutation(api.church.deleteTeaching);

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    setEditingTeaching(emptyTeaching);
    setEditingId(null);
  };

  const handleUpdateSuccess = () => {
    setIsModalOpen(false);
    setEditingTeaching(emptyTeaching);
    setEditingId(null);
  };

  const handleOpenCreate = () => {
    setEditingTeaching(emptyTeaching);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (teaching: Teaching) => {
    setEditingTeaching({
      _id: teaching._id,
      title: teaching.title,
      excerpt: teaching.excerpt || '',
      content: teaching.content,
      category: teaching.category,
      slug: teaching.slug,
      authorId: teaching.authorId,
      featuredImageUrl: teaching.featuredImageUrl || '',
      isPublished: !!teaching.publishedAt,
    });
    setEditingId(teaching._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this teaching?')) {
      await deleteMutation({ teachingId: id });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const teachingData = {
        title: editingTeaching.title,
        slug: editingTeaching.slug || editingTeaching.title.toLowerCase().replace(/\s+/g, '-'),
        content: editingTeaching.content,
        excerpt: editingTeaching.excerpt || undefined,
        category: editingTeaching.category,
        featuredImageUrl: editingTeaching.featuredImageUrl || undefined,
        authorId: editingTeaching.authorId || 'admin',
      };

      if (editingId) {
        await updateMutation({
          teachingId: editingId,
          ...teachingData,
          isPublished: editingTeaching.isPublished,
          publishedAt: editingTeaching.isPublished ? Date.now() : undefined,
        });
        handleUpdateSuccess();
      } else {
        await createMutation(teachingData);
        handleCreateSuccess();
      }
    } catch (error) {
      console.error('Failed to save teaching:', error);
      alert('Failed to save teaching. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'healing', 'deliverance', 'evangelism', 'discipleship', 'prophecy',
    'worship', 'leadership', 'marriage', 'finance', 'prayer', 'other'
  ];

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-white" />
          <div>
            <h2 className="text-2xl font-bold text-white heading-font">Manage Teachings</h2>
            <p className="text-gray-400 text-sm">Create and publish teachings with video content and rich media</p>
          </div>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold uppercase tracking-wide inline-flex items-center text-sm rounded transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Teaching
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading teachings...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Title</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Category</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Status</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Created</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachingsData?.teachings.map((teaching: Teaching) => (
                <tr key={teaching._id} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                  <td className="py-4 px-3">
                    <div>
                      <p className="text-white font-medium">{teaching.title}</p>
                      {teaching.excerpt && (
                        <p className="text-gray-400 text-sm mt-1 line-clamp-1">{teaching.excerpt}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 capitalize">
                      {teaching.category}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    {teaching.publishedAt ? (
                      <span className="inline-flex items-center gap-1 text-green-400 text-sm">
                        <CheckCircle className="h-4 w-4" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-yellow-400 text-sm">
                        <XCircle className="h-4 w-4" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-3 text-gray-300 text-sm">
                    {new Date(teaching._creationTime).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenEdit(teaching)}
                        className="text-blue-400 hover:text-blue-300 p-1 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(teaching._id)}
                        className="text-red-400 hover:text-red-300 p-1 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Simple Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-orange-500" />
                <div>
                  <h3 className="text-xl font-bold text-white heading-font">
                    {editingId ? 'Edit Teaching' : 'Create New Teaching'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Create engaging teachings with multimedia content
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-300 p-2 rounded"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Teaching Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTeaching.title}
                    onChange={(e) => setEditingTeaching({ ...editingTeaching, title: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                    placeholder="Enter teaching title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={editingTeaching.category}
                    onChange={(e) => setEditingTeaching({ ...editingTeaching, category: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500 capitalize"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="capitalize">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Teaching Excerpt
                </label>
                <textarea
                  value={editingTeaching.excerpt}
                  onChange={(e) => setEditingTeaching({ ...editingTeaching, excerpt: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                  rows={3}
                  placeholder="Brief description of the teaching..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Teaching Content *
                </label>
                <textarea
                  required
                  value={editingTeaching.content}
                  onChange={(e) => setEditingTeaching({ ...editingTeaching, content: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                  rows={8}
                  placeholder="Enter the full teaching content..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={editingTeaching.featuredImageUrl || ''}
                  onChange={(e) => setEditingTeaching({ ...editingTeaching, featuredImageUrl: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="bg-gray-700/50 border border-gray-600 rounded p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium mb-1">Publishing Status</h4>
                    <p className="text-gray-400 text-sm">
                      {editingTeaching.isPublished
                        ? 'This teaching will be visible to all users immediately'
                        : 'Save as draft to review before publishing'
                      }
                    </p>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingTeaching.isPublished}
                      onChange={(e) => setEditingTeaching({ ...editingTeaching, isPublished: e.target.checked })}
                      className="form-checkbox h-5 w-5 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    />
                    <span className="ml-2 text-white font-medium">
                      {editingTeaching.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-gray-400 hover:text-gray-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting} 
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white px-8 py-2 font-semibold uppercase tracking-wide text-sm rounded transition-colors"
                >
                  {isSubmitting
                    ? 'Saving...'
                    : editingId
                    ? 'Update Teaching'
                    : 'Create Teaching'
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
