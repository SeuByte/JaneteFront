<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Lista todos os usuários cadastrados
    public function index()
    {
        $users = User::all();
        return view('users.index', compact('users'));
    }

    // Abre o formulário de cadastro de novos usuários
    public function create()
    {
        return view('users.create');
    }

    // Salva o novo usuário (professor ou coordenador) no banco
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:professor,coordenador',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect()->route('users.index')->with('success', 'Usuário cadastrado com sucesso!');
    }
}