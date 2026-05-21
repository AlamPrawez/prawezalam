"use client"; // 👈 Add this magic directive right at the top!

import Link from 'next/link';
import { ArrowLeft, Home, FileText, Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[85vh] w-full flex items-center justify-center bg-gray-50/50 px-6 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Error Badge Graphic */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-500/5 blur-xl rounded-full scale-150" />
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-premium flex items-center justify-center text-indigo-600">
            <Terminal size={32} className="stroke-[2.5]" />
          </div>
          <span className="absolute -bottom-2 -right-2 bg-indigo-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            Code 404
          </span>
        </div>

        {/* Messaging Stack */}
        <div className="space-y-3">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight sm:text-3xl">
            Route Not Found
          </h1>
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed font-medium">
            The system configuration, service description, or task parameters you are trying to access do not exist or have been re-indexed.
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="bg-white border border-gray-200/60 rounded-2xl p-4 shadow-4xs text-left space-y-2.5">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-2">
            Suggested Core Modules
          </p>
          
          <Link 
            href="/" 
            className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="bg-gray-100 p-2 rounded-lg text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <Home size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">Main Architectural Dashboard</p>
              <p className="text-[11px] text-gray-400">Return to the profile overview platform.</p>
            </div>
          </Link>

          <Link 
            href="/services" 
            className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="bg-gray-100 p-2 rounded-lg text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <FileText size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">Production Capabilities</p>
              <p className="text-[11px] text-gray-400">Explore core development & DevOps solutions.</p>
            </div>
          </Link>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold h-10 px-5 rounded-xl transition-colors shadow-xs shadow-indigo-600/10"
          >
            Go to Homepage
          </Link>
          
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 text-xs font-bold h-10 px-5 rounded-xl transition-all cursor-pointer shadow-4xs"
          >
            <ArrowLeft size={14} className="stroke-[2.5]" />
            Return Back
          </button>
        </div>

      </div>
    </main>
  );
}