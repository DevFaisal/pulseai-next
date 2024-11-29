import React from 'react';
import { Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Pulse AI</span>
            </div>
            <p className="mt-4 text-gray-500">
              Transforming healthcare with AI-powered insights and real-time monitoring.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#about" className="text-base text-gray-500 hover:text-gray-900">About</a></li>
              <li><a href="#careers" className="text-base text-gray-500 hover:text-gray-900">Careers</a></li>
              <li><a href="#contact" className="text-base text-gray-500 hover:text-gray-900">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#privacy" className="text-base text-gray-500 hover:text-gray-900">Privacy</a></li>
              <li><a href="#terms" className="text-base text-gray-500 hover:text-gray-900">Terms</a></li>
              <li><a href="#security" className="text-base text-gray-500 hover:text-gray-900">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-100 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Pulse AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}