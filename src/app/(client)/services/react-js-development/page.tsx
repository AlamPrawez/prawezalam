import Link from 'next/link';
import React from 'react';


const servicesList = [
  {
    title: "Custom React Web Applications",
    desc: "Build custom web applications tailored to your business processes instead of forcing your workflow into generic software.",
    points: ["SaaS platforms", "Business dashboards", "CRM systems", "ERP solutions", "Internal company tools", "Customer portals", "Booking systems", "Marketplace platforms"]
  },
  {
    title: "Single Page Applications (SPA)",
    desc: "Create highly interactive web applications with seamless navigation and responsive user experiences.",
    points: ["Fast page transitions", "Better user experience", "Lower server load", "Rich interactive interfaces"]
  },
  {
    title: "React Frontend Development",
    desc: "Already have a backend? I can build a modern React frontend that integrates with your existing APIs, whether they're built with Node.js, Laravel, Python, NestJS, or another technology.",
    points: ["Clean separation of concerns", "Axios / Fetch API optimization", "Robust DTO and interface parsing", "Decoupled state management"]
  },
  {
    title: "React Performance Optimization",
    desc: "If your existing application feels slow or difficult to maintain, I can help optimize core systems to scale efficiently.",
    points: ["Core Web Vitals tuning", "Bundle size reduction", "Rendering & memoization fixes", "Code splitting & lazy loading", "State management refactoring", "API runtime efficiency"]
  },
  {
    title: "React Application Modernization",
    desc: "Still using an older React codebase? I can help modernize applications safely without feature downtime.",
    points: ["Upgrading core React versions", "Class components to hooks migration", "Technical debt reduction", "Dependency updates & vetting", "Project restructuring"]
  },
  {
    title: "Ongoing Development & Maintenance",
    desc: "Software continues to evolve after launch. I provide reliable ongoing technical support to keep platforms running smoothly.",
    points: ["New feature rollouts", "System bug fixing", "Security patch application", "Third-party API maintenance", "Code reviews & consulting"]
  }
];

const benefitsList = [
  "Fast rendering via Virtual DOM",
  "Reusable modular components",
  "Extensive robust ecosystem",
  "Excellent enterprise scalability",
  "Long-term maintainability",
  "Great developer tooling & telemetry"
];

const processSteps = [
  {
    step: "01",
    title: "Understand Your Goals",
    desc: "Every project begins with understanding your business, users, and objectives—not just the technical requirements.",
    details: "We discuss your precise project targets, user personas, roadmap constraints, and technical infrastructure limits."
  },
  {
    step: "02",
    title: "Plan the Architecture",
    desc: "Before writing code, I design a scalable architecture that supports future growth and keeps the codebase maintainable.",
    details: "Structuring custom component flows, predictable state lifecycles, asset configurations, and optimized endpoints layout."
  },
  {
    step: "03",
    title: "Build the Application",
    desc: "Development focuses on writing clean, maintainable, and well-structured code using modern React best practices.",
    details: "Utilizing modern tools like TypeScript, Tailwind CSS, TanStack Query, and Shadcn UI based strictly on performance requirements."
  },
  {
    step: "04",
    title: "Testing & Quality Assurance",
    desc: "Before launch, the application is systematically reviewed across functional operational benchmarks.",
    details: "Ensuring deep multi-device responsiveness, fast network loads, accessibility compliances, and bulletproof security pipelines."
  },
  {
    step: "05",
    title: "Deployment & Support",
    desc: "Once the application is ready, I help deploy it and remain available for future improvements as your business grows.",
    details: "Setting up CI/CD pipelines, staging setups, and continuous tracking for fluid, zero-downtime iterations."
  }
];

const featuresGrid = [
  "User authentication", "Admin dashboards", "Analytics dashboards", "Payment integrations",
  "Role-based permissions", "Real-time notifications", "File uploads", "Interactive forms",
  "Search and filtering", "Reporting systems", "API integrations", "Data visualization",
  "Multi-tenant SaaS applications"
];

const industriesList = [
  "SaaS", "Healthcare", "Education", "Real Estate", "Logistics",
  "Finance", "E-commerce", "Manufacturing", "Hospitality", "Internal Operations"
];

const faqsList = [
  {
    question: "Is React a good choice for my project?",
    answer: "React is a strong option for applications that require dynamic interfaces, reusable components, and long-term scalability. It's commonly used for SaaS platforms, dashboards, marketplaces, and many other web applications."
  },
  {
    question: "Do you only build frontend applications?",
    answer: "No. I'm a full-stack developer and can build complete applications, including frontend, backend APIs, databases, authentication, cloud deployment, and infrastructure."
  },
  {
    question: "Can you work with an existing React project?",
    answer: "Yes. I can join existing projects to add features, improve performance, fix bugs, modernize the codebase, or help with long-term maintenance."
  },
  {
    question: "Can you build SEO-friendly React websites?",
    answer: "Yes. For projects where search engine visibility is important, I often recommend Next.js alongside React to enable server-side rendering, static generation, and other SEO-friendly capabilities."
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes. I work remotely with businesses, startups, and agencies worldwide, communicating in English and collaborating across time zones."
  }
];

export default function ReactDevelopmentServicesPage() {
  return (
    <div className="bg-white text-gray-900 selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-linear-to-b from-gray-50 via-white to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full inline-block mb-4 border border-indigo-100 shadow-2xs">
              Frontend Engineering Expertise
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Build Fast, Scalable <span className="text-indigo-600">React Applications</span> That Users Love
            </h1>
            <p className="text-gray-600 mt-6 text-base sm:text-xl leading-relaxed">
              Need a modern web application that is fast, responsive, and easy to scale? I build high-quality React.js applications for startups, businesses, and agencies looking for a reliable development partner.
            </p>
            <p className="text-gray-500 mt-4 text-sm sm:text-lg leading-relaxed">
              Whether you're building a new SaaS product, an internal business tool, a customer dashboard, or migrating an existing application to React, I can help you deliver a solution that's maintainable, performant, and built for long-term growth.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/hire-for-tasks" 
                className="inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs hover:shadow-md transition-all duration-200"
              >
                Get in touch for a free project discussion
              </Link>
              <a 
                href="/services" 
                className="inline-flex items-center justify-center px-6 py-3.5 border border-gray-200 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-indigo-50/20 to-transparent pointer-events-none hidden lg:block" />
      </section>

      {/* 2. SERVICES CATALOGUE SECTION */}
      <section id="services" className="py-24 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              React Development Services
            </h2>
            <p className="text-gray-500 mt-4 text-base leading-relaxed">
              I provide end-to-end React.js development services, from initial planning and architecture to deployment and ongoing ecosystem improvements.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/60 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>
                <div className="border-t border-gray-50 pt-4 mt-auto">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">Focus & Deployments:</span>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {service.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs text-gray-600 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE BENEFITS SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Why Choose React?
              </h2>
              <p className="text-indigo-200 mt-4 text-base sm:text-lg leading-relaxed">
                React is one of the most widely adopted frontend libraries for building modern web applications. It's an excellent choice for startups launching an MVP as well as enterprises building complex core software.
              </p>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-10">
                {benefitsList.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-3 bg-white/10 backdrop-blur-xs px-4 py-3 rounded-xl border border-white/10">
                    <svg className="w-5 h-5 text-indigo-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-medium tracking-wide text-white">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-700/30 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* 4. PROCESS WORKFLOW SECTION */}
      <section className="py-24 bg-gray-50/40 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full inline-block mb-3.5 border border-indigo-100">
              Execution Strategy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              My Development Process
            </h2>
            <p className="text-gray-500 mt-4 text-base leading-relaxed">
              A systematic, engineering-focused workflow designed to turn ideas into highly maintainable production assets.
            </p>
          </div>

          <div className="relative border-l border-gray-200 ml-4 md:ml-6 space-y-12">
            {processSteps.map((proc, pIdx) => (
              <div key={pIdx} className="relative pl-8 sm:pl-12 group">
                {/* Timeline node ring line indicator wrapper */}
                <div className="absolute -left-[17px] top-0 flex items-center justify-center h-8 w-8 rounded-full bg-white border-2 border-indigo-600 font-mono text-xs font-bold text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-2xs">
                  {proc.step}
                </div>
                
                <div className="max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/70 shadow-2xs">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 tracking-tight">
                    {proc.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {proc.desc}
                  </p>
                  <p className="text-gray-400 mt-3 text-xs leading-relaxed font-normal pt-3 border-t border-gray-50">
                    {proc.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CAPABILITIES GRID (INDUSTRIES & FEATURES) */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            
            {/* Column A: Frequently Built Features */}
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
                Frequently Built Features
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Some of the solutions I regularly engineer into custom web applications:
              </p>
              <div className="flex flex-wrap gap-2">
                {featuresGrid.map((feat, fIdx) => (
                  <span key={fIdx} className="text-xs bg-gray-50 text-gray-700 border border-gray-200/60 px-3 py-1.5 rounded-lg font-medium">
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Column B: Industries Served */}
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
                Industries I Work With
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                React structures fit seamlessly into many domain configurations, including:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {industriesList.map((ind, iIdx) => (
                  <div key={iIdx} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/50 border border-gray-100 text-gray-800 font-medium text-sm">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    {ind}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. ADVANTAGE BIOGRAPHY VALUE PROPOSITION */}
      <section className="py-24 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-xs max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Why Work With Me?
                </h3>
                <p className="text-gray-600 mt-3 text-base leading-relaxed">
                  As a full-stack developer, I don't only build user interfaces—I understand the entire application layer lifecycle.
                </p>
                <div className="mt-6 space-y-3.5 text-sm sm:text-base text-gray-700 font-normal">
                  <p className="flex items-start gap-2.5"><span className="text-indigo-600 font-bold mt-0.5">✓</span> Design scalable system architecture frameworks from scratch.</p>
                  <p className="flex items-start gap-2.5"><span className="text-indigo-600 font-bold mt-0.5">✓</span> Build secure backend APIs that exchange data seamlessly.</p>
                  <p className="flex items-start gap-2.5"><span className="text-indigo-600 font-bold mt-0.5">✓</span> Integrate cloud infrastructure networks and access configurations.</p>
                  <p className="flex items-start gap-2.5"><span className="text-indigo-600 font-bold mt-0.5">✓</span> Optimize overall performance workflows to isolate system drops.</p>
                </div>
                <p className="text-gray-500 text-xs mt-6 pt-4 border-t border-gray-50">
                  Rather than delivering isolated frontend code that is difficult to wire up, I build complete web solutions designed to run safely and predictably from the browser directly to the server infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full inline-block mb-3.5 border border-indigo-100">
              FAQ Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-8">
            {faqsList.map((faq, fIdx) => (
              <div key={fIdx} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/40 hover:bg-white hover:border-gray-200 hover:shadow-xs transition-all duration-200 flex flex-col group">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold font-mono">
                    Q
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mt-2.5 font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CLOSING CONTEXTUAL FOOTER CALL TO ACTION */}
      <section id="contact" className="py-24 bg-linear-to-b from-white via-gray-50/50 to-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Let's Build Your React Application
          </h2>
          <p className="text-gray-600 mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you're starting from a raw product idea, improving an existing codebase ecosystem, or looking to scale a rapidly growing platform, I'd be happy to map out your project solutions.
          </p>
          <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
            If you are looking for a reliable software engineer who values pristine formatting logic, robust framework scalability, and long-term codebase maintainability—let's talk.
          </p>
          <div className="mt-10">
            <Link 
              href="/hire-for-tasks"  // Substitute this with your target link format or trigger modal route
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
            >
              Contact Me Today to Discuss Your Project
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}