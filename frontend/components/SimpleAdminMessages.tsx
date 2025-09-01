import React, { useState, useMemo } from 'react';
import { MessageSquare, Clock, CheckCircle, AlertCircle, Send, ArrowLeft } from 'lucide-react';

interface SimpleMessage {
  id: string;
  category: string;
  subject: string;
  content: string;
  sender: string;
  email: string;
  status: 'new' | 'actioned';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  replies?: SimpleReply[];
}

interface SimpleReply {
  id: string;
  content: string;
  sender: string;
  isAdmin: boolean;
  createdAt: Date;
}

const CATEGORIES = [
  { key: 'billing', label: 'Billing', icon: '💳', color: 'text-red-400' },
  { key: 'prayer-requests', label: 'Prayer Requests', icon: '🙏', color: 'text-blue-400' },
  { key: 'it-support', label: 'IT Support', icon: '💻', color: 'text-green-400' },
  { key: 'emergency', label: 'Emergency', icon: '🚨', color: 'text-red-500' },
  { key: 'general', label: 'General', icon: '💬', color: 'text-gray-400' },
  { key: 'help-me-fund', label: 'Help Me Fund', icon: '💰', color: 'text-yellow-400' },
  { key: 'testimonies', label: 'Testimonies', icon: '✨', color: 'text-purple-400' },
  { key: 'church-partnership', label: 'Church Partnership', icon: '⛪', color: 'text-indigo-400' },
  { key: 'training', label: 'Training', icon: '📚', color: 'text-cyan-400' },
];

// Demo data
const demoMessages: SimpleMessage[] = [
  {
    id: '1',
    category: 'billing',
    subject: 'Payment Failed - Membership',
    content: 'Hi, my payment for my Gold membership failed. Can you help me resolve this?',
    sender: 'John Doe',
    email: 'john@example.com',
    status: 'new',
    priority: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: '2',
    category: 'prayer-requests',
    subject: 'Prayer Request - Family Healing',
    content: 'Please pray for my mother who is in the hospital. She needs healing and strength.',
    sender: 'Sarah Johnson',
    email: 'sarah@example.com',
    status: 'new',
    priority: 'medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: '3',
    category: 'it-support',
    subject: 'Cannot Access Training Videos',
    content: 'I cannot access the training videos after logging in. Getting error 404.',
    sender: 'Mike Wilson',
    email: 'mike@example.com',
    status: 'new',
    priority: 'medium',
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: '4',
    category: 'emergency',
    subject: 'Urgent: Account Locked',
    content: 'My account has been locked and I cannot access anything. This is urgent as I have a meeting today.',
    sender: 'Lisa Brown',
    email: 'lisa@example.com',
    status: 'new',
    priority: 'urgent',
    createdAt: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: '5',
    category: 'general',
    subject: 'Question about Events',
    content: 'When is the next community event? I would like to attend.',
    sender: 'Tom Davis',
    email: 'tom@example.com',
    status: 'actioned',
    priority: 'low',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    replies: [
      {
        id: 'r1',
        content: 'Hi Tom, our next community event is scheduled for next Friday at 7 PM. You can register on our events page.',
        sender: 'Admin',
        isAdmin: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60),
      }
    ]
  }
];

export default function SimpleAdminMessages() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<SimpleMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [messages, setMessages] = useState<SimpleMessage[]>(demoMessages);

  const messageCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORIES.forEach(cat => {
      counts[cat.key] = messages.filter(msg => 
        msg.category === cat.key && msg.status === 'new'
      ).length;
    });
    return counts;
  }, [messages]);

  const filteredMessages = useMemo(() => {
    if (!selectedCategory) return [];
    return messages
      .filter(msg => msg.category === selectedCategory)
      .sort((a, b) => {
        // Sort by priority first, then by date
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [selectedCategory, messages]);

  const handleSendReply = () => {
    if (!selectedMessage || !replyText.trim()) return;

    const reply: SimpleReply = {
      id: `r${Date.now()}`,
      content: replyText,
      sender: 'Admin',
      isAdmin: true,
      createdAt: new Date(),
    };

    setMessages(prev => prev.map(msg => 
      msg.id === selectedMessage.id 
        ? { 
            ...msg, 
            status: 'actioned',
            replies: [...(msg.replies || []), reply]
          }
        : msg
    ));

    setReplyText('');
    setSelectedMessage(null);
    alert('Reply sent successfully!');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-500 bg-red-500/10';
      case 'high': return 'text-orange-400 bg-orange-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  // Category List View
  if (!selectedCategory) {
    return (
      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6">Message Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className="flex items-center justify-between p-4 bg-gray-900/50 hover:bg-gray-900/70 rounded-lg border border-gray-600 hover:border-gray-500 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div className="text-left">
                  <p className={`font-semibold ${category.color}`}>{category.label}</p>
                  <p className="text-gray-400 text-sm">Click to view messages</p>
                </div>
              </div>
              {messageCounts[category.key] > 0 && (
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full min-w-[24px] text-center">
                  {messageCounts[category.key]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Message Detail View
  if (selectedMessage) {
    const category = CATEGORIES.find(cat => cat.key === selectedMessage.category);
    
    return (
      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedMessage(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl">{category?.icon}</span>
              <h3 className="text-xl font-bold text-white">{selectedMessage.subject}</h3>
            </div>
          </div>
          <div className={`px-3 py-1 rounded text-sm font-semibold ${getPriorityColor(selectedMessage.priority)}`}>
            {selectedMessage.priority.toUpperCase()}
          </div>
        </div>

        <div className="space-y-6">
          {/* Original Message */}
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-white">{selectedMessage.sender}</p>
                <p className="text-gray-400 text-sm">{selectedMessage.email}</p>
              </div>
              <p className="text-gray-400 text-sm">{formatTime(selectedMessage.createdAt)}</p>
            </div>
            <p className="text-gray-300">{selectedMessage.content}</p>
          </div>

          {/* Replies */}
          {selectedMessage.replies?.map(reply => (
            <div key={reply.id} className={`p-4 rounded-lg border ${
              reply.isAdmin 
                ? 'bg-blue-500/10 border-blue-500/20 ml-8' 
                : 'bg-gray-900/50 border-gray-600 mr-8'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`font-semibold ${reply.isAdmin ? 'text-blue-400' : 'text-white'}`}>
                  {reply.sender} {reply.isAdmin && '(Admin)'}
                </p>
                <p className="text-gray-400 text-sm">{formatTime(reply.createdAt)}</p>
              </div>
              <p className="text-gray-300">{reply.content}</p>
            </div>
          ))}

          {/* Reply Form */}
          {selectedMessage.status === 'new' && (
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
              <h4 className="text-white font-semibold mb-3">Reply</h4>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply..."
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 min-h-[100px]"
              />
              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded font-semibold"
                >
                  <Send className="w-4 h-4" />
                  Send Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Message List View
  const category = CATEGORIES.find(cat => cat.key === selectedCategory);
  
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Categories
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{category?.icon}</span>
            <h3 className="text-xl font-bold text-white">{category?.label}</h3>
          </div>
        </div>
        <div className="text-gray-400">
          {filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No messages in this category</p>
          </div>
        ) : (
          filteredMessages.map(message => (
            <button
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className="w-full text-left p-4 bg-gray-900/50 hover:bg-gray-900/70 rounded-lg border border-gray-600 hover:border-gray-500 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    message.status === 'new' ? 'bg-green-400' : 'bg-gray-600'
                  }`}></div>
                  <p className="font-semibold text-white">{message.subject}</p>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(message.priority)}`}>
                    {message.priority}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {message.status === 'actioned' && <CheckCircle className="w-4 h-4 text-green-400" />}
                  <p className="text-gray-400 text-sm">{formatTime(message.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-300 text-sm truncate flex-1">{message.sender} - {message.content}</p>
                {message.replies && message.replies.length > 0 && (
                  <span className="text-blue-400 text-xs ml-2">{message.replies.length} repl{message.replies.length === 1 ? 'y' : 'ies'}</span>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
