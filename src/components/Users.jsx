export default function Users({ users }) {
  return (
    <div>
      <div class="border-b p-2 bg-slate-800 text-white">
        <h2>Users found: {users.length}</h2>
      </div>
      <ul class="p-2">
        {users.map((u, i) => (
          <li key={u.id ?? i}>
            {u.name ?? "(Sem nome)"} | {u.email ?? "(Sem e-mail)"} | {u.phone ?? "(Sem telefone)"}
          </li>
        ))}
      </ul>
    </div>
  );
}
