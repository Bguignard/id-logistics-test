<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Mot de passe : complexité configurable
    |--------------------------------------------------------------------------
    |
    | "complexity_pattern" est une expression régulière sans délimiteurs
    | utilisée pour vérifier la complexité côté backend et frontend.
    |
    | "complexity_hint" et "complexity_message" permettent d'afficher
    | une indication à l'utilisateur et un message d'erreur personnalisé.
    |
    */
    'complexity_pattern' => env('PASSWORD_COMPLEXITY_PATTERN', '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$'),
    'complexity_hint' => env('PASSWORD_COMPLEXITY_HINT', 'Au moins 8 caractères avec minuscule, majuscule, chiffre et caractère spécial.'),
    'complexity_message' => env('PASSWORD_COMPLEXITY_MESSAGE', 'Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spécial.'),
];


