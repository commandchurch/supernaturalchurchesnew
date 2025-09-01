import React, { useState } from 'react';
import { Shield, FileCheck, Users, Clock3, CheckCircle2, PlusCircle, Edit } from 'lucide-react';

type ComplianceData = { 
  categories: Array<{
    id: number;
    name: string;
    description?: string;
    icon?: string;
    color?: string;
    items: Array<{
      id: number;
      name: string;
      description?: string;
      isRequired: boolean;
      isCompleted: boolean;
      dueDate?: string;
      completedAt?: string;
      completedBy?: string;
      notes?: string;
      displayOrder: number;
    }>;
  }>
} | undefined;

interface ComplianceAdminProps {
  complianceData: ComplianceData;
  updateComplianceMutation: any;
  createCategoryMutation: any;
  createItemMutation: any;
  updateItemDetailsMutation: any;
}

export default function ComplianceAdmin({
  complianceData,
  updateComplianceMutation,
  createCategoryMutation,
  createItemMutation,
  updateItemDetailsMutation,
}: ComplianceAdminProps) {
  const [editingItem, setEditingItem] = useState<{ id: number; notes: string } | null>(null);

  const [newCategory, setNewCategory] = useState({ name: '', description: '', icon: 'Shield', color: 'blue', displayOrder: 0 });
  const [newItem, setNewItem] = useState({ categoryId: 0, name: '', description: '', isRequired: true, dueDate: '', displayOrder: 0 });

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCategoryMutation.mutateAsync({
      name: newCategory.name,
      description: newCategory.description || undefined,
      icon: newCategory.icon || undefined,
      color: newCategory.color || undefined,
      displayOrder: newCategory.displayOrder || 0,
    });
    setNewCategory({ name: '', description: '', icon: 'Shield', color: 'blue', displayOrder: 0 });
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.categoryId) {
      alert('Please select a category');
      return;
    }
    await createItemMutation.mutateAsync({
      categoryId: newItem.categoryId,
      name: newItem.name,
      description: newItem.description || undefined,
      isRequired: newItem.isRequired,
      dueDate: newItem.dueDate || undefined,
      displayOrder: newItem.displayOrder || 0,
    });
    setNewItem({ categoryId: 0, name: '', description: '', isRequired: true, dueDate: '', displayOrder: 0 });
  };

  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case 'Shield': return Shield;
      case 'FileCheck': return FileCheck;
      case 'Users': return Users;
      case 'Clock': return Clock3;
      default: return CheckCircle2;
    }
  };

  const getColorClass = (color?: string) => {
    switch (color) {
      case 'blue': return 'text-blue-400';
      case 'green': return 'text-green-400';
      case 'purple': return 'text-purple-400';
      case 'orange': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const handleToggleCompliance = async (itemId: number, currentStatus: boolean) => {
    await updateComplianceMutation.mutateAsync({
      id: itemId,
      isCompleted: !currentStatus,
      completedBy: !currentStatus ? 'Admin User' : undefined,
      notes: editingItem?.id === itemId ? editingItem.notes : undefined,
    });
    setEditingItem(null);
  };

  const handleNotesChange = (itemId: number, notes: string) => {
    setEditingItem({ id: itemId, notes });
  };

  const handleSaveNotes = async (itemId: number, currentStatus: boolean) => {
    if (editingItem?.id === itemId) {
      await updateComplianceMutation.mutateAsync({
        id: itemId,
        isCompleted: currentStatus,
        completedBy: currentStatus ? 'Admin User' : undefined,
        notes: editingItem.notes,
      });
      setEditingItem(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Create Forms */}
      <div className="bg-gray-800/50 border border-gray-700 p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4 heading-font">Add Compliance Entries</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={handleCreateCategory} className="bg-gray-900/50 border border-gray-700 p-4">
            <h3 className="text-white font-semibold mb-3 inline-flex items-center gap-2"><PlusCircle className="h-4 w-4" /> New Category</h3>
            <div className="space-y-3">
              <input value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} placeholder="Name" className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm" required />
              <input value={newCategory.description} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })} placeholder="Description" className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm" />
              <div className="grid grid-cols-3 gap-2">
                <input value={newCategory.icon} onChange={e => setNewCategory({ ...newCategory, icon: e.target.value })} placeholder="Icon (Shield, FileCheck...)" className="bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm" />
                <input value={newCategory.color} onChange={e => setNewCategory({ ...newCategory, color: e.target.value })} placeholder="Color (blue, green...)" className="bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm" />
                <input type="number" value={newCategory.displayOrder} onChange={e => setNewCategory({ ...newCategory, displayOrder: Number(e.target.value) })} placeholder="Order" className="bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm" />
              </div>
              <button type="submit" className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide text-sm">Add Category</button>
            </div>
          </form>

          <form onSubmit={handleCreateItem} className="bg-gray-900/50 border border-gray-700 p-4">
            <h3 className="text-white font-semibold mb-3 inline-flex items-center gap-2"><PlusCircle className="h-4 w-4" /> New Item</h3>
            <div className="space-y-3">
              <select value={newItem.categoryId} onChange={e => setNewItem({ ...newItem, categoryId: Number(e.target.value) })} className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm" required>
                <option value={0}>Select Category</option>
                {complianceData?.categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <input value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} placeholder="Name" className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm" required />
              <input value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} placeholder="Description" className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm" />
              <div className="grid grid-cols-3 gap-2">
                <label className="text-white text-sm flex items-center gap-2">
                  <input type="checkbox" checked={newItem.isRequired} onChange={e => setNewItem({ ...newItem, isRequired: e.target.checked })} /> Required
                </label>
                <input type="date" value={newItem.dueDate} onChange={e => setNewItem({ ...newItem, dueDate: e.target.value })} className="bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm" />
                <input type="number" value={newItem.displayOrder} onChange={e => setNewItem({ ...newItem, displayOrder: Number(e.target.value) })} placeholder="Order" className="bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm" />
              </div>
              <button type="submit" className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide text-sm">Add Item</button>
            </div>
          </form>
        </div>
      </div>

      {/* Lists */}
      <div className="bg-gray-800/50 border border-gray-700 p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-white mb-6 heading-font">Compliance Management</h2>
        <p className="text-gray-400 mb-6 text-sm">
          Track and manage compliance requirements for ministry operations, child safety, and legal obligations.
        </p>
        
        {complianceData?.categories.map((category) => {
          const IconComponent = getIconComponent(category.icon);
          const colorClass = getColorClass(category.color);
          const completedItems = category.items.filter(item => item.isCompleted).length;
          const totalItems = category.items.length;
          const completionPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

          return (
            <div key={category.id} className="mb-8 bg-gray-900/50 border border-gray-700 p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mr-3">
                    <IconComponent className={`h-5 w-5 ${colorClass}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white heading-font">{category.name}</h3>
                    {category.description && (
                      <p className="text-gray-400 text-sm">{category.description}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{completedItems}/{totalItems}</div>
                  <div className="text-gray-400 text-xs">{Math.round(completionPercentage)}% Complete</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 h-2 mb-4">
                <div 
                  className="bg-green-400 h-2 transition-all duration-300" 
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>

              <div className="space-y-3">
                {category.items.map((item) => (
                  <div key={item.id} className="bg-gray-800/50 border border-gray-600 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <button
                            onClick={() => handleToggleCompliance(item.id, item.isCompleted)}
                            className={`w-5 h-5 border-2 mr-3 flex items-center justify-center transition-colors ${
                              item.isCompleted 
                                ? 'bg-green-500 border-green-500' 
                                : 'border-gray-500 hover:border-gray-400'
                            }`}
                            disabled={updateComplianceMutation.isPending}
                          >
                            {item.isCompleted && <CheckCircle2 className="h-3 w-3 text-white" />}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <input
                                defaultValue={item.name}
                                onBlur={async (e) => {
                                  const val = e.currentTarget.value.trim();
                                  if (val && val !== item.name) {
                                    await updateItemDetailsMutation.mutateAsync({ id: item.id, name: val });
                                  }
                                }}
                                className={`font-semibold bg-transparent ${item.isCompleted ? 'text-green-400' : 'text-white'} outline-none`}
                              />
                              <span className="text-xs text-gray-500">#{item.displayOrder}</span>
                            </div>
                            {item.description && (
                              <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                            )}
                          </div>
                        </div>
                        
                        {item.isCompleted && item.completedAt && (
                          <div className="text-xs text-gray-400 ml-8">
                            Completed: {new Date(item.completedAt).toLocaleDateString()} 
                            {item.completedBy && ` by ${item.completedBy}`}
                          </div>
                        )}
                        
                        <div className="ml-8 mt-2">
                          {editingItem?.id === item.id ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={editingItem.notes}
                                onChange={(e) => handleNotesChange(item.id, e.target.value)}
                                placeholder="Add notes..."
                                className="flex-1 bg-gray-700 border border-gray-600 text-white px-3 py-1 text-sm"
                              />
                              <button
                                onClick={() => handleSaveNotes(item.id, item.isCompleted)}
                                className="bg-green-500 text-white px-3 py-1 text-sm hover:bg-green-600"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingItem(null)}
                                className="bg-gray-500 text-white px-3 py-1 text-sm hover:bg-gray-600"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              {item.notes ? (
                                <span className="text-gray-300 text-sm">{item.notes}</span>
                              ) : (
                                <span className="text-gray-500 text-sm italic">No notes</span>
                              )}
                              <button
                                onClick={() => setEditingItem({ id: item.id, notes: item.notes || '' })}
                                className="text-blue-400 hover:text-blue-300 text-sm"
                              >
                                <Edit className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="ml-8 mt-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                          <label className="text-xs text-gray-400">Required:
                            <select
                              defaultValue={item.isRequired ? 'true' : 'false'}
                              onChange={async (e) => {
                                await updateItemDetailsMutation.mutateAsync({ id: item.id, isRequired: e.target.value === 'true' });
                              }}
                              className="ml-2 bg-gray-700 border border-gray-600 text-white px-2 py-1 text-xs"
                            >
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </select>
                          </label>
                          <label className="text-xs text-gray-400">Due Date:
                            <input
                              type="date"
                              defaultValue={item.dueDate ? item.dueDate.split('T')[0] : ''}
                              onBlur={async (e) => {
                                await updateItemDetailsMutation.mutateAsync({ id: item.id, dueDate: e.currentTarget.value || null });
                              }}
                              className="ml-2 bg-gray-700 border border-gray-600 text-white px-2 py-1 text-xs"
                            />
                          </label>
                          <label className="text-xs text-gray-400">Order:
                            <input
                              type="number"
                              defaultValue={item.displayOrder}
                              onBlur={async (e) => {
                                const num = Number(e.currentTarget.value);
                                if (!Number.isNaN(num)) {
                                  await updateItemDetailsMutation.mutateAsync({ id: item.id, displayOrder: num });
                                }
                              }}
                              className="ml-2 w-20 bg-gray-700 border border-gray-600 text-white px-2 py-1 text-xs"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
