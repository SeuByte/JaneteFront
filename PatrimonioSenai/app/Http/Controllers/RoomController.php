<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoomController extends Controller
{
    // Lista as salas (Todos os usuários agora podem ver todas as salas)
    public function index()
    {
        // Puxa todas as salas do banco para listar na tabela
        $rooms = Room::with('teacher')->get();

        return view('rooms.index', compact('rooms'));
    }

    // Tela de criação de sala (Liberado com botão na tela)
    public function create()
    {
        // Puxa todos os usuários cadastrados no site para você escolher no Select
        $teachers = User::all();
        
        return view('rooms.create', compact('teachers'));
    }

    // Salva a sala no banco
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
        ]);

        Room::create($request->all());

        return redirect()->route('rooms.index')->with('success', 'Sala cadastrada com sucesso!');
    }
}