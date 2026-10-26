"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Filters are real, combinable, shareable query params (?type=tutorial&topic=ai&lang=id).
export function useFilters(keys) {
  const params = useSearchParams();
  const values = {};
  for (const key of keys) values[key] = params?.get(key) || "all";
  return values;
}

function hrefFor(pathname, current, key, value) {
  const next = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...current, [key]: value })) {
    if (v && v !== "all") next.set(k, v);
  }
  const query = next.toString();
  return query ? `${pathname}?${query}` : pathname;
}

// filter-chip: 32px visual inside a 44px hit area. Active = ink block.
function FilterChip({ href, active, children }) {
  return (
    <Link
      href={href}
      scroll={false}
      replace
      aria-current={active ? "true" : undefined}
      className="group flex h-11 shrink-0 items-center"
    >
      <span
        className={`t-tag flex h-8 items-center px-sm transition-colors ${
          active ? "bg-primary text-on-primary" : "border border-hairline bg-canvas text-ink group-hover:border-hairline-strong"
        }`}
      >
        {children}
      </span>
    </Link>
  );
}

export function FilterGroup({ pathname, current, name, label, options }) {
  return (
    <div role="group" aria-label={label} className="no-scrollbar flex items-center gap-xs overflow-x-auto">
      <span className="t-tag w-[76px] shrink-0 text-faint lg:t-mono-label lg:w-auto">{label}</span>
      {[{ value: "all", label: "All" }, ...options].map((option) => (
        <FilterChip key={option.value} href={hrefFor(pathname, current, name, option.value)} active={current[name] === option.value}>
          {option.label}
        </FilterChip>
      ))}
    </div>
  );
}
