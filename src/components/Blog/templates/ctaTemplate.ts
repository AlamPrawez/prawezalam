import { SectionTemplateDefinition } from './types';

export const ctaTemplate: SectionTemplateDefinition = {
  id: 'cta',
  name: 'Call To Action',
  getVariants: (typeId, typeName) => [
    {
      type: 'cta',
      title: 'Ready to Build Your Next Web Platform?',
      subtitle: 'Partner with us to create fast, scalable applications.',
      bgTheme: 'indigo',
      layoutStyle: 'centered', // TypeScript now knows this is strictly '"centered"'
      paddingSize: 'xl',
      imageUrl: '',
      buttons: [
        { id: 'cta-opt1-btn1', text: 'Start Project Now', url: '#contact', variant: 'primary' },
      ],
    },
    // ---------------------------------------------------------
    // OPTION 1: High-Impact Centered Glow CTA
    // ---------------------------------------------------------
    {
      type: 'cta',
      title: 'Ready to Build Your Next Web Platform?',
      subtitle: 'Partner with us to create fast, scalable applications powered by FastAPI and Next.js.',
      bgTheme: 'indigo',
      layoutStyle: 'centered',
      paddingSize: 'xl',
      imageUrl: '',
      buttons: [
        { id: 'cta-opt1-btn1', text: 'Start Project Now', url: '#contact', variant: 'primary' },
        { id: 'cta-opt1-btn2', text: 'Schedule a Call', url: '#book', variant: 'outline' },
      ],
      bulletPoints: [
        'Free Initial Architecture Review',
        'Guaranteed Core Web Vitals Performance',
        'Transparent Milestone Pricing',
      ],
    },

    // ---------------------------------------------------------
    // OPTION 2: Split-Right Banner with Action Card
    // ---------------------------------------------------------
    {
      type: 'cta',
      title: 'Accelerate Your Product Development Cycle',
      subtitle: 'From real-time socket modules to production gRPC gateways, get production-ready code written with strict type safety.',
      bgTheme: 'dark',
      layoutStyle: 'split-right',
      paddingSize: 'lg',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      buttons: [
        { id: 'cta-opt2-btn1', text: 'Get In Touch', url: '#contact', variant: 'primary' },
      ],
      cardsList: [
        {
          title: 'Rapid Deployment',
          desc: 'Modular directory structures designed for quick CI/CD releases.',
          iconName: 'Zap',
        },
        {
          title: 'SEO & Performance',
          desc: 'Optimized meta handling and dynamic routing out of the box.',
          iconName: 'TrendingUp',
        },
      ],
    },

    // ---------------------------------------------------------
    // OPTION 3: Minimal Dark Banner (Direct Contact)
    // ---------------------------------------------------------
    {
      type: 'cta',
      title: 'Let’s Turn Your Vision Into Production Code',
      subtitle: 'Need custom development or full-stack architectural support? We are just a message away.',
      bgTheme: 'slate',
      layoutStyle: 'split-left',
      paddingSize: 'md',
      imageUrl: '',
      buttons: [
        { id: 'cta-opt3-btn1', text: 'Contact Us Today', url: '#contact', variant: 'primary' },
        { id: 'cta-opt3-btn2', text: 'View Portfolio', url: '#portfolio', variant: 'secondary' },
      ],
      bulletPoints: [
        '100% Source Code Ownership',
        'Dedicated Async Communication',
      ],
    },
  ],
};