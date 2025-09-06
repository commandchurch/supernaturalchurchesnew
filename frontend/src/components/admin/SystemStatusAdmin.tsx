import React, { useState, useEffect } from 'react';
import { Shield, Database, AlertTriangle, Lock, Server, Clock, CheckCircle, XCircle, Activity, Zap, Users, Key, HardDrive, FileText, Search, Bell } from 'lucide-react';

interface SOC2ComplianceItem {
  id: string;
  title: string;
  description: string;
  status: 'compliant' | 'non-compliant' | 'in-progress' | 'pending';
  lastChecked: string;
  nextCheck: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

export default function SystemStatusAdmin() {
  const [complianceItems, setComplianceItems] = useState<SOC2ComplianceItem[]>([
    {
      id: 'db-encryption-rest',
      title: 'Database Encryption (At Rest)',
      description: 'AES-256 encryption for all database files and backups',
      status: 'compliant',
      lastChecked: '2024-09-05T10:00:00Z',
      nextCheck: '2024-09-12T10:00:00Z',
      priority: 'high',
      category: 'Database Security'
    },
    {
      id: 'db-encryption-transit',
      title: 'Database Encryption (In Transit)',
      description: 'TLS 1.3 encryption for all database connections',
      status: 'compliant',
      lastChecked: '2024-09-05T10:00:00Z',
      nextCheck: '2024-09-12T10:00:00Z',
      priority: 'high',
      category: 'Database Security'
    },
    {
      id: 'real-time-monitoring',
      title: 'Real-time Monitoring & Alerting',
      description: '24/7 system monitoring with automated alerts for security events',
      status: 'compliant',
      lastChecked: '2024-09-05T09:30:00Z',
      nextCheck: '2024-09-05T15:30:00Z',
      priority: 'high',
      category: 'Monitoring'
    },
    {
      id: 'rbac-system',
      title: 'Role-Based Access Controls',
      description: 'Granular permissions system with least privilege principle',
      status: 'compliant',
      lastChecked: '2024-09-04T14:00:00Z',
      nextCheck: '2024-09-11T14:00:00Z',
      priority: 'high',
      category: 'Access Control'
    },
    {
      id: 'automated-backups',
      title: 'Automated Backups',
      description: 'Daily encrypted backups with 30-day retention and integrity verification',
      status: 'compliant',
      lastChecked: '2024-09-05T02:00:00Z',
      nextCheck: '2024-09-06T02:00:00Z',
      priority: 'high',
      category: 'Backup & Recovery'
    },
    {
      id: 'backup-recovery-testing',
      title: 'Backup Recovery Testing',
      description: 'Monthly automated recovery testing with integrity validation',
      status: 'in-progress',
      lastChecked: '2024-09-01T02:00:00Z',
      nextCheck: '2024-09-15T02:00:00Z',
      priority: 'medium',
      category: 'Backup & Recovery'
    },
    {
      id: 'audit-logging-external',
      title: 'External Audit Logging',
      description: 'Comprehensive audit logs sent to external SIEM system',
      status: 'compliant',
      lastChecked: '2024-09-05T08:00:00Z',
      nextCheck: '2024-09-05T14:00:00Z',
      priority: 'high',
      category: 'Logging'
    },
    {
      id: 'security-assessments',
      title: 'Security Assessments',
      description: 'Quarterly security assessments and vulnerability scans',
      status: 'pending',
      lastChecked: '2024-06-15T10:00:00Z',
      nextCheck: '2024-09-15T10:00:00Z',
      priority: 'medium',
      category: 'Security Testing'
    },
    {
      id: 'penetration-testing',
      title: 'Penetration Testing',
      description: 'Annual penetration testing by certified security professionals',
      status: 'pending',
      lastChecked: '2024-03-01T10:00:00Z',
      nextCheck: '2024-12-01T10:00:00Z',
      priority: 'medium',
      category: 'Security Testing'
    },
    {
      id: 'intrusion-detection',
      title: 'Intrusion Detection System',
      description: 'Real-time IDS monitoring for unauthorized access attempts',
      status: 'compliant',
      lastChecked: '2024-09-05T09:00:00Z',
      nextCheck: '2024-09-05T15:00:00Z',
      priority: 'high',
      category: 'Monitoring'
    },
    {
      id: 'data-classification',
      title: 'Data Classification & Handling',
      description: 'Proper classification and handling procedures for sensitive data',
      status: 'compliant',
      lastChecked: '2024-09-03T11:00:00Z',
      nextCheck: '2024-09-17T11:00:00Z',
      priority: 'medium',
      category: 'Data Protection'
    },
    {
      id: 'incident-response',
      title: 'Incident Response Plan',
      description: 'Documented and tested incident response procedures',
      status: 'compliant',
      lastChecked: '2024-08-20T10:00:00Z',
      nextCheck: '2024-11-20T10:00:00Z',
      priority: 'high',
      category: 'Incident Management'
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    uptime: '99.9%',
    responseTime: '45ms',
    activeUsers: 1247,
    securityAlerts: 0,
    lastBackup: '2024-09-05T02:00:00Z',
    encryptionStatus: 'Active'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-400';
      case 'non-compliant': return 'text-red-400';
      case 'in-progress': return 'text-yellow-400';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'non-compliant': return <XCircle className="h-5 w-5 text-red-400" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-yellow-400" />;
      case 'pending': return <AlertTriangle className="h-5 w-5 text-gray-400" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const categories = [...new Set(complianceItems.map(item => item.category))];

  return (
    <div className="space-y-6">
      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">System Uptime</p>
              <p className="text-2xl font-bold text-green-400">{systemMetrics.uptime}</p>
            </div>
            <Server className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Response Time</p>
              <p className="text-2xl font-bold text-blue-400">{systemMetrics.responseTime}</p>
            </div>
            <Zap className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-purple-400">{systemMetrics.activeUsers.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Security Alerts</p>
              <p className="text-2xl font-bold text-orange-400">{systemMetrics.securityAlerts}</p>
            </div>
            <Bell className="h-8 w-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* SOC2 Compliance Status */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">SOC2 Compliance Status</h2>
        </div>

        {/* Compliance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-green-400 font-semibold">
                {complianceItems.filter(item => item.status === 'compliant').length} Compliant
              </span>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">
                {complianceItems.filter(item => item.status === 'in-progress').length} In Progress
              </span>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              <span className="text-red-400 font-semibold">
                {complianceItems.filter(item => item.status === 'non-compliant').length} Non-Compliant
              </span>
            </div>
          </div>

          <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400 font-semibold">
                {complianceItems.filter(item => item.status === 'pending').length} Pending
              </span>
            </div>
          </div>
        </div>

        {/* Compliance Items by Category */}
        {categories.map(category => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              {category === 'Database Security' && <Database className="h-5 w-5 text-blue-400" />}
              {category === 'Monitoring' && <Activity className="h-5 w-5 text-green-400" />}
              {category === 'Access Control' && <Key className="h-5 w-5 text-purple-400" />}
              {category === 'Backup & Recovery' && <HardDrive className="h-5 w-5 text-orange-400" />}
              {category === 'Logging' && <FileText className="h-5 w-5 text-yellow-400" />}
              {category === 'Security Testing' && <Search className="h-5 w-5 text-red-400" />}
              {category === 'Data Protection' && <Lock className="h-5 w-5 text-indigo-400" />}
              {category === 'Incident Management' && <AlertTriangle className="h-5 w-5 text-pink-400" />}
              {category}
            </h3>

            <div className="space-y-3">
              {complianceItems
                .filter(item => item.category === category)
                .map(item => (
                  <div key={item.id} className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(item.status)}
                          <h4 className="font-semibold text-white">{item.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(item.priority)}`}>
                            {item.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Last checked: {new Date(item.lastChecked).toLocaleDateString()}</span>
                          <span>Next check: {new Date(item.nextCheck).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`font-semibold ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Security Events */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-6 w-6 text-orange-400" />
          <h2 className="text-xl font-bold text-white">Recent Security Events</h2>
        </div>

        <div className="space-y-3">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-green-400 font-semibold">Database Backup Completed</p>
                <p className="text-gray-400 text-sm">Automated daily backup completed successfully at 2:00 AM UTC</p>
              </div>
              <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-blue-400 font-semibold">Security Scan Completed</p>
                <p className="text-gray-400 text-sm">Automated vulnerability scan found 0 critical issues</p>
              </div>
              <span className="text-gray-500 text-sm ml-auto">4 hours ago</span>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-yellow-400 font-semibold">Backup Recovery Test In Progress</p>
                <p className="text-gray-400 text-sm">Monthly automated recovery testing is currently running</p>
              </div>
              <span className="text-gray-500 text-sm ml-auto">6 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}