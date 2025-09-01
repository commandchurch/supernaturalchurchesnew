import React from 'react';
import { useParams } from 'react-router-dom';

import { FileText } from 'lucide-react';
import SEO from '../components/SEO';
import { siteUrl } from '../config';

export default function Terms() {
  const { documentType } = useParams<{ documentType: string }>();

  // Mock terms data
  const data = {
    content: `# ${title}\n\nThis is the content for ${title}. This document outlines the terms and conditions for using our services.\n\n## Section 1\n\nThis is section 1 content.\n\n## Section 2\n\nThis is section 2 content.`
  };
  const isLoading = false;

  const title = documentType?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || 'Legal Document';

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: title, item: `${siteUrl}/terms/${documentType}` }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
      <SEO
        title={title}
        description={`Read the ${title} for Command Church.`}
        breadcrumbsJsonLd={breadcrumbs}
      />

      <div className="text-center mb-10 sm:mb-12">
        <FileText className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gray-400 mb-4" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 heading-font">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-gray-400">
          Last Updated: {data ? new Date(data.updatedAt).toLocaleDateString() : '...'}
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 sm:p-8">
        {isLoading ? (
          <p className="text-gray-400">Loading terms...</p>
        ) : (
          <div className="prose prose-invert max-w-none text-sm sm:text-base">
            <pre className="whitespace-pre-wrap font-sans">{data?.content}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
