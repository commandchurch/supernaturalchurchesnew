import React from 'react';
import { X, Mail } from 'lucide-react';

interface EmailSupportPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailSupportPopup({ isOpen, onClose }: EmailSupportPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Email Support</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="text-center">
          <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <p className="text-gray-300 mb-6">
            Please email us at <strong className="text-blue-400">support@supernatural.institute</strong> for assistance.
          </p>
          <button
            onClick={() => {
              window.location.href = 'mailto:support@supernatural.institute';
              onClose();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Open Email Client
          </button>
        </div>
      </div>
    </div>
  );
}