import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-border bg-bg-primary/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-display text-xl">AI Tools</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-text-secondary hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="/#categories" className="text-text-secondary hover:text-accent transition-colors">
              Categories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
