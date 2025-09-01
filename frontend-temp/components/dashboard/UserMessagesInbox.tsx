import React, { useMemo, useState, useEffect } from 'react';
import client from '../../client';
import { useUser } from '@clerk/clerk-react';
import { MessageCircle, Heart, Send, RefreshCw } from 'lucide-react';

export default function UserMessagesInbox() {
  const { user } = useUser();
  const email = useMemo(() => user?.emailAddresses?.[0]?.emailAddress || '', [user]);

  const [myRequests, setMyRequests] = useState<any>(null);
  const [myReplies, setMyReplies] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (!email) return;
      try {
        const replies = await client.church.listPrayerReplies({ email });
        setMyRequests([]);
        setMyReplies(replies);
      } catch (error) {
        console.error('Failed to fetch user messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserMessages();
  }, [email]);

  const [replyByRequest, setReplyByRequest] = useState<Record<string, string>>({});
  const [sendingFor, setSendingFor] = useState<string | null>(null);

  const requests = myRequests || [];
  const replies = myReplies || [];

  // Build a thread map: requestId -> replies[]
  const threadMap: Record<string, any[]> = {};
  for (const r of replies) {
    const key = String((r as any).requestId);
    if (!threadMap[key]) threadMap[key] = [];
    threadMap[key].push(r);
  }
  Object.values(threadMap).forEach(arr => arr.sort((a: any, b: any) => (a.createdAt || 0) - (b.createdAt || 0)));

  const handleReply = async (requestId: string) => {
    const text = replyByRequest[requestId]?.trim();
    if (!text) return;
    try {
      setSendingFor(requestId);
      // Reply functionality would need to be implemented in Encore.dev backend
      alert('Reply functionality not yet implemented for user messages');
      setReplyByRequest(prev => ({ ...prev, [requestId]: '' }));
    } catch (e) {
      alert('Failed to send reply. Please try again.');
      console.error(e);
    } finally {
      setSendingFor(null);
    }
  };

  const isLoading = loading;

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg">
      <div className="p-4 sm:p-6 border-b border-gray-700 flex items-center gap-3">
        <MessageCircle className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Messages</h2>
      </div>

      <div className="p-4 sm:p-6">
        {!email ? (
          <p className="text-gray-400">Sign in to view your message threads.</p>
        ) : isLoading ? (
          <div className="flex items-center gap-2 text-gray-400"><RefreshCw className="w-4 h-4 animate-spin" /> Loading messages…</div>
        ) : requests.length === 0 ? (
          <p className="text-gray-400">No messages yet. Submit a prayer request to start a conversation.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req: any) => (
              <div key={String(req._id)} className="bg-gray-800/50 border border-gray-700 rounded p-4">
                <div className="flex items-start gap-3 mb-2">
                  <Heart className="w-5 h-5 text-red-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold truncate">Prayer Request</h3>
                      <span className="text-xs text-gray-500">{new Date(req._creationTime).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-300 text-sm italic whitespace-pre-wrap">"{req.requestText}"</p>
                  </div>
                </div>

                {/* Conversation */}
                <div className="mt-4 space-y-3">
                  {(threadMap[String(req._id)] || []).length === 0 ? (
                    <p className="text-gray-500 text-sm">No replies yet.</p>
                  ) : (
                    (threadMap[String(req._id)] || []).map((r: any) => (
                      <div key={String(r._id)} className={`p-3 rounded ${r.adminName ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-gray-700/50 border border-gray-600/50'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs ${r.adminName ? 'text-blue-300' : 'text-gray-300'}`}>{r.adminName ? `Admin ${r.adminName}` : 'You'}</span>
                          <span className="text-[10px] text-gray-500">{new Date(r.createdAt || r._creationTime).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-200 whitespace-pre-wrap">{r.replyText}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Reply box */}
                <div className="mt-3 flex items-end gap-2">
                  <textarea
                    value={replyByRequest[String(req._id)] || ''}
                    onChange={(e) => setReplyByRequest(prev => ({ ...prev, [String(req._id)]: e.target.value }))}
                    placeholder="Type your reply…"
                    className="flex-1 h-20 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleReply(String(req._id))}
                    disabled={!replyByRequest[String(req._id)]?.trim() || sendingFor === String(req._id)}
                    className="h-10 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded font-semibold text-sm flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> {sendingFor === String(req._id) ? 'Sending…' : 'Send'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


