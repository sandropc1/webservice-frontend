export default function Users({ users }) {
  return (
    <div>
      <p>Total: {users.length}</p>
      <ul>
        {users.map((u, i) => (
          <li key={u.id ?? i}>
            {u.name ?? "(Sem nome)"} {u.email ?? "(Sem e-mail)"} {u.phone ?? "(Sem telefone)"}
          </li>
        ))}
      </ul>
    </div>
  );
}