import { SectionTemplateDefinition } from './types';
import { heroTemplate } from './heroTemplate';
import { featuresTemplate } from './featuresTemplate';
import { processTemplate } from './processTemplate';
import { ctaTemplate } from './ctaTemplate';
import { PageSectionItem } from '../types';

export const SECTION_TEMPLATES: Record<string, SectionTemplateDefinition> = {
  hero: heroTemplate,
  features: featuresTemplate,
  process: processTemplate,
  cta: ctaTemplate,
};

// Explicitly annotate return type as Omit<PageSectionItem, 'id'>[]
export function getVariantsForType(typeId: string, typeName: string): Omit<PageSectionItem, 'id'>[] {
  const template = SECTION_TEMPLATES[typeId];
  if (template) {
    return template.getVariants(typeId, typeName);
  }

  // Ensure all properties exist in fallback objects so TS union includes bulletPoints & cardsList
  return [
    {
      type: typeId,
      title: `Modern ${typeName}`,
      subtitle: `Option 1 default layout for ${typeName}.`,
      bgTheme: 'dark',
      layoutStyle: 'split-right',
      paddingSize: 'lg',
      imageUrl: '',
      buttons: [{ id: 'b1', text: 'Get Started', url: '#', variant: 'primary' }],
      cardsList: [],
      bulletPoints: [],
    },
    {
      type: typeId,
      title: `Centered ${typeName}`,
      subtitle: `Option 2 default layout for ${typeName}.`,
      bgTheme: 'indigo',
      layoutStyle: 'centered',
      paddingSize: 'xl',
      imageUrl: '',
      buttons: [{ id: 'b2', text: 'Learn More', url: '#', variant: 'primary' }],
      cardsList: [],
      bulletPoints: [],
    },
    {
      type: typeId,
      title: `Minimal ${typeName}`,
      subtitle: `Option 3 default layout for ${typeName}.`,
      bgTheme: 'slate',
      layoutStyle: 'grid-cards',
      paddingSize: 'md',
      imageUrl: '',
      buttons: [{ id: 'b3', text: 'Contact Us', url: '#', variant: 'secondary' }],
      cardsList: [],
      bulletPoints: [],
    },
  ];
}