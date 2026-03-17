import { MetadataRoute } from 'next';
import { getTools, getCategories } from '@/lib/tools-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || 'http://localhost:3000';
  const tools = getTools();
  const categories = getCategories();
  
  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryPages,
    ...toolPages,
  ];
}
