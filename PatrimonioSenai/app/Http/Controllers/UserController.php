<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Gate; // <-- IMPORTANTE: Importamos o Gate para controlar as permissões

class UserController extends Controller
{
    // Lista todos os usuários cadastrados (Apenas Coordenador)
    public function index()
    {
        // Regra de Permissão: Se NÃO for coordenador, barra com erro 403 (Não autorizado)
        if (Gate::denies('manage-users')) {
            abort(403, 'Acesso negado. Apenas coordenadores podem gerenciar usuários.');
        }

        $users = User::all();
        return view('users.index', compact('users'));
    }

    // Abre o formulário de cadastro de novos usuários (Apenas Coordenador)
    public function create()
    {
        if (Gate::denies('manage-users')) {
            abort(403, 'Acesso negado.');
        }

        return view('users.create');
    }

    // Salva o novo usuário (professor ou coordenador) no banco
    public function store(Request $request)
    {
        if (Gate::denies('manage-users')) {
            abort(403, 'Acesso negado.');
        }

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