import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Archive,
  Filter,
  Search,
  X,
  ExternalLink,
  ChevronDown,
  Star,
  Reply,
  Send,
  ArrowLeft
} from 'lucide-react';
import { Message, MessageCategory, MessageService, MessageReply } from '../lib/messageSystem';
import { generateDemoMessages } from '../utils/demoMessageData';

interface EnhancedMessagesProps {
  isAdmin?: boolean;
  userId?: string;
}

export default function EnhancedMessages({ isAdmin = false, userId = 'demo-user' }: EnhancedMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'unread' | 'read' | 'archived'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Load demo messages - in real app this would come from backend
  useEffect(() => {
    const demoMessages = generateDemoMessages(userId);
    setMessages(demoMessages);
    setFilteredMessages(demoMessages);
  }, [userId]);

  // Filter messages based on category, status, and search
  useEffect(() => {
    let filtered = messages;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(msg => msg.category === selectedCategory);
    }
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(msg => msg.status === selectedStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredMessages(filtered);
  }, [messages, selectedCategory, selectedStatus, searchTerm]);

  const markAsRead = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, status: 'read' as const, readAt: new Date() }
        : msg
    ));
  };

  const markAsArchived = (messageId: string) => {
    setMessages(prev => MessageService.markMessageArchived(messageId, prev));
  };

  const handleReply = (messageId: string) => {
    if (!replyText.trim()) return;
    
    const reply = MessageService.addReply(
      messageId, 
      userId, 
      isAdmin ? 'admin' : 'user', 
      replyText.trim()
    );

    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            replies: [...(msg.replies || []), reply],
            status: 'read' as const,
            readAt: new Date()
          }
        : msg
    ));
    
    setReplyText('');
    setShowReplyForm(false);
  };

  const toggleArchive = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            status: msg.status === 'archived' ? 'read' as const : 'archived' as const 
          }
        : msg
    ));
  };

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;
  const urgentCount = messages.filter(msg => msg.priority === 'urgent' && msg.status === 'unread').length;

  const categories: { value: MessageCategory | 'all'; label: string; count: number }[] = [
    { value: 'all', label: 'All Messages', count: messages.length },
    { value: 'church_partnership', label: 'Church Partnership', count: messages.filter(m => m.category === 'church_partnership').length },
    { value: 'membership', label: 'Membership', count: messages.filter(m => m.category === 'membership').length },
    { value: 'billing', label: 'Billing', count: messages.filter(m => m.category === 'billing').length },
    { value: 'training', label: 'Training & Certificates', count: messages.filter(m => m.category === 'training').length },
    { value: 'affiliate', label: 'Affiliate Program', count: messages.filter(m => m.category === 'affiliate').length },
    { value: 'events', label: 'Events', count: messages.filter(m => m.category === 'events').length },
    { value: 'testimonies', label: 'Testimonies', count: messages.filter(m => m.category === 'testimonies').length },
    { value: 'support', label: 'Support', count: messages.filter(m => m.category === 'support').length },
    { value: 'system', label: 'System Updates', count: messages.filter(m => m.category === 'system').length }
  ];

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">
              {isAdmin ? 'Admin Messages' : 'Messages'}
            </h2>
            {unreadCount > 0 && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
            {urgentCount > 0 && (
              <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {urgentCount} Urgent
              </span>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as MessageCategory | 'all')}
              className="bg-gray-800 border border-gray-600 text-white text-sm rounded px-3 py-1"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label} ({cat.count})
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'unread' | 'read' | 'archived')}
              className="bg-gray-800 border border-gray-600 text-white text-sm rounded px-3 py-1"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredMessages.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-600" />
            <p>No messages found</p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 border-b border-gray-700 hover:bg-gray-800/50 cursor-pointer transition-colors ${
                message.status === 'unread' ? 'bg-blue-500/5 border-l-4 border-l-blue-500' : ''
              } ${message.priority === 'urgent' ? 'bg-red-500/5 border-l-4 border-l-red-500' : ''}`}
              onClick={() => {
                setSelectedMessage(message);
                if (message.status === 'unread') {
                  markAsRead(message.id);
                }
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">
                      {MessageService.getPriorityIcon(message.priority)}
                    </span>
                    <h3 className={`font-semibold truncate ${
                      message.status === 'unread' ? 'text-white' : 'text-gray-300'
                    }`}>
                      {message.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded font-medium ${
                      MessageService.getCategoryColor(message.category) === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                      MessageService.getCategoryColor(message.category) === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                      MessageService.getCategoryColor(message.category) === 'green' ? 'bg-green-500/20 text-green-400' :
                      MessageService.getCategoryColor(message.category) === 'red' ? 'bg-red-500/20 text-red-400' :
                      MessageService.getCategoryColor(message.category) === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {message.category.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 truncate mb-2">
                    {message.content}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{message.createdAt.toLocaleString()}</span>
                    {message.actionRequired && (
                      <span className="text-orange-400 font-medium">Action Required</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {message.status === 'unread' && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleArchive(message.id);
                    }}
                    className="text-gray-500 hover:text-gray-300 p-1"
                    title={message.status === 'archived' ? 'Unarchive' : 'Archive'}
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-lg">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {MessageService.getPriorityIcon(selectedMessage.priority)}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedMessage.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {selectedMessage.createdAt.toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-4">
                <span className={`px-3 py-1 text-sm rounded font-medium ${
                  MessageService.getCategoryColor(selectedMessage.category) === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                  MessageService.getCategoryColor(selectedMessage.category) === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                  MessageService.getCategoryColor(selectedMessage.category) === 'green' ? 'bg-green-500/20 text-green-400' :
                  MessageService.getCategoryColor(selectedMessage.category) === 'red' ? 'bg-red-500/20 text-red-400' :
                  MessageService.getCategoryColor(selectedMessage.category) === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {selectedMessage.category.replace('_', ' ').toUpperCase()}
                </span>
                {selectedMessage.priority === 'urgent' && (
                  <span className="ml-2 px-3 py-1 text-sm bg-red-500/20 text-red-400 rounded font-medium">
                    URGENT
                  </span>
                )}
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.content}
                </p>
              </div>
              
              {/* Replies Section */}
              {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                <div className="mt-6 border-t border-gray-700 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Conversation</h4>
                  <div className="space-y-4">
                    {selectedMessage.replies.map((reply) => (
                      <div key={reply.id} className={`p-3 rounded ${reply.userRole === 'admin' ? 'bg-blue-500/10 border-l-2 border-l-blue-500' : 'bg-gray-800'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-sm font-medium ${reply.userRole === 'admin' ? 'text-blue-400' : 'text-gray-400'}`}>
                            {reply.userRole === 'admin' ? 'Admin' : 'You'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {reply.createdAt.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm whitespace-pre-wrap">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Reply Form */}
              {(selectedMessage.canReply !== false) && (
                <div className="mt-6 border-t border-gray-700 pt-6">
                  {!showReplyForm ? (
                    <button
                      onClick={() => setShowReplyForm(true)}
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Reply className="w-4 h-4" />
                      Reply to this message
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here..."
                        className="w-full h-24 bg-gray-800 border border-gray-600 text-white placeholder-gray-400 rounded px-3 py-2 resize-none focus:border-blue-500 focus:outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleReply(selectedMessage.id)}
                          disabled={!replyText.trim()}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded transition-colors"
                        >
                          <Send className="w-4 h-4" />
                          Send Reply
                        </button>
                        <button
                          onClick={() => {
                            setShowReplyForm(false);
                            setReplyText('');
                          }}
                          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {selectedMessage.actionRequired && selectedMessage.actionUrl && (
                <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded">
                  <p className="text-orange-400 font-medium mb-3">Action Required</p>
                  <a
                    href={selectedMessage.actionUrl}
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold transition-colors"
                  >
                    Take Action
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
              
              <div className="mt-6 flex gap-3 flex-wrap">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                >
                  Close
                </button>
                {selectedMessage.status === 'unread' && (
                  <button
                    onClick={() => {
                      markAsRead(selectedMessage.id);
                      setSelectedMessage(prev => prev ? {...prev, status: 'read' as const} : null);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => {
                    toggleArchive(selectedMessage.id);
                    setSelectedMessage(prev => prev ? {
                      ...prev, 
                      status: prev.status === 'archived' ? 'read' as const : 'archived' as const
                    } : null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                    selectedMessage.status === 'archived' 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-orange-600 hover:bg-orange-700 text-white'
                  }`}
                >
                  <Archive className="w-4 h-4" />
                  {selectedMessage.status === 'archived' ? 'Unarchive' : 'Archive'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
