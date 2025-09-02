import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Environment Variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const CLIENT_TARGET = import.meta.env.VITE_CLIENT_TARGET;
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const missingVars = [];
if (!PUBLISHABLE_KEY) missingVars.push('VITE_CLERK_PUBLISHABLE_KEY');
if (!CLIENT_TARGET) missingVars.push('VITE_CLIENT_TARGET');
if (!STRIPE_KEY) missingVars.push('VITE_STRIPE_PUBLISHABLE_KEY');

function ErrorFallback() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      color: '#333'
    }}>
      <h1 style={{ color: '#e74c3c', marginBottom: '20px' }}>⚠️ Configuration Error</h1>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <h2>Missing Environment Variables</h2>
        <p>The application cannot start because required environment variables are missing.</p>

        <div style={{ margin: '20px 0', textAlign: 'left' }}>
          <h3>Missing Variables:</h3>
          <ul style={{ lineHeight: '1.6' }}>
            {missingVars.map((variable, index) => (
              <li key={index}>
                <strong style={{ color: '#e74c3c' }}>{variable}</strong>
                {variable === 'VITE_CLERK_PUBLISHABLE_KEY' && ' - Clerk authentication key'}
                {variable === 'VITE_CLIENT_TARGET' && ' - Encore backend URL'}
                {variable === 'VITE_STRIPE_PUBLISHABLE_KEY' && ' - Stripe payment key'}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ margin: '20px 0', padding: '15px', background: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px' }}>
          <strong>📋 Required Values:</strong>
          <div style={{ marginTop: '10px', textAlign: 'left' }}>
            <div><strong>VITE_CLIENT_TARGET:</strong> https://supernaturalins-tmi2.encr.app</div>
            <div style={{ marginTop: '5px' }}>
              <strong>VITE_CLERK_PUBLISHABLE_KEY:</strong> Get from Clerk Dashboard → API Keys
            </div>
            <div style={{ marginTop: '5px' }}>
              <strong>VITE_STRIPE_PUBLISHABLE_KEY:</strong> Get from Stripe Dashboard → API Keys
            </div>
          </div>
        </div>

        <div style={{ margin: '20px 0', padding: '15px', background: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '4px' }}>
          <strong>🔧 To Fix in Vercel:</strong>
          <ol style={{ textAlign: 'left', margin: '10px 0', paddingLeft: '20px' }}>
            <li>Go to https://vercel.com/dashboard</li>
            <li>Select your project</li>
            <li>Go to Settings → Environment Variables</li>
            <li>Add each missing variable</li>
            <li>Redeploy the application</li>
          </ol>
        </div>

        <p style={{ fontSize: '14px', color: '#666' }}>
          For local development, create a <code>.env.local</code> file with these variables.
        </p>
      </div>
    </div>
  );
}

if (missingVars.length > 0) {
  ReactDOM.createRoot(document.getElementById("root")!).render(<ErrorFallback />);
} else {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </React.StrictMode>
  );
}
