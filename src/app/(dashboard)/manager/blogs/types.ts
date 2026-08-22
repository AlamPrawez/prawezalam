// types.ts
export interface PageButton {
  id: string;
  text: string;
  url: string;
  variant: 'primary' | 'secondary';
}

export type HeroLayoutStyle =
  | 'profile-hero'
  | 'interactive-code-hero'
  | 'split-right'
  | 'split-left'
  | 'centered';

export interface PageSectionItem {
  id: string;
  type: 'hero'; // add more section types here as you build their views
  title: string;
  subtitle: string;
  layoutStyle: HeroLayoutStyle;
  bgTheme?: 'dark' | 'indigo' | 'slate';
  imageUrl?: string;
  buttons?: PageButton[];
  bulletPoints?: string[];
}

export interface PageBuilderValues {
  title: string;
  slug: string;
  sections: PageSectionItem[];
}