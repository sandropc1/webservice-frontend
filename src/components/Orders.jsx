export default function Orders({ orders }) {
  return (
    <div class="border">
      <div class="border-b p-2 bg-slate-800 text-white">
        <h2>Orders found: {orders.length}</h2>
      </div>

      <ul class="p-2">
        {orders.map((o, i) => (
          <li key={o.id ?? i}>
            Order id:{o.id ?? "?"}, STATUS:{o.orderStatus ?? ""}, Client:{o.client.name ?? ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
