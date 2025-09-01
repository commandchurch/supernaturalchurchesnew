import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../_generated/api';
type Event = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isPublished: boolean;
};
import { Edit, Trash2, Plus, CheckCircle, XCircle, Calendar, Upload, Video, Image, Info } from 'lucide-react';

const emptyEvent: Omit<Event, 'id'> = {
  title: '',
  description: '',
  eventType: 'service',
  startDate: '',
  endDate: '',
  locationName: '',
  virtualLink: '',
  isPublished: false,
};

// Enhanced event interface for UI state
interface EventFormData extends Omit<Event, 'id'> {
  id?: number;
  videoUrl?: string;
  thumbnailFile?: File;
  thumbnailUrl?: string;
}

const emptyEventForm: EventFormData = {
  ...emptyEvent,
  videoUrl: '',
  thumbnailUrl: '',
};

export default function EventsManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFormData>(emptyEventForm);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  const eventsData = useQuery(api.church.listAllEvents);
  const isLoading = eventsData === undefined;

  const createMutation = useMutation(api.church.createEvent);
  const updateMutation = useMutation(api.church.updateEvent);
  const deleteMutation = useMutation(api.church.deleteEvent);

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    setEditingEvent(emptyEventForm);
  };

  const handleUpdateSuccess = () => {
    setIsModalOpen(false);
    setEditingEvent(emptyEventForm);
  };

  const handleOpenCreate = () => {
    setEditingEvent(emptyEventForm);
    setThumbnailPreview('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (event: Event) => {
    setEditingEvent({
      ...event,
      startDate: event.startDate ? new Date(event.startDate).toISOString().slice(0, 16) : '',
      endDate: event.endDate ? new Date(event.endDate).toISOString().slice(0, 16) : '',
      videoUrl: '',
      thumbnailUrl: '',
    });
    setThumbnailPreview('');
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteMutation.mutate({ eventId: id });
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setEditingEvent({ ...editingEvent, thumbnailFile: file });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateVideoUrl = (url: string): boolean => {
    if (!url) return true; // Optional field
    
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;
    
    return youtubeRegex.test(url) || vimeoRegex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate video URL if provided
    if (editingEvent.videoUrl && !validateVideoUrl(editingEvent.videoUrl)) {
      alert('Please enter a valid YouTube or Vimeo URL');
      return;
    }

    // Create event data without UI-specific fields
    const eventData = {
      title: editingEvent.title,
      description: editingEvent.description,
      eventType: editingEvent.eventType,
      startDate: editingEvent.startDate,
      endDate: editingEvent.endDate,
      locationName: editingEvent.locationName,
      virtualLink: editingEvent.virtualLink,
      isPublished: editingEvent.isPublished,
    };

    if (editingEvent.id) {
      updateMutation.mutate({ ...eventData, eventId: editingEvent.id }, {
        onSuccess: handleUpdateSuccess
      });
    } else {
      createMutation.mutate(eventData, {
        onSuccess: handleCreateSuccess
      });
    }
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-white" />
          <div>
            <h2 className="text-xl font-bold text-white heading-font">Manage Events</h2>
            <p className="text-gray-400 text-sm">Create, edit, and manage all church events.</p>
          </div>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide inline-flex items-center text-sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading events...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Title</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Date</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Status</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {eventsData?.events.map((event) => (
                <tr key={event.id} className="border-b border-gray-700">
                  <td className="py-3 px-3 text-white">{event.title}</td>
                  <td className="py-3 px-3 text-gray-300">{new Date(event.startDate).toLocaleString()}</td>
                  <td className="py-3 px-3">
                    {event.isPublished ? (
                      <span className="inline-flex items-center gap-1 text-green-400 text-sm"><CheckCircle className="h-4 w-4" /> Published</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-yellow-400 text-sm"><XCircle className="h-4 w-4" /> Draft</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex space-x-2">
                      <button onClick={() => handleOpenEdit(event)} className="text-blue-400 hover:text-blue-300"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(event.id)} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6 heading-font">
              {editingEvent.id ? 'Edit Event' : 'Create Event'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Basic Information
                </h4>
                <div>
                  <label className="block text-white font-semibold mb-1 text-sm">Title</label>
                  <input 
                    type="text" 
                    value={editingEvent.title} 
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })} 
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm rounded focus:border-orange-500 focus:outline-none"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-1 text-sm">Description</label>
                  <textarea 
                    rows={4} 
                    value={editingEvent.description} 
                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} 
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm rounded focus:border-orange-500 focus:outline-none"
                    required 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-1 text-sm">Event Type</label>
                    <select 
                      value={editingEvent.eventType} 
                      onChange={(e) => setEditingEvent({ ...editingEvent, eventType: e.target.value })} 
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm rounded focus:border-orange-500 focus:outline-none"
                    >
                      <option value="service">Service</option>
                      <option value="conference">Conference</option>
                      <option value="gathering">Gathering</option>
                      <option value="training">Training</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-1 text-sm">Location Name</label>
                    <input 
                      type="text" 
                      value={editingEvent.locationName || ''} 
                      onChange={(e) => setEditingEvent({ ...editingEvent, locationName: e.target.value })} 
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm rounded focus:border-orange-500 focus:outline-none"
                      placeholder="Physical location or 'Online'"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Date & Time
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-1 text-sm">Start Date & Time</label>
                    <input 
                      type="datetime-local" 
                      value={editingEvent.startDate} 
                      onChange={(e) => setEditingEvent({ ...editingEvent, startDate: e.target.value })} 
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm rounded focus:border-orange-500 focus:outline-none"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-1 text-sm">End Date & Time (optional)</label>
                    <input 
                      type="datetime-local" 
                      value={editingEvent.endDate || ''} 
                      onChange={(e) => setEditingEvent({ ...editingEvent, endDate: e.target.value })} 
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm rounded focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Media Content */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Media Content
                </h4>
                
                {/* Video URL */}
                <div>
                  <label className="block text-white font-semibold mb-1 text-sm">
                    Video URL (YouTube or Vimeo)
                  </label>
                  <input 
                    type="url" 
                    value={editingEvent.videoUrl || ''} 
                    onChange={(e) => setEditingEvent({ ...editingEvent, videoUrl: e.target.value })} 
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm rounded focus:border-orange-500 focus:outline-none"
                    placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                  />
                  <p className="text-gray-400 text-xs mt-1">
                    Paste the full YouTube or Vimeo URL. This will be embedded in the event page.
                  </p>
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-white font-semibold mb-1 text-sm">
                    Event Thumbnail Image
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <label className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white px-4 py-2 text-sm rounded cursor-pointer inline-flex items-center gap-2 transition-colors">
                        <Upload className="h-4 w-4" />
                        Choose Image
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleThumbnailUpload}
                          className="hidden"
                        />
                      </label>
                      {editingEvent.thumbnailFile && (
                        <span className="text-green-400 text-sm flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          {editingEvent.thumbnailFile.name}
                        </span>
                      )}
                    </div>
                    
                    {/* Thumbnail Guidelines */}
                    <div className="bg-blue-500/20 border border-blue-500/30 p-4 rounded">
                      <div className="flex items-start gap-2">
                        <Image className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-blue-200 font-semibold text-sm mb-2">Recommended Thumbnail Specifications:</h5>
                          <ul className="text-blue-100 text-xs space-y-1">
                            <li>• <strong>Size:</strong> 1920x1080 pixels (16:9 aspect ratio)</li>
                            <li>• <strong>Format:</strong> JPG or PNG</li>
                            <li>• <strong>File Size:</strong> Under 5MB</li>
                            <li>• <strong>Content:</strong> High contrast, readable text, compelling imagery</li>
                            <li>• <strong>Safe Area:</strong> Keep important content in center 1280x720 area</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Thumbnail Preview */}
                    {thumbnailPreview && (
                      <div>
                        <p className="text-white font-semibold text-sm mb-2">Preview:</p>
                        <div className="border border-gray-600 rounded overflow-hidden max-w-md">
                          <img 
                            src={thumbnailPreview} 
                            alt="Thumbnail preview" 
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-1 text-sm">Virtual Link (Zoom, Teams, etc.)</label>
                  <input 
                    type="url" 
                    value={editingEvent.virtualLink || ''} 
                    onChange={(e) => setEditingEvent({ ...editingEvent, virtualLink: e.target.value })} 
                    className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 text-sm rounded focus:border-orange-500 focus:outline-none"
                    placeholder="https://zoom.us/j/... or meeting link"
                  />
                  <p className="text-gray-400 text-xs mt-1">
                    For live events, provide the meeting/streaming link
                  </p>
                </div>
                
                <div className="flex items-center space-x-6 pt-2">
                  <label className="flex items-center text-white cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={editingEvent.isPublished} 
                      onChange={(e) => setEditingEvent({ ...editingEvent, isPublished: e.target.checked })} 
                      className="mr-2 w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500"
                    /> 
                    Published (visible to public)
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 pt-6 border-t border-gray-600">
                <button 
                  type="submit" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 font-semibold uppercase tracking-wide text-sm rounded transition-colors" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Event'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="border border-gray-600 text-white hover:bg-gray-700 px-6 py-2 font-semibold uppercase tracking-wide text-sm rounded transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
