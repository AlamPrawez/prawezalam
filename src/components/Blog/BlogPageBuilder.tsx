'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Layout, Plus, ChevronDown, Sliders, Trash2, MoveUp, MoveDown } from 'lucide-react';

import { PageBuilderValues, PageSectionItem, PageButton, StepCardItem } from './types';
import { AVAILABLE_SECTION_TYPES } from './constants';

import { SectionViewRenderer } from './views';
import { getVariantsForType } from './templates';
import { SectionEditor } from './SectionEditor';
import { TemplateModal } from './TemplateModal';

export default function BlogPageBuilder() {
    const methods = useForm<PageBuilderValues>({
        defaultValues: {
            pageTitle: 'Blog / Service Landing Page Builder',
            slug: 'service-landing-page',
            sections: [],
        },
    });

    const { watch, setValue } = methods;
    const sections = watch('sections') || [];

    const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
    const [selectedTypeForStyles, setSelectedTypeForStyles] = useState<{ id: string; name: string } | null>(null);
    const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleSelectSectionType = (typeId: string) => {
        const template = AVAILABLE_SECTION_TYPES.find((t) => t.id === typeId);
        if (!template) return;

        setSelectedTypeForStyles({ id: template.id, name: template.name });
        setSelectedSampleIndex(0);
        setIsAddDropdownOpen(false);
    };

    const handleConfirmAddSampleTemplate = () => {
        if (!selectedTypeForStyles) return;

        const samples = getVariantsForType(selectedTypeForStyles.id, selectedTypeForStyles.name);
        const chosen = samples[selectedSampleIndex] || samples[0];


        const newSection: PageSectionItem = {
            id: `sec-${Date.now()}`,
            type: selectedTypeForStyles.id,
            title: chosen.title,
            subtitle: chosen.subtitle,
            bgTheme: chosen.bgTheme as PageSectionItem['bgTheme'],
            layoutStyle: chosen.layoutStyle as PageSectionItem['layoutStyle'],
            paddingSize: chosen.paddingSize as PageSectionItem['paddingSize'],
            imageUrl: chosen.imageUrl,
            buttons: chosen.buttons
                ? chosen.buttons.map((b) => ({
                    ...b,
                    id: `btn-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
                    variant: b.variant as 'primary' | 'secondary' | 'outline' | 'ghost',
                }))
                : [],
            cardsList: chosen?.cardsList ? chosen.cardsList.map((c) => ({ ...c })) : [],
            bulletPoints: chosen.bulletPoints ? [...chosen.bulletPoints] : [],
        };

        setValue('sections', [...sections, newSection], { shouldDirty: true });
        setSelectedTypeForStyles(null);
        setEditingIndex(sections.length);
    };

    const addButton = (sectionIndex: number) => {
        const currentButtons = sections[sectionIndex]?.buttons || [];
        const newBtn: PageButton = {
            id: `btn-${Date.now()}`,
            text: 'New Button',
            url: '#',
            variant: currentButtons.length === 0 ? 'primary' : 'secondary',
        };
        setValue(`sections.${sectionIndex}.buttons`, [...currentButtons, newBtn], { shouldDirty: true });
    };

    const removeButton = (sectionIndex: number, btnIndex: number) => {
        const currentButtons = sections[sectionIndex]?.buttons || [];
        const updatedButtons = currentButtons.filter((_, i) => i !== btnIndex);
        setValue(`sections.${sectionIndex}.buttons`, updatedButtons, { shouldDirty: true });
    };

    const addStepCard = (sectionIndex: number) => {
        const currentCards = sections[sectionIndex]?.cardsList || [];
        const stepNum = String(currentCards.length + 1).padStart(2, '0');
        const newCard: StepCardItem = {
            title: `${stepNum}. New Step Title`,
            desc: 'Describe the milestone or technical task details here...',
            iconName: 'CheckCircle2',
        };
        setValue(`sections.${sectionIndex}.cardsList`, [...currentCards, newCard], { shouldDirty: true });
    };

    const removeStepCard = (sectionIndex: number, cardIndex: number) => {
        const currentCards = sections[sectionIndex]?.cardsList || [];
        const updatedCards = currentCards.filter((_, i) => i !== cardIndex);
        setValue(`sections.${sectionIndex}.cardsList`, updatedCards, { shouldDirty: true });
    };

    const moveStepCard = (sectionIndex: number, cardIndex: number, direction: 'up' | 'down') => {
        const currentCards = sections[sectionIndex]?.cardsList || [];
        const targetIndex = direction === 'up' ? cardIndex - 1 : cardIndex + 1;
        if (targetIndex < 0 || targetIndex >= currentCards.length) return;

        const updated = [...currentCards];
        const temp = updated[cardIndex];
        updated[cardIndex] = updated[targetIndex];
        updated[targetIndex] = temp;

        setValue(`sections.${sectionIndex}.cardsList`, updated, { shouldDirty: true });
    };

    const addBulletPoint = (sectionIndex: number) => {
        const currentBullets = sections[sectionIndex]?.bulletPoints || [];
        const updated = [...currentBullets, 'New optional highlight bullet point...'];
        setValue(`sections.${sectionIndex}.bulletPoints`, updated, { shouldDirty: true });
    };

    const removeBulletPoint = (sectionIndex: number, bulletIndex: number) => {
        const currentBullets = sections[sectionIndex]?.bulletPoints || [];
        const updated = currentBullets.filter((_, i) => i !== bulletIndex);
        setValue(`sections.${sectionIndex}.bulletPoints`, updated, { shouldDirty: true });
    };

    const removeSection = (index: number) => {
        const updated = sections.filter((_, i) => i !== index);
        setValue('sections', updated, { shouldDirty: true });

        if (editingIndex === index) {
            setEditingIndex(null);
        } else if (editingIndex !== null && editingIndex > index) {
            setEditingIndex(editingIndex - 1);
        }
    };

    const moveSection = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= sections.length) return;

        const updated = [...sections];
        const temp = updated[index];
        updated[index] = updated[targetIndex];
        updated[targetIndex] = temp;

        setValue('sections', updated, { shouldDirty: true });
        if (editingIndex === index) setEditingIndex(targetIndex);
        else if (editingIndex === targetIndex) setEditingIndex(index);
    };

    return (
        <FormProvider {...methods}>
            <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-8 relative">
                {/* Sticky Action Bar */}
                <div className="sticky top-4 z-40 bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                            <Layout className="w-3 h-3" /> Blog / Page Builder
                        </div>
                        <h1 className="text-lg font-extrabold text-white">Live Canvas ({sections.length} Sections)</h1>
                    </div>

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
                        >
                            <Plus className="w-4 h-4" /> Add Section <ChevronDown className="w-3.5 h-3.5 ml-1" />
                        </button>

                        {isAddDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden py-1.5">
                                <div className="px-3 py-2 border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Select Section Type
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {AVAILABLE_SECTION_TYPES.map((type) => {
                                        const Icon = type.icon;
                                        return (
                                            <button
                                                key={type.id}
                                                type="button"
                                                onClick={() => handleSelectSectionType(type.id)}
                                                className="w-full text-left px-3 py-2.5 hover:bg-indigo-600/20 hover:text-indigo-300 flex items-center gap-3 transition text-xs text-slate-200"
                                            >
                                                <div className="p-1.5 rounded-lg bg-slate-950 text-indigo-400">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="font-bold">{type.name}</p>
                                                    <p className="text-[10px] text-slate-400 truncate w-44">{type.description}</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Display Canvas */}
                <div className="space-y-6">
                    {sections.length === 0 ? (
                        <div className="text-center py-24 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                                <Layout className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold text-white">Your service canvas is completely empty</h3>
                                <p className="text-xs text-slate-400 max-w-sm mx-auto">Click "Add Section" above to choose service blocks with unique layouts.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAddDropdownOpen(true)}
                                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/20 inline-flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add Your First Section
                            </button>
                        </div>
                    ) : (
                        sections.map((sec, index) => {
                            const isEditing = editingIndex === index;

                            return (
                                <div key={sec.id} className="group relative rounded-3xl border border-slate-800 overflow-hidden shadow-xl transition-all">
                                    {/* Floating Action Controls */}
                                    <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 bg-slate-950/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 shadow-2xl">
                                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 mr-2">
                                            #{index + 1} {sec.type}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => setEditingIndex(isEditing ? null : index)}
                                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${isEditing ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                                                }`}
                                        >
                                            <Sliders className="w-3.5 h-3.5" /> {isEditing ? 'Close' : 'Edit'}
                                        </button>

                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => moveSection(index, 'up')}
                                                className="p-1.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg transition"
                                            >
                                                <MoveUp className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                        {index < sections.length - 1 && (
                                            <button
                                                type="button"
                                                onClick={() => moveSection(index, 'down')}
                                                className="p-1.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg transition"
                                            >
                                                <MoveDown className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => removeSection(index)}
                                            className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Config Editor Inline */}
                                    {isEditing && (
                                        <SectionEditor
                                            index={index}
                                            sec={sections[index]} // Ensures latest state from watch('sections')
                                            onClose={() => setEditingIndex(null)}
                                            addBulletPoint={addBulletPoint}
                                            removeBulletPoint={removeBulletPoint}
                                            addStepCard={addStepCard}
                                            removeStepCard={removeStepCard}
                                            moveStepCard={moveStepCard}
                                            addButton={addButton}
                                            removeButton={removeButton}
                                        />
                                    )}

                                    {/* Dedicated View UI Renderer */}
                                    <SectionViewRenderer sec={sec} />
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Preset Selector Modal */}
                {selectedTypeForStyles && (
                    <TemplateModal
                        selectedType={selectedTypeForStyles}
                        sampleOptions={getVariantsForType(selectedTypeForStyles.id, selectedTypeForStyles.name)}
                        selectedSampleIndex={selectedSampleIndex}
                        onSelectSampleIndex={setSelectedSampleIndex}
                        onClose={() => setSelectedTypeForStyles(null)}
                        onConfirm={handleConfirmAddSampleTemplate}
                    />
                )}
            </div>
        </FormProvider>
    );
}