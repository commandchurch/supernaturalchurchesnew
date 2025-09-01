import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Reply } from 'lucide-react';

type PrayerRequest = {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  request: string;
  isPrivate?: boolean;
  isUrgent?: boolean;
  status: string;
  _creationTime: number;
};

type RequestsData = { prayerRequests: PrayerRequest[] } | undefined;

interface PrayerRequestsAdminProps {
  requests: RequestsData;
  onReply: (p: { id: number; responderName?: string; responderEmail?: string; message: string }) => void;
  replying: boolean;
}

export default function PrayerRequestsAdmin({ requests, onReply, replying }: PrayerRequestsAdminProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [messages, setMessages] = useState<Record<string, string>>({});

  const toggleExpand = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  const setMsg = (id: string, msg: string) => setMessages(prev => ({ ...prev, [id]: msg }));

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-white mb-6 heading-font">Prayer Requests Management</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left text-gray-400 font-semibold py-3">Name</th>
              <th className="text-left text-gray-400 font-semibold py-3">Contact</th>
              <th className="text-left text-gray-400 font-semibold py-3">Request</th>
              <th className="text-left text-gray-400 font-semibold py-3">Priority</th>
              <th className="text-left text-gray-400 font-semibold py-3">Status</th>
              <th className="text-left text-gray-400 font-semibold py-3">Date</th>
              <th className="text-left text-gray-400 font-semibold py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests?.prayerRequests.map((request) => (
              <React.Fragment key={request._id}>
                <tr className="border-b border-gray-700">
                  <td className="py-3 text-white">{request.name}</td>
                  <td className="py-3 text-gray-300 text-sm">
                    {request.email && <div>{request.email}</div>}
                    {request.phone && <div>{request.phone}</div>}
                  </td>
                  <td className="py-3 text-white max-w-xs">
                    <div className="truncate">{request.request}</div>
                    {request.isPrivate && (
                      <span className="text-xs text-yellow-400">🔒 Private</span>
                    )}
                  </td>
                  <td className="py-3">
                    {request.isUrgent ? (
                      <span className="px-2 py-1 text-xs font-semibold bg-red-500/20 text-red-400">
                        URGENT
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold bg-gray-500/20 text-gray-400">
                        NORMAL
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs font-semibold ${
                      request.status === 'answered' ? 'bg-green-500/20 text-green-400' :
                      request.status === 'praying' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {request.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400 text-sm">
                    {new Date(request._creationTime).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button onClick={() => toggleExpand(request._id)} className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1">
                        {expanded[request._id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />} View
                      </button>
                    </div>
                  </td>
                </tr>
                {expanded[request._id] && (
                  <tr className="border-b border-gray-800">
                    <td colSpan={7} className="bg-gray-900/40 p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-white font-semibold mb-2">Full Request</h4>
                          <div className="bg-gray-800/60 border border-gray-700 p-3 text-gray-200 whitespace-pre-wrap">
                            {request.request}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Reply</h4>
                          <textarea
                            rows={5}
                            value={messages[request._id] || ''}
                            onChange={(e) => setMsg(request._id, e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2"
                            placeholder="Write a compassionate reply that will be sent to their dashboard and email..."
                          />
                          <button
                            onClick={() => onReply({ id: request._id, message: messages[request._id] || '' })}
                            className="mt-3 bg-white text-black hover:bg-gray-200 px-3 md:px-4 py-2 font-semibold uppercase tracking-wide inline-flex items-center text-xs md:text-sm"
                            disabled={replying || !(messages[request._id] && messages[request._id].trim().length > 0)}
                          >
                            <Reply className="h-4 w-4 mr-2" />
                            {replying ? 'Sending...' : 'Send Reply'}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {!requests?.prayerRequests?.length && (
              <tr><td colSpan={7} className="text-gray-400 py-4">No prayer requests found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
