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

    

export type ContentLayoutStyle =
  | 'standard-block'
  | 'split-image'
  | 'card-grid'
  | 'bordered-callout'
  | 'simple-quill';

export type BlogLayoutStyle = 'editorial' | 'minimal-split' | 'card-magazine';   
export type CTALayoutStyle = 'centered' | 'split-screen' | 'card-floating'; 
export type FAQLayoutStyle = 'stack' | 'grid-2col' | 'accordion';
export type FeaturesLayoutStyle = 'grid-3col' | 'list-vertical' | 'bento';
export type ProcessLayoutStyle =
  | 'grid-2col'
  | 'stepper-horizontal'
  | 'timeline-vertical'
  | 'numbered-cards'
  | 'zigzag';

export type ArticleLayoutStyle =
  | 'single-col'
  | 'editorial-2col'
  | 'bordered-callout'
  | 'hero-header'
  | 'quote-box';


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

// 1. Dedicated SEO Data Interface
export interface SeoData {
  title?: string;
  slug?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ldjson?: string;
}


// 2. Updated PageSectionItem Interface with SEO support
export interface PageSectionItem {
  id: string;
  type: SectionType; // Ensure your union type includes all section variants
  title: string;
  subtitle: string;
  layoutStyle?: HeroLayoutStyle | FAQLayoutStyle | BlogLayoutStyle | ContentLayoutStyle | ProcessLayoutStyle | FeaturesLayoutStyle | ArticleLayoutStyle | CTALayoutStyle | string;
  bgTheme?: 'dark' | 'indigo' | 'slate' | 'light';
  paddingSize?: 'sm' | 'md' | 'lg' | string;
  imageUrl?: string;
  imageAlt?: string;
  imageLinkUrl?: string;
  badgeText?: string;
  
  // SEO & Metadata properties
  seo?: SeoData;
  description?: string;
  keywords?: string;

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


export interface PageBuilderValues {
    seo:SeoData;
    title: string;
    status: 'draft' | 'published';
    slug?: string;
    bgTheme?:string;
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