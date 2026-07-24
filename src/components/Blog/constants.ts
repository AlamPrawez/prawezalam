import { Sparkles, Layers, Cpu, FileText, HelpCircle, MessageSquare, LucideIcon } from 'lucide-react';

export interface SectionTypeConfig {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export const AVAILABLE_SECTION_TYPES: SectionTypeConfig[] = [
  { id: 'hero', name: 'Hero Banner', description: 'Immersive landing header with badges and action CTAs.', icon: Sparkles },
  { id: 'features', name: 'Features / Tech Stack', description: 'Grid-based service cards with icons and highlights.', icon: Layers },
  { id: 'process', name: 'Step-by-Step Process', description: 'Numbered workflow timeline showing development lifecycle.', icon: Cpu },
  { id: 'article', name: 'Editorial / Article Block', description: 'Clean multi-column technical overview with rich typography.', icon: FileText },
  { id: 'faq', name: 'FAQ Accordion', description: 'Expandable question list for common client inquiries.', icon: HelpCircle },
  { id: 'cta', name: 'Conversion Banner', description: 'High-contrast closing call to action for inquiries.', icon: MessageSquare },
];