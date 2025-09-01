import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/clerk-react';
import { api } from '../../_generated/api';
import { Video, UploadCloud, CheckSquare, Send } from 'lucide-react';

export default function TestimonySubmission() {
  const { user } = useUser();
  const [contentText, setContentText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedObject, setUploadedObject] = useState<{ objectName: string; publicUrl: string } | null>(null);
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  const submitTestimony = useMutation(api.church.submitTestimony);

  async function handleUpload() {
    if (!file || !user) return;
    try {
      setUploading(true);
      // For now, just simulate upload success
      // In production, implement proper file upload to cloud storage
      setUploadedObject({ objectName: 'demo-video', publicUrl: 'demo-url' });
      setMessage('Video uploaded successfully.');
    } catch (err: any) {
      console.error('upload error', err);
      setMessage(`Upload failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!user) {
      setMessage('Please sign in to submit a testimony.');
      return;
    }
    if (!consent) {
      setMessage('Please provide consent to share your testimony publicly.');
      return;
    }
    if (!contentText && !uploadedObject) {
      setMessage('Please write your testimony or upload a short video.');
      return;
    }
    try {
      await submitTestimony({
        contentText: contentText || undefined,
        videoObjectName: uploadedObject?.objectName,
        consentPublic: true,
      });
      setMessage('Thank you! Your testimony has been submitted for review.');
      setContentText('');
      setFile(null);
      setUploadedObject(null);
      setConsent(false);
    } catch (err: any) {
      console.error('submit testimony error', err);
      setMessage(`Submission failed: ${err?.message || 'Unknown error'}`);
    }
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Video className="h-5 w-5 text-white" />
        <h2 className="text-xl font-bold text-white heading-font">Share Your Testimony</h2>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        Encourage others by sharing what Jesus has done in your life. You can record a short video or write it out. By submitting, you can optionally grant us permission to share it publicly to bless others.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-semibold mb-2">Your Testimony (optional if uploading video)</label>
          <textarea
            rows={5}
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2"
            placeholder="Share what God has done..."
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Upload Short Video (optional)</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full sm:w-auto bg-gray-700 border border-gray-600 text-white px-4 py-2"
            />
            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || uploading}
              className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide inline-flex items-center flex-shrink-0"
            >
              <UploadCloud className={`mr-2 h-4 w-4 ${uploading ? 'animate-pulse' : ''}`} />
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          {uploadedObject && (
            <div className="text-green-400 text-sm mt-2">
              Uploaded! Preview: <a href={uploadedObject.publicUrl} target="_blank" rel="noopener noreferrer" className="underline">Open</a>
            </div>
          )}
        </div>

        <label className="flex items-center gap-2 text-white">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span className="inline-flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            I give consent for Command Church to share my testimony publicly.
          </span>
        </label>

        <button
          type="submit"
          className="bg-white text-black hover:bg-gray-200 px-6 py-3 font-semibold uppercase tracking-wide inline-flex items-center"
          disabled={uploading}
        >
          <Send className="mr-2 h-4 w-4" />
          Submit Testimony
        </button>

        {message && <div className="text-sm mt-2 text-gray-300">{message}</div>}
      </form>
    </div>
  );
}
