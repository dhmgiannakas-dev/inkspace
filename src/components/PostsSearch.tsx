"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Live article search with debounced URL updates.
 */
export default function PostsSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(currentSearch);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search === currentSearch) return;

      const params = new URLSearchParams(searchParams.toString());

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      params.delete("page");

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