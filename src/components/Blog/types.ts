export interface PageButton {
  id: string;
  text: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | string;
}

export interface StepCardItem {
  title: string;
  desc: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PageCard {
  title: string;
  desc: string;
  iconName?: string;
  url?: string;
}

export interface PageSectionItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  bgTheme: 'dark' | 'indigo' | 'slate' | string;
  layoutStyle:
    | 'centered'
    | 'split-right'
    | 'split-left'
    | 'minimal'
    | 'grid-cards'
    | 'workflow-steps'
    | 'profile-hero'
    | 'interactive-code-hero'; // <-- Added here
  paddingSize?: 'sm' | 'md' | 'lg' | 'xl';
  imageUrl?: string;
  buttons?: PageButton[];
  cardsList?: PageCard[];
  bulletPoints?: string[];
  faqList?: Array<{ question: string; answer: string }>;
}

export interface PageBuilderValues {
  pageTitle: string;
  slug: string;
  sections: PageSectionItem[];
}