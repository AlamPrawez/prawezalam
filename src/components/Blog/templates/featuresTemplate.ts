import { SectionTemplateDefinition } from './types';

export const featuresTemplate: SectionTemplateDefinition = {
  id: 'features',
  name: 'Features / Tech Stack',
  getVariants: (typeId, typeName) => [
    {
      type: 'features',
      title: `Enterprise ${typeName} Grid`,
      subtitle: `Scalable component architecture designed for high-performance enterprise applications.`,
      bgTheme: 'dark',
      layoutStyle: 'grid-cards',
      paddingSize: 'lg',
      imageUrl: '',
      buttons: [{ id: 'f1', text: 'Explore Architecture', url: '#', variant: 'primary' }],
      cardsList: [
        { title: 'Component Reusability', desc: 'Modular design systems built with strict atomic principles.', iconName: 'Zap' },
        { title: 'State Optimization', desc: 'Blazing fast state handling using modern React hooks.', iconName: 'Cpu' },
        { title: 'SSR Performance', desc: 'Optimized server-side rendering for elite Core Web Vitals.', iconName: 'ShieldCheck' },
      ],
    },
  ],
};