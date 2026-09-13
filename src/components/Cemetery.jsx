import { useMemo, useRef, useState } from "react";
import { Dices, Sparkles } from "lucide-react";
import Tombstone from "./Tombstone";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import EmptyCemetery from "./EmptyCemetery";

function sortGraves(graves, filter) {
  const list = [...graves];
  switch (filter) {
    case "useless":
      return list.sort((a, b) => b.uselessness - a.uselessness);
    case "ambitious":
      return list.sort((a, b) => b.ambition - a.ambition);
    case "viewed":
      return list.sort((a, b) => b.views - a.views);
    case "resurrection":
      return list.sort((a, b) => b.resurrectionChance - a.resurrectionChance);
    case "random":
      return list.sort(() => Math.random() - 0.5);
    case "recent":
    default:
      return list.sort((a, b) => new Date(b.diedDate) - new Date(a.diedDate));
  }
}

export default function Cemetery({ graves, onOpenGrave, onBuryClick, onResurrectClick }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("recent");
  const [highlightedId, setHighlightedId] = useState(null);
  const refs = useRef(new Map());
  const highlightTimeout = useRef(null);

  const deadGraves = useMemo(() => graves.filter((g) => g.status === "dead"), [graves]);
  const aliveGraves = useMemo(() => graves.filter((g) => g.status === "alive"), [graves]);

  const visibleGraves = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = query
      ? deadGraves.filter(
          (g) =>
            g.title.toLowerCase().includes(query) || g.description.toLowerCase().includes(query)
        )
      : deadGraves;
    return sortGraves(filtered, filter);
  }, [deadGraves, search, filter]);

  const registerRef = (id, el) => {
    if (el) refs.current.set(id, el);
    else refs.current.delete(id);
  };

  const handleRandomGrave = () => {
    const pool = visibleGraves.length > 0 ? visibleGraves : deadGraves;
    if (pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setHighlightedId(pick.id);

    const node = refs.current.get(pick.id);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (highlightTimeout.current) clearTimeout(highlightTimeout.current);
    highlightTimeout.current = setTimeout(() => setHighlightedId(null), 2600);
  };

  return (
    <section id="cemetery" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-3xl text-parchment sm:text-4xl">The Cemetery</h2>
          <p className="mt-2 max-w-md font-body text-sm text-stone-400">
            Every idea here was once somebody&rsquo;s next big thing.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRandomGrave}
            disabled={deadGraves.length === 0}
            className="flex items-center gap-2 rounded-sm border border-stone-600/50 px-4 py-2 font-body text-sm text-stone-300 transition-colors hover:border-stone-400/60 hover:text-parchment disabled:opacity-40"
          >
            <Dices size={15} /> Show me a random grave
          </button>
          <button
            type="button"
            onClick={onResurrectClick}
            disabled={deadGraves.length === 0}
            className="flex items-center gap-2 rounded-sm border border-ember/50 px-4 py-2 font-body text-sm text-ember transition-colors hover:bg-ember/10 disabled:opacity-40"
          >
            <Sparkles size={15} /> Resurrect an idea
          </button>
        </div>
      </div>

      {graves.length === 0 ? (
        <EmptyCemetery onBuryClick={onBuryClick} />
      ) : (
        <>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar value={search} onChange={setSearch} />
            <Filters active={filter} onChange={setFilter} />
          </div>

          {visibleGraves.length === 0 ? (
            <p className="py-16 text-center font-body text-stone-500">
              No graves match &ldquo;{search}&rdquo;. Perhaps that idea was never buried&hellip; yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleGraves.map((grave) => (
                <div key={grave.id} className="animate-emerge">
                  <Tombstone
                    ref={(el) => registerRef(grave.id, el)}
                    grave={grave}
                    onOpen={onOpenGrave}
                    highlighted={highlightedId === grave.id}
                  />
                </div>
              ))}
            </div>
          )}

          {aliveGraves.length > 0 && (
            <div className="mt-20">
              <h3 className="font-display text-2xl text-ember">Unfortunately Alive</h3>
              <p className="mt-2 font-body text-sm text-stone-400">
                These ideas were resurrected against their will and the will of common sense.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {aliveGraves.map((grave) => (
                  <div key={grave.id} className="animate-emerge">
                    <Tombstone grave={grave} onOpen={onOpenGrave} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
