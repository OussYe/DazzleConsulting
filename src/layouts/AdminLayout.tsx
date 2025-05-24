import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Menu, X, Edit, FileText, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/shared/Logo';

const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Check authentication status
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Navigation items with access control
  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      path: '/admin',
      exact: true,
      requiredRole: 'admin' as const
    },
    {
      icon: <Edit size={20} />,
      label: 'Menu Editor',
      path: '/admin/menu-editor',
      requiredRole: 'admin' as const
    },
    {
      icon: <FileText size={20} />,
      label: 'Articles',
      path: '/admin/articles',
      requiredRole: 'editor' as const
    }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // If still loading or not authenticated, show loading state
  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-pulse">
          <Logo size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-md shadow-md text-slate-gray hover:text-teal"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ ease: "easeOut", duration: 0.25 }}
        className={`fixed md:relative w-64 h-screen bg-white shadow-lg z-40 md:transform-none flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <Logo size="sm" />
            <span className="ml-2 font-medium text-slate-gray">Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-gray hover:text-teal"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center">
            {user?.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center">
                {user?.name.charAt(0)}
              </div>
            )}
            <div className="ml-3">
              <p className="font-medium text-slate-gray">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow px-4 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              hasPermission(item.requiredRole) && (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md ${
                      (item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path))
                        ? 'bg-teal text-white'
                        : 'text-slate-gray hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              )
            ))}
          </ul>
        </nav>

        {/* Sign Out Button */}
        <div className="mt-auto p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-grow">
        <div className="container-custom py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
