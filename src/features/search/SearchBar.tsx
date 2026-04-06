import { Search } from 'lucide-react';
import { useState } from 'react';
import type { Settings } from '../../types';

const SEARCH_MAP: Record<Settings['searchEngine'], string> = {
  google: 'https://www.google.com/search?q=',
  duckduckgo: 'https://duckduckgo.com/?q=',
  bing: 'https://www.bing.com/search?q=',
  brave: 'https://search.brave.com/search?q='
};

export function SearchBar({ engine }: { engine: Settings['searchEngine'] }) {
  const [query, setQuery] = useState('');

  return (
    <form
      className="glass-card flex items-center gap-3 px-4 py-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (!query.trim()) return;
        window.location.href = `${SEARCH_MAP[engine]}${encodeURIComponent(query.trim())}`;
      }}
    >
      <Search size={18} className="text-white/70" />
      <input
        className="w-full bg-transparent text-sm outline-none placeholder:text-white/60"
        placeholder="Search the web"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </form>
  );
}
