import { useEffect, useRef, useState } from "react";
import { MapPin, Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SavedAddressOption {
  id: string;
  label: string;
  address: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  /** Async-Suchfunktion, liefert Adressvorschläge zu einem Suchbegriff. */
  searchFn: (
    query: string,
    signal: AbortSignal
  ) => Promise<{ description: string }[]>;
  saved?: SavedAddressOption[];
  placeholder?: string;
  id?: string;
  className?: string;
}

/** Einfacher Debounce-Hook. */
function useDebounced<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/**
 * Adresseingabe mit automatischer Vervollständigung und Schnellauswahl
 * gespeicherter Adressen. Die eigentliche Suche wird über `searchFn` injiziert.
 */
export function AddressAutocomplete({
  value,
  onChange,
  searchFn,
  saved = [],
  placeholder,
  id,
  className,
}: AddressAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<{ description: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // value von außen (z. B. nach Auswahl gespeicherter Adresse) übernehmen
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const debouncedQuery = useDebounced(query, 400);

  // Suche ausführen, sobald genug Zeichen vorhanden sind und das Feld offen ist
  useEffect(() => {
    const term = debouncedQuery.trim();
    if (!open || term.length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    searchFn(term, controller.signal)
      .then(r => setResults(r))
      .catch(err => {
        if ((err as Error)?.name !== "AbortError") setResults([]);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [debouncedQuery, open, searchFn]);

  // Klick außerhalb schließt das Dropdown
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const q = query.trim().toLowerCase();
  const matchingSaved = saved.filter(
    s =>
      q.length === 0 ||
      s.label.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q)
  );

  function select(address: string) {
    onChange(address);
    setQuery(address);
    setOpen(false);
  }

  const hasResults = results.length > 0;
  const showDropdown =
    open && (matchingSaved.length > 0 || hasResults || loading);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id={id}
          type="text"
          autoComplete="off"
          value={query}
          placeholder={placeholder ?? "Adresse eingeben…"}
          onChange={e => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="flex h-10 w-full rounded-md border border-input bg-background py-2 pl-9 pr-9 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
      </div>

      {showDropdown && (
        <div className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md">
          {matchingSaved.length > 0 && (
            <div className="px-2 pb-1 pt-1.5 text-xs font-medium text-muted-foreground">
              Gespeicherte Adressen
            </div>
          )}
          {matchingSaved.map(s => (
            <button
              type="button"
              key={`saved-${s.id}`}
              onClick={() => select(s.address)}
              className="flex w-full items-start gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
              <span>
                <span className="font-medium">{s.label}</span>
                <span className="block text-xs text-muted-foreground">
                  {s.address}
                </span>
              </span>
            </button>
          ))}

          {hasResults && matchingSaved.length > 0 && (
            <div className="my-1 border-t border-border" />
          )}

          {results.map((p, i) => (
            <button
              type="button"
              key={`${p.description}-${i}`}
              onClick={() => select(p.description)}
              className="flex w-full items-start gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span>{p.description}</span>
            </button>
          ))}

          {!hasResults && !loading && matchingSaved.length === 0 && (
            <div className="px-2 py-2 text-sm text-muted-foreground">
              Keine Vorschläge gefunden.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
