import { Link, useForm, router } from '@inertiajs/react';

export default function Index({ users, flash }) {
  const handleDelete = (id) => {
    if (confirm('Supprimer cet utilisateur ?')) {
      router.delete(route('users.destroy', id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Utilisateurs</h1>

      <Link
        href={route('users.create')}
        className="inline-block mb-4 px-4 py-2 border rounded"
      >
        Ajouter un utilisateur
      </Link>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1">Nom</th>
            <th className="border px-2 py-1">Prénom</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Créé le</th>
            <th className="border px-2 py-1">Modifié le</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="border px-2 py-1">{u.last_name}</td>
              <td className="border px-2 py-1">{u.first_name}</td>
              <td className="border px-2 py-1">{u.email}</td>
              <td className="border px-2 py-1">
                {new Date(u.created_at).toLocaleString()}
              </td>
              <td className="border px-2 py-1">
                {new Date(u.updated_at).toLocaleString()}
              </td>
              <td className="border px-2 py-1 space-x-2">
                <Link
                  href={route('users.edit', u.id)}
                  className="px-2 py-1 border rounded"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="px-2 py-1 border rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
