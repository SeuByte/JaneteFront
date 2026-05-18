<?php

namespace App\Http\Controllers;

use App\Models\FluxoEscolar;
use App\Models\User;
use App\Notifications\MovimentacaoAlunoNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Notification;

class PortariaController extends Controller
{
    // 1. Tela de Cadastro Geral
    public function telaCadastro()
    {
        return view('cadastro');
    }

    // Processa o formulário de cadastro e cria o responsável automaticamente
    public function salvarCadastro(Request $request)
    {
        $request->validate([
            'nome_aluno' => 'required|string|max:255',
            'nome_professor' => 'required|string|max:255',
            'nome_responsavel' => 'required|string|max:255',
            'email_responsavel' => 'required|email|max:255',
        ]);

        // Garante que o usuário responsável existe para gerar o user_id
        $usuarioResponsavel = User::firstOrCreate(
            ['email' => $request->email_responsavel],
            [
                'name' => $request->nome_responsavel,
                'password' => bcrypt('senai123')
            ]
        );

        // Cria o fluxo escolar amarrado ao ID do responsável
        FluxoEscolar::create([
            'user_id' => $usuarioResponsavel->id,
            'nome_aluno' => $request->nome_aluno,
            'nome_professor' => $request->nome_professor,
            'nome_responsavel' => $request->nome_responsavel,
            'email_responsavel' => $request->email_responsavel,
            'status' => 'pendente'
        ]);

        return redirect()->route('professor.painel')->with('sucesso', 'Aluno cadastrado com sucesso!');
    }

    // 2. Tela do Professor (Sala de Aula)
    public function painelProfessor()
    {
        $alunos = FluxoEscolar::where('status', 'pendente')->get();
        return view('professor', compact('alunos'));
    }

    // Professor autoriza a saída em sala
    public function professorAutorizar($id)
    {
        $fluxo = FluxoEscolar::findOrFail($id);
        $fluxo->update(['autorizado_professor' => true]);

        return redirect()->back()->with('sucesso', "Saída de {$fluxo->nome_aluno} autorizada!");
    }

    // 3. Tela da Portaria (SENAI)
    public function exibirPortaria($id)
    {
        $fluxo = FluxoEscolar::findOrFail($id);
        return view('portaria', compact('fluxo'));
    }

    // Portaria valida a saída física e envia notificações
    public function validarPortaria(Request $request, $id)
    {
        $fluxo = FluxoEscolar::findOrFail($id);

        $fluxo->update([
            'status' => 'concluido',
            'data_hora_validacao' => Carbon::now()
        ]);

        $notifiable = (new \Illuminate\Notifications\AnonymousNotifiable())
            ->route('mail', $fluxo->email_responsavel);

        Notification::send($notifiable, new MovimentacaoAlunoNotification($fluxo));

        return redirect()->back()->with('sucesso', 'Fluxo concluído com sucesso!');
    }
}