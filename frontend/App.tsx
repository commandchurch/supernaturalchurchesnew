import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import { RealTimeProvider } from './components/RealTimeProvider';
import ErrorBoundary from './components/ErrorBoundary';
import { NotificationProvider } from './contexts/NotificationContext';

import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Academy = lazy(() => import('./pages/Academy'));
const Partnership = lazy(() => import('./pages/Partnership'));
const Church = lazy(() => import('./pages/Church'));
const Events = lazy(() => import('./pages/Events'));
const About = lazy(() => import('./pages/About'));
const Give = lazy(() => import('./pages/Give'));
const Privacy = lazy(() => import('./pages/Privacy'));
const StatementOfFaith = lazy(() => import('./pages/StatementOfFaith'));
const Terms = lazy(() => import('./pages/Terms'));
const HelpMeFundPublic = lazy(() => import('./pages/HelpMeFundPublic'));
const Membership = lazy(() => import('./pages/Membership'));
const Legal = lazy(() => import('./pages/Legal'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const LegalDisclaimer = lazy(() => import('./pages/LegalDisclaimer'));
const UserAgreement = lazy(() => import('./pages/UserAgreement'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const DataProtection = lazy(() => import('./pages/DataProtection'));
const DonationTerms = lazy(() => import('./pages/DonationTerms'));
const MedicalDisclaimer = lazy(() => import('./pages/MedicalDisclaimer'));
const FindChurch = lazy(() => import('./pages/FindChurch'));
const CompensationPlan = lazy(() => import('./pages/CompensationPlan'));
const ChurchPartnership = lazy(() => import('./pages/ChurchPartnership'));
const Faqs = lazy(() => import('./pages/Faqs'));
const Ambassador = lazy(() => import('./pages/Ambassador'));
const Contact = lazy(() => import('./pages/Contact'));
const PartnershipThankYou = lazy(() => import('./pages/PartnershipThankYou'));

// Enhanced Pages with Supernatural Design
const Merch = lazy(() => import('./pages/Merch'));
const Connect = lazy(() => import('./pages/Connect'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <RealTimeProvider>
          <Router>
              <ScrollToTop />
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Layout><ErrorBoundary><Home /></ErrorBoundary></Layout>} />
                  <Route path="/academy" element={<Layout><ErrorBoundary><Academy /></ErrorBoundary></Layout>} />
                  <Route path="/partner" element={<Layout><ErrorBoundary><Partnership /></ErrorBoundary></Layout>} />
                  <Route path="/training" element={<Layout><ErrorBoundary><Partnership /></ErrorBoundary></Layout>} />
                  <Route path="/give" element={<Layout><ErrorBoundary><Give /></ErrorBoundary></Layout>} />
                  <Route path="/help-me-fund" element={<Layout><ErrorBoundary><HelpMeFundPublic /></ErrorBoundary></Layout>} />
                  <Route path="/find-church" element={<Layout><ErrorBoundary><FindChurch /></ErrorBoundary></Layout>} />
                  <Route path="/contact" element={<Layout><ErrorBoundary><Contact /></ErrorBoundary></Layout>} />
                  <Route path="/partnership/thank-you" element={<Layout><ErrorBoundary><PartnershipThankYou /></ErrorBoundary></Layout>} />
                  <Route path="/compensation-plan" element={<Layout><ErrorBoundary><CompensationPlan /></ErrorBoundary></Layout>} />
                  <Route path="/churchpartnership" element={<Layout><ErrorBoundary><ChurchPartnership /></ErrorBoundary></Layout>} />
                  <Route path="/ambassador/:username" element={<ErrorBoundary><meta httpEquiv="refresh" content={`0;url=/ambassador.html`} /></ErrorBoundary>} />
                  <Route path="/faqs" element={<Layout><ErrorBoundary><Faqs /></ErrorBoundary></Layout>} />
                  <Route path="/church" element={<Layout><ErrorBoundary><Church /></ErrorBoundary></Layout>} />
                  <Route path="/events" element={<Layout><ErrorBoundary><Events /></ErrorBoundary></Layout>} />

                  {/* Enhanced Pages with Consistent Design System */}
                  <Route path="/merch" element={<ErrorBoundary><Merch /></ErrorBoundary>} />
                  <Route path="/connect" element={<ErrorBoundary><Connect /></ErrorBoundary>} />

                  {/* Other Pages */}
                  <Route path="/privacy" element={<Layout><ErrorBoundary><Privacy /></ErrorBoundary></Layout>} />
                  <Route path="/statement-of-faith" element={<Layout><ErrorBoundary><StatementOfFaith /></ErrorBoundary></Layout>} />
                  <Route path="/terms/:documentType" element={<Layout><ErrorBoundary><Terms /></ErrorBoundary></Layout>} />
                  <Route path="/legal" element={<Layout><ErrorBoundary><Legal /></ErrorBoundary></Layout>} />
                  <Route path="/legal/terms-of-service" element={<Layout><ErrorBoundary><TermsOfService /></ErrorBoundary></Layout>} />
                  <Route path="/legal/privacy-policy" element={<Layout><ErrorBoundary><PrivacyPolicy /></ErrorBoundary></Layout>} />
                  <Route path="/legal/refund-policy" element={<Layout><ErrorBoundary><RefundPolicy /></ErrorBoundary></Layout>} />
                  <Route path="/legal/disclaimer" element={<Layout><ErrorBoundary><LegalDisclaimer /></ErrorBoundary></Layout>} />
                  <Route path="/legal/user-agreement" element={<Layout><ErrorBoundary><UserAgreement /></ErrorBoundary></Layout>} />
                  <Route path="/legal/cookie-policy" element={<Layout><ErrorBoundary><CookiePolicy /></ErrorBoundary></Layout>} />
                  <Route path="/legal/data-protection" element={<Layout><ErrorBoundary><DataProtection /></ErrorBoundary></Layout>} />
                  <Route path="/legal/donation-terms" element={<Layout><ErrorBoundary><DonationTerms /></ErrorBoundary></Layout>} />
                  <Route path="/legal/medical-disclaimer" element={<Layout><ErrorBoundary><MedicalDisclaimer /></ErrorBoundary></Layout>} />
                  <Route path="/legal/compensation-plan" element={<Layout><ErrorBoundary><CompensationPlan /></ErrorBoundary></Layout>} />
                </Routes>
              </Suspense>
            </Router>
          </RealTimeProvider>
        </HelmetProvider>
      </ErrorBoundary>
  );
}
