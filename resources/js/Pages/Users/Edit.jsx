import { useForm, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Edit({ user, passwordRules = {} }) {
  const { data, setData, put, processing, errors } = useForm({
    last_name: user.last_name || '',
    first_name: user.first_name || '',
    email: user.email || '',
    password: '',
  });
  const [clientPasswordError, setClientPasswordError] = useState('');

  const passwordRegex = useMemo(() => {
    if (!passwordRules?.pattern) {
      return null;
    }

    try {
      return new RegExp(passwordRules.pattern);
    } catch (error) {
      console.warn('Expression régulière invalide pour le mot de passe', error);
      return null;
    }
  }, [passwordRules?.pattern]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password && passwordRegex && !passwordRegex.test(data.password)) {
      setClientPasswordError(passwordRules?.message ?? 'Le mot de passe ne respecte pas la politique de sécurité.');
      return;
    }

    setClientPasswordError('');
    put(route('users.update', user.id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Modifier un utilisateur</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label>Nom</label>
          <input
            type="text"
            value={data.last_name}
            onChange={e => setData('last_name', e.target.value)}
            className="w-full border px-2 py-1"
          />
          {errors.last_name && <div className="text-red-500 text-sm">{errors.last_name}</div>}
        </div>

        <div>
          <label>Prénom</label>
          <input
            type="text"
            value={data.first_name}
            onChange={e => setData('first_name', e.target.value)}
            className="w-full border px-2 py-1"
          />
          {errors.first_name && <div className="text-red-500 text-sm">{errors.first_name}</div>}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            className="w-full border px-2 py-1"
          />
          {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>

        <div>
          <label>Mot de passe (laisser vide pour ne pas changer)</label>
          <input
            type="password"
            value={data.password}
            onChange={e => {
              const value = e.target.value;
              setData('password', value);

              if (clientPasswordError && (!passwordRegex || passwordRegex.test(value))) {
                setClientPasswordError('');
              }
            }}
            className="w-full border px-2 py-1"
          />
          {passwordRules?.hint && (
            <div className="text-xs text-gray-500 mt-1">{passwordRules.hint}</div>
          )}
          {(clientPasswordError || errors.password) && (
            <div className="text-red-500 text-sm">
              {clientPasswordError || errors.password}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="px-4 py-2 border rounded"
        >
          Mettre à jour
        </button>

        <Link href={route('users.index')} className="ml-2">
          Annuler
        </Link>
      </form>
    </div>
  );
}
