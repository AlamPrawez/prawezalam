'use client';

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { 
  Layout, 
  Layers, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Sparkles, 
  HelpCircle, 
  MessageSquare, 
  FileText, 
  X,
  Check,
  ExternalLink,
  Sliders,
  ChevronDown,
  Grid,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Edit3,
  ListPlus
} from 'lucide-react';

const AVAILABLE_SECTION_TYPES = [
  { id: 'hero', name: 'Hero Banner', description: 'Immersive landing header with badges and action CTAs.', icon: Sparkles },
  { id: 'features', name: 'Features / Tech Stack', description: 'Grid-based service cards with icons and highlights.', icon: Layers },
  { id: 'process', name: 'Step-by-Step Process', description: 'Numbered workflow timeline showing development lifecycle with step editor.', icon: Cpu },
  { id: 'content', name: 'Editorial / Article Block', description: 'Clean multi-column technical overview with rich typography.', icon: FileText },
  { id: 'faq', name: 'FAQ Accordion', description: 'Expandable question list for common client inquiries.', icon: HelpCircle },
  { id: 'cta', name: 'Conversion Banner', description: 'High-contrast closing call to action for inquiries.', icon: MessageSquare },
];

interface PageButton {
  id: string;
  text: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
}

interface StepCardItem {
  title: string;
  desc: string;
  iconName: string;
}

interface PageSectionItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  bgTheme: 'dark' | 'light' | 'indigo' | 'slate';
  layoutStyle: 'split-right' | 'split-left' | 'centered' | 'minimal' | 'grid-cards' | 'workflow-steps';
  paddingSize: 'sm' | 'md' | 'lg' | 'xl';
  imageUrl: string;
  buttons: PageButton[];
  cardsList?: StepCardItem[];
  bulletPoints?: string[]; // Optional bullet points list
}

interface PageBuilderValues {
  pageTitle: string;
  slug: string;
  sections: PageSectionItem[];
}

export default function DiverseLayoutsPageBuilder() {
  const methods = useForm<PageBuilderValues>({
    defaultValues: {
      pageTitle: 'React.js Development Services',
      slug: 'reactjs-development-services',
      sections: [], 
    },
  });

  const { register, watch, setValue } = methods;
  const sections = watch('sections') || [];

  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const [selectedTypeForStyles, setSelectedTypeForStyles] = useState<{ id: string; name: string } | null>(null);
  const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const getFourSampleOptions = (typeId: string, typeName: string) => {
    switch (typeId) {
      case 'features':
        return [
          {
            id: 0,
            title: `Enterprise ${typeName} Grid`,
            subtitle: `Scalable component architecture designed for high-performance enterprise applications.`,
            bgTheme: 'dark' as const,
            layoutStyle: 'grid-cards' as const,
            paddingSize: 'lg' as const,
            imageUrl: '',
            buttons: [{ id: 'b1', text: 'Explore Architecture', url: '#', variant: 'primary' as const }],
            cardsList: [
              { title: 'Component Reusability', desc: 'Modular design systems built with strict atomic principles.', iconName: 'Zap' },
              { title: 'State Optimization', desc: 'Blazing fast state handling using modern React hooks & context.', iconName: 'Cpu' },
              { title: 'SSR & SSG Performance', desc: 'Optimized server-side rendering for elite Core Web Vitals.', iconName: 'ShieldCheck' }
            ],
            bulletPoints: ['Zero layout shifts', 'Atomic design patterns', 'Optimized bundle sizes']
          },
          {
            id: 1,
            title: `Modern Split ${typeName}`,
            subtitle: `Detailed technical capabilities with visual preview and secondary action flow. [View Portfolio](https://prawez.com)`,
            bgTheme: 'indigo' as const,
            layoutStyle: 'split-right' as const,
            paddingSize: 'xl' as const,
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
            buttons: [{ id: 'b2', text: 'Hire Developer', url: '#', variant: 'primary' as const }]
          },
          {
            id: 2,
            title: `Clean Minimal ${typeName}`,
            subtitle: `Streamlined presentation for client-facing software deliverables and modules.`,
            bgTheme: 'light' as const,
            layoutStyle: 'split-left' as const,
            paddingSize: 'md' as const,
            imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
            buttons: [{ id: 'b3', text: 'Learn More', url: '#', variant: 'outline' as const }]
          },
          {
            id: 3,
            title: `Centered Focus ${typeName}`,
            subtitle: `High-impact centered layout emphasizing core delivery milestones.`,
            bgTheme: 'slate' as const,
            layoutStyle: 'centered' as const,
            paddingSize: 'lg' as const,
            imageUrl: '',
            buttons: [{ id: 'b4', text: 'Get Quote', url: '#', variant: 'primary' as const }]
          },
          {
            id: 4,
            title: `Advanced Performance ${typeName}`,
            subtitle: `Deep dive into optimization, targeting a 100/100 Lighthouse performance benchmark.`,
            bgTheme: 'dark' as const,
            layoutStyle: 'grid-cards' as const,
            paddingSize: 'xl' as const,
            imageUrl: '',
            buttons: [
              { id: 'b5', text: 'Run Audit', url: '#', variant: 'primary' as const },
              { id: 'b6', text: 'View Metrics', url: '#', variant: 'secondary' as const }
            ],
            cardsList: [
              { title: 'Lighthouse 100/100', desc: 'Flawless scoring across performance, accessibility, and SEO.', iconName: 'Zap' },
              { title: 'Core Web Vitals', desc: 'Zero layout shifts and instantaneous First Contentful Paint.', iconName: 'ShieldCheck' },
              { title: 'Asset Compression', desc: 'Advanced image pipelines using next-gen WebP/AVIF formats.', iconName: 'Cpu' }
            ]
          },
          {
            id: 5,
            title: `Ecosystem & Integration Hub`,
            subtitle: `Seamless bridging between Next.js frontends, FastAPI backends, and micro-services.`,
            bgTheme: 'indigo' as const,
            layoutStyle: 'split-right' as const,
            paddingSize: 'lg' as const,
            imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
            buttons: [{ id: 'b7', text: 'View Integration Specs', url: '#', variant: 'primary' as const }]
          }
        ];

      case 'process':
        return [
          {
            id: 0,
            title: `Step-by-Step Delivery Workflow`,
            subtitle: `Our structured 4-phase agile engineering methodology from discovery to production deployment.`,
            bgTheme: 'dark' as const,
            layoutStyle: 'workflow-steps' as const,
            paddingSize: 'lg' as const,
            imageUrl: '',
            buttons: [{ id: 'p1', text: 'Start Project', url: '#', variant: 'primary' as const }],
            cardsList: [
              { title: '01. Discovery & Architecture', desc: 'Requirement mapping, tech stack selection (Next.js/FastAPI), and wireframing.', iconName: 'CheckCircle2' },
              { title: '02. UI/UX Implementation', desc: 'Tailwind CSS responsive styling with pixel-perfect design accuracy.', iconName: 'CheckCircle2' },
              { title: '03. Integration & Testing', desc: 'API integration, performance audits, and 100/100 Lighthouse checks.', iconName: 'CheckCircle2' },
              { title: '04. Deployment & Support', desc: 'Production server configuration, Kali Linux hardening, and ongoing maintenance.', iconName: 'CheckCircle2' }
            ]
          },
          {
            id: 1,
            title: `Agile Workflow Overview`,
            subtitle: `Streamlined operational milestones to ensure fast turnaround times.`,
            bgTheme: 'indigo' as const,
            layoutStyle: 'centered' as const,
            paddingSize: 'xl' as const,
            imageUrl: '',
            buttons: [{ id: 'p2', text: 'View Timeline', url: '#', variant: 'primary' as const }]
          },
          {
            id: 2,
            title: `Engineering Standards`,
            subtitle: `Rigorous code reviews and strict CI/CD pipelines.`,
            bgTheme: 'slate' as const,
            layoutStyle: 'split-right' as const,
            paddingSize: 'lg' as const,
            imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
            buttons: [{ id: 'p3', text: 'Explore Standards', url: '#', variant: 'outline' as const }]
          },
          {
            id: 3,
            title: `Minimal Workflow Notes`,
            subtitle: `Quick reference guide for development milestones.`,
            bgTheme: 'light' as const,
            layoutStyle: 'minimal' as const,
            paddingSize: 'sm' as const,
            imageUrl: '',
            buttons: [{ id: 'p4', text: 'Read Guide', url: '#', variant: 'secondary' as const }]
          },
          {
            id: 4,
            title: `Full-Stack Lifecycle & DevOps`,
            subtitle: `Comprehensive end-to-end management covering database schemas, security hardening, and deployment.`,
            bgTheme: 'dark' as const,
            layoutStyle: 'workflow-steps' as const,
            paddingSize: 'xl' as const,
            imageUrl: '',
            buttons: [{ id: 'p5', text: 'Inspect Roadmap', url: '#', variant: 'primary' as const }],
            cardsList: [
              { title: 'Phase 1: Database & ORM', desc: 'PostgreSQL setup with PostGIS spatial extensions and async SQLAlchemy models.', iconName: 'CheckCircle2' },
              { title: 'Phase 2: API Gateway', desc: 'FastAPI microservices coupled with gRPC protocols for lightning-fast RPC communication.', iconName: 'CheckCircle2' },
              { title: 'Phase 3: Security & Hardening', desc: 'Kali Linux based penetration testing, JWT authentication, and rate-limiting.', iconName: 'CheckCircle2' },
              { title: 'Phase 4: Global Scale', desc: 'CDN edge caching, Docker containerization, and automated Kubernetes scaling.', iconName: 'CheckCircle2' }
            ]
          },
          {
            id: 5,
            title: `Rapid Prototyping Sprint`,
            subtitle: `Accelerated 2-week MVP development lifecycle for early-stage startups.`,
            bgTheme: 'indigo' as const,
            layoutStyle: 'centered' as const,
            paddingSize: 'lg' as const,
            imageUrl: '',
            buttons: [{ id: 'p6', text: 'Book Sprint', url: '#', variant: 'primary' as const }]
          }
        ];

      case 'hero':
        return [
          {
            id: 0,
            title: `High-Impact ${typeName}`,
            subtitle: `Elite software development services engineered for peak performance and conversion. [Explore Services](https://prawez.com)`,
            bgTheme: 'dark' as const,
            layoutStyle: 'split-right' as const,
            paddingSize: 'xl' as const,
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
            buttons: [
              { id: 'h1-b1', text: 'Book Consultation', url: '#', variant: 'primary' as const },
              { id: 'h1-b2', text: 'View Portfolio', url: '#', variant: 'secondary' as const }
            ],
            bulletPoints: ['Lighthouse 100/100 Optimized', 'FastAPI & Next.js Stack', 'Production Ready in 4 Weeks']
          },
          {
            id: 1,
            title: `Immersive Center ${typeName}`,
            subtitle: `Scale your technical capabilities with robust Next.js and FastAPI infrastructure.`,
            bgTheme: 'indigo' as const,
            layoutStyle: 'centered' as const,
            paddingSize: 'xl' as const,
            imageUrl: '',
            buttons: [{ id: 'h2-b1', text: 'Get Started Today', url: '#', variant: 'primary' as const }]
          },
          {
            id: 2,
            title: `Minimalist Creator ${typeName}`,
            subtitle: `Clean, distraction-free headline block for targeted technical offerings.`,
            bgTheme: 'light' as const,
            layoutStyle: 'minimal' as const,
            paddingSize: 'lg' as const,
            imageUrl: '',
            buttons: [{ id: 'h3-b1', text: 'Learn More', url: '#', variant: 'outline' as const }]
          },
          {
            id: 3,
            title: `Developer First ${typeName}`,
            subtitle: `Tailored for technical founders seeking production-ready codebases and clean system architectures.`,
            bgTheme: 'slate' as const,
            layoutStyle: 'split-left' as const,
            paddingSize: 'xl' as const,
            imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
            buttons: [{ id: 'h4-b1', text: 'Explore Codebase', url: '#', variant: 'primary' as const }]
          }
        ];

      case 'content':
        return [
          {
            id: 0,
            title: `Editorial Technical Overview`,
            subtitle: `Deep dive into modern web patterns, SEO structuring, and domain authority acceleration. [Read Blog](https://prawez.com)`,
            bgTheme: 'dark' as const,
            layoutStyle: 'split-left' as const,
            paddingSize: 'lg' as const,
            imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
            buttons: [{ id: 'c1-b1', text: 'Read Full Article', url: '#', variant: 'primary' as const }]
          },
          {
            id: 1,
            title: `Architecture Deep Dive`,
            subtitle: `Comprehensive breakdown of asynchronous server endpoints and reactive frontend state management.`,
            bgTheme: 'indigo' as const,
            layoutStyle: 'centered' as const,
            paddingSize: 'xl' as const,
            imageUrl: '',
            buttons: [{ id: 'c2-b1', text: 'Download Whitepaper', url: '#', variant: 'secondary' as const }]
          },
          {
            id: 2,
            title: `Clean Editorial Column`,
            subtitle: `Streamlined text block formatted for high readability and structured documentation guidelines.`,
            bgTheme: 'light' as const,
            layoutStyle: 'minimal' as const,
            paddingSize: 'md' as const,
            imageUrl: '',
            buttons: [{ id: 'c3-b1', text: 'View Guidelines', url: '#', variant: 'outline' as const }]
          },
          {
            id: 3,
            title: `Security & Infrastructure Notes`,
            subtitle: `Best practices for hardening servers and managing environment variables securely.`,
            bgTheme: 'slate' as const,
            layoutStyle: 'split-right' as const,
            paddingSize: 'lg' as const,
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
            buttons: [{ id: 'c4-b1', text: 'Secure Your App', url: '#', variant: 'primary' as const }]
          }
        ];

      case 'faq':
        return [
          {
            id: 0,
            title: `Frequently Asked Questions`,
            subtitle: `Got questions about our development process, timelines, or tech stack? Find answers below.`,
            bgTheme: 'dark' as const,
            layoutStyle: 'centered' as const,
            paddingSize: 'lg' as const,
            imageUrl: '',
            buttons: [{ id: 'f1-b1', text: 'Ask Custom Question', url: '#', variant: 'primary' as const }],
            cardsList: [
              { title: 'What is your typical project timeline?', desc: 'Most MVP web applications are delivered within 4 to 6 weeks depending on scope complexity.', iconName: 'HelpCircle' },
              { title: 'Do you provide ongoing maintenance?', desc: 'Yes, we offer comprehensive post-launch support, security patches, and performance monitoring.', iconName: 'HelpCircle' },
              { title: 'What tech stack do you recommend?', desc: 'We specialize in Next.js for high-performance frontends and FastAPI for scalable backend APIs.', iconName: 'HelpCircle' }
            ]
          },
          {
            id: 1,
            title: `Client Inquiries & Support`,
            subtitle: `Everything you need to know about working with our engineering team.`,
            bgTheme: 'indigo' as const,
            layoutStyle: 'split-right' as const,
            paddingSize: 'lg' as const,
            imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
            buttons: [{ id: 'f2-b1', text: 'Contact Support', url: '#', variant: 'primary' as const }]
          },
          {
            id: 2,
            title: `Technical FAQ`,
            subtitle: `Detailed answers regarding hosting, database configuration, and API rate limits.`,
            bgTheme: 'slate' as const,
            layoutStyle: 'minimal' as const,
            paddingSize: 'md' as const,
            imageUrl: '',
            buttons: [{ id: 'f3-b1', text: 'View Docs', url: '#', variant: 'outline' as const }]
          },
          {
            id: 3,
            title: `Pricing & Engagement FAQ`,
            subtitle: `Transparent information regarding fixed-price packages and dedicated developer retainers.`,
            bgTheme: 'light' as const,
            layoutStyle: 'grid-cards' as const,
            paddingSize: 'lg' as const,
            imageUrl: '',
            buttons: [{ id: 'f4-b1', text: 'Request Pricing', url: '#', variant: 'primary' as const }],
            cardsList: [
              { title: 'Fixed-Price vs Retainer', desc: 'We offer both milestone-based fixed pricing and flexible monthly engineering retainers.', iconName: 'HelpCircle' },
              { title: 'Payment Terms', desc: 'Typically structured as a 50% initial deposit and 50% upon successful deployment.', iconName: 'HelpCircle' }
            ]
          }
        ];

      case 'cta':
        return [
          {
            id: 0,
            title: `Ready to Build Your Next Project?`,
            subtitle: `Let's collaborate to bring your vision to life with lightning-fast performance and clean architecture. [Get in Touch](https://prawez.com)`,
            bgTheme: 'indigo' as const,
            layoutStyle: 'centered' as const,
            paddingSize: 'xl' as const,
            imageUrl: '',
            buttons: [
              { id: 'cta1-b1', text: 'Schedule Call', url: '#', variant: 'primary' as const },
              { id: 'cta1-b2', text: 'Send Message', url: '#', variant: 'secondary' as const }
            ]
          },
          {
            id: 1,
            title: `Accelerate Your Web Application`,
            subtitle: `Partner with an expert full-stack engineer to optimize your platform today.`,
            bgTheme: 'dark' as const,
            layoutStyle: 'split-right' as const,
            paddingSize: 'lg' as const,
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
            buttons: [{ id: 'cta2-b1', text: 'Hire Now', url: '#', variant: 'primary' as const }]
          },
          {
            id: 2,
            title: `Let's Build Something Exceptional`,
            subtitle: `Transform your digital presence with enterprise-grade solutions tailored to your business goals.`,
            bgTheme: 'slate' as const,
            layoutStyle: 'minimal' as const,
            paddingSize: 'md' as const,
            imageUrl: '',
            buttons: [{ id: 'cta3-b1', text: 'Start Discussion', url: '#', variant: 'outline' as const }]
          },
          {
            id: 3,
            title: `Scale Your Engineering Capacity`,
            subtitle: `Immediate availability for high-priority development sprints and technical audits.`,
            bgTheme: 'light' as const,
            layoutStyle: 'centered' as const,
            paddingSize: 'lg' as const,
            imageUrl: '',
            buttons: [{ id: 'cta4-b1', text: 'Claim Your Slot', url: '#', variant: 'primary' as const }]
          }
        ];

      default:
        return [
          {
            id: 0,
            title: `Modern ${typeName} (Dark Split)`,
            subtitle: `High-impact layout with split alignment and dark slate aesthetics. [Learn More](https://prawez.com)`,
            bgTheme: 'dark' as const,
            layoutStyle: 'split-right' as const,
            paddingSize: 'lg' as const,
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
            buttons: [
              { id: 's1-b1', text: 'Get Started', url: '#', variant: 'primary' as const },
              { id: 's1-b2', text: 'Learn More', url: '#', variant: 'secondary' as const }
            ]
          },
          {
            id: 1,
            title: `Vibrant ${typeName} (Indigo Glow)`,
            subtitle: `Immersive indigo theme with centered alignment and bold focus CTA.`,
            bgTheme: 'indigo' as const,
            layoutStyle: 'centered' as const,
            paddingSize: 'xl' as const,
            imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
            buttons: [{ id: 's2-b1', text: 'Explore Now', url: '#', variant: 'primary' as const }]
          },
          {
            id: 2,
            title: `Clean ${typeName} (Light Minimal)`,
            subtitle: `Clean professional presentation with light surface background and image left.`,
            bgTheme: 'light' as const,
            layoutStyle: 'split-left' as const,
            paddingSize: 'md' as const,
            imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
            buttons: [
              { id: 's3-b1', text: 'View Details', url: '#', variant: 'outline' as const },
              { id: 's3-b2', text: 'Contact Us', url: '#', variant: 'ghost' as const }
            ]
          },
          {
            id: 3,
            title: `Minimalist Editorial ${typeName}`,
            subtitle: `Simple typography-focused block designed for quick reading and clean layout flow.`,
            bgTheme: 'slate' as const,
            layoutStyle: 'minimal' as const,
            paddingSize: 'sm' as const,
            imageUrl: '',
            buttons: [{ id: 's4-b1', text: 'Read Article', url: '#', variant: 'primary' as const }]
          },
          {
            id: 4,
            title: `Modular Grid ${typeName}`,
            subtitle: `Multi-card structured block showcasing core competencies and service highlights.`,
            bgTheme: 'dark' as const,
            layoutStyle: 'grid-cards' as const,
            paddingSize: 'lg' as const,
            imageUrl: '',
            buttons: [{ id: 's5-b1', text: 'Explore Modules', url: '#', variant: 'primary' as const }],
            cardsList: [
              { title: 'High Availability', desc: 'Fault-tolerant architecture built for uninterrupted uptime.', iconName: 'ShieldCheck' },
              { title: 'Rapid Deployment', desc: 'Streamlined CI/CD pipelines for instant production releases.', iconName: 'Zap' },
              { title: 'Scalable Database', desc: 'Optimized querying with robust indexing and caching layers.', iconName: 'Cpu' }
            ]
          },
          {
            id: 5,
            title: `Featured Showcase ${typeName}`,
            subtitle: `Visual-heavy layout featuring professional photography and targeted call-to-actions.`,
            bgTheme: 'indigo' as const,
            layoutStyle: 'split-right' as const,
            paddingSize: 'xl' as const,
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
            buttons: [{ id: 's6-b1', text: 'View Showcase', url: '#', variant: 'primary' as const }]
          }
        ];
    }
  };

  const handleSelectSectionType = (typeId: string) => {
    const template = AVAILABLE_SECTION_TYPES.find((t) => t.id === typeId);
    if (!template) return;

    setSelectedTypeForStyles({ id: template.id, name: template.name });
    setSelectedSampleIndex(0);
    setIsAddDropdownOpen(false);
  };

  const handleConfirmAddSampleTemplate = () => {
    if (!selectedTypeForStyles) return;

    const samples = getFourSampleOptions(selectedTypeForStyles.id, selectedTypeForStyles.name);
    const chosen = samples[selectedSampleIndex] || samples[0];

    const newSection: PageSectionItem = {
      id: `sec-${Date.now()}`,
      type: selectedTypeForStyles.id,
      title: chosen.title,
      subtitle: chosen.subtitle,
      bgTheme: chosen.bgTheme,
      layoutStyle: chosen.layoutStyle,
      paddingSize: chosen.paddingSize,
      imageUrl: chosen.imageUrl,
      buttons: chosen.buttons.map(b => ({ ...b, id: `btn-${Date.now()}-${Math.random()}` })),
      // cardsList: (chosen as any)?.cardsList ? chosen.cardsList.map(c => ({ ...c })) : [],
      // bulletPoints: (chosen as any).bulletPoints ? [...chosen.bulletPoints] : []
      cardsList: (chosen as any)?.cardsList?.map((c: any) => ({ ...c })) ?? [],
bulletPoints: (chosen as any)?.bulletPoints ? [...(chosen as any)?.bulletPoints] : [],
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

  // Step/Card Management functions
  const addStepCard = (sectionIndex: number) => {
    const currentCards = sections[sectionIndex]?.cardsList || [];
    const stepNum = String(currentCards.length + 1).padStart(2, '0');
    const newCard: StepCardItem = {
      title: `${stepNum}. New Step Title`,
      desc: 'Describe the milestone or technical task details here...',
      iconName: 'CheckCircle2'
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

  // Optional Bullet Points Management functions
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
    if (editingIndex === index) setEditingIndex(null);
    else if (editingIndex !== null && editingIndex > index) setEditingIndex(editingIndex - 1);
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

  const getPaddingClass = (size?: string) => {
    switch (size) {
      case 'sm': return 'p-4 sm:p-6';
      case 'md': return 'p-6 sm:p-10';
      case 'xl': return 'p-10 sm:p-20';
      case 'lg':
      default: return 'p-8 sm:p-14';
    }
  };

  const renderRichTextWithLinks = (text: string) => {
    if (!text) return null;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <a
          key={`${match.index}-${match[2]}`}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-semibold inline-flex items-center gap-1 transition-colors"
        >
          {match[1]} <ExternalLink className="w-3 h-3 inline" />
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  const renderButtonStyle = (variant: string) => {
    switch (variant) {
      case 'secondary':
        return 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 shadow-md';
      case 'outline':
        return 'bg-transparent hover:bg-indigo-600/10 text-indigo-400 border border-indigo-500/40 shadow-sm';
      case 'ghost':
        return 'bg-transparent hover:bg-white/5 text-slate-300 shadow-none';
      case 'primary':
      default:
        return 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30';
    }
  };

  const getThemeClass = (theme: string) => {
    switch (theme) {
      case 'indigo': return 'bg-indigo-950/80 border-indigo-500/40 text-white';
      case 'light': return 'bg-slate-100 border-slate-300 text-slate-900';
      case 'slate': return 'bg-slate-900 border-slate-800 text-slate-100';
      case 'dark':
      default: return 'bg-slate-950 border-slate-800 text-white';
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-8 relative">
        
        {/* Sticky Top Action Bar */}
        <div className="sticky top-4 z-40 bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-1">
              <Layout className="w-3 h-3" /> Service Page Builder
            </div>
            <h1 className="text-lg font-extrabold text-white">
              Live Canvas ({sections.length} Sections Added)
            </h1>
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

        {/* Full Page Flow Display Canvas */}
        <div className="space-y-6">
          {sections.length === 0 ? (
            <div className="text-center py-24 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                <Layout className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Your service canvas is completely empty</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">Click "Add Section" above to choose service blocks with unique multi-column layouts like prawez.com.</p>
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
              const paddingClasses = getPaddingClass(sec.paddingSize);
              const isLeftLayout = sec.layoutStyle === 'split-left';
              const isCentered = sec.layoutStyle === 'centered';
              const isMinimal = sec.layoutStyle === 'minimal';
              const isGridCards = sec.layoutStyle === 'grid-cards';
              const isWorkflowSteps = sec.layoutStyle === 'workflow-steps';
              const buttonsList = sec.buttons || [];
              const cardsList = sec.cardsList || [];
              const bulletPoints = sec.bulletPoints || [];

              return (
                <div
                  key={sec.id}
                  className={`group relative rounded-3xl border transition-all shadow-xl overflow-hidden ${getThemeClass(sec.bgTheme)}`}
                >
                  {/* FLOATING HOVER TOOLBAR */}
                  <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 bg-slate-950/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 shadow-2xl">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 mr-2">
                      #{index + 1} {sec.type} ({sec.layoutStyle})
                    </span>

                    <button
                      type="button"
                      onClick={() => setEditingIndex(isEditing ? null : index)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                        isEditing ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                      title="Edit Section Styles & Content"
                    >
                      <Sliders className="w-3.5 h-3.5" /> {isEditing ? 'Close' : 'Style & Edit'}
                    </button>

                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => moveSection(index, 'up')}
                        className="p-1.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg transition"
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {index < sections.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveSection(index, 'down')}
                        className="p-1.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg transition"
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition ml-0.5"
                      title="Delete Section"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Inline Section Editor Drawer */}
                  {isEditing && (
                    <div className="p-6 bg-slate-950/95 text-slate-100 border-b border-slate-800 space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                          <Sliders className="w-3.5 h-3.5" /> Section #{index + 1} Configuration
                        </h4>
                        <button 
                          type="button" 
                          onClick={() => setEditingIndex(null)}
                          className="text-slate-400 hover:text-white text-xs flex items-center gap-1 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Done
                        </button>
                      </div>

                      {/* Style Options Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Color Theme</label>
                          <select
                            {...register(`sections.${index}.bgTheme` as const)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                          >
                            <option value="dark">Dark Slate (#090d16)</option>
                            <option value="indigo">Indigo Glow Accent</option>
                            <option value="slate">Neutral Gray Slate</option>
                            <option value="light">Clean Light Surface</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Layout Style</label>
                          <select
                            {...register(`sections.${index}.layoutStyle` as const)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                          >
                            <option value="split-right">Split (Image Right)</option>
                            <option value="split-left">Split (Image Left)</option>
                            <option value="centered">Centered Content</option>
                            <option value="grid-cards">Service Cards Grid</option>
                            <option value="workflow-steps">Workflow Timeline Steps</option>
                            <option value="minimal">Minimal Clean</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Section Spacing</label>
                          <select
                            {...register(`sections.${index}.paddingSize` as const)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                          >
                            <option value="sm">Compact (Small)</option>
                            <option value="md">Medium</option>
                            <option value="lg">Large</option>
                            <option value="xl">Extra Large (Hero)</option>
                          </select>
                        </div>
                      </div>

                      {/* Content Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Section Title</label>
                          <input
                            type="text"
                            {...register(`sections.${index}.title` as const)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1 flex items-center justify-between">
                            <span>Subtitle / Rich Text with Links</span>
                            <span className="text-[9px] text-indigo-400 font-normal">Format: [Link Text](https://url)</span>
                          </label>
                          <textarea
                            rows={2}
                            {...register(`sections.${index}.subtitle` as const)}
                            placeholder="Enter text or use [Click Here](https://prawez.com) for links..."
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                          />
                        </div>
                      </div>

                      {/* OPTIONAL BULLET POINTS MANAGER SUB-SECTION */}
                      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                              <ListPlus className="w-3.5 h-3.5 text-indigo-400" /> Optional Bullet Points ({bulletPoints.length})
                            </h5>
                            <p className="text-[10px] text-slate-400 mt-0.5">Add, edit, or remove optional check/bullet highlights for this section.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => addBulletPoint(index)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Bullet
                          </button>
                        </div>

                        {bulletPoints.length === 0 ? (
                          <div className="p-3 rounded-xl bg-slate-950 text-center border border-dashed border-slate-800 text-slate-500 text-xs">
                            No bullet points added (Optional). Click "Add Bullet" to include highlight items.
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {bulletPoints.map((_, bulletIdx) => (
                              <div key={bulletIdx} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                                <span className="text-[10px] font-bold text-indigo-400 shrink-0">#{bulletIdx + 1}</span>
                                <input
                                  type="text"
                                  {...register(`sections.${index}.bulletPoints.${bulletIdx}` as const)}
                                  placeholder="Bullet point text..."
                                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeBulletPoint(index, bulletIdx)}
                                  className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition shrink-0"
                                  title="Delete Bullet"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* STEP-BY-STEP OR CARDS MANAGER SUB-SECTION */}
                      {(isWorkflowSteps || isGridCards) && (
                        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                                <Edit3 className="w-3.5 h-3.5 text-indigo-400" /> Manage Steps / Grid Cards ({cardsList.length})
                              </h5>
                              <p className="text-[10px] text-slate-400 mt-0.5">Add, reorder, edit, or delete individual steps in this section.</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => addStepCard(index)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add Step
                            </button>
                          </div>

                          {cardsList.length === 0 ? (
                            <div className="p-4 rounded-xl bg-slate-950 text-center border border-dashed border-slate-800 text-slate-500 text-xs">
                              No steps or cards added yet. Click "Add Step" above.
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {cardsList.map((card, cardIdx) => (
                                <div key={cardIdx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/30">
                                      Step #{cardIdx + 1}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      {cardIdx > 0 && (
                                        <button
                                          type="button"
                                          onClick={() => moveStepCard(index, cardIdx, 'up')}
                                          className="p-1 bg-slate-900 text-slate-300 hover:bg-slate-800 rounded transition"
                                          title="Move Step Up"
                                        >
                                          <MoveUp className="w-3 h-3" />
                                        </button>
                                      )}
                                      {cardIdx < cardsList.length - 1 && (
                                        <button
                                          type="button"
                                          onClick={() => moveStepCard(index, cardIdx, 'down')}
                                          className="p-1 bg-slate-900 text-slate-300 hover:bg-slate-800 rounded transition"
                                          title="Move Step Down"
                                        >
                                          <MoveDown className="w-3 h-3" />
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        onClick={() => removeStepCard(index, cardIdx)}
                                        className="p-1 text-red-400 hover:bg-red-500/20 rounded transition ml-1"
                                        title="Delete Step"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                                    <div className="sm:col-span-4">
                                      <input
                                        type="text"
                                        {...register(`sections.${index}.cardsList.${cardIdx}.title` as const)}
                                        placeholder="Step Title (e.g. 01. Discovery)"
                                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none font-semibold"
                                      />
                                    </div>
                                    <div className="sm:col-span-8">
                                      <input
                                        type="text"
                                        {...register(`sections.${index}.cardsList.${cardIdx}.desc` as const)}
                                        placeholder="Step Description details..."
                                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Dynamic Buttons Builder Sub-Section */}
                      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Action Buttons Manager</h5>
                            <p className="text-[10px] text-slate-400 mt-0.5">Add zero, one, or multiple buttons with custom styles.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => addButton(index)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Button
                          </button>
                        </div>

                        {buttonsList.length === 0 ? (
                          <div className="p-4 rounded-xl bg-slate-950 text-center border border-dashed border-slate-800 text-slate-500 text-xs">
                            No buttons added for this section.
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {buttonsList.map((btn, btnIdx) => (
                              <div key={btn.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                                <div className="sm:col-span-4">
                                  <input
                                    type="text"
                                    {...register(`sections.${index}.buttons.${btnIdx}.text` as const)}
                                    placeholder="Button Label"
                                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                  />
                                </div>
                                <div className="sm:col-span-5">
                                  <input
                                    type="text"
                                    {...register(`sections.${index}.buttons.${btnIdx}.url` as const)}
                                    placeholder="URL / Link path"
                                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <select
                                    {...register(`sections.${index}.buttons.${btnIdx}.variant` as const)}
                                    className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                  >
                                    <option value="primary">Primary</option>
                                    <option value="secondary">Secondary</option>
                                    <option value="outline">Outline</option>
                                    <option value="ghost">Ghost</option>
                                  </select>
                                </div>
                                <div className="sm:col-span-1 text-right">
                                  <button
                                    type="button"
                                    onClick={() => removeButton(index, btnIdx)}
                                    className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition"
                                    title="Remove Button"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* RENDERED SECTION DISPLAY WITH DIVERSE LAYOUTS */}
                  <div className={paddingClasses}>
                    {isCentered ? (
                      <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                          {sec.title || 'Untitled Section'}
                        </h2>
                        <p className="text-base sm:text-lg opacity-80 leading-relaxed">
                          {renderRichTextWithLinks(sec.subtitle)}
                        </p>

                        {/* Optional Bullet Points Display (Centered) */}
                        {bulletPoints.length > 0 && (
                          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
                            {bulletPoints.map((bullet, bIdx) => (
                              <div key={bIdx} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> {bullet}
                              </div>
                            ))}
                          </div>
                        )}

                        {sec.imageUrl && (
                          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 my-6 aspect-video">
                            <img src={sec.imageUrl} alt={sec.title || 'Visual'} className="w-full h-full object-cover" />
                          </div>
                        )}

                        {buttonsList.length > 0 && (
                          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            {buttonsList.map((btn) => (
                              <a
                                key={btn.id}
                                href={btn.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all ${renderButtonStyle(btn.variant)}`}
                              >
                                {btn.text} <ExternalLink className="w-4 h-4" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : isGridCards ? (
                      <div className="space-y-10 max-w-5xl mx-auto">
                        <div className="text-center space-y-4 max-w-2xl mx-auto">
                          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            {sec.title || 'Service Features'}
                          </h2>
                          <p className="text-sm sm:text-base opacity-80 leading-relaxed">
                            {renderRichTextWithLinks(sec.subtitle)}
                          </p>

                          {/* Optional Bullet Points Display */}
                          {bulletPoints.length > 0 && (
                            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                              {bulletPoints.map((bullet, bIdx) => (
                                <div key={bIdx} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> {bullet}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {cardsList.map((card, cIdx) => (
                            <div key={cIdx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3 hover:border-indigo-500/50 transition">
                              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
                                {cIdx + 1}
                              </div>
                              <h3 className="text-base font-bold text-white">{card.title}</h3>
                              <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                            </div>
                          ))}
                        </div>

                        {buttonsList.length > 0 && (
                          <div className="flex justify-center pt-2">
                            {buttonsList.map((btn) => (
                              <a
                                key={btn.id}
                                href={btn.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${renderButtonStyle(btn.variant)}`}
                              >
                                {btn.text} <ArrowRight className="w-4 h-4" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : isWorkflowSteps ? (
                      <div className="space-y-10 max-w-5xl mx-auto">
                        <div className="text-center space-y-4 max-w-2xl mx-auto">
                          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            {sec.title || 'Workflow Timeline'}
                          </h2>
                          <p className="text-sm sm:text-base opacity-80 leading-relaxed">
                            {renderRichTextWithLinks(sec.subtitle)}
                          </p>

                          {/* Optional Bullet Points Display */}
                          {bulletPoints.length > 0 && (
                            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                              {bulletPoints.map((bullet, bIdx) => (
                                <div key={bIdx} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> {bullet}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {cardsList.map((card, cIdx) => (
                            <div key={cIdx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-extrabold text-xs">
                                {cIdx + 1}
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-sm font-bold text-white">{card.title}</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {buttonsList.length > 0 && (
                          <div className="flex justify-center pt-2">
                            {buttonsList.map((btn) => (
                              <a
                                key={btn.id}
                                href={btn.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${renderButtonStyle(btn.variant)}`}
                              >
                                {btn.text} <ExternalLink className="w-4 h-4" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : isMinimal ? (
                      <div className="max-w-4xl space-y-4">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                          {sec.title || 'Untitled Section'}
                        </h2>
                        <p className="text-sm sm:text-base opacity-75 leading-relaxed">
                          {renderRichTextWithLinks(sec.subtitle)}
                        </p>

                        {/* Optional Bullet Points Display (Minimal) */}
                        {bulletPoints.length > 0 && (
                          <ul className="space-y-2 pt-1">
                            {bulletPoints.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-center gap-2 text-xs font-medium opacity-90">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> {bullet}
                              </li>
                            ))}
                          </ul>
                        )}

                        {buttonsList.length > 0 && (
                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            {buttonsList.map((btn) => (
                              <a
                                key={btn.id}
                                href={btn.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${renderButtonStyle(btn.variant)}`}
                              >
                                {btn.text} <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isLeftLayout ? 'lg:grid-flow-dense' : ''}`}>
                        <div className={`space-y-4 ${sec.imageUrl ? 'lg:col-span-7' : 'lg:col-span-12 max-w-3xl'} ${isLeftLayout ? 'lg:col-start-6' : ''}`}>
                          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-snug">
                            {sec.title || 'Untitled Section'}
                          </h2>
                          <p className="text-base sm:text-lg opacity-80 leading-relaxed">
                            {renderRichTextWithLinks(sec.subtitle)}
                          </p>

                          {/* Optional Bullet Points List Display */}
                          {bulletPoints.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                              {bulletPoints.map((bullet, bIdx) => (
                                <div key={bIdx} className="flex items-center gap-2 text-xs font-semibold bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                                  <span>{bullet}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {buttonsList.length > 0 && (
                            <div className="flex flex-wrap items-center gap-3 pt-3">
                              {buttonsList.map((btn) => (
                                <a
                                  key={btn.id}
                                  href={btn.url || '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${renderButtonStyle(btn.variant)}`}
                                >
                                  {btn.text} <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>

                        {sec.imageUrl && (
                          <div className={`lg:col-span-5 ${isLeftLayout ? 'lg:col-start-1' : ''}`}>
                            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 aspect-video relative">
                              <img src={sec.imageUrl} alt={sec.title || 'Section Visual'} className="w-full h-full object-cover" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 4 SAMPLE TEMPLATES SELECTION POPUP MODAL */}
        {selectedTypeForStyles && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
                    <Grid className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Select a Service Template Layout</h3>
                    <p className="text-xs text-slate-400">Choose from tailored layouts for <span className="text-indigo-400 font-semibold">{selectedTypeForStyles.name}</span></p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTypeForStyles(null)}
                  className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* TEMPLATES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getFourSampleOptions(selectedTypeForStyles.id, selectedTypeForStyles.name).map((sample, idx) => {
                  const isSelected = selectedSampleIndex === idx;

                  return (
                    <div
                      key={sample.id}
                      onClick={() => setSelectedSampleIndex(idx)}
                      className={`cursor-pointer rounded-2xl border p-5 transition-all relative overflow-hidden flex flex-col justify-between ${
                        isSelected 
                          ? 'border-indigo-500 bg-indigo-600/10 ring-2 ring-indigo-500 shadow-xl shadow-indigo-600/20' 
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/30">
                          Layout Option #{idx + 1} ({sample.layoutStyle})
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${isSelected ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 bg-slate-900'}`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>

                      {/* Mini Preview Box */}
                      <div className={`rounded-xl border p-4 shadow-inner space-y-3 ${getThemeClass(sample.bgTheme)}`}>
                        {sample.layoutStyle === 'grid-cards' || sample.layoutStyle === 'workflow-steps' ? (
                          <div className="space-y-2">
                            <h5 className="text-xs font-bold">{sample.title}</h5>
                            <div className="grid grid-cols-3 gap-1.5">
                              <div className="h-10 bg-slate-800 rounded border border-white/5"></div>
                              <div className="h-10 bg-slate-800 rounded border border-white/5"></div>
                              <div className="h-10 bg-slate-800 rounded border border-white/5"></div>
                            </div>
                          </div>
                        ) : sample.layoutStyle === 'centered' ? (
                          <div className="text-center space-y-2">
                            <h5 className="text-sm font-extrabold line-clamp-1">{sample.title}</h5>
                            <p className="text-[10px] opacity-75 line-clamp-2">{sample.subtitle}</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-3 items-center">
                            <div className="space-y-1">
                              <h5 className="text-xs font-bold line-clamp-1">{sample.title}</h5>
                              <p className="text-[10px] opacity-75 line-clamp-2">{sample.subtitle}</p>
                            </div>
                            <div className="bg-slate-900 rounded-lg h-14 border border-white/10 flex items-center justify-center text-[9px] text-slate-500">
                              Preview
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedTypeForStyles(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAddSampleTemplate}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Confirm & Add to Canvas
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </FormProvider>
  );
}































// 'use client';

// import React, { useState } from 'react';
// import { useForm, FormProvider } from 'react-hook-form';
// import { 
//   Layout, 
//   Layers, 
//   Plus, 
//   Trash2, 
//   MoveUp, 
//   MoveDown, 
//   Sparkles, 
//   HelpCircle, 
//   MessageSquare, 
//   FileText, 
//   X,
//   Check,
//   ExternalLink,
//   Sliders,
//   ChevronDown,
//   Grid,
//   CheckCircle2,
//   Edit3,
//   ListPlus,
//   ArrowRight,
//   Cpu
// } from 'lucide-react';

// const AVAILABLE_SECTION_TYPES = [
//   { id: 'hero', name: 'Hero Banner', description: 'Immersive landing header with badges and action CTAs.', icon: Sparkles },
//   { id: 'features', name: 'Features / Tech Stack', description: 'Grid-based service cards with icons and highlights.', icon: Layers },
//   { id: 'process', name: 'Step-by-Step Process', description: 'Numbered workflow timeline showing development lifecycle with step editor.', icon: Cpu },
//   { id: 'content', name: 'Editorial / Article Block', description: 'Clean multi-column technical overview with rich typography.', icon: FileText },
//   { id: 'faq', name: 'FAQ Accordion', description: 'Expandable question list for common client inquiries.', icon: HelpCircle },
//   { id: 'cta', name: 'Conversion Banner', description: 'High-contrast closing call to action for inquiries.', icon: MessageSquare },
// ];

// interface PageButton {
//   id: string;
//   text: string;
//   url: string;
//   variant: 'primary' | 'secondary' | 'outline' | 'ghost';
// }

// interface StepCardItem {
//   title: string;
//   desc: string;
//   iconName: string;
// }

// interface PageSectionItem {
//   id: string;
//   type: string;
//   title: string;
//   subtitle: string;
//   bgTheme: 'dark' | 'light' | 'indigo' | 'slate';
//   layoutStyle: 'split-right' | 'split-left' | 'centered' | 'minimal' | 'grid-cards' | 'workflow-steps';
//   paddingSize: 'sm' | 'md' | 'lg' | 'xl';
//   imageUrl: string;
//   buttons: PageButton[];
//   cardsList?: StepCardItem[];
//   bulletPoints?: string[];
// }

// interface PageBuilderValues {
//   pageTitle: string;
//   slug: string;
//   sections: PageSectionItem[];
// }

// // ==========================================
// // INDIVIDUAL SECTION COMPONENT FUNCTIONS
// // ==========================================

// interface RenderSectionViewProps {
//   sec: PageSectionItem;
//   index: number;
//   isEditing: boolean;
//   setEditingIndex: (val: number | null) => void;
//   moveSection: (index: number, direction: 'up' | 'down') => void;
//   removeSection: (index: number) => void;
//   sectionsLength: number;
// }

// export function HeroSectionView({ sec, index, isEditing, setEditingIndex, moveSection, removeSection, sectionsLength }: RenderSectionViewProps) {
//   return renderSectionCommon(sec, index, isEditing, setEditingIndex, moveSection, removeSection, sectionsLength);
// }

// export function FeaturesSectionView({ sec, index, isEditing, setEditingIndex, moveSection, removeSection, sectionsLength }: RenderSectionViewProps) {
//   return renderSectionCommon(sec, index, isEditing, setEditingIndex, moveSection, removeSection, sectionsLength);
// }

// export function ProcessSectionView({ sec, index, isEditing, setEditingIndex, moveSection, removeSection, sectionsLength }: RenderSectionViewProps) {
//   return renderSectionCommon(sec, index, isEditing, setEditingIndex, moveSection, removeSection, sectionsLength);
// }

// export function ContentSectionView({ sec, index, isEditing, setEditingIndex, moveSection, removeSection, sectionsLength }: RenderSectionViewProps) {
//   return renderSectionCommon(sec, index, isEditing, setEditingIndex, moveSection, removeSection, sectionsLength);
// }

// export function FaqSectionView({ sec, index, isEditing, setEditingIndex, moveSection, removeSection, sectionsLength }: RenderSectionViewProps) {
//   return renderSectionCommon(sec, index, isEditing, setEditingIndex, moveSection, removeSection, sectionsLength);
// }

// export function CtaSectionView({ sec, index, isEditing, setEditingIndex, moveSection, removeSection, sectionsLength }: RenderSectionViewProps) {
//   return renderSectionCommon(sec, index, isEditing, setEditingIndex, moveSection, removeSection, sectionsLength);
// }

// // Helper utility for rendering rich text with custom markdown-style links
// function renderRichTextWithLinks(text: string) {
//   if (!text) return null;
//   const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
//   const parts = [];
//   let lastIndex = 0;
//   let match;

//   while ((match = linkRegex.exec(text)) !== null) {
//     if (match.index > lastIndex) {
//       parts.push(text.substring(lastIndex, match.index));
//     }
//     parts.push(
//       <a
//         key={`${match.index}-${match[2]}`}
//         href={match[2]}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-semibold inline-flex items-center gap-1 transition-colors"
//       >
//         {match[1]} <ExternalLink className="w-3 h-3 inline" />
//       </a>
//     );
//     lastIndex = linkRegex.lastIndex;
//   }
//   if (lastIndex < text.length) {
//     parts.push(text.substring(lastIndex));
//   }
//   return parts.length > 0 ? parts : text;
// }

// function renderButtonStyle(variant: string) {
//   switch (variant) {
//     case 'secondary':
//       return 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 shadow-md';
//     case 'outline':
//       return 'bg-transparent hover:bg-indigo-600/10 text-indigo-400 border border-indigo-500/40 shadow-sm';
//     case 'ghost':
//       return 'bg-transparent hover:bg-white/5 text-slate-300 shadow-none';
//     case 'primary':
//     default:
//       return 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30';
//   }
// }

// function getPaddingClass(size?: string) {
//   switch (size) {
//     case 'sm': return 'p-4 sm:p-6';
//     case 'md': return 'p-6 sm:p-10';
//     case 'xl': return 'p-10 sm:p-20';
//     case 'lg':
//     default: return 'p-8 sm:p-14';
//   }
// }

// function getThemeClass(theme: string) {
//   switch (theme) {
//     case 'indigo': return 'bg-indigo-950/80 border-indigo-500/40 text-white';
//     case 'light': return 'bg-slate-100 border-slate-300 text-slate-900';
//     case 'slate': return 'bg-slate-900 border-slate-800 text-slate-100';
//     case 'dark':
//     default: return 'bg-slate-950 border-slate-800 text-white';
//   }
// }

// // Master Common Layout Renderer used by component functions
// function renderSectionCommon(
//   sec: PageSectionItem,
//   index: number,
//   isEditing: boolean,
//   setEditingIndex: (val: number | null) => void,
//   moveSection: (index: number, direction: 'up' | 'down') => void,
//   removeSection: (index: number) => void,
//   sectionsLength: number
// ) {
//   const paddingClasses = getPaddingClass(sec.paddingSize);
//   const isLeftLayout = sec.layoutStyle === 'split-left';
//   const isCentered = sec.layoutStyle === 'centered';
//   const isMinimal = sec.layoutStyle === 'minimal';
//   const isGridCards = sec.layoutStyle === 'grid-cards';
//   const isWorkflowSteps = sec.layoutStyle === 'workflow-steps';
//   const buttonsList = sec.buttons || [];
//   const cardsList = sec.cardsList || [];
//   const bulletPoints = sec.bulletPoints || [];

//   return (
//     <div
//       key={sec.id}
//       className={`group relative rounded-3xl border transition-all shadow-xl overflow-hidden ${getThemeClass(sec.bgTheme)}`}
//     >
//       {/* FLOATING HOVER TOOLBAR */}
//       <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 bg-slate-950/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 shadow-2xl">
//         <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 mr-2">
//           #{index + 1} {sec.type} ({sec.layoutStyle})
//         </span>

//         <button
//           type="button"
//           onClick={() => setEditingIndex(isEditing ? null : index)}
//           className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
//             isEditing ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
//           }`}
//           title="Edit Section Styles & Content"
//         >
//           <Sliders className="w-3.5 h-3.5" /> {isEditing ? 'Close' : 'Style & Edit'}
//         </button>

//         {index > 0 && (
//           <button
//             type="button"
//             onClick={() => moveSection(index, 'up')}
//             className="p-1.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg transition"
//             title="Move Up"
//           >
//             <MoveUp className="w-3.5 h-3.5" />
//           </button>
//         )}
//         {index < sectionsLength - 1 && (
//           <button
//             type="button"
//             onClick={() => moveSection(index, 'down')}
//             className="p-1.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg transition"
//             title="Move Down"
//           >
//             <MoveDown className="w-3.5 h-3.5" />
//           </button>
//         )}
//         <button
//           type="button"
//           onClick={() => removeSection(index)}
//           className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition ml-0.5"
//           title="Delete Section"
//         >
//           <Trash2 className="w-3.5 h-3.5" />
//         </button>
//       </div>

//       <div className={paddingClasses}>
//         {isCentered ? (
//           <div className="max-w-3xl mx-auto text-center space-y-6">
//             <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
//               {sec.title || 'Untitled Section'}
//             </h2>
//             <p className="text-base sm:text-lg opacity-80 leading-relaxed">
//               {renderRichTextWithLinks(sec.subtitle)}
//             </p>

//             {bulletPoints.length > 0 && (
//               <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
//                 {bulletPoints.map((bullet, bIdx) => (
//                   <div key={bIdx} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
//                     <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> {bullet}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {sec.imageUrl && (
//               <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 my-6 aspect-video">
//                 <img src={sec.imageUrl} alt={sec.title || 'Visual'} className="w-full h-full object-cover" />
//               </div>
//             )}

//             {buttonsList.length > 0 && (
//               <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
//                 {buttonsList.map((btn) => (
//                   <a
//                     key={btn.id}
//                     href={btn.url || '#'}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all ${renderButtonStyle(btn.variant)}`}
//                   >
//                     {btn.text} <ExternalLink className="w-4 h-4" />
//                   </a>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : isGridCards ? (
//           <div className="space-y-10 max-w-5xl mx-auto">
//             <div className="text-center space-y-4 max-w-2xl mx-auto">
//               <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
//                 {sec.title || 'Service Features'}
//               </h2>
//               <p className="text-sm sm:text-base opacity-80 leading-relaxed">
//                 {renderRichTextWithLinks(sec.subtitle)}
//               </p>

//               {bulletPoints.length > 0 && (
//                 <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
//                   {bulletPoints.map((bullet, bIdx) => (
//                     <div key={bIdx} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
//                       <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> {bullet}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {cardsList.map((card, cIdx) => (
//                 <div key={cIdx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-3 hover:border-indigo-500/50 transition">
//                   <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
//                     {cIdx + 1}
//                   </div>
//                   <h3 className="text-base font-bold text-white">{card.title}</h3>
//                   <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
//                 </div>
//               ))}
//             </div>

//             {buttonsList.length > 0 && (
//               <div className="flex justify-center pt-2">
//                 {buttonsList.map((btn) => (
//                   <a
//                     key={btn.id}
//                     href={btn.url || '#'}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${renderButtonStyle(btn.variant)}`}
//                   >
//                     {btn.text} <ArrowRight className="w-4 h-4" />
//                   </a>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : isWorkflowSteps ? (
//           <div className="space-y-10 max-w-5xl mx-auto">
//             <div className="text-center space-y-4 max-w-2xl mx-auto">
//               <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
//                 {sec.title || 'Workflow Timeline'}
//               </h2>
//               <p className="text-sm sm:text-base opacity-80 leading-relaxed">
//                 {renderRichTextWithLinks(sec.subtitle)}
//               </p>

//               {bulletPoints.length > 0 && (
//                 <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
//                   {bulletPoints.map((bullet, bIdx) => (
//                     <div key={bIdx} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
//                       <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> {bullet}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {cardsList.map((card, cIdx) => (
//                 <div key={cIdx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
//                   <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-extrabold text-xs">
//                     {cIdx + 1}
//                   </div>
//                   <div className="space-y-1">
//                     <h4 className="text-sm font-bold text-white">{card.title}</h4>
//                     <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {buttonsList.length > 0 && (
//               <div className="flex justify-center pt-2">
//                 {buttonsList.map((btn) => (
//                   <a
//                     key={btn.id}
//                     href={btn.url || '#'}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${renderButtonStyle(btn.variant)}`}
//                   >
//                     {btn.text} <ExternalLink className="w-4 h-4" />
//                   </a>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : isMinimal ? (
//           <div className="max-w-4xl space-y-4">
//             <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
//               {sec.title || 'Untitled Section'}
//             </h2>
//             <p className="text-sm sm:text-base opacity-75 leading-relaxed">
//               {renderRichTextWithLinks(sec.subtitle)}
//             </p>

//             {bulletPoints.length > 0 && (
//               <ul className="space-y-2 pt-1">
//                 {bulletPoints.map((bullet, bIdx) => (
//                   <li key={bIdx} className="flex items-center gap-2 text-xs font-medium opacity-90">
//                     <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> {bullet}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {buttonsList.length > 0 && (
//               <div className="flex flex-wrap items-center gap-3 pt-2">
//                 {buttonsList.map((btn) => (
//                   <a
//                     key={btn.id}
//                     href={btn.url || '#'}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${renderButtonStyle(btn.variant)}`}
//                   >
//                     {btn.text} <ExternalLink className="w-3.5 h-3.5" />
//                   </a>
//                 ))}
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isLeftLayout ? 'lg:grid-flow-dense' : ''}`}>
//             <div className={`space-y-4 ${sec.imageUrl ? 'lg:col-span-7' : 'lg:col-span-12 max-w-3xl'} ${isLeftLayout ? 'lg:col-start-6' : ''}`}>
//               <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-snug">
//                 {sec.title || 'Untitled Section'}
//               </h2>
//               <p className="text-base sm:text-lg opacity-80 leading-relaxed">
//                 {renderRichTextWithLinks(sec.subtitle)}
//               </p>

//               {bulletPoints.length > 0 && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
//                   {bulletPoints.map((bullet, bIdx) => (
//                     <div key={bIdx} className="flex items-center gap-2 text-xs font-semibold bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
//                       <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
//                       <span>{bullet}</span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {buttonsList.length > 0 && (
//                 <div className="flex flex-wrap items-center gap-3 pt-3">
//                   {buttonsList.map((btn) => (
//                     <a
//                       key={btn.id}
//                       href={btn.url || '#'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${renderButtonStyle(btn.variant)}`}
//                     >
//                       {btn.text} <ExternalLink className="w-3.5 h-3.5" />
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {sec.imageUrl && (
//               <div className={`lg:col-span-5 ${isLeftLayout ? 'lg:col-start-1' : ''}`}>
//                 <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950 aspect-video relative">
//                   <img src={sec.imageUrl} alt={sec.title || 'Section Visual'} className="w-full h-full object-cover" />
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ==========================================
// // MAIN COMPONENT & STATE EDITOR
// // ==========================================

// export default function DiverseLayoutsPageBuilder() {
//   const methods = useForm<PageBuilderValues>({
//     defaultValues: {
//       pageTitle: 'React.js Development Services',
//       slug: 'reactjs-development-services',
//       sections: [], 
//     },
//   });

//   const { register, watch, setValue } = methods;
//   const sections = watch('sections') || [];

//   const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
//   const [selectedTypeForStyles, setSelectedTypeForStyles] = useState<{ id: string; name: string } | null>(null);
//   const [selectedSampleIndex, setSelectedSampleIndex] = useState<number>(0);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   const getFourSampleOptions = (typeId: string, typeName: string) => {
//     switch (typeId) {
//       case 'features':
//         return [
//           {
//             id: 0,
//             title: `Enterprise ${typeName} Grid`,
//             subtitle: `Scalable component architecture designed for high-performance enterprise applications.`,
//             bgTheme: 'dark' as const,
//             layoutStyle: 'grid-cards' as const,
//             paddingSize: 'lg' as const,
//             imageUrl: '',
//             buttons: [{ id: 'b1', text: 'Explore Architecture', url: '#', variant: 'primary' as const }],
//             cardsList: [
//               { title: 'Component Reusability', desc: 'Modular design systems built with strict atomic principles.', iconName: 'Zap' },
//               { title: 'State Optimization', desc: 'Blazing fast state handling using modern React hooks & context.', iconName: 'Cpu' },
//               { title: 'SSR & SSG Performance', desc: 'Optimized server-side rendering for elite Core Web Vitals.', iconName: 'ShieldCheck' }
//             ],
//             bulletPoints: ['Zero layout shifts', 'Atomic design patterns', 'Optimized bundle sizes']
//           },
//           {
//             id: 1,
//             title: `Modern Split ${typeName}`,
//             subtitle: `Detailed technical capabilities with visual preview and secondary action flow. [View Portfolio](https://prawez.com)`,
//             bgTheme: 'indigo' as const,
//             layoutStyle: 'split-right' as const,
//             paddingSize: 'xl' as const,
//             imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
//             buttons: [{ id: 'b2', text: 'Hire Developer', url: '#', variant: 'primary' as const }]
//           },
//           {
//             id: 2,
//             title: `Clean Minimal ${typeName}`,
//             subtitle: `Streamlined presentation for client-facing software deliverables and modules.`,
//             bgTheme: 'light' as const,
//             layoutStyle: 'split-left' as const,
//             paddingSize: 'md' as const,
//             imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
//             buttons: [{ id: 'b3', text: 'Learn More', url: '#', variant: 'outline' as const }]
//           },
//           {
//             id: 3,
//             title: `Centered Focus ${typeName}`,
//             subtitle: `High-impact centered layout emphasizing core delivery milestones.`,
//             bgTheme: 'slate' as const,
//             layoutStyle: 'centered' as const,
//             paddingSize: 'lg' as const,
//             imageUrl: '',
//             buttons: [{ id: 'b4', text: 'Get Quote', url: '#', variant: 'primary' as const }]
//           }
//         ];

//       case 'process':
//         return [
//           {
//             id: 0,
//             title: `Step-by-Step Delivery Workflow`,
//             subtitle: `Our structured 4-phase agile engineering methodology from discovery to production deployment.`,
//             bgTheme: 'dark' as const,
//             layoutStyle: 'workflow-steps' as const,
//             paddingSize: 'lg' as const,
//             imageUrl: '',
//             buttons: [{ id: 'p1', text: 'Start Project', url: '#', variant: 'primary' as const }],
//             cardsList: [
//               { title: '01. Discovery & Architecture', desc: 'Requirement mapping, tech stack selection (Next.js/FastAPI), and wireframing.', iconName: 'CheckCircle2' },
//               { title: '02. UI/UX Implementation', desc: 'Tailwind CSS responsive styling with pixel-perfect design accuracy.', iconName: 'CheckCircle2' },
//               { title: '03. Integration & Testing', desc: 'API integration, performance audits, and 100/100 Lighthouse checks.', iconName: 'CheckCircle2' },
//               { title: '04. Deployment & Support', desc: 'Production server configuration, Kali Linux hardening, and ongoing maintenance.', iconName: 'CheckCircle2' }
//             ]
//           },
//           {
//             id: 1,
//             title: `Agile Workflow Overview`,
//             subtitle: `Streamlined operational milestones to ensure fast turnaround times.`,
//             bgTheme: 'indigo' as const,
//             layoutStyle: 'centered' as const,
//             paddingSize: 'xl' as const,
//             imageUrl: '',
//             buttons: [{ id: 'p2', text: 'View Timeline', url: '#', variant: 'primary' as const }]
//           }
//         ];

//       case 'hero':
//         return [
//           {
//             id: 0,
//             title: `High-Impact ${typeName}`,
//             subtitle: `Elite software development services engineered for peak performance and conversion. [Explore Services](https://prawez.com)`,
//             bgTheme: 'dark' as const,
//             layoutStyle: 'split-right' as const,
//             paddingSize: 'xl' as const,
//             imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
//             buttons: [
//               { id: 'h1-b1', text: 'Book Consultation', url: '#', variant: 'primary' as const },
//               { id: 'h1-b2', text: 'View Portfolio', url: '#', variant: 'secondary' as const }
//             ],
//             bulletPoints: ['Lighthouse 100/100 Optimized', 'FastAPI & Next.js Stack', 'Production Ready in 4 Weeks']
//           },
//           {
//             id: 1,
//             title: `Immersive Center ${typeName}`,
//             subtitle: `Scale your technical capabilities with robust Next.js and FastAPI infrastructure.`,
//             bgTheme: 'indigo' as const,
//             layoutStyle: 'centered' as const,
//             paddingSize: 'xl' as const,
//             imageUrl: '',
//             buttons: [{ id: 'h2-b1', text: 'Get Started Today', url: '#', variant: 'primary' as const }]
//           }
//         ];

//       case 'content':
//         return [
//           {
//             id: 0,
//             title: `Editorial Technical Overview`,
//             subtitle: `Deep dive into modern web patterns, SEO structuring, and domain authority acceleration. [Read Blog](https://prawez.com)`,
//             bgTheme: 'dark' as const,
//             layoutStyle: 'split-left' as const,
//             paddingSize: 'lg' as const,
//             imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
//             buttons: [{ id: 'c1-b1', text: 'Read Full Article', url: '#', variant: 'primary' as const }]
//           }
//         ];

//       case 'faq':
//         return [
//           {
//             id: 0,
//             title: `Frequently Asked Questions`,
//             subtitle: `Got questions about our development process, timelines, or tech stack? Find answers below.`,
//             bgTheme: 'dark' as const,
//             layoutStyle: 'centered' as const,
//             paddingSize: 'lg' as const,
//             imageUrl: '',
//             buttons: [{ id: 'f1-b1', text: 'Ask Custom Question', url: '#', variant: 'primary' as const }],
//             cardsList: [
//               { title: 'What is your typical project timeline?', desc: 'Most MVP web applications are delivered within 4 to 6 weeks depending on scope complexity.', iconName: 'HelpCircle' },
//               { title: 'Do you provide ongoing maintenance?', desc: 'Yes, we offer comprehensive post-launch support, security patches, and performance monitoring.', iconName: 'HelpCircle' }
//             ]
//           }
//         ];

//       case 'cta':
//         return [
//           {
//             id: 0,
//             title: `Ready to Build Your Next Project?`,
//             subtitle: `Let's collaborate to bring your vision to life with lightning-fast performance and clean architecture. [Get in Touch](https://prawez.com)`,
//             bgTheme: 'indigo' as const,
//             layoutStyle: 'centered' as const,
//             paddingSize: 'xl' as const,
//             imageUrl: '',
//             buttons: [
//               { id: 'cta1-b1', text: 'Schedule Call', url: '#', variant: 'primary' as const },
//               { id: 'cta1-b2', text: 'Send Message', url: '#', variant: 'secondary' as const }
//             ]
//           }
//         ];

//       default:
//         return [
//           {
//             id: 0,
//             title: `Modern ${typeName}`,
//             subtitle: `High-impact layout with split alignment and dark slate aesthetics.`,
//             bgTheme: 'dark' as const,
//             layoutStyle: 'split-right' as const,
//             paddingSize: 'lg' as const,
//             imageUrl: '',
//             buttons: [{ id: 's1-b1', text: 'Get Started', url: '#', variant: 'primary' as const }]
//           }
//         ];
//     }
//   };

//   const handleSelectSectionType = (typeId: string) => {
//     const template = AVAILABLE_SECTION_TYPES.find((t) => t.id === typeId);
//     if (!template) return;

//     setSelectedTypeForStyles({ id: template.id, name: template.name });
//     setSelectedSampleIndex(0);
//     setIsAddDropdownOpen(false);
//   };

//   const handleConfirmAddSampleTemplate = () => {
//     if (!selectedTypeForStyles) return;

//     const samples = getFourSampleOptions(selectedTypeForStyles.id, selectedTypeForStyles.name);
//     const chosen = samples[selectedSampleIndex] || samples[0];

//     const newSection: PageSectionItem = {
//       id: `sec-${Date.now()}`,
//       type: selectedTypeForStyles.id,
//       title: chosen.title,
//       subtitle: chosen.subtitle,
//       bgTheme: chosen.bgTheme,
//       layoutStyle: chosen.layoutStyle,
//       paddingSize: chosen.paddingSize,
//       imageUrl: chosen.imageUrl,
//       buttons: chosen.buttons.map(b => ({ ...b, id: `btn-${Date.now()}-${Math.random()}` })),
//       cardsList: chosen.cardsList ? chosen.cardsList.map(c => ({ ...c })) : [],
//       bulletPoints: chosen.bulletPoints ? [...chosen.bulletPoints] : []
//     };

//     setValue('sections', [...sections, newSection], { shouldDirty: true });
//     setSelectedTypeForStyles(null);
//     setEditingIndex(sections.length);
//   };

//   const addButton = (sectionIndex: number) => {
//     const currentButtons = sections[sectionIndex]?.buttons || [];
//     const newBtn: PageButton = {
//       id: `btn-${Date.now()}`,
//       text: 'New Button',
//       url: '#',
//       variant: currentButtons.length === 0 ? 'primary' : 'secondary',
//     };
//     setValue(`sections.${sectionIndex}.buttons`, [...currentButtons, newBtn], { shouldDirty: true });
//   };

//   const removeButton = (sectionIndex: number, btnIndex: number) => {
//     const currentButtons = sections[sectionIndex]?.buttons || [];
//     const updatedButtons = currentButtons.filter((_, i) => i !== btnIndex);
//     setValue(`sections.${sectionIndex}.buttons`, updatedButtons, { shouldDirty: true });
//   };

//   const addStepCard = (sectionIndex: number) => {
//     const currentCards = sections[sectionIndex]?.cardsList || [];
//     const stepNum = String(currentCards.length + 1).padStart(2, '0');
//     const newCard: StepCardItem = {
//       title: `${stepNum}. New Step Title`,
//       desc: 'Describe the milestone or technical task details here...',
//       iconName: 'CheckCircle2'
//     };
//     setValue(`sections.${sectionIndex}.cardsList`, [...currentCards, newCard], { shouldDirty: true });
//   };

//   const removeStepCard = (sectionIndex: number, cardIndex: number) => {
//     const currentCards = sections[sectionIndex]?.cardsList || [];
//     const updatedCards = currentCards.filter((_, i) => i !== cardIndex);
//     setValue(`sections.${sectionIndex}.cardsList`, updatedCards, { shouldDirty: true });
//   };

//   const moveStepCard = (sectionIndex: number, cardIndex: number, direction: 'up' | 'down') => {
//     const currentCards = sections[sectionIndex]?.cardsList || [];
//     const targetIndex = direction === 'up' ? cardIndex - 1 : cardIndex + 1;
//     if (targetIndex < 0 || targetIndex >= currentCards.length) return;

//     const updated = [...currentCards];
//     const temp = updated[cardIndex];
//     updated[cardIndex] = updated[targetIndex];
//     updated[targetIndex] = temp;

//     setValue(`sections.${sectionIndex}.cardsList`, updated, { shouldDirty: true });
//   };

//   const addBulletPoint = (sectionIndex: number) => {
//     const currentBullets = sections[sectionIndex]?.bulletPoints || [];
//     const updated = [...currentBullets, 'New optional highlight bullet point...'];
//     setValue(`sections.${sectionIndex}.bulletPoints`, updated, { shouldDirty: true });
//   };

//   const removeBulletPoint = (sectionIndex: number, bulletIndex: number) => {
//     const currentBullets = sections[sectionIndex]?.bulletPoints || [];
//     const updated = currentBullets.filter((_, i) => i !== bulletIndex);
//     setValue(`sections.${sectionIndex}.bulletPoints`, updated, { shouldDirty: true });
//   };

//   const removeSection = (index: number) => {
//     const updated = sections.filter((_, i) => i !== index);
//     setValue('sections', updated, { shouldDirty: true });
//     if (editingIndex === index) setEditingIndex(null);
//     else if (editingIndex !== null && editingIndex > index) setEditingIndex(editingIndex - 1);
//   };

//   const moveSection = (index: number, direction: 'up' | 'down') => {
//     const targetIndex = direction === 'up' ? index - 1 : index + 1;
//     if (targetIndex < 0 || targetIndex >= sections.length) return;

//     const updated = [...sections];
//     const temp = updated[index];
//     updated[index] = updated[targetIndex];
//     updated[targetIndex] = temp;

//     setValue('sections', updated, { shouldDirty: true });
//     if (editingIndex === index) setEditingIndex(targetIndex);
//     else if (editingIndex === targetIndex) setEditingIndex(index);
//   };

//   // Mapper function directing to individual section component views
//   const renderSectionComponentView = (sec: PageSectionItem, index: number, isEditing: boolean) => {
//     const componentProps = {
//       sec,
//       index,
//       isEditing,
//       setEditingIndex,
//       moveSection,
//       removeSection,
//       sectionsLength: sections.length
//     };

//     switch (sec.type) {
//       case 'hero':
//         return <HeroSectionView {...componentProps} />;
//       case 'features':
//         return <FeaturesSectionView {...componentProps} />;
//       case 'process':
//         return <ProcessSectionView {...componentProps} />;
//       case 'content':
//         return <ContentSectionView {...componentProps} />;
//       case 'faq':
//         return <FaqSectionView {...componentProps} />;
//       case 'cta':
//         return <CtaSectionView {...componentProps} />;
//       default:
//         return <HeroSectionView {...componentProps} />;
//     }
//   };

//   return (
//     <FormProvider {...methods}>
//       <div className="max-w-6xl mx-auto p-4 sm:p-8 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-8 relative">
        
//         {/* Sticky Top Action Bar */}
//         <div className="sticky top-4 z-40 bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-4">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-1">
//               <Layout className="w-3 h-3" /> Service Page Builder
//             </div>
//             <h1 className="text-lg font-extrabold text-white">
//               Live Canvas ({sections.length} Sections Added)
//             </h1>
//           </div>

//           <div className="relative">
//             <button
//               type="button"
//               onClick={() => setIsAddDropdownOpen(!isAddDropdownOpen)}
//               className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
//             >
//               <Plus className="w-4 h-4" /> Add Section <ChevronDown className="w-3.5 h-3.5 ml-1" />
//             </button>

//             {isAddDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden py-1.5">
//                 <div className="px-3 py-2 border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                   Select Section Type
//                 </div>
//                 <div className="max-h-64 overflow-y-auto">
//                   {AVAILABLE_SECTION_TYPES.map((type) => {
//                     const Icon = type.icon;
//                     return (
//                       <button
//                         key={type.id}
//                         type="button"
//                         onClick={() => handleSelectSectionType(type.id)}
//                         className="w-full text-left px-3 py-2.5 hover:bg-indigo-600/20 hover:text-indigo-300 flex items-center gap-3 transition text-xs text-slate-200"
//                       >
//                         <div className="p-1.5 rounded-lg bg-slate-950 text-indigo-400">
//                           <Icon className="w-4 h-4" />
//                         </div>
//                         <div>
//                           <p className="font-bold">{type.name}</p>
//                           <p className="text-[10px] text-slate-400 truncate w-44">{type.description}</p>
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Full Page Flow Display Canvas */}
//         <div className="space-y-6">
//           {sections.length === 0 ? (
//             <div className="text-center py-24 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 space-y-4">
//               <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
//                 <Layout className="w-6 h-6" />
//               </div>
//               <div className="space-y-1">
//                 <h3 className="text-sm font-bold text-white">Your service canvas is completely empty</h3>
//                 <p className="text-xs text-slate-400 max-w-sm mx-auto">Click "Add Section" above to choose service blocks with unique multi-column layouts.</p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setIsAddDropdownOpen(true)}
//                 className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/20 inline-flex items-center gap-2"
//               >
//                 <Plus className="w-4 h-4" /> Add Your First Section
//               </button>
//             </div>
//           ) : (
//             sections.map((sec, index) => {
//               const isEditing = editingIndex === index;
//               const cardsList = sec.cardsList || [];
//               const bulletPoints = sec.bulletPoints || [];
//               const buttonsList = sec.buttons || [];
//               const isWorkflowSteps = sec.layoutStyle === 'workflow-steps';
//               const isGridCards = sec.layoutStyle === 'grid-cards';

//               return (
//                 <div key={sec.id} className="relative">
//                   {/* Inline Section Editor Drawer */}
//                   {isEditing && (
//                     <div className="mb-4 p-6 bg-slate-900 text-slate-100 rounded-3xl border border-indigo-500/40 shadow-2xl space-y-6 z-30">
//                       <div className="flex items-center justify-between">
//                         <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
//                           <Sliders className="w-3.5 h-3.5" /> Section #{index + 1} Configuration
//                         </h4>
//                         <button 
//                           type="button" 
//                           onClick={() => setEditingIndex(null)}
//                           className="text-slate-400 hover:text-white text-xs flex items-center gap-1 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800"
//                         >
//                           <Check className="w-3.5 h-3.5 text-emerald-400" /> Done
//                         </button>
//                       </div>

//                       {/* Style Options Grid */}
//                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
//                         <div>
//                           <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Color Theme</label>
//                           <select
//                             {...register(`sections.${index}.bgTheme` as const)}
//                             className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
//                           >
//                             <option value="dark">Dark Slate (#090d16)</option>
//                             <option value="indigo">Indigo Glow Accent</option>
//                             <option value="slate">Neutral Gray Slate</option>
//                             <option value="light">Clean Light Surface</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Layout Style</label>
//                           <select
//                             {...register(`sections.${index}.layoutStyle` as const)}
//                             className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
//                           >
//                             <option value="split-right">Split (Image Right)</option>
//                             <option value="split-left">Split (Image Left)</option>
//                             <option value="centered">Centered Content</option>
//                             <option value="grid-cards">Service Cards Grid</option>
//                             <option value="workflow-steps">Workflow Timeline Steps</option>
//                             <option value="minimal">Minimal Clean</option>
//                           </select>
//                         </div>
//                         <div>
//                           <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Section Spacing</label>
//                           <select
//                             {...register(`sections.${index}.paddingSize` as const)}
//                             className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
//                           >
//                             <option value="sm">Compact (Small)</option>
//                             <option value="md">Medium</option>
//                             <option value="lg">Large</option>
//                             <option value="xl">Extra Large (Hero)</option>
//                           </select>
//                         </div>
//                       </div>

//                       {/* Content Fields */}
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Section Title</label>
//                           <input
//                             type="text"
//                             {...register(`sections.${index}.title` as const)}
//                             className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1 flex items-center justify-between">
//                             <span>Subtitle / Rich Text with Links</span>
//                             <span className="text-[9px] text-indigo-400 font-normal">Format: [Link Text](https://url)</span>
//                           </label>
//                           <textarea
//                             rows={2}
//                             {...register(`sections.${index}.subtitle` as const)}
//                             className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
//                           />
//                         </div>
//                       </div>

//                       {/* Bullet Points Manager */}
//                       <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
//                               <ListPlus className="w-3.5 h-3.5 text-indigo-400" /> Optional Bullet Points ({bulletPoints.length})
//                             </h5>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => addBulletPoint(index)}
//                             className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md"
//                           >
//                             <Plus className="w-3.5 h-3.5" /> Add Bullet
//                           </button>
//                         </div>

//                         {bulletPoints.length > 0 && (
//                           <div className="space-y-2">
//                             {bulletPoints.map((_, bulletIdx) => (
//                               <div key={bulletIdx} className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
//                                 <span className="text-[10px] font-bold text-indigo-400 shrink-0">#{bulletIdx + 1}</span>
//                                 <input
//                                   type="text"
//                                   {...register(`sections.${index}.bulletPoints.${bulletIdx}` as const)}
//                                   className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:ring-2 focus:ring-indigo-500 outline-none"
//                                 />
//                                 <button
//                                   type="button"
//                                   onClick={() => removeBulletPoint(index, bulletIdx)}
//                                   className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition shrink-0"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </button>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>

//                       {/* Cards / Steps Manager */}
//                       {(isWorkflowSteps || isGridCards) && (
//                         <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
//                                 <Edit3 className="w-3.5 h-3.5 text-indigo-400" /> Manage Steps / Grid Cards ({cardsList.length})
//                               </h5>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => addStepCard(index)}
//                               className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md"
//                             >
//                               <Plus className="w-3.5 h-3.5" /> Add Step
//                             </button>
//                           </div>

//                           {cardsList.length > 0 && (
//                             <div className="space-y-3">
//                               {cardsList.map((_, cardIdx) => (
//                                 <div key={cardIdx} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-3">
//                                   <div className="flex items-center justify-between">
//                                     <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
//                                       Step #{cardIdx + 1}
//                                     </span>
//                                     <div className="flex items-center gap-1">
//                                       {cardIdx > 0 && (
//                                         <button
//                                           type="button"
//                                           onClick={() => moveStepCard(index, cardIdx, 'up')}
//                                           className="p-1 bg-slate-950 text-slate-300 hover:bg-slate-800 rounded transition"
//                                         >
//                                           <MoveUp className="w-3 h-3" />
//                                         </button>
//                                       )}
//                                       {cardIdx < cardsList.length - 1 && (
//                                         <button
//                                           type="button"
//                                           onClick={() => moveStepCard(index, cardIdx, 'down')}
//                                           className="p-1 bg-slate-950 text-slate-300 hover:bg-slate-800 rounded transition"
//                                         >
//                                           <MoveDown className="w-3 h-3" />
//                                         </button>
//                                       )}
//                                       <button
//                                         type="button"
//                                         onClick={() => removeStepCard(index, cardIdx)}
//                                         className="p-1 text-red-400 hover:bg-red-500/20 rounded transition ml-1"
//                                       >
//                                         <Trash2 className="w-3.5 h-3.5" />
//                                       </button>
//                                     </div>
//                                   </div>

//                                   <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
//                                     <div className="sm:col-span-4">
//                                       <input
//                                         type="text"
//                                         {...register(`sections.${index}.cardsList.${cardIdx}.title` as const)}
//                                         className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-semibold outline-none"
//                                       />
//                                     </div>
//                                     <div className="sm:col-span-8">
//                                       <input
//                                         type="text"
//                                         {...register(`sections.${index}.cardsList.${cardIdx}.desc` as const)}
//                                         className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none"
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       )}

//                       {/* Buttons Manager */}
//                       <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
//                         <div className="flex items-center justify-between">
//                           <h5 className="text-xs font-bold text-white uppercase tracking-wider">Action Buttons Manager</h5>
//                           <button
//                             type="button"
//                             onClick={() => addButton(index)}
//                             className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md"
//                           >
//                             <Plus className="w-3.5 h-3.5" /> Add Button
//                           </button>
//                         </div>

//                         {buttonsList.length > 0 && (
//                           <div className="space-y-3">
//                             {buttonsList.map((btn, btnIdx) => (
//                               <div key={btn.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
//                                 <div className="sm:col-span-4">
//                                   <input
//                                     type="text"
//                                     {...register(`sections.${index}.buttons.${btnIdx}.text` as const)}
//                                     className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none"
//                                   />
//                                 </div>
//                                 <div className="sm:col-span-5">
//                                   <input
//                                     type="text"
//                                     {...register(`sections.${index}.buttons.${btnIdx}.url` as const)}
//                                     className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono outline-none"
//                                   />
//                                 </div>
//                                 <div className="sm:col-span-2">
//                                   <select
//                                     {...register(`sections.${index}.buttons.${btnIdx}.variant` as const)}
//                                     className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none"
//                                   >
//                                     <option value="primary">Primary</option>
//                                     <option value="secondary">Secondary</option>
//                                     <option value="outline">Outline</option>
//                                     <option value="ghost">Ghost</option>
//                                   </select>
//                                 </div>
//                                 <div className="sm:col-span-1 text-right">
//                                   <button
//                                     type="button"
//                                     onClick={() => removeButton(index, btnIdx)}
//                                     className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-lg transition"
//                                   >
//                                     <Trash2 className="w-4 h-4" />
//                                   </button>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* Render Section Component View */}
//                   {renderSectionComponentView(sec, index, isEditing)}
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* TEMPLATES POPUP MODAL */}
//         {selectedTypeForStyles && (
//           <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
//             <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
//               <div className="flex justify-between items-center border-b border-slate-800 pb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
//                     <Grid className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <h3 className="text-base font-extrabold text-white">Select a Service Template Layout</h3>
//                     <p className="text-xs text-slate-400">Choose from tailored layouts for <span className="text-indigo-400 font-semibold">{selectedTypeForStyles.name}</span></p>
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => setSelectedTypeForStyles(null)}
//                   className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {getFourSampleOptions(selectedTypeForStyles.id, selectedTypeForStyles.name).map((sample, idx) => {
//                   const isSelected = selectedSampleIndex === idx;

//                   return (
//                     <div
//                       key={sample.id}
//                       onClick={() => setSelectedSampleIndex(idx)}
//                       className={`cursor-pointer rounded-2xl border p-5 transition-all relative overflow-hidden flex flex-col justify-between ${
//                         isSelected 
//                           ? 'border-indigo-500 bg-indigo-600/10 ring-2 ring-indigo-500 shadow-xl shadow-indigo-600/20' 
//                           : 'border-slate-800 bg-slate-950 hover:border-slate-700'
//                       }`}
//                     >
//                       <div className="flex justify-between items-center mb-3">
//                         <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/30">
//                           Layout Option #{idx + 1} ({sample.layoutStyle})
//                         </span>
//                         <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${isSelected ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 bg-slate-900'}`}>
//                           {isSelected && <Check className="w-3 h-3" />}
//                         </div>
//                       </div>

//                       <div className={`rounded-xl border p-4 shadow-inner space-y-3 ${getThemeClass(sample.bgTheme)}`}>
//                         <div className="space-y-1">
//                           <h5 className="text-xs font-bold line-clamp-1">{sample.title}</h5>
//                           <p className="text-[10px] opacity-75 line-clamp-2">{sample.subtitle}</p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
//                 <button
//                   type="button"
//                   onClick={() => setSelectedTypeForStyles(null)}
//                   className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleConfirmAddSampleTemplate}
//                   className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
//                 >
//                   <Check className="w-4 h-4" /> Confirm & Add to Canvas
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </FormProvider>
//   );
// }




