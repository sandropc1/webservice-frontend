export default function Products({ products }) {
  return (
    <div class="border">
      <div class="border-b p-2 bg-slate-800 text-white">
        <h2>Total: {products.length}</h2>
      </div>
      <ul class="p-2">
        {products.map((c, i) => (
          <li key={c.id ?? i}>
            Id:{c.id ?? "?"}: {c.name ?? ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
