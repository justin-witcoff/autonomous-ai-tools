import Link from 'next/link';
import { getCategories, getTools } from '@/lib/tools-data';

export default function Home() {
  const categories = getCategories();
  const tools = getTools();
  const latestTools = tools.slice(0, 6); // First 6 as "latest"

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg-primary py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-7xl text-text-primary mb-6">
            Every AI tool for creators,<br />reviewed.
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            Comprehensive, honest reviews of the best AI tools for video editing, voice generation, 
            image creation, and everything in between.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full px-6 py-4 bg-bg-card border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-md transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-bg-secondary py-8 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-accent">{tools.length}+</div>
              <div className="text-text-secondary text-sm">Tools Reviewed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">{categories.length}</div>
              <div className="text-text-secondary text-sm">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">Weekly</div>
              <div className="text-text-secondary text-sm">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section id="categories" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl text-text-primary mb-12 text-center">
            Browse by category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const categoryTools = tools.filter(t => t.category === category.slug);
              return (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group p-6 bg-bg-card border border-border rounded-lg hover:border-accent transition-all"
                >
                  <h3 className="font-display text-2xl text-text-primary mb-2 group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-text-secondary mb-4">{category.description}</p>
                  <div className="text-accent text-sm font-medium">
                    {categoryTools.length} tools →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Tools */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl text-text-primary mb-12 text-center">
            Recently reviewed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group p-6 bg-bg-card border border-border rounded-lg hover:border-accent transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl text-text-primary group-hover:text-accent transition-colors">
                    {tool.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="text-text-primary font-medium">{tool.rating}</span>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-4">{tool.tagline}</p>
                <div className="text-accent text-sm font-medium">
                  Read review →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
