"use client"

import { uploadWebpToSupabase } from "@/lib/uploadWebpToSupabase";
import { Calendar, Clock, User, Link as LinkIcon, Unlink, Settings2, ExternalLink, X, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { useEffect, useRef, useState } from "react";

// Helper hook for handling outside clicks on dropdown menus
function useOnClickOutside<T extends HTMLElement>(
    ref: React.RefObject<T | null>,
    handler: () => void
) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler();
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

// Dropdown Image Configurator Component with WebP Supabase Upload
export const EditableBlogImage: React.FC<{
    src?: string;
    alt?: string;
    imageLinkUrl?: string;
    className?: string;
    onUpdate: (patch: { imageUrl?: string; imageAlt?: string; imageLinkUrl?: string }) => void;
}> = ({ src, alt = 'Blog cover', imageLinkUrl, className = '', onUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [urlInput, setUrlInput] = useState(src || '');
    const [altInput, setAltInput] = useState(alt || '');
    const [linkInput, setLinkInput] = useState(imageLinkUrl || '');

    const menuRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useOnClickOutside(menuRef, () => setIsOpen(false));

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const publicUrl = await uploadWebpToSupabase(file, undefined, 'blog');
            setUrlInput(publicUrl);
            onUpdate({ imageUrl: publicUrl });
            setIsOpen(false);
        } catch (err) {
            console.error('Failed to upload image to Supabase:', err);
        } finally {
            setIsUploading(false);
        }
    };

    const renderImageContent = () => (
        <img
            src={src || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80'}
            alt={alt}
            className={className}
        />
    );

    return (
        <div ref={menuRef} className="relative group/image w-full overflow-visible">
            {src ? (
                imageLinkUrl ? (
                    <a href={imageLinkUrl} target="_blank" rel="noopener noreferrer" className="block relative">
                        {renderImageContent()}
                        <span className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-indigo-400 border border-slate-800 flex items-center gap-1 z-10">
                            <ExternalLink className="w-3 h-3" /> Linked Image
                        </span>
                    </a>
                ) : (
                    renderImageContent()
                )
            ) : (
                <div className="w-full h-56 bg-slate-900/60 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400 text-xs p-6 space-y-3">
                    <ImageIcon className="w-8 h-8 text-slate-600" />
                    <span>No cover image selected</span>
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition"
                    >
                        Upload or Set Image
                    </button>
                </div>
            )}

            {/* Floating Settings Button */}
            {src && (
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 text-white border border-slate-800 text-xs font-semibold shadow-lg backdrop-blur hover:bg-slate-800 opacity-0 group-hover/image:opacity-100 transition z-20 flex items-center gap-1.5"
                    data-editor-only
                >
                    <Settings2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Image Settings</span>
                </button>
            )}

            {/* Dropdown Menu (Replaces Modal Overlay) */}
            {isOpen && (
                <div className="absolute top-12 right-2 z-50 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 space-y-4 text-slate-200 text-xs" data-editor-only>
                    <div className="font-bold text-slate-100 border-b border-slate-800 pb-2 flex items-center justify-between">
                        <span>Blog Image Settings</span>
                        <button type="button" onClick={() => setIsOpen(false)}>
                            <X className="w-4 h-4 text-slate-400 hover:text-white" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-[11px] text-slate-400 font-medium mb-1">Source Image URL</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        onUpdate({ imageUrl: urlInput });
                                        setIsOpen(false);
                                    }}
                                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl shrink-0"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] text-slate-400 font-medium mb-1">Target Link URL (OnClick)</label>
                            <input
                                type="text"
                                value={linkInput}
                                onChange={(e) => {
                                    setLinkInput(e.target.value);
                                    onUpdate({ imageLinkUrl: e.target.value });
                                }}
                                placeholder="https://example.com"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] text-slate-400 font-medium mb-1">Alt Text (SEO)</label>
                            <input
                                type="text"
                                value={altInput}
                                onChange={(e) => {
                                    setAltInput(e.target.value);
                                    onUpdate({ imageAlt: e.target.value });
                                }}
                                placeholder="Image description..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="relative flex py-1 items-center">
                        <div className="flex-grow border-t border-slate-800"></div>
                        <span className="flex-shrink mx-2 text-[10px] text-slate-500 uppercase">Or</span>
                        <div className="flex-grow border-t border-slate-800"></div>
                    </div>

                    <div className="space-y-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <button
                            type="button"
                            disabled={isUploading}
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2 px-3 rounded-xl border border-slate-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                                    <span>Converting & Uploading...</span>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-3.5 h-3.5 text-indigo-400" />
                                    <span>Upload WebP to Supabase</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};