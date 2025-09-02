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
const Church = lazy(() => import('./pages/Church'));
const Events = lazy(() => import('./pages/Events'));
const About = lazy(() => import('./pages/About'));
const Give = lazy(() => import('./pages/Give'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Admin = lazy(() => import('./pages/Admin'));
const Privacy = lazy(() => import('./pages/Privacy'));
const StatementOfFaith = lazy(() => import('./pages/StatementOfFaith'));
const Terms = lazy(() => import('./pages/Terms'));
const HelpMeFundPublic = lazy(() => import('./pages/HelpMeFundPublic'));
const Membership = lazy(() => import('./pages/Membership'));
const SoulOutreach = lazy(() => import('./pages/SoulOutreach'));
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
                  <Route path="/" element={<Layout><Home /></Layout>} />
                  <Route path="/academy" element={<Layout><Academy /></Layout>} />
                  <Route path="/about" element={<Layout><About /></Layout>} />
                  <Route path="/give" element={<Layout><Give /></Layout>} />
                  <Route path="/help-me-fund" element={<Layout><HelpMeFundPublic /></Layout>} />
                  <Route path="/membership" element={<Layout><Membership /></Layout>} />
                  <Route path="/soul-outreach" element={<Layout><SoulOutreach /></Layout>} />
                  <Route path="/find-church" element={<Layout><FindChurch /></Layout>} />

                  {/* Enhanced Pages with Consistent Design System */}
                  <Route path="/merch" element={<Merch />} />
                  <Route path="/connect" element={<Connect />} />

                  {/* Other Pages */}
                  <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
                  <Route path="/statement-of-faith" element={<Layout><StatementOfFaith /></Layout>} />
                  <Route path="/terms/:documentType" element={<Layout><Terms /></Layout>} />
                  <Route path="/legal" element={<Layout><Legal /></Layout>} />
                  <Route path="/legal/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
                  <Route path="/legal/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
                  <Route path="/legal/refund-policy" element={<Layout><RefundPolicy /></Layout>} />
                  <Route path="/legal/disclaimer" element={<Layout><LegalDisclaimer /></Layout>} />
                  <Route path="/legal/user-agreement" element={<Layout><UserAgreement /></Layout>} />
                  <Route path="/legal/cookie-policy" element={<Layout><CookiePolicy /></Layout>} />
                  <Route path="/legal/data-protection" element={<Layout><DataProtection /></Layout>} />
                  <Route path="/legal/donation-terms" element={<Layout><DonationTerms /></Layout>} />
                  <Route path="/legal/medical-disclaimer" element={<Layout><MedicalDisclaimer /></Layout>} />
                  <Route path="/legal/compensation-plan" element={<Layout><CompensationPlan /></Layout>} />
                  <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute requireAdmin><Layout><Admin /></Layout></ProtectedRoute>} />
                </Routes>
              </Suspense>
            </Router>
          </RealTimeProvider>
        </HelmetProvider>
      </ErrorBoundary>
  );
}
