import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTool, getTools, getRelatedTools, getCategory } from '@/lib/tools-data';

export async function generateStaticParams() {
  const tools = getTools();
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = getTool(params.slug);
  
  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      type: 'article',
    },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  
  if (!tool) {
    notFound();
  }

  const category = getCategory(tool.category);
  const relatedTools = getRelatedTools(tool, 3);

  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: category?.name,
    offers: {
      '@type': 'Offer',
      price: tool.pricing,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-text-secondary">
            <Link href="/" className="hover:text-accent">Home</Link>
            <span className="mx-2">›</span>
            <Link href={`/categories/${tool.category}`} className="hover:text-accent">
              {category?.name}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-text-primary">{tool.name}</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <h1 className="font-display text-5xl text-text-primary mb-4">{tool.name}</h1>
            <p className="text-xl text-text-secondary mb-6">{tool.tagline}</p>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= Math.floor(tool.rating) ? 'text-yellow-500' : 'text-gray-600'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-text-primary font-semibold">{tool.rating}/5</span>
              </div>
              
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors font-medium"
              >
                Visit {tool.name} →
              </a>
            </div>
          </header>

          {/* Description */}
          <section className="mb-12">
            <div className="prose prose-invert max-w-none">
              {tool.description.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-text-secondary mb-4 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Best For */}
          <section className="mb-12 p-6 bg-accent/10 border border-accent/20 rounded-lg">
            <h2 className="font-display text-2xl text-text-primary mb-3">Best for</h2>
            <p className="text-text-primary">{tool.bestFor}</p>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="font-display text-3xl text-text-primary mb-6">Key features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tool.features.map((feature, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-accent text-lg">✓</span>
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Pros & Cons */}
          <section className="mb-12 grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h3 className="font-display text-xl text-text-primary mb-4">Pros</h3>
              <ul className="space-y-2">
                {tool.pros.map((pro, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-green-500 text-lg">+</span>
                    <span className="text-text-secondary">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h3 className="font-display text-xl text-text-primary mb-4">Cons</h3>
              <ul className="space-y-2">
                {tool.cons.map((con, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-red-500 text-lg">−</span>
                    <span className="text-text-secondary">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Pricing */}
          <section className="mb-12">
            <h2 className="font-display text-3xl text-text-primary mb-4">Pricing</h2>
            <p className="text-text-secondary">{tool.pricing}</p>
          </section>

          {/* CTA */}
          <section className="mb-12 p-8 bg-bg-card border border-border rounded-lg text-center">
            <h3 className="font-display text-2xl text-text-primary mb-4">Ready to try {tool.name}?</h3>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors font-medium text-lg"
            >
              Get started with {tool.name} →
            </a>
          </section>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section>
              <h2 className="font-display text-3xl text-text-primary mb-6">Related tools</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedTools.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/tools/${related.slug}`}
                    className="p-4 bg-bg-card border border-border rounded-lg hover:border-accent transition-all"
                  >
                    <h3 className="font-display text-lg text-text-primary mb-2">{related.name}</h3>
                    <p className="text-text-secondary text-sm">{related.tagline}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
