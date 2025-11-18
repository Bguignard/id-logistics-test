<?php

namespace App\Support;

class PasswordPolicy
{
    public static function pattern(): string
    {
        return (string) config('password.complexity_pattern');
    }

    public static function regex(): string
    {
        return '/' . static::pattern() . '/';
    }

    public static function message(): string
    {
        return (string) config('password.complexity_message');
    }

    public static function hint(): string
    {
        return (string) config('password.complexity_hint');
    }

    public static function payload(): array
    {
        return [
            'pattern' => static::pattern(),
            'hint' => static::hint(),
            'message' => static::message(),
        ];
    }
}


