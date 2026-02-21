export default function Categories({ categories }) {
  return (
    <div class="border">
      <div class="border-b p-2 bg-slate-800 text-white">
        <h2>Total: {categories.length}</h2>
      </div>

      <ul class="p-2">
        {categories.map((c, i) => (
          <li key={c.id ?? i}>
            #{c.id ?? "?"} {c.name ?? ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
