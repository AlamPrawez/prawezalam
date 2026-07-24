import { SectionTemplateDefinition } from './types';

export const processTemplate: SectionTemplateDefinition = {
  id: 'process',
  name: 'Step-by-Step Process',
  getVariants: (typeId, typeName) => [
    {
      type: 'process',
      title: `Step-by-Step Workflow`,
      subtitle: `Our structured 4-phase agile engineering methodology.`,
      bgTheme: 'dark',
      layoutStyle: 'workflow-steps',
      paddingSize: 'lg',
      imageUrl: '',
      buttons: [{ id: 'p1', text: 'Start Project', url: '#', variant: 'primary' }],
      cardsList: [
        { title: '01. Discovery & Architecture', desc: 'Requirement mapping and tech stack selection.', iconName: 'CheckCircle2' },
        { title: '02. UI/UX Implementation', desc: 'Tailwind CSS responsive styling.', iconName: 'CheckCircle2' },
        { title: '03. Integration & Testing', desc: 'API integration and performance audits.', iconName: 'CheckCircle2' },
        { title: '04. Deployment & Support', desc: 'Production server configuration.', iconName: 'CheckCircle2' },
      ],
    },
  ],
};