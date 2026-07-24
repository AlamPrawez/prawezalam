import Image from 'next/image';
import React from 'react';
import { 
  FaLinkedin, 
  FaGithub, 
  FaGitlab, 
  FaPaperPlane, 
  FaPhoneAlt, 
  FaCode, 
  FaCloud, 
  FaBolt,
  FaServer,
  FaCheckCircle
} from 'react-icons/fa';
import ReactDOM from 'react-dom';
import Link from 'next/link';

export default function HeroAndOverviewPage() {
  // Preloading image for LCP performance
  ReactDOM.preload('/_next/image?url=%2Fprawez.JPEG&w=750&q=75', {
    as: 'image',
    fetchPriority: 'high',
  });

  return (
    <div className="w-full bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* ==================================================================== */}
      {/* 1. HERO SECTION (Bright & Vibrant Theme)                             */}
      {/* ==================================================================== */}
      <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center justify-center pt-6 pb-12 lg:pt-10 lg:pb-20 px-4 sm:px-6 lg:px-12 bg-white border-b border-slate-200/90">
        
        {/* Vibrant Light Glows */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-sky-400/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Clean Bright Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* LEFT: Main Hero Content */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-5">
              
              {/* Title Header */}
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600">
                  Expert Full Stack Developer & Architect
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                  ER. PRAWEZ ALAM
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
                Designing, engineering, and deploying end-to-end web, desktop, and mobile applications alongside high-performance cloud architectures.
              </p>

              {/* Tech Stack Badge Pills */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                <div className="inline-flex items-center gap-2 bg-white border border-slate-200/90 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-800 shadow-xs hover:border-indigo-300 transition-colors">
                  <FaCode className="text-indigo-600" />
                  <span>Frontend & UI Systems</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white border border-slate-200/90 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-800 shadow-xs hover:border-sky-300 transition-colors">
                  <FaServer className="text-sky-600" />
                  <span>Backend & API Gateways</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-white border border-slate-200/90 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-800 shadow-xs hover:border-emerald-300 transition-colors">
                  <FaCloud className="text-emerald-600" />
                  <span>AWS DevOps & Cloud</span>
                </div>
              </div>

              {/* Action Buttons & Socials */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full pt-2">
                <Link
                  href="/contact"
                  className="relative group overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FaPaperPlane className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform" />
                  <span>Contact Me</span>
                </Link>

                <a
                  href="tel:+9779804083811"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-slate-800 bg-slate-100 hover:bg-white border border-slate-200/80 shadow-xs transition-all duration-200"
                >
                  <FaPhoneAlt className="text-indigo-600 text-xs" />
                  <span>+977 9804083811</span>
                </a>

                <div className="flex items-center justify-center gap-2.5 pt-2 sm:pt-0">
                  {[
                    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/prawez-alam/", label: "LinkedIn", hover: "hover:border-blue-500 hover:text-blue-600" },
                    { icon: <FaGithub />, href: "https://github.com/AlamPrawez", label: "GitHub", hover: "hover:border-slate-800 hover:text-slate-900" },
                    { icon: <FaGitlab />, href: "https://gitlab.com/prawezAlam", label: "GitLab", hover: "hover:border-orange-500 hover:text-orange-600" },
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`h-11 w-11 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 text-lg shadow-xs hover:scale-105 transition-all duration-200 ${social.hover}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT: Photo with Bright Badges */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[4/5] rounded-3xl p-[2px] bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 shadow-2xl shadow-indigo-100">
                
                <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-100 group">
                  <Image
                    src="/prawez.JPEG"
                    alt="Er. Prawez Alam - Full Stack Developer"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 38vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Er. Prawez Alam</p>
                      <p className="text-[11px] font-bold text-indigo-600">Full Stack Engineer</p>
                    </div>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-extrabold">
                      <FaBolt className="text-[10px] text-emerald-600" /> Top Performance
                    </span>
                  </div>
                </div>

                {/* Floating Badge (Upper Left) */}
                <div className="absolute -top-3 -left-3 sm:-left-5 bg-white/95 border border-slate-200/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 z-20">
                  <span className="text-indigo-600 font-extrabold text-sm">&lt;/&gt;</span>
                  <span>Frontend & Backend</span>
                </div>

                {/* Floating Badge (Upper Right) */}
                <div className="absolute top-10 -right-3 sm:-right-5 bg-white/95 border border-slate-200/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 z-20">
                  <FaCloud className="text-sky-500" />
                  <span>AWS & DevOps</span>
                </div>

                {/* Floating Status Pill Badge (Lower Right) */}
                <div className="absolute -bottom-3 -right-3 sm:-right-5 bg-white/95 border border-slate-200/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-800 z-20">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    Available for Contract
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-extrabold text-indigo-600">$17 / hr</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. OVERVIEW SECTION BELOW HERO                                       */}
      {/* ==================================================================== */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-slate-100/80 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Section Header */}
          <div className="space-y-2 border-l-4 border-indigo-600 pl-4">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">
              Technical Profile
            </h2>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">
              Full Stack Expertise & Engineering Approach
            </p>
          </div>

          {/* Detailed Paragraph Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-md relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal relative z-10">
              By seamlessly combining deep frontend expertise (<span className="text-indigo-600 font-bold">React, Next.js, Vue, Nuxt</span>) with powerful backend frameworks (<span className="text-sky-600 font-bold">Node.js, NestJS, Laravel, Python</span>), I engineer cohesive, end-to-end digital solutions. This comprehensive technical toolkit is backed by a strong command of cloud infrastructure and <span className="text-emerald-600 font-bold">AWS DevOps</span> tools, ensuring that every application is fully optimized for smooth deployment, continuous integration, and cloud efficiency.
            </p>
          </div>

          {/* Quick Technical Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3 hover:border-indigo-200 transition-colors">
              <FaCheckCircle className="text-indigo-600 text-base flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">Modern Reactive Interfaces</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3 hover:border-sky-200 transition-colors">
              <FaCheckCircle className="text-sky-600 text-base flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">Scalable REST & gRPC APIs</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3 hover:border-emerald-200 transition-colors">
              <FaCheckCircle className="text-emerald-600 text-base flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">AWS Cloud Pipelines & Docker</span>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-xs flex items-center gap-3 hover:border-purple-200 transition-colors">
              <FaCheckCircle className="text-purple-600 text-base flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-800">Lighthouse 100 Performance</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

// import Image from 'next/image';
// import React from 'react';
// import { 
//   FaLinkedin, 
//   FaGithub, 
//   FaGitlab, 
//   FaPaperPlane, 
//   FaPhoneAlt, 
//   FaCode, 
//   FaCloud, 
//   FaBolt,
//   FaServer,
//   FaCheckCircle
// } from 'react-icons/fa';
// import ReactDOM from 'react-dom';
// import Link from 'next/link';

// export default function HeroAndOverviewPage() {
//   // Preloading image for LCP performance
//   ReactDOM.preload('/_next/image?url=%2Fprawez.JPEG&w=750&q=75', {
//     as: 'image',
//     fetchPriority: 'high',
//   });

//   return (
//     <div className="w-full bg-slate-950/95 text-slate-100 font-sans antialiased">
      
//       {/* ==================================================================== */}
//       {/* 1. HERO SECTION                                                      */}
//       {/* ==================================================================== */}
//       <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center justify-center pt-6 pb-12 lg:pt-10 lg:pb-20 px-4 sm:px-6 lg:px-12 border-b border-slate-800/80">
        
//         {/* Ambient Glows */}
//         <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
//         <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none" />

//         {/* Grid Background Pattern */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

//         <div className="relative z-10 w-full max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
//             {/* LEFT: Main Hero Content */}
//             <div className="lg:col-span-7 flex flex-col items-start space-y-4 sm:space-y-5">
              
//               {/* Title Header */}
//               <div className="space-y-1">
//                 <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">
//                   Expert Full Stack Developer & Architect
//                 </p>
//                 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
//                   ER. PRAWEZ ALAM
//                 </h1>
//               </div>

//               {/* Updated Subtitle */}
//               <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-snug font-normal">
//                 Designing, engineering, and deploying end-to-end web, desktop, and mobile applications alongside high-performance cloud architectures.
//               </p>

//               {/* Tech Stack Badge Pills */}
//               <div className="flex flex-wrap gap-2.5 pt-1">
//                 <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200">
//                   <FaCode className="text-indigo-400" />
//                   <span>Frontend & UI Systems</span>
//                 </div>
//                 <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200">
//                   <FaServer className="text-sky-400" />
//                   <span>Backend & API Gateways</span>
//                 </div>
//                 <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200">
//                   <FaCloud className="text-emerald-400" />
//                   <span>AWS DevOps & Cloud</span>
//                 </div>
//               </div>

//               {/* Action Buttons & Socials */}
//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full pt-2">
//                 <Link
//                   href="/contact"
//                   className="relative group overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300"
//                 >
//                   <FaPaperPlane className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform" />
//                   <span>Contact Me</span>
//                 </Link>

//                 <a
//                   href="tel:+9779804083811"
//                   className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all duration-200"
//                 >
//                   <FaPhoneAlt className="text-indigo-400 text-xs" />
//                   <span>+977 9804083811</span>
//                 </a>

//                 <div className="flex items-center justify-center gap-2.5 pt-2 sm:pt-0">
//                   {[
//                     { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/prawez-alam/", label: "LinkedIn", hover: "hover:border-blue-500 hover:text-blue-400" },
//                     { icon: <FaGithub />, href: "https://github.com/AlamPrawez", label: "GitHub", hover: "hover:border-slate-400 hover:text-white" },
//                     { icon: <FaGitlab />, href: "https://gitlab.com/prawezAlam", label: "GitLab", hover: "hover:border-orange-500 hover:text-orange-400" },
//                   ].map((social, idx) => (
//                     <a
//                       key={idx}
//                       href={social.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label={social.label}
//                       className={`h-11 w-11 flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 text-slate-400 text-lg shadow-md hover:scale-105 transition-all duration-200 ${social.hover}`}
//                     >
//                       {social.icon}
//                     </a>
//                   ))}
//                 </div>
//               </div>

//             </div>

//             {/* RIGHT: Photo with Floating Badges */}
//             <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
//               <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none aspect-[4/5] rounded-3xl p-[2px] bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 shadow-2xl shadow-indigo-950/60">
                
//                 <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-950 group">
//                   <Image
//                     src="/prawez.JPEG"
//                     alt="Er. Prawez Alam - Full Stack Developer"
//                     fill
//                     priority
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 38vw"
//                     className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-75" />

//                   <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-xl flex items-center justify-between">
//                     <div>
//                       <p className="text-xs font-bold text-white">Er. Prawez Alam</p>
//                       <p className="text-[11px] font-medium text-indigo-400">Full Stack Engineer</p>
//                     </div>
//                     <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold">
//                       <FaBolt className="text-[10px]" /> Top Performance
//                     </span>
//                   </div>
//                 </div>

//                 {/* Floating Badge (Upper Left) */}
//                 <div className="absolute -top-3 -left-3 sm:-left-5 bg-slate-900/95 border border-slate-800/90 backdrop-blur-xl px-3.5 py-2 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-100 z-20">
//                   <span className="text-indigo-400 font-extrabold text-sm">&lt;/&gt;</span>
//                   <span>Frontend & Backend</span>
//                 </div>

//                 {/* Floating Badge (Upper Right) */}
//                 <div className="absolute top-10 -right-3 sm:-right-5 bg-slate-900/95 border border-slate-800/90 backdrop-blur-xl px-3.5 py-2 rounded-2xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-100 z-20">
//                   <FaCloud className="text-sky-400" />
//                   <span>AWS & DevOps</span>
//                 </div>

//                 {/* Floating Status Pill Badge (Lower Right) */}
//                 <div className="absolute -bottom-3 -right-3 sm:-right-5 bg-slate-900/95 border border-slate-800/90 backdrop-blur-xl px-3.5 py-2 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-100 z-20">
//                   <span className="relative flex h-2.5 w-2.5">
//                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//                     <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
//                   </span>
//                   <span className="text-xs font-semibold tracking-wide text-slate-300">
//                     Available for Contract & Remote Work
//                   </span>
//                   <span className="text-slate-700">•</span>
//                   <span className="text-xs font-extrabold text-indigo-400">$17 / hr</span>
//                 </div>

//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* ==================================================================== */}
//       {/* 2. OVERVIEW SECTION BELOW HERO                                       */}
//       {/* ==================================================================== */}
//       <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-slate-800/90">
//         <div className="max-w-7xl mx-auto space-y-8">
          
//           {/* Section Header */}
//           <div className="space-y-2 border-l-4 border-indigo-500 pl-4">
//             <h2 className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
//               Technical Profile
//             </h2>
//             <p className="text-2xl sm:text-3xl font-black text-white">
//               Full Stack Expertise & Engineering Approach
//             </p>
//           </div>

//           {/* Detailed Paragraph Box */}
//           <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl relative overflow-hidden">
//             <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            
//             <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal relative z-10">
//               By seamlessly combining deep frontend expertise (<span className="text-indigo-400 font-semibold">React, Next.js, Vue, Nuxt</span>) with powerful backend frameworks (<span className="text-sky-400 font-semibold">Node.js, NestJS, Laravel, Python</span>), I engineer cohesive, end-to-end digital solutions. This comprehensive technical toolkit is backed by a strong command of cloud infrastructure and <span className="text-emerald-400 font-semibold">AWS DevOps</span> tools, ensuring that every application is fully optimized for smooth deployment, continuous integration, and cloud efficiency.
//             </p>
//           </div>

//           {/* Quick Technical Highlights */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
//             <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
//               <FaCheckCircle className="text-indigo-400 text-base flex-shrink-0" />
//               <span className="text-xs sm:text-sm font-medium text-slate-300">Modern Reactive Interfaces</span>
//             </div>
//             <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
//               <FaCheckCircle className="text-sky-400 text-base flex-shrink-0" />
//               <span className="text-xs sm:text-sm font-medium text-slate-300">Scalable REST & gRPC APIs</span>
//             </div>
//             <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
//               <FaCheckCircle className="text-emerald-400 text-base flex-shrink-0" />
//               <span className="text-xs sm:text-sm font-medium text-slate-300">AWS Cloud Pipelines & Docker</span>
//             </div>
//             <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-3">
//               <FaCheckCircle className="text-purple-400 text-base flex-shrink-0" />
//               <span className="text-xs sm:text-sm font-medium text-slate-300">Lighthouse 100 Performance</span>
//             </div>
//           </div>

//         </div>
//       </section>

//     </div>
//   );
// }

















// import Image from 'next/image';
// import React from 'react';
// import { FaLinkedin, FaGithub, FaGitlab } from 'react-icons/fa';
// import ReactDOM from 'react-dom';

// export default function FullyResponsiveCompactProfile() {
//     // ⚡ Force inject a high-priority preload link directly into the document HTML <head>
//   ReactDOM.preload('/_next/image?url=%2Fprawez.JPEG&w=750&q=75', { 
//     as: 'image', 
//     fetchPriority: 'high' 
//   });
//     return (
//         <div id="person" className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-800 relative overflow-hidden flex items-center justify-center">
            
//             {/* Dynamic visual shaping lines running from bottom-left up toward top-right */}
//             <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-200/30 via-sky-100/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
//             <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden lg:block">
//                 <svg className="absolute min-w-full min-h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
//                     <path d="M-10,110 L30,-10 L45,-10 L0,110 Z" fill="url(#shape-grad-1)" />
//                     <path d="M10,110 L60,-10 L70,-10 L20,110 Z" fill="url(#shape-grad-2)" />
//                     <defs>
//                         <linearGradient id="shape-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#c7d2fe" />
//                             <stop offset="100%" stopColor="#e0f2fe" />
//                         </linearGradient>
//                         <linearGradient id="shape-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
//                             <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0" />
//                         </linearGradient>
//                     </defs>
//                 </svg>
//             </div>
            
//             {/* Compact Max Width - Makes everything less wide and tight */}
//             <div className="w-full max-w-7xl relative z-10">
//                 {/* Responsive Layout Flow: Row layout on lg screen, columns on everything else */}
//                 <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-10">
                    
//                     {/* Left/Top Column: Highly adaptive picture wrapper */}
//                     {/* Width: 100% on mobile/tablet, anchors perfectly to 35% on lg screens */}
//                     {/* Height: Stays aspect-square on smaller viewports, switches to full-height container layout on large screens */}
//                     <div className="w-full lg:w-[35%] aspect-square sm:aspect-[4/3] lg:aspect-auto min-h-[280px] sm:min-h-[380px] lg:min-h-full relative flex-shrink-0 rounded-2xl overflow-hidden shadow-sm bg-gray-200">
                       
//                         <Image
//                             src="/prawez.JPEG"
//                             alt="Remote Full Stack Developer & Architect"
//                             fill
//                             priority // THIS IS THE MAGIC BULLET: Removes loading="lazy", adds fetchpriority="high"
//                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                             className="object-cover object-top"
//                             defaultValue="async"
//                         />
//                     </div>

//                     {/* Right/Bottom Column: Content spacing fluidly matches layout adjustments */}
//                     <div className="w-full lg:w-[65%] py-2 flex flex-col justify-between">
                        
//                         {/* Core Header Info & Availability */}
//                         <div>
//                             <div className="border-b border-gray-300/70 pb-5 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 text-center sm:text-left">
//                                 <div>
//                                     <p className="text-3xl font-extrabold tracking-tight text-gray-900">
//                                         ER. PRAWEZ ALAM
//                                     </p>
//                                     <h1 className="text-sm font-semibold text-indigo-600 mt-1">
//                                         Expert Full Stack Developer
//                                     </h1>
                                    
//                                     {/* Contact Elements */}
//                                     <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-600 font-medium">
//                                         <span className="flex items-center gap-1">📞 +977 9804083811</span>
//                                         <span className="hidden sm:inline text-gray-300">|</span>
//                                         <span className="flex items-center gap-1">✉️ prawezalam9@gmail.com</span>
//                                     </div>
//                                 </div>

//                                 {/* Status Hub */}
//                                 <div className="flex flex-row sm:flex-col items-center sm:items-end justify-center gap-1.5 flex-shrink-0">
//                                     <div className="inline-flex items-center gap-1.5 bg-emerald-200/60 border border-emerald-300 rounded-lg px-2.5 py-0.5 text-xs font-bold text-emerald-800">
//                                         <span className="h-1.5 w-1.5 bg-emerald-600 rounded-full animate-pulse"></span>
//                                         Available
//                                     </div>
//                                     <div className="text-md font-bold text-gray-900 tracking-tight">
//                                         $17 <span className="text-xs text-gray-500 font-semibold uppercase">/ hr (USD)</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Descriptive Profile Bio */}
//                             <div className="mt-5 space-y-4 text-sm sm:text-base leading-relaxed text-gray-700">
//                                 <p>
//                                     <strong className="text-gray-900 font-semibold">Dynamic Full-Stack Developer</strong> proficient in designing, building, and deploying robust, enterprise-grade web applications from the ground up.
//                                 </p>
//                                 <p>
//                                     By seamlessly combining deep frontend expertise (<span className="text-indigo-600 font-medium">React, Next.js, Vue, Nuxt</span>) with powerful backend frameworks (<span className="text-indigo-600 font-medium">Node.js, NestJS, Laravel, Python</span>), I engineer cohesive, end-to-end digital solutions. This comprehensive technical toolkit is backed by a strong command of cloud infrastructure and <span className="text-indigo-600 font-medium">AWS DevOps</span> tools, ensuring that every application is fully optimized for smooth deployment, continuous integration, and cloud efficiency.
//                                 </p>
//                                 <p>
//                                     Beyond writing code, I am highly adept at advanced <strong className="text-gray-900 font-semibold">system architecture and application design</strong>, focusing on creating scalable frameworks that handle growth effortlessly. I am dedicated to delivering high-performance, resilient, and easily maintainable codebases that bridge the gap between complex technical requirements and intuitive user experiences. Ultimately, my goal is to align modern engineering practices with core business objectives to deliver reliable software that drives measurable value.
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Social Links & Competency Tags */}
//                         <div className="mt-6">
//                             <div className="flex justify-center sm:justify-start items-center gap-4 pb-5">
//                                 <a href="https://www.linkedin.com/in/prawez-alam/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors text-xl" aria-label="LinkedIn"><FaLinkedin /></a>
//                                 <a href="https://github.com/AlamPrawez" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors text-xl" aria-label="GitHub"><FaGithub /></a>
//                                 <a href="https://gitlab.com/prawezAlam" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-600 transition-colors text-xl" aria-label="GitLab"><FaGitlab /></a>
//                             </div>

//                             <div className="pt-5 border-t border-gray-200/70">
//                                 <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
//                                     {[
//                                         { name: "FullStack", color: "bg-gray-200 text-gray-700 border-gray-300" },
//                                         { name: "React", color: "bg-blue-100/70 text-blue-800 border-blue-200" },
//                                         { name: "NextJS", color: "bg-slate-200 text-slate-700 border-slate-300" },
//                                         { name: "VueJS", color: "bg-emerald-100/70 text-emerald-700 border-emerald-200" },
//                                         { name: "NodeJS", color: "bg-green-100/70 text-green-700 border-green-200" },
//                                         { name: "NestJS", color: "bg-red-100/70 text-red-700 border-red-200" },
//                                         { name: "Laravel", color: "bg-orange-100/70 text-orange-700 border-orange-200" },
//                                         { name: "Python", color: "bg-yellow-100/70 text-yellow-800 border-yellow-200" },
//                                         { name: "AWS", color: "bg-purple-100/70 text-purple-700 border-purple-200" },
//                                         { name: "DevOps", color: "bg-indigo-100/70 text-indigo-700 border-indigo-200" },
//                                         { name: "SystemArchitecture", color: "bg-neutral-200/80 text-neutral-700 border-neutral-300" }
//                                     ].map((tag, idx) => (
//                                         <span key={idx} className={`px-2 py-0.5 text-xs font-medium rounded-md border ${tag.color}`}>
//                                             #{tag.name}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React from 'react';
// import { FaLinkedin, FaGithub, FaGitlab } from 'react-icons/fa';

// export default function BorderlessGeometricProfile() {
//     return (
//         <div className="bg-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-800 relative overflow-hidden flex items-center justify-center">
            
//             {/* Dynamic visual shaping lines running from bottom-left up toward top-right */}
//             <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-200/30 via-sky-100/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
//             <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden lg:block">
//                 <svg className="absolute min-w-full min-h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
//                     <path d="M-10,110 L30,-10 L45,-10 L0,110 Z" fill="url(#shape-grad-1)" />
//                     <path d="M10,110 L60,-10 L70,-10 L20,110 Z" fill="url(#shape-grad-2)" />
//                     <defs>
//                         <linearGradient id="shape-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#c7d2fe" />
//                             <stop offset="100%" stopColor="#e0f2fe" />
//                         </linearGradient>
//                         <linearGradient id="shape-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
//                             <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0" />
//                         </linearGradient>
//                     </defs>
//                 </svg>
//             </div>
            
//             {/* Completely Box-Free & Borderless Layout */}
//             <div className="w-full max-w-7xl relative z-10">
//                 <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16">
                    
//                     {/* Left Column: Image perfectly handles the 35% side, borderless and sharp */}
//                     <div className="w-full lg:w-[35%] min-h-[350px] sm:min-h-[450px] lg:min-h-full relative flex-shrink-0 rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm bg-gray-200">
//                         <img
//                             src="/prawez.JPEG"
//                             alt="ER. PRAWEZ ALAM"
//                             className="absolute inset-0 w-full h-full object-cover object-top"
//                         />
//                     </div>

//                     {/* Right Column: Text and Interactive Info flowing over the page background */}
//                     <div className="w-full lg:w-[65%] py-4 flex flex-col justify-between">
                        
//                         {/* Core Header Info & Availability */}
//                         <div>
//                             <div className="border-b border-gray-300/70 pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 text-center sm:text-left">
//                                 <div>
//                                     <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
//                                         ER. PRAWEZ ALAM
//                                     </h1>
//                                     <p className="text-md font-semibold text-indigo-600 mt-1">
//                                         Expert Full Stack Developer
//                                     </p>
                                    
//                                     {/* Contact Elements */}
//                                     <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-gray-600 font-medium">
//                                         <span className="flex items-center gap-1">📞 +977 9804083811</span>
//                                         <span className="hidden sm:inline text-gray-400">|</span>
//                                         <span className="flex items-center gap-1">✉️ prawezalam9@gmail.com</span>
//                                     </div>
//                                 </div>

//                                 {/* Status Hub */}
//                                 <div className="flex flex-row sm:flex-col items-center sm:items-end justify-center gap-2 flex-shrink-0">
//                                     <div className="inline-flex items-center gap-2 bg-emerald-200/60 border border-emerald-300 rounded-lg px-3 py-1 text-xs font-bold text-emerald-800">
//                                         <span className="h-2 w-2 bg-emerald-600 rounded-full animate-pulse"></span>
//                                         Available
//                                     </div>
//                                     <div className="text-lg font-bold text-gray-900 tracking-tight">
//                                         $17 <span className="text-xs text-gray-500 font-semibold uppercase">/ hr (USD)</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Descriptive Profile Bio */}
//                             <div className="mt-8 space-y-5 text-sm sm:text-base leading-relaxed text-gray-700">
//                                 <p>
//                                     <strong className="text-gray-900 font-semibold">Dynamic Full-Stack Developer</strong> proficient in designing, building, and deploying robust, enterprise-grade web applications from the ground up.
//                                 </p>
//                                 <p>
//                                     By seamlessly combining deep frontend expertise (<span className="text-indigo-600 font-medium">React, Next.js, Vue, Nuxt</span>) with powerful backend frameworks (<span className="text-indigo-600 font-medium">Node.js, NestJS, Laravel, Python</span>), I engineer cohesive, end-to-end digital solutions. This comprehensive technical toolkit is backed by a strong command of cloud infrastructure and <span className="text-indigo-600 font-medium">AWS DevOps</span> tools, ensuring that every application is fully optimized for smooth deployment, continuous integration, and cloud efficiency.
//                                 </p>
//                                 <p>
//                                     Beyond writing code, I am highly adept at advanced <strong className="text-gray-900 font-semibold">system architecture and application design</strong>, focusing on creating scalable frameworks that handle growth effortlessly. I am dedicated to delivering high-performance, resilient, and easily maintainable codebases that bridge the gap between complex technical requirements and intuitive user experiences. Ultimately, my goal is to align modern engineering practices with core business objectives to deliver reliable software that drives measurable value.
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Social Links & Competency Tags */}
//                         <div className="mt-8">
//                             <div className="flex justify-center sm:justify-start items-center gap-5 text-gray-400 pb-6">
//                                 <a href="https://www.linkedin.com/in/prawez-alam/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors text-xl" aria-label="LinkedIn"><FaLinkedin /></a>
//                                 <a href="https://github.com/AlamPrawez" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors text-xl" aria-label="GitHub"><FaGithub /></a>
//                                 <a href="https://gitlab.com/prawezAlam" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors text-xl" aria-label="GitLab"><FaGitlab /></a>
//                             </div>

//                             <div className="pt-6 border-t border-gray-300/70">
//                                 <div className="flex flex-wrap justify-center sm:justify-start gap-2">
//                                     {[
//                                         { name: "FullStack", color: "bg-gray-200 text-gray-700 border-gray-300" },
//                                         { name: "React", color: "bg-blue-100/70 text-blue-800 border-blue-200" },
//                                         { name: "NextJS", color: "bg-slate-200 text-slate-700 border-slate-300" },
//                                         { name: "VueJS", color: "bg-emerald-100/70 text-emerald-700 border-emerald-200" },
//                                         { name: "NodeJS", color: "bg-green-100/70 text-green-700 border-green-200" },
//                                         { name: "NestJS", color: "bg-red-100/70 text-red-700 border-red-200" },
//                                         { name: "Laravel", color: "bg-orange-100/70 text-orange-700 border-orange-200" },
//                                         { name: "Python", color: "bg-yellow-100/70 text-yellow-800 border-yellow-200" },
//                                         { name: "AWS", color: "bg-purple-100/70 text-purple-700 border-purple-200" },
//                                         { name: "DevOps", color: "bg-indigo-100/70 text-indigo-700 border-indigo-200" },
//                                         { name: "SystemArchitecture", color: "bg-neutral-200/80 text-neutral-700 border-neutral-300" }
//                                     ].map((tag, idx) => (
//                                         <span key={idx} className={`px-2.5 py-1 text-xs font-medium rounded-md border ${tag.color}`}>
//                                             #{tag.name}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React from 'react';
// import { FaLinkedin, FaGithub, FaGitlab } from 'react-icons/fa';

// export default function GeometricLayoutProfile() {
//     return (
//         <div className="bg-gray-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-800 relative overflow-hidden flex items-center justify-center">
            
//             {/* Dynamic visual shaping lines from bottom-left running toward top-right */}
//             <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-200/40 via-sky-100/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
//             <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden lg:block">
//                 <svg className="absolute min-w-full min-h-full opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
//                     <path d="M-10,110 L30,-10 L45,-10 L0,110 Z" fill="url(#shape-grad-1)" />
//                     <path d="M10,110 L60,-10 L70,-10 L20,110 Z" fill="url(#shape-grad-2)" />
//                     <defs>
//                         <linearGradient id="shape-grad-1" x1="0%" y1="100%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#c7d2fe" />
//                             <stop offset="100%" stopColor="#e0f2fe" />
//                         </linearGradient>
//                         <linearGradient id="shape-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
//                             <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
//                             <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0" />
//                         </linearGradient>
//                     </defs>
//                 </svg>
//             </div>
            
//             {/* Main Wrapper Layout Card */}
//             <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden relative z-10">
//                 <div className="flex flex-col lg:flex-row min-h-[600px]">
                    
//                     {/* Left Column: Image perfectly covers the entire left container side */}
//                     <div className="w-full lg:w-[35%] min-h-[350px] lg:min-h-full relative flex-shrink-0 bg-gray-200">
//                         <img
//                             src="/prawez.JPEG"
//                             alt="ER. PRAWEZ ALAM"
//                             className="absolute inset-0 w-full h-full object-cover object-top"
//                         />
//                     </div>

//                     {/* Right Column: Detailed Context & Adaptive Typography Grid */}
//                     <div className="w-full lg:w-[65%] p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                        
//                         {/* Core Info Metadata Header */}
//                         <div>
//                             <div className="border-b border-gray-200 pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 text-center sm:text-left">
//                                 <div>
//                                     <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
//                                         ER. PRAWEZ ALAM
//                                     </h1>
//                                     <p className="text-md font-semibold text-indigo-600 mt-1">
//                                         Expert Full Stack Developer
//                                     </p>
                                    
//                                     {/* Quick Links Line */}
//                                     <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-gray-600">
//                                         <span className="flex items-center gap-1">📞 +977 9804083811</span>
//                                         <span className="hidden sm:inline text-gray-300">|</span>
//                                         <span className="flex items-center gap-1">✉️ prawezalam9@gmail.com</span>
//                                     </div>
//                                 </div>

//                                 {/* Availability Hub */}
//                                 <div className="flex flex-row sm:flex-col items-center sm:items-end justify-center gap-2 flex-shrink-0">
//                                     <div className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-lg px-3 py-1 text-xs font-bold text-emerald-800">
//                                         <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
//                                         Available
//                                     </div>
//                                     <div className="text-lg font-bold text-gray-900 tracking-tight">
//                                         $17 <span className="text-xs text-gray-500 font-semibold uppercase">/ hr (USD)</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Descriptive Summary Paragraphs */}
//                             <div className="mt-8 space-y-5 text-sm sm:text-base leading-relaxed text-gray-700">
//                                 <p>
//                                     <strong className="text-gray-900 font-semibold">Dynamic Full-Stack Developer</strong> proficient in designing, building, and deploying robust, enterprise-grade web applications from the ground up.
//                                 </p>
//                                 <p>
//                                     By seamlessly combining deep frontend expertise (<span className="text-indigo-600 font-medium">React, Next.js, Vue, Nuxt</span>) with powerful backend frameworks (<span className="text-indigo-600 font-medium">Node.js, NestJS, Laravel, Python</span>), I engineer cohesive, end-to-end digital solutions. This comprehensive technical toolkit is backed by a strong command of cloud infrastructure and <span className="text-indigo-600 font-medium">AWS DevOps</span> tools, ensuring that every application is fully optimized for smooth deployment, continuous integration, and cloud efficiency.
//                                 </p>
//                                 <p>
//                                     Beyond writing code, I am highly adept at advanced <strong className="text-gray-900 font-semibold">system architecture and application design</strong>, focusing on creating scalable frameworks that handle growth effortlessly. I am dedicated to delivering high-performance, resilient, and easily maintainable codebases that bridge the gap between complex technical requirements and intuitive user experiences. Ultimately, my goal is to align modern engineering practices with core business objectives to deliver reliable software that drives measurable value.
//                                 </p>
//                             </div>
//                         </div>

//                         {/* Interactive Socials & Framework Chips */}
//                         <div className="mt-8">
//                             <div className="flex justify-center sm:justify-start items-center gap-5 text-gray-400 pb-6">
//                                 <a href="https://www.linkedin.com/in/prawez-alam/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors text-xl" aria-label="LinkedIn"><FaLinkedin /></a>
//                                 <a href="https://github.com/AlamPrawez" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors text-xl" aria-label="GitHub"><FaGithub /></a>
//                                 <a href="https://gitlab.com/prawezAlam" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors text-xl" aria-label="GitLab"><FaGitlab /></a>
//                             </div>

//                             <div className="pt-6 border-t border-gray-200">
//                                 <div className="flex flex-wrap justify-center sm:justify-start gap-2">
//                                     {[
//                                         { name: "FullStack", color: "bg-gray-100 text-gray-700 border-gray-300" },
//                                         { name: "React", color: "bg-blue-50 text-blue-700 border-blue-200" },
//                                         { name: "NextJS", color: "bg-slate-50 text-slate-700 border-slate-200" },
//                                         { name: "VueJS", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
//                                         { name: "NodeJS", color: "bg-green-50 text-green-700 border-green-200" },
//                                         { name: "NestJS", color: "bg-red-50 text-red-700 border-red-200" },
//                                         { name: "Laravel", color: "bg-orange-50 text-orange-700 border-orange-200" },
//                                         { name: "Python", color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
//                                         { name: "AWS", color: "bg-purple-50 text-purple-700 border-purple-200" },
//                                         { name: "DevOps", color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
//                                         { name: "SystemArchitecture", color: "bg-neutral-100 text-neutral-700 border-neutral-200" }
//                                     ].map((tag, idx) => (
//                                         <span key={idx} className={`px-2.5 py-1 text-xs font-medium rounded-md border ${tag.color}`}>
//                                             #{tag.name}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }






// import React from "react";
// import { FaLinkedin, FaGithub, FaGitlab } from "react-icons/fa";

// const ProfileCard: React.FC = () => {

//     return (
//         <div className="bg-gray-100 min-h-screen py-10">
//             <div className="container mx-auto px-4">
//                 <div className="flex justify-center">
//                     <div className="w-full max-w-5xl p-4 sm:p-6">

//                         {/* Profile wrapper */}
//                         <div className="flex flex-col items-center sm:items-start gap-6 sm:flex-row">

//                             {/* Profile image */}
//                             <div className="w-32 h-32 sm:w-48 sm:h-48 flex-shrink-0 rounded-2xl overflow-hidden border border-gray-300 shadow-sm bg-gray-200">
//                                 <img
//                                     src="/prawez.JPEG"
//                                     alt="ER. PRAWEZ ALAM"
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>

//                             {/* Profile info */}
//                             <div className="text-center sm:text-left flex-1 w-full">
                                
//                                 {/* Header Info Row */}
//                                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
//                                     <div>
//                                         <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
//                                             ER. PRAWEZ ALAM
//                                         </h1>
//                                         <p className="text-md font-semibold text-indigo-600 mt-1">
//                                             Expert Full Stack Developer
//                                         </p>
                                        
//                                         {/* Contact Details */}
//                                         <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-sm text-gray-600 font-medium">
//                                             <span className="flex items-center gap-1">📞 +977 9804083811</span>
//                                             <span className="hidden sm:inline text-gray-400">|</span>
//                                             <span className="flex items-center gap-1">✉️ prawezalam9@gmail.com</span>
//                                         </div>
//                                     </div>

//                                     {/* Availability & Rate badges */}
//                                     <div className="flex flex-row sm:flex-col items-center sm:items-end justify-center gap-2">
//                                         <div className="flex items-center gap-1.5 bg-emerald-200/60 border border-emerald-300 rounded-full px-3 py-1 text-xs font-bold text-emerald-800">
//                                             <span className="h-2 w-2 bg-emerald-600 rounded-full animate-pulse"></span>
//                                             Available
//                                         </div>
//                                         <div className="rounded-full bg-gray-200 text-gray-800 border border-gray-300 px-3 py-1 text-xs font-bold tracking-wide">
//                                             $17 / hr (USD)
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Social Links */}
//                                 <div className="flex justify-center sm:justify-start items-center gap-4 text-gray-400 mt-4 pb-6 border-b border-gray-300">
//                                     <a
//                                         href="https://www.linkedin.com/in/prawez-alam/"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="hover:text-blue-600 transition-colors"
//                                         aria-label="LinkedIn"
//                                     >
//                                         <FaLinkedin className="w-5 h-5" />
//                                     </a>
//                                     <a
//                                         href="https://github.com/AlamPrawez"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="hover:text-gray-900 transition-colors"
//                                         aria-label="GitHub"
//                                     >
//                                         <FaGithub className="w-5 h-5" />
//                                     </a>
//                                     <a
//                                         href="https://gitlab.com/prawezAlam"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="hover:text-orange-600 transition-colors"
//                                         aria-label="GitLab"
//                                     >
//                                         <FaGitlab className="w-5 h-5" />
//                                     </a>
//                                 </div>

//                                 {/* About Me Descriptive Section */}
//                                 <div className="mt-6 text-left">
//                                     <h2 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">About Me</h2>
//                                     <div className="space-y-4 text-sm sm:text-base leading-relaxed text-gray-700">
//                                         <p>
//                                             <strong className="text-gray-900 font-semibold">Dynamic Full-Stack Developer</strong> proficient in designing, building, and deploying robust, enterprise-grade web applications from the ground up. By seamlessly combining deep frontend expertise (<span className="text-indigo-600 font-semibold">React, Next.js, Vue, Nuxt</span>) with powerful backend frameworks (<span className="text-indigo-600 font-semibold">Node.js, NestJS, Laravel, Python</span>), I engineer cohesive, end-to-end digital solutions. This comprehensive technical toolkit is backed by a strong command of cloud infrastructure and <span className="text-indigo-600 font-semibold">AWS DevOps</span> tools, ensuring that every application is fully optimized for smooth deployment, continuous integration, and cloud efficiency.
//                                         </p>
//                                         <p>
//                                             Beyond writing code, I am highly adept at advanced <strong className="text-gray-900 font-semibold">system architecture and application design</strong>, focusing on creating scalable frameworks that handle growth effortlessly. I am dedicated to delivering high-performance, resilient, and easily maintainable codebases that bridge the gap between complex technical requirements and intuitive user experiences. Ultimately, my goal is to align modern engineering practices with core business objectives to deliver reliable software that drives measurable value.
//                                         </p>
//                                     </div>

//                                     {/* Tech Tags */}
//                                     <div className="mt-6 pt-5 border-t border-gray-300">
//                                         <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Core Expertise</h3>
//                                         <div className="flex flex-wrap gap-2">
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-gray-200 text-gray-700 border border-gray-300 rounded-md">#FullStack</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 rounded-md">#React</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-slate-200 text-slate-800 border border-slate-300 rounded-md">#NextJS</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200 rounded-md">#NodeJS</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-red-100 text-red-800 border border-red-200 rounded-md">#NestJS</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200 rounded-md">#Laravel</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-yellow-100 text-yellow-900 border border-yellow-200 rounded-md">#Python</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 rounded-md">#AWS</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-md">#DevOps</span>
//                                             <span className="px-2.5 py-1 text-xs font-medium bg-neutral-200 text-neutral-800 border border-neutral-300 rounded-md">#SystemArchitecture</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//         // <div className="bg-gray-100">
//         //     <div className="container">
//         //         <div className="flex justify-center">
//         //             <div className="w-full mx-20 max-w-4xl sm:max-w-full rounded-none sm:rounded-xl border-none sm:border border-gray-300 p-5">

//         //                 {/* Profile wrapper */}
//         //                 <div className="min-w-full flex flex-col items-center sm:items-start gap-4 sm:flex-row  sm:gap-6">

//         //                     {/* Profile image */}
//         //                     <div className="sm:w-max-content rounded-full sm:rounded-md overflow-hidden border border-gray-200">
//         //                         <img
//         //                             src="/prawez.JPEG"
//         //                             alt="profile"
//         //                             className="w-full h-full object-cover"
//         //                         />
//         //                     </div>

//         //                     {/* Profile info */}
//         //                     <div className="text-center sm:text-left w-full max-w-5xl mt-0 sm:mt-10">
//         //                         <div className="justify-between">
//         //                             <div>
//         //                                 <div className="text-lg sm:text-6xl font-semibold text-gray-800">
//         //                                     ER. PRAWEZ ALAM
//         //                                 </div>

//         //                                 <div className="text-md text-gray-800 my-1">
//         //                                     Expert Full Stack Developer
//         //                                 </div>

//         //                                 <div className="mt-2 text-md text-gray-800 my-1">
//         //                                     +977 9804083811
//         //                                 </div>

//         //                                 <div className="text-md text-gray-800 my-1">
//         //                                     prawezalam9@gmail.com
//         //                                 </div>
//         //                             </div>
//         //                             <div className="hidden sm:block mt-2 text-gray-500">
//         //                                 {/* Full-stack developer skilled in React, Vue, Nuxt, Next, Node, NestJS, Laravel, Python, and AWS DevOps tools, with expertise in system and application design, building scalable, user-focused web applications with clean, maintainable code and a focus on performance and reliability. */}

//         //                                 <div className="max-w-3xl mx-auto my-12 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-slate-300 font-sans">

//         //                                     <div className="flex items-center space-x-4 mb-6">
//         //                                         <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></div>
//         //                                         <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold font-mono">Available for Opportunities</span>
//         //                                     </div>

//         //                                     <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">
//         //                                         About <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Me</span>
//         //                                     </h2>


//         //                                     <div className="space-y-6 text-base leading-relaxed text-slate-300">
//         //                                         <p>
//         //                                             <strong className="text-white font-semibold">Dynamic Full-Stack Developer</strong> proficient in designing, building, and deploying robust, enterprise-grade web applications from the ground up. By seamlessly combining deep frontend expertise (<span className="text-sky-400">React, Next.js, Vue, Nuxt</span>) with powerful backend frameworks (<span className="text-indigo-400">Node.js, NestJS, Laravel, Python</span>), I engineer cohesive, end-to-end digital solutions. This comprehensive technical toolkit is backed by a strong command of cloud infrastructure and <strong className="text-purple-400 font-medium">AWS DevOps</strong> tools, ensuring that every application is fully optimized for smooth deployment, continuous integration, and cloud efficiency.
//         //                                         </p>

//         //                                         <p>
//         //                                             Beyond writing code, I am highly adept at advanced <strong className="text-white font-semibold">system architecture and application design</strong>, focusing on creating scalable frameworks that handle growth effortlessly. I am dedicated to delivering high-performance, resilient, and easily maintainable codebases that bridge the gap between complex technical requirements and intuitive user experiences. Ultimately, my goal is to align modern engineering practices with core business objectives to deliver reliable software that drives measurable value.
//         //                                         </p>
//         //                                     </div>


//         //                                     <div className="mt-8 pt-6 border-t border-slate-800">
//         //                                         <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">Core Expertise</h3>
//         //                                         <div className="flex flex-wrap gap-2">
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full">#FullStack</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full">#React</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full">#NextJS</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">#NodeJS</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">#NestJS</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">#Laravel</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">#Python</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">#AWS</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">#DevOps</span>
//         //                                             <span className="px-3 py-1 text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-full">#SystemArchitecture</span>
//         //                                         </div>
//         //                                     </div>
//         //                                 </div>
//         //                             </div>

//         //                             <div className="mt-2 sm:mt-2">
//         //                                 <div className="inline-block rounded-xl bg-green-200 text-green-800 border border-gray-200 px-3 py-1">
//         //                                     $17/hour (USD)
//         //                                 </div>
//         //                             </div>

//         //                         </div>

//         //                         <div className="flex justify-center sm:justify-start items-center gap-4 text-gray-500 mt-5">
//         //                             <a
//         //                                 href="https://www.linkedin.com/in/prawez-alam/"
//         //                                 target="_blank"
//         //                                 rel="noopener noreferrer"
//         //                                 className="hover:text-blue-600 transition-colors"
//         //                                 aria-label="LinkedIn"
//         //                             >
//         //                                 <FaLinkedin className="w-5 h-5" />
//         //                             </a>

//         //                             <a
//         //                                 href="https://github.com/AlamPrawez"
//         //                                 target="_blank"
//         //                                 rel="noopener noreferrer"
//         //                                 className="hover:text-gray-800 transition-colors"
//         //                                 aria-label="GitHub"
//         //                             >
//         //                                 <FaGithub className="w-5 h-5" />
//         //                             </a>

//         //                             <a
//         //                                 href="https://gitlab.com/prawezAlam"
//         //                                 target="_blank"
//         //                                 rel="noopener noreferrer"
//         //                                 className="hover:text-orange-600 transition-colors"
//         //                                 aria-label="GitLab"
//         //                             >
//         //                                 <FaGitlab className="w-5 h-5" />
//         //                             </a>
//         //                         </div>



//         //                     </div>

//         //                 </div>
//         //             </div>
//         //         </div>
//         //     </div>
//         // </div>
//     )
// }

// export default ProfileCard;