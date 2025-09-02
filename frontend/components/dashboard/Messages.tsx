import React, { useState } from 'react';
import { 
  MessageCircle, 
  Heart, 
  DollarSign, 
  Users, 
  Calendar, 
  Eye,
  Check,
  Filter,
  Reply,
  Send
} from 'lucide-react';

interface Message {
  id: string;
  type: 'help-me-fund' | 'prayer-request' | 'recruit';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  actioned: boolean;
  sender?: string;
  allowReply?: boolean;
}

export default function Messages() {
  const [filter, setFilter] = useState<'all' | 'help-me-fund' | 'prayer-request' | 'recruit' | 'actioned'>('all');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  
  // Mock messages data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'help-me-fund',
      title: 'Help Me Fund Application Approved',
      content: 'Your emergency medical bills request has been approved for $2,500 AUD. The funds will be transferred to your nominated account within 48 hours.',
      timestamp: '2025-01-02T14:30:00Z',
      read: false,
      actioned: false,
      sender: 'Ministry Team',
      allowReply: true
    },
    {
      id: '2',
      type: 'prayer-request',
      title: 'Prayer Request Response',
      content: 'Thank you for your prayer request regarding healing for your family member. We have prayed over this and believe God is moving. Stay strong in faith.',
      timestamp: '2025-01-01T09:15:00Z',
      read: false,
      actioned: false,
      sender: 'Senior Leader, Samuel Waterhouse',
      allowReply: true
    },
    {
      id: '3',
      type: 'recruit',
      title: 'New Recruit Signup',
      content: 'Congratulations! Sarah Johnson has joined the Silver membership through your affiliate link. You\'ve earned $6.60 AUD commission.',
      timestamp: '2024-12-30T16:45:00Z',
      read: true,
      actioned: true,
      sender: 'Affiliate System',
      allowReply: false
    },
    {
      id: '4',
      type: 'recruit',
      title: 'Monthly Commission Summary',
      content: 'Your total affiliate earnings for December 2024: $127.40 AUD from 6 new recruits. Payment will be processed within 5 business days.',
      timestamp: '2024-12-31T23:59:00Z',
      read: false,
      actioned: false,
      sender: 'Billing Department',
      allowReply: true
    },
    {
      id: '5',
      type: 'prayer-request',
      title: 'Prayer Request Follow-up',
      content: 'Following up on your prayer request for financial breakthrough. We continue to stand with you in faith. Remember Philippians 4:19 - God will supply all your needs.',
      timestamp: '2024-12-28T11:20:00Z',
      read: true,
      actioned: false,
      sender: 'Prayer Team',
      allowReply: true
    }
  ]);

  const filteredMessages = filter === 'all' 
    ? messages.filter(msg => !msg.actioned)
    : filter === 'actioned'
    ? messages.filter(msg => msg.actioned)
    : messages.filter(msg => msg.type === filter && !msg.actioned);

  const unreadCount = messages.filter(msg => !msg.read).length;

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  const markAsActioned = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, actioned: true, read: true } : msg
    ));
  };

  const sendReply = (messageId: string) => {
    if (!replyText.trim()) return;
    
    alert('Reply submitted successfully! Your message has been sent to the ministry team.');
    setReplyText('');
    setReplyingTo(null);
    markAsRead(messageId);
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'help-me-fund':
        return <DollarSign className="w-5 h-5 text-green-400" />;
      case 'prayer-request':
        return <Heart className="w-5 h-5 text-red-400" />;
      case 'recruit':
        return <Users className="w-5 h-5 text-blue-400" />;
      default:
        return <MessageCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white heading-font">
            Messages & Responses
          </h2>
          <p className="text-gray-400">
            {unreadCount > 0 ? `${unreadCount} unread messages` : 'All messages read'}
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
          >
            <option value="all">All Messages</option>
            <option value="help-me-fund">Help Me Fund</option>
            <option value="prayer-request">Prayer Requests</option>
            <option value="recruit">My Recruits</option>
            <option value="actioned">Actioned</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="bg-gray-800/50 border border-gray-700 p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Messages</h3>
            <p className="text-gray-400">
              {filter === 'all' 
                ? 'You have no messages at this time.'
                : `No ${filter.replace('-', ' ')} messages found.`
              }
            </p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`bg-gray-800/50 border border-gray-700 p-6 hover:bg-gray-800/70 transition-colors ${
                !message.read ? 'border-l-4 border-l-orange-500' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0">
                    {getMessageIcon(message.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${!message.read ? 'text-white' : 'text-gray-300'}`}>
                        {message.title}
                      </h3>
                      {!message.read && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                      {message.content}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(message.timestamp)}
                      </div>
                      {message.sender && (
                        <div>From: {message.sender}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!message.read && (
                    <button
                      onClick={() => markAsRead(message.id)}
                      className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded transition-colors"
                      title="Mark as read"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  
                  {!message.actioned && (
                    <button
                      onClick={() => markAsActioned(message.id)}
                      className="p-2 text-gray-400 hover:text-green-400 hover:bg-gray-700 rounded transition-colors"
                      title="Mark as actioned"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}

                  {message.allowReply && !message.actioned && (
                    <button
                      onClick={() => setReplyingTo(replyingTo === message.id ? null : message.id)}
                      className="p-2 text-gray-400 hover:text-orange-400 hover:bg-gray-700 rounded transition-colors"
                      title="Reply to message"
                    >
                      <Reply className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Reply Section */}
              {replyingTo === message.id && (
                <div className="mt-4 p-4 bg-gray-700/50 border border-gray-600 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Reply to {message.sender}:</h4>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    rows={4}
                    className="w-full bg-gray-600 border border-gray-500 text-white px-3 py-2 rounded text-sm focus:border-orange-400 focus:outline-none"
                  />
                  <div className="flex justify-end gap-3 mt-3">
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                      className="px-4 py-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => sendReply(message.id)}
                      className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 text-sm font-semibold uppercase tracking-wide inline-flex items-center gap-2"
                      disabled={!replyText.trim()}
                    >
                      <Send className="w-4 h-4" />
                      Submit Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-green-400" />
            <div>
              <h3 className="text-white font-semibold">Help Me Fund</h3>
              <p className="text-green-400 text-sm">
                {messages.filter(m => m.type === 'help-me-fund').length} responses
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-400" />
            <div>
              <h3 className="text-white font-semibold">Prayer Requests</h3>
              <p className="text-red-400 text-sm">
                {messages.filter(m => m.type === 'prayer-request').length} responses
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="text-white font-semibold">My Recruits</h3>
              <p className="text-blue-400 text-sm">
                {messages.filter(m => m.type === 'recruit').length} notifications
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
