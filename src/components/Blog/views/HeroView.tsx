import React from 'react';
import { PageSectionItem } from '../types';


// =========================================================
// 1. Dedicated Sub-Component for Option 1 (Profile Services)
// =========================================================
const ProfileServicesHero: React.FC<{ sec: PageSectionItem }> = ({ sec }) => (
  <section className="relative overflow-hidden bg-[#0A0D14] text-white min-h-[560px] flex items-center py-16 px-6 md:px-16 border-b border-slate-800">
    {sec.imageUrl && (
      <div className="absolute inset-0 z-0">
        <img
          src={sec.imageUrl}
          alt={sec.title}
          className="w-full h-full object-cover object-right opacity-25 filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14] via-[#0A0D14]/90 to-transparent" />
      </div>
    )}

    <div className="relative z-10 max-w-3xl space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold tracking-wider uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        React.js Development Services
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
        {sec.title}
      </h1>

      <div className="text-xs sm:text-sm md:text-base text-slate-300/90 leading-relaxed space-y-4 whitespace-pre-line font-normal">
        {sec.subtitle}
      </div>

      {sec.buttons && sec.buttons.length > 0 && (
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {sec.buttons.map((btn, index) => {
            const isPrimary = btn.variant === 'primary' || index === 0;
            return (
              <a
                key={btn.id || index}
                href={btn.url || '#'}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition-all duration-200 inline-flex items-center justify-center ${isPrimary
                    ? 'bg-white text-slate-950 hover:bg-slate-200 shadow-md hover:shadow-lg'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                  }`}
              >
                {btn.text}
              </a>
            );
          })}
        </div>
      )}
    </div>
  </section>
);

// =========================================================
// 2. Dedicated Sub-Component for Default / Original Hero
// =========================================================
const StandardHero: React.FC<{ sec: PageSectionItem }> = ({ sec }) => {
  const isSplitLeft = sec.layoutStyle === 'split-left';
  const isCentered = sec.layoutStyle === 'centered';

  return (
    <section
      className={`relative py-16 px-6 text-white overflow-hidden ${sec.bgTheme === 'indigo'
          ? 'bg-indigo-950'
          : sec.bgTheme === 'slate'
            ? 'bg-slate-900'
            : 'bg-slate-950'
        }`}
    >
      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div
          className={`${isCentered
              ? 'md:col-span-12 text-center'
              : sec.imageUrl
                ? 'md:col-span-7'
                : 'md:col-span-12'
            } ${isSplitLeft ? 'md:order-2' : ''}`}
        >
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-white">
            {sec.title}
          </h1>
          <p className="text-slate-300 text-base leading-relaxed mb-6">
            {sec.subtitle}
          </p>

          {sec.bulletPoints && sec.bulletPoints.length > 0 && (
            <ul className="space-y-2 mb-6 text-xs text-slate-300">
              {sec.bulletPoints.map((bp, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  {bp}
                </li>
              ))}
            </ul>
          )}

          {sec.buttons && sec.buttons.length > 0 && (
            <div
              className={`flex flex-wrap gap-3 ${isCentered ? 'justify-center' : 'justify-start'
                }`}
            >
              {sec.buttons.map((btn) => (
                <a
                  key={btn.id}
                  href={btn.url}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition ${btn.variant === 'primary'
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
                    }`}
                >
                  {btn.text}
                </a>
              ))}
            </div>
          )}
        </div>

        {sec.imageUrl && !isCentered && (
          <div className={`md:col-span-5 ${isSplitLeft ? 'md:order-1' : ''}`}>
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src={sec.imageUrl}
                alt={sec.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};


// =========================================================
// Dedicated Sub-Component: Dev-Terminal Hero
// =========================================================
const InteractiveCodeHero: React.FC<{ sec: PageSectionItem }> = ({ sec }) => (
  <section className="relative overflow-hidden bg-slate-950 text-white py-20 px-6 md:px-16 border-b border-slate-800/80">
    {/* Subtle Glow Background Effects */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

    <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

      {/* Left Column: Headline & Content */}
      <div className="lg:col-span-7 space-y-6">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for Q3/Q4 Architecture Projects
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {sec.title}
        </h1>

        {/* Subtitle Body */}
        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
          {sec.subtitle}
        </p>

        {/* Bullet Badges */}
        {sec.bulletPoints && sec.bulletPoints.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {sec.bulletPoints.map((bp, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
                ⚡ {bp}
              </span>
            ))}
          </div>
        )}

        {/* CTAs */}
        {sec.buttons && sec.buttons.length > 0 && (
          <div className="pt-3 flex flex-wrap items-center gap-3">
            {sec.buttons.map((btn, index) => (
              <a
                key={btn.id || index}
                href={btn.url || '#'}
                className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${index === 0
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-90 shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900 text-slate-200 border border-slate-700/80 hover:bg-slate-800'
                  }`}
              >
                {btn.text}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Code Snippet Card */}
      <div className="lg:col-span-5">
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-[11px] font-mono text-slate-400">api_gateway.py</span>
          </div>

          {/* Code Container */}
          <div className="p-5 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto leading-relaxed">
            <p className="text-slate-500"># Next-gen async API route</p>
            <p><span className="text-purple-400">from</span> fastapi <span className="text-purple-400">import</span> FastAPI, Depends</p>
            <p><span className="text-purple-400">from</span> app.services <span className="text-purple-400">import</span> AIStreamer</p>
            <br />
            <p><span className="text-blue-400">@app</span>.post(<span className="text-emerald-300">"/v1/build"</span>)</p>
            <p><span className="text-purple-400">async def</span> <span className="text-yellow-300">execute_pipeline</span>(payload: ProjectSchema):</p>
            <p className="pl-4 text-slate-300">result = <span className="text-purple-400">await</span> AIStreamer.deploy(payload)</p>
            <p className="pl-4 text-purple-400">return <span className="text-slate-300">{`{"status": "success", "score": 100}`}</span></p>
          </div>

          {/* Card Footer Metric */}
          <div className="px-5 py-3 bg-indigo-950/40 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Lighthouse Performance</span>
            <span className="font-bold text-emerald-400">100 / 100</span>
          </div>
        </div>
      </div>

    </div>
  </section>
);

// =========================================================
// 3. Main Router Component
// =========================================================
export const HeroView: React.FC<{ sec: PageSectionItem }> = ({ sec }) => {
  // Use unique layoutStyle or key to route cleanly
  if (sec.layoutStyle === 'profile-hero' || sec.subtitle?.includes('\n')) {
    return <ProfileServicesHero sec={sec} />;
  }

  if (sec.layoutStyle === 'interactive-code-hero') {
    return <InteractiveCodeHero sec={sec} />;
  }

  return <StandardHero sec={sec} />;
}