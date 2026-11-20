// "What I do" and "How I work": small moving drawings with their text.
import { doArt, howArt } from "./Art";

/** What I do: the five skills side by side, on the page like the rest. */
export default function DoCards({ items }: { items: string[] }) {
  return (
    <ul data-rise className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
      {items.map((it) => (
        <li key={it}>
          <div className="mb-5 w-full max-w-[150px] text-ink">{doArt[it]}</div>
          <p className="text-[17px] font-semibold">{it}</p>
        </li>
      ))}
    </ul>
  );
}

/** How I work: one white card per point. */
export function HowCards({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {items.map((it, i) => (
        <li key={it.title} data-rise className="tile card-line p-6 md:p-10">
          <div className="mb-6 w-full max-w-[180px] text-ink">{howArt[i]}</div>
          <h3 className="t-body mb-2 font-semibold" style={{ fontSize: 20 }}>
            {it.title}
          </h3>
          <p className="t-body text-ink-2">{it.body}</p>
        </li>
      ))}
    </ul>
  );
}
