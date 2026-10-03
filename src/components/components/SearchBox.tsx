"use client";
import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { ToolDefinition } from "@/types/tool";
import { createSearchEngine } from "@/lib/search";
import { Button } from "@/components/Button";

interface SearchBoxProps {
  placeholder?: string;
  tools: ToolDefinition[];
  onSelect?: (tool: ToolDefinition) => void;
  className?: string;
}

export function SearchBox({ placeholder = "Search tools...", tools, onSelect, className }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ToolDefinition[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchEngine = createSearchEngine(tools);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const searchResults = searchEngine.search(query, 8);
    setResults(searchResults.map((r) => r.tool as ToolDefinition));
    setIsOpen(true);
    setSelectedIndex(0);
  }, [query, searchEngine]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node) &&
          listRef.current && !listRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && onSelect) {
          onSelect(results[selectedIndex]);
          setQuery("");
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  const handleResultClick = (tool: ToolDefinition) => {
    if (onSelect) onSelect(tool);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className={["relative w-full max-w-2xl", className].join(" ")} role="search">
      <label htmlFor="universal-search" className="sr-only">
        Search for a calculator or tool
      </label>
      <input
        ref={inputRef}
        id="universal-search"
        type="search"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => query.length >= 2 && setIsOpen(true)}
        placeholder={placeholder}
        className="w-full px-6 py-4 text-lg border-2 border-ink-300 rounded-lg bg-white placeholder-ink-400 focus:outline-none focus:ring-4 focus:ring-brand-200 focus:border-brand-500 transition-all"
        autoComplete="off"
        aria-autocomplete="list"
        aria-controls="search-results"
        aria-expanded={isOpen && results.length > 0}
      />
      {isOpen && results.length > 0 && (
        <div
          ref={listRef}
          id="search-results"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-ink-200 rounded-lg shadow-lg overflow-hidden z-50"
        >
          {results.map((tool, index) => (
            <button
              key={tool.id}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => handleResultClick(tool)}
              onMouseEnter={() => setSelectedIndex(index)}
              className={["w-full px-6 py-3 text-left hover:bg-brand-50 transition-colors",
                index === selectedIndex ? "bg-brand-50" : ""].join(" ")}
            >
              <div className="font-medium text-ink-900">{tool.title}</div>
              <div className="text-sm text-ink-500 mt-0.5">{tool.shortDescription}</div>
            </button>
          ))}
        </div>
      )}
      {isOpen && results.length === 0 && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-ink-200 rounded-lg shadow-lg p-4 z-50">
          <p className="text-ink-500 text-center">No tools found for "{query}"</p>
          <p className="text-sm text-ink-400 text-center mt-1">Try different keywords or browse categories</p>
        </div>
      )}
    </div>
  );
}

export default SearchBox;
