import Link from 'next/link';
import { getCategories, getTools } from '@/lib/tools-data';

export default function Footer() {
  const categories = getCategories();
  const tools = getTools();
  
  // Group tools by category for the mega footer
  const toolsByCategory = categories.map(cat => ({
    ...cat,
    tools: tools.filter(t => t.category === cat.slug).slice(0, 5) // Top 5 per category
  }));

  return (
    <footer className="bg-bg-secondary border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mega footer grid - The SEO powerhouse */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {toolsByCategory.map((category) => (
            <div key={category.slug}>
              <h3 className="font-display text-lg text-text-primary mb-4">
                <Link href={`/categories/${category.slug}`} className="hover:text-accent transition-colors">
                  {category.name}
                </Link>
              </h3>
              <ul className="space-y-2">
                {category.tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="text-text-secondary text-sm hover:text-accent transition-colors"
                    >
                      {tool.name} Review
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-accent text-sm hover:text-accent-hover transition-colors font-medium"
                  >
                    View all →
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-text-secondary text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} AI Tools for Creators. All reviews updated regularly.
            </div>
            <div className="text-text-secondary text-sm">
              {tools.length}+ tools reviewed · {categories.length} categories
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
