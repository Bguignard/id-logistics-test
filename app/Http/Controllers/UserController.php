<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Support\PasswordPolicy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
        // Liste des utilisateurs
        public function index()
        {
            $users = User::orderBy('created_at', 'desc')->get();

            return Inertia::render('Users/Index', [
                'users' => $users,
            ]);
        }

        // Formulaire de création (si tu veux une page dédiée)
        public function create()
        {
            return Inertia::render('Users/Create', [
                'passwordRules' => PasswordPolicy::payload(),
            ]);
        }

        // Enregistrer un nouvel utilisateur
        public function store(Request $request)
        {
            $validated = $request->validate(
                [
                    'last_name'   => 'required|string|max:255',
                    'first_name'  => 'required|string|max:255',
                    'email'       => 'required|email|unique:users,email',
                    'password'    => [
                        'required',
                        'string',
                        'min:8',
                        'regex:' . PasswordPolicy::regex(),
                    ],
                ],
                [
                    'password.regex' => PasswordPolicy::message(),
                ]
            );

            $validated['password'] = Hash::make($validated['password']);

            User::create($validated);

            return redirect()->route('users.index')
                ->with('success', 'Utilisateur créé avec succès.');
        }

        // Formulaire d’édition
        public function edit(User $user)
        {
            return Inertia::render('Users/Edit', [
                'user' => $user,
                'passwordRules' => PasswordPolicy::payload(),
            ]);
        }

        // Mise à jour d’un utilisateur
        public function update(Request $request, User $user)
        {
            $validated = $request->validate(
                [
                    'last_name'   => 'required|string|max:255',
                    'first_name'  => 'required|string|max:255',
                    'email'       => 'required|email|unique:users,email,' . $user->id,
                    'password'    => [
                        'nullable',
                        'string',
                        'min:8',
                        'regex:' . PasswordPolicy::regex(),
                    ],
                ],
                [
                    'password.regex' => PasswordPolicy::message(),
                ]
            );

            if (!empty($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
            } else {
                unset($validated['password']);
            }

            $user->update($validated);

            return redirect()->route('users.index')
                ->with('success', 'Utilisateur mis à jour.');
        }

        // Suppression d’un utilisateur
        public function destroy(User $user)
        {
            $user->delete();

            return redirect()->route('users.index')
                ->with('success', 'Utilisateur supprimé.');
        }
}
