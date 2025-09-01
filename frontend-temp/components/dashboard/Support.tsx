import React, { useState } from 'react';
import { LifeBuoy, Mail, Ticket, Send, CheckCircle, User, Clock } from 'lucide-react';

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
  lastUpdated: string;
}

export default function Support() {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'Medium' as const,
    category: 'General'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock existing tickets
  const [tickets] = useState<SupportTicket[]>([
    {
      id: 'TK-001',
      subject: 'Payment not processing',
      description: 'My membership payment is failing to process through Stripe.',
      priority: 'High',
      status: 'In Progress',
      createdAt: '2025-01-01T10:00:00Z',
      lastUpdated: '2025-01-02T14:30:00Z'
    },
    {
      id: 'TK-002',
      subject: 'Course video not loading',
      description: 'The Evangelism Essentials course videos are not loading properly.',
      priority: 'Medium',
      status: 'Resolved',
      createdAt: '2024-12-28T15:20:00Z',
      lastUpdated: '2024-12-29T09:45:00Z'
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Support ticket submitted successfully! You will receive a confirmation email shortly.');
    setFormData({
      subject: '',
      description: '',
      priority: 'Medium',
      category: 'General'
    });
    setShowTicketForm(false);
    setIsSubmitting(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-blue-400';
      case 'In Progress': return 'text-yellow-400';
      case 'Resolved': return 'text-green-400';
      case 'Closed': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-orange-400';
      case 'Urgent': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <LifeBuoy className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Technical Support</h2>
        </div>
        <p className="text-gray-400 text-sm mb-6">
          Need help with your account, billing, or have a technical issue? Our team is here to assist you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => setShowTicketForm(true)}
            className="bg-orange-500 text-white hover:bg-orange-600 p-4 flex items-center gap-3 transition-colors font-semibold uppercase tracking-wide"
          >
            <Ticket className="h-6 w-6" />
            <div className="text-left">
              <p>Create Support Ticket</p>
              <p className="text-sm font-normal opacity-90">Get priority support with ticket tracking</p>
            </div>
          </button>
          
          <a 
            href="mailto:support@supernatural.institute" 
            className="bg-gray-700/50 border border-gray-600 p-4 flex items-center gap-3 hover:bg-gray-700 transition-colors"
          >
            <Mail className="h-6 w-6 text-blue-400" />
            <div>
              <p className="font-semibold text-white">Email Support</p>
              <p className="text-sm text-gray-400">support@supernatural.institute</p>
            </div>
          </a>
        </div>
      </div>

      {/* Ticket Form */}
      {showTicketForm && (
        <div className="bg-gray-800/50 border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Create Support Ticket</h3>
            <button 
              onClick={() => setShowTicketForm(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2"
                  required
                >
                  <option value="General">General Support</option>
                  <option value="Billing">Billing & Payments</option>
                  <option value="Technical">Technical Issues</option>
                  <option value="Account">Account & Profile</option>
                  <option value="Courses">Course Access</option>
                  <option value="Affiliate">Affiliate Program</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2 text-sm">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2 text-sm">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2"
                placeholder="Brief description of your issue"
                required
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2 text-sm">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2"
                placeholder="Please provide detailed information about your issue, including any error messages and steps to reproduce the problem."
                required
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowTicketForm(false)}
                className="px-4 py-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2 font-semibold uppercase tracking-wide inline-flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Existing Tickets */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Your Support Tickets</h3>
        
        {tickets.length === 0 ? (
          <div className="text-center py-8">
            <Ticket className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No support tickets found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white/5 border border-white/10 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white font-mono text-sm">{ticket.id}</span>
                      <span className={`text-sm font-semibold ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(ticket.priority)} bg-gray-700`}>
                        {ticket.priority}
                      </span>
                    </div>
                    
                    <h4 className="text-white font-semibold mb-2">{ticket.subject}</h4>
                    <p className="text-gray-400 text-sm mb-3">{ticket.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Created: {new Date(ticket.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Updated: {new Date(ticket.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {ticket.status === 'Resolved' && (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
