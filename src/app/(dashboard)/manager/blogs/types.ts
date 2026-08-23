import { ContentLayoutStyle } from "./views/ContentViews";

// types.ts
export type SectionType = 'hero' | 'cta' | 'faq' | 'features'| 'process' | 'article'| 'blog' | 'content';

export interface PageButton {
    id: string;
    text: string;
    url?: string;
    variant: 'primary' | 'secondary';
}

export type HeroLayoutStyle =
    | 'profile-hero'
    | 'interactive-code-hero'
    | 'split-right'
    | 'split-left'
    | 'centered';

export type BlogLayoutStyle = 'editorial' | 'minimal-split' | 'card-magazine';   
export type CTALayoutStyle = 'centered' | 'split-screen' | 'card-floating'; 
export type FAQLayoutStyle = 'stack' | 'grid-2col' | 'accordion';

export interface FAQItem {
    question: string;
    answer: string;
}

export interface FeatureCard {
  title: string;
  desc: string;
}

export interface ProcessCard {
  title: string;
  desc: string;
}

export interface FeatureCard {
  title: string;
  desc: string;
}

export interface PageSectionItem {
  id: string;
  type: SectionType; // Ensure 'content' is included in your SectionType union
  title: string;
  subtitle: string;
  layoutStyle?: HeroLayoutStyle | BlogLayoutStyle | ContentLayoutStyle | string;
  bgTheme?: 'dark' | 'indigo' | 'slate' | 'light';
  paddingSize?: 'sm' | 'md' | 'lg' | string;
  imageUrl?: string;
  imageAlt?: string;
  imageLinkUrl?: string;
  badgeText?: string;
  
  // Content block properties
  heading?: string;
  contentHtml?: string;

  // Other section properties
  buttons?: PageButton[];
  bulletPoints?: string[];
  faqList?: FAQItem[];
  cardsList?: FeatureCard[] | ProcessCard[];
  authorName?: string;
  authorRole?: string;
  publishDate?: string;
  readTime?: string;
}

// export interface PageSectionItem {
//     id: string;
//     type: SectionType; // add more section types here as you build their views
//     title: string;
//     subtitle: string;
//     layoutStyle?: HeroLayoutStyle | BlogLayoutStyle | string;
//     bgTheme?: 'dark' | 'indigo' | 'slate' | 'light';
//     paddingSize?: 'sm' | 'md' | 'lg' | string;
//     imageUrl?: string;
//     buttons?: PageButton[];
//     bulletPoints?: string[];
//     faqList?: FAQItem[];
//     cardsList?:FeatureCard[] | ProcessCard[] | FeatureCard[];
//     authorName?: string;
//     authorRole?: string;
//     publishDate?: string;
//     readTime?: string;
//     imageAlt?: string;
//     imageLinkUrl?: string;
//     badgeText?:string;
// }


export interface PageBuilderValues {
    title: string;
    slug: string;
    sections: PageSectionItem[];
}


// const paddingClass =
//     sec.paddingSize === 'sm' ? 'p-6' : sec.paddingSize === 'lg' ? 'p-16' : 'p-10';

//   const themeClass =
//     sec.bgTheme === 'indigo'
//       ? 'bg-indigo-950 text-white border border-indigo-800/50'
//       : sec.bgTheme === 'light'
//       ? 'bg-slate-100 text-slate-900 border border-slate-200'
//       : 'bg-slate-950 text-white border border-slate-800';