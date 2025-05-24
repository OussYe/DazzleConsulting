import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutHistoryPage from './pages/about/HistoryPage';
import AboutTeamPage from './pages/about/TeamPage';
import ServicesDigitalPage from './pages/services/DigitalPage';
import ServicesBrandingPage from './pages/services/BrandingPage';
import ServicesAdvertisingPage from './pages/services/AdvertisingPage';
import ReferencesPage from './pages/ReferencesPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLoginPage from './pages/admin/LoginPage';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMenuEditor from './pages/admin/MenuEditor';
import AdminArticles from './pages/admin/Articles';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { MenuProvider } from './contexts/MenuContext';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <MenuProvider>
          <Router>
            <Routes>
              {/* Front-office routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about">
                  <Route path="history" element={<AboutHistoryPage />} />
                  <Route path="team" element={<AboutTeamPage />} />
                </Route>
                <Route path="services">
                  <Route path="digital-strategy" element={<ServicesDigitalPage />} />
                  <Route path="branding" element={<ServicesBrandingPage />} />
                  <Route path="advertising" element={<ServicesAdvertisingPage />} />
                </Route>
                <Route path="references" element={<ReferencesPage />} />
                <Route path="articles" element={<ArticlesPage />} />
                <Route path="articles/:id" element={<ArticleDetailPage />} />
                <Route path="contact" element={<ContactPage />} />
              </Route>

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="menu-editor" element={<AdminMenuEditor />} />
                <Route path="articles" element={<AdminArticles />} />
              </Route>
            </Routes>
          </Router>
        </MenuProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
