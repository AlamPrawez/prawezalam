import { SectionTemplateDefinition } from './types';
import { PageSectionItem } from '../types';

export const heroTemplate: SectionTemplateDefinition = {
  id: 'hero',
  name: 'Hero Banner',
  getVariants: (typeId, typeName): Omit<PageSectionItem, 'id'>[] => [
    // ---------------------------------------------------------
    // OPTION 1: React.js Services Layout (From Image)
    // ---------------------------------------------------------
    {
      type: 'hero',
      title: 'Build Fast, Scalable React Applications That Users Love',
      subtitle:
        'Need a modern web application that is fast, responsive, and easy to scale? I build high-quality React.js applications for startups, businesses, and agencies looking for a reliable development partner.\n\nWhether you\'re building a new SaaS product, an internal business tool, a customer dashboard, or migrating an existing application to React, I can help you deliver a solution that\'s maintainable, performant, and built for long-term growth.\n\nLooking for a React developer who focuses on clean architecture, performance, and business results? Let\'s build your next project together.',
      bgTheme: 'dark',
      layoutStyle: 'split-right',
      paddingSize: 'xl',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
      buttons: [
        {
          id: 'hero-opt1-btn1',
          text: 'Order Service',
          url: '#order',
          variant: 'primary'
        },
        {
          id: 'hero-opt1-btn2',
          text: 'Get in touch for a free project discussion. →',
          url: '#contact',
          variant: 'outline'
        },
      ],
      cardsList: [],
      bulletPoints: [],
    },

    // ---------------------------------------------------------
    // OPTION 2: Split-Right Modern SaaS Launchpad
    // ---------------------------------------------------------
    {
      type: 'hero',
      title: 'Next-Gen Web Applications Built for High Performance',
      subtitle: 'Engineered with FastAPI and Next.js for lightning-fast rendering, optimal SEO, and smooth user experiences.',
      bgTheme: 'dark',
      layoutStyle: 'split-right',
      paddingSize: 'xl',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      buttons: [
        { id: 'hero-opt2-btn1', text: 'Explore Tech Stack', url: '#features', variant: 'primary' },
        { id: 'hero-opt2-btn2', text: 'View Documentation', url: '#docs', variant: 'outline' },
      ],
      cardsList: [],
      bulletPoints: [
        '100/100 Core Web Vitals target',
        'Production-ready backend API contracts',
        'Fully responsive & accessible Tailwind UI',
      ],
    },

    // ---------------------------------------------------------
    // OPTION 3: Centered Launchpad with Feature Cards
    // ---------------------------------------------------------
    {
      type: 'hero',
      title: 'Architecting Scalable Full-Stack Web Products',
      subtitle: 'From real-time communication modules to high-throughput REST & gRPC gateways—built clean, fast, and secure.',
      bgTheme: 'indigo',
      layoutStyle: 'centered',
      paddingSize: 'xl',
      imageUrl: '',
      buttons: [
        { id: 'hero-opt3-btn1', text: 'Start Building', url: '#get-started', variant: 'primary' },
        { id: 'hero-opt3-btn2', text: 'Schedule Architecture Review', url: '#contact', variant: 'secondary' },
      ],
      cardsList: [
        {
          title: 'FastAPI Core',
          desc: 'Asynchronous Python performance with auto OpenAPI docs.',
          iconName: 'Zap'
        },
        {
          title: 'Next.js Frontend',
          desc: 'App router optimization with SSR and dynamic static regeneration.',
          iconName: 'Layout'
        },
        {
          title: 'gRPC & Socket.IO',
          desc: 'Real-time streaming and high-speed multi-protocol communication.',
          iconName: 'Activity'
        },
      ],
      bulletPoints: [],
    },

    // ---------------------------------------------------------
    // OPTION 4: Split-Left Feature Hero (Minimal Tech Focus)
    // ---------------------------------------------------------
    {
      type: 'hero',
      title: 'Full-Stack Engineering & System Architecture',
      subtitle: 'Delivering end-to-end web applications with modular backends and sleek, modern dynamic frontends.',
      bgTheme: 'slate',
      layoutStyle: 'split-left',
      paddingSize: 'lg',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      buttons: [
        { id: 'hero-opt4-btn1', text: 'Get In Touch', url: '#contact', variant: 'primary' },
      ],
      cardsList: [],
      bulletPoints: [
        'Modular & extensible directory structure',
        'Strict type safety across full stack',
        'SEO-optimized meta management',
      ],
    },

    {
      type: 'hero',
      layoutStyle: 'interactive-code-hero', // <-- New unique key
      title: 'Full-Stack Engineering & System Architecture',
      subtitle:
        'I architect end-to-end web applications with modular backends, microservice integrations, and sleek Next.js frontends designed for high-concurrency loads and instant page load speeds.',
      bgTheme: 'dark',
      paddingSize: 'xl',
      imageUrl: '',
      buttons: [
        {
          id: 'hero-opt5-btn1',
          text: 'Explore Repositories',
          url: '#github',
          variant: 'primary',
        },
        {
          id: 'hero-opt5-btn2',
          text: 'Schedule Tech Discovery →',
          url: '#contact',
          variant: 'outline',
        },
      ],
      cardsList: [],
      bulletPoints: [
        'FastAPI & Async Python Core',
        'Next.js SSR & React 19 App Router',
        'Sub-100ms API Latency & gRPC Gateways',
      ],
    },
  ],
};