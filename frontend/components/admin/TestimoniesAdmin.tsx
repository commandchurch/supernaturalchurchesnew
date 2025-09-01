import React from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../_generated/api';
import { MessageSquare, Video, Check, X, Clock } from 'lucide-react';

export default function TestimoniesAdmin() {
  const testimoniesData = useQuery(api.church.listTestimoniesAdmin);
  const isLoading = testimoniesData === undefined;

  const reviewMutation = useMutation(api.church.reviewTestimony);

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="h-5 w-5 text-white" />
        <div>
          <h2 className="text-xl font-bold text-white heading-font">Manage Testimonies</h2>
          <p className="text-gray-400 text-sm">Review and approve user-submitted testimonies.</p>
        </div>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading testimonies...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 font-semibold py-3 px-3">User ID</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Content</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Status</th>
                <th className="text-left text-gray-400 font-semibold py-3 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimoniesData?.testimonies.map((testimony) => (
                <tr key={testimony.id} className="border-b border-gray-700">
                  <td className="py-3 px-3 text-white">{testimony.userId}</td>
                  <td className="py-3 px-3 text-gray-300 max-w-md">
                    {testimony.contentText && <p className="truncate">{testimony.contentText}</p>}
                    {testimony.videoUrl && (
                      <a href={testimony.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">
                        <Video className="h-4 w-4" /> View Video
                      </a>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-1 text-xs font-semibold ${
                      testimony.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                      testimony.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {testimony.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {testimony.status === 'pending' ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => reviewMutation.mutate({ id: testimony.id, approve: true })}
                          className="text-green-400 hover:text-green-300"
                          title="Approve"
                          disabled={reviewMutation.isPending}
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => reviewMutation.mutate({ id: testimony.id, approve: false })}
                          className="text-red-400 hover:text-red-300"
                          title="Reject"
                          disabled={reviewMutation.isPending}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-gray-500 inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" /> Reviewed
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
