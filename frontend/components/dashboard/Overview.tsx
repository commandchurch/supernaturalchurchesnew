import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import client from '../../client';

import { DollarSign, TrendingUp, Users, Share2, BookOpen, Heart, Award, ExternalLink } from 'lucide-react';

export default function Overview() {
  // Get current user ID from Clerk
  const { user, isLoaded, isSignedIn } = useUser();
  const [stats, setStats] = useState<any>(null);
  const [certificates, setCertificates] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoaded || !isSignedIn) return;

      try {
        setLoading(true);
        const [statsResponse, certificatesResponse] = await Promise.all([
          client.user.getDashboardStats(),
          client.academy.listUserCertificates()
        ]);

        setStats(statsResponse);
        setCertificates(certificatesResponse);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Fallback to mock data if APIs fail
        setStats({
          weeklyEarnings: 150,
          totalEarnings: 1250,
          referralCount: 8,
          rank: 'Silver'
        });
        setCertificates({
          certificates: [
            { id: '1', title: 'New Life in Jesus: Foundations', issuedDate: new Date().toISOString() },
            { id: '2', title: 'Evangelism Essentials', issuedDate: new Date().toISOString() }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoaded, isSignedIn]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<DollarSign />} color="text-green-400" label="Weekly Earnings" value={formatCurrency(stats?.weeklyEarnings || 0)} />
        <StatCard icon={<TrendingUp />} color="text-blue-400" label="Total Earnings" value={formatCurrency(stats?.totalEarnings || 0)} />
        <StatCard icon={<Users />} color="text-purple-400" label="Referrals" value={`${stats?.referralCount || 0}`} />
        <StatCard icon={<Share2 />} color="text-orange-400" label="Current Rank" value={stats?.rank || 'Bronze'} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <QuickActionCard icon={<BookOpen />} title="Latest Course" description="Continue your learning journey with our newest content." link="/academy" linkText="Continue Learning" />
        <QuickActionCard icon={<Heart />} title="Prayer Request" description="Submit a prayer request to our ministry team." link="/dashboard?tab=prayer" linkText="Submit Request" />
        <QuickActionCard icon={<Share2 />} title="Share & Earn" description="Invite others and start earning commissions today." link="/dashboard?tab=outreach" linkText="Get Link" />
      </div>

      <div className="bg-gray-800/50 border border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Award className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white heading-font">Certificates</h2>
        </div>
        {certificates && certificates.certificates.length > 0 ? (
          <div className="space-y-3">
            {certificates.certificates.map((cert: any) => (
              <div key={cert.id} className="bg-gray-700/50 border border-gray-600 p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{cert.courseTitle}</p>
                  <p className="text-sm text-gray-400">
                    Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                    {cert.recipientName ? ` • ${cert.recipientName}` : ''}
                  </p>
                  <p className="text-xs text-gray-500">Code: {cert.certificateCode}</p>
                </div>
                {cert.certificateUrl ? (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-white text-black hover:bg-gray-200 px-3 py-1 font-semibold inline-flex items-center rounded-lg"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Certificate
                  </a>
                ) : (
                  <button className="text-sm bg-gray-600 text-white px-3 py-1 font-semibold cursor-default" disabled>
                    Not Available
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">You have not earned any certificates yet. Complete a course to get started!</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      <div className="flex items-center space-x-3">
        <div className={color}>{React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}</div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-white heading-font">{value}</p>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, description, link, linkText }: { icon: React.ReactNode; title: string; description: string; link: string; linkText: string }) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 p-6">
      {React.cloneElement(icon as React.ReactElement, { className: "h-8 w-8 text-blue-400 mb-4" })}
      <h3 className="text-lg font-bold text-white mb-2 heading-font">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <a href={link} className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide text-sm rounded-lg">
        {linkText}
      </a>
    </div>
  );
}
