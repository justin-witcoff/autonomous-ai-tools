import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategory, getCategories, getToolsByCategory } from '@/lib/tools-data';

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = getCategory(params.category);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} for Creators 2026 - Best Tools Reviewed`,
    description: `${category.description}. Compare features, pricing, and reviews of the top ${category.name.toLowerCase()}.`,
    openGraph: {
      title: `${category.name} for Creators 2026`,
      description: category.description,
    },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category);
  
  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(params.category);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <nav className="mb-6 text-sm text-text-secondary">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-text-primary">{category.name}</span>
          </nav>
          
          <h1 className="font-display text-5xl text-text-primary mb-4">
            {category.name}
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            {category.description}. We've reviewed {tools.length} tools in this category to help you find the perfect fit for your workflow.
          </p>
        </header>

        {/* Tools Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <article
              key={tool.slug}
              className="p-6 bg-bg-card border border-border rounded-lg hover:border-accent transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-display text-2xl text-text-primary mb-2">
                    <Link href={`/tools/${tool.slug}`} className="hover:text-accent transition-colors">
                      {tool.name}
                    </Link>
                  </h2>
                  <p className="text-text-secondary">{tool.tagline}</p>
                </div>
                <div className="flex items-center space-x-1 text-sm whitespace-nowrap ml-4">
                  <span className="text-yellow-500">★</span>
                  <span className="text-text-primary font-medium">{tool.rating}</span>
                </div>
              </div>

              <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                {tool.description.split('\n\n')[0]}
              </p>

              <div className="mb-4">
                <div className="text-text-secondary text-sm font-medium mb-2">Key features:</div>
                <div className="flex flex-wrap gap-2">
                  {tool.features.slice(0, 3).map((feature, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-bg-secondary text-text-secondary text-xs rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-text-secondary text-sm">{tool.pricing.split('.')[0]}</div>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-accent hover:text-accent-hover font-medium text-sm"
                >
                  Read review →
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Comparison Table */}
        <section className="mt-16">
          <h2 className="font-display text-3xl text-text-primary mb-8">Quick comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-text-primary font-medium">Tool</th>
                  <th className="text-left py-3 px-4 text-text-primary font-medium">Rating</th>
                  <th className="text-left py-3 px-4 text-text-primary font-medium">Best For</th>
                  <th className="text-left py-3 px-4 text-text-primary font-medium">Starting Price</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.slug} className="border-b border-border/50">
                    <td className="py-3 px-4">
                      <Link href={`/tools/${tool.slug}`} className="text-accent hover:text-accent-hover font-medium">
                        {tool.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-text-secondary">{tool.rating}/5</td>
                    <td className="py-3 px-4 text-text-secondary">{tool.bestFor}</td>
                    <td className="py-3 px-4 text-text-secondary">{tool.pricing.split('.')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
