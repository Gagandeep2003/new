import { ToolMetadata, SearchResult, SearchSuggestion, ToolCategory } from "@/types/tool";
import { Categories, getCategory } from "@/data/categories";

/**
 * Search implementation: ranks tools by title, description, aliases, keywords,
 * and category. Fast, deterministic, and works entirely offline.
 */
export class ToolSearch {
  private tools: ToolMetadata[];
  private index: Map<string, { tool: ToolMetadata; tokens: string[] }>;

  constructor(tools: ToolMetadata[]) {
    this.tools = tools;
    this.index = new Map();
    for (const tool of tools) {
      this.index.set(tool.id, { tool, tokens: this.tokenize(tool) });
    }
  }

  private tokenize(tool: ToolMetadata): string[] {
    const tokens = new Set<string>();
    const add = (s?: string) => {
      if (!s) return;
      s.toLowerCase().split(/[\s\-_/.,;:()]+/).filter(Boolean).forEach((t) => tokens.add(t));
    };
    add(tool.title);
    add(tool.shortDescription);
    tool.aliases?.forEach(add);
    tool.keywords?.forEach(add);
    tool.tags?.forEach(add);
    const cat = getCategory(tool.category);
    if (cat) add(cat.title);
    return Array.from(tokens);
  }

  search(query: string, limit: number = 10): SearchResult[] {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    const qTokens = q.split(/\s+/).filter(Boolean);
    const results: SearchResult[] = [];

    for (const { tool, tokens } of this.index.values()) {
      let score = 0;
      const matchedFields: string[] = [];

      // Exact title match
      if (tool.title.toLowerCase() === q) {
        score += 100;
        matchedFields.push("title");
      }

      // Title starts with query
      if (tool.title.toLowerCase().startsWith(q)) {
        score += 50;
        matchedFields.push("title-start");
      }

      // Title contains query
      if (tool.title.toLowerCase().includes(q)) {
        score += 20;
        matchedFields.push("title-contains");
      }

      // Description match
      if (tool.shortDescription.toLowerCase().includes(q)) {
        score += 10;
        matchedFields.push("description");
      }

      // Alias match
      for (const alias of tool.aliases || []) {
        if (alias.toLowerCase() === q) {
          score += 40;
          matchedFields.push("alias");
          break;
        }
        if (alias.toLowerCase().includes(q)) {
          score += 15;
          matchedFields.push("alias-contains");
          break;
        }
      }

      // Keyword match
      for (const kw of tool.keywords || []) {
        if (kw.toLowerCase() === q) {
          score += 25;
          matchedFields.push("keyword");
          break;
        }
        if (kw.toLowerCase().includes(q)) {
          score += 8;
          matchedFields.push("keyword-contains");
          break;
        }
      }

      // Token overlap
      let tokenOverlap = 0;
      for (const qt of qTokens) {
        if (tokens.includes(qt)) tokenOverlap++;
      }
      score += tokenOverlap * 5;

      if (score > 0) {
        results.push({ tool: { ...tool }, score, matchedFields });
      }
    }

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  suggest(query: string, limit: number = 5): SearchSuggestion[] {
    const results = this.search(query, limit);
    return results.map((r) => ({
      text: r.tool.title,
      type: "tool",
      toolId: r.tool.id,
    }));
  }

  getToolById(id: string): ToolMetadata | undefined {
    return this.tools.find((t) => t.id === id);
  }

  getToolsByCategory(category: ToolCategory): ToolMetadata[] {
    return this.tools.filter((t) => t.category === category);
  }

  getAllTools(): ToolMetadata[] {
    return this.tools;
  }
}

export function createSearchEngine(tools: ToolMetadata[]): ToolSearch {
  return new ToolSearch(tools);
}