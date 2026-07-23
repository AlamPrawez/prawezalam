'use client';

import React, { useState, useEffect } from 'react';
import { Search, Edit3, Plus, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { cmsService, CmsServiceRepository, UserRole } from '@/services/api/endpoints';


export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  updatedAt: string;
  status: 'Published' | 'Draft';
}

interface ServicesListViewProps {
  services: ServiceItem[];
  isLoading?: boolean;
  userRole?: UserRole | null;
  onEditService: (service: ServiceItem) => void;
  onCreateNew: () => void;
  onServiceDeleted?: (deletedId: string) => void;
}

export default function ServicesListView({
  services: initialServices,
  isLoading = false,
  userRole: propUserRole,
  onEditService,
  onCreateNew,
  onServiceDeleted,
}: ServicesListViewProps) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(propUserRole || null);

  // Sync internal state when parent props change
  useEffect(() => {
    setServices(initialServices);
  }, [initialServices]);

  // Fetch role on mount if not provided via props
  useEffect(() => {
    if (!propUserRole) {
      cmsService.getCurrentUserRole().then((role) => {
        setCurrentRole(role);
      });
    } else {
      setCurrentRole(propUserRole);
    }
  }, [propUserRole]);

  // Handle service deletion with Supabase cascade
  const handleDeleteService = async (service: ServiceItem) => {
    const isConfirmed = confirm(
      `Are you sure you want to delete "${service.title}"? This action cannot be undone.`
    );

    if (!isConfirmed) return;

    try {
      setDeletingId(service.id);
      await cmsService.deleteService(service.id);

      // Remove from local list
      setServices((prev) => prev.filter((item) => item.id !== service.id));
      if (onServiceDeleted) {
        onServiceDeleted(service.id);
      }
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // Filter services by search keyword and status selection
  const filteredServices = services.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const canManage = currentRole === 'admin' || currentRole === 'manager';

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
      {/* SEARCH & FILTER CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or slug..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* STATUS FILTER PILLS */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['All', 'Published', 'Draft'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  statusFilter === status
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {canManage && (
            <button
              type="button"
              onClick={onCreateNew}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-2xs transition active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" /> Create New
            </button>
          )}
        </div>
      </div>

      {/* LOADING SKELETON STATE */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 animate-pulse space-y-3"
            >
              <div className="h-4 w-20 bg-slate-200 rounded" />
              <div className="h-5 w-3/4 bg-slate-200 rounded" />
              <div className="h-3 w-1/2 bg-slate-200 rounded" />
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                <div className="h-3 w-24 bg-slate-200 rounded" />
                <div className="h-6 w-16 bg-slate-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* SERVICES LIST GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredServices.length === 0 ? (
            <div className="col-span-2 py-12 flex flex-col items-center justify-center text-slate-400 text-xs space-y-2">
              <AlertCircle className="w-6 h-6 text-slate-300" />
              <span>No services matching your search or selected filter.</span>
            </div>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="p-5 border border-slate-200 rounded-2xl bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md inline-block mb-1.5 ${
                        service.status === 'Published'
                          ? 'text-emerald-700 bg-emerald-100'
                          : 'text-amber-700 bg-amber-100'
                      }`}
                    >
                      {service.status}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800">{service.title}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">/{service.slug}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                  <span>Updated: {service.updatedAt}</span>

                  <div className="flex items-center gap-2">
                    {/* EDIT ACTION */}
                    {canManage && (
                      <button
                        type="button"
                        onClick={() => onEditService(service)}
                        className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-lg transition active:scale-95"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                    )}

                    {/* DELETE ACTION */}
                    {canManage && (
                      <button
                        type="button"
                        disabled={deletingId === service.id}
                        onClick={() => handleDeleteService(service)}
                        className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition active:scale-95 disabled:opacity-50"
                      >
                        {deletingId === service.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-rose-600" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}