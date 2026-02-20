export default function Orders({ orders }) {
  return (
    <div>
      <p>Total: {orders.length}</p>

      <ul>
        {orders.map((o, i) => (
          <li key={o.id ?? i}>
            #{o.id ?? "?"} {o.orderStatus ?? ""}
          </li>
        ))}
      </ul>
    </div>
  );
}