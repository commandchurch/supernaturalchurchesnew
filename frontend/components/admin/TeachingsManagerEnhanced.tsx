import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../_generated/api';
import { BookOpen, Plus, Edit, Trash2, CheckCircle, XCircle, Upload, Video, Image, Info, FileText, X } from 'lucide-react';

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

// Enhanced teaching interface for UI state
interface TeachingFormData {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  slug?: string;
  authorId?: string;
  featuredImageUrl?: string;
  videoUrl?: string;
  thumbnailFile?: File;
  isPublished: boolean;
  tags?: string;
  estimatedReadTime?: number;
}

const emptyTeaching: TeachingFormData = {
  title: '',
  excerpt: '',
  content: '',
  category: 'healing',
  featuredImageUrl: '',
  videoUrl: '',
  isPublished: false,
  tags: '',
  estimatedReadTime: 5,
};

export default function TeachingsManagerEnhanced() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeaching, setEditingTeaching] = useState<TeachingFormData>(emptyTeaching);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'media'>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const teachingsData = useQuery(api.church.listAllTeachings);
  const isLoading = teachingsData === undefined;

  const createMutation = useMutation(api.church.createTeaching);
  const updateMutation = useMutation(api.church.updateTeaching);
  const deleteMutation = useMutation(api.church.deleteTeaching);

  const resetForm = () => {
    setEditingTeaching(emptyTeaching);
    setThumbnailPreview('');
    setActiveTab('basic');
  };

  const handleOpenCreate = () => {
    resetForm();
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
      videoUrl: '',
      tags: '',
      estimatedReadTime: 5,
      isPublished: !!teaching.publishedAt,
    });
    setThumbnailPreview('');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this teaching?')) {
      await deleteMutation({ teachingId: id });
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setEditingTeaching({ ...editingTeaching, thumbnailFile: file });
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateVideoUrl = (url: string): boolean => {
    if (!url) return true;
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;
    return youtubeRegex.test(url) || vimeoRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTeaching.videoUrl && !validateVideoUrl(editingTeaching.videoUrl)) {
      alert('Please enter a valid YouTube or Vimeo URL');
      return;
    }

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

      if (editingTeaching._id) {
        await updateMutation({
          teachingId: editingTeaching._id,
          ...teachingData,
          isPublished: editingTeaching.isPublished,
          publishedAt: editingTeaching.isPublished ? Date.now() : undefined,
        });
      } else {
        await createMutation(teachingData);
      }
      
      setIsModalOpen(false);
      resetForm();
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

      {/* Enhanced Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-orange-500" />
                <div>
                  <h3 className="text-xl font-bold text-white heading-font">
                    {editingTeaching._id ? 'Edit Teaching' : 'Create New Teaching'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Create engaging teachings with multimedia content and professional presentation
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

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'basic'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Info className="inline-block w-4 h-4 mr-2" />
                Basic Information
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'content'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <FileText className="inline-block w-4 h-4 mr-2" />
                Content
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`px-6 py-3 font-medium text-sm ${
                  activeTab === 'media'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Video className="inline-block w-4 h-4 mr-2" />
                Media & Publishing
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information Tab */}
                {activeTab === 'basic' && (
                  <div className="space-y-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          URL Slug
                        </label>
                        <input
                          type="text"
                          value={editingTeaching.slug || ''}
                          onChange={(e) => setEditingTeaching({ ...editingTeaching, slug: e.target.value })}
                          className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                          placeholder="url-friendly-slug"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Estimated Read Time (minutes)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="60"
                          value={editingTeaching.estimatedReadTime}
                          onChange={(e) => setEditingTeaching({ ...editingTeaching, estimatedReadTime: parseInt(e.target.value) })}
                          className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={editingTeaching.tags || ''}
                        onChange={(e) => setEditingTeaching({ ...editingTeaching, tags: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                        placeholder="healing, faith, breakthrough"
                      />
                    </div>
                  </div>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Teaching Content *
                      </label>
                      <div className="bg-gray-700/50 border border-gray-600 rounded p-4 mb-4">
                        <p className="text-gray-400 text-sm mb-2">
                          ✨ Content Guidelines:
                        </p>
                        <ul className="text-gray-400 text-xs space-y-1">
                          <li>• Use clear, engaging language that connects with your audience</li>
                          <li>• Structure content with headings and paragraphs for easy reading</li>
                          <li>• Include relevant scripture references and practical applications</li>
                          <li>• Keep paragraphs concise and focused on key points</li>
                        </ul>
                      </div>
                      <textarea
                        required
                        value={editingTeaching.content}
                        onChange={(e) => setEditingTeaching({ ...editingTeaching, content: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                        rows={12}
                        placeholder="Enter your teaching content here... Use clear headings and structure your content for maximum impact."
                      />
                    </div>
                  </div>
                )}

                {/* Media & Publishing Tab */}
                {activeTab === 'media' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Teaching Video URL (Optional)
                      </label>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-4 mb-4">
                        <p className="text-blue-400 text-sm mb-2">📹 Video Guidelines:</p>
                        <ul className="text-blue-300 text-xs space-y-1">
                          <li>• Supported: YouTube and Vimeo URLs</li>
                          <li>• Example: https://www.youtube.com/watch?v=VIDEO_ID</li>
                          <li>• Video will be embedded in the teaching page</li>
                          <li>• Ensure video is publicly accessible</li>
                        </ul>
                      </div>
                      <input
                        type="url"
                        value={editingTeaching.videoUrl || ''}
                        onChange={(e) => setEditingTeaching({ ...editingTeaching, videoUrl: e.target.value })}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500"
                        placeholder="https://www.youtube.com/watch?v=..."
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

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Upload Thumbnail (Alternative)
                      </label>
                      <div className="bg-gray-700/50 border border-gray-600 rounded p-4 mb-4">
                        <p className="text-gray-400 text-sm mb-2">
                          📸 Image Requirements:
                        </p>
                        <ul className="text-gray-400 text-xs space-y-1">
                          <li>• Recommended: 1920x1080 pixels (16:9 aspect ratio)</li>
                          <li>• Maximum file size: 5MB</li>
                          <li>• Formats: JPG, PNG, WebP</li>
                          <li>• High-quality images create better engagement</li>
                        </ul>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
                      />
                      {thumbnailPreview && (
                        <div className="mt-4">
                          <img
                            src={thumbnailPreview}
                            alt="Thumbnail preview"
                            className="w-32 h-18 object-cover rounded border border-gray-600"
                          />
                        </div>
                      )}
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
                  </div>
                )}

                {/* Form Actions */}
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
                      : editingTeaching._id
                      ? 'Update Teaching'
                      : 'Create Teaching'
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
