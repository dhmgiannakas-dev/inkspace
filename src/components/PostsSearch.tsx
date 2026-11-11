"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** Live article search with debounced URL updates. */
export default function PostsSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(currentSearch);
  const lastSubmittedSearch = useRef<string | null>(null);

  useEffect(() => {
    if (lastSubmittedSearch.current === currentSearch) {
      lastSubmittedSearch.current = null;
      return;
    }

    if (lastSubmittedSearch.current !== null) {
      return;
    }

    setSearch(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    if (search.trim() === currentSearch) return;

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmedSearch = search.trim();

      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      } else {
        params.delete("search");
      }

      params.delete("page");

      lastSubmittedSearch.current = trimmedSearch;

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search, currentSearch, pathname, router, searchParams]);

  return (
    <div className="postsSearch">
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search articles..."
        aria-label="Search articles"
      />
    </div>
  );
}