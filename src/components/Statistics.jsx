import { Skull, Percent, Feather, Trophy, Clock, Sparkles, HeartCrack } from "lucide-react";
import { daysSince } from "../utils/format";

function StatCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="border border-stone-600/40 bg-stone-900/40 p-5">
      <div className="flex items-center gap-2 text-stone-500">
        <Icon size={16} />
        <span className="font-body text-xs">{label}</span>
      </div>
      <p className="mt-3 font-display text-2xl text-parchment">{value}</p>
      {sub && <p className="mt-1 font-body text-xs text-stone-500">{sub}</p>}
    </div>
  );
}

export default function Statistics({ stats }) {
  return (
    <section id="statistics" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <h2 className="font-display text-3xl text-parchment sm:text-4xl">Cemetery Statistics</h2>
      <p className="mt-2 max-w-md font-body text-sm text-stone-400">
        A running tally of humanity&rsquo;s abandoned genius, updated as the dirt is turned.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Skull} label="Total ideas buried" value={stats.total} />
        <StatCard
          icon={Percent}
          label="Average uselessness"
          value={`${stats.averageUselessness}%`}
        />
        <StatCard
          icon={Feather}
          label="Most common cause of death"
          value={stats.mostCommonCause}
        />
        <StatCard
          icon={Trophy}
          label="Most useless idea"
          value={stats.mostUseless ? `\u201C${stats.mostUseless.title}\u201D` : "\u2014"}
          sub={stats.mostUseless ? `${stats.mostUseless.uselessness}% useless` : undefined}
        />
        <StatCard
          icon={Clock}
          label="Longest-lived idea"
          value={stats.longestRested ? `\u201C${stats.longestRested.title}\u201D` : "\u2014"}
          sub={
            stats.longestRested
              ? `Resting for ${daysSince(stats.longestRested.diedDate)} days`
              : undefined
          }
        />
        <StatCard icon={Sparkles} label="Ideas resurrected" value={stats.resurrectedCount} />
        <StatCard icon={HeartCrack} label="Total regrets" value={stats.totalRegrets} />
      </div>
    </section>
  );
}
