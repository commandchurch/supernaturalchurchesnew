import React from 'react';

import { AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

export default function HelpMeFundPublic() {
  // Mock funding needs data
  const needsData = {
    needs: [
      {
        id: '1',
        title: 'Church Building Fund',
        description: 'Help us build a new sanctuary for our growing congregation.',
        amount: 100000,
        raised: 65000,
        status: 'approved'
      },
      {
        id: '2',
        title: 'Mission Trip to Africa',
        description: 'Support our mission team in spreading the Gospel across Africa.',
        amount: 25000,
        raised: 15000,
        status: 'approved'
      },
      {
        id: '3',
        title: 'Food Ministry Expansion',
        description: 'Expand our community food ministry to reach more families in need.',
        amount: 15000,
        raised: 8500,
        status: 'approved'
      }
    ]
  };

  const approvedNeeds = (needsData?.needs || []).filter(n => n.status === 'approved');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Help Me Fund", item: `${siteUrl}/help-me-fund` }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SEO
        title="Help Me Fund – Support Community Members in Crisis"
        description="Contribute to approved emergency needs for Command Church members. Support those facing urgent bills or unexpected hardship."
        breadcrumbsJsonLd={breadcrumbs}
      />

      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">Help Me Fund</h1>
        <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
          Help Me Fund exists to support our paid members in genuine times of crisis and emergency (e.g., urgent bills, unexpected hardship). 
          We do not fund external study or education, and we do not provide money for general medication or ongoing medical treatment. 
          Exception: we may assist with emergency medical bills arising from an accident (e.g., ambulance, emergency triage).
        </p>
      </div>

      <div className="bg-yellow-500/20 text-yellow-200 border border-yellow-500/30 p-3 sm:p-4 mb-8 text-sm">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 mt-0.5" />
          <p>Every request is reviewed by leadership and must be approved before any funds are disbursed or shown publicly.</p>
        </div>
      </div>

      <div className="space-y-4">
        {approvedNeeds.length === 0 && (
          <div className="text-center text-gray-400 py-8">No approved needs available yet. Please check back soon.</div>
        )}

        {approvedNeeds.map((need) => {
          const progressPercentage = (need.amountRaised / need.amountNeeded) * 100;
          return (
            <div key={need.id} className="bg-gray-800/50 border border-gray-700 p-5 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 heading-font">{need.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{need.description}</p>
              <div className="w-full bg-gray-700 h-2 mb-2">
                <div className="bg-white h-2 transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm">
                <div className="mb-2 sm:mb-0">
                  <span className="text-gray-400">
                    Raised: {formatCurrency(need.amountRaised)}
                  </span>
                  <span className="text-white ml-4">
                    Goal: {formatCurrency(need.amountNeeded)}
                  </span>
                </div>
                <a href="/give" className="bg-white text-black hover:bg-gray-200 px-4 py-2 font-semibold uppercase tracking-wide text-xs">
                  Contribute
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
