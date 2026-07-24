import React from 'react';
import { PageSectionItem } from '../types';
import { HeroView } from './HeroView';
import { FeaturesView } from './FeaturesView';
import { ProcessView } from './ProcessView';
import { ArticleView } from './ArticleView';
import { FAQView } from './FAQView';
import { CTAView } from './CTAView';

// 1. Explicitly type the map using React.ComponentType
const VIEW_MAP: Record<string, React.ComponentType<{ sec: PageSectionItem }>> = {
  hero: HeroView,
  features: FeaturesView,
  process: ProcessView,
  article: ArticleView,
  faq: FAQView,
  cta: CTAView,
};

// 2. Render using standard FC return syntax
export const SectionViewRenderer: React.FC<{ sec: PageSectionItem }> = ({ sec }) => {
  // Use capital letter and fall back to default component
  const ComponentToRender = VIEW_MAP[sec.type] || HeroView;

  return <ComponentToRender sec={sec} />;
};