import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Mail, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../components/shared/Logo';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-gray">Welcome back, {user?.name}</h1>
        <p className="text-gray-600">Here's what's happening with your agency today</p>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-gray">Recent Activity</h2>
        </div>
        
        <div className="space-y-4">
          {[
            {
              type: 'article',
              title: 'New article published',
              description: '"The Future of Digital Marketing in 2025" has been published',
              time: '2 hours ago',
              user: 'Thomas D.',
              icon: <FileText size={18} />
            },
            {
              type: 'contact',
              title: 'New contact form submission',
              description: 'A new inquiry about Digital Strategy services was received',
              time: '4 hours ago',
              icon: <Mail size={18} />
            },
            {
              type: 'menu',
              title: 'Menu structure updated',
              description: 'The main navigation menu has been reorganized',
              time: '1 day ago',
              user: 'Sophie M.',
              icon: <Menu size={18} />
            }
          ].map((activity, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
              <div className="flex">
                <div className="mr-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-teal">
                    {activity.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-slate-gray">{activity.title}</h3>
                  <p className="text-sm text-gray-600 my-1">{activity.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{activity.time}</span>
                    {activity.user && (
                      <>
                        <span className="mx-1">•</span>
                        <span>{activity.user}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-gray mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="/admin/articles" 
            className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center">
              <FileText size={20} className="text-teal mr-3" />
              <span className="font-medium">Manage Articles</span>
            </div>
          </a>
          <a 
            href="/admin/menu-editor" 
            className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center">
              <Menu size={20} className="text-teal mr-3" />
              <span className="font-medium">Edit Menu</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
