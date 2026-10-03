import Link from "next/link";
import { SearchBox } from "@/components/components/SearchBox";
import { CategoryCard } from "@/components/components/CategoryCard";
import { ToolCard } from "@/components/components/ToolCard";
import { Categories } from "@/data/categories";
import { getAllTools } from "@/data/tools";

export default async function HomePage() {
  const popularTools = Categories.flatMap((cat) => cat.tools).slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-50 to-surface py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-ink">
            Calculate, Convert, Compare
          </h1>
          <p className="text-xl md:text-2xl text-ink/80 mb-10 max-w-2xl mx-auto">
            Instant tools for everyday problems. No login, no account, no ads by default.
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBox
              placeholder="What do you want to calculate, convert, check, or generate?"
              tools={getAllTools()}
            />
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      {popularTools.length > 0 && (
        <section className="py-16 px-4 bg-surface">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Popular Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTools.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-4 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-6">
            About This Platform
          </h2>
          <p className="text-lg text-ink/80 mb-6">
            This is a collection of free, no-login calculators and tools designed for speed,
            privacy, and simplicity. All calculations are performed locally in your browser
            unless an external API is explicitly required (like currency exchange rates).
          </p>
          <p className="text-lg text-ink/80">
            Every tool is battle-tested with unit tests, explains its methodology,
            and provides helpful examples. The result is a reliable, trustworthy utility
            that works instantly without tracking, sign-ups, or complicated workflows.
          </p>
        </div>
      </section>
    </div>
  );
}