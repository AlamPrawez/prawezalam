export interface SeoMeta {
  title: string;
  slug: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogImageAlt?: string;
  keywords?: string; // Add keywords here
}
export interface HeroCtaButton {
  id: string;
  label: string;
  url: string;
  variant: 'primary' | 'secondary' | 'outline';
  openInNewTab: boolean;
}

export interface HeroSectionData {
  badge: string;
  headline: string;
  subheadline?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  paragraphHtml: string;
  heroImage: string;
  buttons: HeroCtaButton[];
}

export interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  focusTitle: string;
  focusPoints: string[];
}

export interface ServicesSectionData {
  sectionTitle: string;
  sectionSubtitle: string;
  cards: ServiceCardItem[];
}

export interface ContentSection {
  id: string;
  heading: string;
  contentHtml: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answerHtml: string;
}


export interface ProcessStep {
  id: string;
  stepNumber?: string;
  title: string;
  description: string;
  details?: string;
}

export interface ProcessSection {
  badge?: string;
  title: string;
  subtitle?: string;
  steps: ProcessStep[];
}


// Features & Industries Interfaces
export interface FeatureItem {
  id: string;
  label: string;
}

export interface FeaturesSectionData {
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export interface IndustryItem {
  id: string;
  name: string;
}

export interface IndustriesSectionData {
  title: string;
  subtitle: string;
  items: IndustryItem[];
}

export interface FeaturesIndustriesPayload {
  featuresSection: FeaturesSectionData;
  industriesSection: IndustriesSectionData;
}

export interface FullPagePayload {
  seo: SeoMeta;
  hero: HeroSectionData;
  process: ProcessSection;
  services: ServicesSectionData;
  contentSections: ContentSection[];
  faqs: FaqItem[];
  features_industries: FeaturesIndustriesPayload;
}