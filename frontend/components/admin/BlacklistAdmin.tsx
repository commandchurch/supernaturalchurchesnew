import React, { useState } from 'react';
import { Shield, AlertTriangle, Search, Plus, X, Eye, UserX, Church } from 'lucide-react';

export default function BlacklistAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  // Biblical reference for blacklist functionality
  const biblicalReference = {
    verse: "Titus 3:10",
    text: "Reject a divisive man after the first and second admonition,",
    context: "knowing that such a person is warped and sinning, being self-condemned."
  };

  // Blacklisted entities - EXAMPLE DATA
  const blacklistedEntities = [
    {
      id: 1,
      type: 'individual',
      name: 'John Troublemaker - EXAMPLE',
      email: 'john@example.com',
      reason: 'Divisive behavior after multiple warnings',
      dateAdded: '2024-07-15',
      addedBy: 'Admin Team',
      status: 'active',
      notes: 'EXAMPLE: Repeatedly caused division in church community despite warnings. Applied Titus 3:10 protocol.',
      warnings: 2,
      churchAffiliation: 'Grace Community Church'
    },
    {
      id: 2,
      type: 'church',
      name: 'Prosperity First Ministry - EXAMPLE',
      email: 'contact@prosperityfirst.org',
      reason: 'False teaching and financial misconduct',
      dateAdded: '2024-06-20',
      addedBy: 'Leadership Team',
      status: 'active',
      notes: 'EXAMPLE: Promoting prosperity gospel and questionable financial practices.',
      warnings: 1,
      churchAffiliation: 'Independent'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'individual': return <UserX className="h-4 w-4 text-red-400" />;
      case 'church': return <Church className="h-4 w-4 text-orange-400" />;
      case 'ministry': return <Shield className="h-4 w-4 text-yellow-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-600 text-white';
      case 'under-review': return 'bg-yellow-600 text-white';
      case 'removed': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const filteredEntities = blacklistedEntities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || entity.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div className="bg-white/5 border border-white/10 p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
            <h2 className="text-lg sm:text-2xl font-bold text-white">Blacklist Management</h2>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Add to Blacklist</span>
          </button>
        </div>

        {/* Biblical Reference */}
        <div className="bg-yellow-600/20 border border-yellow-500/30 p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-yellow-400 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{biblicalReference.verse}</h3>
              <p className="text-white mb-1 text-sm sm:text-base">"{biblicalReference.text}"</p>
              <p className="text-gray-300 text-xs sm:text-sm italic">{biblicalReference.context}</p>
              <p className="text-gray-400 text-xs mt-1 sm:mt-2">
                Biblical protocol: First admonition → Second admonition → Rejection if unrepentant
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-red-600 p-2 sm:p-4 text-white border border-red-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-red-100">Active Blacklisted</p>
                <p className="text-lg sm:text-2xl font-bold">{blacklistedEntities.filter(e => e.status === 'active').length}</p>
              </div>
              <UserX className="h-4 w-4 sm:h-6 sm:w-6 text-red-200 mt-1 sm:mt-0" />
            </div>
          </div>

          <div className="bg-orange-600 p-2 sm:p-4 text-white border border-orange-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-orange-100">Individuals</p>
                <p className="text-lg sm:text-2xl font-bold">{blacklistedEntities.filter(e => e.type === 'individual').length}</p>
              </div>
              <UserX className="h-4 w-4 sm:h-6 sm:w-6 text-orange-200 mt-1 sm:mt-0" />
            </div>
          </div>

          <div className="bg-yellow-600 p-2 sm:p-4 text-white border border-yellow-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-yellow-100">Churches/Ministries</p>
                <p className="text-lg sm:text-2xl font-bold">{blacklistedEntities.filter(e => e.type === 'church' || e.type === 'ministry').length}</p>
              </div>
              <Church className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-200 mt-1 sm:mt-0" />
            </div>
          </div>

          <div className="bg-blue-600 p-2 sm:p-4 text-white border border-blue-500">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-blue-100">Under Review</p>
                <p className="text-lg sm:text-2xl font-bold">{blacklistedEntities.filter(e => e.status === 'under-review').length}</p>
              </div>
              <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-blue-200 mt-1 sm:mt-0" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 border border-gray-700 p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or reason..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 text-sm sm:text-base"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-red-500 text-sm sm:text-base"
            >
              <option value="all">All Types</option>
              <option value="individual">Individuals</option>
              <option value="church">Churches</option>
              <option value="ministry">Ministries</option>
            </select>
          </div>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-gray-800/50 border border-gray-700 p-3 sm:p-6 mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Add to Blacklist</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 mb-3 sm:mb-4">
              <input
                type="text"
                placeholder="Name"
                className="px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 text-sm sm:text-base"
              />
              <select className="px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-red-500 text-sm sm:text-base">
                <option value="">Select Type</option>
                <option value="individual">Individual</option>
                <option value="church">Church</option>
                <option value="ministry">Ministry</option>
              </select>
              <input
                type="text"
                placeholder="Church Affiliation"
                className="px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 text-sm sm:text-base"
              />
            </div>
            <textarea
              placeholder="Reason for blacklisting (include warnings given)..."
              rows={3}
              className="w-full px-3 sm:px-4 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 mb-3 sm:mb-4 text-sm sm:text-base"
            />
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm">
                Add to Blacklist - EXAMPLE
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Blacklist Entries */}
        <div className="space-y-3 sm:space-y-4">
          {filteredEntities.map((entity) => (
            <div key={entity.id} className="bg-gray-800/50 border border-gray-700 p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-3">
                <div className="flex items-start space-x-2 sm:space-x-4">
                  {getTypeIcon(entity.type)}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-xl font-bold text-white break-words">{entity.name}</h3>
                    <p className="text-gray-400 text-sm break-all">{entity.email}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{entity.churchAffiliation}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium ${getStatusColor(entity.status)}`}>
                    {entity.status.toUpperCase()}
                  </span>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">Added: {entity.dateAdded}</p>
                  <p className="text-gray-500 text-xs">Warnings: {entity.warnings}/2</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-3 sm:mb-4">
                <div>
                  <h4 className="text-sm sm:text-lg font-semibold text-white mb-1 sm:mb-2">Reason for Blacklisting</h4>
                  <p className="text-gray-300 text-sm">{entity.reason}</p>
                </div>

                <div>
                  <h4 className="text-sm sm:text-lg font-semibold text-white mb-1 sm:mb-2">Notes & Actions Taken</h4>
                  <p className="text-gray-300 text-xs sm:text-sm">{entity.notes}</p>
                  <p className="text-gray-500 text-xs mt-1 sm:mt-2">Added by: {entity.addedBy}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm flex items-center justify-center space-x-1 sm:space-x-2">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>View Details - EXAMPLE</span>
                </button>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm">
                  Review Status - EXAMPLE
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm">
                  Remove from Blacklist - EXAMPLE
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800/50 border border-gray-700 p-3 sm:p-6 mt-4 sm:mt-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Blacklist Management Guidelines</h3>
          <div className="space-y-2 sm:space-y-3 text-gray-300 text-xs sm:text-sm">
            <p>• <strong>Biblical Protocol:</strong> Follow Titus 3:10 - First admonition → Second admonition → Rejection if unrepentant</p>
            <p>• <strong>Documentation:</strong> Always document warnings given and reasons for blacklisting</p>
            <p>• <strong>Review Process:</strong> Quarterly review of all blacklisted entities for potential restoration</p>
            <p>• <strong>Types Covered:</strong> Individuals, churches, ministries, or organizations causing division</p>
            <p>• <strong>Restoration Path:</strong> Clear repentance and changed behavior can lead to removal from blacklist</p>
          </div>
          <p className="text-yellow-400 text-xs sm:text-sm mt-3 sm:mt-4">
            Note: This is an EXAMPLE implementation. All actions are non-functional for demonstration.
          </p>
        </div>
      </div>
    </div>
  );
}
