<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\Room;
use App\Models\AllocationHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AssetController extends Controller
{
    // Lista todos os patrimônios do sistema
    public function index()
    {
        $assets = Asset::with('room.teacher')->get();
        $allRooms = Room::all(); // Alimenta o select de movimentação rápida

        return view('assets.index', compact('assets', 'allRooms'));
    }

    // Tela de criação de patrimônio
    public function create()
    {
        $rooms = Room::with('teacher')->get();
        return view('assets.create', compact('rooms'));
    }

    // Salva o patrimônio
    public function store(Request $request)
    {
        $request->validate([
            'asset_tag' => 'required|string|unique:assets,asset_tag',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'room_id' => 'required|exists:rooms,id',
        ]);

        Asset::create($request->all());

        return redirect()->route('assets.index')->with('success', 'Patrimônio cadastrado com sucesso!');
    }

    // Método para REALOCAR de forma visual
    public function relocate(Request $request, Asset $asset)
    {
        $user = Auth::user();
        
        $request->validate([
            'destination_room_id' => 'required|exists:rooms,id',
        ]);

        $oldRoomId = $asset->room_id;
        $newRoomId = $request->destination_room_id;

        // Atualiza a sala
        $asset->update(['room_id' => $newRoomId]);

        // Grava no histórico automaticamente
        AllocationHistory::create([
            'asset_id' => $asset->id,
            'origin_room_id' => $oldRoomId,
            'destination_room_id' => $newRoomId,
            'moved_by_user_id' => $user->id,
        ]);

        return redirect()->route('assets.index')->with('success', 'Objeto realocado e histórico registrado!');
    }

    // Histórico de movimentações
    public function history()
    {
        $histories = AllocationHistory::with(['asset', 'originRoom', 'destinationRoom', 'user'])->latest()->get();
        return view('assets.history', compact('histories'));
    }
}