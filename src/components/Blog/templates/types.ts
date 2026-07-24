import { PageSectionItem } from '../types';

export interface SectionTemplateDefinition {
  id: string;
  name: string;
  getVariants: (typeId: string, typeName: string) => Omit<PageSectionItem, 'id'>[];
}