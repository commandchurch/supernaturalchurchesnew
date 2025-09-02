import React, { useState } from 'react';
import { Activity, Database, Mail, CreditCard, Shield, Cloud, Server, Wifi, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function SystemStatusAdmin() {
  // System status data
  const systemServices = [
    {
      name: 'API Services',
      provider: 'Encore.dev',
      status: 'operational',
      responseTime: '28ms',
      uptime: '99.9%',
      icon: <Server className="h-5 w-5" />,
      description: 'Backend API and microservices'
    },
    {
      name: 'Database',
      provider: 'PostgreSQL (Encore Cloud)',
      status: 'operational',
      responseTime: '45ms',
      uptime: '99.8%',
      icon: <Database className="h-5 w-5" />,
      description: 'Primary database cluster'
    },
    {
      name: 'Authentication',
      provider: 'Clerk',
      status: 'operational',
      responseTime: '120ms',
      uptime: '99.9%',
      icon: <Shield className="h-5 w-5" />,
      description: 'User authentication and management'
    },
    {
      name: 'Billing & Payments',
      provider: 'Stripe',
      status: 'operational',
      responseTime: '85ms',
      uptime: '99.9%',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Payment processing and subscriptions'
    },
    {
      name: 'Email Service',
      provider: 'SendGrid',
      status: 'degraded',
      responseTime: '340ms',
      uptime: '98.2%',
      icon: <Mail className="h-5 w-5" />,
      description: 'Email delivery and notifications'
    },
    {
      name: 'Frontend Hosting',
      provider: 'Vercel',
      status: 'operational',
      responseTime: '12ms',
      uptime: '100%',
      icon: <Cloud className="h-5 w-5" />,
      description: 'Frontend application hosting'
    },
    {
      name: 'CDN & Storage',
      provider: 'AWS S3/CloudFront',
      status: 'operational',
      responseTime: '65ms',
      uptime: '99.9%',
      icon: <Wifi className="h-5 w-5" />,
      description: 'File storage and content delivery'
    }
  ];

  // Urgent tasks (over 24 hours) - oldest first - EXAMPLE ONLY
  const urgentTasks = [
    {
      id: 1,
      title: 'Email Service Performance Issues - EXAMPLE',
      age: '3 days',
      priority: 'critical',
      assignee: 'DevOps Team',
      description: 'EXAMPLE: SendGrid response times degraded, affecting user notifications'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-600 text-white';
      case 'degraded': return 'bg-yellow-600 text-white';
      case 'outage': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'degraded': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'outage': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">System Status & Technical Overview</h2>
          </div>
        </div>

        {/* Urgent Tasks Section - Always First */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
            Urgent Tasks (Over 24 Hours) - Oldest First
          </h3>
          <div className="space-y-3">
            {urgentTasks.map((task) => (
              <div key={task.id} className="bg-gray-800/50 border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </span>
                    <span className="text-red-400 font-medium">{task.age}</span>
                    <h4 className="text-white font-medium">{task.title}</h4>
                  </div>
                  <span className="text-gray-400 text-sm">{task.assignee}</span>
                </div>
                <p className="text-gray-300 text-sm">{task.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Status Overview */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemServices.map((service) => (
              <div key={service.name} className="bg-gray-800/50 border border-gray-700 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {service.icon}
                    <h4 className="text-white font-medium">{service.name}</h4>
                  </div>
                  {getStatusIcon(service.status)}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Provider:</span>
                    <span className="text-white">{service.provider}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-1 text-xs ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Response Time:</span>
                    <span className="text-white">{service.responseTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Uptime:</span>
                    <span className="text-green-400">{service.uptime}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Overview */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Technical Architecture</h3>
          <div className="bg-gray-800/50 border border-gray-700 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Core Infrastructure</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Backend Framework:</span>
                    <span className="text-white">Encore.dev (TypeScript)</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Frontend Framework:</span>
                    <span className="text-white">React + Vite + TypeScript</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Database:</span>
                    <span className="text-white">PostgreSQL</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Hosting:</span>
                    <span className="text-white">Vercel (Frontend) + Encore Cloud (Backend)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">Third-Party Services</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Authentication:</span>
                    <span className="text-white">Clerk</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Payments:</span>
                    <span className="text-white">Stripe</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white">SendGrid</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Storage:</span>
                    <span className="text-white">AWS S3</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Overall System Health */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-600 p-4 text-white border border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-100">Services Online</p>
                <p className="text-2xl font-bold">6/7</p>
              </div>
              <CheckCircle className="h-6 w-6 text-green-200" />
            </div>
          </div>

          <div className="bg-yellow-600 p-4 text-white border border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-100">Degraded Services</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-yellow-200" />
            </div>
          </div>

          <div className="bg-blue-600 p-4 text-white border border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-100">Avg Response Time</p>
                <p className="text-2xl font-bold">98ms</p>
              </div>
              <Activity className="h-6 w-6 text-blue-200" />
            </div>
          </div>

          <div className="bg-purple-600 p-4 text-white border border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-100">Overall Uptime</p>
                <p className="text-2xl font-bold">99.6%</p>
              </div>
              <Server className="h-6 w-6 text-purple-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
