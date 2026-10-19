type Stat = {
  id: string;
  value: string;
  label: string;
};

type StatsGridProps = {
  title: string;
  intro: string;
  items: readonly Stat[];
  updated: string;
};

/** Adapted from 21st Stats Grid (shadcnui-blocks, stats-04). */
export function StatsGrid({ title, intro, items, updated }: StatsGridProps) {
  return (
    <div>
      <h2 id="operations-title" className="section-title">
        {title}
      </h2>
      <p className="section-copy">{intro}</p>
      <div className="stats-frame">
        {items.map((item) => (
          <div key={item.id} className="stats-cell">
            <span>{item.value}</span>
            <p>{item.label}</p>
            <p className="stat-meta">Latest update: {updated}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
