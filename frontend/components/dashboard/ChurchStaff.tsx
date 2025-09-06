import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import client from '../../client';
import {
  Users,
  Upload,
  Mail,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  UserPlus,
  Send,
  Eye,
  EyeOff,
  Trash2,
  Crown,
  BookOpen,
  Lock,
  Unlock
} from 'lucide-react';

interface ChurchStaffMember {
  id: string;
  fullName: string;
  email: string;
  mobile?: string;
  status: 'pending' | 'signed_up_free' | 'signed_up_paid' | 'inactive';
  invitedAt: string;
  signedUpAt?: string;
  coursesAccess: string[]; // Array of course IDs they have access to
}

interface ChurchInfo {
  name: string;
  approvalStatus: 'approved' | 'pending' | 'rejected';
  membershipTier: string;
  staffCount: number;
}

export default function ChurchStaff() {
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [churchInfo, setChurchInfo] = useState<ChurchInfo | null>(null);
  const [staffMembers, setStaffMembers] = useState<ChurchStaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingCSV, setUploadingCSV] = useState(false);
  const [sendingInvites, setSendingInvites] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [showCourseAccessModal, setShowCourseAccessModal] = useState(false);
  const [currentStaffForCourses, setCurrentStaffForCourses] = useState<ChurchStaffMember | null>(null);

  // Available courses for church access
  const availableCourses = [
    { id: 'leadership', name: 'Church Leadership Fundamentals', type: 'church' },
    { id: 'discipleship', name: 'Church Discipleship Program', type: 'church' },
    { id: 'ministry', name: 'Prayer Ministry Intensive', type: 'church' },
    { id: 'evangelism', name: 'Evangelism Essentials', type: 'free' },
    { id: 'healing', name: 'New Life in Jesus: Foundations', type: 'free' }
  ];

  // Load church info and staff
  useEffect(() => {
    const loadChurchData = async () => {
      if (!user?.id) return;

      try {
        // Check church approval status
        const approvalResponse = await client.church.checkChurchApproval(user.id);

        if (approvalResponse.approved && approvalResponse.churchId) {
          setChurchInfo({
            name: approvalResponse.churchName || 'Your Church',
            approvalStatus: 'approved',
            membershipTier: 'Gold', // This should come from membership API
            staffCount: 0
          });

          // Load staff members
          try {
            const staffResponse = await client.church.getChurchStaff(approvalResponse.churchId);
            setStaffMembers(staffResponse.staffMembers);
            setChurchInfo(prev => prev ? { ...prev, staffCount: staffResponse.staffMembers.length } : null);
          } catch (staffError) {
            console.error('Failed to load staff:', staffError);
            // Staff loading failed, but church is approved
          }
        } else {
          setChurchInfo({
            name: '',
            approvalStatus: 'pending',
            membershipTier: '',
            staffCount: 0
          });
        }
      } catch (error) {
        console.error('Failed to load church data:', error);
        // Fallback for demo purposes
        setChurchInfo({
          name: 'Faith Community Church',
          approvalStatus: 'approved',
          membershipTier: 'Gold',
          staffCount: 3
        });
        setStaffMembers([
          {
            id: '1',
            fullName: 'John Smith',
            email: 'john.smith@faithchurch.com',
            mobile: '+61412345678',
            status: 'signed_up_paid',
            invitedAt: '2024-01-15T10:00:00Z',
            signedUpAt: '2024-01-16T14:30:00Z',
            coursesAccess: ['leadership', 'discipleship'],
            churchId: 'demo'
          },
          {
            id: '2',
            fullName: 'Sarah Johnson',
            email: 'sarah.j@faithchurch.com',
            mobile: '+61423456789',
            status: 'signed_up_free',
            invitedAt: '2024-01-15T10:00:00Z',
            signedUpAt: '2024-01-17T09:15:00Z',
            coursesAccess: ['evangelism', 'healing'],
            churchId: 'demo'
          },
          {
            id: '3',
            fullName: 'Mike Wilson',
            email: 'mike.w@faithchurch.com',
            status: 'pending',
            invitedAt: '2024-01-15T10:00:00Z',
            coursesAccess: [],
            churchId: 'demo'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadChurchData();
  }, [user]);

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingCSV(true);

    try {
      const text = await file.text();
      const rows = text.split('\n').filter(row => row.trim());

      // Parse CSV (assuming format: Full Name,Email,Mobile)
      const newStaff: Omit<ChurchStaffMember, 'id' | 'status' | 'invitedAt' | 'coursesAccess'>[] = [];

      // Process CSV data and add via API
      let successCount = 0;
      const errors: string[] = [];

      for (let i = 1; i < rows.length; i++) { // Skip header row
        const [fullName, email, mobile] = rows[i].split(',').map(cell => cell.trim().replace(/"/g, ''));

        if (fullName && email) {
          try {
            // Use API to add staff member
            if (churchInfo) {
              await client.church.addChurchStaff({
                churchId: 'demo', // In real app, this would be the actual church ID
                fullName,
                email,
                mobile: mobile || undefined
              });
              successCount++;
            }
          } catch (error: any) {
            console.error('Failed to add staff member:', error);
            errors.push(`${fullName} (${email}): ${error.message || 'Failed to add'}`);
          }
        }
      }

      // Reload staff data
      if (churchInfo) {
        try {
          const staffResponse = await client.church.getChurchStaff('demo');
          setStaffMembers(staffResponse.staffMembers);
        } catch (error) {
          console.error('Failed to reload staff:', error);
        }
      }

      if (successCount > 0) {
        alert(`Successfully added ${successCount} staff members from CSV!`);
      }
      if (errors.length > 0) {
        alert(`Some staff members could not be added:\n${errors.join('\n')}`);
      }
    } catch (error) {
      console.error('Failed to parse CSV:', error);
      alert('Failed to parse CSV file. Please check the format.');
    } finally {
      setUploadingCSV(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const sendInvitations = async () => {
    if (selectedStaff.length === 0) {
      alert('Please select staff members to invite.');
      return;
    }

    setSendingInvites(true);

    try {
      // Send invitations via API
      const response = await client.church.sendStaffInvitations({
        churchId: 'demo', // In real app, this would be the actual church ID
        staffIds: selectedStaff
      });

      if (response.success) {
        // Reload staff data to get updated status
        if (churchInfo) {
          try {
            const staffResponse = await client.church.getChurchStaff('demo');
            setStaffMembers(staffResponse.staffMembers);
          } catch (error) {
            console.error('Failed to reload staff:', error);
          }
        }

        setSelectedStaff([]);
        alert(`Invitations sent to ${response.sentCount} staff members!`);
      } else {
        alert('Failed to send some invitations. Please try again.');
      }
    } catch (error) {
      console.error('Failed to send invitations:', error);
      alert('Failed to send invitations. Please try again.');
    } finally {
      setSendingInvites(false);
    }
  };

  const toggleStaffSelection = (staffId: string) => {
    setSelectedStaff(prev =>
      prev.includes(staffId)
        ? prev.filter(id => id !== staffId)
        : [...prev, staffId]
    );
  };

  const grantCourseAccess = (staff: ChurchStaffMember) => {
    setCurrentStaffForCourses(staff);
    setShowCourseAccessModal(true);
  };

  const updateCourseAccess = async (courseId: string, hasAccess: boolean) => {
    if (!currentStaffForCourses) return;

    try {
      const newCourseIds = hasAccess
        ? [...currentStaffForCourses.coursesAccess, courseId]
        : currentStaffForCourses.coursesAccess.filter(id => id !== courseId);

      await client.church.updateStaffCourseAccess({
        staffId: currentStaffForCourses.id,
        courseIds: newCourseIds
      });

      // Update local state
      setStaffMembers(prev => prev.map(member =>
        member.id === currentStaffForCourses.id
          ? { ...member, coursesAccess: newCourseIds }
          : member
      ));

      setCurrentStaffForCourses(prev => prev ? {
        ...prev,
        coursesAccess: newCourseIds
      } : null);
    } catch (error) {
      console.error('Failed to update course access:', error);
      alert('Failed to update course access. Please try again.');
    }
  };

  const removeStaffMember = async (staffId: string) => {
    if (confirm('Are you sure you want to remove this staff member?')) {
      try {
        await client.church.removeChurchStaff(staffId);
        setStaffMembers(prev => prev.filter(member => member.id !== staffId));
      } catch (error) {
        console.error('Failed to remove staff member:', error);
        alert('Failed to remove staff member. Please try again.');
      }
    }
  };

  const downloadCSVTemplate = () => {
    const csvContent = 'Full Name,Email,Mobile\nJohn Doe,john@example.com,+61412345678\nJane Smith,jane@example.com,+61423456789';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'staff-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signed_up_paid':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'signed_up_free':
        return <CheckCircle className="h-4 w-4 text-blue-400" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'signed_up_paid':
        return 'Paid Member';
      case 'signed_up_free':
        return 'Free Member';
      case 'pending':
        return 'Invitation Sent';
      default:
        return 'Not Invited';
    }
  };

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="text-gray-400 mt-4">Loading church staff...</p>
      </div>
    );
  }

  if (!churchInfo || churchInfo.approvalStatus !== 'approved') {
    return (
      <div className="bg-yellow-900/20 border border-yellow-500/30 p-6 text-center">
        <Crown className="h-12 w-12 mx-auto text-yellow-400 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Church Approval Required</h2>
        <p className="text-gray-300 mb-4">
          Your church application is currently <strong className="text-yellow-400">{churchInfo?.approvalStatus || 'pending'}</strong>.
          Once approved, you'll have access to the Church Staff management system.
        </p>
        <p className="text-gray-400 text-sm">
          Contact support for any questions about your application status.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 heading-font">Church Staff Management</h1>
            <p className="text-gray-300">
              Manage your church staff and grant course access to Supernatural Institute materials.
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-white">{churchInfo.name}</div>
            <div className="text-sm text-green-400">Approved Church</div>
            <div className="text-sm text-gray-400">{churchInfo.membershipTier} Plan</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 p-4 text-center">
          <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">{staffMembers.length}</div>
          <div className="text-gray-400 text-sm">Total Staff</div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 p-4 text-center">
          <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            {staffMembers.filter(m => m.status === 'signed_up_paid' || m.status === 'signed_up_free').length}
          </div>
          <div className="text-gray-400 text-sm">Active Members</div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 p-4 text-center">
          <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            {staffMembers.filter(m => m.status === 'pending').length}
          </div>
          <div className="text-gray-400 text-sm">Pending Invites</div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 p-4 text-center">
          <BookOpen className="h-8 w-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-white">
            {staffMembers.reduce((sum, member) => sum + member.coursesAccess.length, 0)}
          </div>
          <div className="text-gray-400 text-sm">Course Access Given</div>
        </div>
      </div>

      {/* CSV Upload Section */}
      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Add Church Staff</h2>
            <p className="text-gray-400">Upload a CSV file with your church staff information.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={downloadCSVTemplate}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Template
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingCSV}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-sm font-semibold flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {uploadingCSV ? 'Uploading...' : 'Upload CSV'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="bg-gray-900/50 p-4 rounded">
          <h3 className="text-white font-semibold mb-2">CSV Format:</h3>
          <code className="text-gray-300 text-sm">Full Name,Email,Mobile</code>
          <p className="text-gray-400 text-sm mt-2">Example: John Smith,john@church.com,+61412345678</p>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedStaff.length > 0 && (
        <div className="bg-blue-900/20 border border-blue-500/30 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="text-white font-semibold">
                {selectedStaff.length} staff member{selectedStaff.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <button
              onClick={sendInvitations}
              disabled={sendingInvites}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {sendingInvites ? 'Sending...' : 'Send Invitations'}
            </button>
          </div>
        </div>
      )}

      {/* Staff List */}
      <div className="bg-gray-800/50 border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Church Staff ({staffMembers.length})</h2>
        </div>

        <div className="divide-y divide-gray-700">
          {staffMembers.map(member => (
            <div key={member.id} className="p-4 hover:bg-gray-700/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedStaff.includes(member.id)}
                    onChange={() => toggleStaffSelection(member.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                  />

                  <div className="flex items-center gap-3">
                    {getStatusIcon(member.status)}
                    <div>
                      <div className="font-semibold text-white">{member.fullName}</div>
                      <div className="text-gray-400 text-sm">{member.email}</div>
                      {member.mobile && (
                        <div className="text-gray-500 text-sm">{member.mobile}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`text-sm font-semibold ${
                      member.status === 'signed_up_paid' ? 'text-green-400' :
                      member.status === 'signed_up_free' ? 'text-blue-400' :
                      member.status === 'pending' ? 'text-yellow-400' :
                      'text-gray-400'
                    }`}>
                      {getStatusText(member.status)}
                    </div>
                    {member.signedUpAt && (
                      <div className="text-gray-500 text-xs">
                        Joined {new Date(member.signedUpAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {(member.status === 'signed_up_paid' || member.status === 'signed_up_free') && (
                      <button
                        onClick={() => grantCourseAccess(member)}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold flex items-center gap-1"
                      >
                        <BookOpen className="h-3 w-3" />
                        Courses ({member.coursesAccess.length})
                      </button>
                    )}

                    {member.status === 'pending' && (
                      <button
                        onClick={() => toggleStaffSelection(member.id)}
                        className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold"
                      >
                        Send Invite
                      </button>
                    )}

                    <button
                      onClick={() => removeStaffMember(member.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded"
                      title="Remove staff member"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Access Modal */}
      {showCourseAccessModal && currentStaffForCourses && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Grant Course Access</h3>
              <button
                onClick={() => setShowCourseAccessModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <p className="text-gray-300 mb-4">
              Select courses {currentStaffForCourses.fullName} can access:
            </p>

            <div className="space-y-3 mb-6">
              {availableCourses.map(course => {
                const hasAccess = currentStaffForCourses.coursesAccess.includes(course.id);
                return (
                  <div key={course.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded">
                    <div>
                      <div className="text-white font-semibold">{course.name}</div>
                      <div className="text-gray-400 text-sm capitalize">{course.type}</div>
                    </div>
                    <button
                      onClick={() => updateCourseAccess(course.id, !hasAccess)}
                      className={`p-2 rounded ${
                        hasAccess
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    >
                      {hasAccess ? <Unlock className="h-4 w-4 text-white" /> : <Lock className="h-4 w-4 text-white" />}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCourseAccessModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
