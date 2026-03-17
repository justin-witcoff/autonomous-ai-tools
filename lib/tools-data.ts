import toolsData from '@/data/tools.json';
import categoriesData from '@/data/categories.json';

export interface Tool {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  pricing: string;
  url: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  rating: number;
  metaTitle: string;
  metaDescription: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
}

export function getTools(): Tool[] {
  return toolsData as Tool[];
}

export function getTool(slug: string): Tool | undefined {
  return toolsData.find(t => t.slug === slug) as Tool | undefined;
}

export function getToolsByCategory(category: string): Tool[] {
  return toolsData.filter(t => t.category === category) as Tool[];
}

export function getCategories(): Category[] {
  return categoriesData as Category[];
}

export function getCategory(slug: string): Category | undefined {
  return categoriesData.find(c => c.slug === slug) as Category | undefined;
}

export function getRelatedTools(tool: Tool, limit: number = 3): Tool[] {
  return toolsData
    .filter(t => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, limit) as Tool[];
}
