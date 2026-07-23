import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';

import {
    ArrowRight,
    HelpCircle,
    ChevronRight,
    ShieldCheck,
    Code2,
    Terminal,
    Sparkles,
    Check,
    Layers,
} from 'lucide-react';
import { cmsService } from '@/services/api/endpoints';
import OrderServiceButton from '@/components/OrderServiceButton';
import { FeatureItem, FeaturesIndustriesPayload, IndustryItem } from '@/@types/cms';

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

/**
 * Universal text extractor to safely prevent "Objects are not valid as a React child" errors
 */
function getText(value: any): string {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    if (typeof value === 'object') {
        return value.text || value.title || value.label || value.heading || value.name || value.desc || value.description || '';
    }
    return '';
}

/**
 * 1. DYNAMIC METADATA GENERATION FOR SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        const serviceData = await cmsService.getServiceBySlug(slug);

        if (!serviceData || serviceData.status !== 'Published') {
            return {
                title: 'Service Not Found',
            };
        }

        const details = Array.isArray(serviceData.cms_service_details)
            ? serviceData.cms_service_details[0] || {}
            : serviceData.cms_service_details || {};

        const seo = details.seo || {};

        const baseUrl = 'https://prawez.com';
        const canonicalUrl = seo.canonicalUrl || `${baseUrl}/services/${slug}`;

        return {
            title: seo.title || serviceData.title,
            description:
                seo.description ||
                `High-performance ${serviceData.title} services tailored for modern scalability.`,
            keywords: seo.keywords ? (Array.isArray(seo.keywords) ? seo.keywords : seo.keywords.split(',').map((k: string) => k.trim())) : [],
            alternates: {
                canonical: canonicalUrl,
            },
            openGraph: {
                title: seo.title || serviceData.title,
                description: seo.description || undefined,
                url: canonicalUrl,
                siteName: 'Prawez Engineering',
                images: seo.ogImage
                    ? [
                        {
                            url: seo.ogImage,
                            alt: seo.ogImageAlt || seo.title || serviceData.title,
                        },
                    ]
                    : [],
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title: seo.title || serviceData.title,
                description: seo.description || undefined,
                images: seo.ogImage ? [seo.ogImage] : [],
            },
        };
    } catch (error) {
        console.error('Metadata generation error:', error);
        return {
            title: 'Service Details',
        };
    }
}

/**
 * 2. DYNAMIC PAGE COMPONENT
 */
export default async function ServiceDetailsPage({ params }: PageProps) {
    const { slug } = await params;

    let serviceData: any = null;

    try {
        serviceData = await cmsService.getServiceBySlug(slug);
        // console.log(serviceData)
    } catch (error) {
        console.error('Error fetching service page:', error);
    }

    // Guard: Return 404 if service doesn't exist or isn't published
    if (!serviceData || serviceData.status !== 'Published') {
        notFound();
    }

    // Handle both Object and Array structures for cms_service_details
    const details = Array.isArray(serviceData.cms_service_details)
        ? serviceData.cms_service_details[0] || {}
        : serviceData.cms_service_details || {};

    // Destructure payload properties safely
    const hero = details.hero || {};
    const services = details.services || {};
    const whyChoose = details.why_choose || {};
    const process = details.process || {};
    const whyWorkWithMe = details.why_work_with_me || {};
    const contentSections = details.content_sections || [];
    const faqs = details.faqs || [];
    const cta = details.cta || {};
    // const features_industries = details.features_industries || {};
    const features_industries = (details?.features_industries || {}) as FeaturesIndustriesPayload;

    return (
        <div className="bg-white text-slate-900 selection:bg-indigo-500 selection:text-white min-h-screen font-sans overflow-x-hidden antialiased">

            {/* 1. HERO SECTION — kept as a darker bookend band for image contrast and text legibility */}
            <section className="relative pt-32 pb-32 sm:pt-40 sm:pb-40 bg-slate-900 overflow-hidden">
                {/* Full Section Background Image Layer */}
                {hero.heroImage && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={typeof hero.heroImage === 'string' ? hero.heroImage : hero.heroImage?.url}
                            alt={serviceData.title}
                            className="w-full h-full object-cover object-right filter brightness-[0.45] contrast-110 -scale-x-100 m-0 p-0 block"
                        />
                        {/* Balanced gradient overlay: Keeps text completely readable on the left while fading into the background image */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-slate-900/40" />
                    </div>
                )}

                {/* Outer Container with generous left and outer padding */}
                <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 relative z-10">
                    {/* Increased text block width (max-w-2xl sm:max-w-3xl) and added top spacing */}
                    <div className="max-w-2xl sm:max-w-3xl space-y-7 pt-6 sm:pt-10">
                        {hero.badge && (
                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-widest shadow-lg backdrop-blur-md ring-1 ring-inset ring-white/5">
                                <Sparkles className="w-4 h-4 text-indigo-300 animate-pulse" />
                                <span>{getText(hero.badge)}</span>
                            </div>
                        )}

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                            {hero.headline || serviceData.title}
                        </h1>

                        {/* Safe HTML or paragraph string */}
                        {hero.paragraphHtml ? (
                            <div
                                className="prose prose-invert max-w-full w-full overflow-hidden break-words text-slate-200 text-base sm:text-lg leading-relaxed font-normal [&>p]:mb-3"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        typeof hero.paragraphHtml === 'string'
                                            ? hero.paragraphHtml
                                            : getText(hero.paragraphHtml)
                                    )
                                }}
                            />
                        ) : (
                            <p className="text-slate-200 text-base sm:text-lg leading-relaxed break-words">
                                {getText(details.seo?.description) || serviceData.title}
                            </p>
                        )}

                        {/* Action Buttons */}
                        <div className="pt-4 flex flex-wrap items-center gap-4">
                            <div className="shadow-lg shadow-indigo-900/30 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                                <OrderServiceButton title={serviceData.title} />
                            </div>

                            {hero.buttons && Array.isArray(hero.buttons) && hero.buttons[1] && (
                                <a
                                    href={hero.buttons[1].url || hero.buttons[1].href || '#services'}
                                    className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-300 shadow-sm hover:-translate-y-0.5 backdrop-blur-sm"
                                >
                                    <span>{getText(hero.buttons[1]) || 'Explore Services'}</span>
                                    <ArrowRight className="w-4 h-4 text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {/* 2. SERVICES LIST CARDS — light band */}
            {services.cards && services.cards.length > 0 && (
                <section id="services" className="relative py-20 bg-white border-b border-slate-100">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                                {services.sectionTitle || 'Specialized Service Scope'}
                            </h2>
                            {services.sectionSubtitle && (
                                <p className="text-slate-500 mt-4 text-base leading-relaxed">
                                    {getText(services.sectionSubtitle)}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {services.cards.map((card: any, idx: number) => {
                                // Check for focusPoints FIRST, then fall back to points
                                const capabilities = card.focusPoints || card.points || [];
                                const listTitle = card.focusTitle || 'Key Capabilities:';

                                return (
                                    <div
                                        key={card?.id || idx}
                                        className="group bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-indigo-300 p-6 sm:p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 relative overflow-hidden"
                                    >
                                        <div>
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300">
                                                <Code2 className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-3 group-hover:text-indigo-600 transition-colors">
                                                {card.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-6 font-normal">
                                                {getText(card.description || card.desc)}
                                            </p>
                                        </div>

                                        {/* Renders focusPoints array */}
                                        {Array.isArray(capabilities) && capabilities.length > 0 && (
                                            <div className="border-t border-slate-100 pt-4 mt-auto">
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                                                    {listTitle}
                                                </span>
                                                <ul className="space-y-1.5">
                                                    {capabilities.map((pt: any, pIdx: number) => (
                                                        <li key={pt?.id || pIdx} className="text-xs text-slate-600 flex items-center gap-2">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                                                            {/* Handles both plain strings like "SaaS platforms" AND objects */}
                                                            <span>{getText(pt)}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
            {/* 3. WHY CHOOSE SECTION — its own dark indigo accent card so it still reads as a distinct beat */}
            {whyChoose.title && (
                <section className="relative py-20 bg-slate-50 border-b border-slate-100">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-8 sm:p-12 border border-indigo-500/20 relative overflow-hidden shadow-xl">
                            <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative z-10 max-w-3xl">
                                <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs uppercase tracking-widest mb-3">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Strategic Advantage</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                    {whyChoose.title}
                                </h2>

                                {whyChoose.description && (
                                    <p className="text-indigo-100/80 mt-4 text-base sm:text-lg leading-relaxed">
                                        {getText(whyChoose.description)}
                                    </p>
                                )}

                                {whyChoose.features && Array.isArray(whyChoose.features) && (
                                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
                                        {whyChoose.features.map((feat: any, bIdx: number) => (
                                            <div
                                                key={feat?.id || bIdx}
                                                className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-indigo-400/40 transition-colors flex items-center gap-3 text-indigo-100 font-medium text-sm"
                                            >
                                                <Check className="w-4 h-4 text-indigo-300 shrink-0" />
                                                <span>{getText(feat)}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {whyChoose.bottomDescription && (
                                    <p className="text-indigo-200/60 text-xs sm:text-sm mt-8 pt-6 border-t border-white/10 leading-relaxed">
                                        {getText(whyChoose.bottomDescription)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 4. PROCESS WORKFLOW SECTION — light band */}
            {process.title && (
                <section className="relative py-20 bg-white border-b border-slate-100">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* HEADER BLOCK */}
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            {process.badge && (
                                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full inline-block mb-3.5 border border-indigo-100">
                                    {getText(process.badge)}
                                </span>
                            )}
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                                {getText(process.title)}
                            </h2>
                            {process.subtitle && (
                                <p className="text-slate-500 mt-4 text-base leading-relaxed">
                                    {getText(process.subtitle)}
                                </p>
                            )}
                        </div>

                        {/* PROCESS TIMELINE */}
                        {process.steps && Array.isArray(process.steps) && process.steps.length > 0 && (
                            <div className="relative border-l border-slate-200 ml-4 md:ml-8 space-y-10">
                                {process.steps.map((step: any, pIdx: number) => {
                                    const stepNum = step?.stepNumber || step?.step || String(pIdx + 1).padStart(2, '0');
                                    const stepTitle = step?.title || step?.stepTitle;
                                    const stepDesc = step?.description || step?.desc;

                                    return (
                                        <div key={step?.id || pIdx} className="relative pl-8 sm:pl-12 group">
                                            {/* STEP BADGE NUMBER */}
                                            <div className="absolute -left-[17px] top-0 flex items-center justify-center h-8 w-8 rounded-full bg-white border-2 border-indigo-500 font-mono text-xs font-bold text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-indigo-300">
                                                {stepNum}
                                            </div>

                                            {/* STEP CARD CONTENT */}
                                            <div className="bg-slate-50/80 p-6 sm:p-7 rounded-2xl border border-slate-200 group-hover:border-indigo-200 transition-colors duration-300 shadow-sm max-w-5xl space-y-3">
                                                {/* TITLE */}
                                                {stepTitle && (
                                                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                                                        {getText(stepTitle)}
                                                    </h3>
                                                )}

                                                {/* MAIN DESCRIPTION */}
                                                {stepDesc && (
                                                    <p className="text-slate-600 text-sm leading-relaxed">
                                                        {getText(stepDesc)}
                                                    </p>
                                                )}

                                                {/* SUBTEXT / INTRO TO BULLETS */}
                                                {step?.subText && (
                                                    <p className="text-slate-500 text-xs font-medium pt-1">
                                                        {getText(step.subText)}
                                                    </p>
                                                )}

                                                {/* BULLET POINTS */}
                                                {Array.isArray(step?.bulletList) && step.bulletList.length > 0 && (
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-600">
                                                        {step.bulletList.map((bullet: string, bIdx: number) => (
                                                            <li key={bIdx} className="flex items-start gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                                                <span>{getText(bullet)}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {/* DETAILS (BACKWARD COMPATIBILITY) */}
                                                {step?.details && (
                                                    <p className="text-slate-500 text-xs leading-relaxed border-t border-slate-200 pt-3">
                                                        {getText(step.details)}
                                                    </p>
                                                )}

                                                {/* SECOND PARAGRAPH */}
                                                {step?.secondParagraph && (
                                                    <p className="text-slate-500 text-xs leading-relaxed border-t border-slate-200 pt-3">
                                                        {getText(step.secondParagraph)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* FEATURES & INDUSTRIES DYNAMIC SECTION — light gray band, distinct from the white Process section above */}
            {features_industries && (
                <section className="relative py-24 bg-slate-50 border-b border-slate-100">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-16 lg:grid-cols-2">

                            {/* Column A: Frequently Built Features */}
                            <div>
                                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                                    {features_industries.featuresSection?.title || "Frequently Built Features"}
                                </h3>
                                <p className="text-slate-500 text-sm mb-6">
                                    {features_industries.featuresSection?.subtitle || "Some of the solutions I regularly engineer into custom web applications:"}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {features_industries.featuresSection?.items?.map((item: FeatureItem, fIdx: number) => (
                                        <span
                                            key={item.id || fIdx}
                                            className="text-xs bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg font-medium shadow-sm"
                                        >
                                            {item.label}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Column B: Industries Served */}
                            <div>
                                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                                    {features_industries.industriesSection?.title || "Industries I Work With"}
                                </h3>
                                <p className="text-slate-500 text-sm mb-6">
                                    {features_industries.industriesSection?.subtitle || "React structures fit seamlessly into many domain configurations, including:"}
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {features_industries.industriesSection?.items?.map((ind: IndustryItem, iIdx: number) => (
                                        <div
                                            key={ind.id || iIdx}
                                            className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 transition-colors text-slate-700 font-medium text-sm shadow-sm"
                                        >
                                            <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                                            {ind.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            )}

            {/* 5. WHY WORK WITH ME — white band */}
            {whyWorkWithMe.title && (
                <section className="relative py-20 bg-white border-b border-slate-100">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                                    <Terminal className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                                        {whyWorkWithMe.title}
                                    </h3>
                                    {whyWorkWithMe.subtitle && (
                                        <p className="text-slate-600 mt-3 text-base leading-relaxed">
                                            {getText(whyWorkWithMe.subtitle)}
                                        </p>
                                    )}

                                    {/* FIXED: Safely maps bullet objects { id, text } */}
                                    {whyWorkWithMe.bullets && Array.isArray(whyWorkWithMe.bullets) && (
                                        <div className="mt-6 space-y-3 text-sm text-slate-700 font-normal">
                                            {whyWorkWithMe.bullets.map((bullet: any, bIdx: number) => (
                                                <p key={bullet?.id || bIdx} className="flex items-start gap-2.5">
                                                    <span className="text-indigo-600 font-bold mt-0.5">✓</span>
                                                    <span>{getText(bullet)}</span>
                                                </p>
                                            ))}
                                        </div>
                                    )}

                                    {whyWorkWithMe.footerText && (
                                        <p className="text-slate-400 text-xs mt-6 pt-4 border-t border-slate-200 leading-relaxed">
                                            {getText(whyWorkWithMe.footerText)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 6. ADDITIONAL CONTENT SECTIONS — light gray band */}
            {contentSections && contentSections[0].heading !== '' && Array.isArray(contentSections) && contentSections.length > 0 && (
                <section className="relative py-20 bg-slate-50 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                        {contentSections.map((sec: any, idx: number) => (
                            <div
                                key={sec?.id || idx}
                                className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 hover:border-indigo-200 transition-colors space-y-4 shadow-sm"
                            >
                                {sec.heading && (
                                    <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-indigo-600" />
                                        {sec.heading}
                                    </h2>
                                )}
                                {sec.body && (
                                    <div className="prose max-w-none text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                                        {getText(sec.body)}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 7. FREQUENTLY ASKED QUESTIONS — white band */}
            {faqs && Array.isArray(faqs) && faqs.length > 0 && (
                <section className="relative py-20 bg-white border-b border-slate-100">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full inline-block mb-3.5 border border-indigo-100">
                                FAQ Matrix
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                                Frequently Asked Questions
                            </h2>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                            {faqs.map((faq: any, fIdx: number) => (
                                <div
                                    key={faq?.id || fIdx}
                                    className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:border-indigo-300 hover:bg-white hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-start gap-3">
                                        <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="text-base font-bold text-slate-900 tracking-tight">
                                                {faq.question}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-relaxed mt-2 font-normal">
                                                {getText(faq.answerHtml)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 8. CALL TO ACTION FOOTER BANNER — darker bookend band, mirrors the hero */}
            <section className="relative py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8 relative z-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {cta.headline || `Ready to Engineer Your ${serviceData.title}?`}
                    </h2>
                    <p className="text-slate-300 mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                        {getText(cta.subheadline) ||
                            "Let's map out your architecture requirements, deployment strategy, and technical scope."}
                    </p>
                    <div className="mt-8 flex justify-center">
                        <OrderServiceButton title={serviceData.title} />
                    </div>
                </div>
            </section>

        </div>
    );
}

// import React from 'react';
// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';
// import Link from 'next/link';
// import DOMPurify from 'isomorphic-dompurify';

// import {
//     ArrowRight,
//     HelpCircle,
//     ChevronRight,
//     ShieldCheck,
//     Code2,
//     Terminal,
//     Sparkles,
//     Check,
//     Layers,
// } from 'lucide-react';
// import { cmsService } from '@/services/api/endpoints';
// import OrderServiceButton from '@/components/OrderServiceButton';
// import { FeatureItem, FeaturesIndustriesPayload, IndustryItem } from '@/@types/cms';

// interface PageProps {
//     params: Promise<{
//         slug: string;
//     }>;
// }

// /**
//  * Universal text extractor to safely prevent "Objects are not valid as a React child" errors
//  */
// function getText(value: any): string {
//     if (value === null || value === undefined) return '';
//     if (typeof value === 'string' || typeof value === 'number') return String(value);
//     if (typeof value === 'object') {
//         return value.text || value.title || value.label || value.heading || value.name || value.desc || value.description || '';
//     }
//     return '';
// }

// /**
//  * 1. DYNAMIC METADATA GENERATION FOR SEO
//  */
// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//     const { slug } = await params;

//     try {
//         const serviceData = await cmsService.getServiceBySlug(slug);

//         if (!serviceData || serviceData.status !== 'Published') {
//             return {
//                 title: 'Service Not Found',
//             };
//         }

//         const details = Array.isArray(serviceData.cms_service_details)
//             ? serviceData.cms_service_details[0] || {}
//             : serviceData.cms_service_details || {};

//         const seo = details.seo || {};

//         const baseUrl = 'https://prawez.com';
//         const canonicalUrl = seo.canonicalUrl || `${baseUrl}/services/${slug}`;

//         return {
//             title: seo.title || serviceData.title,
//             description:
//                 seo.description ||
//                 `High-performance ${serviceData.title} services tailored for modern scalability.`,
//             keywords: seo.keywords ? (Array.isArray(seo.keywords) ? seo.keywords : seo.keywords.split(',').map((k: string) => k.trim())) : [],
//             alternates: {
//                 canonical: canonicalUrl,
//             },
//             openGraph: {
//                 title: seo.title || serviceData.title,
//                 description: seo.description || undefined,
//                 url: canonicalUrl,
//                 siteName: 'Prawez Engineering',
//                 images: seo.ogImage
//                     ? [
//                         {
//                             url: seo.ogImage,
//                             alt: seo.ogImageAlt || seo.title || serviceData.title,
//                         },
//                     ]
//                     : [],
//                 type: 'article',
//             },
//             twitter: {
//                 card: 'summary_large_image',
//                 title: seo.title || serviceData.title,
//                 description: seo.description || undefined,
//                 images: seo.ogImage ? [seo.ogImage] : [],
//             },
//         };
//     } catch (error) {
//         console.error('Metadata generation error:', error);
//         return {
//             title: 'Service Details',
//         };
//     }
// }

// /**
//  * 2. DYNAMIC PAGE COMPONENT
//  */
// export default async function ServiceDetailsPage({ params }: PageProps) {
//     const { slug } = await params;

//     let serviceData: any = null;

//     try {
//         serviceData = await cmsService.getServiceBySlug(slug);
//         // console.log(serviceData)
//     } catch (error) {
//         console.error('Error fetching service page:', error);
//     }

//     // Guard: Return 404 if service doesn't exist or isn't published
//     if (!serviceData || serviceData.status !== 'Published') {
//         notFound();
//     }

//     // Handle both Object and Array structures for cms_service_details
//     const details = Array.isArray(serviceData.cms_service_details)
//         ? serviceData.cms_service_details[0] || {}
//         : serviceData.cms_service_details || {};

//     // Destructure payload properties safely
//     const hero = details.hero || {};
//     const services = details.services || {};
//     const whyChoose = details.why_choose || {};
//     const process = details.process || {};
//     const whyWorkWithMe = details.why_work_with_me || {};
//     const contentSections = details.content_sections || [];
//     const faqs = details.faqs || [];
//     const cta = details.cta || {};
//     // const features_industries = details.features_industries || {};
//     const features_industries = (details?.features_industries || {}) as FeaturesIndustriesPayload;

//     return (
//         <div className="bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white min-h-screen font-sans overflow-x-hidden">

//             {/* AMBIENT BACKGROUND GLOW EFFECTS */}
//             <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
//                 <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-blue-600/10 blur-[130px] rounded-full" />
//                 <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
//                 <div className="absolute bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
//             </div>

//             {/* 1. HERO SECTION */}
//             <section className="relative z-10 pt-32 pb-32 sm:pt-40 sm:pb-40 bg-slate-950 overflow-hidden">
//                 {/* Full Section Background Image Layer */}
//                 {hero.heroImage && (
//                     <div className="absolute inset-0 z-0">
//                         <img
//                             src={typeof hero.heroImage === 'string' ? hero.heroImage : hero.heroImage?.url}
//                             alt={serviceData.title}
//                             className="w-full h-full object-cover object-right filter brightness-[0.35] contrast-110 -scale-x-100 m-0 p-0 block"
//                         />
//                         {/* Balanced gradient overlay: Keeps text completely readable on the left while fading into the background image */}
//                         <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
//                     </div>
//                 )}

//                 {/* Outer Container with generous left and outer padding */}
//                 <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 relative z-10">
//                     {/* Increased text block width (max-w-2xl sm:max-w-3xl) and added top spacing */}
//                     <div className="max-w-2xl sm:max-w-3xl space-y-6 pt-6 sm:pt-10">
//                         {hero.badge && (
//                             <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-950/50 backdrop-blur-md">
//                                 <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
//                                 <span>{getText(hero.badge)}</span>
//                             </div>
//                         )}

//                         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
//                             {hero.headline || serviceData.title}
//                         </h1>

//                         {/* Safe HTML or paragraph string */}
//                         {hero.paragraphHtml ? (
//                             <div
//                                 className="prose prose-invert max-w-full w-full overflow-hidden break-words text-slate-300 text-base sm:text-lg leading-relaxed font-normal [&>p]:mb-3"
//                                 dangerouslySetInnerHTML={{
//                                     __html: DOMPurify.sanitize(
//                                         typeof hero.paragraphHtml === 'string'
//                                             ? hero.paragraphHtml
//                                             : getText(hero.paragraphHtml)
//                                     )
//                                 }}
//                             />
//                         ) : (
//                             <p className="text-slate-300 text-base sm:text-lg leading-relaxed break-words">
//                                 {getText(details.seo?.description) || serviceData.title}
//                             </p>
//                         )}

//                         {/* Action Buttons */}
//                         <div className="pt-4 flex flex-wrap items-center gap-4">
//                             <div className="shadow-lg shadow-indigo-600/20 rounded-xl transition-transform hover:-translate-y-0.5">
//                                 <OrderServiceButton title={serviceData.title} />
//                             </div>

//                             {hero.buttons && Array.isArray(hero.buttons) && hero.buttons[1] && (
//                                 <a
//                                     href={hero.buttons[1].url || hero.buttons[1].href || '#services'}
//                                     className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all duration-200 shadow-sm hover:border-slate-600 backdrop-blur-sm"
//                                 >
//                                     <span>{getText(hero.buttons[1]) || 'Explore Services'}</span>
//                                     <ArrowRight className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-1" />
//                                 </a>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             {/* 2. SERVICES LIST CARDS */}
//             {services.cards && services.cards.length > 0 && (
//                 <section id="services" className="relative z-10 py-20 bg-slate-900/40 border-b border-slate-800/60">
//                     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="text-center mb-16 max-w-2xl mx-auto">
//                             <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
//                                 {services.sectionTitle || 'Specialized Service Scope'}
//                             </h2>
//                             {services.sectionSubtitle && (
//                                 <p className="text-slate-400 mt-4 text-base leading-relaxed">
//                                     {getText(services.sectionSubtitle)}
//                                 </p>
//                             )}
//                         </div>

//                         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                             {services.cards.map((card: any, idx: number) => {
//                                 // Check for focusPoints FIRST, then fall back to points
//                                 const capabilities = card.focusPoints || card.points || [];
//                                 const listTitle = card.focusTitle || 'Key Capabilities:';

//                                 return (
//                                     <div
//                                         key={card?.id || idx}
//                                         className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 p-6 sm:p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden"
//                                     >
//                                         <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />

//                                         <div>
//                                             <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
//                                                 <Code2 className="w-5 h-5" />
//                                             </div>
//                                             <h3 className="text-lg font-bold text-white tracking-tight mb-3 group-hover:text-indigo-300 transition-colors">
//                                                 {card.title}
//                                             </h3>
//                                             <p className="text-slate-400 text-sm leading-relaxed mb-6 font-normal">
//                                                 {getText(card.description || card.desc)}
//                                             </p>
//                                         </div>

//                                         {/* Renders focusPoints array */}
//                                         {Array.isArray(capabilities) && capabilities.length > 0 && (
//                                             <div className="border-t border-slate-800/80 pt-4 mt-auto">
//                                                 <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
//                                                     {listTitle}
//                                                 </span>
//                                                 <ul className="space-y-1.5">
//                                                     {capabilities.map((pt: any, pIdx: number) => (
//                                                         <li key={pt?.id || pIdx} className="text-xs text-slate-300 flex items-center gap-2">
//                                                             <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
//                                                             {/* Handles both plain strings like "SaaS platforms" AND objects */}
//                                                             <span>{getText(pt)}</span>
//                                                         </li>
//                                                     ))}
//                                                 </ul>
//                                             </div>
//                                         )}
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </section>
//             )}
//             {/* 3. WHY CHOOSE SECTION */}
//             {whyChoose.title && (
//                 <section className="relative z-10 py-20 border-b border-slate-800/60">
//                     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-8 sm:p-12 border border-indigo-500/20 relative overflow-hidden shadow-2xl">
//                             <div className="relative z-10 max-w-3xl">
//                                 <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-widest mb-3">
//                                     <ShieldCheck className="w-4 h-4" />
//                                     <span>Strategic Advantage</span>
//                                 </div>
//                                 <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
//                                     {whyChoose.title}
//                                 </h2>

//                                 {whyChoose.description && (
//                                     <p className="text-indigo-200/80 mt-4 text-base sm:text-lg leading-relaxed">
//                                         {getText(whyChoose.description)}
//                                     </p>
//                                 )}

//                                 {whyChoose.features && Array.isArray(whyChoose.features) && (
//                                     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
//                                         {whyChoose.features.map((feat: any, bIdx: number) => (
//                                             <div
//                                                 key={feat?.id || bIdx}
//                                                 className="bg-slate-900/70 backdrop-blur-md p-4 rounded-xl border border-indigo-500/10 flex items-center gap-3 text-indigo-200 font-medium text-sm"
//                                             >
//                                                 <Check className="w-4 h-4 text-indigo-400 shrink-0" />
//                                                 <span>{getText(feat)}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}

//                                 {whyChoose.bottomDescription && (
//                                     <p className="text-slate-400 text-xs sm:text-sm mt-8 pt-6 border-t border-indigo-500/20 leading-relaxed">
//                                         {getText(whyChoose.bottomDescription)}
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             )}

//             {/* 4. PROCESS WORKFLOW SECTION */}
//             {process.title && (
//                 <section className="relative z-10 py-20 bg-slate-900/30 border-b border-slate-800/60">
//                     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//                         {/* HEADER BLOCK */}
//                         <div className="text-center mb-16 max-w-2xl mx-auto">
//                             {process.badge && (
//                                 <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3.5 py-1.5 rounded-full inline-block mb-3.5 border border-indigo-500/20">
//                                     {getText(process.badge)}
//                                 </span>
//                             )}
//                             <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
//                                 {getText(process.title)}
//                             </h2>
//                             {process.subtitle && (
//                                 <p className="text-slate-400 mt-4 text-base leading-relaxed">
//                                     {getText(process.subtitle)}
//                                 </p>
//                             )}
//                         </div>

//                         {/* PROCESS TIMELINE */}
//                         {process.steps && Array.isArray(process.steps) && process.steps.length > 0 && (
//                             <div className="relative border-l border-slate-800 ml-4 md:ml-8 space-y-10">
//                                 {process.steps.map((step: any, pIdx: number) => {
//                                     const stepNum = step?.stepNumber || step?.step || String(pIdx + 1).padStart(2, '0');
//                                     const stepTitle = step?.title || step?.stepTitle;
//                                     const stepDesc = step?.description || step?.desc;

//                                     return (
//                                         <div key={step?.id || pIdx} className="relative pl-8 sm:pl-12 group">
//                                             {/* STEP BADGE NUMBER */}
//                                             <div className="absolute -left-[17px] top-0 flex items-center justify-center h-8 w-8 rounded-full bg-slate-950 border-2 border-indigo-500 font-mono text-xs font-bold text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-md">
//                                                 {stepNum}
//                                             </div>

//                                             {/* STEP CARD CONTENT */}
//                                             <div className="bg-slate-900/80 p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-sm max-w-3xl space-y-3">
//                                                 {/* TITLE */}
//                                                 {stepTitle && (
//                                                     <h3 className="text-lg font-bold text-white tracking-tight">
//                                                         {getText(stepTitle)}
//                                                     </h3>
//                                                 )}

//                                                 {/* MAIN DESCRIPTION */}
//                                                 {stepDesc && (
//                                                     <p className="text-slate-300 text-sm leading-relaxed">
//                                                         {getText(stepDesc)}
//                                                     </p>
//                                                 )}

//                                                 {/* SUBTEXT / INTRO TO BULLETS */}
//                                                 {step?.subText && (
//                                                     <p className="text-slate-400 text-xs font-medium pt-1">
//                                                         {getText(step.subText)}
//                                                     </p>
//                                                 )}

//                                                 {/* BULLET POINTS */}
//                                                 {Array.isArray(step?.bulletList) && step.bulletList.length > 0 && (
//                                                     <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-300">
//                                                         {step.bulletList.map((bullet: string, bIdx: number) => (
//                                                             <li key={bIdx} className="flex items-start gap-2">
//                                                                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
//                                                                 <span>{getText(bullet)}</span>
//                                                             </li>
//                                                         ))}
//                                                     </ul>
//                                                 )}

//                                                 {/* DETAILS (BACKWARD COMPATIBILITY) */}
//                                                 {step?.details && (
//                                                     <p className="text-slate-400 text-xs leading-relaxed border-t border-slate-800/80 pt-3">
//                                                         {getText(step.details)}
//                                                     </p>
//                                                 )}

//                                                 {/* SECOND PARAGRAPH */}
//                                                 {step?.secondParagraph && (
//                                                     <p className="text-slate-400 text-xs leading-relaxed border-t border-slate-800/80 pt-3">
//                                                         {getText(step.secondParagraph)}
//                                                     </p>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         )}
//                     </div>
//                 </section>
//             )}

//             {/* FEATURES & INDUSTRIES DYNAMIC SECTION */}
//             {features_industries && (
//                 <section className="py-24 bg-white border-t border-gray-100">
//                     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="grid gap-16 lg:grid-cols-2">

//                             {/* Column A: Frequently Built Features */}
//                             <div>
//                                 <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
//                                     {features_industries.featuresSection?.title || "Frequently Built Features"}
//                                 </h3>
//                                 <p className="text-gray-500 text-sm mb-6">
//                                     {features_industries.featuresSection?.subtitle || "Some of the solutions I regularly engineer into custom web applications:"}
//                                 </p>
//                                 <div className="flex flex-wrap gap-2">
//                                     {features_industries.featuresSection?.items?.map((item: FeatureItem, fIdx: number) => (
//                                         <span
//                                             key={item.id || fIdx}
//                                             className="text-xs bg-gray-50 text-gray-700 border border-gray-200/60 px-3 py-1.5 rounded-lg font-medium"
//                                         >
//                                             {item.label}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Column B: Industries Served */}
//                             <div>
//                                 <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
//                                     {features_industries.industriesSection?.title || "Industries I Work With"}
//                                 </h3>
//                                 <p className="text-gray-500 text-sm mb-6">
//                                     {features_industries.industriesSection?.subtitle || "React structures fit seamlessly into many domain configurations, including:"}
//                                 </p>
//                                 <div className="grid grid-cols-2 gap-3">
//                                     {features_industries.industriesSection?.items?.map((ind: IndustryItem, iIdx: number) => (
//                                         <div
//                                             key={ind.id || iIdx}
//                                             className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/50 border border-gray-100 text-gray-800 font-medium text-sm"
//                                         >
//                                             <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
//                                             {ind.name}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </section>
//             )}

//             {/* 5. WHY WORK WITH ME */}
//             {whyWorkWithMe.title && (
//                 <section className="relative z-10 py-20 bg-slate-900/20 border-b border-slate-800/60">
//                     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl max-w-4xl mx-auto">
//                             <div className="flex flex-col md:flex-row gap-8 items-start">
//                                 <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
//                                     <Terminal className="w-6 h-6" />
//                                 </div>
//                                 <div>
//                                     <h3 className="text-2xl font-bold text-white tracking-tight">
//                                         {whyWorkWithMe.title}
//                                     </h3>
//                                     {whyWorkWithMe.subtitle && (
//                                         <p className="text-slate-300 mt-3 text-base leading-relaxed">
//                                             {getText(whyWorkWithMe.subtitle)}
//                                         </p>
//                                     )}

//                                     {/* FIXED: Safely maps bullet objects { id, text } */}
//                                     {whyWorkWithMe.bullets && Array.isArray(whyWorkWithMe.bullets) && (
//                                         <div className="mt-6 space-y-3 text-sm text-slate-300 font-normal">
//                                             {whyWorkWithMe.bullets.map((bullet: any, bIdx: number) => (
//                                                 <p key={bullet?.id || bIdx} className="flex items-start gap-2.5">
//                                                     <span className="text-indigo-400 font-bold mt-0.5">✓</span>
//                                                     <span>{getText(bullet)}</span>
//                                                 </p>
//                                             ))}
//                                         </div>
//                                     )}

//                                     {whyWorkWithMe.footerText && (
//                                         <p className="text-slate-500 text-xs mt-6 pt-4 border-t border-slate-800/80 leading-relaxed">
//                                             {getText(whyWorkWithMe.footerText)}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             )}

//             {/* 6. ADDITIONAL CONTENT SECTIONS */}
//             {contentSections && contentSections[0].heading !== '' && Array.isArray(contentSections) && contentSections.length > 0 && (
//                 <section className="relative z-10 py-20 border-b border-slate-800/60">
//                     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
//                         {contentSections.map((sec: any, idx: number) => (
//                             <div
//                                 key={sec?.id || idx}
//                                 className="bg-slate-900/80 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4"
//                             >
//                                 {sec.heading && (
//                                     <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
//                                         <Layers className="w-5 h-5 text-indigo-400" />
//                                         {sec.heading}
//                                     </h2>
//                                 )}
//                                 {sec.body && (
//                                     <div className="prose prose-invert max-w-none text-sm text-slate-300 leading-relaxed whitespace-pre-line">
//                                         {getText(sec.body)}
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             )}

//             {/* 7. FREQUENTLY ASKED QUESTIONS */}
//             {faqs && Array.isArray(faqs) && faqs.length > 0 && (
//                 <section className="relative z-10 py-20 border-b border-slate-800/60">
//                     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="text-center mb-16 max-w-2xl mx-auto">
//                             <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3.5 py-1.5 rounded-full inline-block mb-3.5 border border-indigo-500/20">
//                                 FAQ Matrix
//                             </span>
//                             <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
//                                 Frequently Asked Questions
//                             </h2>
//                         </div>

//                         <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
//                             {faqs.map((faq: any, fIdx: number) => (
//                                 <div
//                                     key={faq?.id || fIdx}
//                                     className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition-colors"
//                                 >
//                                     <div className="flex items-start gap-3">
//                                         <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
//                                         <div>
//                                             <h3 className="text-base font-bold text-white tracking-tight">
//                                                 {faq.question}
//                                             </h3>
//                                             <p className="text-slate-400 text-sm leading-relaxed mt-2 font-normal">
//                                                 {getText(faq.answerHtml)}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>
//             )}

//             {/* 8. CALL TO ACTION FOOTER BANNER */}
//             <section className="relative z-10 py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
//                 <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
//                     <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
//                         {cta.headline || `Ready to Engineer Your ${serviceData.title}?`}
//                     </h2>
//                     <p className="text-slate-400 mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
//                         {getText(cta.subheadline) ||
//                             "Let's map out your architecture requirements, deployment strategy, and technical scope."}
//                     </p>
//                     <div className="mt-8 flex justify-center">
//                         <OrderServiceButton title={serviceData.title} />
//                     </div>
//                 </div>
//             </section>

//         </div>
//     );
// }